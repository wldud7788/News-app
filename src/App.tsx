import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./layouts/Layout";
import { AppRoutes } from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <AppRoutes />
        </Layout>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
