import base from './base'

export default class Order extends base {
  static async operation(data) {
    const url = `${this.baseUrl}/api/order/operation`
    console.log(url)
    return await this.post(url, data)
  }

  static async produceOrder(data) {
    const url = `${this.baseUrl}/api/order/pay`
    return await this.get(url, data)
  }
}
