import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public postUrl = `${environment.baseUrl}/posts.json`;
  private postObjSub$: Subject<Ipost> = new Subject<Ipost>();
  public postObj = this.postObjSub$.asObservable();
  private updatePostSub$: Subject<Ipost> = new Subject<Ipost>();
  public updateObj = this.updatePostSub$.asObservable();
  constructor(private _http: HttpClient) {}

  getAllPost(): Observable<Ipost[]> {
    return this._http.get<any>(this.postUrl).pipe(
      map((res) => {
        let data: Ipost[] = [];
        for (const key in res) {
          let obj = {
            id: key,
            ...res[key],
          };
          data.push(obj);
        }
        return data;
      })
    );
  }

  addPost(obj: any): Observable<any> {
    return this._http.post<any>(this.postUrl, obj);
  }

  sentPostObj(post: Ipost) {
    this.postObjSub$.next(post);
  }

  sentUpdatePost(post: Ipost) {
    this.updatePostSub$.next(post);
  }

  updatePost(post: Ipost): Observable<Ipost> {
    let updateUrl = `${environment.baseUrl}/posts/${post.id}.json`;
    return this._http.patch<Ipost>(updateUrl, post);
  }

  deletePost(id: string): Observable<null> {
    let deleteUrl = `${environment.baseUrl}/posts/${id}.json`;
    return this._http.delete<null>(deleteUrl);
  }
}
