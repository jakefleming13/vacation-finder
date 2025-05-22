import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";

const app = new App();
//Database Stack
const dataStack = new DataStack(app, "DataStack");

//LambdaFunctions Stack
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  vacationsTable: dataStack.vacationsTable,
});

//Cognito User Pools stack
new AuthStack(app, "AuthStack");

//API Gateway stack
new ApiStack(app, "ApiStack", {
  vacationsLambdaIntegration: lambdaStack.vacationsLambdaIntegration,
});
