"use strict";

// Function to toggle themes smoothly
function toggleTheme(isDark) {
	const themeClass = isDark ? "d2c_theme_dark" : "d2c_theme_light";

	$("body").addClass(themeClass);
	setTimeout(() => {
		$("body").removeClass(
			themeClass === "d2c_theme_dark"
				? "d2c_theme_light"
				: "d2c_theme_dark"
		);
	}, 500);
	localStorage.setItem("theme", themeClass);
}

const themePreference = localStorage.getItem("theme");
if (themePreference === "d2c_theme_dark") {
	toggleTheme(true);
	$("#d2c_theme_changer").prop("checked", true);
} else {
	toggleTheme(false);
	$("#d2c_theme_changer").prop("checked", false);
}

$("#d2c_theme_changer").change(function () {
	toggleTheme($(this).prop("checked"));
	localStorage.setItem("themeSwitch", $(this).prop("checked"));
});

// Preloader
window.onload = function () {
	var $preloader = $(".preloader");
	$preloader.delay(800).fadeOut(200, function () {
		$(".d2c_wrapper").addClass("show");
	});
};
(() => {
	"use strict";
	const forms = document.querySelectorAll(".form-validation");

	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			},
			false
		);
	});
})();
