export interface IGlobal {
  data: Data
}

export interface Data {
  global: Global
}

export interface Global {
  data: Data2
}

export interface Data2 {
  attributes: Attributes
}

export interface Attributes {
  meta_title: string
  meta_description: string
  audio: File;
  favicon: File;
  logo: File;
  app_store: string
  google_play: string
  robots: string
}



export interface File {
  data: Data3;
}

export interface Data3 {
  id: string;
  attributes: Attributes2;
}

export interface Attributes2 {
  url: string;
  mime: string;
}