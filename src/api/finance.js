/**
 * Created by zx on 2018/4/25.
 */
import base from './base'

export default class Finance extends base {
  /**
   * 银行卡列表
   * @returns {Promise.<void>}
   */
  static async banksList() {
    const url = `${this.baseUrl}/api/finance/banks`

    return await this.get(url)
  }
  /**
   * 添加银行卡
   * @returns {Promise.<void>}
   */
  static async bankCards(data) {
    const url = `${this.baseUrl}/api/finance/bank-cards`
    return await this.post(url, data)
  }
  /**
   * 银行详情(取最新那条)
   * @returns {Promise.<void>}
   */
  static async bankCardDetail() {
    const url = `${this.baseUrl}/api/finance/bank-card-detail`
    return await this.get(url)
  }
  /**
   * 修改银行卡信息
   * @returns {Promise.<void>}
   */
  static async putBankCards(id, data) {
    const url = `${this.baseUrl}/api/finance/bank-cards/${id}`
    return await this.put(url, data)
  }
}
