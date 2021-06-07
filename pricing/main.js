(function() {

    const DOM = {};

    let cacheDOM = () => {
            DOM.switch = document.querySelector('.billing-switch input');
            DOM.prices = document.querySelectorAll('.card-price');
        },

        setEvents = () => {
            DOM.switch.addEventListener('click', setPrices);
        },

        setPrices = () => {
            for(i = 0; i < DOM.prices.length; i++) {
                if(DOM.switch.checked) {
                    DOM.prices[i].innerHTML = '$' + DOM.prices[i].dataset.annually;
                } else {
                    DOM.prices[i].innerHTML = '$' + DOM.prices[i].dataset.monthly;
                }
                
            }
        },

        init = () => {
            cacheDOM();
            setEvents();
            setPrices();
        }

    window.addEventListener('DOMContentLoaded', init);
})();
