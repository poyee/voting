import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar-header',
  templateUrl: './topbar-header.component.html',
  styleUrls: ['./topbar-header.component.css']
})
export class TopbarHeaderComponent implements OnInit {
  @Input() isMainLayout: boolean;

  menuOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onClickLogin(): void {
    this.router.navigateByUrl(`login?redirectUrl=${window.location.href}`);
  }
}
