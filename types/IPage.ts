export interface IPage {
  data: DataPage;
}

export interface DataPage {
  pages: Pages;
}

export interface Pages {
  data: DatumPage[];
}

export interface DatumPage {
  id: string;
  attributes: AttributesPage;
}

export interface AttributesPage {
  meta: Meta;
  template: string;
  content: any;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  meta_title: string;
  meta_description?: any;
  canonical?: any;
  og_image?: { data: { attributes: { url: "string" } } | null };
}
