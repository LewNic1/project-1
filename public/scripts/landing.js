// POPUP/LOGIN SECTION
$( 'button' ).click( function() {
  $( '.pop-up' ).addClass( 'open' );
} );
$( '.pop-up .close' ).click( function() {
  $( '.pop-up' ).removeClass( 'open' );
} );
// VIDEO SECTION
let video = document.querySelector( 'video' );
const setVideoDimensions = () => {
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
$('#pwdForm').on('submit', function(e) {
  e.preventDefault();
  let formData = {password: $('#landingPwd').val()}
  console.log(formData);
  $.ajax({
    method: "POST",
    url: '/validate',       //ESTABLISH A ROUTE FOR THIS BAD BOY!!!!!!!!!!!!
    data: JSON.stringify(formData),
    contentType: 'application/json',
    success: function(res) {
      console.log(res)
      if (res === false) {
        console.log("incorrect password")
        $('#pwdForm').prepend(`<p style="color:red">Password Incorrect</p>`)
      } else {
        window.location.href = '/dashboard'
      }
    },
    error: function(err) {
      console.log("uh oh, something went wrong", err);
    },
    beforeSend: ()=>{console.log(formData)}
  });
}) 

