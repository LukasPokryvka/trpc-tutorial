import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const RegisterPage = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();

  const { mutate, error } = trpc.user.registerUser.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const router = useRouter();

  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        <h1>Register</h1>
        <input type="email" placeholder="Email" {...register("email")} />
        <br />
        <input type="text" placeholder="Name" {...register("name")} />
        <button type="submit">Register</button>
      </form>

      <Link href="/login">Login</Link>
    </>
  );
};

export default RegisterPage;
