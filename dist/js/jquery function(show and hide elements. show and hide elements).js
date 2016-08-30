$(document).ready(function(){

	var startLoading = function(){
		$('.update').show();
	}

	var stopLoading = function(){
		$('.update').hide();
	}

	var setStatus = function(){
		$('.status').css("background-color", "red");
	}
}
