import { Field } from '../field.js';
import { capitalizeFirstLetter } from '../util/string-format.js';

export type FieldTransformer = (field: Field) => Field;

/**
 * A presentation transformer takes a field in a raw form, such as extracted
 * from a PDF, and formats it to be a resonable starting point for end-user
 * presentation.
 *
 * This function might be updated later to include a configurable list of
 * transformations to apply to a field, pipeline style. For now, just add some
 * reasonable capitalization to a field.
 */
export const getPresentationTranformer = () => {
  return capitalizeLabelsTransformer;
};

const capitalizeLabelsTransformer: FieldTransformer = (field: Field) => ({
  ...field,
  label: capitalizeFirstLetter(field.label),
});
