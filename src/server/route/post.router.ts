import { TRPCError } from "@trpc/server";
import {
  createPostSchema,
  getSinglePostSchema,
} from "../../schema/post.schema";
import { publicProcedure, router } from "../createRouter";

export const postRouter = router({
  createPost: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot create post while logged out.",
        });
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });

      return post;
    }),
  posts: publicProcedure.query(({ ctx }) => ctx.prisma.post.findMany()),
  singlePost: publicProcedure
    .input(getSinglePostSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      })
    ),
});
