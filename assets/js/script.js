// Global objects
const wiStatePark = {
  name: [`Amnicon Falls`, `Aztalan`, `Belmont Mound`, `Big Bay`, `Big Foot Beach`, `Blue Mound`, `Brunet Island`, `Buckhorn`, `Copper Culture`, `Copper Falls`, `Council Grounds`, `Cross Plains`, `Devil's Lake`, `Governor Dodge`, `Governor Nelson`, `Governor Thompson`, `Harrington Beach`, `Hartman Creek`, `Heritage Hill`, `High Cliff`, `Interstate`, `Kinnickinnic`, `Kohler-Andrae`, `Lake Kegonsa`, `Lake Wissota`, `Lakeshore`, `Lost Dauphin`, `Merrick`, `Mill Bluff`, `Mirror Lake`, `Natural Bridge`, `Nelson Dewey`, `New Glarus Woods`, `Newport`, `Pattison`, `Peninsula`, `Perrot`, `Potawatomi`, `Rib Mountain`, `Roche-A-Cri`, `Rock Island`, `Rocky Arbor`, `Straight Lake`, `Tower Hill`, `Whitefish Dunes`, `Wildcat Mountain`, `Willow River`, `Wyalusing`, `Yellowstone Lake`],
  latitude: [46.6081926, 43.0687506, 42.7674486, 46.7881169, 42.5663516, 43.0256428, 45.1799522, 43.9457661, 44.8878346, 46.3761592, 45.1870058, 43.0822649, 43.428451, 43.0185008, 43.1375074, 45.3233791, 43.4928762, 44.3292439, 44.4734652, 44.1669658, 45.395875, 44.8348436, 43.6651401, 42.9795662, 44.9798164, 43.0336366, 44.3887738, 44.1548598, 43.9415407, 43.5657986, 43.3450811, 42.7315138, 42.7878306, 45.2349742, 46.5373, 45.1279741, 44.0186255, 44.8518772, 44.9215848, 44.0012376, 45.4004337, 43.6410506, 45.6044581, 43.146982, 44.9270471, 43.6976309, 45.0165747, 42.9778509, 42.770834],
  longitude: [-91.8943668, -88.8653492, -90.353939, -90.6759153, -88.4366664, -89.8464633, -91.1635694, -90.0057906, -87.9000013, -90.6461571, -89.7367435, -89.6114006, -89.7335565, -90.1418617, -89.4421113, -88.2242184, -87.8058597, -89.2159337, -88.0334795, -88.2932853, -92.64637, -92.7362971, -87.7213427, -89.2365582, -91.3130329, -87.8977064, -88.1256036, -91.7530881, -90.3215746, -89.8204759, -89.932341, -91.0191989, -89.6364212, -86.9941053, -92.1207697, -87.2387953, -91.4762548, -87.427262, -89.6904097, -89.8148347, -86.8596227, -89.8041208, -92.4229218, -90.0505211, -87.1851752, -90.5763642, -92.6898691, -91.1162288, -89.9878712]
};
let parkSelected = {
  name: ``,
  isFavorite: false,
  latitude: 0,
  longitude: 0,
  currentTemperature: 0,
  currentConditions: ``
};

// temporary placeholder values to test functionality
parkSelected.latitude = 46.6081926;
parkSelected.longitude = -91.8943668;

// Google Maps API
var initMap = function () {
  map = new google.maps.Map(document.getElementById(`map`), {
    center: { lat: parkSelected.latitude, lng: parkSelected.longitude },
    zoom: 8
  });
}

// OpenWeatherMap API
var response = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${parkSelected.latitude}&lon=${parkSelected.longitude}&appid=9c79883a461385b3eeba4afb3c485bf7`).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});