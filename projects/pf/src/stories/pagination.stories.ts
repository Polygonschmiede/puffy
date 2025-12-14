import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';
import { PfPagination } from 'pf';

class PaginationStoryState {
  readonly page = signal(1);
}

type PaginationArgs = Partial<{
  total: number;
  pageSize: number;
}>;

const meta: Meta<PaginationArgs> = {
  title: 'Molecules/Pagination',
  component: PfPagination,
  tags: ['autodocs'],
  render: (args: PaginationArgs) => {
    const state = new PaginationStoryState();
    return {
      props: { ...args, state },
      template: `
        <pf-pagination
          [total]="total"
          [pageSize]="pageSize"
          [page]="state.page()"
          (pageChange)="state.page.set($event)"
        ></pf-pagination>
        <p>Current page: {{ state.page() }}</p>
      `,
      imports: [PfPagination]
    };
  },
  args: {
    total: 120,
    pageSize: 10
  }
};

export default meta;
type Story = StoryObj<PaginationArgs>;

export const Default: Story = {};
