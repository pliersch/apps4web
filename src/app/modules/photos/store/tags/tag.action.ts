import { HttpErrorResponse } from '@angular/common/http';
import {
  CreteTagGroupDto,
  TagGroup,
  UpdateTagGroupDto,
  UpdateTagGroupResultDto
} from "@modules/photos/store/tags/tag.model";

// load tags
export class LoadTags {
  static readonly type = '[Photos] Load Tags';
}

export class LoadTagsSuccess {
  static readonly type = '[Photos] Load Tags success';

  constructor(public groups: TagGroup[]) {
  }
}

export class LoadTagsFail {
  static readonly type = '[Photos] Load Tags fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// add

export class AddTagGroup {
  static readonly type = '[Photos] Add TagGroup';

  constructor(public dto: CreteTagGroupDto) {
  }
}

export class AddTagGroupSuccess {
  static readonly type = '[Photos] Add TagGroup success';

  constructor(public tagGroup: TagGroup) {
  }
}

export class AddTagGroupFail {
  static readonly type = '[Photos] Add TagGroup fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// update

export class UpdateTagGroup {
  static readonly type = '[Photos] Update TagGroup';

  constructor(public dto: UpdateTagGroupDto) {
  }
}

export class UpdateTagGroupSuccess {
  static readonly type = '[Photos] Update TagGroup success';

  constructor(public dto: UpdateTagGroupResultDto) {
  }
}

export class UpdateTagGroupFail {
  static readonly type = '[Photos] Update TagGroup fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// delete

export class DeleteTagGroup {
  static readonly type = '[Photos] Delete TagGroup';

  constructor(public id: string) {
  }
}

export class DeleteTagGroupSuccess {
  static readonly type = '[Photos] Delete TagGroup success';

  constructor(public id: string) {
  }
}

export class DeleteTagGroupFail {
  static readonly type = '[Photos] Delete TagGroup fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// server sent

export class SetNewTagsAvailable {
  static readonly type = '[Photos] Set New Tags Available';

}
