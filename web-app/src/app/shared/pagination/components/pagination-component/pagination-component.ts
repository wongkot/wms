import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css'
})
export class PaginationComponent {
  pageSizes = input<number[]>([10, 20, 50, 100]);
  selectedPageSize = input<number>(this.pageSizes().at(0) ?? 10);
  selectedPage = input<number>(1);
  totalItems = input<number>(0);

  pageSizeChange = output<number>();
  toFirstPageClick = output<number>();
  toPreviousPageClick = output<number>();
  toNextPageClick = output<number>();
  toLastPageClick = output<number>();

  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.selectedPageSize());
  });
  isFirstPage = computed(() => {
    return this.selectedPage() <= 1;
  });
  isLastPage = computed(() => {
    return this.selectedPage() >= this.totalPages();
  });

  onPageSizeChange($event: any) {
    this.pageSizeChange.emit(Number($event.target.value));
  }

  onFirstPageClick() {
    if (this.isFirstPage()) return;

    this.toFirstPageClick.emit(1);
  }

  onPreviousPageClick() {
    if (this.isFirstPage()) return;

    this.toPreviousPageClick.emit(this.selectedPage() - 1);
  }

  onNextPageClick() {
    if (this.isLastPage()) return;

    this.toNextPageClick.emit(this.selectedPage() + 1);
  }

  onLastPageClick() {
    if (this.isLastPage()) return;

    this.toLastPageClick.emit(this.totalPages());
  }
}
