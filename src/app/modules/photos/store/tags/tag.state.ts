import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { TagService } from "@modules/photos/services/tag.service";
import { PhotoStateModel } from "@modules/photos/store/photos/photo.state";
import * as tagActions from "@modules/photos/store/tags/tag.action";
import { Tag, TagGroup, UpdateTagGroupResultDto } from "@modules/photos/store/tags/tag.model";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface TagStateModel {
  tagGroups: TagGroup[];
  newDataAvailable: boolean,
}

@State<TagStateModel>({
  name: 'Tag',
  defaults: {
    tagGroups: [],
    newDataAvailable: true,
  }
})

@Injectable()
export class TagState {

  constructor(private tagService: TagService,
              private alertService: AlertService) {
  }

  @Selector()
  static getTagGroups(state: TagStateModel): TagGroup[] {
    return state.tagGroups;
  }

  @Selector()
  static getTags(state: TagStateModel): Tag[] {
    const tags: Tag[] = [];
    for (const tagGroup of state.tagGroups) {
      tags.push(...tagGroup.tags);
    }
    return tags;
  }

  // region load
  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(tagActions.LoadTags)
  loadTags(ctx: StateContext<TagStateModel>): Observable<Subscription> {
    const state = ctx.getState();
    if (!state.newDataAvailable) {
      return of(Subscription.EMPTY);
    }
    return this.tagService.getAll()
      .pipe(
        map((tags: TagGroup[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.LoadTagsSuccess(tags))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.LoadTagsFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.LoadTagsSuccess)
  loadTagsSuccess({patchState}: StateContext<TagStateModel>, action: tagActions.LoadTagsSuccess): void {
    const sortedTagGroups: TagGroup[] =
      action.groups.sort((group1, group2) => {
        return (group1.priority > group2.priority) ? 1 : -1;
      });
    for (const group of sortedTagGroups) {
      group.tags = group.tags.sort((t1: Tag, t2: Tag) => t1.name.localeCompare(t2.name));
    }
    patchState({tagGroups: sortedTagGroups, newDataAvailable: false});
  }

  @Action(tagActions.LoadTagsFail)
  loadTagsFail(): void {
    this.alertService.error('Load tags fail');
  }

  // endregion

  // region server sent
  //////////////////////////////////////////////////////////
  //          server sent new tags available
  //////////////////////////////////////////////////////////

  @Action(tagActions.SetNewTagsAvailable)
  setNewTagsAvailable(ctx: StateContext<PhotoStateModel>): void {
    ctx.patchState({
      newDataAvailable: true
    });
    ctx.dispatch(new tagActions.LoadTags())
  }

// endregion

  // region add
  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  @Action(tagActions.AddTagGroup)
  addGroup(ctx: StateContext<TagStateModel>, action: tagActions.AddTagGroup): Observable<Subscription> {
    return this.tagService.createTagGroup(action.dto)
      .pipe(
        map((tag: TagGroup) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.AddTagGroupSuccess(tag))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.AddTagGroupFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.AddTagGroupSuccess)
  addGroupSuccess(ctx: StateContext<TagStateModel>, action: tagActions.AddTagGroupSuccess): void {
    const state = ctx.getState();
    const tags: TagGroup[] = [...state.tagGroups, action.tagGroup]
    ctx.patchState({tagGroups: tags});
  }

  @Action(tagActions.AddTagGroupFail)
  addGroupFail(): void {
    this.alertService.error('Add group fail');
  }

  // endregion

  // region update
  //////////////////////////////////////////////////////////
  //          update
  //////////////////////////////////////////////////////////

  @Action(tagActions.UpdateTagGroup)
  updateGroup(ctx: StateContext<TagStateModel>, action: tagActions.UpdateTagGroup): Observable<Subscription> {
    return this.tagService.updateTagGroup(action.dto)
      .pipe(
        map((res: UpdateTagGroupResultDto) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.UpdateTagGroupSuccess(res))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.UpdateTagGroupFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.UpdateTagGroupSuccess)
  updateGroupSuccess(ctx: StateContext<TagStateModel>, action: tagActions.UpdateTagGroupSuccess): void {
    const state = ctx.getState();
    const dto = action.dto;
    const patchObj: Partial<TagGroup> = {};
    const tagGroup = state.tagGroups.find(c => c.id === dto.id)!;
    if (dto.name) {
      patchObj.name = dto.name;
    }
    const removedTagIds = dto.removedTagIds || [];
    const result: Tag[] = tagGroup.tags.filter(tag => !removedTagIds.includes(tag.id));
    const addedTags = dto.addedTags || [];
    result.push(...addedTags)
    patchObj.tags = result;
    ctx.setState(
      patch({
        tagGroups: updateItem<TagGroup>(tag => tag!.id === dto.id,
          patch(patchObj))
      })
    );
  }

  @Action(tagActions.UpdateTagGroupFail)
  updateGroupFail(): void {
    this.alertService.error('Update tag fail');
  }

  // endregion

  // region delete
  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(tagActions.DeleteTagGroup)
  deleteGroup(ctx: StateContext<TagStateModel>, action: tagActions.DeleteTagGroup): Observable<Subscription> {
    return this.tagService.deleteTagGroup(action.id)
      .pipe(
        map((result: DeleteResult) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.DeleteTagGroupSuccess(action.id))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.DeleteTagGroupFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.DeleteTagGroupSuccess)
  deleteGroupSuccess(ctx: StateContext<TagStateModel>, action: tagActions.DeleteTagGroupSuccess): void {
    ctx.setState(
      patch({
        tagGroups: removeItem<TagGroup>(group => group!.id === action.id),
      })
    );
  }

  @Action(tagActions.DeleteTagGroupFail)
  deleteGroupFail(): void {
    this.alertService.error('Delete TagGroup fail');
  }

  //endregion

}
