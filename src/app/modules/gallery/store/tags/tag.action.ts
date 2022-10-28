import { HttpErrorResponse } from '@angular/common/http';
import { TagCategory } from "@gallery/store/tags/tag.model";

// load tags
export class LoadTags {
  static readonly type = '[Gallery] Load Tags';
}

export class LoadTagsSuccess {
  static readonly type = '[Gallery] Load Tags success';

  constructor(public categories: TagCategory[]) {
  }
}

export class LoadTagsFail {
  static readonly type = '[Gallery] Load Tags fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// add category

export class AddCategory {
  static readonly type = '[Gallery] Add Category';

  constructor(public category: TagCategory) {
  }
}

export class AddCategorySuccess {
  static readonly type = '[Gallery] Add Category success';

  constructor(public category: TagCategory) {
  }
}

export class AddCategoryFail {
  static readonly type = '[Gallery] Add Category fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// update category

export class UpdateCategory {
  static readonly type = '[Gallery] Update Category';

  constructor(public category: TagCategory) {
  }
}

export class UpdateCategorySuccess {
  static readonly type = '[Gallery] Update Category success';

  constructor(public category: TagCategory) {
  }
}

export class UpdateCategoryFail {
  static readonly type = '[Gallery] Update Category fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// delete category

export class DeleteCategory {
  static readonly type = '[Gallery] Delete Category';

  constructor(public id: string) {
  }
}

export class DeleteCategorySuccess {
  static readonly type = '[Gallery] Delete Category success';

  constructor(public category: TagCategory) {
  }
}

export class DeleteCategoryFail {
  static readonly type = '[Gallery] Delete Category fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// server sent

export class SetNewTagsAvailable {
  static readonly type = '[Gallery] Set New Tags Available';

}
