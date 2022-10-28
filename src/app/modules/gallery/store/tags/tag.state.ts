import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Tag, TagCategory } from "@gallery/store/tags/tag.model";
import { Injectable } from "@angular/core";
import * as tagActions from "@gallery/store/tags/tag.action";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { patch, updateItem } from "@ngxs/store/operators";
import { TagService } from "@gallery/services/tag.service";
import { AlertService } from "@app/common/services/alert.service";
import { PhotoStateModel } from "@gallery/store/photos/photo.state";

export interface TagStateModel {
  categories: TagCategory[];
  allTagsLoaded: boolean;
  loaded: boolean;
  loading: boolean;
  newDataAvailable: boolean,
}

@State<TagStateModel>({
  name: 'TagState',
  defaults: {
    categories: [],
    allTagsLoaded: false,
    loaded: false,
    loading: false,
    newDataAvailable: true,
  }
})

@Injectable()
export class TagState {

  @Selector()
  static getTagCategories(state: TagStateModel): TagCategory[] {
    return state.categories;
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
        map((tags: TagCategory[]) =>
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
    const sortedTags: TagCategory[] = action.categories.sort((tag1, tag2) => {
      return (tag1.priority > tag2.priority) ? 1 : -1;
    });
    for (const tag of sortedTags) {
      tag.entries = tag.entries.sort((e1: Tag, e2: Tag) => e1.name.localeCompare(e2.name));
    }
    patchState({categories: sortedTags, loaded: true, loading: false, newDataAvailable: false});
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

  @Action(tagActions.AddCategory)
  addTag(ctx: StateContext<TagStateModel>, action: tagActions.AddCategory): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.tagService.create(action.category)
      .pipe(
        map((tag: TagCategory) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.AddCategorySuccess(tag))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.AddCategoryFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.AddCategorySuccess)
  addTagSuccess(ctx: StateContext<TagStateModel>, action: tagActions.AddCategorySuccess): void {
    const state = ctx.getState();
    const tags: TagCategory[] = [...state.categories, action.category]
    ctx.patchState({categories: tags, loaded: true, loading: false});
  }

  @Action(tagActions.AddCategoryFail)
  addTagFail({dispatch}: StateContext<TagStateModel>, action: tagActions.AddCategoryFail): void {
    this.alertService.error('Add tag fail');
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          update
  //////////////////////////////////////////////////////////

  @Action(tagActions.UpdateCategory)
  updateTag(ctx: StateContext<TagStateModel>, action: tagActions.UpdateCategory): Observable<Subscription> {
    return this.tagService.update(action.category.id!, {entries: action.category.entries})
      .pipe(
        map((res: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.UpdateCategorySuccess(action.category))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.UpdateCategoryFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.UpdateCategorySuccess)
  updateTagSuccess(ctx: StateContext<TagStateModel>, action: tagActions.UpdateCategorySuccess): void {
    ctx.setState(
      patch({
        categories: updateItem<TagCategory>(tag => tag!.id === action.category.id,
          patch({entries: action.category.entries}))
      })
    );
  }

  @Action(tagActions.UpdateCategoryFail)
  updateTagFail({dispatch}: StateContext<TagStateModel>, action: tagActions.UpdateCategoryFail): void {
    this.alertService.error('Update tag fail');
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(tagActions.DeleteCategory)
  deleteTags(ctx: StateContext<TagStateModel>, action: tagActions.DeleteCategory): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.tagService.delete(action.id)
      .pipe(
        map((tag: TagCategory) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new tagActions.DeleteCategorySuccess(tag))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new tagActions.DeleteCategoryFail(error))
            )
          )
        )
      );
  }

  @Action(tagActions.DeleteCategorySuccess)
  deleteTagsSuccess({patchState}: StateContext<TagStateModel>, action: tagActions.DeleteCategorySuccess): void {
    console.log('TagState loadTagsSuccess: BUT NOT IMPL !!!', action.category)
    // TODO !!!
    // patchState({tags: action.tags, loaded: true, loading: false});
  }

  @Action(tagActions.DeleteCategoryFail)
  deleteTagsFail({dispatch}: StateContext<TagStateModel>, action: tagActions.DeleteCategoryFail): void {
    this.alertService.error('Delete tag fail');
    dispatch({loaded: false, loading: false});
  }

}
