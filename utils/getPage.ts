import { IGlobal, IPage } from "@/types";

// Get site data from Strapi (metadata, navbar, footer...)
export async function getPageData(slug: string): Promise<IPage> {
  const gqlEndpoint = `${process.env.NEXT_PUBLIC_SITE_BACK}/graphql`;
  const pageRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      variables: {
        slug,
      },
      query: `
        query Page($slug: String!) {
          pages(
            filters: { slug: { eq: $slug } }
          ) {
            data {
              id
              attributes {
                meta {
                  meta_title
                  meta_description
                  canonical
                  og_image {
                    data {
                      id
                      attributes {
                        url
                      }
                    }
                  }
                }
                template
                slug
                content
                createdAt
                updatedAt
              }
            }
          }
        }
      `,
    }),
  });

  return await pageRes.json();
}
