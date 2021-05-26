<section class="win">
	<header class="win-header">
		<i class="win-icon">i</i>
		<h4 class="win-title">window</h4>
		<nav class="win-menu">
			<button class="win-min"></button>
			<button class="win-max"></button>
			<button class="win-close"></button>
		</nav>
	</header>
	<main class="win-content">
		main content
	</main>
	<div class="trigger r"></div>
	<div class="trigger l"></div>
	<div class="trigger t"></div>
	<div class="trigger b"></div>
</section>

<script>window.onerror = alert;

const win = document.querySelector(".win");

const isMax = {
	isMax: false,
	w: 0,
	h: 0,
};

const isDragging = {
	title: false,
	r: false,
	l: false,
	t: false,
	b: false,
};

const last = {
	title: {
		x: 0,
		y: 0,
	},
}

document.addEventListener("mouseleave", (e) => {

});

document.querySelector(".win-title").addEventListener("mousedown", () => {
	isDragging.title = true;
});

document.querySelector(".win-title").addEventListener("mouseup", () => {
	isDragging.title = false;
	
	last.title.x = 0;
	last.title.y = 0;
});

document.querySelector(".win-title").addEventListener("mouseleave", (e) => {
	if (isDragging.title) {
		if (!last.title.x || !last.title.y) {
			last.title.x = e.clientX;
			last.title.y = e.clientY;
		}
	
		const { top, left } = win.getBoundingClientRect();
		
		win.style.left = Math.max(left + e.clientX - last.title.x, 0) + "px";
		win.style.top = Math.max(top + e.clientY - last.title.y, 0) + "px";
	
		last.title.x = e.clientX;
		last.title.y = e.clientY;
	}
});

document.querySelector(".win-title").addEventListener("mousemove", (e) => {
	if (isDragging.title) {
		if (!last.title.x || !last.title.y) {
			last.title.x = e.clientX;
			last.title.y = e.clientY;
		}
	
		const { top, left } = win.getBoundingClientRect();
		
		win.style.left = Math.max(left + e.clientX - last.title.x, 0) + "px";
		win.style.top = Math.max(top + e.clientY - last.title.y, 0) + "px";

		last.title.x = e.clientX;
		last.title.y = e.clientY;
	}
});

document.querySelector(".win-close").addEventListener("click", () => {
	win.style.display = "none";
	
	return;
});

document.querySelector(".win-max").addEventListener("click", () => {
	if (isMax.isMax) {
		isMax.isMax = false;
		
		win.style.minWidth = isMax.w;
		win.style.minHeight = isMax.h;
		
		return;
	}
	
	
	isMax.isMax = true;
	
	isMax.w = win.style.minWidth;
	isMax.h = win.style.minHeight;
	
	win.style.minWidth = "100vw";
	win.style.minHeight = "100vh";
	
	return;
});