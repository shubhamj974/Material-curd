import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PostsService } from '../../service/posts.service';
import { Ipost } from '../../model/post';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public postForm!: FormGroup;
  public numArr: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public isUpdate: boolean = false;
  public updatePostData!: Ipost;

  constructor(
    @Inject(MAT_DIALOG_DATA) postData: Ipost,
    private _postService: PostsService,
    private _dialog: MatDialog,
    private _snackbarService: SnackbarService
  ) {
    this.createPostForm();

    postData
      ? (this.postForm.patchValue(postData),
        (this.isUpdate = true),
        (this.updatePostData = postData))
      : (this.isUpdate = false);
  }

  ngOnInit(): void {}

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      userId: new FormControl(null, [
        Validators.required,
        Validators.pattern('[^d+$]'),
      ]),
      body: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.postForm.controls;
  }

  onCloseForm() {
    this._dialog.closeAll();
  }

  onPostHandler() {
    let post = this.postForm.value;
    if (this.postForm.valid) {
      this._dialog.closeAll();
      this._postService.addPost(post).subscribe((res) => {
        this._postService.sentPostObj(post);
      });
      this.postForm.reset();
    }
  }

  onUpdate() {
    let obj = { ...this.postForm.value, id: this.updatePostData.id };
    this._dialog.closeAll();
    this._postService
      .updatePost(obj)
      .subscribe(
        (res) => (
          this._postService.sentUpdatePost(res),
          this._snackbarService.openSnackBar(
            `Post is updated whose title is ${res.title}`
          )
        )
      );
  }
}
