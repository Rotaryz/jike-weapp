/* eslint-disable no-undef */
import wepy from 'wepy'
import User from 'api/user'

export default class userMixin extends wepy.mixin {
  isFunction(item) {
    return typeof item === 'function'
  }

  // set Code
  async $setCode() {
    const res = await wepy.login()
    if (res.code) {
      wepy.setStorageSync('code', res.code)
    }
  }

  // get code
  async $getCode() {
    let code = wepy.getStorageSync('code')
    if (!code) {
      await this.$setCode()
    }
    code = wepy.getStorageSync('code')
    return code
  }

  /**
   * 获取微信用户信息
   * @returns {Promise.<*>}
   */
  async $getUser() {
    let user = wepy.getStorageSync('user')
    // 不重复获取用户信息
    if (!user || !user.nickName) {
      const res = await wepy.getUserInfo()
      if (res.userInfo) {
        user = res.userInfo
        wepy.setStorageSync('user', res.userInfo)
      }
    }
    return user
  }

  /**
   * 判断是否绑定用户手机号码
   * @returns {boolean}
   */
  async isAuthorise() {
    const code = wepy.getStorageSync('code')
    let token = wepy.getStorageSync('token')
    if (!code || !token) {
      token = await this.$getToken()
    }
    let customerId = wepy.getStorageSync('customerId')
    if (!customerId) {
      const userInfo = await this._getSqlUserInfo(token)
      customerId = userInfo.customer_id
      wepy.setStorageSync('customerId', customerId)
    }
    if (!customerId) {
      return false
    }
    return true
  }

  /**
   * 获取token
   * @returns {Promise.<*>}
   */
  async $getToken() {
    let token = wepy.getStorageSync('token')
    if (token) {
      return token
    }
    const code = await this.$getCode()
    const wxUser = await wepy.getUserInfo({lang: 'zh_CN'})
    const data = {
      code,
      iv: wxUser.iv,
      encryptedData: wxUser.encryptedData
    }
    const res = await User.authorise(data)
    token = res.jk_token
    if (token) {
      wepy.setStorageSync('token', token)
    }
    return token
  }

  /**
   * 获取数据库用户信息
   * @returns {Promise.<*>}
   */
  async $getUserInfo() {
    const token = await this.$getToken()
    if (!token) {
      console.log('not token')
      return
    }
    const res = await this._getSqlUserInfo(token)
    let user
    wepy.setStorageSync('customerId', res.customer_id)
    if (res.customer_id === 0) {
      user = await this.$getUser()
    } else {
      if (!res.customer.avatarUrl) {
        let resData = await this.$getUser()
        user = Object.assign(res.customer,{avatarUrl:resData.avatarUrl})
      } else {
        user = res.customer
      }
    }
    this.$parent.updateGlobalData('user', user)
    return user
  }

  async _getSqlUserInfo(token) {
    const res = await User.getUserInfo({jk_token: token})
    wepy.setStorageSync('openId', res.openid)
    return res
  }

  // // 提示用户开启授权
  // _wxAuthModal(callback) {
  //   // 先判断是否支持开启授权页的API
  //   wx.openSetting && wx.showModal({
  //     title: '授权提示',
  //     content: '小程序希望获得以下权限：\n · 获取您的公开信息（昵称、头像等）',
  //     confirmText: '去授权',
  //     cancelText: '先不授权',
  //     success: (res) => {
  //       if (res.confirm) {
  //         console.log('_wxAuthModal.showModal: 用户点击确定', res)
  //         this._wxOpenSetting(callback)
  //       }
  //     }
  //   })
  // }
  //
  // // 打开授权页
  // _wxOpenSetting(callback) {
  //   wx.openSetting && wx.openSetting({
  //     success: ({
  //                 authSetting
  //               }) => {
  //       console.log('wx.openSetting.success', authSetting)
  //       if (authSetting['scope.userInfo']) {
  //         // 用户打开设置，重新获取信息
  //         this._wxUserInfo(callback)
  //       }
  //     }
  //   })
  // }
}
