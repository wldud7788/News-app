import { mockDataItemType, mockNewsData } from "./mockData";

interface NewsItem {
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

interface CachedData {
  timestamp: number;
  data: NewsItem[] | mockDataItemType[];
}

// 1시간을 캐싱 타임으로 설정
const CACHE_DURATION = 1000 * 60 * 60;

// 뉴스 데이터 호출 함수
export const fetchNews = async (): Promise<NewsItem[] | mockDataItemType[]> => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  // localStorage에서 캐시된 데이터 확인
  const cachedData = localStorage.getItem("newsCache");
  if (cachedData) {
    const parsed: CachedData = JSON.parse(cachedData);
    const now = Date.now();

    // 캐시가 유효한 경우 캐시된 데이터 반환
    if (now - parsed.timestamp < CACHE_DURATION) {
      return parsed.data;
    }
  }

  // 캐시된 데이터가 없거나, 1시간이 지났다면? 새로운 데이터 호출
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=ko`
    );

    if (!res.ok) {
      throw new Error("뉴스를 불러오는데 실패했습니다.");
    }

    const data = await res.json();
    const newsData = data.results || [];

    // 새로운 데이터를 캐시에 저장
    const cacheData: CachedData = {
      timestamp: Date.now(),
      data: newsData,
    };

    localStorage.setItem("newsCache", JSON.stringify(cacheData));

    return newsData;
  } catch (error) {
    if (error instanceof Error) {
      console.error("뉴스 데이터 fetch 실패:", error.message);
    } else {
      console.error("알 수 없는 에러 발생:", error);
    }

    // API호출 실패 시 mockData 사용
    return mockNewsData;
  }
};
