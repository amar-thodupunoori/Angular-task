import { Component, OnInit } from '@angular/core';
import {People} from '../people';
import { PeopleService } from '../people.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  selectedPeople?: People;
  peoples: People[] = [];

  constructor(private peopleService: PeopleService) {}
  
  ngOnInit() {
    this.getPeoples();
  }
    getPeoples(): void {
      this.peopleService.getPeoples().subscribe(peoples => this.peoples = peoples);
    }
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.peopleService.addPeople({ name } as People).subscribe(people => {this.peoples.push(people);
        });
    }
    delete(people: People): void {
      this.peoples = this.peoples.filter(h => h !== people);
      this.peopleService.deletePeople(people.id).subscribe();
    }
}
