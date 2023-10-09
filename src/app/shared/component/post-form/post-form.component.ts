import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PostsService } from '../../service/posts.service';
import { Router } from '@angular/router';
import { Ipost } from '../../model/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public postForm!: FormGroup;
  public numArr: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public isUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) postData: Ipost,
    private _postService: PostsService,
    private _dialog: MatDialog
  ) {
    this.createPostForm();

    postData
      ? (this.postForm.patchValue(postData), (this.isUpdate = true))
      : (this.isUpdate = false);
  }

  ngOnInit(): void {}

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
    });
  }

  onCloseForm() {
    this._dialog.closeAll();
  }

  onPostHandler() {
    let post = this.postForm.value;
    if (this.postForm.valid) {
      this._postService.addPost(post).subscribe((res) => {
        this._postService.sentPostObj(post);
        this._dialog.closeAll();
      });
      this.postForm.reset();
    }
  }
}
