import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './shared/header/header';
import { Profile } from './pages/profile/profile';
import { ContributionGraph } from './shared/contribution-graph/contribution-graph';
import { PopularRepositories } from './shared/popular-repositories/popular-repositories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,              
    Profile,
    ContributionGraph,
    PopularRepositories
  ],
  templateUrl: './app.html',
})
export class App {}
