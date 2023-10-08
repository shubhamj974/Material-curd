import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
public postForm !: FormGroup;
public numArr : string[] = ['1','2','3','4','5','6','7','8','9','10']
  constructor(private _dialog : MatDialog) { }

  ngOnInit(): void {
    this.createPostForm()
  }

  createPostForm(){
    this.postForm = new FormGroup({
      title : new  FormControl(null , Validators.required),
      userId : new FormControl(null , Validators.required),
      body : new FormControl(null , Validators.required)
    })
  }

  onCloseForm(){
    this._dialog.closeAll()
  }

}
