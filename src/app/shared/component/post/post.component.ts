import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from '../../model/post';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPostComponent } from '../confirm-post/confirm-post.component';
import { PostsService } from '../../service/posts.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() postData!: Ipost;
  @Output() postObj: EventEmitter<Ipost> = new EventEmitter<Ipost>();
  @Output() postDelete: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private _dialog: MatDialog,
    private _postService: PostsService,
    private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onEdit() {
    this.postObj.emit(this.postData);
  }

  onDelete() {
    const dialogConfig = this._dialog.open(ConfirmPostComponent);
    dialogConfig
      .afterClosed()
      .subscribe((res: boolean) =>
        res
          ? this._postService
              .deletePost(this.postData.id)
              .subscribe(
                (res) => (
                  this.postDelete.emit(this.postData.id),
                  this._snackbarService.openSnackBar(
                    `The post whose id is ${this.postData.id} is Successfully delete`
                  )
                )
              )
          : false
      );
  }
}
