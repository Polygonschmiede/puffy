import type { Meta, StoryObj } from '@storybook/angular';
import { PfDivider, PfDividerOrientation } from 'pf';

type DividerArgs = Partial<{
  orientation: PfDividerOrientation;
}>;

const meta: Meta<DividerArgs> = {
  title: 'Atoms/Divider',
  component: PfDivider,
  tags: ['autodocs'],
  render: (args: DividerArgs) => ({
    props: args,
    template: `
      <div class="divider-demo">
        <div>Above</div>
        <pf-divider [orientation]="orientation"></pf-divider>
        <div>Below</div>
      </div>
    `,
    moduleMetadata: { imports: [PfDivider] },
    styles: [
      `
      .divider-demo {
        display: grid;
        gap: var(--pf-spacing-md, 0.75rem);
        align-items: center;
      }
    `
    ]
  }),
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  },
  args: {
    orientation: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<DividerArgs>;

export const Horizontal: Story = {};
export const Vertical: Story = {
  args: { orientation: 'vertical' }
};
