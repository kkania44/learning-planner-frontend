import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Topic } from './topic';
import { TopicService } from './topic.service';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [DatePipe]
})
export class TopicsComponent implements OnInit {
  @Input() color: ThemePalette;
  topics: Topic[];
  displayedColumns = ['title', 'days for learning', 'progress', 'started on', 'update', 'delete'];
  errorMsg: string;

  @ViewChild(MatTable) table: MatTable<Topic>;

  constructor(
    private topicService: TopicService,
    private datepipe: DatePipe,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getAllTopics();
  }

  private getAllTopics() {
    this.topicService.getAllTopics()
      .subscribe(topics => this.topics = topics);
  }

  goToDetails(topic: Topic) {
    this.cookieService.set('topicTitle', topic.title);
    this.router.navigateByUrl(`/subtopics/topic/${topic.id}`);
  }

  add(title: string, daysForLearning: number): void {
    title = title.trim();
    if (!title || !daysForLearning) {
      return;
    }
    let topic = new Topic(title, daysForLearning);
    this.topicService.add(topic)
      .subscribe(topic => {
        this.topics.push(topic);
        this.table.renderRows();
      },
      error => {
        if (error.status === 400) {
        this.errorMsg = '\'daysForLearning\' field has to be a number';
        }}
      );
  }

  start(topic: Topic): void {
    let formattedCurrentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    topic.startedOn = formattedCurrentDate;
    this.topicService.start(topic.id).subscribe();
  }

  delete(topicId: number): void {
    this.topicService.delete(topicId).subscribe(() => {
      this.getAllTopics();
      this.table.renderRows();
    });
  }

  goToUpdate(topicId: number): void {
    this.router.navigateByUrl(`/topics/${topicId}`);
  }

  markAsCompleted(): void {
    this.topicService.update
  }

}
