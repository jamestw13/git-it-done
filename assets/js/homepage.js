var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
	event.preventDefault();
	var username = nameInputEl.value.trim();

	if (username) {
		getUserRepos(username);
		nameInputEl.value = "";
	} else {
		alert("Please enter a GitHub username");
	}
	console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);

var getUserRepos = function (user) {
	// format the github api url
	var apiUrl = `https://api.github.com/users/${user}/repos`;
	console.log(apiUrl);

	// make a request to the url
	fetch(apiUrl).then(function (response) {
		response.json().then(function (data) {
			console.log(data);
		});
	});
};

getUserRepos("octocat");
