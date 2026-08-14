import { IGlobal } from "@/types";
import axios from "axios";

export default function download(global: IGlobal) {
  let progress = 0;
  axios({
    url: `${process.env.NEXT_PUBLIC_SITE_BACK}${global.data.global.data.attributes.audio.data.attributes.url}`,
    onDownloadProgress(progressEvent) {
      const total = progressEvent?.total ?? 1
      progress = Math.round((progressEvent.loaded / total) * 100);
    }
  }).then(() => {
    console.log("FINISH download Sound", progress)
  });
}