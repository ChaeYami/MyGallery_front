plyr.setup(document.querySelector('.plyr'));
var radio = document.querySelector('.plyr').plyr;

var player = document.querySelector('.playlist');
var songs = player.querySelectorAll('.playlist--list li');
var i;
var active = null;

for (i = 0; i < songs.length; i++) {
	songs[i].onclick = changeChannel;
}

setSource(getId(songs[0]), buildSource(songs[0]));

document.querySelector('.plyr').addEventListener('ended', nextSong);

function changeChannel(e) {
	setSource(getId(e.target), buildSource(e.target), true);
}

function getId(el) {
	return Number(el.getAttribute('data-id'));
}

function buildSource(el) {
	var obj = [{
		src: el.getAttribute('data-audio'),
		type: 'audio/ogg'
	}];

	return obj;
}

function setSource(selected, sourceAudio, play) {
	if (active !== selected) {
		active = selected;
		radio.source({
			type: 'audio',
			title: 'test',
			sources: sourceAudio
		});

		for (var i = 0; i < songs.length; i++) {
			if (Number(songs[i].getAttribute('data-id')) === selected) {
				songs[i].className = 'active';
			} else {
				songs[i].className = '';
			}
		}

		if (play) {
			radio.play();
		}
	} else {
		radio.togglePlay();
	}
}

function nextSong(e) {
	var next = active + 1;

	if (next < songs.length) {
		setSource(getId(songs[next]), buildSource(songs[next]), true);
	}
}