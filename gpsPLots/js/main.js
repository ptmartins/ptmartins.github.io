
(function() {

    let map,
        btns = null,
        dataSize = 'all',
        dataSpecies = 'all',
        corner1 = L.latLng(45.00, -7.00),
        corner2 = L.latLng(35.00, -11.00),
        years = [],
        species = [],
        mapOptions = {
            center: [38.7223, -9.1393],
            zoom: 7,
            maxZoom: 16,
            minZoom: 7
        },

        /**
         * UI elements object
         */
        UI = {
            btn: (txt) => {
                let btn = document.createElement('button');
                btn.className = 'btn';
                btn.innerHTML = txt;
                btn.setAttribute('data-species', txt.toLowerCase());

                return btn;
            },

            btnGroup: (title) => {
                let btnGroup = document.createElement('div'),
                    _title = document.createElement('h2');
                btnGroup.className = 'btn-group';
                _title.className = 'btn-group-title';
                _title.textContent = title;

                btnGroup.appendChild(_title);

                return btnGroup;
            }
        },

        /**
         * Clear all buttons
         */
        clearBtns = () => {
            btns.forEach(btn => {
                if(btn.classList.contains('active')) {
                    btn.classList.remove('active');
                }  
            });
        },
    
        /**
         * Render filters UI
         */
        renderFilters = () => {
            if(species.length > 0) {
                let speciesGroup = UI.btnGroup('Species'),
                    btnAll = UI.btn('All');

                btnAll.classList.add('active');
                speciesGroup.appendChild(btnAll);
                species.forEach(specie => {
                    let btn = UI.btn(specie);
                    btn.addEventListener('click', () => {
                        clearBtns();
                        btn.classList.add('active');
                        behaviour = specie;
                        renderMap();
                    });
                    speciesGroup.appendChild(btn);
                });
                document.querySelector('.controls').appendChild(speciesGroup);
            }
            btns = document.querySelectorAll('.btn');
        },

        /**
         * Setup events
         */
        setupEvents = () => {
            btns.forEach(btn => {
                btn.addEventListener('click', ev => {

                    clearBtns();
                    ev.target.classList.add('active');
                    
                    if(ev.target.dataset.species) {

                        dataSpecies = ev.target.dataset.species.toLowerCase();
                    }
                

                    map.remove();
                    renderMap();
                });
            })
        },

        /**
         * Add markers to map
         */
        addPoints = data => {

            for (var i = 0; i < data.length; i++) {
                if(dataSpecies === 'all') {
                    L.marker([data[i].latitude, data[i].longitude])
                        .bindPopup(data[i].common_name)
                        .addTo(map);
                } 
                else if(dataSpecies == data[i].common_name.toLowerCase()) {
                    L.marker([data[i].latitude, data[i].longitude])
                        .bindPopup(data[i].common_name)
                        .addTo(map);
                }
            }
        },

        /**
         * Get Species
         */
        getSpecies = data => {
            data.forEach(item => {
                let _species = item.common_name;
                if(!species.includes(_species)) {
                    species.push(_species);
                }
            });
        },

        /**
         * Render Map
         */
        renderMap = () => {

            fetch('/data/data.json')
                .then(response => response.json())
                .then(data => {

                    getSpecies(data);

                    map = L.map('map').setView(mapOptions.center, mapOptions.zoom);
                    map.options.maxZoom = mapOptions.maxZoom;
                    map.options.minZoom = mapOptions.minZoom;
                    map.setMaxBounds([corner1, corner2]);
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            attribution: '© OpenStreetMap'
                        }).addTo(map);
            
                    addPoints(data);
                    if(btns === null) {
                        renderFilters();
                        setupEvents();
                    }
                })
        };

    renderMap();
    window.addEventListener('resize', renderMap);

})();