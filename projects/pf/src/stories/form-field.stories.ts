import type { Meta, StoryObj } from '@storybook/angular';
import { PfFormField, PfFormLabel, PfInput } from 'pf';

type FormFieldArgs = Partial<{
  label: string;
  description: string;
  error: string;
  required: boolean;
}>;

const meta: Meta<FormFieldArgs> = {
  title: 'Form/Form Field',
  component: PfFormField,
  tags: ['autodocs'],
  render: (args: FormFieldArgs) => ({
    props: args,
    template: `
      <pf-form-field
        [label]="label"
        [description]="description"
        [error]="error"
        [required]="required"
        controlId="email"
      >
        <input pfFormControl pf-input id="email" placeholder="you@example.com" />
      </pf-form-field>
    `,
    moduleMetadata: { imports: [PfFormField, PfFormLabel, PfInput] }
  }),
  args: {
    label: 'Email',
    description: 'We will never spam you.',
    error: '',
    required: false
  }
};

export default meta;
type Story = StoryObj<FormFieldArgs>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'Please provide a valid email.'
  }
};
