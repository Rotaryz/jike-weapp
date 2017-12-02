/* eslint-disable no-undef */
import wepy from 'wepy'

export default class userMixin extends wepy.mixin {
  isFunction(item) {
    return typeof item === 'function'
  }

  // 进行微信登陆
  $doLogin() {
    wepy.login({
      success: (res) => {
        console.log('wepy.login.success:', res)
      },
      fail: (res) => {
        console.log('wepy.login.fail:', res)
      }
    })
  }

  // set Code
  $setCode() {
    wepy.login({
      success: (res) => {
        console.log('wepy.login.success:', res)
        wx.setStorageSync('code', res.code)
      },
      fail: (res) => {
        console.log('wepy.login.fail:', res)
      }
    })
  }

  // get code
  $getCode() {
    let code = wx.getStorageSync('code')
    if (!code) {
      this.$setCode()
    }
    code = wx.getStorageSync('code')
    return code
  }

  $getUser() {
    let user = wx.getStorageSync('user')
      // 不重复获取用户信息
    if (!user || !user.nickName) {
      wepy.getUserInfo({
        success: (res) => {
          console.log('wepy.getUserInfo.success:', res)
            // 缓存用户信息
          wx.setStorageSync('user', res.userInfo)
        },
        fail: (res) => {}
      })
    }
    return user
  }

  // 获取用户信息
  $getUserInfo(callback) {
    console.log(this.$parent)
      // 顶级容错
    if (!this.$parent || !this.$parent.updateGlobalData) return
      // 取缓存信息
    const user = this.$parent.updateGlobalData('user')
      // 不重复获取用户信息
    if (user && user.nickName) {
      this.isFunction(callback) && callback(user)
      this.$apply()
      return user
    }
    // 首次获取用户信息
    this.$login(() => {
      // 再获取用户信息
      this._wxUserInfo(callback)
    })
  }

  // 进行微信登陆
  $login(success = () => {}, noAutoLogin) {
    // 先登录
    wepy.login({
      success: (res) => {
        console.log('wepy.login.success:', res)

        // 如果不需要自动登录，就return
        if (noAutoLogin) {
          // 串行回调
          this.isFunction(success) && success(res)
          this.$apply()
          return
        }

        // 串行回调
        this.isFunction(success) && success(res)
        this.$apply()
      },
      fail: (res) => {
        console.log('wepy.login.fail:', res)
      }
    })
  }

  // 获取用户公开信息（微信）
  _wxUserInfo(callback) {
    wepy.getUserInfo({
      success: (res) => {
        console.log('wepy.getUserInfo.success:', res)
          // 缓存用户信息
        const user = this.$parent.updateGlobalData('user', res.userInfo)

        this.isFunction(callback) && callback(user)
        this.$apply()
      },
      fail: (res) => {
        console.log('wepy.getUserInfo.fail:', res)
          // 用户拒绝授权:填充默认数据
        const user = this.$parent.updateGlobalData('user', {
          nickName: '未授权',
          avatarUrl: ''
        })

        // 串行回调
        this.isFunction(callback) && callback(user)
        this.$apply()

        // 尝试授权
        this._wxAuthModal(callback)
      }
    })
  }

  // 打开授权页
  _wxOpenSetting(callback) {
    wx.openSetting && wx.openSetting({
      success: ({
        authSetting
      }) => {
        console.log('wx.openSetting.success', authSetting)
        if (authSetting['scope.userInfo']) {
          // 用户打开设置，重新获取信息
          this._wxUserInfo(callback)
        }
      }
    })
  }
}