import React, { useState, useRef, useEffect } from 'react';

import { defaultFormConfig, type PatternConfig } from '@atj/forms';

import { useFormManagerStore } from '../store.js';

import styles from './formEditStyles.module.css';
import blockIcon from './images/block-icon.svg';
import checkboxIcon from './images/checkbox-icon.svg';
import dateIcon from './images/date-icon.svg';
import dropDownIcon from './images/dropdown-icon.svg';
import dropDownOptionIcon from './images/dropdownoption-icon.svg';
import richTextIcon from './images/richtext-icon.svg';
import longanswerIcon from './images/longanswer-icon.svg';
import pageIcon from './images/page-icon.svg';
import shortanswerIcon from './images/shortanswer-icon.svg';
import singleselectIcon from './images/singleselect-icon.svg';
import templateIcon from './images/template-icon.svg';
import classNames from 'classnames';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const icons: Record<string, string | any> = {
  'block-icon.svg': blockIcon,
  'checkbox-icon.svg': checkboxIcon,
  'date-icon.svg.svg': dateIcon,
  'dropdown-icon.svg': dropDownIcon,
  'dropdownoption-icon.svg': dropDownOptionIcon,
  'richtext-icon.svg': richTextIcon,
  'longanswer-icon.svg': longanswerIcon,
  'page-icon.svg': pageIcon,
  'shortanswer-icon.svg': shortanswerIcon,
  'singleselect-icon.svg': singleselectIcon,
  'template-icon.svg': templateIcon,
};

const getIconPath = (iconPath: string) => {
  return Object.values(icons[iconPath])[0] as string;
};

export const AddPatternMenu = () => {
  const addPage = useFormManagerStore(state => state.addPage);
  const { addPattern } = useFormManagerStore(state => ({
    addPattern: state.addPattern,
  }));

  return (
    <fieldset
      className={`${styles.usaFieldset} usa-fieldset position-sticky z-100`}
    >
      <p className="tablet:display-block display-none usa-label margin-top-0 font-ui-3xs text-uppercase margin-bottom-3">
        Add Element
      </p>
      <div className="dropdownContainer margin-bottom-3">
        <ul className="usa-list usa-list--unstyled grid-row tablet:flex-justify-end flex-justify-center">
          <li className="position-relative tablet:grid-col-12 grid-col-5 text-center">
            <SidebarAddPatternMenuItem
              title="Question"
              patternSelected={addPattern}
            />
          </li>
          <li className="tablet:grid-col-12 grid-col-5 text-center">
            <button
              className={`${styles.dropdownButton} tablet:width-full text-left width-auto text-base-darkest text-normal padding-0 bg-white border-0 cursor-pointer`}
              onClick={() => {
                addPage();
              }}
            >
              <span className="tablet:display-inline-block tablet:width-auto tablet:margin-right-1 display-block width-full text-ttop text-center">
                <img
                  className="usa-icon"
                  src={getIconPath('page-icon.svg')}
                  alt=""
                  width="24"
                  height="24"
                />
              </span>
              <span className="display-inline-block text-ttop tablet:width-auto width-9 text-center">
                Page
              </span>
            </button>
          </li>
        </ul>
      </div>
    </fieldset>
  );
};

type DropdownPattern = [string, PatternConfig];
const sidebarPatterns: DropdownPattern[] = [
  ['form-summary', defaultFormConfig.patterns['form-summary']],
  ['fieldset', defaultFormConfig.patterns['fieldset']],
  ['input', defaultFormConfig.patterns['input']],
  ['paragraph', defaultFormConfig.patterns['paragraph']],
  ['rich-text', defaultFormConfig.patterns['rich-text']],
  ['radio-group', defaultFormConfig.patterns['radio-group']],
] as const;
export const fieldsetPatterns: DropdownPattern[] = [
  ['form-summary', defaultFormConfig.patterns['form-summary']],
  ['input', defaultFormConfig.patterns['input']],
  ['paragraph', defaultFormConfig.patterns['paragraph']],
  ['rich-text', defaultFormConfig.patterns['rich-text']],
  ['radio-group', defaultFormConfig.patterns['radio-group']],
] as const;

