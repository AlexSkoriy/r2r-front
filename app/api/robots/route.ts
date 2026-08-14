export async function GET() {
  const gqlEndpoint = `${process.env.NEXT_PUBLIC_SITE_BACK}/graphql`;
  const data = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      query: `
        query {
          global {
            data {
              attributes {
                robots_txt
              }
            }
          }
        }`
    }),
  }).then((res) => res.json());

  return new Response(data.data.global.data.attributes.robots_txt, {
    headers: {
      // "Content-Type": "application/json",
      "Content-Type": "text/plain",
    },
  });
}
