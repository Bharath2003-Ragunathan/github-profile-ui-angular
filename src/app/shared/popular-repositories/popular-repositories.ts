import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-repositories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-repositories.html',
  styleUrl: './popular-repositories.scss'
})
export class PopularRepositories {

  repos = [
    {
      name: 'Complete-Python-Bootcamp',
      description: 'Course files for Complete Python Bootcamp Course on Udemy',
      language: 'Jupyter Notebook',
      color: '#DA5B0B',
      visibility: 'Public'
    },
    {
      name: 'flutter_login_ui',
      description: 'Flutter login UI',
      language: 'Dart',
      color: '#00B4AB',
      visibility: 'Public'
    },
    {
      name: 'gitignore',
      description: 'A collection of useful .gitignore templates',
      language: 'Shell',
      color: '#89e051',
      visibility: 'Public'
    },
    {
      name: 'node-cpu-logger',
      description: 'An API to log CPU usage data to InfluxDB',
      language: 'JavaScript',
      color: '#f1e05a',
      visibility: 'Public'
    },
    {
      name: 'kafka',
      description: 'Apache Kafka client for Node.js',
      language: 'Java',
      color: '#b07219',
      visibility: 'Public'
    },
    {
      name: 'node-cpu-ui',
      description: 'CPU & memory usage UI built with Node.js',
      language: 'TypeScript',
      color: '#3178c6',
      visibility: 'Public'
    }
  ];
}
