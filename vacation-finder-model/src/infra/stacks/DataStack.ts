import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";

//Stack that will contain the Dynamodb database
export class DataStack extends Stack {
  public readonly vacationsTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.vacationsTable = new Table(this, "VacationsTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      //To make tablename unique, use the stack suffix
      tableName: `VacationsTable-${suffix}`,
    });
  }
}
