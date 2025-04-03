import { MockDataItemType, NewsItem } from "../../shared/types/news.types";

interface NewsInfoProps {
  currentNews: NewsItem | MockDataItemType;
}
export const NewsInfo = ({ currentNews }: NewsInfoProps) => {
  return (
    <>
      <div className="rounded-lg overflow-hidden h-[300px]">
        <img
          src={currentNews.image_url || "/img/img_default_news.jpg"}
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="font-bold mt-3">{currentNews.title}</h4>
      <p className="text-[14px] text-[#4a4a4a] mt-3">
        {currentNews?.description}
      </p>
    </>
  );
};
