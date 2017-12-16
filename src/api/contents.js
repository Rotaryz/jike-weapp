import base from './base'

export default class Contents extends base {
  /**
   * 获取商家内容列表
   * @returns {Promise.<void>}
   */
  static async getMerchantContents() {
    const url = `${this.baseUrl}/api/contents/merchant-contents`
    return await this.get(url)
  }
}
