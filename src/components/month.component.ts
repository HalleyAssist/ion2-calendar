import { Component, ChangeDetectorRef, Input, Output, EventEmitter, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarDay, CalendarMonth, CalendarOriginal, PickMode } from '../calendar.model';
import { defaults, pickModes } from '../config';

export const MONTH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MonthComponent),
  multi: true,
};

@Component({
  selector: 'ion-calendar-month',
  providers: [MONTH_VALUE_ACCESSOR],
  styles: [`
  $colors: (
  primary: var(--ion-color-primary),
  secondary: var(--ion-color-secondary),
  danger: var(--ion-color-danger),
  light: var(--ion-color-light),
  dark: var(--ion-color-dark),
);

$disabled-color: rgba(0, 0, 0, 0.25);

@function bindColors($color-value) {
  @return map-get($colors, $color-value);
}

@mixin transition-property($args...) {
  -webkit-transition-property: $args;
  -moz-transition-property: $args;
  -ms-transition-property: $args;
  -o-transition-property: $args;
  transition-property: $args;
}

@mixin transition-duration($args...) {
  -webkit-transition-duration: $args;
  -moz-transition-duration: $args;
  -ms-transition-duration: $args;
  -o-transition-duration: $args;
  transition-duration: $args;
}

@mixin transition-timing-function($args...) {
  -webkit-transition-timing-function: $args;
  -moz-transition-timing-function: $args;
  -ms-transition-timing-function: $args;
  -o-transition-timing-function: $args;
  transition-timing-function: $args;
}

@mixin month-color($background-color: primary, $color: #fff) {
  button.days-btn small,
  .days .marked p,
  .days .today p {
    color: bindColors($background-color);
  }
  .days .today p {
    font-weight: 700;
  }
  .days .last-month-day p,
  .days .next-month-day p {
    color: $disabled-color;
  }
  .days .today.on-selected p,
  .days .marked.on-selected p {
    color: $color;
  }
  .days .on-selected,
  .startSelection button.days-btn,
  .endSelection button.days-btn {
    background-color: bindColors($background-color);
    color: $color;
  }
  .startSelection {
    position: relative;

    &:before,
    &:after {
      height: 36px;
      width: 50%;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      display: block;
    }

    &:before {
      background-color: bindColors($background-color);
    }
    &:after {
      background-color: white;
      opacity: 0.25;
    }
  }
  .endSelection {
    position: relative;

    &:before,
    &:after {
      height: 36px;
      width: 50%;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
    }

    &:before {
      background-color: bindColors($background-color);
    }
    &:after {
      background-color: white;
      opacity: 0.25;
    }
  }
  .startSelection.endSelection {
    &:after {
      background-color: transparent;
    }
  }
  .startSelection button.days-btn {
    border-radius: 50%;
  }
  .between button.days-btn {
    background-color: bindColors($background-color);
    width: 100%;
    border-radius: 0;
    position: relative;

    &:after {
      height: 36px;
      width: 100%;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: block;
      background-color: white;
      opacity: 0.25;
    }

    p {
      color: $color;
    }
  }
  .endSelection button.days-btn {
    border-radius: 50%;
    p {
      color: $color;
    }
  }


  .days .on-selected p {
    color: $color;
  }
  .startSelection,
  .endSelection,
  .between {
    button.days-btn {
      @include transition-property(background-color);
      @include transition-duration(180ms);
      @include transition-timing-function(ease-out);
    }
  }

  .startSelection.endSelection::before {
    --ion-color-primary: transparent;
  }
}

:host {
  display: inline-block;
  width: 100%;
  .days-box {
    padding: 0.5rem;
  }
  .days:nth-of-type(7n),
  .days:nth-of-type(7n + 1) {
    width: 15%;
  }
  .days {
    width: 14%;
    float: left;
    text-align: center;
    height: 36px;
    margin-bottom: 5px;
  }
  .days .marked p {
    font-weight: 500;
  }
  .days .on-selected {
    border: none;
    p {
      font-size: 1.3em;
    }
  }

  .primary {
    @include month-color();
  }
  .secondary {
    @include month-color(secondary);
  }
  .danger {
    @include month-color(danger);
  }
  .dark {
    @include month-color(dark);
  }
  .light {
    @include month-color(light, #a0a0a0);
    .days .today p {
      color: #565656;
    }
  }

  button.days-btn {
    border-radius: 36px;
    width: 36px;
    display: block;
    margin: 0 auto;
    padding: 0;
    height: 36px;
    background-color: transparent;
    position: relative;
    z-index: 2;
    outline: 0;
  }
  button.days-btn p {
    margin: 0;
    font-size: 1.2em;
    color: #333;
    text-align: center;
  }
  button.days-btn[disabled] p {
    color: $disabled-color;
  }
  button.days-btn.on-selected small {
    transition: bottom 0.3s;
    bottom: -14px;
  }
  button.days-btn small {
    overflow: hidden;
    display: block;
    left: 0;
    right: 0;
    bottom: -5px;
    position: absolute;
    z-index: 1;
    text-align: center;
    font-weight: 200;
  }


  .days.startSelection:nth-child(7n):before,
  .days.between:nth-child(7n) button.days-btn,
  .days.between button.days-btn.is-last {
    border-radius: 0 36px 36px 0;
    &.on-selected {
      border-radius: 50%;
    }
  }

  .days.endSelection:nth-child(7n + 1):before,
  .days.between:nth-child(7n + 1) button.days-btn,
  .days.between.is-first-wrap button.days-btn.is-first,
  button.days-btn.is-first {
    border-radius: 36px 0 0 36px;
  }

  .startSelection button.days-btn.is-first,
  .endSelection button.days-btn.is-first,
  button.days-btn.is-first.on-selected,
  button.days-btn.is-last.on-selected,
  .startSelection button.days-btn.is-last,
  .endSelection button.days-btn.is-last {
    border-radius: 50%;
  }

  .startSelection.is-last-wrap {
    &::before,
    &::after {
      border-radius: 0 36px 36px 0;
    }
  }

  .endSelection.is-first-wrap {
    &::before,
    &::after {
      border-radius: 36px 0 0 36px;
    }
  }

  &.component-mode {

    .days.between {
      button.days-btn.is-last,
      button.days-btn.is-first {
        border-radius: 0;
      }
    }

    .days.startSelection.is-last-wrap {
      &::before,
      &::after {
        border-radius: 0;
      }
    }

    .days.endSelection.is-first-wrap {
      &::before,
      &::after {
        border-radius: 0;
      }
    }
  }

  .cal-color {
    @include month-color(cal-color);
  }

}
`],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.component-mode]': 'componentMode'
  },
  template: `
    <div [class]="color">
      <ng-template [ngIf]="!_isRange" [ngIfElse]="rangeBox">
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month.days" [ngForTrackBy]="trackByTime">
            <div class="days">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.on-selected]="isSelected(day.time)"
                        [disabled]="day.disable"
                        [attr.aria-label]="getDayLabel(day) | date:DAY_DATE_FORMAT">
                  <p>{{ day.title }}</p>
                  <small *ngIf="day.subTitle">{{ day?.subTitle }}</small>
                </button>
              </ng-container>
            </div>
          </ng-template>
        </div>
      </ng-template>

      <ng-template #rangeBox>
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month.days" [ngForTrackBy]="trackByTime">
            <div class="days"
                 [class.startSelection]="isStartSelection(day)"
                 [class.endSelection]="isEndSelection(day)"
                 [class.is-first-wrap]="day?.isFirst"
                 [class.is-last-wrap]="day?.isLast"
                 [class.between]="isBetween(day)">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.is-first]="day.isFirst"
                        [class.is-last]="day.isLast"
                        [class.on-selected]="isSelected(day.time)"
                        [disabled]="day.disable">
                  <p>{{ day.title }}</p>
                  <small *ngIf="day.subTitle">{{ day?.subTitle }}</small>
                </button>
              </ng-container>

            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
})
export class MonthComponent implements ControlValueAccessor, AfterViewInit {
  @Input() componentMode = false;
  @Input()
  month: CalendarMonth;
  @Input()
  pickMode: PickMode;
  @Input()
  isSaveHistory: boolean;
  @Input()
  id: any;
  @Input()
  readonly = false;
  @Input()
  color: string = defaults.COLOR;

  @Output()
  change: EventEmitter<CalendarDay[]> = new EventEmitter();
  @Output()
  select: EventEmitter<CalendarDay> = new EventEmitter();
  @Output()
  selectStart: EventEmitter<CalendarDay> = new EventEmitter();
  @Output()
  selectEnd: EventEmitter<CalendarDay> = new EventEmitter();

  _date: Array<CalendarDay | null> = [null, null];
  _isInit = false;
  _onChanged: Function;
  _onTouched: Function;

  readonly DAY_DATE_FORMAT = 'MMMM dd, yyyy';

  get _isRange(): boolean {
    return this.pickMode === pickModes.RANGE;
  }

  constructor(public ref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this._isInit = true;
  }

  get value() {
    return this._date;
  }

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this._date = obj;
    }
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  trackByTime(index: number, item: CalendarOriginal): number {
    return item ? item.time : index;
  }

  isEndSelection(day: CalendarDay): boolean {
    if (!day) return false;
    if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[1] === null) {
      return false;
    }

    return this._date[1].time === day.time;
  }

  getDayLabel(day: CalendarDay) {
    return new Date(day.time);
  }

  isBetween(day: CalendarDay): boolean {
    if (!day) return false;

    if (this.pickMode !== pickModes.RANGE || !this._isInit) {
      return false;
    }

    if (this._date[0] === null || this._date[1] === null) {
      return false;
    }

    const start = this._date[0].time;
    const end = this._date[1].time;

    return day.time < end && day.time > start;
  }

  isStartSelection(day: CalendarDay): boolean {
    if (!day) return false;
    if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[0] === null) {
      return false;
    }

    return this._date[0].time === day.time && this._date[1] !== null;
  }

  isSelected(time: number): boolean {
    if (Array.isArray(this._date)) {
      if (this.pickMode !== pickModes.MULTI) {
        if (this._date[0] !== null) {
          return time === this._date[0].time;
        }

        if (this._date[1] !== null) {
          return time === this._date[1].time;
        }
      } else {
        return this._date.findIndex(e => e !== null && e.time === time) !== -1;
      }
    } else {
      return false;
    }
  }

  onSelected(item: CalendarDay): void {
    if (this.readonly) return;
    item.selected = true;
    this.select.emit(item);
    if (this.pickMode === pickModes.SINGLE) {
      this._date[0] = item;
      this.change.emit(this._date);
      return;
    }

    if (this.pickMode === pickModes.RANGE) {
      if (this._date[0] === null) {
        this._date[0] = item;
        this.selectStart.emit(item);
      } else if (this._date[1] === null) {
        if (this._date[0].time < item.time) {
          this._date[1] = item;
          this.selectEnd.emit(item);
        } else {
          this._date[1] = this._date[0];
          this.selectEnd.emit(this._date[0]);
          this._date[0] = item;
          this.selectStart.emit(item);
        }
      } else if (this._date[0].time > item.time) {
        this._date[0] = item;
        this.selectStart.emit(item);
      } else if (this._date[1].time < item.time) {
        this._date[1] = item;
        this.selectEnd.emit(item);
      } else {
        this._date[0] = item;
        this.selectStart.emit(item);
        this._date[1] = null;
      }

      this.change.emit(this._date);
      return;
    }

    if (this.pickMode === pickModes.MULTI) {
      const index = this._date.findIndex(e => e !== null && e.time === item.time);

      if (index === -1) {
        this._date.push(item);
      } else {
        this._date.splice(index, 1);
      }
      this.change.emit(this._date.filter(e => e !== null));
    }
  }
}
