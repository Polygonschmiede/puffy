import type { Meta, StoryObj } from '@storybook/angular';
import { PfAspectRatio } from 'pf';

type AspectRatioArgs = Partial<{ ratio: number }>;

const meta: Meta<AspectRatioArgs> = {
  title: 'Layout/Aspect Ratio',
  component: PfAspectRatio,
  tags: ['autodocs'],
  render: (args: AspectRatioArgs) => ({
    props: args,
    template: `
      <pf-aspect-ratio [ratio]="ratio">
        <div style="width: 100%; height: 100%; background: radial-gradient(circle at 20% 20%, rgba(63,99,255,0.18), transparent), var(--pf-color-surface, #e9edf5); display: flex; align-items: center; justify-content: center; color: var(--pf-color-contrast, #0f172a); font-weight: 600;">
          {{ ratio }} aspect
        </div>
      </pf-aspect-ratio>
    `,
    imports: [PfAspectRatio]
  }),
  args: {
    ratio: 16 / 9
  }
};

export default meta;
type Story = StoryObj<AspectRatioArgs>;

export const SixteenByNine: Story = {};

export const Square: Story = {
  args: { ratio: 1 }
};
