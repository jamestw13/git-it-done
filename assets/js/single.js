var issueContainerEl = document.querySelector("#issue-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function () {
	// take query parameter and pull the repo
	var queryString = document.location.search;
	var repoName = queryString.split("=")[1];

	if (repoName) {
		// repo in queryString causes page to complete
		getRepoIssues(repoName);
		repoNameEl.textContent = repoName;
	} else {
		// no queryString returns user to index.html
		document.location.replace("./index.html");
	}
};

var getRepoIssues = function (repo) {
	// create a url endpoint
	var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

	// fetch request
	fetch(apiUrl).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				displayIssues(data);

				// check if api has paginated issues
				if (response.headers.get("Link")) {
					displayWarning(repo);
				}
			});
		} else {
			// unsuccessful retrieval returns user to index.html
			document.location.replace("./index.html");
		}
	});
};

var displayIssues = function (issues) {
	if (issues.length === 0) {
		issueContainerEl.textContent = "This repo has no open issues!";
		return;
	}
	for (var i = 0; i < issues.length; i++) {
		// create a link element to the GitHub issue
		var issueEl = document.createElement("a");
		issueEl.classList = "list-item flex-row justify-space-between align-center";
		issueEl.setAttribute("href", issues[i].html_url);
		issueEl.setAttribute("target", "_blank");

		// create a span to hold title
		var titleEl = document.createElement("span");
		titleEl.textContent = issues[i].title;

		// append to container
		issueEl.appendChild(titleEl);

		// create a type element
		var typeEl = document.createElement("span");

		// check whether is issue or pull request
		if (issues[i].pull_request) {
			typeEl.textContent = "(Pull request)";
		} else {
			typeEl.textContent = "(Issue)";
		}
		// append to container
		issueEl.appendChild(typeEl);

		// append to issues container
		issueContainerEl.appendChild(issueEl);
	}
};

var displayWarning = function (repo) {
	// add text to warning container
	limitWarningEl.textContent = "To see more than 30 issues visit ";
	var linkEl = document.createElement("a");
	linkEl.textContent = "See More Issues on GitHub.com";
	linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
	linkEl.setAttribute("target", "_blank");

	// append to warning container
	limitWarningEl.appendChild(linkEl);
};

getRepoName();
