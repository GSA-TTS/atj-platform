export interface Backend {
  helloWorld(echoValue: string): string;
}

export interface Context {
  backend: Backend;
}
