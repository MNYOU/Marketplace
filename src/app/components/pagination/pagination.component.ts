import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  public pagesArray: number[] = [];
  public currentPage: number = 1;

  @Input() set setPagination(pagination: MyPagination) {
    if (pagination) {
      const pagesAmount = Math.ceil(
        pagination.itemsCount / pagination.pageSize
      );      this.pagesArray = new Array(pagesAmount).fill(1);
    }
  }
}



export interface MyPagination {
  itemsCount: number;
  pageSize: number;
}
