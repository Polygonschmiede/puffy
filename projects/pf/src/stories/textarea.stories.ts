import type { Meta, StoryObj } from '@storybook/angular';
import { PfTextarea } from 'pf';

type TextareaArgs = Partial<{
  label: string;
  placeholder: string;
  error: string;
  value: string;
  disabled: boolean;
}>;

const meta: Meta<TextareaArgs> = {
  title: 'Atoms/Textarea',
  component: PfTextarea,
  tags: ['autodocs'],
  render: (args: TextareaArgs) => ({
    props: args,
    template: `
      <pf-textarea
        [label]="label"
        [placeholder]="placeholder"
        [error]="error"
        [value]="value"
        [disabled]="disabled"
        (valueChange)="value = $event"
      ></pf-textarea>
    `,
    moduleMetadata: { imports: [PfTextarea] }
  }),
  args: {
    label: 'Message',
    placeholder: 'Write something friendly…',
    error: '',
    value: '',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<TextareaArgs>;

export const Empty: Story = {};

export const Prefilled: Story = {
  args: { value: 'Hello from pf.' }
};

export const WithError: Story = {
  args: { error: 'Please add more detail' }
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Locked text' }
};
