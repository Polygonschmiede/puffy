import type { Meta, StoryObj } from '@storybook/angular';
import { PfTypography } from 'pf';

type TypographyArgs = Partial<{ variant: string }>;

const meta: Meta<TypographyArgs> = {
  title: 'Atoms/Typography',
  component: PfTypography,
  tags: ['autodocs'],
  render: (args: TypographyArgs) => ({
    props: args,
    template: `<pf-typography [variant]="variant">Typography {{ variant }}</pf-typography>`,
    moduleMetadata: { imports: [PfTypography] }
  }),
  args: {
    variant: 'h3'
  }
};

export default meta;
type Story = StoryObj<TypographyArgs>;

export const Heading: Story = {};
