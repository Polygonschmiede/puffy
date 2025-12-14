import type { Meta, StoryObj } from '@storybook/angular';
import { PfDatePicker } from 'pf';

type DatePickerArgs = Partial<{ value: string }>;

const meta: Meta<DatePickerArgs> = {
  title: 'Date/Date Picker',
  component: PfDatePicker,
  tags: ['autodocs'],
  render: (args: DatePickerArgs) => ({
    props: args,
    template: `
      <pf-date-picker [value]="value" (valueChange)="value = $event"></pf-date-picker>
      <p style="margin-top: 12px;">Value: {{ value }}</p>
    `,
    imports: [PfDatePicker]
  }),
  args: {
    value: ''
  }
};

export default meta;
type Story = StoryObj<DatePickerArgs>;

export const Default: Story = {};
