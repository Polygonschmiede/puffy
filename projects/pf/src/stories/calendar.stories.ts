import type { Meta, StoryObj } from '@storybook/angular';
import { PfCalendar } from 'pf';

type CalendarArgs = Partial<{ value: string }>;

const meta: Meta<CalendarArgs> = {
  title: 'Date/Calendar',
  component: PfCalendar,
  tags: ['autodocs'],
  render: (args: CalendarArgs) => ({
    props: args,
    template: `
      <pf-calendar [value]="value" (valueChange)="value = $event"></pf-calendar>
      <p style="margin-top: 12px;">Selected: {{ value }}</p>
    `,
    moduleMetadata: { imports: [PfCalendar] }
  }),
  args: {
    value: ''
  }
};

export default meta;
type Story = StoryObj<CalendarArgs>;

export const Default: Story = {};
