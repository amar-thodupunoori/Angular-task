import { Component, OnInit } from '@angular/core';
import { People } from '../people';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  peoples: People[] = [];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.getPeoples();
  }

  getPeoples(): void {
    this.peopleService.getPeoples()
      .subscribe(peoples => this.peoples = peoples.slice(1, 5));
  }
}