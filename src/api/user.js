import base from './base'

export default class User extends base {
  /**
   * 获取用户token
   * @param data 用户授权
   * @returns {Promise.<*>}
   */
  static async authorise(data) {
    const url = `${this.baseUrl}/api/info/authorise`
    return await this.post(url, data)
  }
  /**
   * 获取用户信息
   * @returns {Promise.<*>}
   */
  static async getUserInfo(data) {
    const url = `${this.baseUrl}/api/info/index`
    return await this.get(url, data)
  }
}
