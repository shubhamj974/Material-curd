import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { Ipost } from '../../model/post';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss'],
})
export class PostDashboardComponent implements OnInit {
  public postArr: Ipost[] = [];
  constructor(private _postService: PostsService, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllPost();
    this.postData();
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
    this._postService.postObj.subscribe((res: Ipost) =>
      this.postArr.unshift(res)
    );
  }

  onEditPost(obj: Ipost) {
    const dialogConfug = new MatDialogConfig();
    dialogConfug.data = obj;
    this._dialog.open(PostFormComponent, dialogConfug);
  }
}
