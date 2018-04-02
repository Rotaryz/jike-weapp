import base from './base'

export default class Integral extends base {
  /**
   * 获取播豆详情
   * @returns {Promise.<*>}
   */
  static async getIntegralTotal() {
    const url = `${this.baseUrl}/api/scores/lists`
    return await this.get(url)
  }
}
