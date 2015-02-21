$(document).ready(function() {

  $('#vortex').vortex({
    initialPosition: 270,
    speed: 150,
    deepFactor: 0
  });

  $('#vortex, #act').hover(function() {
    $('#vortex').data('vortex').stop();
  }, function() {
    $('#vortex').data('vortex').start();
  });

  $('#act').hover(function() {
    $('input#phone').fadeIn();
  });
});