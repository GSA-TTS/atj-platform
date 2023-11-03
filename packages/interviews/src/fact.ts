export namespace Facts {
  export type Type = string;
  type BaseFact<typ extends Type, T> = {
    type: typ;
    initial: T;
  };
  export type BooleanFact = BaseFact<'boolean', boolean>;
  export type TextFact = BaseFact<'text', string>;
  export type Fact = BooleanFact | TextFact;
  export type factValueType<F> = F extends BaseFact<infer T, infer T2>
    ? T2
    : never;
}

type Process<F extends Facts.Fact> = (
  value?: any
) => { ok: true; value: F['initial'] } | { ok: false; error: any };

// Initially, make this very basic. We may want to support variants of prompts
// for multi-language, or to provide alternative presentation formats.
export type FactPrompt = {
  id: Facts.Type;
  title: string;
  description?: string;
  placeholder?: string;
};
