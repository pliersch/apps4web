import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPlayerComponent } from './widget-player.component';

describe('WidgetPlayerComponent', () => {
  let component: WidgetPlayerComponent;
  let fixture: ComponentFixture<WidgetPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
