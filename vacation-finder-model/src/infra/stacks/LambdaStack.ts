import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  vacationsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly testLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const testLambda = new LambdaFunction(this, "Testlambda", {
      runtime: Runtime.NODEJS_22_X,
      handler: "testLambda.main",
      code: Code.fromAsset(join(__dirname, "..", "..", "services")),
      environment: { TABLE_NAME: props.vacationsTable.tableName },
    });

    this.testLambdaIntegration = new LambdaIntegration(testLambda);
  }
}
