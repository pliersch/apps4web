import { Order } from "@app/common/const/order.constant";

export class PageOptionsDto {

  readonly order?: Order = Order.ASC;

  readonly page: number;

  readonly take: number;


  constructor(page: number, take: number, order?: Order) {
    this.page = page;
    this.take = take;
    this.order = order;
  }

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
