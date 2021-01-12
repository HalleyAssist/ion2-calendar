import { InjectionToken, Injectable, Optional, Inject, Component, Renderer2, ElementRef, ChangeDetectorRef, ViewChild, HostBinding, Input, forwardRef, EventEmitter, Output, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavParams, ModalController, IonContent, IonicModule } from '@ionic/angular';
import * as moment from 'moment';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class CalendarMonth {
}
class CalendarResult {
}
class CalendarComponentMonthChange {
}

const defaults = {
    DATE_FORMAT: 'YYYY-MM-DD',
    COLOR: 'primary',
    WEEKS_FORMAT: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    MONTH_FORMAT: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
};
const pickModes = {
    SINGLE: 'single',
    RANGE: 'range',
    MULTI: 'multi'
};

const DEFAULT_CALENDAR_OPTIONS = new InjectionToken('DEFAULT_CALENDAR_MODAL_OPTIONS');

const isBoolean = (input) => input === true || input === false;
const ɵ0 = isBoolean;
class CalendarService {
    constructor(defaultOpts) {
        this.defaultOpts = defaultOpts;
    }
    get DEFAULT_STEP() {
        return 12;
    }
    safeOpt(calendarOptions = {}) {
        const _disableWeeks = [];
        const _daysConfig = [];
        const { from = new Date(), to = 0, weekStart = 0, step = this.DEFAULT_STEP, id = '', cssClass = '', closeLabel = 'CANCEL', doneLabel = 'DONE', monthFormat = 'MMM YYYY', title = 'CALENDAR', defaultTitle = '', defaultSubtitle = '', autoDone = false, canBackwardsSelected = false, closeIcon = false, doneIcon = false, clearIcon = false, showYearPicker = false, isSaveHistory = false, pickMode = pickModes.SINGLE, color = defaults.COLOR, weekdays = defaults.WEEKS_FORMAT, daysConfig = _daysConfig, disableWeeks = _disableWeeks, showAdjacentMonthDay = true, defaultEndDateToStartDate = false, clearLabel = null, } = Object.assign(Object.assign({}, this.defaultOpts), calendarOptions);
        return {
            id,
            from,
            to,
            pickMode,
            autoDone,
            color,
            cssClass,
            weekStart,
            closeLabel,
            closeIcon,
            doneLabel,
            doneIcon,
            canBackwardsSelected,
            isSaveHistory,
            disableWeeks,
            monthFormat,
            title,
            weekdays,
            daysConfig,
            step,
            showYearPicker,
            defaultTitle,
            defaultSubtitle,
            defaultScrollTo: calendarOptions.defaultScrollTo || from,
            defaultDate: calendarOptions.defaultDate || null,
            defaultDates: calendarOptions.defaultDates || null,
            defaultDateRange: calendarOptions.defaultDateRange || null,
            showAdjacentMonthDay,
            defaultEndDateToStartDate,
            clearLabel,
            clearIcon,
        };
    }
    createOriginalCalendar(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstWeek = new Date(year, month, 1).getDay();
        const howManyDays = moment(time).daysInMonth();
        return {
            year,
            month,
            firstWeek,
            howManyDays,
            time: new Date(year, month, 1).getTime(),
            date: new Date(time),
        };
    }
    findDayConfig(day, opt) {
        if (opt.daysConfig.length <= 0)
            return null;
        return opt.daysConfig.find(n => day.isSame(n.date, 'day'));
    }
    createCalendarDay(time, opt, month) {
        const _time = moment(time);
        const date = moment(time);
        const isToday = moment().isSame(_time, 'days');
        const dayConfig = this.findDayConfig(_time, opt);
        const _rangeBeg = moment(opt.from).valueOf();
        const _rangeEnd = moment(opt.to).valueOf();
        let isBetween = true;
        const disableWee = opt.disableWeeks.indexOf(_time.toDate().getDay()) !== -1;
        if (_rangeBeg > 0 && _rangeEnd > 0) {
            if (!opt.canBackwardsSelected) {
                isBetween = !_time.isBetween(_rangeBeg, _rangeEnd, 'days', '[]');
            }
            else {
                isBetween = moment(_time).isBefore(_rangeBeg) ? false : isBetween;
            }
        }
        else if (_rangeBeg > 0 && _rangeEnd === 0) {
            if (!opt.canBackwardsSelected) {
                const _addTime = _time.add(1, 'day');
                isBetween = !_addTime.isAfter(_rangeBeg);
            }
            else {
                isBetween = false;
            }
        }
        let _disable = false;
        if (dayConfig && isBoolean(dayConfig.disable)) {
            _disable = dayConfig.disable;
        }
        else {
            _disable = disableWee || isBetween;
        }
        let title = new Date(time).getDate().toString();
        if (dayConfig && dayConfig.title) {
            title = dayConfig.title;
        }
        else if (opt.defaultTitle) {
            title = opt.defaultTitle;
        }
        let subTitle = '';
        if (dayConfig && dayConfig.subTitle) {
            subTitle = dayConfig.subTitle;
        }
        else if (opt.defaultSubtitle) {
            subTitle = opt.defaultSubtitle;
        }
        return {
            time,
            isToday,
            title,
            subTitle,
            selected: false,
            isLastMonth: date.month() < month,
            isNextMonth: date.month() > month,
            marked: dayConfig ? dayConfig.marked || false : false,
            cssClass: dayConfig ? dayConfig.cssClass || '' : '',
            disable: _disable,
            isFirst: date.date() === 1,
            isLast: date.date() === date.daysInMonth(),
        };
    }
    createCalendarMonth(original, opt) {
        const days = new Array(6).fill(null);
        const len = original.howManyDays;
        for (let i = original.firstWeek; i < len + original.firstWeek; i++) {
            const itemTime = new Date(original.year, original.month, i - original.firstWeek + 1).getTime();
            days[i] = this.createCalendarDay(itemTime, opt);
        }
        const weekStart = opt.weekStart;
        if (weekStart === 1) {
            if (days[0] === null) {
                days.shift();
            }
            else {
                days.unshift(...new Array(6).fill(null));
            }
        }
        if (opt.showAdjacentMonthDay) {
            const _booleanMap = days.map(e => !!e);
            const thisMonth = moment(original.time).month();
            let startOffsetIndex = _booleanMap.indexOf(true) - 1;
            let endOffsetIndex = _booleanMap.lastIndexOf(true) + 1;
            for (startOffsetIndex; startOffsetIndex >= 0; startOffsetIndex--) {
                const dayBefore = moment(days[startOffsetIndex + 1].time)
                    .clone()
                    .subtract(1, 'd');
                days[startOffsetIndex] = this.createCalendarDay(dayBefore.valueOf(), opt, thisMonth);
            }
            if (!(_booleanMap.length % 7 === 0 && _booleanMap[_booleanMap.length - 1])) {
                for (endOffsetIndex; endOffsetIndex < days.length + (endOffsetIndex % 7); endOffsetIndex++) {
                    const dayAfter = moment(days[endOffsetIndex - 1].time)
                        .clone()
                        .add(1, 'd');
                    days[endOffsetIndex] = this.createCalendarDay(dayAfter.valueOf(), opt, thisMonth);
                }
            }
        }
        return {
            days,
            original: original,
        };
    }
    createMonthsByPeriod(startTime, monthsNum, opt) {
        const _array = [];
        const _start = new Date(startTime);
        const _startMonth = new Date(_start.getFullYear(), _start.getMonth(), 1).getTime();
        for (let i = 0; i < monthsNum; i++) {
            const time = moment(_startMonth)
                .add(i, 'M')
                .valueOf();
            const originalCalendar = this.createOriginalCalendar(time);
            _array.push(this.createCalendarMonth(originalCalendar, opt));
        }
        return _array;
    }
    wrapResult(original, pickMode) {
        let result;
        switch (pickMode) {
            case pickModes.SINGLE:
                result = this.multiFormat(original[0].time);
                break;
            case pickModes.RANGE:
                result = {
                    from: this.multiFormat(original[0].time),
                    to: this.multiFormat((original[1] || original[0]).time),
                };
                break;
            case pickModes.MULTI:
                result = original.map(e => this.multiFormat(e.time));
                break;
            default:
                result = original;
        }
        return result;
    }
    multiFormat(time) {
        const _moment = moment(time);
        return {
            time: _moment.valueOf(),
            unix: _moment.unix(),
            dateObj: _moment.toDate(),
            string: _moment.format(defaults.DATE_FORMAT),
            years: _moment.year(),
            months: _moment.month() + 1,
            date: _moment.date(),
        };
    }
}
CalendarService.decorators = [
    { type: Injectable }
];
CalendarService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEFAULT_CALENDAR_OPTIONS,] }] }
];

