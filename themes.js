var themes = {
	'(Default)': {
		classname: '',
		mpregame: 'Riverside.mp3',
		whoami: 'PeaceAndTranquility.mp3',
		mmodtime: 'Aquabatics.mp3',
		mdaytime: 'Magmic.mp3',
		mvoting: 'Deceitful.mp3',
		mtrial: 'Truth.mp3',
		mnight: 'MilkyWay.mp3',
	},
	'Light': {
		className: 'lighttheme',
		mpregame: 'Riverside.mp3',
		whoami: 'PeaceAndTranquility.mp3',
		mmodtime: 'Aquabatics.mp3',
		mdaytime: 'Magmic.mp3',
		mvoting: 'Deceitful.mp3',
		mtrial: 'Truth.mp3',
		mnight: 'MilkyWay.mp3',
	},
};

$(function() {
	var themeselector = $('<label id="themeselector">🎨</label>');
	var menu = $('<select>');
	for(var title in themes) {
		var option = document.createElement('option');
		option.innerText = option.value = title;
		menu.append(option);
	}
	menu.change(function() {
		var theme = themes[this.value];
		if(theme) {
			var music = { mpregame, whoami, mmodtime, mdaytime, mvoting, mtrial, mnight };
			for(var v in music) {
				if(theme[v]) {
					music[v].src = theme[v];
					music[v].play();
				}
			}
			document.body.className = theme.className;
			localStorage.setItem('preferred_theme', this.value);
		}
	});
	menu.val(localStorage.getItem('preferred_theme')).change();
	themeselector.append(menu);
	$('#inputarea').append(themeselector);
});