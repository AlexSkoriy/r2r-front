import { removeLastModal } from "@/store";

export default function Overlay({ children }: { children: React.ReactNode }) {

  return (<>
    <div id="overlay" data-close="true" onClick={removeLastModal} className=" bg-[#000000d0]" >
      {children}
    </div>
  </>)
}