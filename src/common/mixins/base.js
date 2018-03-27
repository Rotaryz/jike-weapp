import wepy from 'wepy'
import Tips from 'common/js/tips'
import Info from 'api/info'
import merchants from 'api/merchants'
import {ERR_OK} from 'api/base'
const COLLECT_COUNT = 20

export default class base extends wepy.mixin {
  data = {
    industry: ''
  }

  loaded() {
    this.init = true
    this.$apply()
    Tips.loaded()
  }

  // 卸载清理
  onUnload() {
    Object.assign(this, this.def)
  }

  async collectFormIds(formId) {
    const date = new Date()
    const now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    const collectDate = wepy.getStorageSync('collectDate')
    const collectLength = wepy.getStorageSync('collectLength')
    if (now === collectDate && collectLength < COLLECT_COUNT) {
      await Info.collectFormIds({form_ids: [formId]})
      wepy.setStorageSync('collectLength', collectLength + 1)
    } else if (now !== collectDate) {
      wepy.setStorageSync('collectDate', now)
      await Info.collectFormIds({form_ids: [formId]})
      wepy.setStorageSync('collectLength', 0)
    }
  }

  // 判断行业类型
  async showIndustry() {
    let industry = wepy.getStorageSync('shop').industry
    let id = wepy.getStorageSync('merchantId')
    if (!id) {
      await this.$getToken()
    }
    if (!industry) {
      let res = await merchants.showShop(id)
      if (res.error === ERR_OK) {
        let shop = {
          industry: res.data.code_name,
          shop_name: res.data.shop_name
        }
        wepy.setStorageSync('shop', shop)
      }
    }
  }

  methods = {
    nopen() {
      Tips.alert('尚未开放')
    }
  }
}
