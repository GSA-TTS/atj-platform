import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    const response: APIGatewayProxyResult = {
      statusCode: 400,
      body: JSON.stringify({ message: 'Request body is missing.' }),
    };
    return response;
  }

  const body = Buffer.from(event.body, 'base64').toString('utf-8');
  const formData = new URLSearchParams(body);
  const fullName = formData.get('full_name');
  if (!fullName) {
    const response: APIGatewayProxyResult = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Full name is required.',
      }),
    };
    return response;
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello, ${fullName}!` }),
  };
  return response;
};
