import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Finance from "@/public/finance.svg";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="h-full w-full  flex items-center justify-between">
      <section className="w-full h-full flex justify-between items-center">
        <div className=" space-y-4">
          <h1 className="text-6xl">Loans R Us</h1>
          <p>
            At, Loans R Us, a fictional loan provider, loans are given out to
            customers based on the votes of 3 committee members. Their process
            is to give all the relevant information about the loan to the
            members and then have each rate the likelihood that the loan will
            work out on a scale from 1 to 5.
          </p>
          <button
            onClick={() =>
              signIn("Credentials", {
                callbackUrl: `${window.location.origin}/dashboard`,
              })
            }
            className="text-white bg-primary  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Get Started
          </button>
        </div>
      </section>
      <section className="w-full h-full m-4">
        <Image className="h-full w-full" src={Finance} alt="finance" />
      </section>
    </main>
  );
}
