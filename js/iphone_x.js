(function() {

	let DOM = {
		clock: document.getElementById('clock'),
		date: document.getElementById('date')
	},
		 showTime = function() {
			 setInterval(function() {
				 let time = new Date;
				 let hours = time.getHours();
				 let minutes = time.getMinutes();
				 
				 
				 if(hours < 10) {
					 hours = '0' + hours;
				 }
				 
				 if(minutes < 10) {
					 minutes = '0' + minutes;
				 }
			 	
				DOM.clock.textContent = hours + ':' + minutes;
			 }, 1000);
		 },
		 
		 showDate = function() {
			 let time = new Date,
				  allMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				  date = time.getDate(),
				  weekDay = time.getDay(),
				  weekDayName,
				  month = time.getMonth(),	
				  printMonth;
			 
			 for(let i = 0; i < allMonth.length; i++) {
				 if(i === month) {
					 printMonth = allMonth[i];
				 }
			 };
			 
			 for(let j = 0; j < weekDays.length; j++) {
				 if(j === weekDay) {
					 weekDayName = weekDays[j];
				 }
			 }
			 
			 
			 DOM.date.textContent = weekDayName + ', ' + printMonth + ' ' + date;
		 }
	
	showTime();
	showDate();
})();