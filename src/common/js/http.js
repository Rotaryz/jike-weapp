import wepy from 'wepy'
import Tips from './tips'
import wxUtils from './wxUtils'

const TOKEN_OUT = 10000 // token 失效
const SOLD_OUT = 10001 // 店铺下架
const DEL_OUT = 10003 // 内容被删除
const NOFOUND_OUT = 10004 // 内容被下线

// HTTP工具类
export default class http {
  static async request(method, url, data, loading = true) {
    const param = {
      url: url,
      method: method,
      data: data
    }
    const Authorization = wepy.getStorageSync('token')
    let Scene = wepy.getStorageSync('scene') || 0
    let LastMerchant = wepy.getStorageSync('LastMerchant') || 0
    let LastBusiness = wepy.getStorageSync('LastBusiness') || 0
    if (Authorization) {
      param.header = Object.assign({}, {Authorization}, {'X-Requested-With': 'XMLHttpRequest'})
    }
    param.header = Object.assign({}, param.header, {'Current-merchant': wepy.getStorageSync('merchantId'), Scene, 'Last-merchant': LastMerchant, 'Last-business': LastBusiness})
    if (loading) {
      Tips.loading()
    }
    const res = await wepy.request(param)
    if (this.isSuccess(res)) {
      const result = res.data
      return result
    } else if (this.isError(res)) {
      // 请求出错
      let status = this.isError(res)
      wepy.redirectTo({url: `/pages/error/error?status=${status}`})
      throw this.requestException(res)
    } else if (this.isSoldOut(res)) {
      // 下架
      const result = res.data.data
      wepy.redirectTo({url: `/pages/sold-out/sold-out?appId=${result.app_id}&businessCircleId=${result.business_circle_id}&status=1`})
      throw this.requestException(res)
    } else if (this.abnormal(res)) {
      // 异常
      let status = this.abnormal(res)
      const result = res.data.data
      wepy.redirectTo({url: `/pages/sold-out/sold-out?appId=${result.app_id}&businessCircleId=${result.business_circle_id}&status=${status}`})
      throw this.requestException(res)
    } else if (this.tokenAbnormal(res)) {
      const currentPage = wxUtils.getCurrentPage()
      wepy.$instance.globalData.targetPage = currentPage
      wepy.reLaunch({url: `/pages/loading/loading?type=tokenOut`})
      throw this.requestException(res)
    } else {
      throw this.requestException(res)
    }
  }

  static async update(url, name, loading = true) {
    const resImage = await wepy.chooseImage()
    const token = wepy.getStorageSync('token')
    const param = {
      url: url,
      filePath: resImage.tempFilePaths[0],
      name: name,
      formData: {
        jk_token: token
      }
    }
    const Authorization = wepy.getStorageSync('token')
    if (Authorization) {
      param.header = Object.assign({}, {Authorization})
    }
    param.header = Object.assign({}, param.header, {'Current-merchant': wepy.getStorageSync('merchantId') || 100000})
    if (loading) {
      Tips.loading()
    }
    const res = await wepy.uploadFile(param)
    const resData = JSON.parse(res.data)
    if (res.statusCode === 200 && resData.error === 0) {
      return resData
    } else {
      throw this.requestException(resData)
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode
    if ((wxCode === 200 && (res.data.code === 0 || res.data.code === 10002)) || wxCode === 422) {
      return true
    }
    return false
  }

  /**
   * 判断店铺是否下架
   * @param res
   */
  static isSoldOut(res) {
    const wxCode = res.statusCode
    if (wxCode === 200 && res.data.code === SOLD_OUT) {
      return true
    }
    return false
  }
  /**
   * 判断异常情况（删除，下线）
   * @param res
   */
  static abnormal(res) {
    const wxCode = res.statusCode
    let code = res.data.code
    let status = ''
    console.log(code)
    if (wxCode === 200) {
      switch (code) {
        case DEL_OUT:
          status = 2
          break
        case NOFOUND_OUT:
          status = 1
          break
      }
      return status
    }
    return false
  }

  /**
   * 判断异常情况（token失效）
   * @param res
   */
  static tokenAbnormal(res) {
    const wxCode = res.statusCode
    let code = res.data.code
    if (wxCode === 200 && code === TOKEN_OUT) {
      return true
    }
    return false
  }

  /**
   * 异常页面
   * @param res
   */
  static isError(res) {
    const wxCode = res.statusCode
    if (wxCode === 404) {
      return 1
    } else if (wxCode >= 500) {
      return 2
    }
    return 0
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {}
    error.statusCode = res.statusCode
    const wxData = res.data
    if (wxData) {
      error.code = wxData.code
      error.message = wxData.message
      error.serverData = wxData
    }
    Tips.loaded()
    return error
  }

  static get(url, data, loading = true) {
    return this.request('GET', url, data, loading)
  }

  static put(url, data, loading = true) {
    return this.request('PUT', url, data, loading)
  }

  static post(url, data, loading = true) {
    return this.request('POST', url, data, loading)
  }

  static patch(url, data, loading = true) {
    return this.request('PATCH', url, data, loading)
  }

  static delete(url, data, loading = true) {
    return this.request('DELETE', url, data, loading)
  }

  static updateImg(url, name, loading = true) {
    return this.update(url, name, loading)
  }
}
