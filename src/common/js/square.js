/**
 * 
 */
export default class squareMethod {
	constructor(item) {

		this.address = item.address
		this.id = item.id
		this.name = item.name
		this.longitude = item.longitude
		this.latitude = item.latitude
		var iconPath = '';
		if (item.open_status === 0) {
			iconPath = ''
		} else if (item.open_status === 1) {
			iconPath = ''
		} else if (item.open_status === 2) {
			iconPath = ''
		} else if (item.open_status === 3) {
			iconPath = ''
		}
		this.iconPath = iconPath
	}
}