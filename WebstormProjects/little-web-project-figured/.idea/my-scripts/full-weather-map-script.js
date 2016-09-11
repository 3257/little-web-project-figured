$(function () {

    var map,
        geoJSON,
        request,
        gettingData = false,
        openWeatherMapKey = "a28f075ad9633624934634a4d49a37c5";


    function initialize() {
        var mapOptions = {
            zoom: 8,
            // Bulgaria coordinates.
            center: new google.maps.LatLng(43, 25),
            mapTypeId: google.maps.MapTypeId.TERRAIN,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#ff4400"
                        },
                        {
                            "saturation": -68
                        },
                        {
                            "lightness": -4
                        },
                        {
                            "gamma": 0.72
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon"
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#0077ff"
                        },
                        {
                            "gamma": 3.1
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "hue": "#00ccff"
                        },
                        {
                            "gamma": 0.44
                        },
                        {
                            "saturation": -33
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "stylers": [
                        {
                            "hue": "#44ff00"
                        },
                        {
                            "saturation": -23
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "hue": "#007fff"
                        },
                        {
                            "gamma": 0.77
                        },
                        {
                            "saturation": 65
                        },
                        {
                            "lightness": 99
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "gamma": 0.11
                        },
                        {
                            "weight": 5.6
                        },
                        {
                            "saturation": 99
                        },
                        {
                            "hue": "#0091ff"
                        },
                        {
                            "lightness": -86
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": -48
                        },
                        {
                            "hue": "#ff5e00"
                        },
                        {
                            "gamma": 1.2
                        },
                        {
                            "saturation": -23
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "saturation": -64
                        },
                        {
                            "hue": "#ff9100"
                        },
                        {
                            "lightness": 16
                        },
                        {
                            "gamma": 0.47
                        },
                        {
                            "weight": 2.7
                        }
                    ]
                }
            ]

        };

        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions),

            // Add interaction listeners to make weather requests.
            google.maps.event.addListener(map, "idle", checkIfDataRequested);

        // Sets up and populates the info window with details.
        map.data.addListener("click", function (event) {
            infowindow.setContent(
                "<img src=" + event.feature.getProperty("icon") + ">"
                + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
                + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
                + "<br />" + event.feature.getProperty("weather")
            );

            infowindow.setOptions({
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                },
                pixelOffset: {
                    width: 0,
                    height: -15
                }
            });

            infowindow.open(map);
        });
    }

    var checkIfDataRequested = function () {
        // Stop extra requests being sent.
        while (gettingData === true) {
            request.abort();
            gettingData = false;
        }

        getCoords();
    };

// Get the coordinates from the Map bounds.
    var getCoords = function () {
        var bounds = map.getBounds();
        var NE = bounds.getNorthEast();
        var SW = bounds.getSouthWest();
        getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
    };

// Make the weather request.
    var getWeather = function (northLat, eastLng, southLat, westLng) {
        gettingData = true;
        var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
            + westLng + "," + northLat + "," //left top
            + eastLng + "," + southLat + "," //right bottom
            + map.getZoom()
            + "&cluster=yes&format=json"
            + "&APPID=" + openWeatherMapKey;
        request = new XMLHttpRequest();
        request.onload = proccessResults;
        request.open("get", requestString, true);
        request.send();
    };

// Take the JSON results and proccess them.
    var proccessResults = function () {
        console.log(this);
        var results = JSON.parse(this.responseText);
        if (results.list.length > 0) {
            resetData();
            for (var i = 0; i < results.list.length; i++) {
                geoJSON.features.push(jsonToGeoJson(results.list[i]));
            }
            drawIcons(geoJSON);
        }
    };

    var infowindow = new google.maps.InfoWindow();

// For each result that comes back, convert the data to geoJSON.
    var jsonToGeoJson = function (weatherItem) {
        var feature = {
            type: "Feature",
            properties: {
                city: weatherItem.name,
                weather: weatherItem.weather[0].main,
                temperature: weatherItem.main.temp,
                min: weatherItem.main.temp_min,
                max: weatherItem.main.temp_max,
                humidity: weatherItem.main.humidity,
                pressure: weatherItem.main.pressure,
                windSpeed: weatherItem.wind.speed,
                windDegrees: weatherItem.wind.deg,
                windGust: weatherItem.wind.gust,
                icon: "http://openweathermap.org/img/w/"
                + weatherItem.weather[0].icon + ".png",
                coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
            },
            geometry: {
                type: "Point",
                coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
            }
        };

        // Set the custom marker icon.
        map.data.setStyle(function (feature) {
            return {
                icon: {
                    url: feature.getProperty("icon"),
                    anchor: new google.maps.Point(25, 25)
                }
            };
        });

        // Returns object.
        return feature;
    };

// Add the markers to the map.
    var drawIcons = function (weather) {
        map.data.addGeoJson(geoJSON);

        // Set the flag to finished.
        gettingData = false;
    };

// Clear data layer and geoJSON.
    var resetData = function () {
        geoJSON = {
            type: "FeatureCollection",
            features: []
        };
        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });
    };

    initialize()
})