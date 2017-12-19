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

  /**
   * 获取内容详情
   * @param id 内容id
   * @returns {Promise.<*>}
   */
  static async getContentDetail(id) {
    const url = `${this.baseUrl}/api/contents/merchant-contents/${id}`
    return await this.get(url)
  }
}
