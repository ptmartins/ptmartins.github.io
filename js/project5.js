// ------ DOM cache -------
var list = document.getElementById('groupsList'),
	 tags = document.getElementsByClassName('groupOptions-groupTag'),
	 tagsArray = Array.prototype.slice.call(tags, 0),
	 searchInput = document.getElementById('searchInput'),
	 searchBtn = document.getElementById('searchBtn'),
	 radioBtns = document.getElementsByClassName('radioBtn'),
	 sortSelectedBtn = document.getElementById('sortSelected'), 
	 filterAlphaBtn = document.getElementById('filterAlpha'),
	 clearSelectedBtn = document.getElementById('resetSelected'),
	 selectAllBtn = document.getElementById('selectAll'),
	 selectedNum = document.getElementById('selectedNum'),
	 filtered = false;


// ------- Event Listeners -------
list.addEventListener('click', selectTag);
filterAlphaBtn.addEventListener('click', sortTags);
clearSelectedBtn.addEventListener('click', resetSelected);
selectAllBtn.addEventListener('click', selectAll);
searchInput.addEventListener('keyup', filterTags);
searchBtn.addEventListener('click', clearSearch);
sortSelectedBtn.addEventListener('click', sortBySelected);

var total = 0;


// ------- Select Tag (UI only) function -------
function selectTag(e) {

	var target = e.target;

	if(target.matches('I')) {
		target = e.target.parentElement;
	}
	
	if(target.matches('LI')) {
		if(!target.classList.contains('active')) {
			target.classList.add('active');
			sortSelectedBtn.classList.remove('disabled');
			total = total + 1;
			if(e.shiftKey) {
				handleMultiSelect();
			}
		} else if(target.classList.contains('active')) {
			target.classList.remove('active');
			total = total - 1;
			if(e.shiftKey) {
				handleMultiDeselect();
			}
		}  
	} 
	
	handleTotalCount();
	
	if(total != 0) {
		setClearAllBtnState();	
	}
}


// ------ Filter Tags -------
function filterTags() {
	var filterValue = searchInput.value.toUpperCase();

	// Swap search input icons  
	if(filterValue.length > 0) {
		filtered = true;
		searchBtn.classList.remove('fa-search');
		searchBtn.classList.add('fa-close');
	} else {
		filtered = false;
		searchBtn.classList.remove('fa-close');
		searchBtn.classList.add('fa-search');
	}

	if(filterValue.charAt(0) != '-') {
		for(tag of tags) {
			var tagText = tag.textContent.toUpperCase();

			if(tagText.indexOf(filterValue) > -1) {
				tag.style.display = 'block';
				tag.classList.add('filtered');
			} else {
				tag.style.display = 'none'; 
				tag.classList.remove('filtered');
			}
		}
	} else if(filterValue.charAt(0) == '-' && filterValue.charAt(1) != '') {
		for(tag of tags) {
			var tagText = tag.textContent.toUpperCase();
			var filter = filterValue.substr(1);

			if(tagText.indexOf(filter) > -1) {
				tag.style.display = 'none';
				tag.classList.remove('filtered');
			} else {
				tag.style.display = 'block';
				tag.classList.add('filtered');
			}
		}
	}
}


// ------ Clear Search -------
function clearSearch(e) {
	if(e.target.classList.contains('fa-close')) {
		searchInput.value = '';
		filterTags();
	}
}


// ------- Sort Tags (UI only) function -------
function sortTags() {
	if(filterAlphaBtn.classList.contains('fa-sort-alpha-asc')) {
		filterAlphaBtn.classList.remove('fa-sort-alpha-asc');
		filterAlphaBtn.classList.add('fa-sort-alpha-desc');
		filterAlphaBtn.setAttribute("title", "Filter descending");

		sortAscending();
	} 
	else if(filterAlphaBtn.classList.contains('fa-sort-alpha-desc')) {
		filterAlphaBtn.classList.remove('fa-sort-alpha-desc');
		filterAlphaBtn.classList.add('fa-sort-alpha-asc');
		filterAlphaBtn.setAttribute("title", "Filter Ascending");

		sortDescending();
	}
}


// ------ Sort Ascending -------
function sortAscending() {
	tagsArray.sort(function(tag1, tag2) {
		if(tag1.textContent > tag2.textContent) {
			return 1;
		} else {
			return -1;
		}
	})

	groupsList.innerHTML = '';  // Clear "groups list"

	for(var i = 0; i < tagsArray.length; i++) {
		groupsList.appendChild(tagsArray[i]);
	}
}


// ------ Sort Descending -------
function sortDescending() {
	tagsArray.sort(function(tag1, tag2) {
		if(tag1.textContent < tag2.textContent) {
			return 1;
		} else {
			return -1;
		}
	})

	groupsList.innerHTML = '';

	for(var i = 0; i < tagsArray.length; i++) {
		groupsList.appendChild(tagsArray[i]);
	}
}


// ------- Reset Selected (UI only) function -------
function resetSelected() {
	for(var tag of tags) {
		if(tag.classList.contains('active')) {
			tag.classList.remove('active');
		}
	}

	if(selectAllBtn.classList.contains('disabled')) {
		selectAllBtn.classList.remove('disabled');
	}

	total = 0;
	handleTotalCount();

	setClearAllBtnState();
}


// ------- Select all -------
function selectAll() {
	if(filtered) {
		for(var tag of tags) {
			if(!tag.classList.contains('active') && tag.classList.contains('filtered')) {
				tag.classList.add('active'); 
				total += 1;
			}
		} 
	} else if(!filtered) {
		for(var tag of tags) {
			if(!tag.classList.contains('active')) {
				tag.classList.add('active'); 
				total += 1;
			}
		} 
		selectAllBtn.classList.add('disabled');
	}


	setClearAllBtnState();
	handleTotalCount();
}


// ------ Set 'clear all' button state ------
function setClearAllBtnState() {
	var areSelected = 0;

	for(tag of tags) {
		if(tag.classList.contains('active')) {
			areSelected += 1;
		} 
	}

	if(areSelected === 0 && !clearSelectedBtn.classList.contains('disabled')) {
		clearSelectedBtn.classList.add('disabled');
		sortSelectedBtn.classList.add('disabled');
	} 
	else{
		clearSelectedBtn.classList.remove('disabled');
		clearSelectedBtn.classList.remove('disabled');
	}
}


// ------ Sort by selected ------
function sortBySelected() {

	tagsArray.sort(function(tag1, tag2) {
		if(!tag1.classList.contains('active') && tag2.classList.contains('active')) {
			return 1;
		} else {
			return -1;
		}
	})

	groupsList.innerHTML = '';  // Clear "groups list"

	for(var i = 0; i < tagsArray.length; i++) {
		groupsList.appendChild(tagsArray[i]);
	}

	scrollListToTop();
	disableButton(sortSelectedBtn);
}


// ------ Show the number of selected groups ------
function handleTotalCount() { 
	if(total != 0) {
		if(sortSelectedBtn.classList.contains('disabled')) {
			sortSelectedBtn.classList.remove('disabled');
		}
		selectedNum.classList.remove('hidden');
		selectedNum.textContent = total;    
	} else {
		selectedNum.classList.add('hidden');
	}
}


// ------ Scroll groups list to top ------
function scrollListToTop() {
	if(list.scrollTop != 0) {
		list.scrollTop = 0;
	}  
}


// ------ Disable Element ------
function disableButton(el) {
	if(!el.classList.contains('disabled')) {
		el.classList.add('disabled');
	}
}