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
		/**
		 * @Author   Rotary
		 * @DateTime 2017-11-21
		 * @param    {[num]}   d [角度]
		 * @return   {[num]}     [弧度]
		 */
	getRad(d) {
			return d * Math.PI / 180.0;
		}
		/**
		 * @Author    Rotary
		 * @DateTime  2017-11-21
		 * @summarize {{计算两个经纬度之间的距离}}
		 * @param     {[num]}   lat1 [纬度1]
		 * @param     {[num]}   lng1 [经度1]
		 * @param     {[num]}   lat2 [纬度2]
		 * @param     {[num]}   lng2 [经度2]
		 * @return    {[num]}        [距离]
		 */
	getFlatternDistance(lat1, lng1, lat2, lng2) {
		var f = this.getRad((lat1 + lat2) / 2);
		var g = this.getRad((lat1 - lat2) / 2);
		var l = this.getRad((lng1 - lng2) / 2);
		var sg = Math.sin(g);
		var sl = Math.sin(l);
		var sf = Math.sin(f);
		var s, c, w, r, d, h1, h2;
		var a = this.EARTH_RADIUS;
		var fl = 1 / 298.257;
		sg = sg * sg;
		sl = sl * sl;
		sf = sf * sf;
		s = sg * (1 - sl) + (1 - sf) * sl;
		c = (1 - sg) * (1 - sl) + sf * sl;
		w = Math.atan(Math.sqrt(s / c));
		r = Math.sqrt(s * c) / w;
		d = 2 * w * a;
		h1 = (3 * r - 1) / 2 / c;
		h2 = (3 * r + 1) / 2 / s;
		return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
	}
}