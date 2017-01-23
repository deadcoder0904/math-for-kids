document.addEventListener('DOMContentLoaded',function() {
	const msg = new SpeechSynthesisUtterance();
	let voices = [];
	const dropDownMenu = document.querySelector('[name=dropDownMenu]');
	const countTill = document.querySelector('[name=count]');
	const marbles = document.querySelector('.marbles');
	let i = 0;
	let interval;

	msg.text = marbles.innerHTML;

	function populateVoices() {
		voices = this.getVoices();
		dropDownMenu.innerHTML = voices.map(i => `<option value="${i.name}">${i.name} (${i.lang})</option>`).join('');
	}

	function speakUp() {
		speechSynthesis.speak(msg);
	}

	function setVoices() {
		msg.voice = voices.find(voice => voice.name === this.value);
	}

	function inputChange(e) {
		const val = e.target.value;
		clearInterval(interval);
		i = 0;
		interval = setInterval(tick, 2000);
	}

	function tick() {
		if(i <= +countTill.value) {
			marbles.innerHTML = i;
			msg.text = i++;
			speakUp();
		}
	}

	countTill.addEventListener('change', inputChange);

	interval = setInterval(tick, 2000);

	speechSynthesis.addEventListener('voiceschanged', populateVoices);
	dropDownMenu.addEventListener('change', setVoices);

});
