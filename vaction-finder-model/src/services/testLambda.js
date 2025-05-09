//Strucuture of cdk lambda example
export async function main(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify("Lambda Test output"),
  };
}
