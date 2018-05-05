import base from './base'

export default class Merchants extends base {
  /**
   * 获取广场商家列表
   * @returns {Promise.<*>}
   */
  static async getPlazaMerchants() {
    const url = `${this.baseUrl}/api/merchants/plaza-merchants`
    return await this.get(url)
  }
  /**
   * 获取广场商家列表new
   * @returns {Promise.<*>}
   */
  static async getPlazaMerchantsNew() {
    const url = `${this.baseUrl}/api/merchants/plaza/merchants`
    return await this.get(url)
  }

  /**
   * 获取商家详情
   * @param id  商家Id
   * @returns {Promise.<*>}
   */
  static async getMerchantsDetail(id) {
    const url = `${this.baseUrl}/api/merchants/plaza-merchants-show/${id}`
    return await this.get(url)
  }
  /**
   * 获取商家详情new
   * @param id  商家Id
   * @returns {Promise.<*>}
   */
  static async getMerchantsDetailNew(id) {
    const url = `${this.baseUrl}/api/merchants/plaza/merchants-show/${id}`
    return await this.get(url)
  }
  /**
   * 获取推荐商家详情
   * @param id  商家Id
   * @returns {Promise.<*>}
   */
  static async getMerchantsStatus(id, data, loading) {
    const url = `${this.baseUrl}/api/merchants/show-merchant/${id}`
    return await this.get(url, data, loading)
  }

  /**
   * 获取推荐商家礼包(全部)
   * @param id  商家Id
   * @returns {Promise.<*>}
   */
  static async getGiftBags(id, data, loading) {
    const url = `${this.baseUrl}/api/merchants/show-gift-bag/${id}`
    return await this.get(url, data, loading)
  }

  /**
   * 获取推荐商家优惠券列表(分页)
   * @param id  商家Id
   * @returns {Promise.<*>}
   */
  static async getCoupons(id, data, loading) {
    const url = `${this.baseUrl}/api/merchants/show-promotion/${id}`
    return await this.get(url, data, loading)
  }

  /**
   * 保存浏览记录
   * @param data
   * @returns {Promise.<*>}
   */
  static async saveLog(data, loading = true) {
    const url = `${this.baseUrl}/api/merchants/save-log`
    return await this.post(url, data, loading)
  }

  /**
   * 商家信息
   * @param data
   * @returns {Promise.<*>}
   */
  static async showShop(id) {
    const url = `${this.baseUrl}/api/merchants/merchants-data/${id}`
    return await this.get(url, '', false)
  }

  /**
   * 优惠券详情
   * @param data
   * @returns {Promise.<*>}
   */
  static async coupons(id, data) {
    const url = `${this.baseUrl}/api/merchants/coupons/${id}`
    return await this.get(url, data)
  }
}
