import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = req.query.id;
  const { method } = req;
  if (id !== undefined && !Array.isArray(id)) {
    if (method === "GET") {
      const application = await prisma.applications.findFirst({
        where: { id: id },
      });

      if (!application) {
        throw new Error("Application not found");
      }
      res.status(200).json(application);
    }

    if (method === "POST") {
      const { body } = req;
      const data = JSON.parse(body);
      const user = await prisma.user.findFirst({ where: { name: data.name } });
      const update = await prisma.applications.update({
        where: { id: id },
        data: {
          votes: {
            push: {
              name: data.name,
              rating: +data.rating,
              note: data.note,
              id: user!.id,
            },
          },
        },
      });
      res.status(201).json(update);
    }
  }
}
