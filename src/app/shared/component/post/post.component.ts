import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from '../../model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() postData!: Ipost;
  @Output() postObj: EventEmitter<Ipost> = new EventEmitter<Ipost>();
  constructor() {}

  ngOnInit(): void {}

  onEdit() {
    this.postObj.emit(this.postData);
  }
}
