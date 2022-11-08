import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Tag, TagGroup, UpdateTagGroupResultDto } from "@gallery/store/tags/tag.model";
import { Injectable } from "@angular/core";
import * as tagActions from "@gallery/store/tags/tag.action";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { patch, updateItem } from "@ngxs/store/operators";
import { TagService } from "@gallery/services/tag.service";
import { AlertService } from "@app/common/services/alert.service";
import { PhotoStateModel } from "@gallery/store/photos/photo.state";

export interface TagStateModel {
  tagGroups: TagGroup[];
  loaded: boolean;
  loading: boolean;
  newDataAvailable: boolean,
}

@State<TagStateModel>({
  name: 'TagState',
  defaults: {
    tagGroups: [],
    loaded: false,
    loading: false,
    newDataAvailable: true,
  }
})

@Injectable()
export class TagState {

  @Selector()
  static getTagGroups(state: TagStateModel): TagGroup[] {
    return state.tagGroups;
  }

  constructor(private tagService: TagService,
              private alertService: AlertService) {
  }

  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(tagActions.LoadTags)
  loadTags(ctx: StateContext<TagStateModel>): Observable<Subscription> {
    const state = ctx.getState();
    if (!state.newDataAvailable) {
      return of(Subscription.EMPTY);
    }
    ctx.patchState({loading: true});
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
    patchState({tagGroups: sortedTagGroups, loaded: true, loading: false, newDataAvailable: false});
  }

  @Action(tagActions.LoadTagsFail)
  loadTagsFail({dispatch}: StateContext<TagStateModel>): void {
    this.alertService.error('Load tags fail');
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          server sent new tags available
  //////////////////////////////////////////////////////////

  @Action(tagActions.SetNewTagsAvailable)
  setNewTagsAvailable(ctx: StateContext<PhotoStateModel>): void {
    console.log('TagState setNewTagsAvailable: ',)
    ctx.patchState({
      newDataAvailable: true
    });
    // todo: only dispatch when inside gallery
    ctx.dispatch(new tagActions.LoadTags())
  }


  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  @Action(tagActions.AddTagGroup)
  addGroup(ctx: StateContext<TagStateModel>, action: tagActions.AddTagGroup): Observable<Subscription> {
    ctx.patchState({loading: true});
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
    ctx.patchState({tagGroups: tags, loaded: true, loading: false});
  }

  @Action(tagActions.AddTagGroupFail)
  addGroupFail(action: tagActions.AddTagGroupFail): void {
    this.alertService.error('Add tag fail');
    console.log('TagState addGroupFail: ', action.error)
  }

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
    // console.log('TagState updateGroupSuccess: ', action.dto)
    const state = ctx.getState();
    const tagGroup = state.tagGroups.find(c => c.id === action.dto.id)!;
    const removedTagIds = action.dto.removedTagIds || [];
    const result: Tag[] = tagGroup.tags.filter(tag => !removedTagIds.includes(tag.id));
    const addedTags = action.dto.addedTags || [];
    result.push(...addedTags)
    ctx.setState(
      patch({
        tagGroups: updateItem<TagGroup>(tag => tag!.id === action.dto.id,
          patch({tags: result}))
      })
    );
  }

  @Action(tagActions.UpdateTagGroupFail)
  updateGroupFail(action: tagActions.UpdateTagGroupFail): void {
    console.log('TagState updateGroupFail: ', action.error)
    this.alertService.error('Update tag fail');
  }

  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(tagActions.DeleteTagGroup)
  deleteGroup(ctx: StateContext<TagStateModel>, action: tagActions.DeleteTagGroup): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.tagService.deleteTagGroup(action.id)
      .pipe(
        map((tag: TagGroup) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.DeleteTagGroupSuccess(tag))
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
  deleteGroupSuccess({patchState}: StateContext<TagStateModel>, action: tagActions.DeleteTagGroupSuccess): void {
    console.log('TagState loadTagsSuccess: BUT NOT IMPL !!!', action.tagGroup)
    // TODO !!!
    // patchState({tags: action.tags, loaded: true, loading: false});
  }

  @Action(tagActions.DeleteTagGroupFail)
  deleteGroupFail(action: tagActions.DeleteTagGroupFail): void {
    this.alertService.error('Delete tag fail');
    console.log('TagState deleteGroupFail: ', action.error)
  }

}
