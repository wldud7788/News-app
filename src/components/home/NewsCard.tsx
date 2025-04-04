import { useNavigate } from "react-router-dom";
import { MockDataItemType, NewsItem } from "../../shared/types/news.types";
interface NewsCard {
  item: NewsItem | MockDataItemType;
}
export const NewsCard = ({ item }: NewsCard) => {
  const nav = useNavigate();
  return (
    <>
      <div
        className="w-full sm:w-[250px] shadow-sm rounded-lg p-4"
        onClick={() => nav(`/newsDetail/${item.article_id}`)}
      >
        <div className="rounded-lg overflow-hidden h-[200px]">
          <img
            src={item.image_url || "/img/img_default_news.jpg"}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-bold line-clamp-1 mt-3">{item?.title}</h4>
        <p className="line-clamp-3 text-[14px] text-[#4a4a4a] mt-3">
          {item.description}
        </p>
      </div>
    </>
  );
};
