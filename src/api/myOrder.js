import base from './base'

export default class RedPacket extends base {
  /**
   * 获取订单数据
   * @param token jk_token
   * @returns {Promise.<*>}
   */
  static async getOrderList(status,page) {
    const url = `${this.baseUrl}/api/order/operation`
    let data = {
      status,
      page
    }
    return await this.get(url, data)
  }
}
