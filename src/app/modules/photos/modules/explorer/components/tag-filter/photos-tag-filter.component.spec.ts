import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatAccordionHarness, MatExpansionPanelHarness } from "@angular/material/expansion/testing";
import { MatListModule } from "@angular/material/list";
import { MatListOptionHarness, MatSelectionListHarness } from "@angular/material/list/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { PhotosTagFilterComponent } from "@modules/photos/modules/explorer";
import { TagGroup } from "@modules/photos/store/tags/tag.model";
import { getFooBarTagGroups } from "@modules/photos/store/testing/test.tags";
import { NgScrollbarModule } from "ngx-scrollbar";

let fixture: ComponentFixture<PhotosTagFilterComponent>;
let component: PhotosTagFilterComponent;

describe('PhotosTagFilterComponent', () => {

  describe('unit tests', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [PhotosTagFilterComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
      fixture = TestBed.createComponent(PhotosTagFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('renders without errors', () => {
      expect(component).toBeTruthy();
    });

    it('initial value of tagGroups is an empty array', async () => {
      expect(component.tagGroups).toEqual([])
    });

    it('initial value of activeTags is an empty array', async () => {
      expect(component.activeTags).toEqual([])
    });

  });

  describe('integration tests', () => {

    let fooBarTagGroups: TagGroup[];
    let loader: HarnessLoader;

    beforeEach(async () => {
      fooBarTagGroups = getFooBarTagGroups();

      await TestBed.configureTestingModule({
        declarations: [PhotosTagFilterComponent],
        imports: [
          NgScrollbarModule,
          NoopAnimationsModule,
          MatListModule,
          MatExpansionModule
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(PhotosTagFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('has an accordion', async () => {
      const accordionHarness = await loader.getHarness(MatAccordionHarness);
      expect(accordionHarness).toBeTruthy();
    });

    it('accordion wraps an expansion-panel', async () => {
      const accordionHarness = await loader.getHarness(MatAccordionHarness);
      const expansionPanelHarnesses = await accordionHarness.getExpansionPanels();
      expect(expansionPanelHarnesses).toBeTruthy();
    });

    it('expansion-panel has titles with tag-group names', async () => {
      component.tagGroups = fooBarTagGroups;
      fixture.detectChanges();
      const panels = await loader.getAllHarnesses(MatExpansionPanelHarness);
      let title = await panels[0].getTitle();
      expect(title).toBe(fooBarTagGroups[0].name);
      title = await panels[1].getTitle();
      expect(title).toBe(fooBarTagGroups[1].name);
    });

    it('expansion-panel wraps a selection list', async () => {
      // todo getChildLoader doesn't work in this way
      // const expansionPanelHarnesses = await loader.getHarness(MatExpansionPanelHarness);
      // let harnessLoader = await expansionPanelHarnesses.getChildLoader('.mat-expansion-panel-content');
      component.tagGroups = fooBarTagGroups;
      fixture.detectChanges();
      const selectionListHarness = await loader.getHarness(MatSelectionListHarness);
      expect(selectionListHarness).toBeTruthy();
    });

    //////////////////////////////////////////////////////////
    //                   tag groups
    //////////////////////////////////////////////////////////

    it('selection list has 4 options', async () => {
      component.tagGroups = fooBarTagGroups;
      fixture.detectChanges();
      const listOptionHarnesses = await loader.getAllHarnesses(MatListOptionHarness);
      expect(listOptionHarnesses.length).toBe(4);
    });

    it('selection list has list options with tag names', async () => {
      component.tagGroups = fooBarTagGroups;
      fixture.detectChanges();
      const listOptionHarnesses = await loader.getAllHarnesses(MatListOptionHarness);
      let title = await listOptionHarnesses[0].getTitle();
      expect(title).toBe(fooBarTagGroups[0].tags[0].name);
      title = await listOptionHarnesses[1].getTitle();
      expect(title).toBe(fooBarTagGroups[0].tags[1].name);
      title = await listOptionHarnesses[2].getTitle();
      expect(title).toBe(fooBarTagGroups[1].tags[0].name);
      title = await listOptionHarnesses[3].getTitle();
      expect(title).toBe(fooBarTagGroups[1].tags[1].name);
    });

    it('default all list options are deselect', async () => {
      component.tagGroups = fooBarTagGroups;
      fixture.detectChanges();
      const listOptionHarnesses = await loader.getAllHarnesses(MatListOptionHarness);
      let selected;
      for (const listOptionHarness of listOptionHarnesses) {
        selected = await listOptionHarness.isSelected();
        expect(selected).toBe(false);
      }
    });

    //////////////////////////////////////////////////////////
    //                   active tags
    //////////////////////////////////////////////////////////

    it('list options for active tags are selected', async () => {
      component.tagGroups = fooBarTagGroups;
      component.activeTags = [fooBarTagGroups[0].tags[0], fooBarTagGroups[1].tags[1]];
      fixture.detectChanges();
      const listOptionHarnesses = await loader.getAllHarnesses(MatListOptionHarness);
      let selected = await listOptionHarnesses[0].isSelected();
      expect(selected).toBe(true);
      selected = await listOptionHarnesses[1].isSelected();
      expect(selected).toBe(false);
      selected = await listOptionHarnesses[2].isSelected();
      expect(selected).toBe(false);
      selected = await listOptionHarnesses[3].isSelected();
      expect(selected).toBe(true);
    });

    //////////////////////////////////////////////////////////
    //                   user actions
    //////////////////////////////////////////////////////////

    it('select an deselected option emits an "addTagFilterEvent"', async () => {
      spyOn(component.addTagFilterEvent, 'emit');
      component.tagGroups = fooBarTagGroups;
      fixture.detectChanges();
      const listOptionHarnesses = await loader.getAllHarnesses(MatListOptionHarness);
      await listOptionHarnesses[0].select();
      expect(component.addTagFilterEvent.emit).toHaveBeenCalledWith(fooBarTagGroups[0].tags[0]);
    });

    it('select an selected option emits an "removeTagFilterEvent"', async () => {
      spyOn(component.removeTagFilterEvent, 'emit');
      component.tagGroups = fooBarTagGroups;
      component.activeTags = [fooBarTagGroups[0].tags[0]];
      fixture.detectChanges();
      const listOptionHarnesses = await loader.getAllHarnesses(MatListOptionHarness);
      await listOptionHarnesses[0].toggle();
      expect(component.removeTagFilterEvent.emit).toHaveBeenCalledWith(fooBarTagGroups[0].tags[0]);
    });

  });

});

