import { PageOptionsDto } from "@app/common/dto/page-options.dto";

// export interface PageMetaDtoParameters {
//   pageOptionsDto: PageOptionsDto;
//   itemCount: number;
// }

export interface PageMetaDto {
  readonly page: number;

  readonly take: number;

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  // constructor({pageOptionsDto, itemCount}: PageMetaDtoParameters) {
  //   console.log('PageMetaDto constructor: ',)
  //   this.page = pageOptionsDto.page;
  //   this.take = pageOptionsDto.take;
  //   this.itemCount = itemCount;
  //   this.pageCount = Math.ceil(this.itemCount / this.take);
  //   this.hasPreviousPage = this.page > 1;
  //   this.hasNextPage = this.page < this.pageCount;
  // }
}
