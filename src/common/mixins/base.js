import wepy from 'wepy'
import Tips from 'common/js/tips'
import Info from 'api/info'
import merchants from 'api/merchants'
import {ERR_OK} from 'api/base'
const COLLECT_COUNT = 20

export default class base extends wepy.mixin {
  data = {
    industry: '',
    shopName: '',
    industryColor: ''
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
    let shop = wepy.getStorageSync('shop')
    let id = wepy.getStorageSync('merchantId')
    let token = wepy.getStorageSync('token')
    if (!token || !id) {
      token = await this.$getToken(true)
    }
    if (!shop) {
      let res = await merchants.showShop(id)
      if (res.error === ERR_OK) {
        let shop = {
          industry: res.data.code_name,
          shop_name: res.data.shop_name
        }
        this.industry = res.data.code_name ? res.data.code_name : 'ktv'
        this.shopName = res.data.shop_name ? res.data.shop_name : ''
        wepy.setStorageSync('shop', shop)
        // 判断行业颜色
        this.$apply()
      }
      return
    }
    this.industry = shop.industry
    this.shopName = shop.shop_name
    this.setColor(this.industry)
  }
  setColor(industry) {
    switch (industry) {
      case 'pet':
        this.industryColor = '#FDC502'
        break
      case 'excercise':
        this.industryColor = '#4A90E2'
        break
      case 'study':
        this.industryColor = '#4A90E2'
        break
      case 'beauty':
        this.industryColor = '#D9277D'
        break
      case 'baby':
        this.industryColor = '#FF687F'
        break
      case 'car':
        this.industryColor = '#FF9300'
        break
      case 'restaurant':
        this.industryColor = '#F02543'
        break
      case 'retail':
        this.industryColor = '#7782FF'
        break
      case 'photograph':
        this.industryColor = '#D39C63'
        break
      case 'ktv':
        this.industryColor = '#FF4E00'
        break
    }
  }

  methods = {
    nopen() {
      Tips.alert('尚未开放')
    }
  }
}
