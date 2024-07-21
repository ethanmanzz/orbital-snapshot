import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: 'ap-southeast-1' });

export default snsClient;
export { PublishCommand };