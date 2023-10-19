export interface ILoanApplication {
  id: number;
  customer: {
    name: string;
    contact_number: string;
    email: string;
    income: number;
    credit_score: number;
  };
  amount: number;
  term: number;
  applied_at: string;

  reason: string;
  notes: string[];
  votes: ICommitteeVote[];
}
export interface ICommitteeVote {
  id: string;
  name: string;
  rating: number;
  note: string;
}
