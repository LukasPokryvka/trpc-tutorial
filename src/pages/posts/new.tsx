import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

const CreatePostPage = () => {
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const { mutate, error } = trpc.post.createPost.useMutation({
    onSuccess({ id }) {
      router.push(`/posts/${id}`);
    },
  });

  const router = useRouter();

  const onSubmit = (values: CreatePostInput) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}
      <h1>Create post</h1>
      <input type="text" placeholder="Post title" {...register("title")} />
      <br />
      <textarea placeholder="Post body" {...register("body")}></textarea>
      <br />
      <button>Create post</button>
    </form>
  );
};

export default CreatePostPage;
