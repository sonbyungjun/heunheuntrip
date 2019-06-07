$('body').on('loaded-list', function () {

  var menuHeight = $('#menu').outerHeight();
  $('.has-sidebar>*').theiaStickySidebar({
		additionalMarginTop: menuHeight + 30,
		additionalMarginBottom:30,
		minWidth: 767,
	});
  
  // Photoswipe

  var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
      var thumbElements = $(el).closest(main_gallery).find('figure'),
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

      for (var i = 0; i < numNodes; i++) {

        figureEl = thumbElements[i]; // <figure> element

        // include only element nodes 
        if (figureEl.nodeType !== 1) {
          continue;
        }

        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute('data-size').split('x');

        // create slide object
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };



        if (figureEl.children.length > 1) {
          // <figcaption> content
          item.title = figureEl.children[1].innerHTML;
        }

        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute('src');
        }

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function (e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function (el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if (!clickedListItem) {
        return;
      }
      var clickedGallery = clickedListItem.parentNode,
        childNodes = $(clickedListItem).closest(main_gallery).find('figure'),
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }
      if (index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };

    var openPhotoSwipe = function (index, galleryElement, disableAnimation) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {
        history: false,
        bgOpacity: 0.8,
        loop: false,
        barsSize: {
          top: 0,
          bottom: 'auto'
        },

        // define gallery index (for URL)
        galleryUID: $(galleryElement).closest(main_gallery).attr('data-pswp-uid'),

        getThumbBoundsFn: function (index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = document.querySelectorAll(main_gallery + ' img')[index],
            //var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }

      };

      options.index = parseInt(index, 10);

      // exit if index not found
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
      gallery.shout('helloWorld', 'John' /* you may pass more arguments */);



      var totalItems = gallery.options.getNumItemsFn();

      function syncPhotoSwipeWithOwl() {
        var currentIndex = gallery.getCurrentIndex();
        galleryTop.slideTo(currentIndex);
        if (currentIndex == (totalItems - 1)) {
          $('.pswp__button--arrow--right').attr('disabled', 'disabled').addClass('disabled');
        } else {
          $('.pswp__button--arrow--right').removeAttr('disabled');
        }
        if (currentIndex == 0) {
          $('.pswp__button--arrow--left').attr('disabled', 'disabled').addClass('disabled');
        } else {
          $('.pswp__button--arrow--left').removeAttr('disabled');
        }
      };
      gallery.listen('afterChange', function () {
        syncPhotoSwipeWithOwl();
      });
      syncPhotoSwipeWithOwl();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
  };
  var main_gallery = '.gallery-top';
  var galleryTop = new Swiper(main_gallery, {
    spaceBetween: 10,
    lazy: {
      loadPrevNext: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
    , on: {
      init: function () {
        initPhotoSwipeFromDOM(main_gallery);
      },
    }
  });
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 5,
    touchRatio: 0.2,
    slideToClickedSlide: true,
  });
  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;

  $(document).click(function(e) {
    var $target = $(e.target);
    if (!$target.is('.heun-h1') && !$target.is('.heun-h2')) {
      $('.heun-h1, .heun-h2').css('background-color', '');
    } 
  })

  $('.heun-datein').on('click', function() {
    $('.heun-h1, .heun-h2').blur();
    $('.heun-h1, .heun-h2').css('background-color', 'rgb(210, 253, 255)');
  })

  $('.heun-h1').click(function(e) {
    e.stopPropagation();
    $('.heun-h2').data('dateRangePicker').open();
  })

  $('.heun-h2').dateRangePicker({
    format: 'YYYY-MM-DD',
    autoClose: true,
    startDate : '2019-06-07',
    language: 'ko',
    separator : ' ~ ',
    selectForward: true,
    showShortcuts: true,
    customShortcuts: [
      {
        name: '날짜 지우기',
        dates : function() {
          $('.heun-h2').data('dateRangePicker').clear();
          $('#date-range12-container').data('dateRangePicker').clear();
          $('#heun-rev').trigger('date-clear');
        }
      }
    ],
    getValue: function() {
      if ($('.heun-h1').val() && $('.heun-h2').val())
        return $('.heun-h1').val() + ' ~ ' + $('.heun-h2').val();
      else
        return '';
    },
    setValue: function(s, s1, s2) {
      $('.heun-h1').val(s1);
      $('.heun-h2').val(s2);
    }
  }).bind('datepicker-change',function(event,obj) {
    var date = obj.value.split(" ~ ");
    $('#date-range12-container').data('dateRangePicker').setDateRange(date[0], date[1]);
    $('.heun-h1, .heun-h2').css('background-color', '');
    $('#heun-rev').trigger('date-input');
  });

  $('#date-range12-container').dateRangePicker({
    format: 'YYYY-MM-DD',
    inline: true,
    startDate : '2019-06-07',
    container: '#date-range12-container', 
    alwaysOpen: true,
    separator : ' ~ ',
    language: 'ko',
    selectForward: true,
    setValue: function(s, s1, s2) {
      $('.heun-h1').val(s1);
      $('.heun-h2').val(s2);
    },
    showShortcuts: true,
    customShortcuts: [
      {
        name: '날짜 지우기',
        dates : function() {
          $('#date-range12-container').data('dateRangePicker').clear();
          $('#heun-rev').trigger('date-clear');
          $('.heun-h2').data('dateRangePicker').close();
        }
      }
    ]
  }).bind('datepicker-change',function(event,obj) {
    $('.heun-h1, .heun-h2').css('background-color', '');
    var date = obj.value.split(' ~ ');
    var start = moment(date[0]);
    var end = moment(date[1]);
    var day = moment.duration(end.diff(start)).asDays();
    $('#heun-rev').data('day', day);
    $('#heun-rev').trigger('date-input');
  });;

  $('#heun-rev').on('date-input', function() {
    $('#price-table').html('');

    var price = parseInt($('#heun-rev').data('price'));
    var day = parseInt($('#heun-rev').data('day'));

    var priceDay = price * day;
    var tax = Math.floor(priceDay * 0.1);
    var sum = priceDay + tax;

    var priceComma = comma(String(price).replace(/[^0-9]/g, ''));
    var priceDayComma = comma(String(priceDay).replace(/[^0-9]/g, ''));
    var taxComma = comma(String(tax).replace(/[^0-9]/g, ''));
    var sumComma = comma(String(sum).replace(/[^0-9]/g, ''));

    var table = '<tbody>' +
                '  <tr>' +
                '    <td>￦ ' + priceComma + ' X ' + day + '박</td>' +
                '    <td>￦ ' + priceDayComma + '</td>' +
                '  </tr>' +
                '  <tr>' +
                '    <td>부가세</td>' +
                '    <td>￦ ' + taxComma + '</td>' +
                '  </tr>' +
                '  <tr>' +
                '    <td class="font-weight-bold">합계</td>' +
                '    <td class="font-weight-bold">￦ ' + sumComma + '</td>' +
                '  </tr>' +
                '</tbody>';
    
    $('#price-table').append(table);
    $('#heun-rev').html('예약 요청');
  })

  $('#heun-rev').on('date-clear', function() {
    $('#price-table').html('');
    $('#heun-rev').html('날짜 입력');
  })

  $('#heun-rev').click(function(e) {
    e.preventDefault();
    if ($(this).html() === '날짜 입력') {
      e.stopPropagation();
      $('.heun-h2').data('dateRangePicker').open();
    }
  })

  $('.map-btn').click(function() {
    var no = $(this).data('no');
    if (no === 0) {
      hideMarkers();
      setMarkers(map, jmt);
    } else if (no === 1) {
      hideMarkers();
      setMarkers(map, myung);
    }
  })
  
})