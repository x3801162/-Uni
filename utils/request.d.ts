declare module '@/utils/request' {
  interface RequestOptions {
    url: string;
    data?: any;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    loading?: boolean;
    responseType?: any;
  }

  /**
   * 带token的请求方法
   * @param url 请求URL
   * @param data 请求数据
   * @param method 请求方法
   * @param loading 是否显示加载中
   * @param responseType 响应类型
   */
  export function request(
    url: string,
    data?: any,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    loading?: boolean,
    responseType?: any
  ): Promise<any>;

  /**
   * 不带token的请求方法（首页用）
   * @param url 请求URL
   * @param data 请求数据
   * @param method 请求方法
   */
  export function request_noToken(
    url: string,
    data?: any,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  ): Promise<any>;
}
