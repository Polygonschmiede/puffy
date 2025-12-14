import type { Meta, StoryObj } from '@storybook/angular';
import { PfFormItem, PfFormControl, PfFormDescription, PfFormMessage, PfFormLabel, PfInput } from 'pf';

type FormHelperArgs = Partial<{ invalid: boolean; message: string; description: string }>;

const meta: Meta<FormHelperArgs> = {
  title: 'Form/Form Helpers',
  component: PfFormItem,
  tags: ['autodocs'],
  render: (args: FormHelperArgs) => ({
    props: args,
    template: `
      <pf-form-item [invalid]="invalid" controlId="email">
        <pf-form-label label="Email"></pf-form-label>
        <pf-form-control [invalid]="invalid">
          <input pf-input id="email" placeholder="you@example.com" />
        </pf-form-control>
        <pf-form-description [id]="'email-description'">{{ description }}</pf-form-description>
        <pf-form-message [id]="'email-message'" *ngIf="invalid">{{ message }}</pf-form-message>
      </pf-form-item>
    `,
    imports: [PfFormItem, PfFormControl, PfFormDescription, PfFormMessage, PfFormLabel, PfInput]
  }),
  args: {
    invalid: false,
    message: 'Please provide a valid email.',
    description: 'We will never spam you.'
  }
};

export default meta;
type Story = StoryObj<FormHelperArgs>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true }
};
