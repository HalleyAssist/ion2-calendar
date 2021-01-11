var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { defaults } from '../config';
let CalendarWeekComponent = class CalendarWeekComponent {
    constructor() {
        this._weekArray = defaults.WEEKS_FORMAT;
        this._displayWeekArray = this._weekArray;
        this._weekStart = 0;
        this.color = defaults.COLOR;
    }
    set weekArray(value) {
        if (value && value.length === 7) {
            this._weekArray = [...value];
            this.adjustSort();
        }
    }
    set weekStart(value) {
        if (value === 0 || value === 1) {
            this._weekStart = value;
            this.adjustSort();
        }
    }
    adjustSort() {
        if (this._weekStart === 1) {
            const cacheWeekArray = [...this._weekArray];
            cacheWeekArray.push(cacheWeekArray.shift());
            this._displayWeekArray = [...cacheWeekArray];
        }
        else if (this._weekStart === 0) {
            this._displayWeekArray = [...this._weekArray];
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], CalendarWeekComponent.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], CalendarWeekComponent.prototype, "weekArray", null);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CalendarWeekComponent.prototype, "weekStart", null);
CalendarWeekComponent = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [])
], CalendarWeekComponent);
export { CalendarWeekComponent };
//# sourceMappingURL=calendar-week.component.js.map