import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css'
})
export class PaginationComponent {
  public readonly pageSizes = input<number[]>([10, 20, 50, 100]);
  public readonly selectedPageSize = input<number>(this.pageSizes().at(0) ?? 10);
  public readonly selectedPage = input<number>(1);
  public readonly totalItems = input<number>(0);
  public readonly pageSizeChange = output<number>();
  public readonly toFirstPageClick = output<number>();
  public readonly toPreviousPageClick = output<number>();
  public readonly toNextPageClick = output<number>();
  public readonly toLastPageClick = output<number>();
  public readonly totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.selectedPageSize());
  });
  public readonly isFirstPage = computed(() => {
    return this.selectedPage() <= 1;
  });
  public readonly isLastPage = computed(() => {
    return this.selectedPage() >= this.totalPages();
  });

  public onPageSizeChange($event: any): void {
    this.pageSizeChange.emit(Number($event.target.value));
  }

  public onFirstPageClick(): void {
    if (this.isFirstPage()) return;

    this.toFirstPageClick.emit(1);
  }

  public onPreviousPageClick(): void {
    if (this.isFirstPage()) return;

    this.toPreviousPageClick.emit(this.selectedPage() - 1);
  }

  public onNextPageClick(): void {
    if (this.isLastPage()) return;

    this.toNextPageClick.emit(this.selectedPage() + 1);
  }

  public onLastPageClick(): void {
    if (this.isLastPage()) return;

    this.toLastPageClick.emit(this.totalPages());
  }
}
