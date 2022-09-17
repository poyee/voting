import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../model/pagination.model';
import { PollSummary } from '../../model/poll/poll-summary.model';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-search-polls',
  templateUrl: './search-polls.component.html',
  styleUrls: ['./search-polls.component.css']
})
export class SearchPollsComponent implements OnInit {
  pageNumber: number;
  pollsPage: Pagination<PollSummary>;

  constructor(private readonly service: PollService,
              private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.pageNumber = params['page'] ? Number(params['page']) : 0;
        this.searchPollSummaries(this.pageNumber);
    });

  }

  searchPollSummaries(page: number): void {
    this.service.getPollSummaries(page)
        .subscribe(result => {
          if (result.ok) {
              this.pollsPage = result.rtnObj as Pagination<PollSummary>;
          }
        });
  }

}
