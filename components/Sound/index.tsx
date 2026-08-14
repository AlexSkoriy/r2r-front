"use client"
import value from "@/public/icons/value.svg"
import Image from "next/image"
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";

import { useRef, useState } from "react"

export default function Sound() {
  const [isMuted, setIsMuted] = useState(false)
  const soundRef = useRef<HTMLAudioElement>(null)


  function handlerClick() {
    setIsMuted(isMuted => {
      isMuted ? soundRef.current?.pause() : soundRef.current?.play()
      return !isMuted
    });
  }

  return (
    <div className="flex items-center desktop:justify-end justify-center order-3 cursor-pointer" onClick={handlerClick}>
      {/* <Image src={value} width={30} height={21} alt="" className="desktop:mr-[55px] w-[25px] h-[18px] desktop:w-[30px] desktop:h-[21px]" /> */}
      {isMuted ? <FiVolume2 size={30} className="desktop:mr-[55px]" /> : <FiVolumeX size={30} className="desktop:mr-[55px]" />}
      <audio loop autoPlay={false} id="aa" ref={soundRef} src="/sound/sw1.mp3" />
    </div>
  )
}