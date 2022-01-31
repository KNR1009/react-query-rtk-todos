import { VFC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MainTask } from "./components/MainTask";

// キャッシュにアクセスするためのクライアントを作成
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: VFC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <MainTask />
            </Route>
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
