(function() {

    /**
     * DOM cache
     */
    const DOM = {},

    
    /**
     * Cache DOM elements
     */
    cacheDOM = () => {
        DOM.parallaxItems = document.querySelectorAll('.parallax__item');
    },


    /**
     * Max allowed scroll
     */
    maxScroll = () => {
        return (document.querySelector('.section--last').offsetHeight);
    }


    /**
     * Trigger parallax effect
     */
    triggerParallax = (ev) => {
        let scrollY = window.pageYOffset,
            i = 0,
            items = DOM.parallaxItems.length;

        for(i; i < items; i++) {
            let rate = scrollY * DOM.parallaxItems[i].dataset.parallax;
            if(scrollY >= maxScroll()) {
                return false;
            }
            DOM.parallaxItems[i].style.transform = `translate3D(0px, ${rate}px, 0px)`;
        }
    },


    /**
     * Setup Event Listeners
     */
    setEvents = () => {
        window.addEventListener('scroll', triggerParallax);
    },


    /**
     * Kick off
     */
    init = () => {
        cacheDOM();
        setEvents();
    };


    document.addEventListener('DOMContentLoaded', init);

})();