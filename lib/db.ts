// import { Pool } from 'pg';
// import { Buffer } from 'buffer';

// if (!process.env.DB_PORT) {
//   throw new Error('Port could not find on env.');
// }

// const dbUser = process.env.DB_USER;
// const dbHost = process.env.DB_HOST;
// const dbName = process.env.DB_NAME;
// const dbPassword = process.env.DB_PASSWORD;
// const dbPort = parseInt(process.env.DB_PORT, 10);
// const sslCertBase64 = process.env.SSL_CERT;

// if (!sslCertBase64) {
//   throw new Error('SSL certificate must be provided');
// }

// const sslCert = Buffer.from(sslCertBase64, 'base64').toString('utf-8');

// const pool = new Pool({
//   user: dbUser,
//   host: dbHost,
//   database: dbName,
//   password: dbPassword,
//   port: dbPort,
//   ssl: {
//     rejectUnauthorized: true,
//     ca: sslCert,
//   },
// });

// export default pool;
