import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subtopic } from '../subtopic';
import { SubtopicService } from "../subtopic.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-subtopics',
  templateUrl: './subtopics.component.html',
  styleUrls: ['./subtopics.component.css']
})
export class SubtopicsComponent implements OnInit {
  subtopics: Subtopic[];
  errorMessage: string;

  constructor(
    private subtopicService: SubtopicService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getSubtopicsForTopic(this.getIdFromUrl());
  }

  getSubtopicsForTopic(topicId: number): void {
    this.subtopicService.getSubtopicsForTopic(topicId)
      .subscribe(subtopics => this.subtopics = subtopics,
        error => this.errorMessage = error);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.subtopicService.add(title, this.getIdFromUrl())
      .subscribe(sub => this.subtopics.push(sub));
  }

  complete(subtopic: Subtopic): void {
    subtopic.completed = true;
    this.subtopicService.markAsCompleted(subtopic)
      .subscribe();
  }

  private getIdFromUrl(): number {
    let id: number;
    this.route.params.forEach((params: Params) => {
      id = +params['id']
    });
    return id;
  }

  goBack(): void {
    this.location.back();
  }

}
