jQuery(function($) {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) == false) {
		//Yandex map
		$('.yandex-map-palce').append('<div id="map" style="height: 200px;"></div><script type="text/javascript">function fid_135953719061817335988(ymaps) {var map = new ymaps.Map("map", {center: [49.131343999999999,55.781098999999998], zoom: 16, type: "yandex#map"});map.controls.add("zoomControl").add("mapTools").add(new ymaps.control.TypeSelector(["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]));map.geoObjects.add(new ymaps.Placemark([49.131343999999999,55.781098999999998], {balloonContent: "Наш офис!"}, {preset: "twirl#yellowDotIcon"}));};</script><script type="text/javascript" src="http://api-maps.yandex.ru/2.0-stable/?lang=ru-RU&coordorder=longlat&load=package.full&wizard=constructor&onload=fid_135953719061817335988"></script>')
	}
});