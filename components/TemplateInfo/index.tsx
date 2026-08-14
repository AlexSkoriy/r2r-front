import { IPage } from "@/types";
import DefaultModal from "../Modals/DefaultModal";
import BlockRendererClient from "../BlocksRenderClient";
import Image from "next/image";

export default function TemplateInfo({ page }: { page: IPage }) {
  return (
    <div>
      <DefaultModal closeToLink="/">
        <div className="grid grid-cols-3 1142:flex flex-col 1142:pl-[35px]">
          <div>
            <div className="flex items-center pl-[125px] 1142:pl-0 gap-[10px] 1142:gap-[5px] 1142:pb-[20px]">
              <Image
                className="1142:w-[34px] aspect-square"
                src={"/icons/star.svg"}
                alt=""
                width={40}
                height={40}
              />
              <span className="text-main uppercase font-medium text-[20px] 1142:text-[16px] leading-[24px] 1142:leading-[19px] tracking-[0.4px] 1142:tracking-[0.2px] ">
                {page.data.pages.data[0].attributes.meta.meta_title}
              </span>
            </div>
          </div>
          <div className="col-span-2">
            <div className="overflow-y-auto overscroll-contain h-[calc(100dvh-200px)] 1142:[calc(100dvh-208px)]  max-w-[755px] 1142:max-w-full">
              <div className="min-h-[100dvh] ">
                <div className="max-w-[643px] 1142:max-w-full 1142:pr-[20px] pb-[100px]">
                  <BlockRendererClient
                    content={page.data.pages.data[0].attributes.content}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultModal>
    </div>
  );
}
