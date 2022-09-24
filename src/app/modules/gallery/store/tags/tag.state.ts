import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Tag } from "@gallery/store/tags/tag.model";
import { Injectable } from "@angular/core";
import * as tagActions from "@gallery/store/tags/tag.action";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { TagService } from "@gallery/services/tag.service";
import { AlertService } from "@app/services/alert.service";

export interface TagStateModel {
  tags: Tag[];
  activeTags: string[];
  allTagsLoaded: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<TagStateModel>({
  name: 'tags',
  defaults: {
    tags: [],
    activeTags: [/*'Fuck'*/],
    allTagsLoaded: false,
    loaded: false,
    loading: false
  }
})

@Injectable()
export class TagState {

  @Selector()
  static getTags(state: TagStateModel): Tag[] {
    const copy: Tag[] = state.tags.slice(0);
    return copy.sort((tag1, tag2) => {
      if (tag1.priority > tag2.priority) {
        return 1;
      }
      if (tag1.priority < tag2.priority) {
        return -1;
      }
      return 0;
    });
  }

  @Selector()
  static getActiveTags(state: TagStateModel): string[] {
    return state.activeTags;
  }

  constructor(private tagService: TagService,
              private alertService: AlertService) {
  }

  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(tagActions.LoadTags)
  loadTags(ctx: StateContext<TagStateModel>, action: tagActions.LoadTags): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.tagService.getAll()
      .pipe(
        map((tags: Tag[]) =>
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
    patchState({tags: action.tags, loaded: true, loading: false});
  }

  @Action(tagActions.LoadTagsFail)
  loadTagsFail({dispatch}: StateContext<TagStateModel>, action: tagActions.LoadTagsFail): void {
    // TODO handle error!
    console.log(action.error)
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  @Action(tagActions.AddTag)
  addTag(ctx: StateContext<TagStateModel>, action: tagActions.AddTag): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.tagService.create(action.tag)
      .pipe(
        map((tag: Tag) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.AddTagSuccess(tag))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.AddTagFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.AddTagSuccess)
  addTagSuccess(ctx: StateContext<TagStateModel>, action: tagActions.AddTagSuccess): void {
    const state = ctx.getState();
    const tags: Tag[] = [...state.tags, action.tag]
    ctx.patchState({tags: tags, loaded: true, loading: false});
  }

  @Action(tagActions.AddTagFail)
  addTagFail({dispatch}: StateContext<TagStateModel>, action: tagActions.AddTagFail): void {
    this.alertService.error('Add tag fail');
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          update
  //////////////////////////////////////////////////////////

  @Action(tagActions.UpdateTag)
  updateTag(ctx: StateContext<TagStateModel>, action: tagActions.UpdateTag): Observable<Subscription> {
    return this.tagService.update(action.tag.id!, {entries: action.tag.entries})
      .pipe(
        map((res: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.UpdateTagSuccess(action.tag))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.UpdateTagFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.UpdateTagSuccess)
  updateTagSuccess(ctx: StateContext<TagStateModel>, action: tagActions.UpdateTagSuccess): void {
    // const state = ctx.getState();
    // let tags: Tag[] = [...state.tags, action.tag]
    // ctx.patchState({tags: tags, loaded: true, loading: false});

    ctx.setState(
      patch({
        tags: updateItem<Tag>(tag => tag!.id === action.tag.id,
          patch({entries: action.tag.entries}))
      })
    );
  }

  @Action(tagActions.UpdateTagFail)
  updateTagFail({dispatch}: StateContext<TagStateModel>, action: tagActions.UpdateTagFail): void {
    this.alertService.error('Update tag fail');
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(tagActions.DeleteTag)
  deleteTags(ctx: StateContext<TagStateModel>, action: tagActions.DeleteTag): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.tagService.delete(action.id)
      .pipe(
        map((tag: Tag) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.DeleteTagSuccess(tag))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.DeleteTagFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.DeleteTagSuccess)
  deleteTagsSuccess({patchState}: StateContext<TagStateModel>, action: tagActions.DeleteTagSuccess): void {
    console.log('TagState loadTagsSuccess: BUT NOT IMPL !!!', action.tag)
    // patchState({tags: action.tags, loaded: true, loading: false});
  }

  @Action(tagActions.LoadTagsFail)
  deleteTagsFail({dispatch}: StateContext<TagStateModel>, action: tagActions.LoadTagsFail): void {
    // TODO handle error!
    console.log(action.error)
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          filter photos
  //////////////////////////////////////////////////////////

  @Action(tagActions.AddTagFilter)
  addFilter(ctx: StateContext<TagStateModel>, action: tagActions.AddTagFilter): void {
    ctx.setState(
      patch({
        activeTags: append([action.filter])
      })
    );
    // let filters = [];
    // filters.push(action.filter);
    // ctx.patchState({tagFilter: filters});
  }

  @Action(tagActions.RemoveTagFilter)
  removeFilter(ctx: StateContext<TagStateModel>, action: tagActions.RemoveTagFilter): void {
    ctx.setState(
      patch({
        activeTags: removeItem<string>(name => name === action.filter)
      })
    );
  }

  @Action(tagActions.ClearTagFilter)
  clearFilter(ctx: StateContext<TagStateModel>, action: tagActions.ClearTagFilter): void {
    ctx.patchState({activeTags: []});
  }

}
