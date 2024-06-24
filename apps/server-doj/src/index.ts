import { createServer } from '@atj/server/dist/index.js';

const app = await createServer({
  title: 'DOJ Form Service',
});
const port = process.env.PORT || 4321;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
