$(document).ready(function () {

  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });
  $('#heun-footer').load('../footer.html');

});