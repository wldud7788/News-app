export interface NewsItem {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  video_url: string | null;
  description: string | null;
  content: string;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_name: string;
  source_url: string;
  language: string;
  category: string[];
}
export interface MockDataItemType {
  article_id: string;
  title: string;
  image_url: string | null;
  description: string | null;
}
