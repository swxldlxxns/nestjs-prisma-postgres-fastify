import { registerAs } from '@nestjs/config';

import { EnvInterface } from './interfaces/env.interface';

export default registerAs(
  'config',
  (): EnvInterface => ({
    jwt: {
      expiresIn: process.env.JWT_EXPIRES_IN,
      secret: process.env.JWT_SECRET,
    },
  }),
);
