import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

const mailConfig = {
  useFactory: async (config: ConfigService) => ({
    transport: {
      host: config.get('MAIL_HOST') as string,
      secure: false,
      auth: {
        user: config.get('MAIL_USER') as string,
        pass: config.get('MAIL_PASSWORD') as string,
      },
    },
    defaults: {
      from: `"No Reply" <${config.get('MAIL_FROM') as string}>`,
    },
    template: {
      dir: join(__dirname, '..', 'mail', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
};
export default mailConfig;
