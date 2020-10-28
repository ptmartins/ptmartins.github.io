(function(timeLine){
  
    var tLineContainer = document.getElementById('tLine'),
    timelineTooltip,
    timelineYears,
    activeYear,
    tooltipPrev,
    tooltipNext,
    tootltipMouseDownX,
    year = '',
    yearRange = null,
    scale = '',
    allYears,
    yearsData = [],
    yearsDistances = [],
    averageYearDistance,
    tooltipWidth = 0,
    hasScaleOption = false,
    tooltipStart,
    tooltipEnd,
    viewportWidth,
  
    // Default options
    options = {
      startYear: new Date().getFullYear() - 10,
      endYear: new Date().getFullYear()
    },
  
    // Check if scaffold markup is present
    checkMarkup = function() {
      if(tLineContainer){
        buildMarkup(); 
      } else {
        alert('Your markup is missing an element with an ID = tLine'); 
      }
    }, 
  
    // Build timeline markup
    buildMarkup = function() {  
      var tooltip_template = `<div id="timelineTooltip" class="tLine-allDates-slide">
        <div class="tooltipDate">
          <span id="tooltipPrev" class="icon-back tootltipArrow"> < </span>
          <span id="tooltipYear" class="tooltipYear"></span>
          <span id="tooltipNext" class="icon-forward tootltipArrow"> > </span>
        </div>
      </div>`;
  
      var year = options.startYear;
  
      var all_dates = document.createElement('DIV');
      all_dates.classList.add('tLine-allDates');	
      tLineContainer.appendChild(all_dates);
      all_dates.innerHTML = tooltip_template;
  
      
      for(var i = 0; i < (options.endYear - options.startYear + 1); i++) {
        var year_content = document.createElement('DIV');
        var label_content = document.createElement('SPAN');
        
        year_content.classList.add('tLine-date');
        label_content.classList.add('tLine-date-label');
        year_content.setAttribute('data-year', year);
        label_content.textContent = year;
        year_content.appendChild(label_content);
        all_dates.appendChild(year_content);
  
        year += 1;
      }
    
  
      document.querySelector('.tLine-allDates .tLine-date:last-child').classList.add('isActive'); 
  
      activeYear = document.querySelector('.tLine-date.isActive');
      tooltipPrev = document.querySelector('.icon-back');
      tooltipNext = document.querySelector('.icon-forward'); 
      timelineYears = document.getElementsByClassName('tLine-date');
      timelineTooltip =  document.getElementById('timelineTooltip');
      
      allYears = document.getElementsByClassName('tLine-date');
  
      adjustYearScale(all_dates);
    },
  
    // Calculate how many years in range
    getYearRange = function() {
      yearRange = options.endYear - options.startYear;
    },
  
    // Automatically adjust the timeline scale base on the year range ...
    // ... if no scale is provided when initalizing the timeline
    adjustYearScale = function(el) {
      switch(true) {
        case(yearRange >= 70):
          for(var i = 0; i < allYears.length; i++) {
            if(allYears[i].dataset.year % 10 == 0) {
              allYears[i].style.visibility = 'visible';
            }
          }
        break;
        case(yearRange < 70 && yearRange >= 40):           
          for(var j = 0; j < allYears.length; j++) {
            if(allYears[j].dataset.year % 5 == 0) {
              allYears[j].style.visibility = 'visible';
            }
          }
        break;
        case(yearRange < 40 && yearRange > 10):
          for(var k = 0; k < allYears.length; k++) {
            if(allYears[k].dataset.year % 2 == 0) {
              allYears[k].style.visibility = 'visible';
            }
          }  
        break;           
        default:
          for(var l = 0; l < allYears.length; l++) {
            if(allYears[l].dataset.year % 1 == 0) {
              allYears[l].style.visibility = 'visible';
            }
          }
        break;
      }
    }, 
  
    // Get active year
    getActiveYear = function() {
      var activeYear = document.querySelector('.tLine-date.isActive');
      return activeYear; 
    },   
  
    // Populate tooltip
    populateTooltip = function() {
      var a = getActiveYear();
      var year = a.dataset.year;
      tooltipYear.textContent = year;
    },
  
    // Place timeline tooltip
    placeTooltip = function(activeEl) {
      var horizontalPos = activeEl.offsetLeft,
          tooltipWidth = timelineTooltip.offsetWidth;
  
      timelineTooltip.style.left = (horizontalPos - (tooltipWidth / 2) + 12) + 'px';
    },
  
    // GoTo next in timeline
    goToNext = function() {
      var currentActiveYear = getActiveYear();
      var nextYear = currentActiveYear.nextElementSibling;
  
      placeTooltip(nextYear);
      resetActive(); 
      nextYear.classList.add('isActive');
      populateTooltip();
    },
  
    // GoTo previous in timeline
    goToPrev = function() {
      var currentActiveYear = getActiveYear();
      var prevYear = currentActiveYear.previousElementSibling;
  
      placeTooltip(prevYear);
      resetActive();  
      prevYear.classList.add('isActive'); 
      populateTooltip();
    },
  
    // Reset all years
    resetActive = function() {
      for(var i = 0; i < timelineYears.length; i++) {
        if(timelineYears[i].classList.contains('isActive')) {
          timelineYears[i].classList.remove('isActive');
        }
      }
    },
  
    // Drag tooltip when tooltip is clicked
    dragTooltip = function(e) {
      e = e || window.event;
      e.preventDefault();
      tootltipMouseDownX = (e.pageX - this.offsetLeft);
      
      tooltipStart = this.offsetLeft;
      
      mouseDownInitPos = e.pageX;
      
      document.onmousemove = drag;
      document.onmouseup = stopDrag;
    },
  
    // 
    drag = function (e) {
      e = e || window.event; 
      e.preventDefault();
        
      timelineTooltip.style.transition = 'none';
      var travel = e.pageX - tootltipMouseDownX,
          tooltipWidth = timelineTooltip.offsetWidth,
          centeredPosition = (travel + (tooltipWidth / 2)),
          dif = tooltipStart - travel;    
  
      for(var i = 0; i < yearsData.length; i++) {
        if(Math.abs(Math.floor(centeredPosition) - (yearsData[i].positionX + 12)) < 10)  {
          resetActive(); 
          yearsData[i].domEl.classList.add('isActive');
          populateTooltip();
  
          timelineTooltip.style.left =  (yearsData[i].positionX + 12 - (tooltipWidth / 2)) + "px";
        }  
      }
    }, 
  
    // Stop Drag Tooltip
    stopDrag = function() {
      document.onmouseup = null;
      document.onmousemove = null;
      timelineTooltip.style.transition = "all 0.3s ease-in-out";
    },
  
    // Add Event Listeners
    addEventListeners = function() {
      var timelineYears = document.getElementsByClassName('tLine-date'),
        tooltipYear = document.getElementById('tooltipYear'),
        activeYear = getActiveYear();
  
      // Timeline 'click' events 
      for(var i = 0; i < timelineYears.length; i++) {
        timelineYears[i].addEventListener('click', function(e) {
        placeTooltip(e.target);
  
        if(!e.target.classList.contains('isActive')) {
          var active = getActiveYear();
  
          active.classList.remove('isActive');
          e.target.classList.add('isActive'); 
        }
  
        populateTooltip(); 
        });
      } 
  
      tooltipPrev.addEventListener('click', goToPrev);
      tooltipNext.addEventListener('click', goToNext);
      timelineTooltip.addEventListener('mousedown', dragTooltip);
      timelineTooltip.addEventListener('touchstart', handleTouchSlideTooltip);
      
      window.onload = function() {
        populateTooltip();
        placeTooltip(activeYear); 
        
        computeYears();
        checkViewportWidth();
      };
  
      window.onresize = function() {
        var a = getActiveYear();  
        placeTooltip(a);
  
        computeYears();
        checkViewportWidth();
      };
    },
  
    handleTouchSlideTooltip = function(e) {
      e = e || window.event; 
      e.preventDefault();

      tootltipMouseDownX = (e.touches[0].pageX - this.offsetLeft);
      tooltipStart = this.offsetLeft;    
      mouseDownInitPos = e.touches[0].pageX;

      document.addEventListener('touchmove', handleTouchMoveTooltip);
      document.addEventListener('touchend', handleTouchEndTooltip);
    },


    handleTouchMoveTooltip = function(e) {
      timelineTooltip.style.transition = 'none';
      var travel = e.touches[0].pageX - tootltipMouseDownX,
          tooltipWidth = timelineTooltip.offsetWidth,
          centeredPosition = (travel + (tooltipWidth / 2)),
          dif = tooltipStart - travel;    
  
      for(var i = 0; i < yearsData.length; i++) {
        if(Math.abs(Math.floor(centeredPosition) - (yearsData[i].positionX + 12)) < 10)  {
          resetActive(); 
          yearsData[i].domEl.classList.add('isActive');
          populateTooltip();
  
          timelineTooltip.style.left =  (yearsData[i].positionX + 12 - (tooltipWidth / 2)) + "px";
        }  
      }
        
    },

    handleTouchEndTooltip = function(e) {
      document.removeEventListener('touchmove', handleTouchMoveTooltip);
      document.removeEventListener('touchend', handleTouchEndTooltip);
      timelineTooltip.style.transition = "all 0.3s ease-in-out";
    },


    // Utility method to extend default options with user options
    extendDefaults = function(source, properties) {
      var property;
      for (property in properties) {
        if (properties.hasOwnProperty(property)) {
          source[property] = properties[property];
        }
      }
      return source;
    },
  
    // Get the exact position for all years
    getYearsData = function() {
      // var allYears = document.getElementsByClassName('tLine-date');
      for(var i = 0; i < allYears.length; i++) {
        yearsData[i] = {
          domEl: allYears[i],
          number: i,
          year: allYears[i].dataset.year,
          positionX: allYears[i].offsetLeft
        }; 
      }
    },
  
    getDifBetweenYears = function() {
      var start = 0;
      
      yearsData.forEach(function(obj){
          var end = obj.positionX;
          var dif = end - start;
          if(dif < 0) {
            dif = dif * (-1);
          } 
          yearsDistances.push(dif);
          start = end;
      });
    },
  
    getYearAverageDist = function() {
      var acc = 0;
      var average;
      
      yearsDistances.forEach(function(val) {
        acc += val;
      });
      
      average = acc / yearsDistances.length;
      
      averageYearDistance = average;
    },
  
    computeYears = function() {
      yearsData = [];
      yearsDistances = [];
      
      getYearsData();
      getDifBetweenYears();
      getYearAverageDist();
    },

    checkViewportWidth = function() {
      viewportWidth = window.innerWidth;

      if(viewportWidth < 500) {
        for(var i = 0; i < allYears.length; i++) {
          allYears[i].style.visibility = 'hidden';
        }
      } else {
        var allDates = document.querySelector('.tLine-allDates');
        adjustYearScale(allDates);
      }
    };
  
    timeLine.init = function(custom) {
  
      if (custom && typeof custom === "object") {
        this.options = extendDefaults(options, custom);
        var args = custom;
        if(args.hasOwnProperty('scale')) {
          hasScaleOption = true;
        }
      }
  
      getYearRange();
      checkMarkup();
      addEventListeners();
      populateTooltip();
      placeTooltip(activeYear);
    };
  
  }(window.timeLine = window.timeLine || {}));


timeLine.init();