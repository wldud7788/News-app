import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../api/api";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const nav = useNavigate();
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>{error.message}</div>;
  console.log(news);
  return (
    <div className="flex flex-wrap justify-center gap-[30px]">
      {news?.map((item) => {
        return (
          <div
            key={item.article_id}
            className="w-[250px]"
            onClick={() => nav(`/newsDetail/${item.article_id}`)}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={item.image_url || "/img/img_default_news.jpg"}
                className="w-full h-[200px] object-cover"
              />
            </div>
            <h4 className="font-bold line-clamp-1 mt-3">{item?.title}</h4>
            <p className="line-clamp-3 text-[14px] text-[#4a4a4a] mt-3">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
