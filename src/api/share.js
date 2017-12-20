import base from './base'

export default class share extends base {
  /**
   * 获取分享有礼列表
   * @param
   * @returns {Promise.<*>}
   */
  static async getShareAndPrize() {
    const url = `${this.baseUrl}/api/activity/share-index`
    return await this.get(url)
  }
  /**
   * 获取分享有礼详细信息
   * @param
   * @returns {Promise.<*>}
   */
  static async getShareAndPrizeDetail(id) {
    const url = `${this.baseUrl}/api/activity/share-detail`
    let data = {
      share_id: id
    }
    return await this.get(url, data)
  }
}
