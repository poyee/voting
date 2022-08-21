import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-poll',
  templateUrl: './get-poll.component.html',
  styleUrls: ['./get-poll.component.css']
})
export class GetPollComponent implements OnInit {
  options: Array<any> = [
    {
      name: '屠龍刀',
      number: 3,
      vote: 40
    },
    {
      name: '關刀',
      number: 1,
      vote: 30
    },
    {
      name: '開山刀',
      number: 2,
      vote: 10,
      isSelected: true
    },
    {
      name: '我的屌',
      number: 4,
      vote: 5
    }
  ];

  comments: Array<any> = [
    {
      user: '王小明',
      comment: 'Too Long',
      options: [1, 2]
    },
    {
      user: '李大屌',
      comment: '再怎麼長都沒有我的屌長',
      options: [4]
    }
  ];
  total = 100;

  constructor() { }

  ngOnInit(): void {
    console.log('get poll')
  }

  getPercentWidth(vote: number): string {
    return `${vote / this.total * 100}%`;
  }

}
