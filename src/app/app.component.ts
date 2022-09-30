import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";
import {Poll} from "./model/poll/poll.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = '公投網';

  constructor(private title: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }

        if (child.snapshot.data['poll']) {
          const poll = child.snapshot.data['poll'] as Poll;
          return `${poll.title} | ${this.appTitle}`;
        }
        return this.appTitle;
      })
    ).subscribe((ttl: string) => {
      this.title.setTitle(ttl);
    });
  }
}
