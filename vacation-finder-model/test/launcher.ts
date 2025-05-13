import { handler } from "../src/services/vacations/handler";

process.env.AWS_REGION = "eu-east-2";
process.env.TABLE_NAME = "VacationsTable-0605f1bccdbb";

handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({
      location: "London",
    }),
  } as any,
  {} as any
);
