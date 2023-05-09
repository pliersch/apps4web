import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatCardModule } from "@angular/material/card";
import { By } from "@angular/platform-browser";
import { PhotosRatingFilterComponent } from "@modules/photos/modules/explorer";
import { StarRatingComponent } from "@modules/photos/modules/share/components/star-rating/star-rating.component";
import { PhotosShareModule } from "@modules/photos/modules/share/photos-share.module";
import { first } from "rxjs";

let fixture: ComponentFixture<PhotosRatingFilterComponent>;
let component: PhotosRatingFilterComponent;

describe('PhotosRatingFilter', () => {

  describe('unit tests', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [PhotosRatingFilterComponent, MockStarRatingComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
      fixture = TestBed.createComponent(PhotosRatingFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('renders without errors', () => {
      expect(component).toBeTruthy();
    });

    it('initial value of currentRating is 0', async () => {
      expect(component.currentRating).toBe(0)
    });

    // todo makes no sense. test the star button!
    it('has a input for property currentRating', async () => {
      component.currentRating = 5;
      expect(component.currentRating).toBe(5)
    });

    it('delegate rating value to star-rating-component', () => {
      const debugElement = fixture.debugElement.query(
        By.directive(MockStarRatingComponent)
      );
      const starRatingComponent: StarRatingComponent = debugElement.componentInstance;
      component.currentRating = 5;
      fixture.detectChanges();
      expect(starRatingComponent.rate).toBe(5);
    });

  });

  describe('integration tests', () => {

    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MatCardModule, PhotosShareModule],
        declarations: [PhotosRatingFilterComponent],
      })
        .compileComponents();
      fixture = TestBed.createComponent(PhotosRatingFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('there are 5 star-buttons', async () => {
      const ratingButtons = await loader.getAllHarnesses(MatButtonHarness);
      expect(ratingButtons.length).toBe(5);
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
});

//////////////////////////////////////////////////////////
//                   fake component
//////////////////////////////////////////////////////////

@Component({
  selector: 'app-photos-star-rating',
  template: '',
})
class MockStarRatingComponent implements Partial<StarRatingComponent> {
  @Input()
  public rate = 0;
}
