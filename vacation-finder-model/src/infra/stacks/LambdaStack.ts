import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  vacationsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly testLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const testLambda = new NodejsFunction(this, "Testlambda", {
      runtime: Runtime.NODEJS_22_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "testLambda.ts"),
      environment: { TABLE_NAME: props.vacationsTable.tableName },
    });

    testLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:ListAllMyBuckets", "s3:ListBucket"],
        resources: ["*"], //Specify all resources, will need to change later
      })
    );

    this.testLambdaIntegration = new LambdaIntegration(testLambda);
  }
}
