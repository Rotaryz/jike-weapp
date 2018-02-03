export function getParams(scene) {
  if (!scene) {
    return {}
  }
  let params = {}
  let strs = scene.split('&')
  for (let i = 0; i < strs.length; i++) {
    params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
  }
  return params
}
