import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new App();
//Database Stack
const dataStack = new DataStack(app, "DataStack");

//LambdaFunctions Stack
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  vacationsTable: dataStack.vacationsTable,
});

//API Gateway stack
new ApiStack(app, "ApiStack", {
  testLambdaIntegration: lambdaStack.testLambdaIntegration,
});
