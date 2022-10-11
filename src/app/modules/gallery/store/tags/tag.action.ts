import { HttpErrorResponse } from '@angular/common/http';
import { Tag } from "@gallery/store/tags/tag.model";

// load tags
export class LoadTags {
  static readonly type = '[Gallery] Load Tags';
}

export class LoadTagsSuccess {
  static readonly type = '[Gallery] Load Tags success';

  constructor(public tags: Tag[]) {
  }
}

export class LoadTagsFail {
  static readonly type = '[Gallery] Load Tags fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// add tag

export class AddTag {
  static readonly type = '[Gallery] Add Tag';

  constructor(public tag: Tag) {
  }
}

export class AddTagSuccess {
  static readonly type = '[Gallery] Add Tag success';

  constructor(public tag: Tag) {
  }
}

export class AddTagFail {
  static readonly type = '[Gallery] Add Tag fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// update tag

export class UpdateTag {
  static readonly type = '[Gallery] Update Tag';

  constructor(public tag: Tag) {
  }
}

export class UpdateTagSuccess {
  static readonly type = '[Gallery] Update Tag success';

  constructor(public tag: Tag) {
  }
}

export class UpdateTagFail {
  static readonly type = '[Gallery] Update Tag fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// delete tag

export class DeleteTag {
  static readonly type = '[Gallery] Delete Tag';

  constructor(public id: string) {
  }
}

export class DeleteTagSuccess {
  static readonly type = '[Gallery] Delete Tag success';

  constructor(public tag: Tag) {
  }
}

export class DeleteTagFail {
  static readonly type = '[Gallery] Delete Tag fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// active tags

export class AddTagFilter {
  static readonly type = '[Gallery] Add Filter';

  constructor(public filter: string) {
  }
}

export class RemoveTagFilter {
  static readonly type = '[Gallery] Remove Filter';

  constructor(public filter: string) { }
}

export class ClearTagFilter {
  static readonly type = '[Gallery] Clear Filter';

}

// server sent

export class SetNewTagsAvailable {
  static readonly type = '[Gallery] Set New Tags Available';

}
