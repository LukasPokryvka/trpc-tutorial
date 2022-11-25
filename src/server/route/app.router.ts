import { router } from "../createRouter";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
