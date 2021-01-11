var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarMonth } from '../calendar.model';
import { defaults } from '../config';
let MonthPickerComponent = class MonthPickerComponent {
    constructor() {
        this.color = defaults.COLOR;
        this.select = new EventEmitter();
        this._thisMonth = new Date();
        this._monthFormat = defaults.MONTH_FORMAT;
        this.MONTH_FORMAT = 'MMMM';
    }
    set monthFormat(value) {
        if (Array.isArray(value) && value.length === 12) {
            this._monthFormat = value;
        }
    }
    get monthFormat() {
        return this._monthFormat;
    }
    _onSelect(month) {
        this.select.emit(month);
    }
    getDate(month) {
        return new Date(this._thisMonth.getFullYear(), month, 1);
    }
};
__decorate([
    Input(),
    __metadata("design:type", CalendarMonth)
], MonthPickerComponent.prototype, "month", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthPickerComponent.prototype, "color", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], MonthPickerComponent.prototype, "select", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], MonthPickerComponent.prototype, "monthFormat", null);
MonthPickerComponent = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [])
], MonthPickerComponent);
export { MonthPickerComponent };
//# sourceMappingURL=month-picker.component.js.map