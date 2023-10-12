import { Component, OnInit } from '@angular/core';
import { PostsService } from './shared/service/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'practice';
  public loaderStatus!: boolean;

  constructor(private _postService: PostsService) {}

  ngOnInit(): void {
    this.loader();
  }

  loader() {
    this._postService.loaderStatus.subscribe(
      (res: boolean) => (this.loaderStatus = res)
    );
  }
}
