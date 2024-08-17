import { createCustomServer } from './server.js';
import { createPostgresDatabaseContext } from '@atj/database';

const port = process.env.PORT || 4321;

const database = createPostgresDatabaseContext();
createCustomServer({ db: database }).then((server: any) =>
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
);
