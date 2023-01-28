import { APIGatewayProxyHandler } from "aws-lambda";
import dayjs from "dayjs";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title } = JSON.parse(event.body);

  await document
    .put({
      TableName: "users_todos",
      Item: {
        id: uuidV4(),
        user_id: user_id,
        title,
        done: false,
        created_at: dayjs().get("date"),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo criado com sucesso!",
    }),
  };
};
