import dotenv from 'dotenv';
dotenv.config();

export const user = process.env.POSTGRES_USER;
export const port = process.env.POSTGRES_PORT;
export const password = process.env.POSTGRES_PASSWORD;
export const host = process.env.POSTGRES_HOST;
export const database = process.env.POSTGRES_DB;
