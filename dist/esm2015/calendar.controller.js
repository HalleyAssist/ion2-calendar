import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarModal } from './components/calendar.modal';
import { CalendarService } from './services/calendar.service';
export class CalendarController {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIiwic291cmNlcyI6WyJjYWxlbmRhci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUQsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUFtQixTQUEwQixFQUFTLE1BQXVCO1FBQTFELGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7SUFBRyxDQUFDO0lBRWpGOzs7OztPQUtHO0lBQ0gsWUFBWSxDQUFDLGVBQXFDLEVBQUUsZUFBNkIsRUFBRTtRQUNqRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVyRCxPQUFPLElBQUksQ0FBQyxTQUFTO2FBQ2xCLE1BQU0saUJBQ0wsU0FBUyxFQUFFLGFBQWEsRUFDeEIsY0FBYyxFQUFFO2dCQUNkLE9BQU87YUFDUixJQUNFLFlBQVksRUFDZjthQUNELElBQUksQ0FBQyxDQUFDLGFBQWtDLEVBQUUsRUFBRTtZQUMzQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEIsT0FBTyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFO2dCQUNyRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUE1QkYsVUFBVTs7O1lBUEYsZUFBZTtZQUtmLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgeyBPdmVybGF5RXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmltcG9ydCB7IE1vZGFsT3B0aW9ucywgQ2FsZW5kYXJNb2RhbE9wdGlvbnMgfSBmcm9tICcuL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IENhbGVuZGFyTW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXIubW9kYWwnO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlciwgcHVibGljIGNhbFN2YzogQ2FsZW5kYXJTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiBAcGFyYW0ge0NhbGVuZGFyTW9kYWxPcHRpb25zfSBjYWxlbmRhck9wdGlvbnNcbiAgICogQHBhcmFtIHtNb2RhbE9wdGlvbnN9IG1vZGFsT3B0aW9uc1xuICAgKiBAcmV0dXJucyB7YW55fVxuICAgKi9cbiAgb3BlbkNhbGVuZGFyKGNhbGVuZGFyT3B0aW9uczogQ2FsZW5kYXJNb2RhbE9wdGlvbnMsIG1vZGFsT3B0aW9uczogTW9kYWxPcHRpb25zID0ge30pOiBQcm9taXNlPHt9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY2FsU3ZjLnNhZmVPcHQoY2FsZW5kYXJPcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLm1vZGFsQ3RybFxuICAgICAgLmNyZWF0ZSh7XG4gICAgICAgIGNvbXBvbmVudDogQ2FsZW5kYXJNb2RhbCxcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgICAuLi5tb2RhbE9wdGlvbnMsXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGNhbGVuZGFyTW9kYWw6IEhUTUxJb25Nb2RhbEVsZW1lbnQpID0+IHtcbiAgICAgICAgY2FsZW5kYXJNb2RhbC5wcmVzZW50KCk7XG5cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyTW9kYWwub25EaWREaXNtaXNzKCkudGhlbigoZXZlbnQ6IE92ZXJsYXlFdmVudERldGFpbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBldmVudC5kYXRhID8gUHJvbWlzZS5yZXNvbHZlKGV2ZW50LmRhdGEpIDogUHJvbWlzZS5yZWplY3QoJ2NhbmNlbGxlZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=