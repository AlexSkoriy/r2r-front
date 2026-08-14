"use client";
import img_seed from "@/public/icons/seed.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 3;
      if (start >= 99) {
        clearInterval(interval);
        setIsLoading(true);
      }
      setProgress(start);
    }, 65);
  }, []);

  return (
    <div className=" bg-main text-skin flex justify-center items-center h-[100dvh] fixed z-[100] inset-0">
      <div className="flex items-center justify-center absolute inset-0 z-0">
        <div className="desktop:w-[65px] w-[35] desktop:gap-[13px] gap-[6px] flex h-full">
          <div className="w-[6px] desktop:w-[13px] bg-skin h-full"></div>
          <div className="w-[6px] desktop:w-[13px] bg-skin h-full"></div>
          <div className="w-[6px] desktop:w-[13px] bg-skin h-full"></div>
        </div>
      </div>

      <div className="py-[40px] bg-main flex flex-col items-center gap-[20px] z-10 ">
        <div className="relative">
          <Image
            src={img_seed}
            height={96}
            width={163}
            alt=""
            className="w-[88px] h-[52px] desktop:w-[163px] desktop:h-[96px]"
          />
        </div>
        <span className="text-[18px] animate-flip-down">
          Не очкуй, ща все будет
        </span>
      </div>
      <div className=" absolute desktop:right-[50px] desktop:bottom-[50px] bottom-[15px] right-[20px] desktop:text-[166px] text-[95px] font-drukcyr font-bold">
        {progress}
      </div>
    </div>
  );
}
