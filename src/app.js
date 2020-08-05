const toggleMenu = document.getElementById('toggle-menu');
const nav = document.getElementById('nav');
const navStatus = false;


// determines if the user has a set theme
function detectColorScheme() {
    let theme = "light";    //default to light

    //local storage is used to override OS theme settings
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            theme = "dark";
        }
    } else if (!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        theme = "dark";
    }

    //dark theme preferred, set document with a `data-theme` attribute
    if (theme == "dark") {
        // document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add('dark');
        toggleSwitch.checked = true;
    } else {
        document.documentElement.classList.add('light');
    }

}



//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function openMenu() {

    if (nav.classList.contains('open')) {
        nav.classList.remove('open');
    } else {
        nav.classList.add('open');
    }

}

//listener for changing themes
toggleMenu.addEventListener('click', openMenu, false);

