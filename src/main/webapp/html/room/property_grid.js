$(document).ready(function() {
	$('#toggle-filters').sidr({
		side: 'left',
		displace : false,
		renaming : false,
		name: 'sidebar',
		source: function() {
		  AOS.refresh();
		},
  });
  
  $('#heun-header').load('../header.html', function() {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  })
  $('#heun-footer').load('../footer.html')



});

