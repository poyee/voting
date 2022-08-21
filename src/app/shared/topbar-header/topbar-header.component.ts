import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar-header',
  templateUrl: './topbar-header.component.html',
  styleUrls: ['./topbar-header.component.css']
})
export class TopbarHeaderComponent implements OnInit {
  @Input() isMainLayout: boolean;

  menuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
