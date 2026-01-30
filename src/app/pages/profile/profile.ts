import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { Github } from '../../core/github';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
    // HttpClientModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile implements OnInit {
  user: any;
  loading = true;

  constructor(
    private github: Github,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.github.getUser('shreeramk').subscribe({
      next: res => {
        console.log('User data:', res);

        this.user = res;
        this.loading = false;

        this.cdr.detectChanges(); 
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
