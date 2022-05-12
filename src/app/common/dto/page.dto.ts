export class PageDto<T> {
  readonly data: T[];

  readonly meta: any/*PageMetaDto*/;

  constructor(data: T[], meta: any/*PageMetaDto*/) {
    this.data = data;
    this.meta = meta;
  }
}
