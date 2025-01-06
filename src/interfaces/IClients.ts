export interface IClients {
  id: number,
  name: string,
  email: string,
  cpf: number,
  zip_code: string,
  city: string,
  neighborhood: number,
  customer_id: string | null,
  status: number
}