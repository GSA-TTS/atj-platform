import type { Meta, StoryObj } from '@storybook/react';

import { PageMenu } from './PageMenu';

/*
const withContentArea: Decorator = (Story, context) => {
  const [pages, setPages] = useState<PageMenuProps['pages']>([
    {
      selected: false,
      title: 'First page',
      url: '#',
    },
    {
      selected: true,
      title: 'Second page',
      url: '#',
    },
  ]);
  const args = {
    ...context.args,
    pages,
    onAddPage: () =>
      setPages([
        ...pages.map(page => ({
          selected: false,
          title: page.title,
          url: page.url,
        })),
        {
          selected: true,
          title: `Untitled page - ${pages.length + 1}`,
          url: '#',
        },
      ]),
  };
  return (
    <div className="usa-grid">
      <div className="grid-row">
        <div className="grid-col-4">
          <Story {...context} args={args} />
        </div>
      </div>
    </div>
  );
};
*/

const meta: Meta<typeof PageMenu> = {
  title: 'FormManager/PageMenu',
  component: PageMenu,
  //decorators: [withContentArea],
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof PageMenu> = {
  args: {
    pages: [
      {
        selected: false,
        title: 'First page',
        url: '',
      },
      {
        selected: true,
        title: 'Second page',
        url: '',
      },
    ],
  },
};
