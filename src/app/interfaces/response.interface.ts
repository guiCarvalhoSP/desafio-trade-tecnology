export interface IResponseApi {
  get: string,
  parameters: any,
  errors: any,
  results: number,
  paging: {
    current?: number,
    total?: number
  },
}

export interface IMessageApi {
  message: string
}