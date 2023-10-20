# Introduction

At, Loans R Us, a fictional loan provider, loans are given out to customers based on the votes of 3 committee members. Their process is to give all the relevant information about the loan to the members and then have each rate the likelihood that the loan will work out on a scale from 1 to 5. The company is moving towards a hybrid working arrangement and would like a tool that will allow this process to take place remotely and asynchronously. Further, the company would like to formalize the process and prevent the committee members from influencing each other. Thus, they would like this tool to be created. This project is to create a proof of concept implementation of this tool.

## Getting Started

Setting up:

Create a `.env` file at the root of the repository with the following:

```env
DATABASE_URL=<yourMongoDBConnectionString>
NEXTAUTH_SECRET=<yourJWTSecret>
```

Install dependencies

```bash
npm install
```

Instantiate the prisma client

```bash
npx prisma generate
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
