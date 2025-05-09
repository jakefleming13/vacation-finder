import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";

export class LambdaStack extends Stack {
  public readonly testLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const testLambda = new LambdaFunction(this, "Testlambda", {
      runtime: Runtime.NODEJS_22_X,
      handler: "testLambda.main",
      code: Code.fromAsset(join(__dirname, "..", "..", "services")),
    });

    this.testLambdaIntegration = new LambdaIntegration(testLambda);
  }
}
