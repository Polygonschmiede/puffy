import type { Meta, StoryObj } from '@storybook/angular';
import { PfNeumorphicCard } from 'pf';

type CardArgs = Partial<{ padded: boolean }>;

const meta: Meta<CardArgs> = {
  title: 'Layouts/Neumorphic Card',
  component: PfNeumorphicCard,
  tags: ['autodocs'],
  render: (args: CardArgs) => ({
    props: args,
    template: `
      <pf-neumorphic-card [padded]="padded">
        Soft card surface content
      </pf-neumorphic-card>
    `,
    moduleMetadata: { imports: [PfNeumorphicCard] }
  }),
  args: {
    padded: true
  }
};

export default meta;
type Story = StoryObj<CardArgs>;

export const Default: Story = {};
