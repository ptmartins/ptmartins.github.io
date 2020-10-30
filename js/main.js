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
        sections = document.getElementsByClassName('section'),
        greetings = document.querySelector('.greetings'),
        learnMore = document.querySelector('.btn--learnMore'),
        about = document.querySelector('.about-contents'),
        skills = document.querySelectorAll('.language-item'),

        /**
         * Toggle navigation menu
         */
        showMenu = function() {
            sideNav.classList.toggle('open');

            if(hamburger.classList.contains('active')){
                hamburger.classList.remove('active');
            }
            else {
                hamburger.classList.add('active');
            }
 
        },

        /**
         * Attach event listeners
         */
        addEventListeners = function() {
            
            menuBtn.addEventListener('click', showMenu);
            for(let i = 0; i < links.length; i++) {
                links[i].addEventListener('click', showMenu);
            }

            for(let j = 0; j < sections.length; j++) {
                sectionsObserver.observe(sections[j]);
            }
        },

        /**
         * Hero section animation
         */
        animHero = function() {
            gsap.fromTo(greetings, {
                opacity: 0
            }, {
                delay: .3,
                opacity: 1,
                duration: 1,
                autoAlpha: 1,
                ease: 'none'
            });
            gsap.fromTo(learnMore, {
                opacity: 0
            }, {
                delay: .5,
                opacity: 1,
                duration: .5,
                autoAlpha: 1,
                ease: 'none'
            })
        },

        /**
         * About section animation
         */
        animAbout = function() {
            gsap.fromTo(about, {
                opacity: 0
            }, {
                delay: .75,
                opacity: 1,
                duration: 1,
                autoAlpha: 1,
                ease: 'none'
            });
        },

        /**
         * Skills section animation
         */
        animSkills = function() {
            for(let i = 0; i < skills.length; i++) {
                gsap.fromTo(skills[i],{
                    opacity: 0
                }, {
                    opacity: 1,
                    delay: 0 + (i/2),
                    duration: .5,
                    autoAlpha: 1,
                    ease: 'none'
                });
            }
        },

        /**
         * Trigger section animations
         */
        animEls = function(entries, observer) {
            entries.forEach(entry => {
                if(entry.isIntersecting && entry.target.classList.contains('section--hero')) {
                    animHero();
                    sectionsObserver.unobserve(entry.target);
                }
                else if(entry.isIntersecting && entry.target.classList.contains('section--about')) {
                    animAbout();
                    sectionsObserver.unobserve(entry.target);
                }
                else if(entry.isIntersecting && entry.target.classList.contains('section--skills')) {
                    animSkills();
                    sectionsObserver.unobserve(entry.target);
                }
            })         
        },

        /**
         * Instantiate section Observer
         */
        sectionsObserver = new IntersectionObserver(animEls, {threshold: .3}),

        /**
         * Init function to kickoff 
         */
        init = function() {
            scrollToTop.init(options); 
            addEventListeners();
        };

    window.addEventListener('DOMContentLoaded', init);
})()