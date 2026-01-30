import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-contribution-graph',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './contribution-graph.html',
  styleUrls: ['./contribution-graph.scss']
})
export class ContributionGraph implements OnInit {

  chartOptions: any;
  totalContributions = 0;

  currentStreak = 0;

  selectedYear!: number;

  longestStreak = 0;

  commitPercent = 83;
  prPercent = 17;

  years: number[] = [];


  username = 'shreeramk';
  avatarUrl = `https://github.com/${this.username}.png`;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const current = new Date().getFullYear();
    this.years = Array.from({ length: 7 }, (_, i) => current - i);
    this.selectedYear = current - 1;
    this.fetch();
  }

  changeYear(y: number) {
    this.selectedYear = y;
    this.fetch();
  }

  fetch() {
    this.chartOptions = null;
    this.totalContributions = 0;
    this.currentStreak = 0;
    this.longestStreak = 0;

    this.http
      .get<any>(`https://github-contributions-api.jogruber.de/v4/${this.username}`)
      .subscribe(res => {

        const yearDays = this.fillMissingDays(
          res.contributions,
          this.selectedYear
        );

        this.totalContributions = yearDays.reduce(
          (s, d) => s + d.count, 0
        );

        this.calculateStreaks(yearDays);
        this.buildCalendar(yearDays);
      });
  }

  fillMissingDays(data: any[], year: number) {
    const map = new Map(
      data.map(d => [d.date, d.count])
    );

    const days: any[] = [];
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const date = d.toISOString().slice(0, 10);
      days.push({
        date,
        count: map.get(date) || 0
      });
    }

    return days;
  }

  calculateStreaks(days: any[]) {
    let current = 0;
    let longest = 0;

    days.forEach(d => {
      if (d.count > 0) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    });

    this.currentStreak = current;
    this.longestStreak = longest;
  }

  buildCalendar(days: any[]) {
    const data = days.map(d => [d.date, d.count]);
    const counts = days.map(d => d.count).sort((a, b) => a - b);
    const max = counts[Math.floor(counts.length * 0.9)] || 1;

    this.chartOptions = {
      tooltip: {
        formatter: (p: any) =>
          `${p.value[1]} contributions on ${p.value[0]}`
      },

      calendar: {
        range: this.selectedYear,
        top: 20,
        left: 0,
        right: 10,
        cellSize: [14, 14],
        splitLine: { show: false },
        yearLabel: { show: false },
        monthLabel: {
          show: true,
          position: 'top',
          fontSize: 12,
          color: '#57606a'
        },
        dayLabel: { show: false }
      },

      visualMap: {
        show: false,
        type: 'piecewise',
        pieces: [
          { value: 0, color: '#ebedf0' },
          { min: 1, max: max * 0.25, color: '#9be9a8' },
          { min: max * 0.25, max: max * 0.5, color: '#40c463' },
          { min: max * 0.5, max: max * 0.75, color: '#30a14e' },
          { min: max * 0.75, color: '#216e39' }
        ]
      },

      series: [{
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data,
        itemStyle: {
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#ffffff'
        }
      }]
    };

    this.cd.detectChanges();
  }
}

