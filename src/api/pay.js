import base from './base'

export default class PayOrder extends base {
  /**
   * data
   * @param 线下买单-生成订单
   * @returns {Promise.<*>}
   */
  static async createorder(data) {
    const url = `${this.baseUrl}/api/orders/offline-orders`
    return await this.post(url, data)
  }
}
