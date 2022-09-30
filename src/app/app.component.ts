import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Router} from "@angular/router";
import {buffer, filter, map} from "rxjs";
import {Poll} from "./model/poll/poll.model";
import {tap} from "rxjs/operators";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

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
    const routeEndEvent$ = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        tap(() => console.warn("END")),
      );

    this.router.events.pipe(
      filter(e => e instanceof ChildActivationEnd && e.snapshot.component === MainLayoutComponent),
      buffer(routeEndEvent$),
      map(([event]) => {
        let child = (event as ChildActivationEnd).snapshot.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }

        if (child.data['poll']) {
          const poll = child.data['poll'] as Poll;
          return `${poll.title} | ${this.appTitle}`;
        }
        return this.appTitle;
      })
    ).subscribe((ttl: string) => {
      this.title.setTitle(ttl);
    });
  }
}
