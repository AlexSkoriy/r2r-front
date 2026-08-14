# Образ для dev-окружения (dev.r2r.studio).
# Прод собирается через Cloud Native Buildpacks (project.toml) и этот файл не использует —
# в project.toml шаблон "*Dockerfile*" стоит в exclude.
#
# Node 20 — как в project.toml (BP_NODE_VERSION = ~20), чтобы dev и прод не разъезжались.

# ---------- этап 1: зависимости ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

# ---------- этап 2: сборка ----------
FROM node:20-alpine AS builder
WORKDIR /app

# ВАЖНО: переменные NEXT_PUBLIC_* Next.js подставляет в код на этапе сборки,
# а не при запуске. Поэтому их надо передать именно сюда, как build-args.
ARG NEXT_PUBLIC_SITE_FRONT=https://dev.r2r.studio
ARG NEXT_PUBLIC_SITE_BACK=https://cms.r2r.studio
ENV NEXT_PUBLIC_SITE_FRONT=$NEXT_PUBLIC_SITE_FRONT
ENV NEXT_PUBLIC_SITE_BACK=$NEXT_PUBLIC_SITE_BACK
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# ---------- этап 3: запуск ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# те же значения нужны и в рантайме: серверные компоненты читают
# NEXT_PUBLIC_SITE_BACK при каждом запросе к Strapi
ARG NEXT_PUBLIC_SITE_FRONT=https://dev.r2r.studio
ARG NEXT_PUBLIC_SITE_BACK=https://cms.r2r.studio
ENV NEXT_PUBLIC_SITE_FRONT=$NEXT_PUBLIC_SITE_FRONT
ENV NEXT_PUBLIC_SITE_BACK=$NEXT_PUBLIC_SITE_BACK

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# не пускаем процесс под root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 \
  && chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
