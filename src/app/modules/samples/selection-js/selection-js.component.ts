import {Component, OnInit} from '@angular/core';
import SelectionArea from "@viselect/vanilla";

@Component({
  selector: 'app-selection-js',
  templateUrl: './selection-js.component.html',
  styleUrls: ['./selection-js.component.scss']
})
export class SelectionJsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const selection = new SelectionArea({
      selectables: ['.boxes > div'],
      boundaries: ['.boxes']
    }).on('start', ({store, event}) => {
      if (!event!.ctrlKey && !event!.metaKey) {

        for (const el of store.stored) {
          el.classList.remove('selected');
        }

        selection.clearSelection();
      }
    }).on('move', ({store: {changed: {added, removed}}}) => {
      for (const el of added) {
        el.classList.add('selected');
      }

      for (const el of removed) {
        el.classList.remove('selected');
      }
    });
  }

}
