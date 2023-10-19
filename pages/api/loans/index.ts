import { ILoanApplication } from "@/core/models/loans";
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const applications = await prisma.applications.findMany();
  res.status(200).json(applications);
}
