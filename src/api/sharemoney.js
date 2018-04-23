/**
 * Created by zx on 2018/4/21.
 */
import base from './base'

export default class shareMoney extends base {
  /**
   * 分享活动列表
   * @param data
   * @returns {Promise.<*>}
   */
  static async shareList(data, loading = true) {
    const url = `${this.baseUrl}/api/sharemoney/act-list`
    return await this.get(url, data, loading)
  }

  /**
   * 分享活动详情
   * @param data
   * @returns {Promise.<*>}
   */
  static async shareDetail(id) {
    const url = `${this.baseUrl}/api/sharemoney/act-promotion-info/${id}`
    return await this.get(url)
  }

  /**
   * 佣金公告提示
   * @param data
   * @returns {Promise.<*>}
   */
  static async profitNotice() {
    const url = `${this.baseUrl}/api/sharemoney/profit-notice`
    return await this.get(url)
  }
}
