import type { Meta, StoryObj } from '@storybook/angular';
import { PfTooltip, PfTooltipPosition } from 'pf';

type TooltipArgs = Partial<{
  content: string;
  position: PfTooltipPosition;
}>;

const meta: Meta<TooltipArgs> = {
  title: 'Atoms/Tooltip',
  component: PfTooltip,
  tags: ['autodocs'],
  render: (args: TooltipArgs) => ({
    props: args,
    template: `
      <pf-tooltip [content]="content" [position]="position">
        <button pfTooltipTrigger type="button" class="demo-btn">Hover me</button>
      </pf-tooltip>
    `,
    imports: [PfTooltip],
    styles: [
      `
      .demo-btn {
        padding: 0.65rem 1rem;
        border-radius: 14px;
        border: 1px solid var(--pf-color-border, #cbd4e3);
        background: var(--pf-color-surface, #e9edf5);
        box-shadow: var(--pf-shadow-flat, 6px 6px 12px color-mix(in srgb, #cbd4e3 70%, transparent),
          -6px -6px 12px color-mix(in srgb, #f8fbff 70%, transparent));
        cursor: pointer;
      }
    `
    ]
  }),
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right']
    }
  },
  args: {
    content: 'Tooltip content',
    position: 'top'
  }
};

export default meta;
type Story = StoryObj<TooltipArgs>;

export const Top: Story = {};
export const Bottom: Story = { args: { position: 'bottom' } };
export const Left: Story = { args: { position: 'left' } };
export const Right: Story = { args: { position: 'right' } };
