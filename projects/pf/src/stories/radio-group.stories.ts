import type { Meta, StoryObj } from '@storybook/angular';
import { PfRadioGroup } from 'pf';

type RadioGroupArgs = Partial<{
  items: { label: string; value: string; disabled?: boolean }[];
  value: string;
  orientation: 'horizontal' | 'vertical';
}>;

const meta: Meta<RadioGroupArgs> = {
  title: 'Form/Radio Group',
  component: PfRadioGroup,
  tags: ['autodocs'],
  render: (args: RadioGroupArgs) => ({
    props: args,
    template: `
      <pf-radio-group
        [items]="items"
        [value]="value"
        [orientation]="orientation"
        (valueChange)="value = $event"
      ></pf-radio-group>
      <p style="margin-top: 12px;">Selected: {{ value }}</p>
    `,
    imports: [PfRadioGroup]
  }),
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] }
  },
  args: {
    items: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' }
    ],
    value: '1',
    orientation: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<RadioGroupArgs>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' }
};
