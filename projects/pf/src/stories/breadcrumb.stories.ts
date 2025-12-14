import type { Meta, StoryObj } from '@storybook/angular';
import { PfBreadcrumb } from 'pf';

type BreadcrumbArgs = Partial<{
  items: { label: string; href?: string }[];
  maxVisible: number;
  ariaLabel: string;
}>;

const meta: Meta<BreadcrumbArgs> = {
  title: 'Navigation/Breadcrumb',
  component: PfBreadcrumb,
  tags: ['autodocs'],
  render: (args: BreadcrumbArgs) => ({
    props: args,
    template: `
      <pf-breadcrumb
        [items]="items"
        [maxVisible]="maxVisible"
        [ariaLabel]="ariaLabel"
      ></pf-breadcrumb>
    `,
    moduleMetadata: { imports: [PfBreadcrumb] }
  }),
  args: {
    ariaLabel: 'Breadcrumb',
    maxVisible: 4,
    items: [
      { label: 'Home', href: '#' },
      { label: 'Library', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Buttons', href: '#' },
      { label: 'Icon Button', href: '#' }
    ]
  }
};

export default meta;
type Story = StoryObj<BreadcrumbArgs>;

export const Default: Story = {};

export const ShortTrail: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Tokens', href: '#' }
    ]
  }
};
