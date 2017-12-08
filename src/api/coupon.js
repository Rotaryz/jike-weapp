import base from './base'

export default class Coupon extends base {
  /**
   * 获取商家优惠券列表
   * @param merchantId 商家Id
   * @returns {Promise.<*>}
   */
  static async getShopCouponList(merchantId) {
    const url = `${this.baseUrl}/api/merchants/show-merchant/${merchantId}`
    return await this.get(url)
  }

  /**
   * 获取商家优惠券详情
   * @param merchantId 优惠券Id
   * @returns {Promise.<*>}
   */
  static async getShopCouponDetail(couponId) {
    const url = `${this.baseUrl}/api/merchants/coupons/${couponId}`
    return await this.get(url)
  }
}
