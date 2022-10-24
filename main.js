// Navbar

function navresp(){
    var navbar = document.getElementById('navbar');
    var icon = document.getElementById('menu-icon');

    icon.onclick(navbar.classList.toggle('active'));
}

function resetnav(){
    var navbar = document.getElementById('navbar');
    var icon = document.getElementById('menu-icon');

    icon.onblur(navbar.classList.remove('active'));
}


// Dark Mode
function darkmode(){
    var dark = document.getElementById('darkmode');
    var body = document.getElementById('body');
    if(dark.classList.contains('bx-moon')){
        dark.classList.replace('bx-moon','bx-sun');
        body.classList.add('active');
    }else{
        dark.classList.replace('bx-sun','bx-moon');
        body.classList.remove('active');
    }
}