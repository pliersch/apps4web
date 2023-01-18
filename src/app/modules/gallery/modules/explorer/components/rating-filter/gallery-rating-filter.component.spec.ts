import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatCardModule } from "@angular/material/card";
import { By } from "@angular/platform-browser";
import { GalleryRatingFilterComponent } from "@gallery/modules/explorer";
import { GalleryShareModule } from "@gallery/modules/share/gallery-share.module";
import { GalleryStarRatingComponent } from "@gallery/modules/share/star-rating/gallery-star-rating.component";
import { first } from "rxjs";

let loader: HarnessLoader;
let fixture: ComponentFixture<GalleryRatingFilterComponent>;
let component: GalleryRatingFilterComponent;

describe('Gallery Rating Filter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [GalleryRatingFilterComponent, MockStarRatingComponent],
    })
      .compileComponents();
    fixture = TestBed.createComponent(GalleryRatingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('initial value of currentRating is 0', async () => {
    expect(component.currentRating).toBe(0)
  });

  it('has an number input for property currentRating', async () => {
    component.currentRating = 5;
    expect(component.currentRating).toBe(5)
  });

  it('delegate rating value to star-rating-component', () => {
    const debugElement = fixture.debugElement.query(
      By.directive(MockStarRatingComponent)
    );
    const starRatingComponent: GalleryStarRatingComponent = debugElement.componentInstance;
    component.currentRating = 5;
    fixture.detectChanges();
    expect(starRatingComponent.rate).toBe(5);
  });

  it('emit ChangeRatingEvent with payloads 1-5 when rating buttons clicked', async () => {
    const ratingButtons = await loader.getAllHarnesses(MatButtonHarness);
    const event = component.changeRatingEvent;
    for (let i = 0; i < ratingButtons.length; i++) {
      event.pipe(first())
        .subscribe((rate: number) => expect(rate).toBe(i + 1));
      await ratingButtons[i].click();
    }
  });
});

describe('Gallery Rating Filter - Material', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, GalleryShareModule],
      declarations: [GalleryRatingFilterComponent],
    })
      .compileComponents();
    fixture = TestBed.createComponent(GalleryRatingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('there are 5 star-buttons', async () => {
    const ratingButtons = await loader.getAllHarnesses(MatButtonHarness);
    expect(ratingButtons.length).toBe(5);
  });
});

//////////////////////////////////////////////////////////
//                   fake component
//////////////////////////////////////////////////////////

@Component({
  selector: 'app-gallery-star-rating',
  template: '',
})
class MockStarRatingComponent implements Partial<GalleryStarRatingComponent> {
  @Input()
  public rate = 0;
}
