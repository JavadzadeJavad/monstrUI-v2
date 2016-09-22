var app = angular.module('myApp',[]);

app.controller('maincontroller', function(){
	$(window).load(function(){
		CMSJobStatus.startApp("#CMSJobStatus_AppHolder");

		CMSJobStatusTwo.startApp("#CMSJobStatusTwo_AppHolder");
	});
})

app.directive('bigbox', function(){
	return{

		restrict:'E',

		template:'<div class="col-md-12" ><div class="box"><div class="box-header with-border"><h3 class="box-title"> {{boxName}} </h3><i id="{{boxName}}-update" class="update fa fa-refresh fa-spin"></i><span id="{{boxName}}-status" class="status label label-danger">Status</span> </div><!-- /.box-header --><div class="box-body"  id="{{boxName}}_AppHolder"  style="height: 300px;"></div><!-- /.box-body --></div><!-- /.box --></div> '    ,		
		//templateUrl: 'dist/js/bigbox.html',
		scope:{
			boxName:'@boxName'
		}


	};
});
