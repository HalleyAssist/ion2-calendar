import { Component, ChangeDetectorRef, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { defaults, pickModes } from '../config';
export const MONTH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthComponent),
    multi: true,
};
export class MonthComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbW9udGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNySCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFvRUYsTUFBTSxPQUFPLGNBQWM7SUFtQ3pCLFlBQW1CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbENoQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVUvQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFVBQUssR0FBVyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBRy9CLFdBQU0sR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxXQUFNLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkQsZ0JBQVcsR0FBOEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1RCxjQUFTLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQsVUFBSyxHQUE4QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBSVAsb0JBQWUsR0FBRyxlQUFlLENBQUM7SUFNQyxDQUFDO0lBSjdDLElBQUksUUFBUTtRQUNWLE9B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NU9GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFFakMsdURBQXVEO2dCQUN2RCxJQUFJLEVBQUU7b0JBQ0osd0JBQXdCLEVBQUUsZUFBZTtpQkFDMUM7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdEVDs7YUFDRjs7O1lBNUVtQixpQkFBaUI7Ozs0QkE4RWxDLEtBQUs7b0JBQ0wsS0FBSzt1QkFFTCxLQUFLOzRCQUVMLEtBQUs7aUJBRUwsS0FBSzt1QkFFTCxLQUFLO29CQUVMLEtBQUs7cUJBR0wsTUFBTTtxQkFFTixNQUFNOzBCQUVOLE1BQU07d0JBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXksIENhbGVuZGFyTW9udGgsIENhbGVuZGFyT3JpZ2luYWwsIFBpY2tNb2RlIH0gZnJvbSAnLi4vY2FsZW5kYXIubW9kZWwnO1xuaW1wb3J0IHsgZGVmYXVsdHMsIHBpY2tNb2RlcyB9IGZyb20gJy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBNT05USF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTW9udGhDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1jYWxlbmRhci1tb250aCcsXG4gIHByb3ZpZGVyczogW01PTlRIX1ZBTFVFX0FDQ0VTU09SXSxcbiAgc3R5bGVVcmxzOiBbJy4vbW9udGguY29tcG9uZW50LnNjc3MnXSxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jb21wb25lbnQtbW9kZV0nOiAnY29tcG9uZW50TW9kZSdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCJjb2xvclwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFfaXNSYW5nZVwiIFtuZ0lmRWxzZV09XCJyYW5nZUJveFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5cy1ib3hcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWRheSBbbmdGb3JPZl09XCJtb250aC5kYXlzXCIgW25nRm9yVHJhY2tCeV09XCJ0cmFja0J5VGltZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRheXNcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRheVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIidkYXlzLWJ0biAnICsgZGF5LmNzc0NsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy50b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25TZWxlY3RlZChkYXkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5tYXJrZWRdPVwiZGF5Lm1hcmtlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MubGFzdC1tb250aC1kYXldPVwiZGF5LmlzTGFzdE1vbnRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5uZXh0LW1vbnRoLWRheV09XCJkYXkuaXNOZXh0TW9udGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm9uLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoZGF5LnRpbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkYXkuZGlzYWJsZVwiPlxuICAgICAgICAgICAgICAgICAgPHA+e3sgZGF5LnRpdGxlIH19PC9wPlxuICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwiZGF5LnN1YlRpdGxlXCI+e3sgZGF5Py5zdWJUaXRsZSB9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI3JhbmdlQm94PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5cy1ib3hcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWRheSBbbmdGb3JPZl09XCJtb250aC5kYXlzXCIgW25nRm9yVHJhY2tCeV09XCJ0cmFja0J5VGltZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRheXNcIlxuICAgICAgICAgICAgICAgICBbY2xhc3Muc3RhcnRTZWxlY3Rpb25dPVwiaXNTdGFydFNlbGVjdGlvbihkYXkpXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzLmVuZFNlbGVjdGlvbl09XCJpc0VuZFNlbGVjdGlvbihkYXkpXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzLmlzLWZpcnN0LXdyYXBdPVwiZGF5Py5pc0ZpcnN0XCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzLmlzLWxhc3Qtd3JhcF09XCJkYXk/LmlzTGFzdFwiXG4gICAgICAgICAgICAgICAgIFtjbGFzcy5iZXR3ZWVuXT1cImlzQmV0d2VlbihkYXkpXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXlcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCInZGF5cy1idG4gJyArIGRheS5jc3NDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MudG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uU2VsZWN0ZWQoZGF5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MubWFya2VkXT1cImRheS5tYXJrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmxhc3QtbW9udGgtZGF5XT1cImRheS5pc0xhc3RNb250aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MubmV4dC1tb250aC1kYXldPVwiZGF5LmlzTmV4dE1vbnRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5pcy1maXJzdF09XCJkYXkuaXNGaXJzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuaXMtbGFzdF09XCJkYXkuaXNMYXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5vbi1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKGRheS50aW1lKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGF5LmRpc2FibGVcIj5cbiAgICAgICAgICAgICAgICAgIDxwPnt7IGRheS50aXRsZSB9fTwvcD5cbiAgICAgICAgICAgICAgICAgIDxzbWFsbCAqbmdJZj1cImRheS5zdWJUaXRsZVwiPnt7IGRheT8uc3ViVGl0bGUgfX08L3NtYWxsPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBNb250aENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgY29tcG9uZW50TW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBtb250aDogQ2FsZW5kYXJNb250aDtcbiAgQElucHV0KClcbiAgcGlja01vZGU6IFBpY2tNb2RlO1xuICBASW5wdXQoKVxuICBpc1NhdmVIaXN0b3J5OiBib29sZWFuO1xuICBASW5wdXQoKVxuICBpZDogYW55O1xuICBASW5wdXQoKVxuICByZWFkb25seSA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nID0gZGVmYXVsdHMuQ09MT1I7XG5cbiAgQE91dHB1dCgpXG4gIGNoYW5nZTogRXZlbnRFbWl0dGVyPENhbGVuZGFyRGF5W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgc2VsZWN0U3RhcnQ6IEV2ZW50RW1pdHRlcjxDYWxlbmRhckRheT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3RFbmQ6IEV2ZW50RW1pdHRlcjxDYWxlbmRhckRheT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2RhdGU6IEFycmF5PENhbGVuZGFyRGF5IHwgbnVsbD4gPSBbbnVsbCwgbnVsbF07XG4gIF9pc0luaXQgPSBmYWxzZTtcbiAgX29uQ2hhbmdlZDogRnVuY3Rpb247XG4gIF9vblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG4gIHJlYWRvbmx5IERBWV9EQVRFX0ZPUk1BVCA9ICdNTU1NIGRkLCB5eXl5JztcblxuICBnZXQgX2lzUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGlja01vZGUgPT09IHBpY2tNb2Rlcy5SQU5HRTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0luaXQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRlO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBvYmo7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2VkID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICB0cmFja0J5VGltZShpbmRleDogbnVtYmVyLCBpdGVtOiBDYWxlbmRhck9yaWdpbmFsKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0udGltZSA6IGluZGV4O1xuICB9XG5cbiAgaXNFbmRTZWxlY3Rpb24oZGF5OiBDYWxlbmRhckRheSk6IGJvb2xlYW4ge1xuICAgIGlmICghZGF5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHRoaXMucGlja01vZGUgIT09IHBpY2tNb2Rlcy5SQU5HRSB8fCAhdGhpcy5faXNJbml0IHx8IHRoaXMuX2RhdGVbMV0gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZGF0ZVsxXS50aW1lID09PSBkYXkudGltZTtcbiAgfVxuXG4gIGdldERheUxhYmVsKGRheTogQ2FsZW5kYXJEYXkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF5LnRpbWUpO1xuICB9XG5cbiAgaXNCZXR3ZWVuKGRheTogQ2FsZW5kYXJEYXkpOiBib29sZWFuIHtcbiAgICBpZiAoIWRheSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKHRoaXMucGlja01vZGUgIT09IHBpY2tNb2Rlcy5SQU5HRSB8fCAhdGhpcy5faXNJbml0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RhdGVbMF0gPT09IG51bGwgfHwgdGhpcy5fZGF0ZVsxXSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZGF0ZVswXS50aW1lO1xuICAgIGNvbnN0IGVuZCA9IHRoaXMuX2RhdGVbMV0udGltZTtcblxuICAgIHJldHVybiBkYXkudGltZSA8IGVuZCAmJiBkYXkudGltZSA+IHN0YXJ0O1xuICB9XG5cbiAgaXNTdGFydFNlbGVjdGlvbihkYXk6IENhbGVuZGFyRGF5KTogYm9vbGVhbiB7XG4gICAgaWYgKCFkYXkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5waWNrTW9kZSAhPT0gcGlja01vZGVzLlJBTkdFIHx8ICF0aGlzLl9pc0luaXQgfHwgdGhpcy5fZGF0ZVswXSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9kYXRlWzBdLnRpbWUgPT09IGRheS50aW1lICYmIHRoaXMuX2RhdGVbMV0gIT09IG51bGw7XG4gIH1cblxuICBpc1NlbGVjdGVkKHRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX2RhdGUpKSB7XG4gICAgICBpZiAodGhpcy5waWNrTW9kZSAhPT0gcGlja01vZGVzLk1VTFRJKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRlWzBdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbWUgPT09IHRoaXMuX2RhdGVbMF0udGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kYXRlWzFdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbWUgPT09IHRoaXMuX2RhdGVbMV0udGltZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGUuZmluZEluZGV4KGUgPT4gZSAhPT0gbnVsbCAmJiBlLnRpbWUgPT09IHRpbWUpICE9PSAtMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0ZWQoaXRlbTogQ2FsZW5kYXJEYXkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkgcmV0dXJuO1xuICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoaXRlbSk7XG4gICAgaWYgKHRoaXMucGlja01vZGUgPT09IHBpY2tNb2Rlcy5TSU5HTEUpIHtcbiAgICAgIHRoaXMuX2RhdGVbMF0gPSBpdGVtO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl9kYXRlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5waWNrTW9kZSA9PT0gcGlja01vZGVzLlJBTkdFKSB7XG4gICAgICBpZiAodGhpcy5fZGF0ZVswXSA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9kYXRlWzBdID0gaXRlbTtcbiAgICAgICAgdGhpcy5zZWxlY3RTdGFydC5lbWl0KGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRlWzFdID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRlWzBdLnRpbWUgPCBpdGVtLnRpbWUpIHtcbiAgICAgICAgICB0aGlzLl9kYXRlWzFdID0gaXRlbTtcbiAgICAgICAgICB0aGlzLnNlbGVjdEVuZC5lbWl0KGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RhdGVbMV0gPSB0aGlzLl9kYXRlWzBdO1xuICAgICAgICAgIHRoaXMuc2VsZWN0RW5kLmVtaXQodGhpcy5fZGF0ZVswXSk7XG4gICAgICAgICAgdGhpcy5fZGF0ZVswXSA9IGl0ZW07XG4gICAgICAgICAgdGhpcy5zZWxlY3RTdGFydC5lbWl0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGVbMF0udGltZSA+IGl0ZW0udGltZSkge1xuICAgICAgICB0aGlzLl9kYXRlWzBdID0gaXRlbTtcbiAgICAgICAgdGhpcy5zZWxlY3RTdGFydC5lbWl0KGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRlWzFdLnRpbWUgPCBpdGVtLnRpbWUpIHtcbiAgICAgICAgdGhpcy5fZGF0ZVsxXSA9IGl0ZW07XG4gICAgICAgIHRoaXMuc2VsZWN0RW5kLmVtaXQoaXRlbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kYXRlWzBdID0gaXRlbTtcbiAgICAgICAgdGhpcy5zZWxlY3RTdGFydC5lbWl0KGl0ZW0pO1xuICAgICAgICB0aGlzLl9kYXRlWzFdID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl9kYXRlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5waWNrTW9kZSA9PT0gcGlja01vZGVzLk1VTFRJKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2RhdGUuZmluZEluZGV4KGUgPT4gZSAhPT0gbnVsbCAmJiBlLnRpbWUgPT09IGl0ZW0udGltZSk7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fZGF0ZS5wdXNoKGl0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl9kYXRlLmZpbHRlcihlID0+IGUgIT09IG51bGwpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==