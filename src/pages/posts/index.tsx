import Link from "next/link";
import { trpc } from "../../utils/trpc";

const PostsPage = () => {
  const { data, isLoading, error } = trpc.post.posts.useQuery();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {data?.map((post) => (
        <article key={post.id}>
          <p>{post.title}</p>
          <Link href={`/posts/${post.id}`}>Read post</Link>
        </article>
      ))}
    </div>
  );
};

export default PostsPage;
