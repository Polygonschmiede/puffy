import type { Meta, StoryObj } from '@storybook/angular';
import { PfSlider } from 'pf';

type SliderArgs = Partial<{
  min: number;
  max: number;
  step: number;
  value: number;
  label: string;
  disabled: boolean;
}>;

const meta: Meta<SliderArgs> = {
  title: 'Atoms/Slider',
  component: PfSlider,
  tags: ['autodocs'],
  render: (args: SliderArgs) => ({
    props: args,
    template: `
      <pf-slider
        [min]="min"
        [max]="max"
        [step]="step"
        [value]="value"
        [label]="label"
        [disabled]="disabled"
        (valueChange)="value = $event"
      ></pf-slider>
    `,
    moduleMetadata: { imports: [PfSlider] }
  }),
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 30,
    label: 'Volume',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<SliderArgs>;

export const Default: Story = {};

export const FineGrained: Story = {
  args: { step: 0.5, max: 10, value: 2.5, label: 'Opacity' }
};

export const Disabled: Story = {
  args: { disabled: true }
};
