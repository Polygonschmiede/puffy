import type { Meta, StoryObj } from '@storybook/angular';
import { PfSwitch } from 'pf';

type SwitchArgs = Partial<{
  label: string;
  checked: boolean;
  disabled: boolean;
}>;

const meta: Meta<SwitchArgs> = {
  title: 'Atoms/Switch',
  component: PfSwitch,
  tags: ['autodocs'],
  render: (args: SwitchArgs) => ({
    props: args,
    template: `
      <pf-switch
        [label]="label"
        [checked]="checked"
        [disabled]="disabled"
        (checkedChange)="checked = $event"
      ></pf-switch>
    `,
    moduleMetadata: { imports: [PfSwitch] }
  }),
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Notifications',
    checked: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<SwitchArgs>;

export const Off: Story = {};

export const On: Story = {
  args: {
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true
  }
};
