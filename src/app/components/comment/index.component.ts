import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './index.component.html',
  styleUrls: ['../../app.component.css']
})

export class CommentComponent implements OnInit {
  data: Object;

  /**
   * CommentComponent constructor
   *
   * @param {CommentService} commentService
   * @param {ActivatedRoute} activatedRoute
   * @param {Location} location
   */
  constructor (private commentService: CommentService, private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.getCommentById(params['articleId'], params['commentId']);
      });
  }

  /**
   * @param articleId
   * @param commentId
   */
  getCommentById(articleId, commentId) {
    this.commentService.getCommentById(articleId, commentId)
      .subscribe((responseBody: object) => {
        this.data = responseBody;
    });
  }

  deleteComment() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.commentService.deleteComment(params['articleId'], params['commentId']);

        this.location.back();
      });
  }

  back() {
    this.location.back();
  }
}
