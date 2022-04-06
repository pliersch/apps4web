import {Tag} from "@gallery/store/tags/tag.model";

export class LoadTags {
  static readonly type = '[Gallery] Load Tags';
}

export class LoadTagsSuccess {
  static readonly type = '[Gallery] Load Tags success';

  constructor(public tags: Tag[]) {
  }
}

export class LoadTagsFail {
  static readonly type = '[Gallery] Load Tags Fail';

  constructor(public error: any) {
  }
}

export class AddTag {
  static readonly type = '[Gallery] Add Tag';
}

export class AddTagSuccess {
  static readonly type = '[Gallery] Add Tag success';

  constructor(public tags: Tag[]) {
  }
}

export class AddTagFail {
  static readonly type = '[Gallery] Add Tag Fail';

  constructor(public error: any) {
  }
}
