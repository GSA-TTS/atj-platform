import Radio from './Radio';

export default {
    component: Radio,
    title: 'Components/Radio',
    tags: ['autodocs'],
  };

  export const Default = {
    args: {
      
      radio: {
        id: '0',
        label: 'Default Button'
      },
    },
  };

  export const Primary = {
    args: {
      radio: {
        ...Default.args.radio,
        label: 'Primary'
      },
    },
  };
  
  export const Secondary = {
    args: {
      radio: {
        id: '2',
        label: 'Secondary',
        disabled: true,
      },
    },
  };