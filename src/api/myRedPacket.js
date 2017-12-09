import base from './base'

export default class GetRedPacket extends base {
  /**
   * 获取用户红包总览
   * @param token jk_token
   * @returns {Promise.<*>}
   */
  static async getTotalRedpacket(token) {
    const url = `${this.baseUrl}api/redpackets/monies`
    let data = {jk_token: token}
    return await this.get(url, data, false)
  }

  /**
   * 获取用户红包列表
   * @param token jk_token
   * @returns {Promise.<*>}
   */
  static async getTotalRedpacketList(token) {
    const url = `${this.baseUrl}api/redpackets/promotion`
    let data = {jk_token: token}
    return await this.get(url, data)
  }
}
