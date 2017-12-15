import base from './base'

export default class mySelect extends base {
  /**
   * 获取用户收藏优惠券列表
   * @param token jk_token
   * @returns {Promise.<*>}
   */
  static async getSelectList(page) {
    const url = `${this.baseUrl}/api/info/per_coupons`
    let data = {
      page
    }
    return await this.get(url, data)
  }
  /**
   * 获取单条订单数据
   * @param token jk_token
   * @returns {Promise.<*>}
   */
  static async getOrderDetail(id) {
    const url = `${this.baseUrl}/api/order/operation/${id}`
    return await this.get(url)
  }
}
