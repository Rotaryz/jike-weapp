import wepy from 'wepy'
import Tips from 'common/js/tips'

export default class base extends wepy.mixin {
  loaded() {
    this.init = true
    this.$apply()
    Tips.loaded()
  }

  // 卸载清理
  onUnload() {
    Object.assign(this, this.def)
  }

  methods = {
    nopen() {
      Tips.alert('尚未开放')
    }
  }
}
