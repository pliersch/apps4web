import {AfterViewInit, Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import wasteFile from "@assets/abfall.json";
import {WasteDate, WasteEvent, WasteKey} from "@modules/waste-calendar/waste-dates";
import {MatCalendar, MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {formatDates, generateWasteEvents} from "@app/util/date-util";

@Component({
  selector: 'app-reminder',
  templateUrl: './waste-reminder.component.html',
  styleUrls: ['./waste-reminder.component.scss']
})

export class WasteReminderComponent implements OnInit, AfterViewInit {

  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.refreshCalendar();
  }

  @ViewChild('calendar')
  calendar: MatCalendar<Date>;

  selected: Date | null;
  wasteDates: WasteDate[] = [];
  keys: WasteKey[] = [];
  events: WasteEvent[][];
  eventsOfSelectedMonth: WasteEvent[] = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.events = this.processJson();
    this.wasteDates = formatDates(wasteFile.events);
    this.keys = wasteFile.keys;
    this.eventsOfSelectedMonth = this.getEventsOfMonth(new Date().getMonth());
  }

  ngAfterViewInit(): void {
    const buttons = document
      .querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.eventsOfSelectedMonth = this.getEventsOfMonth(this.calendar.activeDate.getMonth());
          this.highlightDays(this.eventsOfSelectedMonth);
        });
      });
    }
    this.highlightDays(this.eventsOfSelectedMonth);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    console.log('WasteReminderComponent dateClass: ',)
    if (view === 'month') {
      const date = cellDate.getDate();
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    console.log('WasteReminderComponent dateClass: ', 'fuck')
    return '';
  };

  private highlightDays(wasteEvents: WasteEvent[]): void {
    // const dayElements: NodeListOf<Element> = document.querySelectorAll(
    //   'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    // );
    //
    // for (const wasteEvent of wasteEvents) {
    //
    //   Array.from(dayElements).forEach((element) => {
    //     // console.log('WasteReminderComponent : ', wasteEvent.date.toDateString())
    //     // console.log('WasteReminderComponent : ', element.getAttribute('aria-label'))
    //     if (wasteEvent.date.toDateString() == element.getAttribute('aria-label')) {
    //       this.renderer.addClass(element, 'available');
    //       this.renderer.setAttribute(element, 'title', 'Event ' + wasteEvent.wasteType);
    //     }
    //   });
    //
    // }
  }

  private isCurrentMonth(wasteDate: WasteDate): boolean {
    return new Date(wasteDate.date).getMonth() == this.calendar.activeDate.getMonth();
  }

  onSelectionChange($event: Date): void {
    console.log('WasteReminderComponent dateChanged: ', $event);
    this.eventsOfSelectedMonth = this.getEventsOfMonth($event.getMonth());
  }

  onMonthSelected($event: Date): void {
    this.highlightDays(this.getEventsOfMonth($event.getMonth()));
    console.log('WasteReminderComponent monthSelected: ', $event);
    this.eventsOfSelectedMonth = this.getEventsOfMonth($event.getMonth());
  }

  private processJson(): WasteEvent[][] {
    let events: WasteEvent[][] = [];
    for (let i = 0; i < 12; i++) {
      events[i] = [];
    }
    generateWasteEvents(wasteFile.events).forEach(event => {
        let month = event.date.getMonth();
        events[month].push(event);
      }
    );
    return events;
  }

  private getEventsOfMonth(month: number): WasteEvent[] {
    return this.events[month];
  }

  /** Need for update active date on next day  */
  private refreshCalendar(): void {
    this.calendar.activeDate = new Date();
  }
}
