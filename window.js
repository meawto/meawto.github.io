let desktopSize = document.getElementById('os-desktop')

function createWindow(name) {

	var osWindow = document.getElementById(name)

	if (!(osWindow.style.opacity == '1')) {
	
		osWindow.style.left = (desktopSize.offsetWidth / 2 - osWindow.offsetWidth / 2) + 'px'
		osWindow.style.top = (desktopSize.offsetHeight / 2 - osWindow.offsetHeight / 2) + 'px'

		setTimeout(() => {osWindow.style.opacity = '1'}, 400)
	} else {
		if (osWindow.style.zIndex == '1') {
			$(".os-window").not(this).css("z-index", "1")
			$(".os-window").not(this).css("filter", "grayscale(1)")
	
			osWindow.style.zIndex = '2'
			osWindow.style.filter = 'grayscale(0)'
			osWindow.style.animation = ''
			void osWindow.offsetHeight
			osWindow.style.animation = 'showWindow 400ms'
		} else {
			closeWindow(name)
		}
	}

	

	$(".os-window").not(this).css("z-index", "1")
	$(".os-window").not(this).css("filter", "grayscale(1)")
	$(".os-window").not(this).css("box-shadow", "none")
	

	osWindow.style.zIndex = '2'
	osWindow.style.filter = 'grayscale(0)'
	osWindow.style.filter = 'grayscale(0)'
	osWindow.style.boxShadow = '0 10px 30px var(--window-shadow-v1)'
}

function closeWindow(name) {
	var osWindow = document.getElementById(name)
	osWindow.style.transition = 'opacity 400ms, top 1s ease, filter 400ms, box-shadow 200ms'
	osWindow.style.opacity = '0'
	osWindow.style.top = desktopSize.offsetHeight + 'px'
}


document.querySelectorAll('.os-window').forEach(item => {
    item.addEventListener('mousedown', () => {
		item.style.transition = 'opacity 400ms, filter 400ms, box-shadow 200ms' 
	})
})



// JQUERY draggable
let windowsJquery = ["#music-player", "#notoryu-app"]

windowsJquery.forEach(window => {
	$(window).draggable({
		containment: "parent",
		cursor: "crosshair"
	  });
})

// JQUERY Z INDEX ON FOCUS
$(".os-window").mousedown(function() {
	$(".os-window").not(this).css("z-index", "1")
	$(".os-window").not(this).css("filter", "grayscale(1)")
	$(".os-window").not(this).css("box-shadow", "none")
	// box-shadow: 0 16px 30px var(--window-shadow-v1);
	$(this).css("z-index", "2")
	$(this).css("filter", "grayscale(0)")
	$(this).css("box-shadow", "0 10px 30px var(--window-shadow-v1)")
})

// $( function() {
// 	$( "#music-player" ).draggable();
// })




// if(emote_container.classList.contains('emote-container-show')) {
// 	emote_container.classList.remove("emote-container-show");
// } else { 
// 	emote_container.classList.add("emote-container-show");
// }