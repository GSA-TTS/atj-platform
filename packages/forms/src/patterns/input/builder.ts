import { PatternBuilder } from '../../pattern';
import { type InputPattern } from '.';

export class Input extends PatternBuilder<InputPattern> {
  toPattern(): InputPattern {
    return {
      id: this.id,
      type: 'input',
      data: this.data,
    };
  }
}