const NUM_OF_MONTHS_TO_CREATE = 3;
class CalendarModal {
    constructor(_renderer, _elementRef, params, modalCtrl, ref, calSvc) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.ref = ref;
        this.calSvc = calSvc;
        this.ionPage = true;
        this.datesTemp = [null, null];
        this._scrollLock = true;
    }
    ngOnInit() {
        this.init();
        this.initDefaultDate();
    }
    ngAfterViewInit() {
        this.findCssClass();
        if (this._d.canBackwardsSelected)
            this.backwardsMonth();
        this.scrollToDefaultDate();
    }
    init() {
        this._d = this.calSvc.safeOpt(this.options);
        this._d.showAdjacentMonthDay = false;
        this.step = this._d.step;
        if (this.step < this.calSvc.DEFAULT_STEP) {
            this.step = this.calSvc.DEFAULT_STEP;
        }
        this.calendarMonths = this.calSvc.createMonthsByPeriod(moment(this._d.from).valueOf(), this.findInitMonthNumber(this._d.defaultScrollTo) + this.step, this._d);
    }
    initDefaultDate() {
        const { pickMode, defaultDate, defaultDateRange, defaultDates } = this._d;
        switch (pickMode) {
            case pickModes.SINGLE:
                if (defaultDate) {
                    this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDate), this._d);
                }
                break;
            case pickModes.RANGE:
                if (defaultDateRange) {
                    if (defaultDateRange.from) {
                        this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.from), this._d);
                    }
                    if (defaultDateRange.to) {
                        this.datesTemp[1] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.to), this._d);
                    }
                }
                break;
            case pickModes.MULTI:
                if (defaultDates && defaultDates.length) {
                    this.datesTemp = defaultDates.map(e => this.calSvc.createCalendarDay(this._getDayTime(e), this._d));
                }
                break;
            default:
                this.datesTemp = [null, null];
        }
    }
    findCssClass() {
        const { cssClass } = this._d;
        if (cssClass) {
            cssClass.split(' ').forEach((_class) => {
                if (_class.trim() !== '')
                    this._renderer.addClass(this._elementRef.nativeElement, _class);
            });
        }
    }
    onChange(data) {
        const { pickMode, autoDone } = this._d;
        this.datesTemp = data;
        this.ref.detectChanges();
        if (pickMode !== pickModes.MULTI && autoDone && this.canDone()) {
            this.done();
        }
        this.repaintDOM();
    }
    onCancel() {
        this.modalCtrl.dismiss(null, 'cancel');
    }
    done() {
        const { pickMode } = this._d;
        this.modalCtrl.dismiss(this.calSvc.wrapResult(this.datesTemp, pickMode), 'done');
    }
    canDone() {
        if (!Array.isArray(this.datesTemp)) {
            return false;
        }
        const { pickMode, defaultEndDateToStartDate } = this._d;
        switch (pickMode) {
            case pickModes.SINGLE:
                return !!(this.datesTemp[0] && this.datesTemp[0].time);
            case pickModes.RANGE:
                if (defaultEndDateToStartDate) {
                    return !!(this.datesTemp[0] && this.datesTemp[0].time);
                }
                return !!(this.datesTemp[0] && this.datesTemp[1]) && !!(this.datesTemp[0].time && this.datesTemp[1].time);
            case pickModes.MULTI:
                return this.datesTemp.length > 0 && this.datesTemp.every(e => !!e && !!e.time);
            default:
                return false;
        }
    }
    clear() {
        this.datesTemp = [null, null];
    }
    canClear() {
        return !!this.datesTemp[0];
    }
    nextMonth(event) {
        const len = this.calendarMonths.length;
        const final = this.calendarMonths[len - 1];
        const nextTime = moment(final.original.time)
            .add(1, 'M')
            .valueOf();
        const rangeEnd = this._d.to ? moment(this._d.to).subtract(1, 'M') : 0;
        if (len <= 0 || (rangeEnd !== 0 && moment(final.original.time).isAfter(rangeEnd))) {
            event.target.disabled = true;
            return;
        }
        this.calendarMonths.push(...this.calSvc.createMonthsByPeriod(nextTime, NUM_OF_MONTHS_TO_CREATE, this._d));
        event.target.complete();
        this.repaintDOM();
    }
    backwardsMonth() {
        const first = this.calendarMonths[0];
        if (first.original.time <= 0) {
            this._d.canBackwardsSelected = false;
            return;
        }
        const firstTime = (this.actualFirstTime = moment(first.original.time)
            .subtract(NUM_OF_MONTHS_TO_CREATE, 'M')
            .valueOf());
        this.calendarMonths.unshift(...this.calSvc.createMonthsByPeriod(firstTime, NUM_OF_MONTHS_TO_CREATE, this._d));
        this.ref.detectChanges();
        this.repaintDOM();
    }
    scrollToDate(date) {
        const defaultDateIndex = this.findInitMonthNumber(date);
        const monthElement = this.monthsEle.nativeElement.children[`month-${defaultDateIndex}`];
        const domElemReadyWaitTime = 300;
        setTimeout(() => {
            const defaultDateMonth = monthElement ? monthElement.offsetTop : 0;
            if (defaultDateIndex !== -1 && defaultDateMonth !== 0) {
                this.content.scrollByPoint(0, defaultDateMonth, 128);
            }
        }, domElemReadyWaitTime);
    }
    scrollToDefaultDate() {
        this.scrollToDate(this._d.defaultScrollTo);
    }
    onScroll($event) {
        if (!this._d.canBackwardsSelected)
            return;
        const { detail } = $event;
        if (detail.scrollTop <= 200 && detail.velocityY < 0 && this._scrollLock) {
            this.content.getScrollElement().then(() => {
                this._scrollLock = !1;
                // const heightBeforeMonthPrepend = scrollElem.scrollHeight;
                this.backwardsMonth();
                setTimeout(() => {
                    //  const heightAfterMonthPrepend = scrollElem.scrollHeight;
                    // this.content.scrollByPoint(0, heightAfterMonthPrepend - heightBeforeMonthPrepend, 0).then(() => {
                    this._scrollLock = !0;
                    // });
                }, 180);
            });
        }
    }
    /**
     * In some older Safari versions (observed at Mac's Safari 10.0), there is an issue where style updates to
     * shadowRoot descendants don't cause a browser repaint.
     * See for more details: https://github.com/Polymer/polymer/issues/4701
     */
    repaintDOM() {
        return this.content.getScrollElement().then(scrollElem => {
            // Update scrollElem to ensure that height of the container changes as Months are appended/prepended
            scrollElem.style.zIndex = '2';
            scrollElem.style.zIndex = 'initial';
            // Update monthsEle to ensure selected state is reflected when tapping on a day
            this.monthsEle.nativeElement.style.zIndex = '2';
            this.monthsEle.nativeElement.style.zIndex = 'initial';
        });
    }
    findInitMonthNumber(date) {
        let startDate = this.actualFirstTime ? moment(this.actualFirstTime) : moment(this._d.from);
        const defaultScrollTo = moment(date);
        const isAfter = defaultScrollTo.isAfter(startDate);
        if (!isAfter)
            return -1;
        if (this.showYearPicker) {
            startDate = moment(new Date(this.year, 0, 1));
        }
        return defaultScrollTo.diff(startDate, 'month');
    }
    _getDayTime(date) {
        return moment(moment(date).format('YYYY-MM-DD')).valueOf();
    }
    _monthFormat(date) {
        return moment(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
    }
    trackByIndex(index, momentDate) {
        return momentDate.original ? momentDate.original.time : index;
    }
}
CalendarModal.decorators = [
    { type: Component, args: [{
                selector: 'ion-calendar-modal',
                template: `
    <ion-header>
      <ion-toolbar [color]="_d.color">
          <ion-buttons slot="start">
            <ion-button type='button' slot="icon-only" fill="clear" (click)="onCancel()">
              <span *ngIf="_d.closeLabel !== '' && !_d.closeIcon">{{ _d.closeLabel }}</span>
              <ion-icon *ngIf="_d.closeIcon" name="close"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title>{{ _d.title }}</ion-title>

          <ion-buttons slot="end">
            <ion-button type='button' slot="icon-only" fill="clear" *ngIf="!!_d.clearLabel || !!_d.clearIcon"
              [disabled]="!canClear()" (click)="clear()">
              <span *ngIf="_d.clearLabel !== '' && !_d.clearIcon">{{ _d.clearLabel }}</span>
              <ion-icon *ngIf="_d.clearIcon" name="refresh"></ion-icon>
            </ion-button>
            <ion-button type='button' slot="icon-only" *ngIf="!_d.autoDone" fill="clear" [disabled]="!canDone()" (click)="done()">
              <span *ngIf="_d.doneLabel !== '' && !_d.doneIcon">{{ _d.doneLabel }}</span>
              <ion-icon *ngIf="_d.doneIcon" name="checkmark"></ion-icon>
            </ion-button>
          </ion-buttons>
      </ion-toolbar>

      <ng-content select="[sub-header]"></ng-content>

      <ion-calendar-week
        [color]="_d.color"
        [weekArray]="_d.weekdays"
        [weekStart]="_d.weekStart">
      </ion-calendar-week>

    </ion-header>

    <ion-content (ionScroll)="onScroll($event)" class="calendar-page" [scrollEvents]="true"
                 [ngClass]="{'multi-selection': _d.pickMode === 'multi'}">

      <div #months>
        <ng-template ngFor let-month [ngForOf]="calendarMonths" [ngForTrackBy]="trackByIndex" let-i="index">
          <div class="month-box" [attr.id]="'month-' + i">
            <h4 class="text-center month-title">{{ _monthFormat(month.original.date) }}</h4>
            <ion-calendar-month [month]="month"
                                [pickMode]="_d.pickMode"
                                [isSaveHistory]="_d.isSaveHistory"
                                [id]="_d.id"
                                [color]="_d.color"
                                (change)="onChange($event)"
                                [(ngModel)]="datesTemp">
            </ion-calendar-month>
          </div>
        </ng-template>

      </div>

      <ion-infinite-scroll threshold="25%" (ionInfinite)="nextMonth($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>
  `,
                styles: [":host ion-select{max-width:unset}:host ion-select .select-icon>.select-icon-inner,:host ion-select .select-text{color:#fff!important}:host ion-select.select-ios{max-width:unset}:host .calendar-page{background-color:#fbfbfb}:host .month-box{border-bottom:1px solid #f1f1f1;display:inline-block;padding-bottom:1em;width:100%}:host h4{color:#929292;display:block;font-size:1.1rem;font-weight:400;margin:1rem 0 0;text-align:center}"]
            },] }
];
CalendarModal.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NavParams },
    { type: ModalController },
    { type: ChangeDetectorRef },
    { type: CalendarService }
];
CalendarModal.propDecorators = {
    content: [{ type: ViewChild, args: [IonContent,] }],
    monthsEle: [{ type: ViewChild, args: ['months',] }],
    ionPage: [{ type: HostBinding, args: ['class.ion-page',] }],
    options: [{ type: Input }]
};

