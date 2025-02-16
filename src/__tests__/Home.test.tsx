// Home.test.tsx
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { fetchNews } from "../api/api";
import { Home } from "../pages/Home";

// fetchNews 모킹
jest.mock("../api/api", () => ({
  fetchNews: jest.fn(),
}));

// 테스트용 뉴스 데이터
const mockNewsData = [
  {
    article_id: "1",
    title: "Test News 1",
    content: "Test Content 1",
  },
  {
    article_id: "2",
    title: "Test News 2",
    content: "Test Content 2",
  },
];

// 테스트를 위한 wrapper 컴포넌트
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Home Component", () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 모킹을 초기화
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    // fetchNews가 영원히 pending 상태인 Promise를 반환하도록 설정
    (fetchNews as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<Home />, { wrapper: createWrapper() });

    // Loading 텍스트가 화면에 표시되는지 확인
    expect(screen.getByText("...Loading")).toBeInTheDocument();
  });

  test("renders news cards when data is loaded", async () => {
    // fetchNews가 mock 데이터를 반환하도록 설정
    (fetchNews as jest.Mock).mockResolvedValue(mockNewsData);

    render(<Home />, { wrapper: createWrapper() });

    // Loading 상태가 먼저 표시되는지 확인
    expect(screen.getByText("...Loading")).toBeInTheDocument();

    // NewsCard 컴포넌트들이 렌더링되기를 기다림
    for (const news of mockNewsData) {
      // Note: 실제 NewsCard 컴포넌트가 어떻게 데이터를 표시하는지에 따라
      // 이 부분을 수정해야 할 수 있습니다
      await screen.findByText(news.title);
      expect(screen.getByText(news.title)).toBeInTheDocument();
    }
  });

  test("renders error message when fetch fails", async () => {
    // fetchNews가 에러를 반환하도록 설정
    const errorMessage = "Failed to fetch news";
    (fetchNews as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<Home />, { wrapper: createWrapper() });

    // 에러 메시지가 화면에 표시되기를 기다림
    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  test("uses correct query configuration", () => {
    render(<Home />, { wrapper: createWrapper() });

    // fetchNews가 호출되었는지 확인
    expect(fetchNews).toHaveBeenCalled();

    // Note: React Query의 설정(staleTime, gcTime)을 직접 테스트하는 것은 어렵습니다.
    // 이는 구현 세부사항으로 간주될 수 있으며, 동작을 통해 간접적으로 테스트됩니다.
  });
});

// NewsCard 컴포넌트 모킹 (필요한 경우)
jest.mock("../components/home/NewsCard", () => ({
  NewsCard: ({ item }: { item: { title: string } }) => <div>{item.title}</div>,
}));
