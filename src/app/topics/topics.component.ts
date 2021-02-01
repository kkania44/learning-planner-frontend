import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { Topic } from '../topic';
import { TopicService } from '../topic.service';

const tempUserId = 1;

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

  @ViewChild(MatTable) table: MatTable<Topic>;

  constructor(
    private topicService: TopicService,
    private datepipe: DatePipe) 
    { }

  ngOnInit(): void {
    this.getAllTopics();
  }

  getAllTopics() {
    this.topicService.getAllTopics(tempUserId)
      .subscribe(topics => this.topics = topics);
  }

  add(title: string, daysForLearning: number): void {
    title = title.trim();
    if (!title || !daysForLearning) {
      return;
    }
    let topic = new Topic(title, daysForLearning);
    this.topicService.add(topic, tempUserId)
      .subscribe(topic => {
        this.topics.push(topic);
        this.table.renderRows();
      });
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

}
