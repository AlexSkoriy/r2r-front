"use client";

import imageEdging from "@/public/images/imageEdging.png";
import { removeLastModal } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DefaultModal({
  children,
  closeToLink,
}: Readonly<{
  children: React.ReactNode;
  closeToLink?: string;
}>) {
  const router = useRouter();

  return (
    <div className="w-full fixed z-50 overflow-hidden inset-0">
      <Image
        src={imageEdging}
        width={1920}
        height={62}
        alt=""
        className="z-0 absolute contrast-[0.8] top-0 left-0 right-0 pointer-events-none fullscreen:hidden"
      />
      <Image
        src={imageEdging}
        width={1920}
        height={62}
        alt=""
        className="z-30 absolute contrast-[0.8] bottom-0 left-0 right-0 rotate-180 fullscreen:hidden"
      />

      <div className={`bg-skin h-[100dvh]`}>
        <div className="flex justify-end 1142:justify-center pr-[75px] 1142:pr-0 pt-[85px] 1142:pt-[48px] pb-[30px] 1142:pb-[50px]">
          <button
            onClick={() => (closeToLink ? router.push("/") : removeLastModal())}
            className="bg-main active:shadow-[0px_0px_0px_0px_#b8341f] active:translate-y-[6px] rounded-[16px] w-[86px] 1142:w-[56px] aspect-square flex items-center justify-center shadow-[0px_6px_0px_0px_#b8341f]"
          >
            <Image
              className="w-[12px] 1142:w-[8px]"
              src="/icons/close.svg"
              alt=""
              width="12"
              height="12"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
