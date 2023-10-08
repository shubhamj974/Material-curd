import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  public postArr : any = []
  constructor(private _postService : PostsService , private _dialog : MatDialog) { }

  ngOnInit(): void {
    this._postService.getAllPost().subscribe((res) => {
       this.postArr = res
    })
  }

  onOpenForm(){
    this._dialog.open( PostFormComponent, {
      width: '500px',
      enterAnimationDuration : '1000ms',
      exitAnimationDuration: '500ms',
      disableClose : true
    });
  }

}
