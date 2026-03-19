import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  // DATABASE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    // DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const validationResult = envsSchema.validate(process.env);

if (validationResult.error) {
  throw new Error(`Config validation error: ${validationResult.error.message}`);
}

const envVars: EnvVars = validationResult.value as EnvVars;

export const envs = {
  port: envVars.PORT,
  // databaseUrl: envVars.DATABASE_URL,
};
