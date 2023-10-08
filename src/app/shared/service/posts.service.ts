import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public postUrl = `${environment.baseUrl}/posts.json`
  constructor(private _http : HttpClient) { }

  getAllPost() : Observable<any>{
    return this._http.get<any>(this.postUrl).pipe(
      map(res => {
        let data = [];
        for (const key in res) {
            let obj = {
              id : res,
              ...res[key]
            }
            data.push(obj)
        }
        return data
      })
    )
       
  }
}
