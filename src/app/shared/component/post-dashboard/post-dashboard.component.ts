import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { Ipost } from '../../model/post';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss'],
})
export class PostDashboardComponent implements OnInit {
  public postArr: Ipost[] = [];
  constructor(
    private _postService: PostsService,
    private _dialog: MatDialog,
    private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getAllPost();
    this.postData();
    this.updatePostData();
  }

  getAllPost() {
    this._postService.getAllPost().subscribe((res) => (this.postArr = res));
  }

  openDialog(): MatDialogRef<PostFormComponent, any> {
    return this._dialog.open(PostFormComponent, {
      width: '500px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
    });
  }

  onOpenForm() {
    this.openDialog();
  }

  postData() {
    this._postService.postObj.subscribe((res: Ipost) => {
      this.postArr.unshift(res);
      this._snackbarService.openSnackBar(
        `Post whose title ${res.title} is succesfully added`
      );
    });
  }

  onEditPost(obj: Ipost) {
    const dialogConfug = new MatDialogConfig();
    dialogConfug.data = obj;
    this._dialog.open(PostFormComponent, dialogConfug);
  }

  updatePostData() {
    this._postService.updateObj.subscribe((updatePost) => {
      this.postArr.forEach((res) => {
        res.id === updatePost.id
          ? ((res.title = updatePost.title),
            (res.body = updatePost.body),
            (res.userId = updatePost.userId))
          : false;
      });
    });
  }

  onPostDelete(id: string) {
    let postIndex = this.postArr.findIndex((index) => index.id === id);
    this.postArr.splice(postIndex, 1);
  }
}
