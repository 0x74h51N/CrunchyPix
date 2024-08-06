import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-north-1' });

const sns = new AWS.SNS();
const arn = process.env.AWS_SNS_ARN;
export async function notifySNS(message: string) {
  const params = {
    Message: message,
    TopicArn: arn,
  };

  try {
    await sns.publish(params).promise();
    console.log('SNS notification sent successfully');
  } catch (error) {
    console.error('Error sending SNS notification:', error);
  }
}
