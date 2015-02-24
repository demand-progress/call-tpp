function validatePhone(num) {
        num = num.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '');
        num = num.replace("+", "").replace(/\-/g, '');

        if (num.charAt(0) == "1")
            num = num.substr(1);

        if (num.length != 10)
            return false;

        return num;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var vortexCircle = {
      path: { radius: 100, center: [125, 15], angle: "180deg"},
      targets: ".circle",
      rotationMode: "rotate",
      align: "center",
      css: "visibility: visible; position: relative; top: 0px; width: 250px; height: 250px;",
      //showPath: {thickness: 1, color: "white"},
    };

$(document).ready(function() {
    $('h4.circle').css('visibility','hidden'); //hide to avoid FOUT

    $('input').on('focus', function() {
        $('#vortex').css('animation-play-state','paused');
        $('#vortex .center').css('animation-play-state','paused');
    });
    $('input').on('blur', function() {
        $('#vortex').css('animation-play-state','running');
        $('#vortex .center').css('animation-play-state','running');
    });


    $('#phoneForm').submit(function(e) {
        e.preventDefault();
        var phone = $('#phone').val();

        if (!validatePhone(phone))
            return alert('Please enter a valid US phone number!');

        var data = {
            campaignId: 'call-off-tpp',
            userPhone: validatePhone(phone),
            zipcode: '00000'
        };

        $.ajax({
            url: 'http://api.calloffthetpp.com/create',
            type: "get",
            dataType: "json",
            data: data,
            success: function(res) {
                trackEvent('call-congress');
                console.log('Placed call-congress call: ', res);
            }
        });
        $('.overlay').css('display', 'table');
        setTimeout(function() {
            $('.overlay').addClass('visible');
            setTimeout(function() {
                $('.overlay .inner').addClass('visible');
            }, 10);
        }, 100);
    });

    $('.close').click(function() {
      $('.overlay').css('display','none');
    });
});