import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() image: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
