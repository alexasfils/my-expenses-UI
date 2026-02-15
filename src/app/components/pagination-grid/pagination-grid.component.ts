import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-grid',
  templateUrl: './pagination-grid.component.html',
  styleUrl: './pagination-grid.component.scss',
})
export class PaginationGridComponent {
  @Output() pageChange = new EventEmitter<number>();
  currentPage: number = 0;
  @Input() totalPages: number = 0;

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage); // Emette la pagina aggiornata
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage); // Emette la pagina aggiornata
    }
  }
}
// function Output(): (target: PaginationGridComponent, propertyKey: "pageChange") => void {
//   throw new Error('Function not implemented.');
// }

