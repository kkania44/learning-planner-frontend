import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subtopic } from './subtopic';
import { SubtopicService } from "./subtopic.service";
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ThemePalette } from '@angular/material/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-subtopics',
  templateUrl: './subtopics.component.html',
  styleUrls: ['./subtopics.component.css']
})

export class SubtopicsComponent implements OnInit {
  @Input() color: ThemePalette;
  displayedColumns = ['title', 'completion', 'delete'];
  subtopics: Subtopic[];
  
  errorMessage: string;
  isLoggedIn: boolean;
  topicTitle: string;

  @ViewChild(MatTable) table: MatTable<Subtopic>; 

  constructor(
    private subtopicService: SubtopicService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.topicTitle = this.cookieService.get('topicTitle');
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
      .subscribe(sub => {
        this.subtopics.push(sub);
        this.table.renderRows()
      });
  }

  delete(id: number) {
    this.subtopicService.delete(id)
    .subscribe(() => {
      this.getSubtopicsForTopic(this.getIdFromUrl());
      // window.location.reload();
      // this.table.renderRows()
    });
  }

  /* TODO: after completing subtopic check if all are completed, 
          if so, set topic as completed 
  */
  complete(subtopic: Subtopic): void {
    subtopic.completed = true;
    this.subtopicService.markAsCompleted(subtopic)
      .subscribe();
      this.checkIfAllSubtopicsCompleted();
  }

  goBack(): void {
    this.location.back();
  }

  private checkIfAllSubtopicsCompleted(): boolean {
    this.subtopics.forEach(function(val) {
      if (!val.completed) {
        return false;
      }
    });
    return true;
  }

  private getIdFromUrl(): number {
    let id: number;
    this.route.params.forEach((params: Params) => {
      id = +params['id']
    });
    return id;
  }

}
