import type { Meta, StoryObj } from '@storybook/angular';
import { PfProgress } from 'pf';

type ProgressArgs = Partial<{
  value: number;
  max: number;
  label: string;
  showValue: boolean;
}>;

const meta: Meta<ProgressArgs> = {
  title: 'Atoms/Progress',
  component: PfProgress,
  tags: ['autodocs'],
  render: (args: ProgressArgs) => ({
    props: args,
    template: `
      <pf-progress
        [value]="value"
        [max]="max"
        [label]="label"
        [showValue]="showValue"
      ></pf-progress>
    `,
    imports: [PfProgress]
  }),
  args: {
    value: 45,
    max: 100,
    label: 'Upload',
    showValue: true
  }
};

export default meta;
type Story = StoryObj<ProgressArgs>;

export const Default: Story = {};

export const NearDone: Story = {
  args: { value: 90 }
};

export const WithoutLabel: Story = {
  args: { label: '', showValue: false }
};
