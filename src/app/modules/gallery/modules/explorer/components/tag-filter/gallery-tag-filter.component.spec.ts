import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MatExpansionPanelHarness } from "@angular/material/expansion/testing";
import { GalleryTagFilterComponent } from "@gallery/modules/explorer";
import { getFooBarTagGroups } from "@gallery/store/testing/test.tags";
import { NgxsModule, Store } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import { of } from "rxjs";

describe('GalleryTagFilterComponent', () => {
  let store: Store;
  let loader: HarnessLoader;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [GalleryTagFilterComponent],
      imports: [
        NgxsModule.forRoot([], {
          developmentMode: true
        }),
        NgScrollbarModule,
      ]
    });
    store = TestBed.inject(Store);
    // spyOn(store, 'selectSnapshot').and.returnValue(null);
  });

  it('#clicked() should toggle #isOn', async () => {

    spyOn(store, 'select').and.returnValue(of([]));
    const fixture = TestBed.createComponent(GalleryTagFilterComponent);
    const component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    const panelLoader = await loader.getChildLoader('.mat-expansion-panel');
    const panel = await panelLoader.getHarness(MatExpansionPanelHarness);
    console.log(' : ', panel)
    // Object.defineProperty(component, 'platformList$', {writable: true});
    // component.tagGroups$ = of(getFooBarTagGroups());
    //
    // fixture.detectChanges();
    // expect(component).toBeDefined();
    // expect(component.activeTags.length == 0).toBe(true);

  });
});

// describe('GalleryTagFilterComponent', () => {
//   it('#clicked() should toggle #isOn', () => {
//     const comp = new GalleryTagFilterComponent(null!);
//     expect(comp.isOn)
//       .withContext('off at first')
//       .toBe(false);
//     comp.clicked();
//     expect(comp.isOn)
//       .withContext('on after click')
//       .toBe(true);
//     comp.clicked();
//     expect(comp.isOn)
//       .withContext('off after second click')
//       .toBe(false);
//   });
//
//   it('#clicked() should set #message to "is on"', () => {
//     const comp = new GalleryTagFilterComponent(null!);
//     expect(comp.message)
//       .withContext('off at first')
//       .toMatch(/is off/i);
//     comp.clicked();
//     expect(comp.message)
//       .withContext('on after clicked')
//       .toMatch(/is on/i);
//   });
// });
