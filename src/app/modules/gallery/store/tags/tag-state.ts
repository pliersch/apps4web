import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Tag} from "@gallery/store/tags/tag.model";
import {Injectable} from "@angular/core";
import {TagService} from "@gallery/store/tags/tag.service";
import * as tagActions from "@gallery/store/tags/tag-action";
import {asapScheduler, Observable, of, Subscription} from "rxjs";
import {catchError, map} from "rxjs/operators";

export interface TagStateModel {
  tags: Tag[];
  allTagsLoaded: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<TagStateModel>({
  name: 'tags',
  defaults: {
    tags: [],
    allTagsLoaded: false,
    loaded: false,
    loading: false
  }
})

@Injectable()
export class TagState {

  @Selector()
  static getTags(state: TagStateModel): Tag[] {
    return state.tags;
  }

  constructor(private tagService: TagService) {
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
    console.log('TagState loadTagsSuccess: ', action.tags)
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

  @Action(tagActions.DeleteTagSuccess)
  addTagSuccess({patchState}: StateContext<TagStateModel>, action: tagActions.DeleteTagSuccess): void {
    console.log('TagState loadTagsSuccess: BUT NOT IMPL !!!', action.tag)
    // patchState({tags: action.tags, loaded: true, loading: false});
  }

  @Action(tagActions.LoadTagsFail)
  addTagFail({dispatch}: StateContext<TagStateModel>, action: tagActions.LoadTagsFail): void {
    // TODO handle error!
    console.log(action.error)
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

}