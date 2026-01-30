
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Github {
//   private baseUrl = 'https://api.github.com/users';

//   constructor(private http: HttpClient) { }

//   getUser(username: string) {
//     return this.http.get(`${this.baseUrl}/${username}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Github {

  private baseUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  /**
   * GitHub does NOT provide contributions via REST API directly.
   * This endpoint uses GitHub's GraphQL public contribution calendar
   * (works without auth for public profiles)
   */
  getContributions(username: string): Observable<any> {
    const url = `https://github-contributions-api.jogruber.de/v4/${username}`;
    return this.http.get(url);
  }
}
