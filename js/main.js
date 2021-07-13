/**************************** Show/hide sidebar setting-box ****************************/
let settingBox = document.querySelector(".setting-box");
let settingToggle = document.querySelector(".setting-toggle");
let settingIcon = document.querySelector(".setting-box > .setting-toggle > i");

settingToggle.onclick = () => {

  settingBox.classList.toggle("open");

  settingIcon.classList.toggle("fa-spin");
};

document.addEventListener("click", (e) => {

  if (e.target !== settingBox && e.target !== settingToggle){

    if (settingBox.classList.contains("open")){

      settingBox.classList.remove("open");

      settingIcon.classList.remove("fa-spin");
    };
  };
});

settingBox.onclick = function (e) {
  e.stopPropagation();
}

/******************************** Switch Color Section ********************************/

// check if exist local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".colors-list li").forEach((ele) => {

    // Remove all active class border from li
    ele.classList.remove("active");

    // add active class on element with data-color === local storage (main colors)
    if (ele.dataset.color === mainColors) {

      //add active class
      ele.classList.add("active");
    };
  });
};

/******************************** Switch Color Section ********************************/
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on All li
colorsLi.forEach((li) => {

  // Click on every li
  li.addEventListener("click", (e) => {

    // set color on root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    
    // set color on local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

/******************************** Random Background Section ********************************/

// Random Background Option
let bgOption = true;
// variable to control setInterval
let bgInterval;
// check if exist local storage random background option
let bgLocalItem = localStorage.getItem("bg_option");

if (bgLocalItem !== null) {
  
  document.querySelectorAll(".random-background span").forEach((ele) => {

    // remove class active from all span
    ele.classList.remove("active");
  });

  if (bgLocalItem === "true") {

    bgOption = true;

    document.querySelector(".yes").classList.add("active");

  } else {

    bgOption = false;

    document.querySelector(".no").classList.add("active");
  }
};

const randomBackground = document.querySelectorAll(".random-background span");
// Loop on All span
randomBackground.forEach((span) => {
  // Click on every span
  span.addEventListener("click", (e) => {
    
    handleActive(e);

    if (e.target.dataset.background === "yes") {

      bgOption = true;

      randomizeImgs();

      localStorage.setItem("bg_option", true);

    } else {

      bgOption = false;

      clearInterval(bgInterval);

      localStorage.setItem("bg_option", false);
    }
  });
});

/******************************** Home Image Section ********************************/
let homeSection = document.querySelector(".home");

// Get Array of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function randomize images
function randomizeImgs() {
  if (bgOption === true) {

    bgInterval = setInterval(() => {

      // Get Random Images
      let randomImg = Math.floor(Math.random() * imgsArray.length);

      // change background Image URL
      homeSection.style.backgroundImage =
        'url("imgs/' + imgsArray[randomImg] + '")';

    }, 8000);
  };
};

randomizeImgs();

/***************************** Show / Hide Bullets *****************************/
let showBullets = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocal = localStorage.getItem("bullets_option");

if (bulletLocal !== null){

  showBullets.forEach(span => {

    span.classList.remove("active");
  });

  if (bulletLocal === "block"){

    bulletContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");

  } else{

    bulletContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  };
};

// Loop on All span
showBullets.forEach(span => {

  // Click on every span
  span.addEventListener("click", (e) => {

    if (span.dataset.display === "show") {

      bulletContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");

    } else {

      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

/****************************** Reset Options Button ******************************/
document.querySelector(".setting-box  .reset-options").onclick = function (){

  localStorage.clear();
  // localStorage.remove("color_option");
  // localStorage.remove("bg_option");
  // localStorage.remove("bullets_option");

  // Relode The Window
  window.location.reload();
}

/********************** Move to somewhere by Links / bullets **********************/
let allLinks = document.querySelectorAll("header ul li a");
let allbullets = document.querySelectorAll(".nav-bullets .bullets");
/*
allbullets.forEach(bullet =>{
  bullet.addEventListener("click", (e)=>{
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth"
    });
  });
});
*/
function toSomeWhere(elements) {

  elements.forEach((ele) => {

  ele.addEventListener("click", (e) => {

      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: "smooth",

      });
    });
  });
};

toSomeWhere(allLinks);
toSomeWhere(allbullets);

/*********************************** Handle Function ***********************************/
function handleActive (ev) {

  // Remove active class from all spans
  ev.target.parentElement.querySelectorAll(".active").forEach( ele => {

    ele.classList.remove("active");
  });

  // Add active class on element
  ev.target.classList.add("active");
};

/******************************** Skills Section ********************************/
// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

/******************************** Gallery Section ********************************/

//craete Popup to our gallery
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Craete overlay element
    let overlay = document.createElement("div");
    // add class name to overlay
    overlay.className = "popup-overlay";

    // append overlay to body
    document.body.appendChild(overlay);

    // Create popup box
    let popupBox = document.createElement("div");
    // add class name to popupBox
    popupBox.className = "popup-box";

    /*********************************/

    if (img.alt !== null) {
      // Create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append imgText to Heading
      imgHeading.appendChild(imgText);

      // append imgHeading to popup-box
      popupBox.appendChild(imgHeading);
    }

    /*********************************/

    // create image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // append image to popup box
    popupBox.appendChild(popupImage);

    // append popupBox to body
    document.body.appendChild(popupBox);

    /*********************************/

    // create span to close popup-box
    let closeButon = document.createElement("span");

    // create text to close buton
    let closeButtonText = document.createTextNode("X");

    // append textNode to span
    closeButon.appendChild(closeButtonText);

    // add class to closeButton
    closeButon.className = "close-button";

    // append span to popup-box
    popupBox.appendChild(closeButon);
  });
});

// close popup-box
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

/******************************** Header Responsive ********************************/
let openLinks = document.querySelector("header .fa-bars");
let closeLinks = document.querySelector("header .fa-times");
let headerBackground = document.querySelector("header ul");

openLinks.addEventListener("click", (e) => {

  e.stopPropagation();
  headerBackground.classList.add("open");
});

closeLinks.addEventListener("click", () => {
  headerBackground.classList.remove("open");
});

// Click anywhere on body to close sidebar 
document.addEventListener("click", (e) =>{

  if (e.target !== closeLinks && e.target !== headerBackground){

    //check if sidebar is open ?!
    if (headerBackground.classList.contains("open")){

      headerBackground.classList.remove("open");
    };
  };
});
// عشان لما تيجي تدوس ف اي حته ف (اليو ال) السايد متتقفلش لكن لما تضغط ف اي حته تانيه تتقفل
headerBackground.onclick = function(e){
  e.stopPropagation();
};

/**************************** Header background on scroll ****************************/
window.onscroll = function (){
  document.querySelector("header").classList.toggle("sticky", window.scrollY > 0);
}