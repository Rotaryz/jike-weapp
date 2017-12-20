import base from './base'

export default class myOrder extends base {
  /**
   * 获取订单数据
   * @param status状态 page页码
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
  /**
   * 获取单条订单数据
   * @param id 订单id
   * @returns {Promise.<*>}
   */
  static async getOrderDetail(id) {
    const url = `${this.baseUrl}/api/order/operation/${id}`
    return await this.get(url)
  }
  /**
   * 申请退款
   * @param token jk_token
   * @returns {Promise.<*>}
   */
  static async orderRebate(id, number, money, cause) {
    const url = `${this.baseUrl}/api/order/refund`
    let data = {
      id,
      number,
      cause,
      money: 1
    }
    return await this.post(url, data)
  }
  /**
   * 查看单条退款详情
   * @param id 订单id
   * @returns {Promise.<*>}
   */
  static async getRefundDetail(id) {
    const url = `${this.baseUrl}/api/order/refund_info`
    let data = {
      id
    }
    return await this.get(url, data)
  }
  /**
   * 查看单条订单优惠券列表
   * @param id 订单id
   * @returns {Promise.<*>}
   */
  static async getOrderCouponList(id) {
    const url = `${this.baseUrl}/api/order/coupon`
    let data = {
      id
    }
    return await this.get(url, data)
  }
  /**
   * 提交评价
   * @param data 评星,评价,印象,订单id,优惠券ID
   * @returns {Promise.<*>}
   */
  static async setAppraise(data) {
    const url = `${this.baseUrl}/api/info/store-appraise`
    return await this.post(url, data)
  }
}
