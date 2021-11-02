const menuBtn = $('.menu-button')
const whiteOverlay = $('.white-overlay')
const mobaleMenu = $('.mobile-menu')

$(document).on('click', '.menu-button', handleMenu)
$(document).on('click', '.is-submenu', handleToggleMenu)

function handleMenu(e){
    e.preventDefault();
    whiteOverlay.toggleClass('visible')
    mobaleMenu.toggleClass('visible')
}

function handleToggleMenu(e){
    e.preventDefault();
    const $this = $(this)
    $this.parent('.has-submenu')
    .toggleClass('opened')
    .siblings('li').removeClass('opened')
    .find('ul').hide();

    $this.next('ul').slideToggle(500, function(){
        $(this).find('.has-submenu').removeClass('opened').children('li').hide();
    })
}

function resetMobileMenu(){
  whiteOverlay.removeClass('visible')
  mobaleMenu.removeClass('visible')
  $('.mobile-navigation .has-submenu')
  .removeClass('opened')
  .find('ul').hide()

}
//----------------- END MENU------------- 

 $('#slider').slick({
  arrows: false,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 4000,
  focusOnSelect: true

});

//-----------------SLIDER END------------- 


//-----------------SORTING END------------- 

function getTimer( count ){
  let timer = new Object();
  timer.seconds = count % 60;
  count = (count - timer.seconds) / 60;
  timer.minutes = count % 60;
  count = (count - timer.minutes) / 60;
  timer.hours = count % 24;
  timer.days = (count - timer.hours) / 24;
  return timer;
}

function showTimer( timer ){
  $('#timer').text(
      timer.days.toString() +
      ':' +
      (timer.hours < 10 ? '0' : '') +
      timer.hours.toString() +
      ':' +
      (timer.minutes < 10 ? '0' : '') +
      timer.minutes.toString() +
      ':' +
      (timer.seconds < 10 ? '0' : '') +
      timer.seconds.toString()
  );
}

$(document).ready( function(){
  let now = new Date();                                       
  let sale = new Date(2021, 9, 31, 0, 0, 0, 0);
  
  let counter = sale.getTime() - now.getTime();                 
  let timeout = counter % 1000;                                    
  counter = (counter - timeout) / 1000;                            
  
  showTimer(getTimer(counter + 1));                               
  setTimeout(function(){
      showTimer(getTimer(counter));                               
      let intervalID = setInterval(function(){
          counter--;
          if( counter > 0 ){
              showTimer(getTimer(counter));                        
          }else{
              clearInterval(intervalID);
              $('#timer').text('Sale is over');
          }
      }, 1000);
  }, timeout);
  
});

//-----------TIMER END--------------


$(function () {
  let button = $('#scroll-top');

  $(document).on('scroll', () =>{
    if ($(document).scrollTop() >= 300) {
      button.show();
    } else {
      button.hide();
    }
  });

  button.on('click', (e) =>{
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 600);
    return false;
  });
});

//-----------------SCROLL-TOP END------------- 

$(document).ready(function() { 
  let hasError = true;


  function validate () {
    const emailInput = $('#userEmail');
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
    const emailAddressVal = emailInput.val();

    $(".error").remove();
   
    if (emailAddressVal == "") {
      emailInput.after('<span style="color:red" class="error">Please enter your email address.</span>');
      hasError = true;
    } else if (!emailReg.test(emailAddressVal)) {
      emailInput.after('<span style="color:red" class="error">Enter a valid email address.</span>');
      hasError = true;
    } else {
      hasError = false;
    } 
  }

  $('#userEmail').on("input change", validate);

  $('#btn-submit').on("click", function(e){
    e.preventDefault();
    validate();
    if (!hasError){
      $("#footer-form").html("<div style='text-align:center'> Thank you for your email &#128521;</div>");
    }
  })
});

//-----------------VALIDATION END------------- 

const center = [50.266897049608815, 28.686074913473295]

var map = L.map('map').setView(center, 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(center).addTo(map).bindPopup('Welcome').openPopup();

//-----------------MAP END------------- 









function initMobile() {
  console.log("is-mobile");
}

function initTablet() {
  console.log("is-tablet");
}

function initDesktop() {
  resetMobileMenu()
  console.log("is-desktop");
}

ssm.addStates([
  {
    id: "mobile",
    query: "(max-width: 640px)",
    onEnter: function () {
      initMobile();
    },
  },
  {
    id: "tablet",
    query: "(min-width: 641px) and (max-width: 992px)",
    onEnter: function () {
      initTablet();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 993px)",
    onEnter: function () {
      initDesktop();
    },
  },
]);
