var app = angular.module('teamViewer', ['ngSanitize'])
app.factory("appService",function($http){
	var cs = {};
	cs.getTeamData = function(){
		return $http.get("/getTeamData",{cache : true});
	};
	return cs;
});
app.controller("listController", ["$scope","appService","$sce",
function($scope, appService, $sce) {
	$scope.members = [];
	appService.getTeamData().then(function(result){
		$scope.members = result.data.members;
	});
}]);
