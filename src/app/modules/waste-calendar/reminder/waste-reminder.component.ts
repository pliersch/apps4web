import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import wasteFile from "@assets/abfall.json";
import { WasteDate, WasteEvent, WasteKey } from "@modules/waste-calendar/waste-dates";
import { MatCalendar } from "@angular/material/datepicker";
import { formatGermanDayAndMonth, parseGerman, parseGerman2 } from "@app/util/date-util";
import differenceInDays from 'date-fns/differenceInDays'
import { de } from 'date-fns/locale'
import { DateAdapter } from "@angular/material/core";

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
  keys: WasteKey[] = [];
  eventsOfAllMonths: WasteEvent[][];
  eventsOfSelectedMonth: WasteEvent[] = [];
  nextEventsOfSelectedMonth: WasteEvent[] = [];
  private rawEvents: { date: string, type: string }[];

  constructor(private renderer: Renderer2,
              private _adapter: DateAdapter<any>) {
    this._adapter.localeChanges.subscribe(evt => console.log('WasteReminderComponent : local changes muhaha ', evt))
    this._adapter.setLocale(de);
  }

  ngOnInit(): void {
    this.rawEvents = wasteFile.events;
    this.eventsOfAllMonths = this.processJson();
    this.updateEventsOfMonth(new Date().getMonth());
  }

  ngAfterViewInit(): void {
    const buttons = document
      .querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.updateEventsOfMonth(this.calendar.activeDate.getMonth());
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
    for (const wasteEvent of this.nextEventsOfSelectedMonth) {
      Array.from(dayElements).forEach((element) => {
        let attribute = element.getAttribute('aria-label');
        if (attribute) {

          if (wasteEvent.date.getDate() == parseGerman(attribute).getDate()) {
            this.renderer.addClass(element, this.computeColor(wasteEvent.wasteType));
            this.renderer.setAttribute(element, 'title', this.computeHint(wasteEvent.wasteType));
          }
        }
      });
    }
  }

  onSelectionChange($event: Date | null): void {
    if ($event) {
      this.updateEventsOfMonth($event.getMonth());
    }
  }

  onMonthSelected($event: Date): void {
    this.updateEventsOfMonth($event.getMonth());
  }

  onViewChanged(): void {
    this.highlightDays();
  }

  updateEventsOfMonth(month: number): void {
    this.eventsOfSelectedMonth = this.getEventsOfMonth(month);
    let today = this.getDateWithoutHours(new Date());
    this.nextEventsOfSelectedMonth = this.eventsOfSelectedMonth.filter(event => event.date >= today);
  }

  getCountdown(event: WasteEvent): string {
    let actualDate = this.getDateWithoutHours(new Date());
    let difference = differenceInDays(event.date, actualDate);
    let days = difference > 1 ? 'Tage' : 'Tag';
    let hint = this.computeHint(event.wasteType);
    let result = formatGermanDayAndMonth(event.date) + ' in ' + difference + ' ' + days;
    return result + ' ' + hint;
  }

  private getEventsOfMonth(month: number): WasteEvent[] {
    return this.eventsOfAllMonths[month];
  }

  private processJson(): WasteEvent[][] {
    let events: WasteEvent[][] = [];
    for (let i = 0; i < 12; i++) {
      events[i] = [];
    }
    this.generateWasteEvents(this.rawEvents).forEach(event => {
        let month = event.date.getMonth();
        events[month].push(event);
      }
    );
    return events;
  }

  private generateWasteEvents(dates: WasteDate[]): WasteEvent[] {
    let events: WasteEvent[] = [];
    for (const event of dates) {
      let date = parseGerman2(event.date);
      events.push({
        date: new Date(date),
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
        return 'Hausm??ll'
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

  private getDateWithoutHours(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