class CalendarWeekComponent {
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
}
CalendarWeekComponent.decorators = [
    { type: Component, args: [{
                selector: 'ion-calendar-week',
                template: `
    <ion-toolbar [class]="'week-toolbar ' + color" no-border-top>
      <ul [class]="'week-title ' + color">
        <li *ngFor="let w of _displayWeekArray">{{ w }}</li>
      </ul>
    </ion-toolbar>
  `,
                styles: [":host .toolbar-background-ios,:host .toolbar-background-md{background:transparent}:host .week-toolbar{--padding-bottom:0;--padding-end:0;--padding-start:0;--padding-top:0}:host .week-toolbar.primary{--background:var(--ion-color-primary)}:host .week-toolbar.secondary{--background:var(--ion-color-secondary)}:host .week-toolbar.danger{--background:var(--ion-color-danger)}:host .week-toolbar.dark{--background:var(--ion-color-dark)}:host .week-toolbar.light{--background:var(--ion-color-light)}:host .week-toolbar.transparent{--background:transparent}:host .week-toolbar.toolbar-md{min-height:44px}:host .week-title{color:#fff;font-size:.9em;height:44px;margin:0;padding:15px 0;width:100%}:host .week-title.light,:host .week-title.transparent{color:#9e9e9e}:host .week-title li{display:block;float:left;list-style-type:none;text-align:center;width:14%}:host .week-title li:nth-of-type(7n),:host .week-title li:nth-of-type(7n+1){width:15%}"]
            },] }
];
CalendarWeekComponent.ctorParameters = () => [];
CalendarWeekComponent.propDecorators = {
    color: [{ type: Input }],
    weekArray: [{ type: Input }],
    weekStart: [{ type: Input }]
};

