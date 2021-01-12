import { Component, Input } from '@angular/core';
import { defaults } from '../config';
export class CalendarWeekComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jYWxlbmRhci13ZWVrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBYXJDLE1BQU0sT0FBTyxxQkFBcUI7SUFPaEM7UUFOQSxlQUFVLEdBQWEsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUM3QyxzQkFBaUIsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzlDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZixVQUFLLEdBQVcsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUVoQixDQUFDO0lBRWhCLElBQ0ksU0FBUyxDQUFDLEtBQWU7UUFDM0IsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELElBQ0ksU0FBUyxDQUFDLEtBQWE7UUFDekIsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1NBQzlDO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7OztZQTVDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFFN0IsUUFBUSxFQUFFOzs7Ozs7R0FNVDs7YUFDRjs7OztvQkFLRSxLQUFLO3dCQUtMLEtBQUs7d0JBUUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSAnLi4vY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNhbGVuZGFyLXdlZWsnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci13ZWVrLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlvbi10b29sYmFyIFtjbGFzc109XCInd2Vlay10b29sYmFyICcgKyBjb2xvclwiIG5vLWJvcmRlci10b3A+XG4gICAgICA8dWwgW2NsYXNzXT1cIid3ZWVrLXRpdGxlICcgKyBjb2xvclwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHcgb2YgX2Rpc3BsYXlXZWVrQXJyYXlcIj57eyB3IH19PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9pb24tdG9vbGJhcj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrQ29tcG9uZW50IHtcbiAgX3dlZWtBcnJheTogc3RyaW5nW10gPSBkZWZhdWx0cy5XRUVLU19GT1JNQVQ7XG4gIF9kaXNwbGF5V2Vla0FycmF5OiBzdHJpbmdbXSA9IHRoaXMuX3dlZWtBcnJheTtcbiAgX3dlZWtTdGFydCA9IDA7XG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmcgPSBkZWZhdWx0cy5DT0xPUjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgQElucHV0KClcbiAgc2V0IHdlZWtBcnJheSh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID09PSA3KSB7XG4gICAgICB0aGlzLl93ZWVrQXJyYXkgPSBbLi4udmFsdWVdO1xuICAgICAgdGhpcy5hZGp1c3RTb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHdlZWtTdGFydCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlID09PSAxKSB7XG4gICAgICB0aGlzLl93ZWVrU3RhcnQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYWRqdXN0U29ydCgpO1xuICAgIH1cbiAgfVxuXG4gIGFkanVzdFNvcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3dlZWtTdGFydCA9PT0gMSkge1xuICAgICAgY29uc3QgY2FjaGVXZWVrQXJyYXkgPSBbLi4udGhpcy5fd2Vla0FycmF5XTtcbiAgICAgIGNhY2hlV2Vla0FycmF5LnB1c2goY2FjaGVXZWVrQXJyYXkuc2hpZnQoKSk7XG4gICAgICB0aGlzLl9kaXNwbGF5V2Vla0FycmF5ID0gWy4uLmNhY2hlV2Vla0FycmF5XTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3dlZWtTdGFydCA9PT0gMCkge1xuICAgICAgdGhpcy5fZGlzcGxheVdlZWtBcnJheSA9IFsuLi50aGlzLl93ZWVrQXJyYXldO1xuICAgIH1cbiAgfVxufVxuIl19