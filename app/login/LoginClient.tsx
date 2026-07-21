"use client";

import { useTransition } from "react";
import { loginWithPin } from "../actions/auth";
import LoginScreen from "./LoginScreen";

interface LoginClientProps {
  hasError?: boolean;
}

export default function LoginClient({ hasError = false }: LoginClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (pin: string) => {
    startTransition(async () => {
      await loginWithPin(pin);
      // Se o pin estiver certo, loginWithPin já dá redirect("/") lá dentro,
      // então esse código abaixo só roda se o redirect não acontecer.
    });
  };

  return (
    <LoginScreen
      pinLength={4}
      isSubmitting={isPending}
      hasExternalError={hasError}
      onSubmit={handleSubmit}
    />
  );
}