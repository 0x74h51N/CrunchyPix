import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-north-1' });

const sns = new AWS.SNS();
const arn = process.env.AWS_SNS_ARN;

export async function notifySNS(name: string, email: string, message: string) {
  const params = {
    Message: `New message from ${name} (${email}): ${message}`,
    TopicArn: arn,
    MessageAttributes: {
      SenderName: {
        DataType: 'String',
        StringValue: name,
      },
      SenderEmail: {
        DataType: 'String',
        StringValue: email,
      },
      MessageContent: {
        DataType: 'String',
        StringValue: message,
      },
    },
  };

  try {
    await sns.publish(params).promise();
    console.log('SNS notification sent successfully');
  } catch (error) {
    console.error('Error sending SNS notification:', error);
  }
}
