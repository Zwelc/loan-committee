import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  const { data: session } = useSession();

  const handleLogin = () =>
    signIn("Credentials", {
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  const handleLogout = () =>
    signOut({
      callbackUrl: window.location.origin + "/",
      redirect: true,
    });
  return (
    <nav className="h-16 w-full bg-gray-100 shadow-md px-6">
      <div className="h-full w-full mx-auto container flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Loan Committee</h2>
        <div>
          {session && <button onClick={handleLogout}>Sign Out</button>}
          {!session && <button onClick={handleLogin}>Sign In</button>}
        </div>
      </div>
    </nav>
  );
}
