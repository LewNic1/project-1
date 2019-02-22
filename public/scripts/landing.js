console.log('windowload')

// POPUP/LOGIN SECTION
$( 'button' ).click( function() {
  $( '.pop-up' ).addClass( 'open' );
} );
$( '.pop-up .close' ).click( function() {
  $( '.pop-up' ).removeClass( 'open' );
} );


// VIDEO SECTION
let video = document.querySelector( 'video' );
video.play()
const setVideoDimensions = () => {
  console.log('videotrigger')
  if ( window.innerWidth / window.innerHeight > 16 / 9 ) {
     video.style.width = '100vw';
     video.style.height = 'calc(100vw * 9 / 16)';
  } else {
     video.style.width = 'calc(100vh * 16 / 9)';
     video.style.height = '100vh';
  }
};
window.onresize = setVideoDimensions;

setVideoDimensions();


//ajax call to check password
// on success res.redirect('/dashboard')
