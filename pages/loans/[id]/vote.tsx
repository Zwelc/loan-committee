import { ICommitteeVote } from "@/core/models/loans";
import { useLoan } from "@/hooks/applications";
import { checkStatus } from "@/components/status";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import GoBackButton from "@/components/goback";
import { useState } from "react";

import DetailsIndicator from "@/components/detailsIndicator";

export default function Page({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useLoan(id);

  const [vote, setVote] = useState({ rating: 0, note: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVote((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resp = await fetch(`/api/loans/${id}`, {
      method: "POST",
      body: JSON.stringify({
        rating: vote.rating,
        note: vote.note,
        name: session?.user?.name,
      }),
    });
    if (resp) {
      router.back();
    }
  };
  if (isLoading) {
    return (
      <div>
        <header className="my-2">
          <GoBackButton />
        </header>

        <section className=" h-64 w-full bg-gray-400 animate-pulse"></section>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full items-center justify-between">
      <div className="w-full h-full py-4 space-y-4">
        <header className="my-2">
          <div className="flex justify-between">
            <h1 className="text-3xl align-middle">
              <GoBackButton /> Loan Application for: {data?.reason}
            </h1>

            <div className="flex space-x-2">
              <div>{checkStatus(data?.votes)}</div>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="flex space-x-6 my-2">
              <DetailsIndicator label="Loan Amount" detail={data?.amount} />
              <DetailsIndicator label="Loan Duration" detail={data?.term} />
              <DetailsIndicator
                label="Applied On"
                detail={new Date(data?.appliedAt).toLocaleDateString()}
              />
            </div>
          </div>
        </header>
        <div className="px-6 py-6 ">
          <h3 className="mb-4 text-xl font-medium text-gray-900 ">Vote Now</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 e"
              >
                Select an rating option
              </label>
              <select
                name="rating"
                onChange={handleChange}
                value={vote.rating}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option selected>Choose a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your notes
              </label>
              <textarea
                name="note"
                onChange={handleChange}
                rows={4}
                value={vote.note}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <button className="text-white bg-primary  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
              Submit
            </button>
          </form>
        </div>
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
