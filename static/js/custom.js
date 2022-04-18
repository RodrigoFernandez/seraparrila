/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on("load", function () {
    $('#contact-form').trigger('reset');
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
});

(function ($) {
    "use strict";

    /* ========================================================================= */
    /*	Testimonial Carousel
    /* =========================================================================  */

    //Init the slider
    $('.testimonial-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    /* ========================================================================= */
    /*	Clients Slider Carousel
    /* =========================================================================  */

    //Init the slider
    $('.clients-logo-slider').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
    });




    /* ========================================================================= */
    /*	Company Slider Carousel
    /* =========================================================================  */
    $('.company-gallery').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
    });


    /* ========================================================================= */
    /*	Awars Counter Js
    /* =========================================================================  */
    $('.counter').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({
            countNum: $this.text()
        }).animate({
                countNum: countTo
            },

            {
                duration: 1500,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                    //alert('finished');
                }

            });
    });




    /* ========================================================================= */
    /*   Contact Form Validating
    /* ========================================================================= */
    $('#enviar-contacto').click(function (e) {

        //stop the form from being submitted
        e.preventDefault();

        /* declare the variables, var error is the variable that we use on the end
        to determine if there was an error or not */
        var error = false;
        var name = $('#nombre').val();
        var email = $('#email').val();
        var subject = $('#asunto').val();
        var message = $('#mensaje').val();

        let validarCampo = function(test, nombreCampo){
            $('#' + nombreCampo).css("border-color", test ? "#D8000C" : "#666");
            return test;
        };

        /* in the next section we do the checking by using VARIABLE.length
        where VARIABLE is the variable we are checking (like name, email),
        length is a JavaScript function to get the number of characters.
        And as you can see if the num of characters is 0 we set the error
        variable to true and show the name_error div with the fadeIn effect.
        if it's not 0 then we fadeOut the div( that's if the div is shown and
        the error is fixed it fadesOut.

        The only difference from these checks is the email checking, we have
        email.indexOf('@') which checks if there is @ in the email input field.
        This JavaScript function will return -1 if no occurrence have been found.*/
        /*
        if (name.length == 0) {
            var error = true;
            $('#nombre').css("border-color", "#D8000C");
        } else {
            $('#nombre').css("border-color", "#666");
        }
        if (email.length == 0 || email.indexOf('@') == '-1') {
            var error = true;
            $('#email').css("border-color", "#D8000C");
        } else {
            $('#email').css("border-color", "#666");
        }
        if (subject.length == 0) {
            var error = true;
            $('#asunto').css("border-color", "#D8000C");
        } else {
            $('#asunto').css("border-color", "#666");
        }
        if (message.length == 0) {
            var error = true;
            $('#mensaje').css("border-color", "#D8000C");
        } else {
            $('#mensaje').css("border-color", "#666");
        }
        */
        error = validarCampo(name.length == 0, 'nombre')
        error = validarCampo(email.length == 0 || email.indexOf('@') == '-1', 'email')
        error = validarCampo(subject.length == 0, 'asunto')
        error = validarCampo(message.length == 0, 'mensaje')

        //now when the validation is done we check if the error variable is false (no errors)
        if (error == false) {
            //disable the submit button to avoid spamming
            //and change the button text to Sending...
            $('#enviar-contacto').attr({
                'disabled': 'false',
                'value': 'Enviando...'
            });

            let submitOk = function(data) {
                //success
                //if the mail is sent remove the submit paragraph
                $('#cf-submit').remove();
                //and show the mail success div with fadeIn
                $('#mail-success').fadeIn(500);
            };

            /* using the jquery's post(ajax) function and a lifesaver
            function serialize() which gets all the data from the form
            we submit it */
            $.ajax({
                url: $("#contact-form").attr('action'),     //The public Google Form url, but replace /view with /formResponse
                data: $("#contact-form").serialize(), //Nifty jquery function that gets all the input data
                type: 'POST', //tells ajax to post the data to the url
                dataType: "json", //the standard data type for most ajax requests
                statusCode: { //the status code from the POST request
                  0: submitOk, //0 is when Google gives a CORS error, don't worry it went through
                  200: submitOk, //200 is a success code. it went through!
                  403: function(data) {//403 is when something went wrong and the submission didn't go through
                    //error
                    //show the mail failed div
                    $('#mail-fail').fadeIn(500);
                    //re enable the submit button by removing attribute disabled and change the text back to Send The Message
                    $('#enviar-contacto').removeAttr('disabled').attr('value', 'Enviar');
                  }
                }
            });
        }
    });


})(jQuery);



window.marker = null;

function initialize() {
    var map;

    var latitude = $('#map').data('lat');
    var longitude = $('#map').data('long');
    var nottingham = new google.maps.LatLng(latitude, longitude);

    var style = [{
        "stylers": [{
            "hue": "#ff61a6"
        }, {
            "visibility": "on"
        }, {
            "invert_lightness": true
        }, {
            "saturation": 40
        }, {
            "lightness": 10
        }]
    }];

    var mapOptions = {
        // SET THE CENTER
        center: nottingham,

        // SET THE MAP STYLE & ZOOM LEVEL
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 9,

        // SET THE BACKGROUND COLOUR
        backgroundColor: "#000",

        // REMOVE ALL THE CONTROLS EXCEPT ZOOM
        zoom: 17,
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        }

    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // SET THE MAP TYPE
    var mapType = new google.maps.StyledMapType(style, {
        name: "Grayscale"
    });
    map.mapTypes.set('grey', mapType);
    map.setMapTypeId('grey');

    //CREATE A CUSTOM PIN ICON
    var marker_image = $('#map').data('marker');
    var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(25, 33));

    marker = new google.maps.Marker({
        position: nottingham,
        map: map,
        icon: pinIcon,
        title: 'navigator'
    });
}

var map = $('#map');
if (map.length != 0) {
    google.maps.event.addDomListener(window, 'load', initialize);
}
