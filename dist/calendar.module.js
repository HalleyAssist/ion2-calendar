var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CalendarModule_1;
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { CalendarController } from './calendar.controller';
import { DEFAULT_CALENDAR_OPTIONS } from './services/calendar-options.provider';
import { CalendarService } from './services/calendar.service';
import { CALENDAR_COMPONENTS } from './components';
export function calendarController(modalCtrl, calSvc) {
    return new CalendarController(modalCtrl, calSvc);
}
let CalendarModule = CalendarModule_1 = class CalendarModule {
    static forRoot(defaultOptions = {}) {
        return {
            ngModule: CalendarModule_1,
            providers: [
                { provide: DEFAULT_CALENDAR_OPTIONS, useValue: defaultOptions }
            ]
        };
    }
};
CalendarModule = CalendarModule_1 = __decorate([
    NgModule({
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
    })
], CalendarModule);
export { CalendarModule };
//# sourceMappingURL=calendar.module.js.map