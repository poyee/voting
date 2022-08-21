import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { navItems } from './navs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  navs = navItems;
  currentUrl: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.currentUrl = this.location.path();
  }

}
