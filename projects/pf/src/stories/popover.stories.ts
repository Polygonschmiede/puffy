import type { Meta, StoryObj } from '@storybook/angular';
import { PfPopover } from 'pf';

type PopoverArgs = Partial<{
  label: string;
}>;

const meta: Meta<PopoverArgs> = {
  title: 'Molecules/Popover',
  component: PfPopover,
  tags: ['autodocs'],
  render: (args: PopoverArgs) => ({
    props: args,
    template: `
      <pf-popover [label]="label">
        <p style="margin:0;">This popover holds helper content.</p>
      </pf-popover>
    `,
    imports: [PfPopover]
  }),
  args: {
    label: 'Open popover'
  }
};

export default meta;
type Story = StoryObj<PopoverArgs>;

export const Default: Story = {};
