import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() page: number;
  @Input() totalPage: number;

  pageIndices: Array<number>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageIndices = [...Array(5)
      .keys()]
      .map(x => x  - 2 + this.page)
      .filter(x => x >= 0)
      .filter(x => x < this.totalPage);
  }

  get lastPageIndexInRange(): boolean {
    return this.pageIndices[this.pageIndices.length - 1] === this.totalPage - 1;
  }

  get firstPageIndexInRange(): boolean {
    return this.pageIndices[0] === 0;
  }
}
