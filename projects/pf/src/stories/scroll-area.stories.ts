import type { Meta, StoryObj } from '@storybook/angular';
import { PfScrollArea } from 'pf';

type ScrollAreaArgs = Partial<{
  orientation: 'vertical' | 'horizontal';
  maxHeight: string | undefined;
}>;

const longContent = Array.from({ length: 24 })
  .map((_, idx) => `<p>Item ${idx + 1} — softly shadowed content.</p>`)
  .join('');

const meta: Meta<ScrollAreaArgs> = {
  title: 'Layout/Scroll Area',
  component: PfScrollArea,
  tags: ['autodocs'],
  render: (args: ScrollAreaArgs) => ({
    props: args,
    template: `
      <pf-scroll-area [orientation]="orientation" [maxHeight]="maxHeight">
        <div [innerHTML]="content"></div>
      </pf-scroll-area>
    `,
    moduleMetadata: { imports: [PfScrollArea] }
  }),
  args: {
    orientation: 'vertical',
    maxHeight: '280px',
  }
};

export default meta;
type Story = StoryObj<ScrollAreaArgs>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal', maxHeight: undefined }
};
