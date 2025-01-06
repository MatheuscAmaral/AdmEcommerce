export interface IOrders {
  [x: string]: any;
  order_id: number,
  total: number,
  discounts: number,
  client_id: number,
  shipping_cost: number,
  payment_method: number,
  zip_code: string,
  street: string,
  city: string,
  invoice_id: string,
  uf: string,
  number: number,
  neighborhood: number,
  status: number
}