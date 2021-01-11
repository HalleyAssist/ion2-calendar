import { Component, Input } from '@angular/core';
import { defaults } from '../config';

@Component({
  selector: 'ion-calendar-week',
  styles: [`
  :host {
    .toolbar-background-md,
    .toolbar-background-ios {
      background: transparent;
    }
  
    .week-toolbar {
      --padding-start: 0;
      --padding-end: 0;
      --padding-bottom: 0;
      --padding-top: 0;
  
      &.primary {
        --background: var(--ion-color-primary);
      }
      &.secondary {
        --background: var(--ion-color-secondary);
      }
      &.danger {
        --background: var(--ion-color-danger);
      }
      &.dark {
        --background: var(--ion-color-dark);
      }
      &.light {
        --background: var(--ion-color-light);
      }
      &.transparent {
        --background: transparent;
      }
  
      &.toolbar-md {
        min-height: 44px;
      }
    }
  
    .week-title {
      margin: 0;
      height: 44px;
      width: 100%;
      padding: 15px 0;
      color: #fff;
      font-size: 0.9em;
  
      &.light,
      &.transparent {
        color: #9e9e9e;
      }
  
      li {
        list-style-type: none;
        display: block;
        float: left;
        width: 14%;
        text-align: center;
      }
  
      li:nth-of-type(7n),
      li:nth-of-type(7n + 1) {
        width: 15%;
      }
    }
  } 
  `],
  template: `
    <ion-toolbar [class]="'week-toolbar ' + color" no-border-top>
      <ul [class]="'week-title ' + color">
        <li *ngFor="let w of _displayWeekArray">{{ w }}</li>
      </ul>
    </ion-toolbar>
  `,
})
export class CalendarWeekComponent {
  _weekArray: string[] = defaults.WEEKS_FORMAT;
  _displayWeekArray: string[] = this._weekArray;
  _weekStart = 0;
  @Input()
  color: string = defaults.COLOR;

  constructor() { }

  @Input()
  set weekArray(value: string[]) {
    if (value && value.length === 7) {
      this._weekArray = [...value];
      this.adjustSort();
    }
  }

  @Input()
  set weekStart(value: number) {
    if (value === 0 || value === 1) {
      this._weekStart = value;
      this.adjustSort();
    }
  }

  adjustSort(): void {
    if (this._weekStart === 1) {
      const cacheWeekArray = [...this._weekArray];
      cacheWeekArray.push(cacheWeekArray.shift());
      this._displayWeekArray = [...cacheWeekArray];
    } else if (this._weekStart === 0) {
      this._displayWeekArray = [...this._weekArray];
    }
  }
}
