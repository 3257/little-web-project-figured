$(function () {

    var $cityNamesMainNav = $("#main-nav ul"),
        htmlSourceTemplate = $("#main-template").html(),
        templateCompile = Handlebars.compile(htmlSourceTemplate),
        $cityName,
        $html,
        $mainWrapper = $("#main-wrapper"),
        $sideNavInput = $("#side-nav input"),
        $loaderDiv = $("<div class='loader'><div></div><div></div><div></div><div></div></div>"),
        mistakeMessage = "SORRY! YOU BROKE THE INTERNET! TRY WITH VALID CITY NAME NOW :-)",
        mapInfowindowContentStringMesage = '<div id="iw-container">' +
            '<p class="infoWindowNotice">' +
            '<span class="square">' +
            '<a class="third after" href="index-five-day.html">' +
            '<img class="image-pointer"  src="http://worldartsme.com/images/finger-pointing-right-free-clipart-1.jpg" alt="pointer"> SEE WEATHER FORECAST' +
            '</a>' +
            '</span>' +
            '</p>' +
            '<p class="infoWindowNotice">' +
            '<span class="square">' +
            '<a class="third after" href="index-full-weather-map.html">' +
            '<img class="image-pointer"  src="http://worldartsme.com/images/finger-pointing-right-free-clipart-1.jpg" alt="pointer"> SEE FULL MAP' +
            '</a>' +
            '</span>' +
            '</p>' +
            '</div>>';

    $mainWrapper.append($loaderDiv);

    // Return data for sofia on page load.
    promise("Sofia").done(function (data) {

        $html = templateCompile(data);
        $loaderDiv.remove();
        $mainWrapper.append($html);

        initializeMap(data.coord.lat, data.coord.lon, "map",mapInfowindowContentStringMesage);
    });

    // Return message if promise fails.
    promise("Sofia").fail(function () {

        $loaderDiv.remove();
        $mainWrapper.append("<p class=\"something-wrong\">" + mistakeMessage + "</p>");
    })


    // Click-function for city names returned from navigation.
    $cityNamesMainNav.on("click", "li", function () {

        $cityName = $(this).html();
        $mainWrapper.empty();
        $mainWrapper.append($loaderDiv);

        // Return city data on success.
        promise($cityName).done(function (data) {

            $html = templateCompile(data);
            $loaderDiv.remove();
            $mainWrapper.append($html);

            initializeMap(data.coord.lat, data.coord.lon, "map",mapInfowindowContentStringMesage);
        });

        // Return message on failure.
        promise($cityName).fail(function () {
            $loaderDiv.remove();
            $mainWrapper.append("<p class=\"something-wrong\">" + mistakeMessage + "</p>");
        })

    })

    // Input function for city names returned.
    $sideNavInput.keydown(function (event) {

        var $key = event.which,
            $cityValue;

        // Made to work with the Enter key only.
        if ($key === 13) {

            $cityValue = $(this).val();
            $mainWrapper.empty();
            $mainWrapper.append($loaderDiv);

            // Check if value is undefined, a valid string and not a number.
            if (!$cityValue || /^\s*$/.test($cityValue) || !isNaN($cityValue)) {

                $loaderDiv.remove();
                $mainWrapper.empty();
                $mainWrapper.append("<p class=\"something-wrong\">" + mistakeMessage + "</p>");
            } else {

                // Return city data on success.
                promise($cityValue).done(function (data) {

                    $html = templateCompile(data);
                    $loaderDiv.remove();
                    $mainWrapper.append($html);

                    initializeMap(data.coord.lat, data.coord.lon, "map",mapInfowindowContentStringMesage);
                });

                // Return message on failure.
                promise($cityValue).fail(function () {
                    $loaderDiv.remove();
                    $mainWrapper.append("<p class=\"something-wrong\">" + mistakeMessage + "</p>");
                })
            }
        }
    })

    // Promise function to get data.
    function promise(nameOfCityAsString) {

        return $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + nameOfCityAsString + "&units=metric&APPID=a28f075ad9633624934634a4d49a37c5");
    };

})

// Handlebars helpers started.
Handlebars.registerHelper("fixTemperatureDisplay", function (temperatureNumber) {

    return (temperatureNumber).toFixed(1)
})

Handlebars.registerHelper("dateDisplayFix", function (dateInUnix) {

    return (new Date(dateInUnix * 1000)).toUTCString().substr(0, 16)
})

Handlebars.registerHelper("numberToOneDigitDisplayFix", function (numberToBeFixed) {

    return Number(numberToBeFixed).toFixed(1)
})

Handlebars.registerHelper("displayWeatherIcon", function (iconNumber) {

    return ("http://openweathermap.org/img/w/" + iconNumber + ".png")
})
// Handlebars helpers finished.

function initializeMap(langitude, longitude, idSelector, infoWindowMessage) {
    var myCenter = new google.maps.LatLng(langitude, longitude),
        mapProp = {
            center: myCenter,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
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

    map = new google.maps.Map(document.getElementById(idSelector), mapProp),

        mapMarker = new google.maps.Marker({
            position: myCenter,
            map: map
        }),
        contentString = infoWindowMessage

    infowindow = new google.maps.InfoWindow({
        content: contentString,
        width: 100
    })


    google.maps.event.addListener(infowindow, 'domready', function () {

        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
         */
        var iwBackground = iwOuter.prev();

        // Little trianle under infowindow main-index map

        var $iwLittleTriangleBelowInfowindowFirstMainMap =$("#map > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div"),
            $iwLittleTriangleBelowInfowindowSecondMainMap =$("#map > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div");

        $iwLittleTriangleBelowInfowindowFirstMainMap.css({
            backgroundColor: "rgba(226, 105, 105, 0.8)",
            zIndex:"1"
        })

        $iwLittleTriangleBelowInfowindowSecondMainMap.css({
            backgroundColor: "rgba(226, 105, 105, 0.8)",
            zIndex:"1"

        })

        // Little trianle under infowindow 5-day map

        var $iwLittleTriangleBelowInfowindowFirstFiveDay =$("#five-day-map > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div"),
         $iwLittleTriangleBelowInfowindowSecondFiveDay =$("#five-day-map > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div");

        $iwLittleTriangleBelowInfowindowFirstFiveDay.css({
            backgroundColor: "rgba(226, 105, 105, 0.8)",
            zIndex:"1"
        })

        $iwLittleTriangleBelowInfowindowSecondFiveDay.css({
            backgroundColor: "rgba(226, 105, 105, 0.8)",
            zIndex:"1"

        })

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display': 'none'});

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display': 'none'});

        // Moves the infowindow 115px to the right.
        iwOuter.parent().parent().css({left: '0px'});

        // Reference to the div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({
            position: "relative",
            opacity: '1',
            // display: "none",
            right: '10px',
            top: '3px',
            border: '6px solid rgba(226, 105, 105, 0.8)',
            'border-radius': '13px',
            'box-shadow': '0 0 5px #3990B9'
        });

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if ($('.iw-content').height() < 140) {
            $('.iw-bottom-gradient').css({display: 'none'});
        }

        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function () {
            $(this).css({opacity: '1'});
        });
    })


    infowindow.open(map, mapMarker);

    google.maps.event.addListener(mapMarker, 'click', function() {
        infowindow.open(map,mapMarker);
    });
}