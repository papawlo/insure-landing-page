const toggleMenu = document.getElementById('toggle-menu');
const nav = document.getElementById('mobile-nav');
const iconHamburger = document.getElementById('icon-hamburger');
const iconClose = document.getElementById('icon-close');


//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function openMenu() {

    if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        iconHamburger.classList.remove('hide');
        iconClose.classList.add('hide');
    } else {
        nav.classList.add('open');
        iconHamburger.classList.add('hide');
        iconClose.classList.remove('hide');
    }

}

//listener for changing themes
toggleMenu.addEventListener('click', openMenu, false);

