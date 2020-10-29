(function() {

    let options = {
            bgColor: '#53f6c7',
            color: '#1d1b24',
            fontSize: 2.8,
            size: 50
        },
        menuBtn = document.getElementById('menuBtn'),
        sideNav = document.getElementById('nav'),
        links = document.getElementsByClassName('nav-link'),
        hamburger = document.getElementById('hamburger'),

        showMenu = function() {
            debugger;
            sideNav.classList.toggle('open');

            if(hamburger.classList.contains('active')){
                hamburger.classList.remove('active');
            }
            else {
                hamburger.classList.add('active');
            }
 
        },

        addEventListeners = function() {
            
            menuBtn.addEventListener('click', showMenu);
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