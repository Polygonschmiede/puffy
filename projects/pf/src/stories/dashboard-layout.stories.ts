import type { Meta, StoryObj } from '@storybook/angular';
import { PfDashboardLayout, PfNeumorphicCard } from 'pf';

type LayoutArgs = Record<string, never>;

const meta: Meta<LayoutArgs> = {
  title: 'Layouts/Dashboard Layout',
  component: PfDashboardLayout,
  tags: ['autodocs'],
  render: () => ({
    template: `
      <pf-dashboard-layout>
        <div pfDashboardAside>
          <pf-neumorphic-card>Aside content</pf-neumorphic-card>
        </div>
        <pf-neumorphic-card>Main content area</pf-neumorphic-card>
        <div pfDashboardSecondary>
          <pf-neumorphic-card>Secondary column</pf-neumorphic-card>
        </div>
      </pf-dashboard-layout>
    `,
    imports: [PfDashboardLayout, PfNeumorphicCard]
  })
};

export default meta;
type Story = StoryObj<LayoutArgs>;

export const Default: Story = {};
