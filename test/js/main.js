(function() {
    let DOM = {},
        setEl,
        ll,
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
                ll = setEl.length;

                select = document.createElement("DIV");
                select.className = "select--selected";
                select.innerHTML = setEl.options[setEl.selectedIndex].innerHTML;

                DOM.customSelects[i].appendChild(select);

                selectItems = document.createElement("DIV");
                selectItems.className = "select__items select--hide";

                for (let j = 1; j < ll; j++) {
                    option = document.createElement("DIV");
                    pseudo = document.createElement("SPAN");
                    pseudo.className = 'pseudo fas fa-check';
                    option.innerHTML = setEl.options[j].innerHTML;
                    // option.appendChild(pseudo);
                    option.addEventListener("click", function(e) {
                        let y, i, k, s, h, sl, yl;
                        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        sl = s.length;
                        h = this.parentNode.previousSibling;
                        for (i = 0; i < sl; i++) {
                          if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
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
                        h.click();
                    });
                    selectItems.appendChild(option);
                }   

                DOM.customSelects[i].appendChild(selectItems);
                select.addEventListener("click", function(e) {
                  e.stopPropagation();
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
            let x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select__items");
            y = document.getElementsByClassName("select--selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
              if (els == y[i]) {
                arrNo.push(i)
              } else {
                y[i].classList.remove("select__arrow--active");
              }
            }
            for (i = 0; i < xl; i++) {
              if (arrNo.indexOf(i)) {
                x[i].classList.add("select--hide");
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