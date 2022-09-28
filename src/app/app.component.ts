import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = '公投網';

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle(this.appTitle)
  }
}
