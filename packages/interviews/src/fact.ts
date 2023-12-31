export type Type = string;

type BaseFact<Typ extends Type, T> = Readonly<{
  type: Typ;
  initial: T;
}>;

export type BooleanFact = BaseFact<'boolean', boolean | undefined>;
export type TextFact = BaseFact<'text', string>;

export type Fact = BooleanFact | TextFact;

export type factValueType<F> = F extends BaseFact<infer T, infer T2>
  ? T2
  : never;
