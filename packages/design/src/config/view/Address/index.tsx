import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type PatternComponent } from '../../../Form';
import { AddressComponentProps } from '@atj/forms/src/patterns/address';
import classNames from 'classnames';

const Address: PatternComponent<AddressComponentProps> = props => {
  const { register } = useFormContext();
  return (
    <fieldset className="usa-fieldset">
      <legend className="usa-legend usa-legend--large">Mailing address</legend>
      <label
        className={classNames('usa-label', {
          'usa-label--error': props.childProps.streetAddress.error,
        })}
        htmlFor={props.childProps.streetAddress.inputId}
      >
        {props.childProps.streetAddress.label}
        {props.childProps.streetAddress.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
        )}
      </label>
      <input
        className="usa-input"
        defaultValue={props.childProps.streetAddress.value}
        {...register(props.childProps.streetAddress.inputId, {
          //required: props.childProps.streetAddress.required,
        })}
      />
      <label
        className={classNames('usa-label', {
          'usa-label--error': props.childProps.streetAddress2.error,
        })}
        htmlFor={props.childProps.streetAddress2.inputId}
      >
        {props.childProps.streetAddress2.label}
        {props.childProps.streetAddress2.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
        )}
      </label>
      <input
        className="usa-input"
        defaultValue={props.childProps.streetAddress2.value}
        {...register(props.childProps.streetAddress2.inputId, {
          //required: props.childProps.streetAddress2.required,
        })}
      />
      <label
        className={classNames('usa-label', {
          'usa-label--error': props.childProps.city.error,
        })}
        htmlFor="city"
      >
        {props.childProps.city.label}
        {props.childProps.city.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
        )}
      </label>
      <input
        className="usa-input"
        defaultValue={props.childProps.city.value}
        {...register(props.childProps.city.inputId, {
          //required: props.childProps.city.required,
        })}
      />
      <label
        className={classNames('usa-label', {
          'usa-label--error':
            props.childProps.stateTerritoryOrMilitaryPost.error,
        })}
        htmlFor={props.childProps.stateTerritoryOrMilitaryPost.inputId}
      >
        {props.childProps.stateTerritoryOrMilitaryPost.label}
        {props.childProps.stateTerritoryOrMilitaryPost.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
        )}
      </label>
      <select
        className="usa-select"
        defaultValue={props.childProps.stateTerritoryOrMilitaryPost.value}
        {...register(props.childProps.stateTerritoryOrMilitaryPost.inputId, {
          //required: props.childProps.stateTerritoryOrMilitaryPost.required,
        })}
      >
        <option value="">- Select -</option>
        {props.childProps.stateTerritoryOrMilitaryPost.options.map(
          (jurisdiction, index) => (
            <option key={index} value={jurisdiction.abbr}>
              {jurisdiction.label}
            </option>
          )
        )}
      </select>
      <label
        className={classNames('usa-label', {
          'usa-label--error': props.childProps.zipCode.error,
        })}
        htmlFor={props.childProps.zipCode.inputId}
      >
        {props.childProps.zipCode.label}
        {props.childProps.zipCode.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
        )}
      </label>
      <input
        className="usa-input usa-input--medium"
        pattern="[\d]{5}(-[\d]{4})?"
        defaultValue={props.childProps.zipCode.value}
        {...register(props.childProps.zipCode.inputId, {
          //required: props.childProps.zipCode.required,
        })}
      />
      <label
        className={classNames('usa-label', {
          'usa-label--error': props.childProps.urbanizationCode.error,
        })}
        htmlFor={props.childProps.urbanizationCode.inputId}
      >
        {props.childProps.urbanizationCode.label}
        {props.childProps.urbanizationCode.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            *
          </abbr>
        )}
      </label>
      <input
        className="usa-input"
        defaultValue={props.childProps.urbanizationCode.value}
        {...register(props.childProps.urbanizationCode.inputId, {
          //required: props.childProps.urbanizationCode.required,
        })}
      />
    </fieldset>
  );
};
export default Address;
