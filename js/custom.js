let scrollHeader = ()=>{
  if (window.pageYOffset > 50) 
    document.querySelector('.navbar-fixed-top').classList.add('top-nav-collapse')
  else
    document.querySelector('.navbar-fixed-top').classList.remove('top-nav-collapse')
}

// start jQuery
// $(document).ready(function()
// {

//   scrollHeader()

//   // Navigation scrolls
//   $('.navbar-nav li').on('click', function() {
//     let anchor = $(this).data('value'),
//        anchorOffset = $("nav").height()-5;

//     if (!anchorOffset)
//     {
//        anchorOffset = 0; 
//     }

//     $('html,body').animate({ 
//        scrollTop: $(`section[data-value='${anchor}']`).offset().top - anchorOffset
//     }, 500, 'easeInOutExpo');

//   });

// });

// end jQuery


document.querySelector('.navbar-nav li').addEventListener('click',(e)=>{
    let anchor = e.target.dataset.value,
       anchorOffset = document.querySelector('nav').height()-5;

    if (!anchorOffset || anchorOffset < 0)
    {
       anchorOffset = 0; 
    }

    let offSetTOp = document.querySelector(`section[data-value='${anchor}']`).offset().top - anchorOffset

    // document.querySelector('body').animate({ 
    window.scrollTo(0, offSetTOp)
    // });

});

wow = new WOW({
  animateClass: 'animated',
  offset: 100
});
wow.init();

let removeClassAttr = (el)=>{
  let classAv = el.getAttribute('class');
  if(classAv == null || classAv == '')
    el.removeAttribute('class');
}


// Nav header get info start
var bodyRect = document.body.getBoundingClientRect(),
  navLis = document.querySelectorAll('nav .nav li'),
  outPutValue = [],
  heightSections = [],
  numSec = 0; 

for (var i = 0; i < navLis.length; i++) 
{
  outPutValue[i] = navLis[i].dataset.value;
  heightSections[i] = document.querySelector(`section[data-value='${outPutValue[i]}']`).getBoundingClientRect().top - bodyRect.top - 40;
}
// Nav header get info end

// Nav active by section scroll start
document.addEventListener('scroll',(e)=>{
  var navLiActive = document.querySelector('nav li.active');

  scrollHeader()

  while (numSec < Object.keys(heightSections).length) 
  {
    if (pageYOffset < heightSections[numSec+1])
    {
      if (navLiActive.dataset.value != outPutValue[numSec])
      {
        navLiActive.classList.remove('active');
        removeClassAttr(navLiActive);
        navLis[numSec].classList.add('active');
      }

      numSec = heightSections.length;
    }
    else
    {
      if(pageYOffset > heightSections[Object.keys(heightSections).length-1])
      {
        numSec = Object.keys(heightSections).length;
        navLiActive.classList.remove('active');
        removeClassAttr(navLiActive);
        navLis[numSec-1].classList.add('active');
      }
      numSec++;
    }
  }

  numSec = 0;
});
// Nav active by section scroll end