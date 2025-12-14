import type { Meta, StoryObj } from '@storybook/angular';
import { PfInputOtp } from 'pf';

type InputOtpArgs = Partial<{ length: number; disabled: boolean; value: string }>;

const meta: Meta<InputOtpArgs> = {
  title: 'Form/Input OTP',
  component: PfInputOtp,
  tags: ['autodocs'],
  render: (args: InputOtpArgs) => ({
    props: args,
    template: `
      <pf-input-otp
        [length]="length"
        [disabled]="disabled"
        [value]="value"
        (valueChange)="value = $event"
      ></pf-input-otp>
      <p style="margin-top: 12px;">Value: {{ value }}</p>
    `,
    imports: [PfInputOtp]
  }),
  args: {
    length: 6,
    disabled: false,
    value: ''
  }
};

export default meta;
type Story = StoryObj<InputOtpArgs>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true }
};
