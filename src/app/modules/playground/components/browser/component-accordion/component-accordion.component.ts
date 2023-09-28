import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Type } from '@angular/core';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { LandingComponent } from "@app/library/components/by_topic/landing/v1/landing.component";
import { LandingBgImgComponent } from "@app/library/components/by_topic/landing/v2/landing-bg-img.component";
import { DefaultAppBarComponent } from "@app/library/components/toolbars/appbar/default-app-bar.component";
import { SimpleAppBarComponent } from "@app/library/components/toolbars/simple-appbar/simple-app-bar.component";

export interface AssetCategory {
  name: string;
  items: Type<any>[];
}

@Component({
  selector: 'app-component-accordion',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  templateUrl: './component-accordion.component.html',
  styleUrls: ['./component-accordion.component.scss']
})
export class ComponentAccordionComponent {

  @Output()
  selectEvent = new EventEmitter<Type<any>>();

  assetCategories: AssetCategory[] =
    [
      {name: 'appbar', items: [DefaultAppBarComponent, SimpleAppBarComponent]},
      {name: 'landing', items: [LandingComponent, LandingBgImgComponent]},
      // {name: 'contact', items: ['Baz1', 'Baz2']},
    ];

  onSelectAsset(item: Type<any>): void {
    this.selectEvent.emit(item);
  }
}
