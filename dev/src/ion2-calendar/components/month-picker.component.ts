import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarMonth } from '../calendar.model';
import { defaults } from '../config';

@Component({
  selector: 'ion-calendar-month-picker',
  styles: [`
  $colors: (
  primary: var(--ion-color-primary),
  secondary: var(--ion-color-secondary),
  danger: var(--ion-color-danger),
  light: var(--ion-color-light),
  dark: var(--ion-color-dark),
);

@function bindColors($color-value) {
  @return map-get($colors, $color-value);
}

@mixin month-picker($background-color: primary, $color: #fff) {
  .month-packer-item {
    &.this-month button {
      border: 1px solid bindColors($background-color);
    }
    &.active {
      button {
        background-color: bindColors($background-color);
        color: $color;
      }
    }
  }
}

:host {
  .month-picker {
    margin: 20px 0;
    display: inline-block;
    width: 100%;
  }

  .month-packer-item {
    width: 25%;
    box-sizing: border-box;
    float: left;
    height: 50px;
    padding: 5px;
    button {
      border-radius: 32px;
      width: 100%;
      height: 100%;
      font-size: 0.9em;
      background-color: transparent;
    }
  }

  .month-picker.primary {
    @include month-picker(primary);
  }

  .month-picker.secondary {
    @include month-picker(secondary);
  }

  .month-picker.danger {
    @include month-picker(danger);
  }

  .month-picker.dark {
    @include month-picker(dark);
  }

  .month-picker.light {
    @include month-picker(light, #9e9e9e);
  }

  .month-picker.transparent {
    @include month-picker(light, #9e9e9e);
    background-color: transparent;
  }

  .month-picker.cal-color {
    @include month-picker(cal-color);
  }
}
`],
  template: `
    <div [class]="'month-picker ' + color">
      <div class="month-packer-item"
           [class.this-month]=" i === _thisMonth.getMonth() && month.original.year === _thisMonth.getFullYear()"
           *ngFor="let item of _monthFormat; let i = index">
        <button type="button" (click)="_onSelect(i)" [attr.aria-label]="getDate(i) | date:MONTH_FORMAT">{{ item }}</button>
      </div>
    </div>
  `,
})
export class MonthPickerComponent {
  @Input()
  month: CalendarMonth;
  @Input()
  color = defaults.COLOR;
  @Output()
  select: EventEmitter<number> = new EventEmitter();
  _thisMonth = new Date();
  _monthFormat = defaults.MONTH_FORMAT;

  MONTH_FORMAT = 'MMMM';

  @Input()
  set monthFormat(value: string[]) {
    if (Array.isArray(value) && value.length === 12) {
      this._monthFormat = value;
    }
  }

  get monthFormat(): string[] {
    return this._monthFormat;
  }

  constructor() { }

  _onSelect(month: number): void {
    this.select.emit(month);
  }

  getDate(month: number) {
    return new Date(this._thisMonth.getFullYear(), month, 1);
  }
}
