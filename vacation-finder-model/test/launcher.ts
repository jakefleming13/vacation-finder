import { handler } from "../src/services/vacations/handler";

process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = "VacationsTable-0605f1bccdbb";

handler(
  {
    httpMethod: "GET",
    // queryStringParameters: {
    //   id: "cc809a34-2c45-448d-bc78-b9ea130fadab",
    // },
  } as any,
  {} as any
);