export const SidebarAddPatternMenuItem = ({
  patternSelected,
  title,
}: {
  patternSelected: (patternType: string) => void;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { uswdsRoot } = useFormManagerStore(state => ({
    uswdsRoot: state.context.uswdsRoot,
  }));

  return (
    <AddPatternDropdown
      availablePatterns={sidebarPatterns}
      closeDropdown={() => setIsOpen(false)}
      isOpen={isOpen}
      patternSelected={patternSelected}
    >
      <button
        className={`${styles.dropdownButton} tablet:width-full text-left width-auto text-base-darkest text-normal padding-0 bg-white border-0 cursor-pointer margin-bottom-3`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="tablet:display-inline-block tablet:width-auto tablet:margin-right-1 display-block width-full text-ttop text-center">
          <svg
            className="usa-icon"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use xlinkHref={`${uswdsRoot}img/sprite.svg#add_circle`}></use>
          </svg>
        </span>

        <span className="display-inline-block text-ttop tablet:width-auto text-center">
          <span className="display-inline-block text-ttop margin-right-1 width-9">
            {title}
          </span>
          <img
            className="display-inline-block text-ttop"
            src={getIconPath('dropdown-icon.svg')}
            alt=""
            width="16"
            height="16"
          />
        </span>
      </button>
    </AddPatternDropdown>
  );
};

export const FieldsetAddPatternButton = ({
  patternSelected,
  title,
}: {
  patternSelected: (patternType: string) => void;
  title: string;
}) => {
  const { uswdsRoot } = useFormManagerStore(state => ({
    uswdsRoot: state.context.uswdsRoot,
  }));
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={classNames(styles.dottedLine, 'margin-top-2 cursor-default')}
    >
      <AddPatternDropdown
        availablePatterns={fieldsetPatterns}
        closeDropdown={() => setIsOpen(false)}
        isOpen={isOpen}
        patternSelected={patternSelected}
      >
        <button
          className={classNames(
            'bg-white text-base padding-0 border-0 cursor-pointer'
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="usa-icon text-base"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use xlinkHref={`${uswdsRoot}img/sprite.svg#add_circle`}></use>
          </svg>{' '}
          <span className="display-inline-block text-ttop tablet:width-auto text-center">
            <span className="display-inline-block text-ttop margin-right-1">
              {title}
            </span>
          </span>
        </button>
      </AddPatternDropdown>
    </div>
  );
};

export const FieldsetEmptyStateAddPatternButton = ({
  patternSelected,
  title,
}: {
  patternSelected: (patternType: string) => void;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AddPatternDropdown
      availablePatterns={fieldsetPatterns}
      closeDropdown={() => setIsOpen(false)}
      isOpen={isOpen}
      patternSelected={patternSelected}
    >
      <button
        className="usa-button usa-button--unstyled"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
    </AddPatternDropdown>
  );
};

export const AddPatternDropdown = ({
  children,
  availablePatterns,
  closeDropdown,
  isOpen,
  patternSelected,
}: React.PropsWithChildren<{
  availablePatterns: DropdownPattern[];
  closeDropdown: () => void;
  isOpen: boolean;
  patternSelected: (patternType: string) => void;
}>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      {children}
      {isOpen && (
        <AddPatternDropdownContent
          availablePatterns={availablePatterns}
          patternSelected={(patternType: string) => {
            closeDropdown();
            patternSelected(patternType);
          }}
        />
      )}
    </div>
  );
};

const AddPatternDropdownContent = ({
  availablePatterns,
  patternSelected,
}: {
  availablePatterns: DropdownPattern[];
  patternSelected: (patternType: string) => void;
}) => {
  return (
    <ul
      className={`${styles.dropdownMenu} usa-list usa-list--unstyled position-absolute bg-white z-100 shadow-3 text-left`}
    >
      {availablePatterns.map(([patternType, pattern], index) => (
        <li key={index} className={`${styles.dropdownItem} margin-left-1`}>
          <button
            className="bg-transparent padding-1 text-left width-full cursor-pointer border-0"
            onClick={() => {
              patternSelected(patternType);
            }}
          >
            <img
              className="display-inline-block text-ttop margin-right-1"
              src={getIconPath(pattern.iconPath || 'block-icon.svg')}
              alt=""
              width="24"
              height="24"
            />
            <span className="display-inline-block text-ttop">
              {pattern.displayName}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
