import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { Tag } from './tag.model';
import * as TagActions from './tag.actions';

// export const tagsFeatureKey = 'tags';

// export interface State extends EntityState<Tag> {
//   // additional entities state properties
// }

export const adapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const initialState: EntityState<Tag> = adapter.getInitialState({
  // additional entity state properties
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const tagReducer = createReducer(
  initialState,
  on(TagActions.loadTagsSuccess,
    (state, action) => adapter.setAll(action.tags, state)
  ),
  on(TagActions.addTagSuccess,
    (state, action) => adapter.addOne(action.tag, state)
    // (state, action) => adapter.addOne(log(action.tag), state)
  ),
  on(TagActions.updateTagSuccess,
    // (state, action) => adapter.updateOne(action.tag, state)
    (state, action) => adapter.updateOne(logUpdate(action.tagUpdate), state)
  ),
  // on(TagActions.addTags,
  //   (state, action) => adapter.addMany(action.tags, state)
  // ),
  // on(TagActions.setTag,
  //   (state, action) => adapter.setOne(log(action.tag), state)
  // ),
  // on(TagActions.updateTags,
  //   (state, action) => adapter.updateMany(action.tags, state)
  // ),
  on(TagActions.deleteTag,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  // on(TagActions.deleteTags,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  // on(TagActions.clearTags,
  //   state => adapter.removeAll(state)
  // )
);

function log(tag: Tag): Tag {
  console.log('reducer#logger', tag);
  return tag;
}

function logUpdate(tag: Update<Tag>): Update<Tag> {
  // console.log('reducer#logUpdate', tag);
  return tag;
}
