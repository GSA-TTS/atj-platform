import React, { useState, useRef, useEffect } from 'react';
import { useFormManagerStore } from '../store';
import { FormEditSlice } from './store';
import styles from './formEditStyles.module.css';
import blockIcon from './images/block-icon.svg';
import checkboxIcon from './images/checkbox-icon.svg';
import dateIcon from './images/date-icon.svg';
import dropDownIcon from './images/dropdown-icon.svg';
import dropDownOptionIcon from './images/dropdownoption-icon.svg';
import longanswerIcon from './images/longanswer-icon.svg';
import pageIcon from './images/page-icon.svg';
import shortanswerIcon from './images/shortanswer-icon.svg';
import singleselectIcon from './images/singleselect-icon.svg';
import templateIcon from './images/template-icon.svg';

// Define a type for the icons object
type IconsType = {
  [key: string]: string;
};

const icons: IconsType = {
  'block-icon.svg': blockIcon,
  'checkbox-icon.svg': checkboxIcon,
  'date-icon.svg.svg': dateIcon,
  'dropdown-icon.svg': dropDownIcon,
  'dropdownoption-icon.svg': dropDownOptionIcon,
  'longanswer-icon.svg': longanswerIcon,
  'page-icon.svg': pageIcon,
  'shortanswer-icon.svg': shortanswerIcon,
  'singleselect-icon.svg': singleselectIcon,
  'template-icon.svg': templateIcon,
};

export const AddPatternDropdown = ({ uswdsRoot }: { uswdsRoot: string }) => {
  const { availablePatterns, addPattern } = useFormManagerStore(state => ({
    availablePatterns: state.availablePatterns,
    addPattern: state.addPattern,
  }));
  const addPage = useFormManagerStore(state => state.addPage);
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('Question');
  const dropdownRef = useRef<HTMLDivElement>(null);

  type Pattern = FormEditSlice['availablePatterns'][number];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (pattern: Pattern) => {
    addPattern(pattern.patternType);
    setDisplayValue('Question');
    setIsOpen(false);
  };

  const getIconPath = (iconPath: string) => {
    const iconPathObject = Object.values(icons[iconPath]);
    const blockIconObject = Object.values(blockIcon);

    return iconPathObject[0] || blockIconObject[0];
  };

  return (
    <fieldset className={`${styles.usaFieldset} usa-fieldset position-sticky`}>
      <p className="tablet:display-block display-none usa-label margin-top-0 font-ui-3xs text-uppercase margin-bottom-3">
        Add Element
      </p>
      <div className="dropdownContainer margin-bottom-3" ref={dropdownRef}>
        <ul className="usa-list usa-list--unstyled grid-row tablet:flex-justify-end flex-justify-center">
          <li className="position-relative tablet:grid-col-12 grid-col-5 text-center">
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
                  <use
                    xlinkHref={`${uswdsRoot}img/sprite.svg#add_circle`}
                  ></use>
                </svg>
              </span>

              <span className="display-inline-block text-ttop tablet:width-auto text-center">
                <span className="display-inline-block text-ttop margin-right-1 width-9">
                  {displayValue}
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
            {isOpen && (
              <ul
                className={`${styles.dropdownMenu} usa-list usa-list--unstyled position-absolute width-full bg-white z-100 shadow-3 text-left`}
              >
                {availablePatterns.map((pattern, index) => (
                  <li
                    key={index}
                    className={`${styles.dropdownItem} padding-1 cursor-pointer margin-left-1`}
                    onClick={() => handleSelect(pattern)}
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
                  </li>
                ))}
              </ul>
            )}
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
