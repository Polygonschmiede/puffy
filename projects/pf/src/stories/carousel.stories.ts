import type { Meta, StoryObj } from '@storybook/angular';
import { PfCarousel } from 'pf';

type CarouselArgs = Partial<{
  items: { title: string; description?: string }[];
}>;

const meta: Meta<CarouselArgs> = {
  title: 'Data/Carousel',
  component: PfCarousel,
  tags: ['autodocs'],
  render: (args: CarouselArgs) => ({
    props: args,
    template: `
      <pf-carousel [items]="items"></pf-carousel>
    `,
    moduleMetadata: { imports: [PfCarousel] }
  }),
  args: {
    items: [
      { title: 'Insights', description: 'Understand your data quickly.' },
      { title: 'Automation', description: 'Build flows with less effort.' },
      { title: 'Collaboration', description: 'Share dashboards with your team.' }
    ]
  }
};

export default meta;
type Story = StoryObj<CarouselArgs>;

export const Default: Story = {};
