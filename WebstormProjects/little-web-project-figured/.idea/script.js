/**
 * Created by dido on 20.08.16.
 */
$(function () {

    var $namesWrap = $("#main-nav ul"),
    sourceTemplate   = $("#main-template").html(),
        templateCompile = Handlebars.compile(sourceTemplate),
        $cityName,
        $html,
        $mainWrapper = $("#main-wrapper"),
        $spinner = $("<div/>",{class:"spinner"}),
        $cube1 = $("<div/>",{class:"cube1"}).appendTo($spinner),
        $cube2 = $("<div/>",{class:"cube2"}).appendTo($spinner),
        $sideNavInput = $("#side-nav input");

        //return data for sofia on page load
        $mainWrapper.append($spinner);


    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Sofia&APPID=a28f075ad9633624934634a4d49a37c5',
        function (data) {
                $html = templateCompile(data);
                $spinner.remove();
                $mainWrapper.append($html);

            initializeMap(data.coord.lat,data.coord.lon,"map");

        })


        //click-function for city names given in navigation
    $namesWrap.on('click','li',function (){

        $cityName=$(this).html();
        $mainWrapper.empty();
        $mainWrapper.append($spinner);

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' +
            $cityName +
            '&APPID=a28f075ad9633624934634a4d49a37c5',
            function (data) {
                    $html = templateCompile(data);
                    $spinner.remove();
                    $mainWrapper.append($html);

                initializeMap(data.coord.lat,data.coord.lon,"map");
            })

    })

        //using side navigation to get city name on pressing enter
    $sideNavInput.keydown(function (event) {
        var $key = event.which,
            $cityValue;
        if($key===13)
        {
            $cityValue = $(this).val();

            $mainWrapper.empty();
            $mainWrapper.append($spinner);

            $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' +
                $cityValue +
                '&APPID=a28f075ad9633624934634a4d49a37c5',
                function (data) {
                    $html = templateCompile(data);
                    $spinner.remove();
                    $mainWrapper.append($html);

                    initializeMap(data.coord.lat,data.coord.lon,"map");

                })
        }
    })

    function initializeMap(langitude,longitude,selector) {
        var mapProp = {
            center:new google.maps.LatLng(langitude,longitude),
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById(selector), mapProp);
    }
})
