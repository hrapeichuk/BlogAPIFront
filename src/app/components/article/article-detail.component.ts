import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ActivatedRoute, Params } from '@angular/router';

import { ArticleService } from '../../article/article.service';

@Component({
  selector: 'article-detail',
  templateUrl: 'article-detail.component.html',
  styleUrls: ['../../app.component.css']
})

export class ArticleDetailComponent implements OnInit {
  data: Object;

  constructor (private articleService: ArticleService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params['id']);
      let articleId = params['id'];
      this.getArticleDetail(articleId);
    });
  }

  getArticleDetail(id) {
    this.articleService.getArticleById(id)
      .subscribe((response: Response) => {
        this.data = response.json();
      });
  }
}
