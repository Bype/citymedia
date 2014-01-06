document.querySelector('#save').addEventListener('click', function() {
	localStorage["homeurl"] = document.getElementById("homeurl").value;
	console.log(localStorage["homeurl"]);
});

document.getElementById("homeurl").value = localStorage["homeurl"];
