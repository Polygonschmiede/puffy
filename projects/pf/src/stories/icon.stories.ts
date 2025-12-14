import type { Meta, StoryObj } from '@storybook/angular';
import { PfIcon } from 'pf';

type IconArgs = Partial<{ name: string; svg: string }>;

const meta: Meta<IconArgs> = {
  title: 'Atoms/Icon',
  component: PfIcon,
  tags: ['autodocs'],
  render: (args: IconArgs) => ({
    props: args,
    template: `
      <pf-icon [name]="name" [svg]="svg"></pf-icon>
    `,
    imports: [PfIcon]
  }),
  args: {
    name: 'circle',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>'
  }
};

export default meta;
type Story = StoryObj<IconArgs>;

export const Default: Story = {};
