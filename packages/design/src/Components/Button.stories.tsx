import Button from './Button';

export default {
    component: Button,
    title: 'Components/Button',
    tags: ['autodocs'],
  };
  
  export const Primary = {
    args: {
      props: {
        id: '1',
        label: 'Primary'
      },
    },
  };
  
  export const Secondary = {
    args: {
      props: {
        id: '2',
        label: 'Secondary',
        secondary: true
      },
    },
  };

  export const Continue = {
    args: {
      props: {
        id: '5',
        label: 'Continue >>'
      },
    },
  };

  export const SaveContinue = {
    args: {
      props: {
        id: '6',
        label: 'Save & Continue >>'
      },
    },
  };

  export const Back = {
    args: {
      props: {
        id: '7',
        label: '<< Back',
        textOnly: true
      },
    },
  };

  export const Cancel = {
    args: {
      props: {
        id: '8',
        label: 'Cancel',
        textOnly: true
      },
    },
  };