import type { Meta, StoryObj } from '@storybook/angular';
import { PfResizable } from 'pf';

type ResizableArgs = Partial<{
  direction: 'horizontal' | 'vertical';
  initialSize: number;
  minSize: number;
  maxSize: number;
}>;

const meta: Meta<ResizableArgs> = {
  title: 'Layout/Resizable',
  component: PfResizable,
  tags: ['autodocs'],
  render: (args: ResizableArgs) => ({
    props: args,
    template: `
      <pf-resizable
        [direction]="direction"
        [initialSize]="initialSize"
        [minSize]="minSize"
        [maxSize]="maxSize"
        (sizeChange)="size = $event"
      >
        <div pfResizableStart style="padding: 12px;">Start Pane — {{ size || initialSize }}%</div>
        <div pfResizableEnd style="padding: 12px;">End Pane</div>
      </pf-resizable>
    `,
    imports: [PfResizable]
  }),
  args: {
    direction: 'horizontal',
    initialSize: 50,
    minSize: 20,
    maxSize: 80
  }
};

export default meta;
type Story = StoryObj<ResizableArgs>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { direction: 'vertical' }
};
