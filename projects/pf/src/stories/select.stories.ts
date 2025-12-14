import type { Meta, StoryObj } from '@storybook/angular';
import { PfSelect, PfSelectOption } from 'pf';

const baseOptions: PfSelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
];

type SelectArgs = Partial<{
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  options: PfSelectOption[];
}>;

const meta: Meta<SelectArgs> = {
  title: 'Atoms/Select',
  component: PfSelect,
  tags: ['autodocs'],
  render: (args: SelectArgs) => ({
    props: args,
    template: `
      <pf-select
        [label]="label"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [options]="options"
        (valueChange)="value = $event"
      ></pf-select>
    `,
    imports: [PfSelect]
  }),
  args: {
    label: 'Fruit',
    placeholder: 'Pick a fruit',
    value: '',
    disabled: false,
    options: baseOptions
  }
};

export default meta;
type Story = StoryObj<SelectArgs>;

export const Default: Story = {};

export const Prefilled: Story = {
  args: { value: 'banana' }
};

export const Disabled: Story = {
  args: { disabled: true, value: 'apple' }
};
