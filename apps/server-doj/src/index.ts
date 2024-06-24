import express from 'express';
//const { handler } = require('@atj/server');

const createServer = async () => {
  // @ts-ignore
  const { handler } = await import('@atj/server');
  const app = express();
  app.use(handler);
  return app;
};

const app = await createServer();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
