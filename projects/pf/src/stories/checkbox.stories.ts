import type { Meta, StoryObj } from '@storybook/angular';
import { PfCheckbox } from 'pf';

type CheckboxArgs = Partial<{
  label: string;
  checked: boolean;
  disabled: boolean;
}>;

const meta: Meta<CheckboxArgs> = {
  title: 'Atoms/Checkbox',
  component: PfCheckbox,
  tags: ['autodocs'],
  render: (args: CheckboxArgs) => ({
    props: args,
    template: `
      <pf-checkbox
        [label]="label"
        [checked]="checked"
        [disabled]="disabled"
        (checkedChange)="checked = $event"
      ></pf-checkbox>
    `,
    imports: [PfCheckbox]
  }),
  args: {
    label: 'Accept terms',
    checked: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true }
};

export const Disabled: Story = {
  args: { disabled: true, checked: true }
};
