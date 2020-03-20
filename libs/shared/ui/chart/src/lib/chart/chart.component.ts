import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartData: [];

  chart: {
    title: string;
    type: string;
    columnNames: string[];
    options: any;
  };
  constructor() {}

  ngOnInit() {
    this.chart = {
      title: 'Stock price',
      type: 'LineChart',
      columnNames: ['period', 'close'],
      options: { width: '600', height: '400' }
    };
  }
}
