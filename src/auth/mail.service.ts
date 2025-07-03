import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('nodeMailer.node_mailer_auth'),
        pass: this.configService.get('nodeMailer.node_mailer_pass'),
      }, 
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    console.log("helloe ", this.configService.get('nodeMailer.node_mailer_auth'));
    console.log("pass: ", this.configService.get('nodeMailer.node_mailer_pass'));
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend Service',
      to,
      subject: 'Password Reset Link',
      html: `<p>
                You requested a password rest. Click the link below to reset your password:</p>
                <p>
                    <a href="${resetLink}">Reset Password</a>
                </p>
            </p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
