import type { Meta, StoryObj } from '@storybook/angular';
import { PfAccordion } from 'pf';

const sampleItems = [
  { id: 'a', title: 'First', content: 'This is the first section.' },
  { id: 'b', title: 'Second', content: 'This is the second section.' },
  { id: 'c', title: 'Third', content: 'This is the third section.' }
];

type AccordionArgs = Partial<{
  items: typeof sampleItems;
  collapsible: boolean;
}>;

const meta: Meta<AccordionArgs> = {
  title: 'Molecules/Accordion',
  component: PfAccordion,
  tags: ['autodocs'],
  render: (args: AccordionArgs) => ({
    props: args,
    template: `
      <pf-accordion
        [items]="items"
        [collapsible]="collapsible"
      ></pf-accordion>
    `,
    moduleMetadata: { imports: [PfAccordion] }
  }),
  args: {
    items: sampleItems,
    collapsible: true
  }
};

export default meta;
type Story = StoryObj<AccordionArgs>;

export const Default: Story = {};

export const NonCollapsible: Story = {
  args: { collapsible: false }
};
