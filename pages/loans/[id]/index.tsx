import { ICommitteeVote } from "@/core/models/loans";
import { useLoan } from "@/hooks/applications";
import { checkStatus, checkUserStatus } from "@/components/status";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import VotingList from "@/components/votinglist";
import Link from "next/link";
import GoBackButton from "@/components/goback";
import { LoanStatus } from "@/core/enums/status";
import DetailsRow from "@/components/detailsRow";
import DetailsIndicator from "@/components/detailsIndicator";
import { getAverageRating } from "@/lib/rating";

export default function Page({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useLoan(id);

  if (isLoading) {
    return (
      <div>
        <header className="my-2">
          <button onClick={() => router.back()}>Go Back</button>
        </header>

        <section className=" h-64 w-full bg-gray-400 animate-pulse"></section>
      </div>
    );
  }
  const myStatus = checkUserStatus(session?.user?.name!, data?.votes);
  const appStatus = checkStatus(data?.votes);
  return (
    <div className="flex w-full h-full items-center justify-between">
      <div className="w-full h-full py-4 space-y-4">
        <header className="my-2">
          <div className="flex justify-between">
            <h1 className="text-3xl align-middle">
              <GoBackButton /> Loan Application for: {data?.reason}
            </h1>

            <div className="flex space-x-2">
              {!myStatus && (
                <div className="text-white bg-primary  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                  <Link href={`/loans/${id}/vote`}>Vote</Link>
                </div>
              )}
              <div>{appStatus}</div>
            </div>
          </div>
          <div className="flex space-x-6 my-2">
            <DetailsIndicator label="Loan Amount" detail={data?.amount} />
            <DetailsIndicator label="Loan Duration" detail={data?.term} />
            <DetailsIndicator
              label="Applied On"
              detail={new Date(data?.appliedAt).toLocaleDateString()}
            />
            {appStatus === LoanStatus.complete && (
              <DetailsIndicator
                label="Average Rating"
                detail={getAverageRating(data.votes).toString()}
              />
            )}
          </div>
        </header>
        <main className="grid grid-cols-2 grid-rows-2 gap-6">
          <section className="shadow-md shadow-gray-100 row-span-2 m-2">
            <h4 className="text-2xl border-b ">Applicant Details: </h4>
            <div className="divide-y divide-gray-200 ">
              <DetailsRow label="Customer:" detail={data?.customer.name} />
              <DetailsRow
                label="Credit Score:"
                detail={data?.customer.creditScore}
              />
              <DetailsRow label="Income:" detail={data?.customer.income} />
              <DetailsRow
                label="Contact Number:"
                detail={data?.customer.contactNumber}
              />
            </div>
          </section>
          <section className="shadow-md shadow-gray-100 m-2">
            <h4 className="text-2xl border-b ">My Vote: </h4>
            {myStatus ? (
              <VotingList
                votes={data?.votes.filter(
                  (vote: ICommitteeVote) => vote.name == session?.user?.name
                )}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg ">
                <div className="px-3 py-1 text-xs font-medium leading-none text-center text-accent-800 bg-secondary rounded-full ">
                  You still need to vote on this application
                </div>
              </div>
            )}
          </section>

          <section className="shadow-md shadow-gray-100 m-2">
            <h4 className="text-2xl border-b ">Commitee votes: </h4>
            {appStatus === LoanStatus.complete ? (
              <VotingList
                votes={data?.votes.filter(
                  (vote: ICommitteeVote) => vote.name != session?.user?.name
                )}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg ">
                <div className="px-3 py-1 text-xs font-medium leading-none text-center text-accent-800 bg-secondary rounded-full ">
                  Results are hidden until all users have voted
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  return { props: { id: params.id } };
}
