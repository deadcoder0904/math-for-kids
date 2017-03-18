document.addEventListener('DOMContentLoaded',function() {
	var msg = new SpeechSynthesisUtterance();
	var voices = [];
	var dropDownMenu = document.querySelector('[name=dropDownMenu]');
	var countTill = document.querySelector('[name=count]');
	var marbles = document.querySelector('#marbles');
	var words = document.querySelector('#words');
	var i = 0;
	var interval;

	msg.text = marbles.innerHTML;

	function populateVoices() {
		voices = this.getVoices();
		dropDownMenu.innerHTML = voices.map(i => `<option value="${i.name}">${i.name} (${i.lang})</option>`).join('');
	}

	function speakUp() {
		speechSynthesis.speak(msg);
	}

	function setVoices() {
		console.log("setVoices");
		msg.voice = voices.find(function (voice) {
			return voice.name === this.value;
		}.bind(this));
	}

	function inputChange(e) {
		var val = e.target.value;
		clearInterval(interval);
		i = 0;
		interval = setInterval(tick, 2000);
	}

	function tick() {
		if(i <= +countTill.value) {
			marbles.innerHTML = i;
			words.innerHTML = numberToWords.toWords(i);
			msg.text = i++;
			speakUp();
		}
	}

	countTill.addEventListener('change keydown paste input', inputChange);

	interval = setInterval(tick, 2000);
	speechSynthesis.addEventListener('voiceschanged', populateVoices);
	dropDownMenu.addEventListener('change', setVoices);

});
