# Развёртывание dev-окружения (dev.r2r.studio)

Пошаговая инструкция. Все команды выполняются **на сервере Hetzner** по SSH,
кроме шага 1 (DNS) и шага 2 (копирование файла с вашего компьютера).

Если какая-то команда выдаёт ошибку — пришлите её вывод целиком, разберём.
Не нужно пытаться «дожать» шаг самостоятельно: лучше остановиться и показать ошибку.

---

## Что мы делаем

Поднимаем вторую копию сайта на том же сервере, на отдельном домене `dev.r2r.studio`.
Прод (`r2r.studio`) при этом не трогается ни в одну секунду: у dev-копии свой контейнер,
свой Traefik-роутер и своё имя. CMS используется та же, что у прода, — сайт из неё только
читает, испортить данные оттуда невозможно.

Dev будет закрыт логином и паролем, чтобы не попал в поисковики и не смущал случайных
посетителей.

---

## Шаг 1. DNS-запись

В панели управления доменом `r2r.studio` добавьте запись:

```
тип: A
имя: dev
значение: 138.199.217.67
```

Это тот же IP, на котором уже живёт `r2r.studio` — я его проверил.
Если у вас домен за Cloudflare, поставьте для этой записи режим **DNS only**
(серая тучка), иначе Let's Encrypt не сможет выдать сертификат.

Проверить, что запись разошлась (можно с вашего компьютера):

```bash
dig +short dev.r2r.studio
```

Должен вывестись тот же IP. Иногда это занимает несколько минут.

---

## Шаг 2. Загрузить код на сервер

Я передам вам файл `r2r-dev.bundle` — это весь проект вместе с историей правок,
упакованный в один файл.

С вашего компьютера (подставьте своего пользователя и адрес сервера):

```bash
scp ~/Downloads/r2r-dev.bundle root@138.199.217.67:/opt/
```

Дальше уже на сервере:

```bash
ssh root@138.199.217.67

cd /opt
git clone r2r-dev.bundle r2r-front-dev
cd r2r-front-dev
git log --oneline    # должно быть 6 коммитов, верхний — про звёздочку
```

---

## Шаг 3. Придумать логин и пароль для dev

Сгенерируем хеш пароля. Замените `mypassword` на свой пароль:

```bash
docker run --rm httpd:2.4-alpine htpasswd -nb dev 'mypassword'
```

Команда выведет строку вида `dev:$apr1$abc...$xyz...`

Теперь **удвойте в ней каждый знак `$`** — так требует docker compose.
Проще всего сделать это автоматически:

```bash
cd /opt/r2r-front-dev
HASH=$(docker run --rm httpd:2.4-alpine htpasswd -nb dev 'mypassword')
echo "DEV_BASIC_AUTH=$(echo "$HASH" | sed -e 's/\$/\$\$/g')" > .env
cat .env
```

Файл `.env` в git не попадёт — он в списке игнорируемых.

---

## Шаг 4. Проверить, что сеть Traefik называется `web`

```bash
docker network ls | grep web
```

Если в выводе есть строка с именем `web` — всё в порядке, идём дальше.
Если такой сети нет, пришлите мне полный вывод `docker network ls`
и `docker ps --format '{{.Names}}'` — поправлю конфиг под фактические имена.

---

## Шаг 5. Собрать и запустить

```bash
cd /opt/r2r-front-dev
docker compose -f docker-compose.dev.yml up -d --build
```

Первая сборка займёт минуты три-четыре: скачиваются зависимости и собирается проект.

Посмотреть, что получилось:

```bash
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs --tail=50
```

В логах должна быть строка вида `✓ Ready in ...`.

---

## Шаг 6. Проверить

Сначала изнутри сервера, минуя Traefik и авторизацию:

```bash
docker exec r2r-front-dev wget -qO- http://127.0.0.1:3000/api/health
```

Ожидаемый ответ: `{"status":"Healthy","timestamp":"..."}`

Затем откройте в браузере **https://dev.r2r.studio** — браузер спросит логин и пароль
из шага 3. Первое открытие может занять до минуты: Traefik в этот момент получает
сертификат.

---

## Если что-то пошло не так

Собрать диагностику одной командой и прислать мне вывод:

```bash
cd /opt/r2r-front-dev
echo "--- ps ---";        docker compose -f docker-compose.dev.yml ps
echo "--- logs ---";      docker compose -f docker-compose.dev.yml logs --tail=80
echo "--- traefik ---";   docker logs $(docker ps --format '{{.Names}}' | grep -i traefik | head -1) --tail=50
echo "--- dns ---";       getent hosts dev.r2r.studio
```

---

## Как выкладывать следующие правки

После того как окружение поднято, обновление сводится к трём командам:

```bash
cd /opt/r2r-front-dev
git pull                                                    # либо новый bundle, см. ниже
docker compose -f docker-compose.dev.yml up -d --build
```

Пока нет своего git-сервера, вместо `git pull` будет так: я присылаю новый bundle,
вы его копируете на сервер и делаете

```bash
git pull /opt/r2r-dev.bundle master
```

Когда поднимем Gitea (это отдельная задача), останется обычный `git pull`.

---

## Как убрать dev-окружение

```bash
cd /opt/r2r-front-dev
docker compose -f docker-compose.dev.yml down
```

Прод это никак не затронет.
