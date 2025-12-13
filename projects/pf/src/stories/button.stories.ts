import type { Meta, StoryObj } from '@storybook/angular';
import { PfButton, PfButtonSize, PfButtonTone, PfButtonVariant } from 'pf';

type ButtonArgs = Partial<{
  label: string;
  variant: PfButtonVariant;
  tone: PfButtonTone;
  size: PfButtonSize;
  disabled: boolean;
  fullWidth: boolean;
  type: 'button' | 'submit' | 'reset';
}>;

const meta: Meta<ButtonArgs> = {
  title: 'Atoms/Button',
  component: PfButton,
  tags: ['autodocs'],
  render: (args: ButtonArgs) => ({
    props: args
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'flat']
    },
    tone: {
      control: 'select',
      options: ['accent', 'neutral']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    fullWidth: {
      control: 'boolean'
    }
  },
  args: {
    label: 'Press me',
    variant: 'primary',
    tone: 'accent',
    size: 'md',
    disabled: false,
    fullWidth: false,
    type: 'button'
  }
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    tone: 'neutral',
    label: 'Ghost'
  }
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    tone: 'neutral',
    label: 'Flat'
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Stretch across'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled'
  }
};
