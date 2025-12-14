import type { Meta, StoryObj } from '@storybook/angular';
import { PfIconButton, PfIconButtonVariant } from 'pf';

type IconButtonArgs = Partial<{
  variant: PfIconButtonVariant;
  disabled: boolean;
}>;

const meta: Meta<IconButtonArgs> = {
  title: 'Atoms/Icon Button',
  component: PfIconButton,
  tags: ['autodocs'],
  render: (args: IconButtonArgs) => ({
    props: args,
    template: `
      <pf-icon-button [variant]="variant" [disabled]="disabled">
        <span aria-hidden="true">☆</span>
      </pf-icon-button>
    `,
    moduleMetadata: { imports: [PfIconButton] }
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['raised', 'flat', 'ghost']
    }
  },
  args: {
    variant: 'raised',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<IconButtonArgs>;

export const Raised: Story = {};
export const Flat: Story = { args: { variant: 'flat' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Disabled: Story = { args: { disabled: true } };