const MONTH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthComponent),
    multi: true,
};
class MonthComponent {
    constructor(ref) {
        this.ref = ref;
        this.componentMode = false;
        this.readonly = false;
        this.color = defaults.COLOR;
        this.change = new EventEmitter();
        this.select = new EventEmitter();
        this.selectStart = new EventEmitter();
        this.selectEnd = new EventEmitter();
        this._date = [null, null];
        this._isInit = false;
        this.DAY_DATE_FORMAT = 'MMMM dd, yyyy';
    }
    get _isRange() {
        return this.pickMode === pickModes.RANGE;
    }
    ngAfterViewInit() {
        this._isInit = true;
    }
    get value() {
        return this._date;
    }
    writeValue(obj) {
        if (Array.isArray(obj)) {
            this._date = obj;
        }
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    trackByTime(index, item) {
        return item ? item.time : index;
    }
    isEndSelection(day) {
        if (!day)
            return false;
        if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[1] === null) {
            return false;
        }
        return this._date[1].time === day.time;
    }
    getDayLabel(day) {
        return new Date(day.time);
    }
    isBetween(day) {
        if (!day)
            return false;
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
    isStartSelection(day) {
        if (!day)
            return false;
        if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[0] === null) {
            return false;
        }
        return this._date[0].time === day.time && this._date[1] !== null;
    }
    isSelected(time) {
        if (Array.isArray(this._date)) {
            if (this.pickMode !== pickModes.MULTI) {
                if (this._date[0] !== null) {
                    return time === this._date[0].time;
                }
                if (this._date[1] !== null) {
                    return time === this._date[1].time;
                }
            }
            else {
                return this._date.findIndex(e => e !== null && e.time === time) !== -1;
            }
        }
        else {
            return false;
        }
    }
    onSelected(item) {
        if (this.readonly)
            return;
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
            }
            else if (this._date[1] === null) {
                if (this._date[0].time < item.time) {
                    this._date[1] = item;
                    this.selectEnd.emit(item);
                }
                else {
                    this._date[1] = this._date[0];
                    this.selectEnd.emit(this._date[0]);
                    this._date[0] = item;
                    this.selectStart.emit(item);
                }
            }
            else if (this._date[0].time > item.time) {
                this._date[0] = item;
                this.selectStart.emit(item);
            }
            else if (this._date[1].time < item.time) {
                this._date[1] = item;
                this.selectEnd.emit(item);
            }
            else {
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
            }
            else {
                this._date.splice(index, 1);
            }
            this.change.emit(this._date.filter(e => e !== null));
        }
    }
}
MonthComponent.decorators = [
    { type: Component, args: [{
                selector: 'ion-calendar-month',
                providers: [MONTH_VALUE_ACCESSOR],
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
                        [disabled]="day.disable">
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
                styles: [":host{display:inline-block;width:100%}:host .days-box{padding:.5rem}:host .days:nth-of-type(7n),:host .days:nth-of-type(7n+1){width:15%}:host .days{float:left;height:36px;margin-bottom:5px;text-align:center;width:14%}:host .days .marked p{font-weight:500}:host .days .on-selected{border:none}:host .days .on-selected p{font-size:1.3em}:host .primary .days .marked p,:host .primary .days .today p,:host .primary button.days-btn small{color:var(--ion-color-primary)}:host .primary .days .today p{font-weight:700}:host .primary .days .last-month-day p,:host .primary .days .next-month-day p{color:rgba(0,0,0,.25)}:host .primary .days .marked.on-selected p,:host .primary .days .today.on-selected p{color:#fff}:host .primary .days .on-selected,:host .primary .endSelection button.days-btn,:host .primary .startSelection button.days-btn{background-color:var(--ion-color-primary);color:#fff}:host .primary .startSelection{position:relative}:host .primary .startSelection:after,:host .primary .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .primary .startSelection:before{background-color:var(--ion-color-primary)}:host .primary .startSelection:after{background-color:#fff;opacity:.25}:host .primary .endSelection{position:relative}:host .primary .endSelection:after,:host .primary .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .primary .endSelection:before{background-color:var(--ion-color-primary)}:host .primary .endSelection:after{background-color:#fff;opacity:.25}:host .primary .startSelection.endSelection:after{background-color:transparent}:host .primary .startSelection button.days-btn{border-radius:50%}:host .primary .between button.days-btn{background-color:var(--ion-color-primary);border-radius:0;position:relative;width:100%}:host .primary .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .primary .between button.days-btn p{color:#fff}:host .primary .endSelection button.days-btn{border-radius:50%}:host .primary .days .on-selected p,:host .primary .endSelection button.days-btn p{color:#fff}:host .primary .between button.days-btn,:host .primary .endSelection button.days-btn,:host .primary .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .primary .startSelection.endSelection:before{--ion-color-primary:transparent}:host .secondary .days .marked p,:host .secondary .days .today p,:host .secondary button.days-btn small{color:var(--ion-color-secondary)}:host .secondary .days .today p{font-weight:700}:host .secondary .days .last-month-day p,:host .secondary .days .next-month-day p{color:rgba(0,0,0,.25)}:host .secondary .days .marked.on-selected p,:host .secondary .days .today.on-selected p{color:#fff}:host .secondary .days .on-selected,:host .secondary .endSelection button.days-btn,:host .secondary .startSelection button.days-btn{background-color:var(--ion-color-secondary);color:#fff}:host .secondary .startSelection{position:relative}:host .secondary .startSelection:after,:host .secondary .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .secondary .startSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .startSelection:after{background-color:#fff;opacity:.25}:host .secondary .endSelection{position:relative}:host .secondary .endSelection:after,:host .secondary .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .secondary .endSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .endSelection:after{background-color:#fff;opacity:.25}:host .secondary .startSelection.endSelection:after{background-color:transparent}:host .secondary .startSelection button.days-btn{border-radius:50%}:host .secondary .between button.days-btn{background-color:var(--ion-color-secondary);border-radius:0;position:relative;width:100%}:host .secondary .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .secondary .between button.days-btn p{color:#fff}:host .secondary .endSelection button.days-btn{border-radius:50%}:host .secondary .days .on-selected p,:host .secondary .endSelection button.days-btn p{color:#fff}:host .secondary .between button.days-btn,:host .secondary .endSelection button.days-btn,:host .secondary .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .secondary .startSelection.endSelection:before{--ion-color-primary:transparent}:host .danger .days .marked p,:host .danger .days .today p,:host .danger button.days-btn small{color:var(--ion-color-danger)}:host .danger .days .today p{font-weight:700}:host .danger .days .last-month-day p,:host .danger .days .next-month-day p{color:rgba(0,0,0,.25)}:host .danger .days .marked.on-selected p,:host .danger .days .today.on-selected p{color:#fff}:host .danger .days .on-selected,:host .danger .endSelection button.days-btn,:host .danger .startSelection button.days-btn{background-color:var(--ion-color-danger);color:#fff}:host .danger .startSelection{position:relative}:host .danger .startSelection:after,:host .danger .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .danger .startSelection:before{background-color:var(--ion-color-danger)}:host .danger .startSelection:after{background-color:#fff;opacity:.25}:host .danger .endSelection{position:relative}:host .danger .endSelection:after,:host .danger .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .danger .endSelection:before{background-color:var(--ion-color-danger)}:host .danger .endSelection:after{background-color:#fff;opacity:.25}:host .danger .startSelection.endSelection:after{background-color:transparent}:host .danger .startSelection button.days-btn{border-radius:50%}:host .danger .between button.days-btn{background-color:var(--ion-color-danger);border-radius:0;position:relative;width:100%}:host .danger .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .danger .between button.days-btn p{color:#fff}:host .danger .endSelection button.days-btn{border-radius:50%}:host .danger .days .on-selected p,:host .danger .endSelection button.days-btn p{color:#fff}:host .danger .between button.days-btn,:host .danger .endSelection button.days-btn,:host .danger .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .danger .startSelection.endSelection:before{--ion-color-primary:transparent}:host .dark .days .marked p,:host .dark .days .today p,:host .dark button.days-btn small{color:var(--ion-color-dark)}:host .dark .days .today p{font-weight:700}:host .dark .days .last-month-day p,:host .dark .days .next-month-day p{color:rgba(0,0,0,.25)}:host .dark .days .marked.on-selected p,:host .dark .days .today.on-selected p{color:#fff}:host .dark .days .on-selected,:host .dark .endSelection button.days-btn,:host .dark .startSelection button.days-btn{background-color:var(--ion-color-dark);color:#fff}:host .dark .startSelection{position:relative}:host .dark .startSelection:after,:host .dark .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .dark .startSelection:before{background-color:var(--ion-color-dark)}:host .dark .startSelection:after{background-color:#fff;opacity:.25}:host .dark .endSelection{position:relative}:host .dark .endSelection:after,:host .dark .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .dark .endSelection:before{background-color:var(--ion-color-dark)}:host .dark .endSelection:after{background-color:#fff;opacity:.25}:host .dark .startSelection.endSelection:after{background-color:transparent}:host .dark .startSelection button.days-btn{border-radius:50%}:host .dark .between button.days-btn{background-color:var(--ion-color-dark);border-radius:0;position:relative;width:100%}:host .dark .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .dark .between button.days-btn p{color:#fff}:host .dark .endSelection button.days-btn{border-radius:50%}:host .dark .days .on-selected p,:host .dark .endSelection button.days-btn p{color:#fff}:host .dark .between button.days-btn,:host .dark .endSelection button.days-btn,:host .dark .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .dark .startSelection.endSelection:before{--ion-color-primary:transparent}:host .light .days .marked p,:host .light .days .today p,:host .light button.days-btn small{color:var(--ion-color-light)}:host .light .days .today p{font-weight:700}:host .light .days .last-month-day p,:host .light .days .next-month-day p{color:rgba(0,0,0,.25)}:host .light .days .marked.on-selected p,:host .light .days .today.on-selected p{color:#a0a0a0}:host .light .days .on-selected,:host .light .endSelection button.days-btn,:host .light .startSelection button.days-btn{background-color:var(--ion-color-light);color:#a0a0a0}:host .light .startSelection{position:relative}:host .light .startSelection:after,:host .light .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .light .startSelection:before{background-color:var(--ion-color-light)}:host .light .startSelection:after{background-color:#fff;opacity:.25}:host .light .endSelection{position:relative}:host .light .endSelection:after,:host .light .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .light .endSelection:before{background-color:var(--ion-color-light)}:host .light .endSelection:after{background-color:#fff;opacity:.25}:host .light .startSelection.endSelection:after{background-color:transparent}:host .light .startSelection button.days-btn{border-radius:50%}:host .light .between button.days-btn{background-color:var(--ion-color-light);border-radius:0;position:relative;width:100%}:host .light .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .light .between button.days-btn p{color:#a0a0a0}:host .light .endSelection button.days-btn{border-radius:50%}:host .light .days .on-selected p,:host .light .endSelection button.days-btn p{color:#a0a0a0}:host .light .between button.days-btn,:host .light .endSelection button.days-btn,:host .light .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .light .startSelection.endSelection:before{--ion-color-primary:transparent}:host .light .days .today p{color:#565656}:host button.days-btn{background-color:transparent;border-radius:36px;display:block;height:36px;margin:0 auto;outline:0;padding:0;position:relative;width:36px;z-index:2}:host button.days-btn p{color:#333;font-size:1.2em;margin:0;text-align:center}:host button.days-btn[disabled] p{color:rgba(0,0,0,.25)}:host button.days-btn.on-selected small{bottom:-14px;transition:bottom .3s}:host button.days-btn small{bottom:-5px;display:block;font-weight:200;left:0;overflow:hidden;position:absolute;right:0;text-align:center;z-index:1}:host .days.between:nth-child(7n) button.days-btn,:host .days.between button.days-btn.is-last,:host .days.startSelection:nth-child(7n):before{border-radius:0 36px 36px 0}:host .days.between:nth-child(7n) button.days-btn.on-selected,:host .days.between button.days-btn.is-last.on-selected,:host .days.startSelection:nth-child(7n):before.on-selected{border-radius:50%}:host .days.between.is-first-wrap button.days-btn.is-first,:host .days.between:nth-child(7n+1) button.days-btn,:host .days.endSelection:nth-child(7n+1):before,:host button.days-btn.is-first{border-radius:36px 0 0 36px}:host .endSelection button.days-btn.is-first,:host .endSelection button.days-btn.is-last,:host .startSelection button.days-btn.is-first,:host .startSelection button.days-btn.is-last,:host button.days-btn.is-first.on-selected,:host button.days-btn.is-last.on-selected{border-radius:50%}:host .startSelection.is-last-wrap:after,:host .startSelection.is-last-wrap:before{border-radius:0 36px 36px 0}:host .endSelection.is-first-wrap:after,:host .endSelection.is-first-wrap:before{border-radius:36px 0 0 36px}:host.component-mode .days.between button.days-btn.is-first,:host.component-mode .days.between button.days-btn.is-last,:host.component-mode .days.endSelection.is-first-wrap:after,:host.component-mode .days.endSelection.is-first-wrap:before,:host.component-mode .days.startSelection.is-last-wrap:after,:host.component-mode .days.startSelection.is-last-wrap:before{border-radius:0}:host .cal-color .days .today p{font-weight:700}:host .cal-color .days .last-month-day p,:host .cal-color .days .next-month-day p{color:rgba(0,0,0,.25)}:host .cal-color .days .marked.on-selected p,:host .cal-color .days .on-selected,:host .cal-color .days .today.on-selected p,:host .cal-color .endSelection button.days-btn,:host .cal-color .startSelection button.days-btn{color:#fff}:host .cal-color .startSelection{position:relative}:host .cal-color .startSelection:after,:host .cal-color .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .cal-color .startSelection:after{background-color:#fff;opacity:.25}:host .cal-color .endSelection{position:relative}:host .cal-color .endSelection:after,:host .cal-color .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .cal-color .endSelection:after{background-color:#fff;opacity:.25}:host .cal-color .startSelection.endSelection:after{background-color:transparent}:host .cal-color .startSelection button.days-btn{border-radius:50%}:host .cal-color .between button.days-btn{border-radius:0;position:relative;width:100%}:host .cal-color .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .cal-color .between button.days-btn p{color:#fff}:host .cal-color .endSelection button.days-btn{border-radius:50%}:host .cal-color .days .on-selected p,:host .cal-color .endSelection button.days-btn p{color:#fff}:host .cal-color .between button.days-btn,:host .cal-color .endSelection button.days-btn,:host .cal-color .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .cal-color .startSelection.endSelection:before{--ion-color-primary:transparent}"]
            },] }
];
MonthComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
MonthComponent.propDecorators = {
    componentMode: [{ type: Input }],
    month: [{ type: Input }],
    pickMode: [{ type: Input }],
    isSaveHistory: [{ type: Input }],
    id: [{ type: Input }],
    readonly: [{ type: Input }],
    color: [{ type: Input }],
    change: [{ type: Output }],
    select: [{ type: Output }],
    selectStart: [{ type: Output }],
    selectEnd: [{ type: Output }]
};

