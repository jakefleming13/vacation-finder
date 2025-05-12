import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  vacationsLambdaIntegration: LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "VacationsApi");
    const vacationResource = api.root.addResource("vacations");

    //Link to lambda that we created
    vacationResource.addMethod("GET", props.vacationsLambdaIntegration);
    vacationResource.addMethod("POST", props.vacationsLambdaIntegration);
  }
}
