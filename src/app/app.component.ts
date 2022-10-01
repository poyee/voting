import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Router} from "@angular/router";
import {buffer, filter, map} from "rxjs";
import {Poll} from "./model/poll/poll.model";
import {tap} from "rxjs/operators";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {SeoService} from "./shared/service/seo-service";
import {Option} from "./model/poll/option.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = '公投網';

  constructor(private seo: SeoService,
              private router: Router) {
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

        return child.data['poll'];
      })
    ).subscribe(poll => {
        if (poll) {
          this.seo.setTitle(`${poll.title} | ${this.appTitle}`);
          this.seo.addTags([
            {name: 'description', content: `選項: ${this.optionsStr(poll.options)}`},
            {name: 'robots', content: 'index, nofollow'},
          ])
        } else {
          this.seo.setTitle(this.appTitle);
        }
    })
  }

  private optionsStr(options: Array<Option>): string {
    return options
      .map(option => `${option.number}. ${option.name}`)
      .join('、');
  }
}
