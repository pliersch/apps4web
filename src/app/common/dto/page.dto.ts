import { PageMetaDto } from "@app/common/dto/page-meta.dto";

export class PageDto<T> {
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
