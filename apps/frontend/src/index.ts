import { Backend } from './state/context';
import { createAppRoot } from './views/main';

createAppRoot(document.getElementById('root') as HTMLElement, {
  backend: new (class implements Backend {
    helloWorld(echoValue: string) {
      return `Hello, ${echoValue}!`;
    }
  })(),
});
