import LoginClient from './LoginClient';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const hasError = params.error === "invalid";

  return <LoginClient hasError={hasError} />;
}
