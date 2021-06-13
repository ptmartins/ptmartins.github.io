(function() {
    let DOM = {},
        setEl,
        selectOptions,
        select, 
        selectItems,
        option,
        pseudo,

        /**
         * Cache DOM elemtns
         */
        cacheDOM = () => {
            DOM.customSelects = document.querySelectorAll('.u-select');
            DOM.nav = document.querySelector('.nav__list');
            DOM.burgerMenu = document.getElementById('burgerMenu');
            DOM.hamburger = document.getElementById('hamburger');
        },

        /**
         * Handle custom drop-downs
         */
        handleSelects = () => {
            for(let i = 0; i < DOM.customSelects.length; i++) {
                setEl = DOM.customSelects[i].querySelector('select');
                selectOptions = setEl.length;

                select = document.createElement("DIV");
                select.className = "select";
                select.innerHTML = setEl.options[setEl.selectedIndex].innerHTML;

                DOM.customSelects[i].appendChild(select);

                selectItems = document.createElement("DIV");
                selectItems.className = "select__items select--hide";

                for (let j = 1; j < selectOptions; j++) {
                    option = document.createElement("DIV");
                    pseudo = document.createElement("SPAN");
                    pseudo.className = 'pseudo fas fa-check';
                    option.innerHTML = setEl.options[j].innerHTML;
                    option.addEventListener("click", function(ev) {
                        let k, ha, y, i, sa,  sl, yl;
                        sa = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        sl = sa.length;
                        ha = this.parentNode.previousSibling;
                        for (i = 0; i < sl; i++) {
                          if (sa.options[i].innerHTML == this.innerHTML) {
                            sa.selectedIndex = i;
                            ha.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("isSelected");
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                              y[k].removeAttribute("class");
                            }
                            this.className = "isSelected";
                            this.appendChild(pseudo);
                            break;
                          }
                        }
                        ha.click();
                    });
                    selectItems.appendChild(option);
                }   

                DOM.customSelects[i].appendChild(selectItems);
                select.addEventListener("click", function(ev) {
                  ev.stopPropagation();
                  closeCustomSelects(this);
                  this.nextSibling.classList.toggle("select--hide");
                  this.classList.toggle("select__arrow--active");
                });


            }   
        },

        /**
         * Close custom drop-downs
         */
        closeCustomSelects = (els) => {
            let selectItems, select, i, selectItemsLength, selectLength, arr = [];
            
            selectItems = document.getElementsByClassName("select__items");
            select = document.getElementsByClassName("select");
            selectItemsLength = selectItems.length;
            selectLength = select.length;
            
            for (i = 0; i < selectLength; i++) {
              if (els == select[i]) {
                arr.push(i)
              } else {
                select[i].classList.remove("select__arrow--active");
              }
            }
            
            for (i = 0; i < selectItemsLength; i++) {
              if (arr.indexOf(i)) {
                selectItems[i].classList.add("select--hide");
              }
            }
        },


        /**
         * Handle Burger menu
         */
        handleBurgerMenu = () => {
            DOM.hamburger.classList.toggle('active');
            DOM.nav.classList.toggle('active');
        },

        /**
         * Setup Events
         */
        setupEvents = () => {
            document.addEventListener('click', closeCustomSelects);
            DOM.burgerMenu.addEventListener('click', handleBurgerMenu);
        },



        /**
         * Kick-off
         */
        init = () => {
            cacheDOM();
            handleSelects();
            setupEvents();
        };

    window.addEventListener('DOMContentLoaded', init);

})();