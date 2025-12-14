import type { Meta, StoryObj } from '@storybook/angular';
import { PfToggle } from 'pf';

type ToggleArgs = Partial<{
  label: string;
  pressed: boolean;
  disabled: boolean;
}>;

const meta: Meta<ToggleArgs> = {
  title: 'Atoms/Toggle',
  component: PfToggle,
  tags: ['autodocs'],
  render: (args: ToggleArgs) => ({
    props: args,
    template: `
      <pf-toggle
        [label]="label"
        [pressed]="pressed"
        [disabled]="disabled"
        (pressedChange)="pressed = $event"
      >
      </pf-toggle>
    `,
    moduleMetadata: { imports: [PfToggle] }
  }),
  argTypes: {
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Toggle me',
    pressed: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<ToggleArgs>;

export const Off: Story = {};

export const On: Story = {
  args: { pressed: true }
};

export const Disabled: Story = {
  args: { disabled: true, pressed: true }
};
