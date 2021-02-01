import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { error } from 'protractor';
import { Topic } from '../topic';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.css']
})
export class UpdateTopicComponent implements OnInit {
  @Input() color: ThemePalette;
  currentTopic: Topic;
  errorMessage: string;

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getTopicById(this.getIdFromUrl());
  }

  update(): void {
    this.topicService.update(this.currentTopic).subscribe();
  }

  private getIdFromUrl(): number {
    let id: number;
    this.route.params.forEach((params: Params) => {
      id = +params['id']
    });
    return id;
  }

  getTopicById(topicId: number) {
    return this.topicService.getOneById(topicId)
      .subscribe(topic => this.currentTopic = topic,
        error => this.errorMessage = error);
  }

}
