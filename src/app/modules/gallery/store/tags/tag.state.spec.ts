import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import {
  AddTagGroup,
  DeleteTagGroup,
  LoadTags,
  SetNewTagsAvailable,
  UpdateTagGroup
} from "@gallery/store/tags/tag.action";
import { TagService } from "@gallery/services/tag.service";
import { firstValueFrom, of } from "rxjs";
import { getBazTagGroup, getFooBarTagGroups } from "@gallery/store/testing/test.tags";
import { AlertService } from "@app/common/services/alert.service";
import { UpdateTagGroupResultDto } from "@gallery/store/tags/tag.model";
import { clone } from "@app/common/util/obj-utils";
// import { addMatchers } from "@testing/jasmine-matchers";

// beforeEach(addMatchers)

describe('TagState', () => {
  let store: Store;
  let tagServiceMock: jasmine.SpyObj<TagService>;
  const tagServiceSpy = jasmine.createSpyObj('TagService',
    ['getAll', 'createTagGroup', 'updateTagGroup', 'deleteTagGroup']);
  const alertServiceSpy = jasmine.createSpyObj('AlertService',
    ['success', 'info', 'warn', 'error']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TagState], {
        developmentMode: true
      })],
      providers: [{
        provide: TagService,
        useValue: tagServiceSpy
      }, {
        provide: AlertService,
        useValue: alertServiceSpy
      }]
    });
    tagServiceMock = TestBed.inject(TagService) as jasmine.SpyObj<TagService>;
    store = TestBed.inject(Store);
  });

  it('no initial tags exists', () => {
    const empty = store.selectSnapshot(TagState.getTags).length === 0;
    expect(empty).toBe(true);
  });

  describe('actions', () => {

    describe('LoadTags', () => {

      it('loads an array of TagGroup', waitForAsync(async () => {
        tagServiceMock.getAll.and.returnValue(of(getFooBarTagGroups()));
        await firstValueFrom(store.dispatch(new LoadTags()));
        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags.length).toBe(2);
      }));

      it('does not load again until changes available', waitForAsync(async () => {
        let testTags = getFooBarTagGroups();
        tagServiceMock.getAll.and.returnValue(of(testTags));
        await firstValueFrom(store.dispatch(new LoadTags()));

        testTags = [...testTags, ...testTags]
        tagServiceMock.getAll.and.returnValue(of(testTags));
        await firstValueFrom(store.dispatch(new LoadTags()));

        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags.length).toBe(2);
      }));

    });

    describe('SetNewTagsAvailable', () => {

      it('re-loads tags', waitForAsync(async () => {
        const existingGroups = getFooBarTagGroups();
        const copy = clone(existingGroups);
        tagServiceMock.getAll.and.returnValue(of(existingGroups));
        await firstValueFrom(store.dispatch(new LoadTags()));
        const expectation = [...copy, getBazTagGroup()];

        tagServiceMock.getAll.and.returnValue(of(expectation));
        await firstValueFrom(store.dispatch(new SetNewTagsAvailable()));

        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags.length).toBe(3);
      }));

    });

    describe('AddTagGroup', () => {

      it('add new group to state', waitForAsync(async () => {
        const tagGroups = getFooBarTagGroups();
        tagServiceMock.getAll.and.returnValue(of(tagGroups));
        await firstValueFrom(store.dispatch(new LoadTags()));

        const newTagGroup = getBazTagGroup();
        tagServiceMock.createTagGroup.and.returnValue(of(newTagGroup));
        await firstValueFrom(store.dispatch(new AddTagGroup(null!)));

        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags.length).toBe(3);
      }));


    });

    describe('UpdateTagGroup', () => {

      it('update the name of a group', waitForAsync(async () => {
        const bazTagGroup = getBazTagGroup();
        tagServiceMock.getAll.and.returnValue(of([bazTagGroup]));
        await firstValueFrom(store.dispatch(new LoadTags()));

        const nameUpdate: UpdateTagGroupResultDto = {id: 'groupBaz', name: 'Foobar'};
        tagServiceMock.updateTagGroup.and.returnValue(of(nameUpdate));
        await firstValueFrom(store.dispatch(new UpdateTagGroup(null!)));

        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags[0].name).toBe('Foobar');
      }));

      it('add tags to a group', waitForAsync(async () => {
        const bazTagGroup = getBazTagGroup();
        tagServiceMock.getAll.and.returnValue(of([bazTagGroup]));
        await firstValueFrom(store.dispatch(new LoadTags()));

        const tagsUpdate: UpdateTagGroupResultDto =
          {
            id: 'groupBaz',
            addedTags: [{
              id: 'new',
              name: 'New'
            }]
          };
        tagServiceMock.updateTagGroup.and.returnValue(of(tagsUpdate));
        await firstValueFrom(store.dispatch(new UpdateTagGroup(null!)));

        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags).toContain({
          id: 'groupBaz',
          name: 'Baz',
          priority: 20,
          tags:
            [{
              id: 'baz1',
              name: 'Baz1'
            }, {
              id: 'new',
              name: 'New'
            }]
        });
      }));

      it('remove tags from a group', waitForAsync(async () => {
        const bazTagGroup = getBazTagGroup();
        tagServiceMock.getAll.and.returnValue(of([bazTagGroup]));
        await firstValueFrom(store.dispatch(new LoadTags()));

        const tagsUpdate: UpdateTagGroupResultDto =
          {
            id: 'groupBaz',
            removedTagIds: ['baz1']
          };
        tagServiceMock.updateTagGroup.and.returnValue(of(tagsUpdate));
        await firstValueFrom(store.dispatch(new UpdateTagGroup(null!)));

        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags).toContain({
          id: 'groupBaz',
          name: 'Baz',
          priority: 20,
          tags: []
        });
      }));

    });

    describe('DeleteTagGroup', () => {

      it('remove a group from state', waitForAsync(async () => {
        const tagGroup = getBazTagGroup();
        tagServiceMock.getAll.and.returnValue(of([tagGroup]));
        await firstValueFrom(store.dispatch(new LoadTags()));

        tagServiceMock.deleteTagGroup.and.returnValue(of(tagGroup));
        await firstValueFrom(store.dispatch(new DeleteTagGroup('groupBaz')));

        const tags = store.selectSnapshot(TagState.getTagGroups);
        expect(tags.length).toBe(0);
      }));


    });
  });
});
