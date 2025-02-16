import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchNews } from "../api/api";

import { CommentList } from "../components/newsDetail/CommentList";
import { CommentForm } from "../components/newsDetail/CommentForm";
import { NewsInfo } from "../components/newsDetail/NewsInfo";

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
      <NewsInfo currentNews={currentNews} />

      {/* 댓글 부분 */}
      <CommentForm articleId={currentNews?.article_id} />
      <CommentList articleId={currentNews?.article_id} />
    </div>
  );
};
