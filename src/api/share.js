import base from './base'

export default class share extends base {
  /**
   * 获取分享有礼详细信息
   * @param
   * @returns {Promise.<*>}
   */
  static async getShareAndPrizeDetail(data) {
    const url = `${this.baseUrl}/api/activity/share`
    return await this.get(url, data)
  }

  static async getSharePrize(data) {
    const url = `${this.baseUrl}/api/activity/share-prize`
    return await this.get(url, data)
  }

  /**
   * 分享后获取播豆
   * @param
   * @returns {Promise.<*>}
   */
  static async getShareSoya(source, id) {
    let data = {
      order_id: id
    }
    const url = `${this.baseUrl}/api/scores/add-score?source=${source}`
    return await this.get(url, data)
  }
}
