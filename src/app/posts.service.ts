import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostService {

    constructor(
        private http: HttpClient
    ) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {
            title: title,
            content: content
        }
        this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-9ff8e-default-rtdb.firebaseio.com/posts.json',
                postData
            )
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    fetchPosts() {
        return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-9ff8e-default-rtdb.firebaseio.com/posts.json'
            )
            .pipe(
                map(responseData => {
                    const postArr: Post[] = [];
                    for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArr.push({ ...responseData[key], id: key });
                    }
                    }
                    return postArr;
                })
            );
    }

    deletePosts() {
        return this.http
            .delete('https://ng-complete-guide-9ff8e-default-rtdb.firebaseio.com/posts.json')
    }
}