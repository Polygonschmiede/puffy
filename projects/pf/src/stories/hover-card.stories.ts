import type { Meta, StoryObj } from '@storybook/angular';
import { PfHoverCard } from 'pf';

const meta: Meta = {
  title: 'Molecules/Hover Card',
  component: PfHoverCard,
  tags: ['autodocs'],
  render: () => ({
    template: `
      <pf-hover-card>
        <span pfHoverTrigger style="text-decoration: underline; cursor: pointer;">Hover me</span>
        <div pfHoverContent style="max-width: 220px;">
          Neumorphic surfaces keep depth soft and calm. Use hover cards for previews.
        </div>
      </pf-hover-card>
    `,
    imports: [PfHoverCard]
  })
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
