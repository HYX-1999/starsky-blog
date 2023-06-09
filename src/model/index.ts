/**
 * 分页参数
 */
export interface PageQuery {
	/**
	 * 当前页
	 */
	current: number
	/**
	 * 每页大小
	 */
	size: number
}

/**
 * 结果返回接口
 */
export interface Result<T = any> {
  /**
   * 返回状态
   */
  success: boolean;
  /**
   * 状态码
   */
  code: number;
  /**
   * 返回信息
   */
  msg: string;
  /**
   * 返回数据
   */
  data?: T;
}

/**
 * 分页返回接口
 */
export interface PageResult<T> {
  /**
   * 分页结果
   */
  records: T;
  /**
   * 总数
   */
  total: number;
  /**
   * 当前页数
   */
  current: number;
  /**
   * 每页个数
   */
  size: number;
}
