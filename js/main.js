(function() {

    let options = {
            bgColor: '#53f6c7',
            color: '#1d1b24',
            fontSize: 2.8,
            size: 50
        },
        menuBtn = document.getElementById('menuBtn'),
        sideNav = document.getElementById('sideNav'),
        closeBtn = document.getElementById('closeBtn'),
        links = document.getElementsByClassName('sideNav-link'),

        showMenu = function() {
            sideNav.classList.toggle('open');
        },

        addEventListeners = function() {
            menuBtn.addEventListener('click', showMenu);
            closeBtn.addEventListener('click', showMenu);
            for(let i = 0; i < links.length; i++) {
                links[i].addEventListener('click', showMenu);
            }
        },
    
        init = function() {
            scrollToTop.init(options); 
            addEventListeners();
        };

    window.addEventListener('DOMContentLoaded', init);
})()