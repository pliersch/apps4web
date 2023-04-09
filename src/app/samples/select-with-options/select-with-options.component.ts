import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";

interface Sample {
  name: string;
  children: string[]
}

@Component({
  selector: 'app-select-with-options',
  templateUrl: './select-with-options.component.html',
  styleUrls: ['./select-with-options.component.scss']
})

export class SelectWithOptionsComponent {
  samples: Sample[] = [
    {name: 'Foo', children: ['Foo1', 'Foo2', 'Foo3']},
    {name: 'Bar', children: ['Bar1', 'Bar2', 'Bar3']},
    {name: 'Baz', children: ['Baz1', 'Baz2', 'Baz3']},
  ]
  formControl: FormControl = new FormControl(['Foo1', 'Bar2']);

  onSelectionChange($event: string[]): void {
    console.log('SelectWithOptionsComponent onSelectionChange: ', $event)
  }

  compareTags(p1: Sample, p2: Sample): boolean {
    if (p1 && p2) {
      return p1.name === p2.name;
    }
    return false;
  }
}
