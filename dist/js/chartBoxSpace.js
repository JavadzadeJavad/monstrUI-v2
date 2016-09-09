var app = angular.module('myApp',[]);



app.directive('hchartBigboxspace', function(){
	return{

		template:'<div class="col-md-12"><div class="box"><div class="box-header with-border"><h3 class="box-title"> {{name}} </h3><i class="update fa fa-refresh fa-spin"></i><span class=" status label label-danger">Status</span> </div><!-- /.box-header --><div class="box-body" id="CMSJobStatus_AppHolder" style="height: 300px;"></div><!-- /.box-body --></div><!-- /.box --></div> <script>CMSJobStatus.startApp("#CMSJobStatus_AppHolder");</script>',		
		scope:{
			name:'@boxName'
		}
	};
});


app.directive('starterCmsjobstatus', function(){
	return{
		restrict:'E',
		
		template:'<script>CMSJobStatus.startApp("#CMSJobStatus_AppHolder");</script>',
		
		
	};
});