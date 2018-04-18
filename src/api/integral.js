import base from './base'

export default class Integral extends base {
  /**
   * 获取播豆详情 page 页码 limit 默认10个
   * @returns {Promise.<*>}
   */
  static async getIntegralTotal(page, limit = 10) {
    const url = `${this.baseUrl}/api/scores/lists`
    let data = {
      page,
      limit
    }
    return await this.get(url, data)
  }
}
