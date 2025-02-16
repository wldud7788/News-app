import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../api/api";
import { NewsCard } from "../components/home/NewsCard";

export const Home = () => {
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
  return (
    <div className="flex flex-wrap justify-center gap-[30px]">
      {news?.map((item) => {
        return <NewsCard key={item.article_id} item={item} />;
      })}
    </div>
  );
};