const getIconMap = () => {
    if (typeof window === 'undefined') {
        return new Map();
    }
    else {
        const win = window;
        win.Ionicons = win.Ionicons || {};
        win.Ionicons.map = win.Ionicons.map || new Map();
        return win.Ionicons.map;
    }
};
const ɵ0$1 = getIconMap;
const isIonIconsV4 = () => {
    const iconMap = getIconMap();
    return !!iconMap.get('md-arrow-dropdown');
};

const ION_CAL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent),
    multi: true,
};
class CalendarComponent {
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

class MonthPickerComponent {
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
}
MonthPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ion-calendar-month-picker',
                template: `
    <div [class]="'month-picker ' + color">
      <div class="month-packer-item"
           [class.this-month]=" i === _thisMonth.getMonth() && month.original.year === _thisMonth.getFullYear()"
           *ngFor="let item of _monthFormat; let i = index">
        <button type="button" (click)="_onSelect(i)">{{ item }}</button>
      </div>
    </div>
  `,
                styles: [":host .month-picker{display:inline-block;margin:20px 0;width:100%}:host .month-packer-item{box-sizing:border-box;float:left;height:50px;padding:5px;width:25%}:host .month-packer-item button{background-color:transparent;border-radius:32px;font-size:.9em;height:100%;width:100%}:host .month-picker.primary .month-packer-item.this-month button{border:1px solid var(--ion-color-primary)}:host .month-picker.primary .month-packer-item.active button{background-color:var(--ion-color-primary);color:#fff}:host .month-picker.secondary .month-packer-item.this-month button{border:1px solid var(--ion-color-secondary)}:host .month-picker.secondary .month-packer-item.active button{background-color:var(--ion-color-secondary);color:#fff}:host .month-picker.danger .month-packer-item.this-month button{border:1px solid var(--ion-color-danger)}:host .month-picker.danger .month-packer-item.active button{background-color:var(--ion-color-danger);color:#fff}:host .month-picker.dark .month-packer-item.this-month button{border:1px solid var(--ion-color-dark)}:host .month-picker.dark .month-packer-item.active button{background-color:var(--ion-color-dark);color:#fff}:host .month-picker.light .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.light .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.transparent{background-color:transparent}:host .month-picker.transparent .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.transparent .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.cal-color .month-packer-item.this-month button{border:1px solid}:host .month-picker.cal-color .month-packer-item.active button{color:#fff}"]
            },] }
];
MonthPickerComponent.ctorParameters = () => [];
MonthPickerComponent.propDecorators = {
    month: [{ type: Input }],
    color: [{ type: Input }],
    select: [{ type: Output }],
    monthFormat: [{ type: Input }]
};

