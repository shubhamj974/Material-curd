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
}
