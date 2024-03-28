import { beforeEach, describe, expect, it } from 'vitest';
import { FormBuilder } from '.';
import { defaultFormConfig } from '../patterns';

describe('form builder', () => {
  let builder: FormBuilder;

  beforeEach(() => {
    builder = new FormBuilder();
  });

  it('addPattern adds initial pattern of given type', () => {
    expect(Object.keys(builder.form.patterns).length).toEqual(1);
    builder.addPattern(defaultFormConfig, 'input');
    expect(Object.keys(builder.form.patterns).length).toEqual(2);
  });
});
