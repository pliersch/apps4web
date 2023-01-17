import { HttpErrorResponse } from '@angular/common/http';
import {
  CreteTagGroupDto,
  TagGroup,
  UpdateTagGroupDto,
  UpdateTagGroupResultDto
} from "@gallery/store/tags/tag.model";

// load tags
export class LoadTags {
  static readonly type = '[Gallery] Load Tags';
}

export class LoadTagsSuccess {
  static readonly type = '[Gallery] Load Tags success';

  constructor(public groups: TagGroup[]) {
  }
}

export class LoadTagsFail {
  static readonly type = '[Gallery] Load Tags fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// add

export class AddTagGroup {
  static readonly type = '[Gallery] Add TagGroup';

  constructor(public dto: CreteTagGroupDto) {
  }
}

export class AddTagGroupSuccess {
  static readonly type = '[Gallery] Add TagGroup success';

  constructor(public tagGroup: TagGroup) {
  }
}

export class AddTagGroupFail {
  static readonly type = '[Gallery] Add TagGroup fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// update

export class UpdateTagGroup {
  static readonly type = '[Gallery] Update TagGroup';

  constructor(public dto: UpdateTagGroupDto) {
  }
}

export class UpdateTagGroupSuccess {
  static readonly type = '[Gallery] Update TagGroup success';

  constructor(public dto: UpdateTagGroupResultDto) {
  }
}

export class UpdateTagGroupFail {
  static readonly type = '[Gallery] Update TagGroup fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// delete

export class DeleteTagGroup {
  static readonly type = '[Gallery] Delete TagGroup';

  constructor(public id: string) {
  }
}

export class DeleteTagGroupSuccess {
  static readonly type = '[Gallery] Delete TagGroup success';

  constructor(public id: string) {
  }
}

export class DeleteTagGroupFail {
  static readonly type = '[Gallery] Delete TagGroup fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// server sent

export class SetNewTagsAvailable {
  static readonly type = '[Gallery] Set New Tags Available';

}
