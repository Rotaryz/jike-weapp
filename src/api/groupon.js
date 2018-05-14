import base from './base'

export default class Group extends base {
  /**
   * 获取团购列表
   * @returns {Promise.<void>}
   */
  static async getGroupList(page = 1, limit = 10, loading = true) {
    const data = {
      page,
      limit
    }
    const url = `${this.baseUrl}/api/groupon/lists`
    return await this.get(url, data, loading)
  }

  /**
   * 获取团购详情
   * @returns {Promise.<void>}
   */
  static async getGroupDetail(id, loading = true) {
    const url = `${this.baseUrl}/api/groupon/detail/${id}`
    return await this.get(url, {}, loading)
  }

  /**
   * 获取拼团详情
   * @returns {Promise.<void>}
   */
  static async getGroupBuyDetail(id, loading = true) {
    const url = `${this.baseUrl}/api/groupon/group-detail/${id}`
    return await this.get(url, {}, loading)
  }

  /**
   * 判断是否可以开团/参团
   * @returns {Promise.<void>}
   */
  static async checkGroup(type, id, groupId = 0, loading = true) {
    let data = {
      group_type: type,
      activity_id: id,
      id: groupId
    }
    const url = `${this.baseUrl}/api/groupon/checkout-group`
    return await this.get(url, data, loading)
  }
}
