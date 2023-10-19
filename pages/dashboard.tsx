import { useLoans } from "@/hooks/applications";
import { checkStatus, checkUserStatus } from "@/components/status";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const { data: loans, isLoading, isError } = useLoans();

  const columns = [
    "Date",
    "Reason",
    "Credit Score",
    "Term",
    "Amount",
    "Status",
    "",
  ];
  const handleLogout = () =>
    signOut({
      callbackUrl: window.location.origin + "/",
      redirect: true,
    });
  if (isLoading) {
    return;
  }
  return (
    <main className="flex w-full h-full items-center justify-between">
      <div className="w-full h-full py-4 space-y-4">
        <h2 className="text-xl">Welcome {session?.user?.name}</h2>
        <h1 className="text-3xl">Current Loan Applications</h1>
        <div className="w-full h-full relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col" className="px-6 py-3">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr className=" w-full h-full animate-pulse"></tr>}
              {!isLoading &&
                loans.map((loan: any) => (
                  <tr key={loan.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {new Date(loan.appliedAt).toLocaleDateString()}
                    </th>
                    <td className="px-6 py-4">{loan.reason}</td>
                    <td className="px-6 py-4">{loan.customer.creditScore}</td>
                    <td className="px-6 py-4">{loan.term}</td>
                    <td className="px-6 py-4">{loan.amount}</td>
                    <td className="px-6 py-4">{checkStatus(loan.votes)}</td>
                    <td className="px-6 py-4">
                      <Link
                        className="bg-primary text-white rounded py-0.5 px-2"
                        href={`/loans/${loan.id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
