import type { Meta, StoryObj } from '@storybook/angular';
import { PfTabs } from 'pf';

const tabs = [
  { id: 'overview', label: 'Overview', content: 'High-level summary.' },
  { id: 'details', label: 'Details', content: 'All the nitty-gritty pieces.' },
  { id: 'settings', label: 'Settings', content: 'Configure behaviors here.' }
];

type TabsArgs = Partial<{
  tabs: typeof tabs;
  defaultActiveId: string | null;
}>;

const meta: Meta<TabsArgs> = {
  title: 'Molecules/Tabs',
  component: PfTabs,
  tags: ['autodocs'],
  render: (args: TabsArgs) => ({
    props: args,
    template: `
      <pf-tabs [tabs]="tabs" [defaultActiveId]="defaultActiveId"></pf-tabs>
    `,
    moduleMetadata: { imports: [PfTabs] }
  }),
  args: {
    tabs,
    defaultActiveId: 'overview'
  }
};

export default meta;
type Story = StoryObj<TabsArgs>;

export const Default: Story = {};

export const StartWithDetails: Story = {
  args: { defaultActiveId: 'details' }
};
