var input = document.querySelector('.colorInput'),
	 menu = document.getElementById('menu'),
	 menuCloseBtn = document.getElementById('close-btn'),
	 controlPanel = document.getElementById('controlPanel'),	
	 picker = new Pickr({
		 el: input,
		 useAsButton: true,
		 default: '#fafafa',
		 defaultRepresentation: 'HSLA',
		 theme: 'monolith',

		 swatches: [
			 'rgba(244, 67, 54, 1)',
			 'rgba(233, 30, 99, 0.95)',
			 'rgba(156, 39, 176, 0.9)',
			 'rgba(103, 58, 183, 0.85)',
			 'rgba(63, 81, 181, 0.8)',
			 'rgba(33, 150, 243, 0.75)',
			 'rgba(3, 169, 244, 0.7)',
			 'rgba(0, 188, 212, 0.7)',
			 'rgba(0, 150, 136, 0.75)',
			 'rgba(76, 175, 80, 0.8)',
			 'rgba(139, 195, 74, 0.85)',
			 'rgba(205, 220, 57, 0.9)',
			 'rgba(255, 235, 59, 0.95)',
			 'rgba(255, 193, 7, 1)'
		 ],

		 components: {
			 preview: true,
			 opacity: true,
			 hue: true,

			 interaction: {
				 hex: true,
				 rgba: true,
				 hsva: true,
				 input: true,
				 save: true
			 }
		 }
	 });

console.log(picker);

picker.on('init', pickr => {
	debugger;
	input.style.backgroundColor = pickr.getSelectedColor().toRGBA().toString(0);
}).on('save', color => {
	let colorValue = color.toHSLA().toString(0);
	input.style.backgroundColor = colorValue;
	setPrimaryColor(color);
	setLightenDarkenColor(color, 15);
	picker.hide();
})

/**
* SET PRIMARY COLOR
*/
function setPrimaryColor(color) {

	let h = parseInt(color.toHSLA()[0]),
		 s = parseInt(color.toHSLA()[1]), 
		 l = parseInt(color.toHSLA()[2]),
		 a = parseInt(color.toHSLA()[3]);

	document.querySelector('html:root').style.setProperty('--primary-accent-h', h);
	document.querySelector('html:root').style.setProperty('--primary-accent-s', s);
	document.querySelector('html:root').style.setProperty('--primary-accent-l', l);
}


/**
* UPDATE COLOR
*/
// function updateColor(ev) { 
// 	document.querySelector('html:root').style.setProperty(`--c-${this.dataset.prop}`, this.value);
// }

function addEventListeners() {
	menu.addEventListener('click', function() {
		controlPanel.classList.add('active');
	});

	menuCloseBtn.addEventListener('click', function() {
		controlPanel.classList.remove('active');
	});
}

function setLightenDarkenColor(color, amt) {

	var h = Math.round(color.toHSLA()[0]),
		 s = Math.round(color.toHSLA()[1]),
		 l = Math.round(color.toHSLA()[2]),
		 hoverColor = '';

	if(l < 50) {
		l += amt;
	} else {
		l -= amt;
	}

	hoverColor = "hsla(" + h.toString() + ',' + s.toString() + '%,' + l.toString() + '%,' + '1)';

	document.querySelector('html:root').style.setProperty('--c-primary-accent-hover-color', hoverColor);
}

addEventListeners();