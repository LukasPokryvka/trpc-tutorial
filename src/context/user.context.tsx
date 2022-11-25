import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["procedures"]["user"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["procedures"]["user"][TRouteKey]
>;
const UserContext = createContext<InferQueryOutput<"me">>(null);

const UserContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"me"> | undefined;
}) => {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
