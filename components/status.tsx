import { LoanStatus } from "@/core/enums/status";
import { ICommitteeVote } from "@/core/models/loans";

export const statusIndicator = (votes?: ICommitteeVote[]) => {
  return votes?.length === 3 ? (
    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">
      {LoanStatus.complete}
    </span>
  ) : votes?.length === 0 ? (
    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      {LoanStatus.pending}
    </span>
  ) : (
    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      {LoanStatus.inProgress}
    </span>
  );
};

export const checkStatus = (votes?: ICommitteeVote[]) => {
  return votes?.length === 3
    ? LoanStatus.complete
    : votes?.length === 0
    ? LoanStatus.pending
    : LoanStatus.inProgress;
};
export const checkUserStatus = (name?: string, votes?: ICommitteeVote[]) => {
  const voteExists = votes?.filter((vote) => vote.name === name);

  return voteExists && voteExists.length > 0;
};
