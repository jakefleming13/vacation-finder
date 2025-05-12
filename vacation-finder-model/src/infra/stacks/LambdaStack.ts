import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  vacationsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly vacationsLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const vacationsLambda = new NodejsFunction(this, "vacationsLambda", {
      runtime: Runtime.NODEJS_22_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "vacations", "handler.ts"),
      environment: { TABLE_NAME: props.vacationsTable.tableName },
    });

    this.vacationsLambdaIntegration = new LambdaIntegration(vacationsLambda);
  }
}
