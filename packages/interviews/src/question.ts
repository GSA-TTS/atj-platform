import { type FactPrompt, type Facts } from './fact';

export type Question = {
  id: string;
  fact: Facts.Fact;
  prompt: FactPrompt;
};
