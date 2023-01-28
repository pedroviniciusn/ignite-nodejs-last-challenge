import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from 'src/utils/dynamodbClient';

interface ITodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean,
  created_at: number;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.query({
    TableName: "users_todos",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id,
    },
  }).promise();

  const todo = response.Items[0] as ITodo;

  if (todo) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        todo
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Nenhum todo encontrado!"
    })
  }
}