import type { Meta, StoryObj } from '@storybook/angular';
import { PfTable } from 'pf';

const meta: Meta = {
  title: 'Molecules/Table',
  component: PfTable,
  tags: ['autodocs'],
  render: () => ({
    template: `
      <pf-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ada Lovelace</td>
            <td>Engineer</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Alan Turing</td>
            <td>Scientist</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Grace Hopper</td>
            <td>Admiral</td>
            <td>Inactive</td>
          </tr>
        </tbody>
      </pf-table>
    `,
    imports: [PfTable]
  })
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {};
