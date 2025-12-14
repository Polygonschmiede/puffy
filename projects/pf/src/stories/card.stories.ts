import type { Meta, StoryObj } from '@storybook/angular';
import { PfCard, PfCardPadding, PfCardVariant } from 'pf';

type CardArgs = Partial<{
  variant: PfCardVariant;
  padding: PfCardPadding;
  body: string;
}>;

const meta: Meta<CardArgs> = {
  title: 'Atoms/Card',
  component: PfCard,
  tags: ['autodocs'],
  render: (args: CardArgs) => ({
    props: args,
    template: `
      <pf-card [variant]="variant" [padding]="padding">
        <h3 class="pf-card__title">Neumorphic Card</h3>
        <p class="pf-card__body">{{ body }}</p>
      </pf-card>
    `,
    styles: [
      `
        .pf-card__title {
          margin: 0 0 var(--pf-spacing-sm, 0.55rem);
          font-size: var(--pf-font-size-lg, 1.125rem);
          font-weight: var(--pf-typography-weight-semibold, 600);
        }

        .pf-card__body {
          margin: 0;
          color: var(--pf-color-muted, #5a6475);
        }
      `
    ],
    imports: [PfCard]
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['raised', 'flat', 'pressed']
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg']
    }
  },
  args: {
    variant: 'raised',
    padding: 'md',
    body: 'Use this card to group related controls or metrics.'
  }
};

export default meta;
type Story = StoryObj<CardArgs>;

export const Raised: Story = {};

export const Flat: Story = {
  args: {
    variant: 'flat'
  }
};

export const Pressed: Story = {
  args: {
    variant: 'pressed'
  }
};

export const Spacious: Story = {
  args: {
    padding: 'lg',
    body: 'Larger padding helps with dense content blocks.'
  }
};
