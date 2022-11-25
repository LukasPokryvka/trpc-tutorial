import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const VerifyToken = ({ hash }: { hash: string }) => {
  const router = useRouter();
  const { data, isLoading } = trpc.user.verifyOtp.useQuery({
    hash,
  });

  if (isLoading) return <p>Verifying...</p>;

  // router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
};

const LoginForm = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const hash = router.asPath.split("#token=")[1];

  const { mutate, error } = trpc.user.requestOtp.useMutation({
    onSuccess: () => {
      setSuccess(true);
    },
  });

  if (hash) return <VerifyToken hash={hash} />;

  const onSubmit = (values: CreateUserInput) => {
    mutate({ ...values, redirect: router.asPath });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>Check your email</p>}

        <h1>Login</h1>
        <input type="email" placeholder="Email" {...register("email")} />
        <br />
        <button type="submit">Login</button>
      </form>

      <Link href="/register">Register</Link>
    </>
  );
};

export default LoginForm;
