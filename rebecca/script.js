// Very minimalistic seedable random function
// Credit: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function mulberry32(a) {
	return function () {
		var t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
}

function map(x, a1, a2, b1, b2) {
	return (x - a1) / (a2 - a1) * (b2 - b1) + b1;
}

const rand = mulberry32(144);

// Introduce some woopsies to the text (very important)
for (let p of document.querySelectorAll('.text-section p')) {
	if (p.classList.contains('no-woopsies')) continue;

	// Using secret alien technology known as RegExp to match either single letters or html tags
	const textParts = p.innerHTML.match(/[^<>]|<[^<>]+>[^<>]+<\/[^<>]+>/g);

	// Woopsify
	let i = 0;
	while (i < textParts.length) {
		if (i > 0 && textParts[i].length == 1 && textParts[i] != ' ') {
			const woopsVariant = (rand() < 0.5) ? 1 : 2;
			textParts[i] = `<span class="woops-${woopsVariant}">${textParts[i]}</span>`;
		}

		const skipLetters = Math.floor(map(rand(), 0, 1, 3, 20));
		i += skipLetters;
	}

	// More RegExp to fix word wrapping
	let newHtml = textParts.join('');
	newHtml = newHtml.replace(
		/(?:[^ <>-]|<[^<>]+>[^<>]+<\/[^<>]+>)+/ig,
		`<span class="word">$&</span>`
	);
	
	p.setHTMLUnsafe(newHtml);
}