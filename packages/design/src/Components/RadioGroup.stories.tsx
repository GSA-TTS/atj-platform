import RadioGroup from './RadioGroup';
import * as RadioStories from './Radio.stories';

export default {
    component: RadioGroup,
    title: 'Components/RadioGroup',
    tags: ['autodocs'],
  };

  export const Default = {
    args: {
        radios: [
            { id: '1', label: 'Task 1' },
            { id: '2', label: 'Task 2' },
            { id: '3', label: 'Task 3' },
        ],
    },
  };
