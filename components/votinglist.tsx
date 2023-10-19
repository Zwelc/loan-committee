import { ICommitteeVote } from "@/core/models/loans";

export default function VotingList({ votes }: { votes: ICommitteeVote[] }) {
  return (
    <ul role="list" className="divide-y divide-gray-200 ">
      {votes.map((vote) => (
        <li key={vote.id} className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {vote.name.slice(0, 1)}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate ">
                {vote.name}
              </p>
              <p className="text-sm text-gray-500 truncate ">{vote.note}</p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
              {vote.rating}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
