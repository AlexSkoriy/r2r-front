import logo from "@/public/images/logo-block-boss.png"
import imageEdging from "@/public/images/imageEdging.png"
import Image from "next/image"
import { IGlobal } from "@/types"
import Sound from "../Sound"
export const dynamic = 'force-dynamic'
import Link from "next/link"
import { FaFacebookF, FaDiscord } from "react-icons/fa"

// Соцсети сайта. Чтобы поменять ссылку или добавить сеть — правим этот массив.
// Иконки берутся из react-icons и наследуют цвет текста, отдельные файлы не нужны.
const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/theblockboss",
    Icon: FaFacebookF,
    iconClass: "text-[15px] desktop:text-[26px]",
  },
  {
    label: "Discord",
    href: "https://discord.gg/tDvnQyH4yc",
    Icon: FaDiscord,
    iconClass: "text-[18px] desktop:text-[30px]",
  },
]

export default function FirstFrame({ global }: { global: IGlobal }) {


  const linkApp1 = global.data.global.data.attributes.google_play
  const linkApp2 = global.data.global.data.attributes.app_store

  return (
    <div className="h-[100dvh] bg-main relative overflow-hidden">
      {/* <div className="h-[100dvh] bg-main relative"> */}

      <Image src={imageEdging} width={1920} height={62} alt="" className="z-0 absolute top-0 left-0 right-0 pointer-events-none fullscreen:hidden" />
      <Image src={imageEdging} width={1920} height={62} alt="" className="z-30 absolute bottom-0 left-0 right-0 rotate-180 fullscreen:hidden pointer-events-none" />

      <div className="flex items-center justify-center absolute desktop:right-[15px] right-0 top-0 bottom-0 z-0">
        <div className="desktop:w-[65px] w-[35px] flex desktop:gap-[13px] gap-[6px] h-full">
          <div className="w-[6px] desktop:w-[13px] bg-skin h-full"></div>
          <div className="w-[6px] desktop:w-[13px] bg-skin h-full"></div>
          <div className="w-[6px] desktop:w-[13px] bg-skin h-full"></div>
        </div>
      </div>

      <header className="desktop:grid flex grid-cols-3 desktop:mt-[76px] mt-[8.4dvh] pl-[20px] justify-between mr-[70px] ">
        <div className=" flex gap-[10px] items-center desktop:ml-[45px] ml-[17px] desktop:order-1 order-2 flex-1  desktop:justify-start min-w-max">
          {SOCIALS.map(({ label, href, Icon, iconClass }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[2px] border-skin rounded-full desktop:h-[60px] h-[36px] desktop:w-[60px] w-[36px] flex items-center justify-center"
            >
              <Icon className={iconClass} />
            </a>
          ))}
          <span className="text-[20px] ml-[20px] hidden desktop:block tablet:hidden">Follow us and stay tuned</span>
        </div>
        <div className="flex items-center justify-center desktop:order-2 order-1 shrink-0 desktop:w-full">
          <Image src={logo} width={648} height={162} alt="Block Boss" className="h-[28px] phxs:h-[24px] w-auto desktop:h-[73px]" />
        </div>
        <Sound />
      </header>

      <div className="flex desktop:h-[calc(100dvh-73px-76px)] h-[calc(100dvh-36px-9.5dvh)] items-start justify-start pointer-events-none flex-col-reverse desktop:flex-row desktop:gap-[48px]">

        {/* <div className="relative desktop:w-[1219px] desktop:min-h-full h-full w-full overflow-hidden fullscreen:w-full">
          <div className="absolute bottom-0 low:top-0 desktop:h1012:top-0 fullscreen:w-full">
            <img className="h-fit align-top ph:max-w-[123%] max-w-[530px] desktop:max-w-full ph:ml-[-14%] mansFullScreen" src="./images/mans.png" width={1219} height={918} alt="" />
          </div>
        </div> */}

        <div className="relative desktop:w-[1219px] h-full w-full overflow-hidden fullscreen:w-full">
          <div className="absolute desktop:top-0 top-0 bottom-0 desktop:h1012:top-0 low:top-0">
            <img className="ph:max-w-[123%] ph:h-full ph:h-fit ph:w-[123%] ph:ml-[-14%] object-contain w-full h-full object-left-bottom" src="./images/mans.png" width={1219} height={918} alt="" />
          </div>
        </div>


        <div className="flex-1 desktop:mt-[30px] desktop:mr-[80px]  fullscreen:mr-[200px] pl-[20px] mt-[20px] desktop:pl-0 ">
          <div className="font-drukcyr desktop:h1012:text-[17dvh] desktop:h1012:leading-[15dvh] text-[8.5dvh]  desktop:text-[8.7vw] !tracking-[0px] desktop:!tracking-[-1] leading-[7.5dvh] desktop:leading-[7.8vw]  mt-[5px] desktop:mt-0  uppercase font-bold">
            <div className="animate-fade-left animate-duration-500 animate-delay-[500ms]">Seize </div>
            <div className="animate-fade-left animate-duration-500 animate-delay-[800ms]">Trade </div>
            <div className="animate-fade-left animate-duration-500 animate-delay-[1100ms] whitespace-nowrap">Cover</div>
          </div>
          <p className="desktop:text-[20px] text-[15px]  desktop:w-[262px] w-[209px] uppercase animate-fade-left animate-duration-500 animate-delay-[1400ms] mt-[2dvh] desktop:h1012:mt-[2dvh] desktop:mt-[25px] leading-[21px] desktop:leading-[24px] tracking-[0.1px] desktop:tracking-[0.5px]">
            Dice Roll Business empire RPG
          </p>

          <div className="flex items-center gap-[10px] desktop:mt-[50px] mt-[25px]">
            <div className="relative">
              <Link className="rounded-[11px] relative pointer-events-auto bg-skin desktop:w-[190px] desktop:h-[74px] w-[139px] h-[59px] flex items-center justify-center shadow-[0px_6px_0px_0px_#b8341f]" href={linkApp1 ?? "#"} >
                <img className="w-[107px] h-[25px] desktop:w-[146px] desktop:h-[35px]" src="/icons/google_play.svg" width={146} height={35} alt="Get it on Google Play" />
              </Link>
            </div>
            <div className="relative">
              <Link className="rounded-[11px] relative pointer-events-auto bg-skin desktop:w-[190px] desktop:h-[74px] w-[139px] h-[59px] flex items-center justify-center shadow-[0px_6px_0px_0px_#b8341f]" href={linkApp2 ?? "#"} >
                <img className="w-[107px] h-[29px] desktop:w-[146px] desktop:h-[40px]" src="/icons/app_store.svg" width={146} height={40} alt="Download on the App Store" />
              </Link>
            </div>
          </div>
          <div className="flex ph:fixed ph:bg-gradient-to-t ph:from-main from-20%  to-[#f9553c00]  ph:pb-[35px] ph:pt-[60px]  ph:px-[20px] bottom-0 left-0 right-0 desktop:gap-[24px] gap-[17px] font-sans desktop:text-[20px] text-[16px] desktop:leading-[26px] leading-[21px] font-[400] text-skin underline desktop:h1012:mt-[5dvh] desktop:mt-[10dvh] mt-[34px] desktop:tracking-[-0.5px] tracking-[-0.5px]">
            <Link href="/privacy-policy" className=" opacity-80 pointer-events-auto">Privacy policy</Link>
            <div className="border-r border-skin" />
            <Link href="/term-of-use" className="opacity-80 pointer-events-auto">Term of use</Link>
          </div>

        </div>
      </div>


    </div>
  )
}

