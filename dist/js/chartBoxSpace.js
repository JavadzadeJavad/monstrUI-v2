var app = angular.module('myApp',[]);

app.controller('mainCntrl', function($scope){
	$scope.boxName='Default Box Example';

});

app.directive('hchartBoxspace', function(){
	return{
		restrict:'E',
		template:'<div class="col-md-4"><div class="box"><div class="box-header with-border"><h3 class="box-title">{{boxName}}</h3><i class="update fa fa-refresh fa-spin"></i><span class=" status label label-danger">Status</span> </div><!-- /.box-header --><div class="box-body" id="CMSJobStatus_AppHolder" style="height: 300px;"></div><!-- /.box-body --></div><!-- /.box --></div>'
	};
});