import { ICommitteeVote } from "@/core/models/loans";

export function getAverageRating(votes: ICommitteeVote[]) {
  let score = 0;

  votes.forEach((vote) => {
    score += vote.rating;
  });
  return score / votes.length;
}
