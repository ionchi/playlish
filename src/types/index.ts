export interface Show {
  id: number;
  title: string;
  url: string;
  image: string;
  description: string;
  link: string;
  author: string;
  owner_name: string;
  episodeCount: number;
  language?: string;
}

export interface Episode {
  id: number;
  title: string;
  image: string;
  description: string;
  link: string;
  datePublished: number;
}
