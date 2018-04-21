/**
 * Created by zx on 2018/4/21.
 */
import base from './base'

export default class shareMoney extends base {
  static async shareList (data) {
    const url = `${this.baseUrl}/api/sharemoney/act-list`
    return await this.get(url, data)
  }
}
