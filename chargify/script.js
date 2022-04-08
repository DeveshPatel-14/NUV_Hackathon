
const citymap = {
  Vadodara: {
    center: { lat: 22.3072, lng: 73.1812},

  },
  second_point: {
    center: { lat: 22.2000, lng: 73.1400 },
  },
  second_point: {
    center: { lat: 22.3100, lng: 73.1212 },
  },


};

var d1 = distance(22.3072,73.1812,22.2000,73.1400,"K");

var d2 = distance(22.2000,73.1400,22.3100,73.1212,"K");

var d3 = distance(22.3100,73.1212,22.1045,75.2000,"K");

var d4 = distance(22.1045,75.2000,22.1000,73.1500,"K");

var d5 = distance(22.1000,73.1500,22.3072,73.1812,"K");

const d = [d1,d2,d3,d4,d5];

 // The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    scaleControl: true,

    zoom: 15,
    center: { lat: 22.3072, lng: 73.1812 },
  });

  const trafficLayer = new google.maps.TrafficLayer();

  trafficLayer.setMap(map);

  setMarkers(map);

  let i=0;

  for (const city in citymap) {
    // Add the circle for this city to the map.
    const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#00FF00",
      fillOpacity: 0.2,
      map,
      center: citymap[city].center,
      radius: 30 * 20,
     });
     i++;
  }

}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
const beaches = [
  ["Vadodara", 22.3072, 73.1812, 4],
  ["Coogee Beach", 22.2000, 73.1400, 5],
  ["Cronulla Beach", 22.3100, 73.1212, 3],
  ["Manly Beach", 22.1045, 75.2000, 2],
  ["Maroubra Beach", 22.1000, 73.1500, 1],
];




console.log(d1)

console.log(d2)

console.log(d3)

console.log(d4)

console.log(d5)





function setMarkers(map) {
  // Adds markers to the map.
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.




  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };

  for (let i = 0; i < beaches.length; i++) {
    const beach = beaches[i];

    marker = new google.maps.Marker({
      position: { lat: beach[1], lng: beach[2] },
      map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      shape: shape,
      title: beach[0],
      zIndex: beach[3],
      animation: google.maps.Animation.DROP,
    });



}
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
