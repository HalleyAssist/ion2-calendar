import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { defaults, pickModes } from '../config';
import { isIonIconsV4 } from '../utils/icons';
export const ION_CAL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent),
    multi: true,
};
export class CalendarComponent {
    constructor(calSvc) {
        this.calSvc = calSvc;
        this._view = 'days';
        this._calendarMonthValue = [null, null];
        this._showToggleButtons = true;
        this._showMonthPicker = true;
        this.format = defaults.DATE_FORMAT;
        this.type = 'string';
        this.readonly = false;
        this.change = new EventEmitter();
        this.monthChange = new EventEmitter();
        this.select = new EventEmitter();
        this.selectStart = new EventEmitter();
        this.selectEnd = new EventEmitter();
        this.MONTH_DATE_FORMAT = 'MMMM yyyy';
        this._onChanged = () => { };
        this._onTouched = () => { };
        if (isIonIconsV4()) {
            this._compatibleIcons = {
                caretDown: 'md-arrow-dropdown',
                caretUp: 'md-arrow-dropup',
                chevronBack: 'ios-arrow-back',
                chevronForward: 'ios-arrow-forward',
            };
        }
        else {
            this._compatibleIcons = {
                caretDown: 'caret-down-outline',
                caretUp: 'caret-up-outline',
                chevronBack: 'chevron-back-outline',
                chevronForward: 'chevron-forward-outline',
            };
        }
    }
    get showToggleButtons() {
        return this._showToggleButtons;
    }
    set showToggleButtons(value) {
        this._showToggleButtons = value;
    }
    get showMonthPicker() {
        return this._showMonthPicker;
    }
    set showMonthPicker(value) {
        this._showMonthPicker = value;
    }
    set options(value) {
        this._options = value;
        this.initOpt();
        if (this.monthOpt && this.monthOpt.original) {
            this.monthOpt = this.createMonth(this.monthOpt.original.time);
        }
    }
    get options() {
        return this._options;
    }
    ngOnInit() {
        this.initOpt();
        this.monthOpt = this.createMonth(new Date().getTime());
    }
    getViewDate() {
        return this._handleType(this.monthOpt.original.time);
    }
    getDate(date) {
        return new Date(date);
    }
    setViewDate(value) {
        this.monthOpt = this.createMonth(this._payloadToTimeNumber(value));
    }
    switchView() {
        this._view = this._view === 'days' ? 'month' : 'days';
    }
    prev() {
        if (this._view === 'days') {
            this.backMonth();
        }
        else {
            this.prevYear();
        }
    }
    next() {
        if (this._view === 'days') {
            this.nextMonth();
        }
        else {
            this.nextYear();
        }
    }
    prevYear() {
        if (moment(this.monthOpt.original.time).year() === 1970) {
            return;
        }
        const backTime = moment(this.monthOpt.original.time)
            .subtract(1, 'year')
            .valueOf();
        this.monthOpt = this.createMonth(backTime);
    }
    nextYear() {
        const nextTime = moment(this.monthOpt.original.time)
            .add(1, 'year')
            .valueOf();
        this.monthOpt = this.createMonth(nextTime);
    }
    nextMonth() {
        const nextTime = moment(this.monthOpt.original.time)
            .add(1, 'months')
            .valueOf();
        this.monthChange.emit({
            oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
            newMonth: this.calSvc.multiFormat(nextTime),
        });
        this.monthOpt = this.createMonth(nextTime);
    }
    canNext() {
        if (!this._d.to || this._view !== 'days') {
            return true;
        }
        return this.monthOpt.original.time < moment(this._d.to).valueOf();
    }
    backMonth() {
        const backTime = moment(this.monthOpt.original.time)
            .subtract(1, 'months')
            .valueOf();
        this.monthChange.emit({
            oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
            newMonth: this.calSvc.multiFormat(backTime),
        });
        this.monthOpt = this.createMonth(backTime);
    }
    canBack() {
        if (!this._d.from || this._view !== 'days') {
            return true;
        }
        return this.monthOpt.original.time > moment(this._d.from).valueOf();
    }
    monthOnSelect(month) {
        this._view = 'days';
        const newMonth = moment(this.monthOpt.original.time)
            .month(month)
            .valueOf();
        this.monthChange.emit({
            oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
            newMonth: this.calSvc.multiFormat(newMonth),
        });
        this.monthOpt = this.createMonth(newMonth);
    }
    onChanged($event) {
        switch (this._d.pickMode) {
            case pickModes.SINGLE:
                const date = this._handleType($event[0].time);
                this._onChanged(date);
                this.change.emit(date);
                break;
            case pickModes.RANGE:
                if ($event[0] && $event[1]) {
                    const rangeDate = {
                        from: this._handleType($event[0].time),
                        to: this._handleType($event[1].time),
                    };
                    this._onChanged(rangeDate);
                    this.change.emit(rangeDate);
                }
                break;
            case pickModes.MULTI:
                const dates = [];
                for (let i = 0; i < $event.length; i++) {
                    if ($event[i] && $event[i].time) {
                        dates.push(this._handleType($event[i].time));
                    }
                }
                this._onChanged(dates);
                this.change.emit(dates);
                break;
            default:
        }
    }
    swipeEvent($event) {
        const isNext = $event.deltaX < 0;
        if (isNext && this.canNext()) {
            this.nextMonth();
        }
        else if (!isNext && this.canBack()) {
            this.backMonth();
        }
    }
    _payloadToTimeNumber(value) {
        let date;
        if (this.type === 'string') {
            date = moment(value, this.format);
        }
        else {
            date = moment(value);
        }
        return date.valueOf();
    }
    _monthFormat(date) {
        return moment(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
    }
    initOpt() {
        if (this._options && typeof this._options.showToggleButtons === 'boolean') {
            this.showToggleButtons = this._options.showToggleButtons;
        }
        if (this._options && typeof this._options.showMonthPicker === 'boolean') {
            this.showMonthPicker = this._options.showMonthPicker;
            if (this._view !== 'days' && !this.showMonthPicker) {
                this._view = 'days';
            }
        }
        this._d = this.calSvc.safeOpt(this._options || {});
    }
    createMonth(date) {
        return this.calSvc.createMonthsByPeriod(date, 1, this._d)[0];
    }
    _createCalendarDay(value) {
        return this.calSvc.createCalendarDay(this._payloadToTimeNumber(value), this._d);
    }
    _handleType(value) {
        const date = moment(value);
        switch (this.type) {
            case 'string':
                return date.format(this.format);
            case 'js-date':
                return date.toDate();
            case 'moment':
                return date;
            case 'time':
                return date.valueOf();
            case 'object':
                return date.toObject();
            default:
                return date;
        }
    }
    writeValue(obj) {
        this._writeValue(obj);
        if (obj) {
            if (this._calendarMonthValue[0]) {
                this.monthOpt = this.createMonth(this._calendarMonthValue[0].time);
            }
            else {
                this.monthOpt = this.createMonth(new Date().getTime());
            }
        }
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    _writeValue(value) {
        if (!value) {
            this._calendarMonthValue = [null, null];
            return;
        }
        switch (this._d.pickMode) {
            case 'single':
                this._calendarMonthValue[0] = this._createCalendarDay(value);
                break;
            case 'range':
                if (value.from) {
                    this._calendarMonthValue[0] = value.from ? this._createCalendarDay(value.from) : null;
                }
                if (value.to) {
                    this._calendarMonthValue[1] = value.to ? this._createCalendarDay(value.to) : null;
                }
                break;
            case 'multi':
                if (Array.isArray(value)) {
                    this._calendarMonthValue = value.map(e => {
                        return this._createCalendarDay(e);
                    });
                }
                else {
                    this._calendarMonthValue = [null, null];
                }
                break;
            default:
        }
    }
}
CalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ion-calendar',
                providers: [ION_CAL_VALUE_ACCESSOR],
                template: `
    <div class="title">
      <ng-template [ngIf]="_showMonthPicker" [ngIfElse]="title">
        <ion-button type="button"
                    fill="clear"
                    class="switch-btn"
                    (click)="switchView()">
          {{ _monthFormat(monthOpt.original.time) }}
          <ion-icon class="arrow-dropdown"
                    [name]="_view === 'days' ? _compatibleIcons.caretDown : _compatibleIcons.caretUp"></ion-icon>
        </ion-button>
      </ng-template>
      <ng-template #title>
        <div class="switch-btn">
          {{ _monthFormat(monthOpt.original.time) }}
        </div>
      </ng-template>
      <ng-template [ngIf]="_showToggleButtons">
        <ion-button type="button" fill="clear" class="back" [disabled]="!canBack()" (click)="prev()">
          <ion-icon slot="icon-only" size="small" [name]="_compatibleIcons.chevronBack"></ion-icon>
        </ion-button>
        <ion-button type="button" fill="clear" class="forward" [disabled]="!canNext()" (click)="next()">
          <ion-icon slot="icon-only" size="small" [name]="_compatibleIcons.chevronForward"></ion-icon>
        </ion-button>
      </ng-template>
    </div>
    <ng-template [ngIf]="_view === 'days'" [ngIfElse]="monthPicker">
      <ion-calendar-week color="transparent"
                         [weekArray]="_d.weekdays"
                         [weekStart]="_d.weekStart">
      </ion-calendar-week>

      <ion-calendar-month [componentMode]="true"
                          [(ngModel)]="_calendarMonthValue"
                          [month]="monthOpt"
                          [readonly]="readonly"
                          (change)="onChanged($event)"
                          (swipe)="swipeEvent($event)"
                          (select)="select.emit($event)"
                          (selectStart)="selectStart.emit($event)"
                          (selectEnd)="selectEnd.emit($event)"
                          [pickMode]="_d.pickMode"
                          [color]="_d.color">
      </ion-calendar-month>
    </ng-template>

    <ng-template #monthPicker>
      <ion-calendar-month-picker [color]="_d.color"
                                 [monthFormat]="_options?.monthPickerFormat"
                                 (select)="monthOnSelect($event)"
                                 [month]="monthOpt">
      </ion-calendar-month-picker>
    </ng-template>
  `,
                styles: [":host{background-color:#fff;box-sizing:border-box;display:inline-block;padding:10px 20px;width:100%}:host .title{overflow:hidden;padding:0 40px}:host .title .back,:host .title .forward,:host .title .switch-btn{--padding-end:0;--padding-start:0;display:block;float:left;font-size:15px;margin:0;min-height:32px;padding:0;position:relative}:host .title .back,:host .title .forward{color:#757575}:host .title .back{left:-40px;margin-left:-100%;width:40px}:host .title .forward{margin-left:-40px;right:-40px;width:40px}:host .title .switch-btn{--margin-bottom:0;--margin-end:auto;--margin-start:auto;--margin-top:0;color:#757575;line-height:32px;text-align:center;width:100%}:host .title .switch-btn .arrow-dropdown{margin-left:5px}"]
            },] }
];
CalendarComponent.ctorParameters = () => [
    { type: CalendarService }
];
CalendarComponent.propDecorators = {
    format: [{ type: Input }],
    type: [{ type: Input }],
    readonly: [{ type: Input }],
    change: [{ type: Output }],
    monthChange: [{ type: Output }],
    select: [{ type: Output }],
    selectStart: [{ type: Output }],
    selectEnd: [{ type: Output }],
    options: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBV3JHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDakMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFhO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFvRUYsTUFBTSxPQUFPLGlCQUFpQjtJQTBENUIsWUFBbUIsTUFBdUI7UUFBdkIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUF2RDFDLFVBQUssR0FBcUIsTUFBTSxDQUFDO1FBQ2pDLHdCQUFtQixHQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCx1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFVMUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBWXhCLFdBQU0sR0FBVyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBRXRDLFNBQUksR0FBa0MsUUFBUSxDQUFDO1FBRS9DLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsV0FBTSxHQUFnRCxJQUFJLFlBQVksRUFB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QUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzlELFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7U0FBRTtRQUMxRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDakQsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUM7YUFDckIsT0FBTyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzlELFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJ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QUMsRUFBRSxFQUFFO29CQUNaLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQ25GO2dCQUNELE1BQU07WUFFUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDdkMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDekM7Z0JBQ0QsTUFBTTtZQUVSLFFBQVE7U0FDVDtJQUNILENBQUM7OztZQWhZRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2dCQUVuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURUOzthQUNGOzs7WUE5RVEsZUFBZTs7O3FCQXlHckIsS0FBSzttQkFFTCxLQUFLO3VCQUVMLEtBQUs7cUJBRUwsTUFBTTswQkFFTixNQUFNO3FCQUVOLE1BQU07MEJBRU4sTUFBTTt3QkFFTixNQUFNO3NCQUdOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBDYWxlbmRhck1vbnRoLFxuICBDYWxlbmRhck1vZGFsT3B0aW9ucyxcbiAgQ2FsZW5kYXJDb21wb25lbnRPcHRpb25zLFxuICBDYWxlbmRhckRheSxcbiAgQ2FsZW5kYXJDb21wb25lbnRQYXlsb2FkVHlwZXMsXG4gIENhbGVuZGFyQ29tcG9uZW50TW9udGhDaGFuZ2UsXG4gIENhbGVuZGFyQ29tcG9uZW50VHlwZVByb3BlcnR5LFxufSBmcm9tICcuLi9jYWxlbmRhci5tb2RlbCc7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBkZWZhdWx0cywgcGlja01vZGVzIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7IGlzSW9uSWNvbnNWNCB9IGZyb20gJy4uL3V0aWxzL2ljb25zJztcblxuZXhwb3J0IGNvbnN0IElPTl9DQUxfVkFMVUVfQUNDRVNTT1I6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2FsZW5kYXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmludGVyZmFjZSBDb21wYXRpYmxlSWNvbnMge1xuICBjYXJldERvd246IHN0cmluZztcbiAgY2FyZXRVcDogc3RyaW5nO1xuICBjaGV2cm9uQmFjazogc3RyaW5nO1xuICBjaGV2cm9uRm9yd2FyZDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY2FsZW5kYXInLFxuICBwcm92aWRlcnM6IFtJT05fQ0FMX1ZBTFVFX0FDQ0VTU09SXSxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJfc2hvd01vbnRoUGlja2VyXCIgW25nSWZFbHNlXT1cInRpdGxlXCI+XG4gICAgICAgIDxpb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwiY2xlYXJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInN3aXRjaC1idG5cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic3dpdGNoVmlldygpXCI+XG4gICAgICAgICAge3sgX21vbnRoRm9ybWF0KG1vbnRoT3B0Lm9yaWdpbmFsLnRpbWUpIH19XG4gICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwiYXJyb3ctZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJfdmlldyA9PT0gJ2RheXMnID8gX2NvbXBhdGlibGVJY29ucy5jYXJldERvd24gOiBfY29tcGF0aWJsZUljb25zLmNhcmV0VXBcIj48L2lvbi1pY29uPlxuICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPG5nLXRlbXBsYXRlICN0aXRsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1idG5cIj5cbiAgICAgICAgICB7eyBfbW9udGhGb3JtYXQobW9udGhPcHQub3JpZ2luYWwudGltZSkgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIl9zaG93VG9nZ2xlQnV0dG9uc1wiPlxuICAgICAgICA8aW9uLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZmlsbD1cImNsZWFyXCIgY2xhc3M9XCJiYWNrXCIgW2Rpc2FibGVkXT1cIiFjYW5CYWNrKClcIiAoY2xpY2spPVwicHJldigpXCI+XG4gICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJpY29uLW9ubHlcIiBzaXplPVwic21hbGxcIiBbbmFtZV09XCJfY29tcGF0aWJsZUljb25zLmNoZXZyb25CYWNrXCI+PC9pb24taWNvbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgICAgICA8aW9uLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZmlsbD1cImNsZWFyXCIgY2xhc3M9XCJmb3J3YXJkXCIgW2Rpc2FibGVkXT1cIiFjYW5OZXh0KClcIiAoY2xpY2spPVwibmV4dCgpXCI+XG4gICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJpY29uLW9ubHlcIiBzaXplPVwic21hbGxcIiBbbmFtZV09XCJfY29tcGF0aWJsZUljb25zLmNoZXZyb25Gb3J3YXJkXCI+PC9pb24taWNvbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiX3ZpZXcgPT09ICdkYXlzJ1wiIFtuZ0lmRWxzZV09XCJtb250aFBpY2tlclwiPlxuICAgICAgPGlvbi1jYWxlbmRhci13ZWVrIGNvbG9yPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrQXJyYXldPVwiX2Qud2Vla2RheXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrU3RhcnRdPVwiX2Qud2Vla1N0YXJ0XCI+XG4gICAgICA8L2lvbi1jYWxlbmRhci13ZWVrPlxuXG4gICAgICA8aW9uLWNhbGVuZGFyLW1vbnRoIFtjb21wb25lbnRNb2RlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIl9jYWxlbmRhck1vbnRoVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbbW9udGhdPVwibW9udGhPcHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlKT1cInN3aXBlRXZlbnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChzZWxlY3QpPVwic2VsZWN0LmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChzZWxlY3RTdGFydCk9XCJzZWxlY3RTdGFydC5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoc2VsZWN0RW5kKT1cInNlbGVjdEVuZC5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbcGlja01vZGVdPVwiX2QucGlja01vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwiX2QuY29sb3JcIj5cbiAgICAgIDwvaW9uLWNhbGVuZGFyLW1vbnRoPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI21vbnRoUGlja2VyPlxuICAgICAgPGlvbi1jYWxlbmRhci1tb250aC1waWNrZXIgW2NvbG9yXT1cIl9kLmNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttb250aEZvcm1hdF09XCJfb3B0aW9ucz8ubW9udGhQaWNrZXJGb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGVjdCk9XCJtb250aE9uU2VsZWN0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21vbnRoXT1cIm1vbnRoT3B0XCI+XG4gICAgICA8L2lvbi1jYWxlbmRhci1tb250aC1waWNrZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgX2Q6IENhbGVuZGFyTW9kYWxPcHRpb25zO1xuICBfb3B0aW9uczogQ2FsZW5kYXJDb21wb25lbnRPcHRpb25zO1xuICBfdmlldzogJ21vbnRoJyB8ICdkYXlzJyA9ICdkYXlzJztcbiAgX2NhbGVuZGFyTW9udGhWYWx1ZTogQ2FsZW5kYXJEYXlbXSA9IFtudWxsLCBudWxsXTtcbiAgX3Nob3dUb2dnbGVCdXR0b25zID0gdHJ1ZTtcbiAgX2NvbXBhdGlibGVJY29uczogQ29tcGF0aWJsZUljb25zO1xuICBnZXQgc2hvd1RvZ2dsZUJ1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dUb2dnbGVCdXR0b25zO1xuICB9XG5cbiAgc2V0IHNob3dUb2dnbGVCdXR0b25zKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd1RvZ2dsZUJ1dHRvbnMgPSB2YWx1ZTtcbiAgfVxuXG4gIF9zaG93TW9udGhQaWNrZXIgPSB0cnVlO1xuICBnZXQgc2hvd01vbnRoUGlja2VyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zaG93TW9udGhQaWNrZXI7XG4gIH1cblxuICBzZXQgc2hvd01vbnRoUGlja2VyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd01vbnRoUGlja2VyID0gdmFsdWU7XG4gIH1cblxuICBtb250aE9wdDogQ2FsZW5kYXJNb250aDtcblxuICBASW5wdXQoKVxuICBmb3JtYXQ6IHN0cmluZyA9IGRlZmF1bHRzLkRBVEVfRk9STUFUO1xuICBASW5wdXQoKVxuICB0eXBlOiBDYWxlbmRhckNvbXBvbmVudFR5cGVQcm9wZXJ0eSA9ICdzdHJpbmcnO1xuICBASW5wdXQoKVxuICByZWFkb25seSA9IGZhbHNlO1xuICBAT3V0cHV0KClcbiAgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJDb21wb25lbnRQYXlsb2FkVHlwZXM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgbW9udGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDYWxlbmRhckNvbXBvbmVudE1vbnRoQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPENhbGVuZGFyRGF5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdFN0YXJ0OiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgc2VsZWN0RW5kOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHZhbHVlOiBDYWxlbmRhckNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XG4gICAgdGhpcy5pbml0T3B0KCk7XG4gICAgaWYgKHRoaXMubW9udGhPcHQgJiYgdGhpcy5tb250aE9wdC5vcmlnaW5hbCkge1xuICAgICAgdGhpcy5tb250aE9wdCA9IHRoaXMuY3JlYXRlTW9udGgodGhpcy5tb250aE9wdC5vcmlnaW5hbC50aW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3B0aW9ucygpOiBDYWxlbmRhckNvbXBvbmVudE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgcmVhZG9ubHkgTU9OVEhfREFURV9GT1JNQVQgPSAnTU1NTSB5eXl5JztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY2FsU3ZjOiBDYWxlbmRhclNlcnZpY2UpIHtcbiAgICBpZiAoaXNJb25JY29uc1Y0KCkpIHtcbiAgICAgIHRoaXMuX2NvbXBhdGlibGVJY29ucyA9IHtcbiAgICAgICAgY2FyZXREb3duOiAnbWQtYXJyb3ctZHJvcGRvd24nLFxuICAgICAgICBjYXJldFVwOiAnbWQtYXJyb3ctZHJvcHVwJyxcbiAgICAgICAgY2hldnJvbkJhY2s6ICdpb3MtYXJyb3ctYmFjaycsXG4gICAgICAgIGNoZXZyb25Gb3J3YXJkOiAnaW9zLWFycm93LWZvcndhcmQnLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY29tcGF0aWJsZUljb25zID0ge1xuICAgICAgICBjYXJldERvd246ICdjYXJldC1kb3duLW91dGxpbmUnLFxuICAgICAgICBjYXJldFVwOiAnY2FyZXQtdXAtb3V0bGluZScsXG4gICAgICAgIGNoZXZyb25CYWNrOiAnY2hldnJvbi1iYWNrLW91dGxpbmUnLFxuICAgICAgICBjaGV2cm9uRm9yd2FyZDogJ2NoZXZyb24tZm9yd2FyZC1vdXRsaW5lJyxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0T3B0KCk7XG4gICAgdGhpcy5tb250aE9wdCA9IHRoaXMuY3JlYXRlTW9udGgobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICB9XG5cbiAgZ2V0Vmlld0RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZVR5cGUodGhpcy5tb250aE9wdC5vcmlnaW5hbC50aW1lKTtcbiAgfVxuXG4gIGdldERhdGUoZGF0ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpO1xuICB9XG5cbiAgc2V0Vmlld0RhdGUodmFsdWU6IENhbGVuZGFyQ29tcG9uZW50UGF5bG9hZFR5cGVzKSB7XG4gICAgdGhpcy5tb250aE9wdCA9IHRoaXMuY3JlYXRlTW9udGgodGhpcy5fcGF5bG9hZFRvVGltZU51bWJlcih2YWx1ZSkpO1xuICB9XG5cbiAgc3dpdGNoVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3ID0gdGhpcy5fdmlldyA9PT0gJ2RheXMnID8gJ21vbnRoJyA6ICdkYXlzJztcbiAgfVxuXG4gIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXcgPT09ICdkYXlzJykge1xuICAgICAgdGhpcy5iYWNrTW9udGgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmV2WWVhcigpO1xuICAgIH1cbiAgfVxuXG4gIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXcgPT09ICdkYXlzJykge1xuICAgICAgdGhpcy5uZXh0TW9udGgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZXh0WWVhcigpO1xuICAgIH1cbiAgfVxuXG4gIHByZXZZZWFyKCk6IHZvaWQge1xuICAgIGlmIChtb21lbnQodGhpcy5tb250aE9wdC5vcmlnaW5hbC50aW1lKS55ZWFyKCkgPT09IDE5NzApIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgYmFja1RpbWUgPSBtb21lbnQodGhpcy5tb250aE9wdC5vcmlnaW5hbC50aW1lKVxuICAgICAgLnN1YnRyYWN0KDEsICd5ZWFyJylcbiAgICAgIC52YWx1ZU9mKCk7XG4gICAgdGhpcy5tb250aE9wdCA9IHRoaXMuY3JlYXRlTW9udGgoYmFja1RpbWUpO1xuICB9XG5cbiAgbmV4dFllYXIoKTogdm9pZCB7XG4gICAgY29uc3QgbmV4dFRpbWUgPSBtb21lbnQodGhpcy5tb250aE9wdC5vcmlnaW5hbC50aW1lKVxuICAgICAgLmFkZCgxLCAneWVhcicpXG4gICAgICAudmFsdWVPZigpO1xuICAgIHRoaXMubW9udGhPcHQgPSB0aGlzLmNyZWF0ZU1vbnRoKG5leHRUaW1lKTtcbiAgfVxuXG4gIG5leHRNb250aCgpOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0VGltZSA9IG1vbWVudCh0aGlzLm1vbnRoT3B0Lm9yaWdpbmFsLnRpbWUpXG4gICAgICAuYWRkKDEsICdtb250aHMnKVxuICAgICAgLnZhbHVlT2YoKTtcbiAgICB0aGlzLm1vbnRoQ2hhbmdlLmVtaXQoe1xuICAgICAgb2xkTW9udGg6IHRoaXMuY2FsU3ZjLm11bHRpRm9ybWF0KHRoaXMubW9udGhPcHQub3JpZ2luYWwudGltZSksXG4gICAgICBuZXdNb250aDogdGhpcy5jYWxTdmMubXVsdGlGb3JtYXQobmV4dFRpbWUpLFxuICAgIH0pO1xuICAgIHRoaXMubW9udGhPcHQgPSB0aGlzLmNyZWF0ZU1vbnRoKG5leHRUaW1lKTtcbiAgfVxuXG4gIGNhbk5leHQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9kLnRvIHx8IHRoaXMuX3ZpZXcgIT09ICdkYXlzJykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIHJldHVybiB0aGlzLm1vbnRoT3B0Lm9yaWdpbmFsLnRpbWUgPCBtb21lbnQodGhpcy5fZC50bykudmFsdWVPZigpO1xuICB9XG5cbiAgYmFja01vbnRoKCk6IHZvaWQge1xuICAgIGNvbnN0IGJhY2tUaW1lID0gbW9tZW50KHRoaXMubW9udGhPcHQub3JpZ2luYWwudGltZSlcbiAgICAgIC5zdWJ0cmFjdCgxLCAnbW9udGhzJylcbiAgICAgIC52YWx1ZU9mKCk7XG4gICAgdGhpcy5tb250aENoYW5nZS5lbWl0KHtcbiAgICAgIG9sZE1vbnRoOiB0aGlzLmNhbFN2Yy5tdWx0aUZvcm1hdCh0aGlzLm1vbnRoT3B0Lm9yaWdpbmFsLnRpbWUpLFxuICAgICAgbmV3TW9udGg6IHRoaXMuY2FsU3ZjLm11bHRpRm9ybWF0KGJhY2tUaW1lKSxcbiAgICB9KTtcbiAgICB0aGlzLm1vbnRoT3B0ID0gdGhpcy5jcmVhdGVNb250aChiYWNrVGltZSk7XG4gIH1cblxuICBjYW5CYWNrKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5fZC5mcm9tIHx8IHRoaXMuX3ZpZXcgIT09ICdkYXlzJykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIHJldHVybiB0aGlzLm1vbnRoT3B0Lm9yaWdpbmFsLnRpbWUgPiBtb21lbnQodGhpcy5fZC5mcm9tKS52YWx1ZU9mKCk7XG4gIH1cblxuICBtb250aE9uU2VsZWN0KG1vbnRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3ID0gJ2RheXMnO1xuICAgIGNvbnN0IG5ld01vbnRoID0gbW9tZW50KHRoaXMubW9udGhPcHQub3JpZ2luYWwudGltZSlcbiAgICAgIC5tb250aChtb250aClcbiAgICAgIC52YWx1ZU9mKCk7XG4gICAgdGhpcy5tb250aENoYW5nZS5lbWl0KHtcbiAgICAgIG9sZE1vbnRoOiB0aGlzLmNhbFN2Yy5tdWx0aUZvcm1hdCh0aGlzLm1vbnRoT3B0Lm9yaWdpbmFsLnRpbWUpLFxuICAgICAgbmV3TW9udGg6IHRoaXMuY2FsU3ZjLm11bHRpRm9ybWF0KG5ld01vbnRoKSxcbiAgICB9KTtcbiAgICB0aGlzLm1vbnRoT3B0ID0gdGhpcy5jcmVhdGVNb250aChuZXdNb250aCk7XG4gIH1cblxuICBvbkNoYW5nZWQoJGV2ZW50OiBDYWxlbmRhckRheVtdKTogdm9pZCB7XG4gICAgc3dpdGNoICh0aGlzLl9kLnBpY2tNb2RlKSB7XG4gICAgICBjYXNlIHBpY2tNb2Rlcy5TSU5HTEU6XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLl9oYW5kbGVUeXBlKCRldmVudFswXS50aW1lKTtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VkKGRhdGUpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBwaWNrTW9kZXMuUkFOR0U6XG4gICAgICAgIGlmICgkZXZlbnRbMF0gJiYgJGV2ZW50WzFdKSB7XG4gICAgICAgICAgY29uc3QgcmFuZ2VEYXRlID0ge1xuICAgICAgICAgICAgZnJvbTogdGhpcy5faGFuZGxlVHlwZSgkZXZlbnRbMF0udGltZSksXG4gICAgICAgICAgICB0bzogdGhpcy5faGFuZGxlVHlwZSgkZXZlbnRbMV0udGltZSksXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLl9vbkNoYW5nZWQocmFuZ2VEYXRlKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHJhbmdlRGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgcGlja01vZGVzLk1VTFRJOlxuICAgICAgICBjb25zdCBkYXRlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCRldmVudFtpXSAmJiAkZXZlbnRbaV0udGltZSkge1xuICAgICAgICAgICAgZGF0ZXMucHVzaCh0aGlzLl9oYW5kbGVUeXBlKCRldmVudFtpXS50aW1lKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25DaGFuZ2VkKGRhdGVzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChkYXRlcyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfVxuXG4gIHN3aXBlRXZlbnQoJGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBpc05leHQgPSAkZXZlbnQuZGVsdGFYIDwgMDtcbiAgICBpZiAoaXNOZXh0ICYmIHRoaXMuY2FuTmV4dCgpKSB7XG4gICAgICB0aGlzLm5leHRNb250aCgpO1xuICAgIH0gZWxzZSBpZiAoIWlzTmV4dCAmJiB0aGlzLmNhbkJhY2soKSkge1xuICAgICAgdGhpcy5iYWNrTW9udGgoKTtcbiAgICB9XG4gIH1cblxuICBfb25DaGFuZ2VkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICBfb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICBfcGF5bG9hZFRvVGltZU51bWJlcih2YWx1ZTogQ2FsZW5kYXJDb21wb25lbnRQYXlsb2FkVHlwZXMpOiBudW1iZXIge1xuICAgIGxldCBkYXRlO1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkYXRlID0gbW9tZW50KHZhbHVlLCB0aGlzLmZvcm1hdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGUgPSBtb21lbnQodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZS52YWx1ZU9mKCk7XG4gIH1cblxuICBfbW9udGhGb3JtYXQoZGF0ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCh0aGlzLl9kLm1vbnRoRm9ybWF0LnJlcGxhY2UoL3kvZywgJ1knKSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRPcHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wdGlvbnMgJiYgdHlwZW9mIHRoaXMuX29wdGlvbnMuc2hvd1RvZ2dsZUJ1dHRvbnMgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5zaG93VG9nZ2xlQnV0dG9ucyA9IHRoaXMuX29wdGlvbnMuc2hvd1RvZ2dsZUJ1dHRvbnM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcHRpb25zICYmIHR5cGVvZiB0aGlzLl9vcHRpb25zLnNob3dNb250aFBpY2tlciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLnNob3dNb250aFBpY2tlciA9IHRoaXMuX29wdGlvbnMuc2hvd01vbnRoUGlja2VyO1xuICAgICAgaWYgKHRoaXMuX3ZpZXcgIT09ICdkYXlzJyAmJiAhdGhpcy5zaG93TW9udGhQaWNrZXIpIHtcbiAgICAgICAgdGhpcy5fdmlldyA9ICdkYXlzJztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZCA9IHRoaXMuY2FsU3ZjLnNhZmVPcHQodGhpcy5fb3B0aW9ucyB8fCB7fSk7XG4gIH1cblxuICBjcmVhdGVNb250aChkYXRlOiBudW1iZXIpOiBDYWxlbmRhck1vbnRoIHtcbiAgICByZXR1cm4gdGhpcy5jYWxTdmMuY3JlYXRlTW9udGhzQnlQZXJpb2QoZGF0ZSwgMSwgdGhpcy5fZClbMF07XG4gIH1cblxuICBfY3JlYXRlQ2FsZW5kYXJEYXkodmFsdWU6IENhbGVuZGFyQ29tcG9uZW50UGF5bG9hZFR5cGVzKTogQ2FsZW5kYXJEYXkge1xuICAgIHJldHVybiB0aGlzLmNhbFN2Yy5jcmVhdGVDYWxlbmRhckRheSh0aGlzLl9wYXlsb2FkVG9UaW1lTnVtYmVyKHZhbHVlKSwgdGhpcy5fZCk7XG4gIH1cblxuICBfaGFuZGxlVHlwZSh2YWx1ZTogbnVtYmVyKTogQ2FsZW5kYXJDb21wb25lbnRQYXlsb2FkVHlwZXMge1xuICAgIGNvbnN0IGRhdGUgPSBtb21lbnQodmFsdWUpO1xuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgICAgY2FzZSAnanMtZGF0ZSc6XG4gICAgICAgIHJldHVybiBkYXRlLnRvRGF0ZSgpO1xuICAgICAgY2FzZSAnbW9tZW50JzpcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuIGRhdGUudmFsdWVPZigpO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuIGRhdGUudG9PYmplY3QoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl93cml0ZVZhbHVlKG9iaik7XG4gICAgaWYgKG9iaikge1xuICAgICAgaWYgKHRoaXMuX2NhbGVuZGFyTW9udGhWYWx1ZVswXSkge1xuICAgICAgICB0aGlzLm1vbnRoT3B0ID0gdGhpcy5jcmVhdGVNb250aCh0aGlzLl9jYWxlbmRhck1vbnRoVmFsdWVbMF0udGltZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vbnRoT3B0ID0gdGhpcy5jcmVhdGVNb250aChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZWQgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgX3dyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2NhbGVuZGFyTW9udGhWYWx1ZSA9IFtudWxsLCBudWxsXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMuX2QucGlja01vZGUpIHtcbiAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgIHRoaXMuX2NhbGVuZGFyTW9udGhWYWx1ZVswXSA9IHRoaXMuX2NyZWF0ZUNhbGVuZGFyRGF5KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgaWYgKHZhbHVlLmZyb20pIHtcbiAgICAgICAgICB0aGlzLl9jYWxlbmRhck1vbnRoVmFsdWVbMF0gPSB2YWx1ZS5mcm9tID8gdGhpcy5fY3JlYXRlQ2FsZW5kYXJEYXkodmFsdWUuZnJvbSkgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS50bykge1xuICAgICAgICAgIHRoaXMuX2NhbGVuZGFyTW9udGhWYWx1ZVsxXSA9IHZhbHVlLnRvID8gdGhpcy5fY3JlYXRlQ2FsZW5kYXJEYXkodmFsdWUudG8pIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbXVsdGknOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLl9jYWxlbmRhck1vbnRoVmFsdWUgPSB2YWx1ZS5tYXAoZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlQ2FsZW5kYXJEYXkoZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2FsZW5kYXJNb250aFZhbHVlID0gW251bGwsIG51bGxdO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfVxufVxuIl19