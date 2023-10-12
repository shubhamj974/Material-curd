import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable()
export class AuthIntercepterService implements HttpInterceptor {
  constructor(private _postService: PostsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._postService.sentLoaderStatus(true);
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authroization: 'JWT Token',
      },
    });
    return next.handle(authReq).pipe(
      delay(1500),
      finalize(() => {
        this._postService.sentLoaderStatus(false);
      })
    );
  }
}
