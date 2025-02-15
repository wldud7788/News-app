import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchNews } from "../api/api";

import { CommentList } from "../components/newsDetail/CommentList";
import { CommentForm } from "../components/newsDetail/CommentForm";

export const NewsDetail = () => {
  const params = useParams();

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

  const currentNews = news?.find((item) => item.article_id === params.id);

  if (!currentNews) {
    return <div>뉴스를 찾을 수 없습니다.</div>;
  }

  return (
    <div key={currentNews.article_id} className="w-full">
      <div className="rounded-lg overflow-hidden h-[300px]">
        <img
          src={currentNews.image_url || "/img/img_default_news.jpg"}
          className="w-full object-cover"
        />
      </div>
      <h4 className="font-bold mt-3">{currentNews.title}</h4>
      <p className="text-[14px] text-[#4a4a4a] mt-3">
        {currentNews?.description}
      </p>

      {/* 댓글 부분 */}
      <CommentForm articleId={currentNews?.article_id} />
      <CommentList articleId={currentNews?.article_id} />
    </div>
  );
};
