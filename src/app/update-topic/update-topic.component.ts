import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Topic } from '../topics/topic';
import { TopicService } from '../topics/topic.service';

@Component({
  selector: 'app-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.css']
})
export class UpdateTopicComponent implements OnInit {
  @Input() color: ThemePalette;
  currentTopic: Topic;
  message: string;

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute) 
    { }

  ngOnInit(): void {
    this.getTopicById(this.getIdFromUrl());
  }

  update(): void {
    this.message = "Topic updated";
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
        error => this.message = error);
  }

}
