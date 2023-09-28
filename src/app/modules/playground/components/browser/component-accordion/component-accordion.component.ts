import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";

export interface AssetCategory {
  name: string;
  items: string[];
}

@Component({
  selector: 'app-component-accordion',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  templateUrl: './component-accordion.component.html',
  styleUrls: ['./component-accordion.component.scss']
})
export class ComponentAccordionComponent {

  assetCategories: AssetCategory[] =
    [
      {name: 'appbar', items: ['Foo1', 'Foo2']},
      {name: 'landing', items: ['Bar1', 'Bar2']},
      {name: 'contact', items: ['Baz1', 'Baz2']},
    ];

  onSelectAsset(item: string): void {
    console.log('ComponentAccordionComponent onSelectAsset: ', item)
  }
}
