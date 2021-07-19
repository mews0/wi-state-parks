// Global objects
const wiStateParks = {
  name: [`Amnicon Falls`, `Aztalan`, `Belmont Mound`, `Big Bay`, `Big Foot Beach`, `Blue Mound`, `Brunet Island`, `Buckhorn`, `Copper Culture`, `Copper Falls`, `Council Grounds`, `Cross Plains`, `Devil's Lake`, `Governor Dodge`, `Governor Nelson`, `Governor Thompson`, `Harrington Beach`, `Hartman Creek`, `Heritage Hill`, `High Cliff`, `Interstate`, `Kinnickinnic`, `Kohler-Andrae`, `Lake Kegonsa`, `Lake Wissota`, `Lakeshore`, `Lost Dauphin`, `Merrick`, `Mill Bluff`, `Mirror Lake`, `Natural Bridge`, `Nelson Dewey`, `New Glarus Woods`, `Newport`, `Pattison`, `Peninsula`, `Perrot`, `Potawatomi`, `Rib Mountain`, `Roche-A-Cri`, `Rock Island`, `Rocky Arbor`, `Straight Lake`, `Tower Hill`, `Whitefish Dunes`, `Wildcat Mountain`, `Willow River`, `Wyalusing`, `Yellowstone Lake`],
  latitude: [46.6081926, 43.0687506, 42.7674486, 46.7881169, 42.5663516, 43.0256428, 45.1799522, 43.9457661, 44.8878346, 46.3761592, 45.1870058, 43.0822649, 43.428451, 43.0185008, 43.1375074, 45.3233791, 43.4928762, 44.3292439, 44.4734652, 44.1669658, 45.395875, 44.8348436, 43.6651401, 42.9795662, 44.9798164, 43.0336366, 44.3887738, 44.1548598, 43.9415407, 43.5657986, 43.3450811, 42.7315138, 42.7878306, 45.2349742, 46.5373, 45.1279741, 44.0186255, 44.8518772, 44.9215848, 44.0012376, 45.4004337, 43.6410506, 45.6044581, 43.146982, 44.9270471, 43.6976309, 45.0165747, 42.9778509, 42.770834],
  longitude: [-91.8943668, -88.8653492, -90.353939, -90.6759153, -88.4366664, -89.8464633, -91.1635694, -90.0057906, -87.9000013, -90.6461571, -89.7367435, -89.6114006, -89.7335565, -90.1418617, -89.4421113, -88.2242184, -87.8058597, -89.2159337, -88.0334795, -88.2932853, -92.64637, -92.7362971, -87.7213427, -89.2365582, -91.3130329, -87.8977064, -88.1256036, -91.7530881, -90.3215746, -89.8204759, -89.932341, -91.0191989, -89.6364212, -86.9941053, -92.1207697, -87.2387953, -91.4762548, -87.427262, -89.6904097, -89.8148347, -86.8596227, -89.8041208, -92.4229218, -90.0505211, -87.1851752, -90.5763642, -92.6898691, -91.1162288, -89.9878712]
};

let favoriteParks = JSON.parse(localStorage.getItem(`favoriteParks`));

let parkSelected = {
  name: ``,
  latitude: 0,
  longitude: 0,
  currentTemperature: 0,
  currentConditions: ``,
  assignValues: function () {
    // Assign option selected from drop-down list to variable parkSelected.name
    parkSelected.name = $(`option`).filter(`:selected`).text();
    // Assign values to latitude and longitude attributes of parkSelected object
    parkSelected.latitude = wiStateParks.latitude[wiStateParks.name.indexOf(parkSelected.name.replace(` State Park`, ``))];
    parkSelected.longitude = wiStateParks.longitude[wiStateParks.name.indexOf(parkSelected.name.replace(` State Park`, ``))];
    getMap();
    getWeather();
  }
};

let selectPark = function () {
  // Drop-down list functions
  let dropDown = {
    empty: function () {
      $(`#select-park-options`).empty();
    },
    write: function (listSelected) {
      // Add options to drop-down list
      $(`#select-park-options`).append(`<option disabled selected value> -- Select a Park -- </option>`);
      for (i = 0; i < listSelected.length; i++) {
        if (listSelected === favoriteParks) {
          $(`#select-park-options`).append(`<option value="">${listSelected[i]}</option>`);
        } else {
          $(`#select-park-options`).append(`<option value="">${listSelected[i]} State Park</option>`);
        }
      }
    }
  }

  // If the user selects 'favorite parks', then display favorite parks in drop-down list
  $(`#favorite-parks`).focus(function () {
    dropDown.empty();
    if (favoriteParks === null) {
      $(`#select-park-options`).append(`<option disabled selected value> -- Select a Park -- </option>`);
    } else {
      dropDown.write(favoriteParks);
    }
  });

  // If the user selects 'all parks', then display all parks in drop-down list
  $(`#all-parks`).focus(function () {
    dropDown.empty();
    dropDown.write(wiStateParks.name);
  });

  // Assign option selected from drop-down list to variable parkSelected.name
  $(`.select-park-options`).change(function () {
    parkSelected.assignValues();
  });
}

// Google Maps API
let getMap = function () {

  // Create the script tag, set the appropriate attributes
  var script = document.createElement(`script`);
  script.src = `https://maps.googleapis.com/maps/api/js?key=${api.map}&callback=initMap`;
  script.async = true;

  // Attach your callback function to the `window` object
  window.initMap = function () {
    // JS API is loaded and available
    map = new google.maps.Map(document.getElementById(`map`), {
      center: { lat: parkSelected.latitude, lng: parkSelected.longitude },
      zoom: 12
    });
  };

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
}

// OpenWeatherMap API
let getWeather = function () {
  var response = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${parkSelected.latitude}&lon=${parkSelected.longitude}&appid=${api.weather}&units=imperial`).then(function (response) {
    response.json().then(function (data) {
      parkSelected.currentTemperature = Math.round(data.main.temp);
      parkSelected.currentConditions = data.weather[0].main;

      // This removes the 'Current Weather' section so that multiple sections are not displayed when the user changes parks
      $(`.weather`).remove();

      $(`#map`).after(`<section class="weather" id="weather"></section>`);
      $(`#weather`)
        .append(`<h2>Current Weather</h2>`)
        .append(`<p>${parkSelected.currentTemperature}\u00B0, ${parkSelected.currentConditions}</p>`)
        saveToFavorites();
    });
  });
}

function saveToFavorites () {
  // If no favorite parks are saved in local storage, then manually make favoriteParks variable an array
  if (favoriteParks === null) {
    favoriteParks = [];
  }

  if (favoriteParks.includes(parkSelected.name) === false) {
    $(`.save-to-favorites`).remove();
    // Add 'Save to Favorites' section
    $(`#weather`).append(`<section class="save-to-favorites" id="save-to-favorites"></section>`);

    // Add 'Save to Favorites' button
    $(`#save-to-favorites`).append(`<button class="save-to-favorites">Save to Favorites</button>`);

    // On user click, add new favorite park and save to local storage
    $(`button.save-to-favorites`).click(function () {
      favoriteParks.push(parkSelected.name);
      localStorage.setItem(`favoriteParks`, JSON.stringify(favoriteParks));
    });
  }
}

selectPark();