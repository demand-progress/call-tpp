var validatePhone = function(num) {
        num = num.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '');
        num = num.replace("+", "").replace(/\-/g, '');

        if (num.charAt(0) == "1")
            num = num.substr(1);

        if (num.length != 10)
            return false;

        return num;
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

$(document).ready(function() {
  circle = {
      path: { radius: 125, center: [150, 35], angle: "180deg"},
      targets: ".circle",
      rotationMode: "rotate",
      align: "center",
      css: "visibility: visible; position: relative; top: 0px; width: 300px; height: 300px;",
      // showPath: {thickness: 1, color: "white"},
    };
    cssWarp(circle);

    $('#phoneForm').submit(function(e) {
      
        e.preventDefault();
        $('#call_button').click();
    });

    $('#call_button').click(function(e) {

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