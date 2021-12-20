document.addEventListener('DOMContentLoaded', function () {
	const startingScreen = document.querySelector('.starting-screen');
	const containerScreen = document.querySelector('.container');

	startingScreen.style.display = 'block';
	containerScreen.style.display = 'none';

	window.setTimeout(function () {
		window.location.replace('./search_connection_form.html');
	}, 5000);
});
