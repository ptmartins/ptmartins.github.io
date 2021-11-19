(function() {

    let DOM = {},
        root = document.querySelector(':root'),

        cacheDOM = () => {
            DOM.colorSwitcher = document.querySelector('.colorSwitcher');
            DOM.colorSwitcherBtn = document.querySelector('.colorSwitcher-btn');
            DOM.panelBtns = Array.from(document.querySelectorAll('.panel-btn'));
            DOM.colorPanel = document.querySelector('.colorSwitcher-panel');
        },

        toggleColorSwitcher = () => {
            DOM.colorSwitcher.classList.toggle('active');
        },

        clearBtns = () => {
            DOM.panelBtns.forEach(btn => {
                if(btn.classList.contains('active')) {
                    btn.classList.remove('active');
                }
            })
        },

        toggleActiveBtn = (el) => {
            if(!el.classList.contains('active')) {
                el.classList.add('active');
            }
        },

        setColor = (ev) => {
            let color = ev.target.dataset.color;

            if(ev.target.classList.contains('panel-btn')) {
                root.style.setProperty('--accent-color', color);
                clearBtns();
                toggleActiveBtn(ev.target);
            }
        },

        setupEvents = () => {
            DOM.colorSwitcherBtn.addEventListener('click', toggleColorSwitcher);
            DOM.colorPanel.addEventListener('click', setColor);
        },

        init = () => {
            cacheDOM();
            setupEvents();
        };

    window.addEventListener('DOMContentLoaded', init);

})();