import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  histories: string[] = [];

  add(history: string) {
    this.histories.push(history);
  }
  clear() {
    this.histories = [];
  }
}