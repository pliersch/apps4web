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
