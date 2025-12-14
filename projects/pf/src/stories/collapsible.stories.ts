import type { Meta, StoryObj } from '@storybook/angular';
import { PfCollapsible } from 'pf';

type CollapsibleArgs = Partial<{ open: boolean; disabled: boolean }>;

const meta: Meta<CollapsibleArgs> = {
  title: 'Layout/Collapsible',
  component: PfCollapsible,
  tags: ['autodocs'],
  render: (args: CollapsibleArgs) => ({
    props: args,
    template: `
      <pf-collapsible [open]="open" [disabled]="disabled" (openChange)="open = $event">
        <span pfCollapsibleTrigger>Click to toggle</span>
        <div pfCollapsibleContent>
          Collapsible body content with neumorphic borders.
        </div>
      </pf-collapsible>
    `,
    imports: [PfCollapsible]
  }),
  args: {
    open: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<CollapsibleArgs>;

export const Default: Story = {};

export const Open: Story = {
  args: { open: true }
};
