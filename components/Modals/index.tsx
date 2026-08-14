"use client";

import { store } from "@/store";
import { useStore } from "@tanstack/react-store";


export default function Modals() {

  const { modals } = useStore(store, (state) => state);

  return (<>
    {modals.map((content, index) => (<div key={index}>
      {content}
    </div>))}
  </>)
}