import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaults } from '../config';
export class MonthPickerComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21vbnRoLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBZXJDLE1BQU0sT0FBTyxvQkFBb0I7SUF1Qi9CO1FBbkJBLFVBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBRXZCLFdBQU0sR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsRCxlQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixpQkFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFFckMsaUJBQVksR0FBRyxNQUFNLENBQUM7SUFhUCxDQUFDO0lBWGhCLElBQ0ksV0FBVyxDQUFDLEtBQWU7UUFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBSUQsU0FBUyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFhO1FBQ25CLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7O1lBNUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUVyQyxRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7O2FBQ0Y7Ozs7b0JBRUUsS0FBSztvQkFFTCxLQUFLO3FCQUVMLE1BQU07MEJBT04sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoIH0gZnJvbSAnLi4vY2FsZW5kYXIubW9kZWwnO1xuaW1wb3J0IHsgZGVmYXVsdHMgfSBmcm9tICcuLi9jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY2FsZW5kYXItbW9udGgtcGlja2VyJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9udGgtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vbnRoLXBpY2tlciAnICsgY29sb3JcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb250aC1wYWNrZXItaXRlbVwiXG4gICAgICAgICAgIFtjbGFzcy50aGlzLW1vbnRoXT1cIiBpID09PSBfdGhpc01vbnRoLmdldE1vbnRoKCkgJiYgbW9udGgub3JpZ2luYWwueWVhciA9PT0gX3RoaXNNb250aC5nZXRGdWxsWWVhcigpXCJcbiAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX21vbnRoRm9ybWF0OyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJfb25TZWxlY3QoaSlcIj57eyBpdGVtIH19PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTW9udGhQaWNrZXJDb21wb25lbnQge1xuICBASW5wdXQoKVxuICBtb250aDogQ2FsZW5kYXJNb250aDtcbiAgQElucHV0KClcbiAgY29sb3IgPSBkZWZhdWx0cy5DT0xPUjtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIF90aGlzTW9udGggPSBuZXcgRGF0ZSgpO1xuICBfbW9udGhGb3JtYXQgPSBkZWZhdWx0cy5NT05USF9GT1JNQVQ7XG5cbiAgTU9OVEhfRk9STUFUID0gJ01NTU0nO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBtb250aEZvcm1hdCh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAxMikge1xuICAgICAgdGhpcy5fbW9udGhGb3JtYXQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgbW9udGhGb3JtYXQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9tb250aEZvcm1hdDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBfb25TZWxlY3QobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQobW9udGgpO1xuICB9XG5cbiAgZ2V0RGF0ZShtb250aDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuX3RoaXNNb250aC5nZXRGdWxsWWVhcigpLCBtb250aCwgMSk7XG4gIH1cbn1cbiJdfQ==