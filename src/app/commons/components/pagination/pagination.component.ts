import { Component, computed, model, output } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  pagination = model<Pagination>();
  pages = computed(() => {
    const totalPages = this.pagination()?.totalPages || 0;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  });

  nextPage = computed(() => (this.pagination()?.currentPage || 0) +  1);
  beforePage = computed(() => (this.pagination()?.currentPage || 0) - 1);
  selected = output<number>();

}
