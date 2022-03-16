import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post(
        'https://ng-complete-guide-9ff8e-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get(
        'https://ng-complete-guide-9ff8e-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(map(responseData => {
        const postArr = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArr.push({ ...responseData[key], id: key });
          }
        }
        return postArr;
      }))
      .subscribe(posts => {
        // ...
        console.log(posts);
      });
  }
}
