import { Metadata } from "next";

export function helperGenerateMetadata({
  title,
  description,
  og_image,
  url,
  alternates,
  other,
  favicon,
}: {
  title: string;
  description: string;
  og_image?: string | null;
  url?: string;
  favicon?: string;
  type?: "website" | "article" | "product";
  alternates?: {
    canonical: string;
  };
  other?: Metadata["other"] | any;
}): Metadata {
  return {
    title,
    description,
    // other: { ...other, ['og:site_name']: 'FRIZAR' },
    other: {
      ...other,
    },
    icons: {
      icon: [
        {
          url: favicon
            ? favicon
            : `${process.env.NEXT_PUBLIC_SITE_FRONT}/favicon.ico`,
        },
      ],
    },
    alternates,
    openGraph: {
      title,
      url,
      locale: "ru_RU",
      type: "website",
      siteName: "Рынок пацана - картон на асфальте",
      description,
      images: og_image
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_SITE_BACK}${og_image}`,
              type: "image/jpeg",
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}
