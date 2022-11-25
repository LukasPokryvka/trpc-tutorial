import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import { AppRouter } from "../server/route/app.router";
import { url } from "../constants";
import { trpc } from "../utils/trpc";
import { UserContextProvider } from "../context/user.context";

function App({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.user.me.useQuery();

  if (isLoading) return <>Loading user...</>;
  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        url,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return { ...ctx.req.headers, "x-ssr": "1" };
        }
        return {};
      },
      links,
      transformer: superjson,
    };
  },
  ssr: false,
})(App);
