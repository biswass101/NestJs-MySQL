export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  dev: {
    port: process.env.PORT
  },
  db: {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME 
  },
  nodeMailer: {
    node_mailer_auth: process.env.NODE_MAILER_AUTH,
    node_mailer_pass: process.env.NODE_MAILER_PASS
  }
});
