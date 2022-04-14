import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import wasteFile from "@assets/abfall.json";
import {WasteDate, WasteEvent, WasteKey} from "@modules/waste-calendar/waste-dates";
import {MatCalendar} from "@angular/material/datepicker";
import {formatDates, formatEnglish} from "@app/util/date-util";

@Component({
  selector: 'app-reminder',
  templateUrl: './waste-reminder.component.html',
  styleUrls: ['./waste-reminder.component.scss'],
})

export class WasteReminderComponent implements OnInit, AfterViewInit {

  // @HostListener('window:focus', ['$event'])
  // onFocus(event: FocusEvent): void {
  //   // this.refreshCalendar();
  // }

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
    this.eventsOfSelectedMonth = this.getEventsOfMonth(new Date().getMonth());
  }

  ngAfterViewInit(): void {
    const buttons = document
      .querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.eventsOfSelectedMonth = this.getEventsOfMonth(this.calendar.activeDate.getMonth());
          this.highlightDays();
        });
      });
    }
    this.highlightDays();
  }

  private highlightDays(): void {
    const dayElements: NodeListOf<Element> = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    );

    for (const wasteEvent of this.eventsOfSelectedMonth) {
      Array.from(dayElements).forEach((element) => {
        if (formatEnglish(wasteEvent.date) == element.getAttribute('aria-label')) {
          this.renderer.addClass(element, this.computeColor(wasteEvent.wasteType));
          this.renderer.setAttribute(element, 'title', this.computeHint(wasteEvent.wasteType));
        }
      });
    }
  }

  onSelectionChange($event: Date | null): void {
    console.log('WasteReminderComponent onSelectionChange: ',)
    if ($event) {
      this.eventsOfSelectedMonth = this.getEventsOfMonth($event.getMonth());
    }
  }

  onMonthSelected($event: Date): void {
    this.eventsOfSelectedMonth = this.getEventsOfMonth($event.getMonth());
  }

  onViewChanged(): void {
    this.highlightDays();
  }

  private getEventsOfMonth(month: number): WasteEvent[] {
    return this.events[month];
  }

  private processJson(): WasteEvent[][] {
    let events: WasteEvent[][] = [];
    for (let i = 0; i < 12; i++) {
      events[i] = [];
    }
    this.generateWasteEvents(wasteFile.events).forEach(event => {
        let month = event.date.getMonth();
        events[month].push(event);
      }
    );
    return events;
  }

  private generateWasteEvents(dates: WasteDate[]): WasteEvent[] {
    let events: WasteEvent[] = [];
    for (const event of dates) {
      events.push({
        date: new Date(event.date),
        wasteType: event.type
      });
    }
    return events;
  }

  private computeColor(wasteType: string): string {
    switch (wasteType) {
      case 'h':
        return 'gray'
      case 'g':
        return 'yellow'
      case 'p':
        return 'blue'
      case 'sw':
        return 'green'
      case 'ss':
        return 'red'
    }
    return "";
  }

  private computeHint(wasteType: string): string {
    switch (wasteType) {
      case 'h':
        return 'Hausmüll'
      case 'g':
        return 'gelbe Tonne'
      case 'p':
        return 'Papier'
      case 'sw':
        return 'Strauchwerk'
      case 'ss':
        return 'Schadstoff'
    }
    return "";
  }
}
