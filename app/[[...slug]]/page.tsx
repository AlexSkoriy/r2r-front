import { getGlobalData } from "@/utils/getGlobal";
import { helperGenerateMetadata } from "@/helpers/helper-generate-metadata";
import { Metadata } from "next";
import IndexFrame from "@/components/IndexFrame";
import TemplateInfo from "@/components/TemplateInfo";
import { getPageData } from "@/utils/getPage";
import { IPage, IGlobal } from "@/types";
import { notFound } from "next/navigation";

export const dynamic = "error";

export const revalidate = 0;

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | unknown> {
  const params = await props.params;
  try {
    const slug = params.slug ? `/${params.slug.join("/")}` : "/";
    const global = await getGlobalData();
    const page = await getPageData(slug);

    if (!page.data.pages.data[0]) {
      return notFound();
    }

    return helperGenerateMetadata({
      title: page.data.pages.data[0].attributes.meta.meta_title,
      description: page.data.pages.data[0].attributes.meta.meta_description,
      favicon: `${process.env.NEXT_PUBLIC_SITE_BACK}${global.data.global.data.attributes.favicon.data.attributes.url}`,
      url: `${process.env.NEXT_PUBLIC_SITE_FRONT}${page.data.pages.data[0].attributes.slug}`,
      og_image:
        page.data.pages.data[0].attributes.meta.og_image?.data?.attributes.url,
      other: { ["fb:app_id"]: "1085160953411492" },
    });
  } catch (error) {
    console.error(error);
    return { title: "Error" };
  }
}

export default async function Home(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;

  const slug = params.slug ? `/${params.slug.join("/")}` : "/";

  const global = await getGlobalData();
  const page = await getPageData(slug);

  if (!page.data.pages.data[0]) {
    return notFound();
  }

  const PageTemplate = ({ page, global }: { page: IPage; global: IGlobal }) => {
    const templates = {
      template_index: <IndexFrame global={global} />,
      template_info: <TemplateInfo page={page} />,
    };
    const templateKey = page.data.pages.data[0].attributes.template;
    const template = templates[templateKey as keyof typeof templates];
    return template;
  };

  return (
    <main className="">
      {/* <pre>{JSON.stringify(slug, null, 2)}</pre> */}
      <PageTemplate page={page} global={global} />
    </main>
  );
}
