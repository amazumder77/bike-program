interface ErrorObj {
  code?: string;
  message?: string;
  detail?: string;
  trid?: number;
}

export interface Response<T> {
  data?: T;
  error?: ErrorObj;
}
