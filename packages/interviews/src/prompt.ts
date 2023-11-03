// Initially, make this very basic. We may want to support variants of prompts
// for multi-language, or to provide alternative presentation formats.
export type Prompt = Readonly<{
  title: string;
  description?: string;
  placeholder?: string;
}>;
