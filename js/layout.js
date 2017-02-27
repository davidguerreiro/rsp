
$(document).ready( function() {

/**
* Screen layout
*/

//adapt main game screen to the total size of the screen
$(document).on( 'adapt_screen', function() {

  let breakpoint = 662;
  let screen_size = $(window).height();
  let header_size = $('.main-header').height();
  let footer_size = $('.main-footer').height();
  let game_screen_size = $('.game-section').height();

  if( screen_size > breakpoint ) {

    let to_add = game_screen_size + footer_size;
    to_add = game_screen_size + ( screen_size - to_add );

    $('.game-section').css( 'height', to_add + 'px' );

  }

});

//trigger adapt screen when the document is load
$(document).trigger( 'adapt_screen' );

//trigger adapt screen when the screen size changes
$(window).resize( function () {
  $(document).trigger( 'adapt_screen' );
});

/**
* Sidebar layout
*/

//display containers in the sidebar menu
$('.main-sidebar__a').click( function( e ) {

  e.preventDefault();

  let id = $(this).attr( 'id' );
  let element_id = $(this).data('field');
  let $section = $('#' + element_id);
  let duration = 300;
  let animation = 'linear';

  if( $section.hasClass( 'hidden' ) ) {

    $section.slideDown( duration, animation, function( e ) {
        $section.removeClass( 'hidden' );
    });

  }
  else {

    $section.slideUp( duration, animation, function( e ) {
      $section.addClass( 'hidden' );

    });

  }

});


});
