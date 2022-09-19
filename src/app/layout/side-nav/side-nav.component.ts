import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { navItems } from './navs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  navs = navItems;
  currentUrl: string;

  constructor(private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url
      .split('?')[0];

    console.log(this.currentUrl)
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}
