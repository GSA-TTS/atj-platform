import Radio from './Radio';

export default {
    component: Radio,
    title: 'Components/Radio',
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
        label: 'Secondary'
      },
    },
  };