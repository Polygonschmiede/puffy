import type { Meta, StoryObj } from '@storybook/angular';
import { PfNavigationMenu, PfNavItem } from 'pf';

const items: PfNavItem[] = [
  {
    id: 'products',
    label: 'Products',
    children: [
      { id: 'analytics', label: 'Analytics' },
      { id: 'automation', label: 'Automation' }
    ]
  },
  {
    id: 'company',
    label: 'Company',
    children: [
      { id: 'about', label: 'About' },
      { id: 'careers', label: 'Careers', disabled: true }
    ]
  }
];

type NavigationArgs = Partial<{
  items: PfNavItem[];
}>;

const meta: Meta<NavigationArgs> = {
  title: 'Navigation/Menu',
  component: PfNavigationMenu,
  tags: ['autodocs'],
  render: (args: NavigationArgs) => ({
    props: args,
    template: `<pf-navigation-menu [items]="items"></pf-navigation-menu>`,
    imports: [PfNavigationMenu]
  }),
  args: { items }
};

export default meta;
type Story = StoryObj<NavigationArgs>;

export const Default: Story = {};
