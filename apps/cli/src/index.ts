const { join } = require('path');
const { CliController } = require('./cli-controller');

// This should map to the directory containing the package.json.
// By convention, assume that the originating process was run from the root
// directory.
const workspaceRoot = join(process.cwd(), '../../');

const app = CliController({
  console,
  workspaceRoot,
  /*docassemble: {
    fetch,
    apiUrl: 'http://localhost:8011',
    apiKey: process.env.VITE_DOCASSEMBLE_API_KEY || '',
  },*/
});
app.parseAsync(process.argv).then(() => console.error('Exiting...'));
