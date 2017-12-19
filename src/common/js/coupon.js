export default class CouponFactory {
  constructor({id, name, platformPrice, shopPrice, stock, type, endAt, notAllowTime, collect}) {
    this.id = id
    this.name = name
    this.platformPrice = Math.floor(platformPrice)
    this.shopPrice = Math.floor(shopPrice)
    this.stock = stock
    this.collect = collect
    this.type = type
    this.endAt = endAt.split(' ')[0]
    this.notAllowTime = notAllowTime
  }
}
