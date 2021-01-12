import { Component, ViewChild, ElementRef, ChangeDetectorRef, Renderer2, Input, HostBinding, } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import { CalendarService } from '../services/calendar.service';
import * as moment from 'moment';
import { pickModes } from '../config';
const NUM_OF_MONTHS_TO_CREATE = 3;
export class CalendarModal {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kYWwuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jYWxlbmRhci5tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxLQUFLLEVBRUwsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXRDLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBbUVsQyxNQUFNLE9BQU8sYUFBYTtJQXNCeEIsWUFDVSxTQUFvQixFQUNyQixXQUF1QixFQUN2QixNQUFpQixFQUNqQixTQUEwQixFQUMxQixHQUFzQixFQUN0QixNQUF1QjtRQUx0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDMUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFyQmhDLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFLZixjQUFTLEdBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBTTdDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO0lBV2YsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FB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QUM7SUFFRCxZQUFZLENBQUMsSUFBUztRQUNwQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBYSxFQUFFLFVBQXlCO1FBQ25ELE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNoRSxDQUFDOzs7WUFyVUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBRTlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERUOzthQUNGOzs7WUE5RUMsU0FBUztZQUZULFVBQVU7WUFRSCxTQUFTO1lBQUUsZUFBZTtZQVBqQyxpQkFBaUI7WUFTVixlQUFlOzs7c0JBd0VyQixTQUFTLFNBQUMsVUFBVTt3QkFFcEIsU0FBUyxTQUFDLFFBQVE7c0JBR2xCLFdBQVcsU0FBQyxnQkFBZ0I7c0JBRzVCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFJlbmRlcmVyMixcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgSG9zdEJpbmRpbmcsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2UGFyYW1zLCBNb2RhbENvbnRyb2xsZXIsIElvbkNvbnRlbnQgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgeyBDYWxlbmRhckRheSwgQ2FsZW5kYXJNb250aCwgQ2FsZW5kYXJNb2RhbE9wdGlvbnMgfSBmcm9tICcuLi9jYWxlbmRhci5tb2RlbCc7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgcGlja01vZGVzIH0gZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgTlVNX09GX01PTlRIU19UT19DUkVBVEUgPSAzO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY2FsZW5kYXItbW9kYWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5tb2RhbC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlvbi1oZWFkZXI+XG4gICAgICA8aW9uLXRvb2xiYXIgW2NvbG9yXT1cIl9kLmNvbG9yXCI+XG4gICAgICAgICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxuICAgICAgICAgICAgPGlvbi1idXR0b24gdHlwZT0nYnV0dG9uJyBzbG90PVwiaWNvbi1vbmx5XCIgZmlsbD1cImNsZWFyXCIgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJfZC5jbG9zZUxhYmVsICE9PSAnJyAmJiAhX2QuY2xvc2VJY29uXCI+e3sgX2QuY2xvc2VMYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiX2QuY2xvc2VJY29uXCIgbmFtZT1cImNsb3NlXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgICA8L2lvbi1idXR0b25zPlxuXG4gICAgICAgICAgPGlvbi10aXRsZT57eyBfZC50aXRsZSB9fTwvaW9uLXRpdGxlPlxuXG4gICAgICAgICAgPGlvbi1idXR0b25zIHNsb3Q9XCJlbmRcIj5cbiAgICAgICAgICAgIDxpb24tYnV0dG9uIHR5cGU9J2J1dHRvbicgc2xvdD1cImljb24tb25seVwiIGZpbGw9XCJjbGVhclwiICpuZ0lmPVwiISFfZC5jbGVhckxhYmVsIHx8ICEhX2QuY2xlYXJJY29uXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFjYW5DbGVhcigpXCIgKGNsaWNrKT1cImNsZWFyKClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJfZC5jbGVhckxhYmVsICE9PSAnJyAmJiAhX2QuY2xlYXJJY29uXCI+e3sgX2QuY2xlYXJMYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiX2QuY2xlYXJJY29uXCIgbmFtZT1cInJlZnJlc2hcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgICAgICAgICAgPGlvbi1idXR0b24gdHlwZT0nYnV0dG9uJyBzbG90PVwiaWNvbi1vbmx5XCIgKm5nSWY9XCIhX2QuYXV0b0RvbmVcIiBmaWxsPVwiY2xlYXJcIiBbZGlzYWJsZWRdPVwiIWNhbkRvbmUoKVwiIChjbGljayk9XCJkb25lKClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJfZC5kb25lTGFiZWwgIT09ICcnICYmICFfZC5kb25lSWNvblwiPnt7IF9kLmRvbmVMYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiX2QuZG9uZUljb25cIiBuYW1lPVwiY2hlY2ttYXJrXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgICA8L2lvbi1idXR0b25zPlxuICAgICAgPC9pb24tdG9vbGJhcj5cblxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3N1Yi1oZWFkZXJdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICA8aW9uLWNhbGVuZGFyLXdlZWtcbiAgICAgICAgW2NvbG9yXT1cIl9kLmNvbG9yXCJcbiAgICAgICAgW3dlZWtBcnJheV09XCJfZC53ZWVrZGF5c1wiXG4gICAgICAgIFt3ZWVrU3RhcnRdPVwiX2Qud2Vla1N0YXJ0XCI+XG4gICAgICA8L2lvbi1jYWxlbmRhci13ZWVrPlxuXG4gICAgPC9pb24taGVhZGVyPlxuXG4gICAgPGlvbi1jb250ZW50IChpb25TY3JvbGwpPVwib25TY3JvbGwoJGV2ZW50KVwiIGNsYXNzPVwiY2FsZW5kYXItcGFnZVwiIFtzY3JvbGxFdmVudHNdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnbXVsdGktc2VsZWN0aW9uJzogX2QucGlja01vZGUgPT09ICdtdWx0aSd9XCI+XG5cbiAgICAgIDxkaXYgI21vbnRocz5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1tb250aCBbbmdGb3JPZl09XCJjYWxlbmRhck1vbnRoc1wiIFtuZ0ZvclRyYWNrQnldPVwidHJhY2tCeUluZGV4XCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb250aC1ib3hcIiBbYXR0ci5pZF09XCInbW9udGgtJyArIGlcIj5cbiAgICAgICAgICAgIDxoNCBjbGFzcz1cInRleHQtY2VudGVyIG1vbnRoLXRpdGxlXCI+e3sgX21vbnRoRm9ybWF0KG1vbnRoLm9yaWdpbmFsLmRhdGUpIH19PC9oND5cbiAgICAgICAgICAgIDxpb24tY2FsZW5kYXItbW9udGggW21vbnRoXT1cIm1vbnRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BpY2tNb2RlXT1cIl9kLnBpY2tNb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU2F2ZUhpc3RvcnldPVwiX2QuaXNTYXZlSGlzdG9yeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJfZC5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJfZC5jb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZGF0ZXNUZW1wXCI+XG4gICAgICAgICAgICA8L2lvbi1jYWxlbmRhci1tb250aD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxpb24taW5maW5pdGUtc2Nyb2xsIHRocmVzaG9sZD1cIjI1JVwiIChpb25JbmZpbml0ZSk9XCJuZXh0TW9udGgoJGV2ZW50KVwiPlxuICAgICAgICA8aW9uLWluZmluaXRlLXNjcm9sbC1jb250ZW50PjwvaW9uLWluZmluaXRlLXNjcm9sbC1jb250ZW50PlxuICAgICAgPC9pb24taW5maW5pdGUtc2Nyb2xsPlxuXG4gICAgPC9pb24tY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoSW9uQ29udGVudClcbiAgY29udGVudDogSW9uQ29udGVudDtcbiAgQFZpZXdDaGlsZCgnbW9udGhzJylcbiAgbW9udGhzRWxlOiBFbGVtZW50UmVmO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaW9uLXBhZ2UnKVxuICBpb25QYWdlID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBvcHRpb25zOiBDYWxlbmRhck1vZGFsT3B0aW9ucztcblxuICBkYXRlc1RlbXA6IEFycmF5PENhbGVuZGFyRGF5PiA9IFtudWxsLCBudWxsXTtcbiAgY2FsZW5kYXJNb250aHM6IEFycmF5PENhbGVuZGFyTW9udGg+O1xuICBzdGVwOiBudW1iZXI7XG4gIHNob3dZZWFyUGlja2VyOiBib29sZWFuO1xuICB5ZWFyOiBudW1iZXI7XG4gIHllYXJzOiBBcnJheTxudW1iZXI+O1xuICBfc2Nyb2xsTG9jayA9IHRydWU7XG4gIF9kOiBDYWxlbmRhck1vZGFsT3B0aW9ucztcbiAgYWN0dWFsRmlyc3RUaW1lOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHBhcmFtczogTmF2UGFyYW1zLFxuICAgIHB1YmxpYyBtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlcixcbiAgICBwdWJsaWMgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgY2FsU3ZjOiBDYWxlbmRhclNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXREZWZhdWx0RGF0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZmluZENzc0NsYXNzKCk7XG4gICAgaWYgKHRoaXMuX2QuY2FuQmFja3dhcmRzU2VsZWN0ZWQpIHRoaXMuYmFja3dhcmRzTW9udGgoKTtcbiAgICB0aGlzLnNjcm9sbFRvRGVmYXVsdERhdGUoKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZCA9IHRoaXMuY2FsU3ZjLnNhZmVPcHQodGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLl9kLnNob3dBZGphY2VudE1vbnRoRGF5ID0gZmFsc2U7XG4gICAgdGhpcy5zdGVwID0gdGhpcy5fZC5zdGVwO1xuICAgIGlmICh0aGlzLnN0ZXAgPCB0aGlzLmNhbFN2Yy5ERUZBVUxUX1NURVApIHtcbiAgICAgIHRoaXMuc3RlcCA9IHRoaXMuY2FsU3ZjLkRFRkFVTFRfU1RFUDtcbiAgICB9XG5cbiAgICB0aGlzLmNhbGVuZGFyTW9udGhzID0gdGhpcy5jYWxTdmMuY3JlYXRlTW9udGhzQnlQZXJpb2QoXG4gICAgICBtb21lbnQodGhpcy5fZC5mcm9tKS52YWx1ZU9mKCksXG4gICAgICB0aGlzLmZpbmRJbml0TW9udGhOdW1iZXIodGhpcy5fZC5kZWZhdWx0U2Nyb2xsVG8pICsgdGhpcy5zdGVwLFxuICAgICAgdGhpcy5fZFxuICAgICk7XG4gIH1cblxuICBpbml0RGVmYXVsdERhdGUoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwaWNrTW9kZSwgZGVmYXVsdERhdGUsIGRlZmF1bHREYXRlUmFuZ2UsIGRlZmF1bHREYXRlcyB9ID0gdGhpcy5fZDtcbiAgICBzd2l0Y2ggKHBpY2tNb2RlKSB7XG4gICAgICBjYXNlIHBpY2tNb2Rlcy5TSU5HTEU6XG4gICAgICAgIGlmIChkZWZhdWx0RGF0ZSkge1xuICAgICAgICAgIHRoaXMuZGF0ZXNUZW1wWzBdID0gdGhpcy5jYWxTdmMuY3JlYXRlQ2FsZW5kYXJEYXkodGhpcy5fZ2V0RGF5VGltZShkZWZhdWx0RGF0ZSksIHRoaXMuX2QpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBwaWNrTW9kZXMuUkFOR0U6XG4gICAgICAgIGlmIChkZWZhdWx0RGF0ZVJhbmdlKSB7XG4gICAgICAgICAgaWYgKGRlZmF1bHREYXRlUmFuZ2UuZnJvbSkge1xuICAgICAgICAgICAgdGhpcy5kYXRlc1RlbXBbMF0gPSB0aGlzLmNhbFN2Yy5jcmVhdGVDYWxlbmRhckRheSh0aGlzLl9nZXREYXlUaW1lKGRlZmF1bHREYXRlUmFuZ2UuZnJvbSksIHRoaXMuX2QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGVmYXVsdERhdGVSYW5nZS50bykge1xuICAgICAgICAgICAgdGhpcy5kYXRlc1RlbXBbMV0gPSB0aGlzLmNhbFN2Yy5jcmVhdGVDYWxlbmRhckRheSh0aGlzLl9nZXREYXlUaW1lKGRlZmF1bHREYXRlUmFuZ2UudG8pLCB0aGlzLl9kKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHBpY2tNb2Rlcy5NVUxUSTpcbiAgICAgICAgaWYgKGRlZmF1bHREYXRlcyAmJiBkZWZhdWx0RGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5kYXRlc1RlbXAgPSBkZWZhdWx0RGF0ZXMubWFwKGUgPT4gdGhpcy5jYWxTdmMuY3JlYXRlQ2FsZW5kYXJEYXkodGhpcy5fZ2V0RGF5VGltZShlKSwgdGhpcy5fZCkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5kYXRlc1RlbXAgPSBbbnVsbCwgbnVsbF07XG4gICAgfVxuICB9XG5cbiAgZmluZENzc0NsYXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY3NzQ2xhc3MgfSA9IHRoaXMuX2Q7XG4gICAgaWYgKGNzc0NsYXNzKSB7XG4gICAgICBjc3NDbGFzcy5zcGxpdCgnICcpLmZvckVhY2goKF9jbGFzczogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChfY2xhc3MudHJpbSgpICE9PSAnJykgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBfY2xhc3MpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2UoZGF0YTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgeyBwaWNrTW9kZSwgYXV0b0RvbmUgfSA9IHRoaXMuX2Q7XG5cbiAgICB0aGlzLmRhdGVzVGVtcCA9IGRhdGE7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgaWYgKHBpY2tNb2RlICE9PSBwaWNrTW9kZXMuTVVMVEkgJiYgYXV0b0RvbmUgJiYgdGhpcy5jYW5Eb25lKCkpIHtcbiAgICAgIHRoaXMuZG9uZSgpO1xuICAgIH1cblxuICAgIHRoaXMucmVwYWludERPTSgpO1xuICB9XG5cbiAgb25DYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5tb2RhbEN0cmwuZGlzbWlzcyhudWxsLCAnY2FuY2VsJyk7XG4gIH1cblxuICBkb25lKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGlja01vZGUgfSA9IHRoaXMuX2Q7XG5cbiAgICB0aGlzLm1vZGFsQ3RybC5kaXNtaXNzKHRoaXMuY2FsU3ZjLndyYXBSZXN1bHQodGhpcy5kYXRlc1RlbXAsIHBpY2tNb2RlKSwgJ2RvbmUnKTtcbiAgfVxuXG4gIGNhbkRvbmUoKTogYm9vbGVhbiB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZGF0ZXNUZW1wKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB7IHBpY2tNb2RlLCBkZWZhdWx0RW5kRGF0ZVRvU3RhcnREYXRlIH0gPSB0aGlzLl9kO1xuXG4gICAgc3dpdGNoIChwaWNrTW9kZSkge1xuICAgICAgY2FzZSBwaWNrTW9kZXMuU0lOR0xFOlxuICAgICAgICByZXR1cm4gISEodGhpcy5kYXRlc1RlbXBbMF0gJiYgdGhpcy5kYXRlc1RlbXBbMF0udGltZSk7XG4gICAgICBjYXNlIHBpY2tNb2Rlcy5SQU5HRTpcbiAgICAgICAgaWYgKGRlZmF1bHRFbmREYXRlVG9TdGFydERhdGUpIHtcbiAgICAgICAgICByZXR1cm4gISEodGhpcy5kYXRlc1RlbXBbMF0gJiYgdGhpcy5kYXRlc1RlbXBbMF0udGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhKHRoaXMuZGF0ZXNUZW1wWzBdICYmIHRoaXMuZGF0ZXNUZW1wWzFdKSAmJiAhISh0aGlzLmRhdGVzVGVtcFswXS50aW1lICYmIHRoaXMuZGF0ZXNUZW1wWzFdLnRpbWUpO1xuICAgICAgY2FzZSBwaWNrTW9kZXMuTVVMVEk6XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVzVGVtcC5sZW5ndGggPiAwICYmIHRoaXMuZGF0ZXNUZW1wLmV2ZXJ5KGUgPT4gISFlICYmICEhZS50aW1lKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmRhdGVzVGVtcCA9IFtudWxsLCBudWxsXTtcbiAgfVxuXG4gIGNhbkNsZWFyKCkge1xuICAgIHJldHVybiAhIXRoaXMuZGF0ZXNUZW1wWzBdO1xuICB9XG5cbiAgbmV4dE1vbnRoKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBsZW4gPSB0aGlzLmNhbGVuZGFyTW9udGhzLmxlbmd0aDtcbiAgICBjb25zdCBmaW5hbCA9IHRoaXMuY2FsZW5kYXJNb250aHNbbGVuIC0gMV07XG4gICAgY29uc3QgbmV4dFRpbWUgPSBtb21lbnQoZmluYWwub3JpZ2luYWwudGltZSlcbiAgICAgIC5hZGQoMSwgJ00nKVxuICAgICAgLnZhbHVlT2YoKTtcbiAgICBjb25zdCByYW5nZUVuZCA9IHRoaXMuX2QudG8gPyBtb21lbnQodGhpcy5fZC50bykuc3VidHJhY3QoMSwgJ00nKSA6IDA7XG5cbiAgICBpZiAobGVuIDw9IDAgfHwgKHJhbmdlRW5kICE9PSAwICYmIG1vbWVudChmaW5hbC5vcmlnaW5hbC50aW1lKS5pc0FmdGVyKHJhbmdlRW5kKSkpIHtcbiAgICAgIGV2ZW50LnRhcmdldC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jYWxlbmRhck1vbnRocy5wdXNoKC4uLnRoaXMuY2FsU3ZjLmNyZWF0ZU1vbnRoc0J5UGVyaW9kKG5leHRUaW1lLCBOVU1fT0ZfTU9OVEhTX1RPX0NSRUFURSwgdGhpcy5fZCkpO1xuICAgIGV2ZW50LnRhcmdldC5jb21wbGV0ZSgpO1xuICAgIHRoaXMucmVwYWludERPTSgpO1xuICB9XG5cbiAgYmFja3dhcmRzTW9udGgoKTogdm9pZCB7XG4gICAgY29uc3QgZmlyc3QgPSB0aGlzLmNhbGVuZGFyTW9udGhzWzBdO1xuXG4gICAgaWYgKGZpcnN0Lm9yaWdpbmFsLnRpbWUgPD0gMCkge1xuICAgICAgdGhpcy5fZC5jYW5CYWNrd2FyZHNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0VGltZSA9ICh0aGlzLmFjdHVhbEZpcnN0VGltZSA9IG1vbWVudChmaXJzdC5vcmlnaW5hbC50aW1lKVxuICAgICAgLnN1YnRyYWN0KE5VTV9PRl9NT05USFNfVE9fQ1JFQVRFLCAnTScpXG4gICAgICAudmFsdWVPZigpKTtcblxuICAgIHRoaXMuY2FsZW5kYXJNb250aHMudW5zaGlmdCguLi50aGlzLmNhbFN2Yy5jcmVhdGVNb250aHNCeVBlcmlvZChmaXJzdFRpbWUsIE5VTV9PRl9NT05USFNfVE9fQ1JFQVRFLCB0aGlzLl9kKSk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMucmVwYWludERPTSgpO1xuICB9XG5cbiAgc2Nyb2xsVG9EYXRlKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0RGF0ZUluZGV4ID0gdGhpcy5maW5kSW5pdE1vbnRoTnVtYmVyKGRhdGUpO1xuICAgIGNvbnN0IG1vbnRoRWxlbWVudCA9IHRoaXMubW9udGhzRWxlLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bYG1vbnRoLSR7ZGVmYXVsdERhdGVJbmRleH1gXTtcbiAgICBjb25zdCBkb21FbGVtUmVhZHlXYWl0VGltZSA9IDMwMDtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdERhdGVNb250aCA9IG1vbnRoRWxlbWVudCA/IG1vbnRoRWxlbWVudC5vZmZzZXRUb3AgOiAwO1xuXG4gICAgICBpZiAoZGVmYXVsdERhdGVJbmRleCAhPT0gLTEgJiYgZGVmYXVsdERhdGVNb250aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsQnlQb2ludCgwLCBkZWZhdWx0RGF0ZU1vbnRoLCAxMjgpO1xuICAgICAgfVxuICAgIH0sIGRvbUVsZW1SZWFkeVdhaXRUaW1lKTtcbiAgfVxuXG4gIHNjcm9sbFRvRGVmYXVsdERhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxUb0RhdGUodGhpcy5fZC5kZWZhdWx0U2Nyb2xsVG8pO1xuICB9XG5cbiAgb25TY3JvbGwoJGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2QuY2FuQmFja3dhcmRzU2VsZWN0ZWQpIHJldHVybjtcblxuICAgIGNvbnN0IHsgZGV0YWlsIH0gPSAkZXZlbnQ7XG5cbiAgICBpZiAoZGV0YWlsLnNjcm9sbFRvcCA8PSAyMDAgJiYgZGV0YWlsLnZlbG9jaXR5WSA8IDAgJiYgdGhpcy5fc2Nyb2xsTG9jaykge1xuICAgICAgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsTG9jayA9ICExO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlaWdodEJlZm9yZU1vbnRoUHJlcGVuZCA9IHNjcm9sbEVsZW0uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB0aGlzLmJhY2t3YXJkc01vbnRoKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIC8vICBjb25zdCBoZWlnaHRBZnRlck1vbnRoUHJlcGVuZCA9IHNjcm9sbEVsZW0uc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgICAgLy8gdGhpcy5jb250ZW50LnNjcm9sbEJ5UG9pbnQoMCwgaGVpZ2h0QWZ0ZXJNb250aFByZXBlbmQgLSBoZWlnaHRCZWZvcmVNb250aFByZXBlbmQsIDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3Njcm9sbExvY2sgPSAhMDtcbiAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSwgMTgwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbiBzb21lIG9sZGVyIFNhZmFyaSB2ZXJzaW9ucyAob2JzZXJ2ZWQgYXQgTWFjJ3MgU2FmYXJpIDEwLjApLCB0aGVyZSBpcyBhbiBpc3N1ZSB3aGVyZSBzdHlsZSB1cGRhdGVzIHRvXG4gICAqIHNoYWRvd1Jvb3QgZGVzY2VuZGFudHMgZG9uJ3QgY2F1c2UgYSBicm93c2VyIHJlcGFpbnQuXG4gICAqIFNlZSBmb3IgbW9yZSBkZXRhaWxzOiBodHRwczovL2dpdGh1Yi5jb20vUG9seW1lci9wb2x5bWVyL2lzc3Vlcy80NzAxXG4gICAqL1xuICByZXBhaW50RE9NKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpLnRoZW4oc2Nyb2xsRWxlbSA9PiB7XG4gICAgICAvLyBVcGRhdGUgc2Nyb2xsRWxlbSB0byBlbnN1cmUgdGhhdCBoZWlnaHQgb2YgdGhlIGNvbnRhaW5lciBjaGFuZ2VzIGFzIE1vbnRocyBhcmUgYXBwZW5kZWQvcHJlcGVuZGVkXG4gICAgICBzY3JvbGxFbGVtLnN0eWxlLnpJbmRleCA9ICcyJztcbiAgICAgIHNjcm9sbEVsZW0uc3R5bGUuekluZGV4ID0gJ2luaXRpYWwnO1xuICAgICAgLy8gVXBkYXRlIG1vbnRoc0VsZSB0byBlbnN1cmUgc2VsZWN0ZWQgc3RhdGUgaXMgcmVmbGVjdGVkIHdoZW4gdGFwcGluZyBvbiBhIGRheVxuICAgICAgdGhpcy5tb250aHNFbGUubmF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPSAnMic7XG4gICAgICB0aGlzLm1vbnRoc0VsZS5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCA9ICdpbml0aWFsJztcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRJbml0TW9udGhOdW1iZXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgbGV0IHN0YXJ0RGF0ZSA9IHRoaXMuYWN0dWFsRmlyc3RUaW1lID8gbW9tZW50KHRoaXMuYWN0dWFsRmlyc3RUaW1lKSA6IG1vbWVudCh0aGlzLl9kLmZyb20pO1xuICAgIGNvbnN0IGRlZmF1bHRTY3JvbGxUbyA9IG1vbWVudChkYXRlKTtcbiAgICBjb25zdCBpc0FmdGVyOiBib29sZWFuID0gZGVmYXVsdFNjcm9sbFRvLmlzQWZ0ZXIoc3RhcnREYXRlKTtcbiAgICBpZiAoIWlzQWZ0ZXIpIHJldHVybiAtMTtcblxuICAgIGlmICh0aGlzLnNob3dZZWFyUGlja2VyKSB7XG4gICAgICBzdGFydERhdGUgPSBtb21lbnQobmV3IERhdGUodGhpcy55ZWFyLCAwLCAxKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRTY3JvbGxUby5kaWZmKHN0YXJ0RGF0ZSwgJ21vbnRoJyk7XG4gIH1cblxuICBfZ2V0RGF5VGltZShkYXRlOiBhbnkpOiBudW1iZXIge1xuICAgIHJldHVybiBtb21lbnQobW9tZW50KGRhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCcpKS52YWx1ZU9mKCk7XG4gIH1cblxuICBfbW9udGhGb3JtYXQoZGF0ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCh0aGlzLl9kLm1vbnRoRm9ybWF0LnJlcGxhY2UoL3kvZywgJ1knKSk7XG4gIH1cblxuICB0cmFja0J5SW5kZXgoaW5kZXg6IG51bWJlciwgbW9tZW50RGF0ZTogQ2FsZW5kYXJNb250aCk6IG51bWJlciB7XG4gICAgcmV0dXJuIG1vbWVudERhdGUub3JpZ2luYWwgPyBtb21lbnREYXRlLm9yaWdpbmFsLnRpbWUgOiBpbmRleDtcbiAgfVxufVxuIl19