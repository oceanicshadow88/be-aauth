import { logger } from '../../loaders/logger';
import awsServices from '../config/aws';

const noReplyEmail = 'noreply@0l00000l.com';

function cb(email_err: any, email_data: any): void {
  if (email_err) {
    logger.error('Failed to send to email:' + email_err);
  } else {
    logger.info(`Email Sent Success: ${JSON.stringify(email_data)}`);
  }
}

const emailSenderTemplate = (
  toEmail: string,
  fromEmail: string,
  data: any,
  templateName: string,
  callback: (email_err: any, email_data: any) => void,
) => {
  const destination = {
    ToAddresses: [toEmail],
  };

  let params = {
    Source: fromEmail,
    Destination: destination,
    Template: templateName,
    TemplateData: JSON.stringify(data),
  };

  awsServices.ses.sendTemplatedEmail(params, function (email_err: any, email_data: any) {
    if (email_err) {
      callback(email_err, email_data);
    } else {
      callback(null, email_data);
    }
  });
};

export const emailSender = (
  toEmail: string,
  fromEmail: string,
  validationCode: string,
  url: string,
  appName: string,
  domain: string,
  project?: string,
  themeColor: string = '#7291F7',
  emailTemplate: string = 'CustomEmailVerify',
) => {
  const templateData = {
    name: toEmail,
    appName,
    domain,
    url,
    token: validationCode,
    color: themeColor,
    border: `5px solid ${themeColor}`,
    year: '2022',
    project: project ?? appName,
  };
  emailSenderTemplate(toEmail, fromEmail, templateData, emailTemplate, cb);
};

export const sendForgetPasswordTemplate = (
  email: string,
  name: string,
  token: string,
  domain: string,
) => {
  const templateData = {
    name: name ?? email,
    appName: 'TECHSCRUMAPP',
    domain,
    url: '/reset-password',
    color: '#7291F7',
    border: '5px solid #7291F7',
    year: '2022',
    project: 'abc',
    token: `t=${token}`,
    time: ' 30 minutes',
  };

  emailSenderTemplate(email, noReplyEmail, templateData, 'ForgotPassword', cb);
};
