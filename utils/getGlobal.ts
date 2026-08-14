import { IGlobal } from "@/types";

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData() {
  const gqlEndpoint = "https://cms.r2r.studio/graphql";
  const globalRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      query: `
        query Global {
          global {
            data {
              attributes {
                audio {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                favicon {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                app_store
                google_play
                link_tg,
                link_vk,
                link_ok
                robots_txt
              }
            }
          }
        }
      `,
    }),
  });

  const global = await globalRes.json();
  const res: IGlobal = global
  return res;
}