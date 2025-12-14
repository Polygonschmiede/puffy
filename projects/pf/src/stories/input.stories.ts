import type { Meta, StoryObj } from '@storybook/angular';
import { PfInput } from 'pf';

type InputArgs = Partial<{
  label: string;
  placeholder: string;
  error: string;
  value: string;
  disabled: boolean;
}>;

const meta: Meta<InputArgs> = {
  title: 'Atoms/Input',
  component: PfInput,
  tags: ['autodocs'],
  render: (args: InputArgs) => ({
    props: args,
    template: `
      <pf-input
        [label]="label"
        [placeholder]="placeholder"
        [error]="error"
        [value]="value"
        [disabled]="disabled"
        (valueChange)="value = $event"
      ></pf-input>
    `,
    moduleMetadata: { imports: [PfInput] }
  }),
  argTypes: {
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: '',
    value: '',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<InputArgs>;

export const Empty: Story = {};

export const Prefilled: Story = {
  args: {
    value: 'ada@lovelace.io'
  }
};

export const WithError: Story = {
  args: {
    error: 'Please provide a valid email'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'locked@example.com'
  }
};
