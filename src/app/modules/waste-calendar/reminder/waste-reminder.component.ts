import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DateAdapter } from "@angular/material/core";
import { MatCalendar } from "@angular/material/datepicker";
import { VisibilityStateService } from "@app/common/services/visibility-state.service";
import { formatGermanDayAndMonth, getDateWithoutTime, parseEnglish, parseGerman } from "@app/common/util/date-util";
import wasteFile from "@assets/json/abfall.json";
import { WasteDate, WasteEvent, WasteKey } from "@modules/waste-calendar/waste-dates";
import differenceInDays from 'date-fns/differenceInDays'
import { de } from 'date-fns/locale'

@Component({
  selector: 'app-waste-reminder',
  templateUrl: './waste-reminder.component.html',
  styleUrls: ['./waste-reminder.component.scss'],
})

export class WasteReminderComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar')
  calendar: MatCalendar<Date>;

  selected: Date | null;
  keys: WasteKey[] = [];
  eventsOfAllMonths: WasteEvent[][];
  eventsOfSelectedMonth: WasteEvent[] = [];
  nextEventsOfSelectedMonth: WasteEvent[] = [];
  private rawEvents: { date: string, type: string }[];

  constructor(private visibilityService: VisibilityStateService,
              private renderer: Renderer2,
              private adapter: DateAdapter<any>) {
    this.adapter.setLocale(de);
  }

  ngOnInit(): void {
    this.rawEvents = wasteFile.events;
    this.eventsOfAllMonths = this.processJson();
    this.updateEventsOfMonth(new Date().getMonth());
    this.listenVisibilityChange();
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
        const attribute = element.getAttribute('aria-label');
        if (attribute) {

          if (wasteEvent.date.getDate() == parseGerman(attribute).getDate()) {
            this.renderer.addClass(element, this.computeColor(wasteEvent.wasteType));
            this.renderer.setAttribute(element, 'title', this.computeEvent(wasteEvent.wasteType));
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
    const today = getDateWithoutTime(new Date());
    this.nextEventsOfSelectedMonth = this.eventsOfSelectedMonth.filter(event => event.date >= today);
  }

  getCountdown(event: WasteEvent): string {
    const actualDate = getDateWithoutTime(new Date());
    const difference = differenceInDays(event.date, actualDate);
    const days = difference > 1 ? 'Tagen' : 'Tag';
    const hint = this.computeEvent(event.wasteType);
    const result = formatGermanDayAndMonth(event.date) + ' in ' + difference + ' ' + days;
    return `${result} ${hint}`;
  }

  private getEventsOfMonth(month: number): WasteEvent[] {
    return this.eventsOfAllMonths[month];
  }

  private processJson(): WasteEvent[][] {
    const events: WasteEvent[][] = [];
    for (let i = 0; i < 12; i++) {
      events[i] = [];
    }
    this.generateWasteEvents(this.rawEvents).forEach(event => {
        const month = event.date.getMonth();
        events[month].push(event);
      }
    );
    return events;
  }

  private generateWasteEvents(dates: WasteDate[]): WasteEvent[] {
    const events: WasteEvent[] = [];
    for (const event of dates) {
      const date: Date = parseEnglish(event.date);
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

  private computeEvent(wasteType: string): string {
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

  private listenVisibilityChange(): void {
    this.visibilityService.on(VisibilityStateService.VISIBLE, () => {
      this.updateEventsOfMonth(new Date().getMonth());
    })
  }

}
