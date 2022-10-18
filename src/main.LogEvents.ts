import { SNSEvent } from "aws-lambda";

export async function handler(event: SNSEvent): Promise<void> {
  event.Records.forEach(console.log);
}