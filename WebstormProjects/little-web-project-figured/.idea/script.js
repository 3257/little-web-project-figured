/**
 * Created by dido on 20.08.16.
 */
$(function () {

    var $namesWrap = $("#main-nav ul"),
        sourceTemplate = $("#main-template").html(),
        templateCompile = Handlebars.compile(sourceTemplate),
        $cityName,
        $html,
        $mainWrapper = $("#main-wrapper"),
        $spinner = $("<div/>", {class: "spinner"}),
        $cube1 = $("<div/>", {class: "cube1"}).appendTo($spinner),
        $cube2 = $("<div/>", {class: "cube2"}).appendTo($spinner),
        $sideNavInput = $("#side-nav input"),
        $logo = $("#logo");


    //return data for sofia on page load
    // $mainWrapper.append($spinner);


    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Sofia&APPID=a28f075ad9633624934634a4d49a37c5',
        function (data) {

            changeBackGround(data.weather[0].description);
            $html = templateCompile(data);
            // $spinner.remove();
            $mainWrapper.append($html);

            initializeMap(data.coord.lat, data.coord.lon, "map");

        })


    //click-function for city names given in navigation
    $namesWrap.on('click', 'li', function () {

        $cityName = $(this).html();
        $mainWrapper.empty();
        // $mainWrapper.append($spinner);

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' +
            $cityName +
            '&APPID=a28f075ad9633624934634a4d49a37c5',
            function (data) {
                changeBackGround(data.weather[0].description);
                $html = templateCompile(data);
                // $spinner.remove();
                $mainWrapper.append($html);

                initializeMap(data.coord.lat, data.coord.lon, "map");
            })

    })

    //using side navigation to get city name on pressing enter
    $sideNavInput.keydown(function (event) {
        var $key = event.which,
            $cityValue;
        if ($key === 13) {
            $cityValue = $(this).val();

            $mainWrapper.empty();
            // $mainWrapper.append($spinner);

            $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' +
                $cityValue +
                '&APPID=a28f075ad9633624934634a4d49a37c5',
                function (data) {
                    changeBackGround(data.weather[0].description);
                    $html = templateCompile(data);
                    // $spinner.remove();
                    $mainWrapper.append($html);

                    initializeMap(data.coord.lat, data.coord.lon, "map");

                })
        }
    })

    function initializeMap(langitude, longitude, selector) {
        var mapProp = {
            center: new google.maps.LatLng(langitude, longitude),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById(selector), mapProp);
    }

    function changeBgToClouds() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"http://img08.deviantart.net/e679/i/2012/046/b/f/storm_clouds_stock_by_mysticmorning-d4puqek.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }

    function changeBgToSun() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"http://i.ytimg.com/vi/3EXe5cx5S-0/maxresdefault.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }

    function changeBgToRain() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"http://images4.alphacoders.com/831/83196.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }

    function imageTemplate() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"http://www.mbagusi.com/i/hurricane-widescreen-wallpaper.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }

    function changeBackGround(weatherWord) {
        if (weatherWord.indexOf("clouds") >= 0) {
            changeBgToClouds();
        }
        else if (weatherWord.indexOf("clear") >= 0) {
            changeBgToSun();
        }
        else if (weatherWord.indexOf("rain") >= 0) {
            changeBgToRain();
        }
        else {
            changeBgToSun();
        }
    }

})
