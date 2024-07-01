import { createCustomServer } from './server';

const port = process.env.PORT || 4321;
const app = await createCustomServer();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
