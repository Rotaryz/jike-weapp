import base from './base'

export default class Bargain extends base {
  /**
   * 普通砍价列表
   * @param data
   * @returns {Promise<void>}
   */
  static async bargainList(data) {
    const url = `${this.baseUrl}/api/bargain/lists`
    return await this.get(url, data)
  }
  /**
   * 我的砍价列表
   * @param data
   * @returns {Promise<void>}
   */
  static async myBargain(data) {
    const url = `${this.baseUrl}/api/bargain/my-bargain`
    return await this.get(url, data)
  }
  /**
   * 砍价详情
   * @param data
   * @returns {Promise<void>}
   */
  static async bargainDetail(id) {
    const url = `${this.baseUrl}/api/bargain/detail/${id}`
    return await this.get(url)
  }
  /**
   * 砍一刀
   * @param data
   * @returns {Promise<void>}
   */
  static async cutBargain(id) {
    const url = `${this.baseUrl}/api/bargain/cut/${id}`
    return await this.post(url)
  }
  /**
   * 手动关闭未支付订单
   * @param data
   * @returns {Promise<void>}
   */
  static async endOrder(orderSn) {
    const url = `${this.baseUrl}/api/bargain/close-order/${orderSn}`
    return await this.post(url)
  }
}