const CALENDAR_COMPONENTS = [
    CalendarModal,
    CalendarWeekComponent,
    MonthComponent,
    CalendarComponent,
    MonthPickerComponent
];

class CalendarController {
    constructor(modalCtrl, calSvc) {
        this.modalCtrl = modalCtrl;
        this.calSvc = calSvc;
    }
    /**
     * @deprecated
     * @param {CalendarModalOptions} calendarOptions
     * @param {ModalOptions} modalOptions
     * @returns {any}
     */
    openCalendar(calendarOptions, modalOptions = {}) {
        const options = this.calSvc.safeOpt(calendarOptions);
        return this.modalCtrl
            .create(Object.assign({ component: CalendarModal, componentProps: {
                options,
            } }, modalOptions))
            .then((calendarModal) => {
            calendarModal.present();
            return calendarModal.onDidDismiss().then((event) => {
                return event.data ? Promise.resolve(event.data) : Promise.reject('cancelled');
            });
        });
    }
}
CalendarController.decorators = [
    { type: Injectable }
];
CalendarController.ctorParameters = () => [
    { type: ModalController },
    { type: CalendarService }
];

function calendarController(modalCtrl, calSvc) {
    return new CalendarController(modalCtrl, calSvc);
}
class CalendarModule {
    static forRoot(defaultOptions = {}) {
        return {
            ngModule: CalendarModule,
            providers: [
                { provide: DEFAULT_CALENDAR_OPTIONS, useValue: defaultOptions }
            ]
        };
    }
}
CalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, IonicModule, FormsModule],
                declarations: CALENDAR_COMPONENTS,
                exports: CALENDAR_COMPONENTS,
                entryComponents: CALENDAR_COMPONENTS,
                providers: [
                    CalendarService,
                    {
                        provide: CalendarController,
                        useFactory: calendarController,
                        deps: [ModalController, CalendarService],
                    },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarComponent, CalendarComponentMonthChange, CalendarController, CalendarModal, CalendarModule, CalendarMonth, CalendarResult, CalendarWeekComponent, DEFAULT_CALENDAR_OPTIONS, MonthComponent, MonthPickerComponent, CALENDAR_COMPONENTS as ɵa, calendarController as ɵb, CalendarService as ɵc };
//# sourceMappingURL=ion2-calendar.js.map
