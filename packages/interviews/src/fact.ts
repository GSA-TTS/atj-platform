export type Type = string;

type BaseFact<typ extends Type, T> = Readonly<{
  type: typ;
  initial: T;
}>;

export type BooleanFact = BaseFact<'boolean', boolean | null>;
export type TextFact = BaseFact<'text', string>;

export type Fact = BooleanFact | TextFact;

export type factValueType<F> = F extends BaseFact<infer T, infer T2>
  ? T2
  : never;
