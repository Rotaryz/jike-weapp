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
   * 获取用户收藏内容列表
   * @param token jk_token
   * @returns {Promise.<*>}
   */
  static async getContentList(page) {
    const url = `${this.baseUrl}/api/contents/merchant-contents`
    return await this.get(url)
  }
}
