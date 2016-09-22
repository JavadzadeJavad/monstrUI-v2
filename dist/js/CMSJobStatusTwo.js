var CMSJobStatusTwo = {


    Configuration: {
        locale: 'en',
        ssb_status_url: "https://lcgsens01o.jinr.ru/rest/CMSJobStatus/lastStatus?delta=1",
    },

    Utils: {
        getDuration: function(time) {
            var now = new Date().getTime();
            var error_time = new Date(time);
            return moment.duration(now - error_time).humanize();
        },
    },

    Model: {
        jobStatus: null,
        sites: [],
        options: ['application_failed','app_succeeded','site_failed','aborted','cancelled'],
        options_data: {
            'application_failed': {'color': 'pink', 'caption': 'App-failed'},
            'app_succeeded': {'color':'green', 'caption': 'Success'},
            'site_failed': {'color':'red', 'caption': 'Site-failed'},
            'aborted': {'color':'blue', 'caption': 'Aborted'},
            'cancelled': {'color':'black', 'caption': 'Cancelled'}
        },
// TODO: Попробовать исправить CMSJobStatus.js
// TODO: Этот участок кода изучить
        setJobStatus: function(response) {
            var data = response.data;
            console.log(data);
            var sites_summary = {};
            for (var i=0; i<data.length; i++){
                if (!(data[i].site_name in sites_summary)) {
                    sites_summary[data[i].site_name] = {};
                    for (var j=0; j<this.options.length; j++){
                        sites_summary[data[i].site_name][this.options[j]] = 0;
                    }
                }
                for (var j=0; j<this.options.length; j++){
                    sites_summary[data[i].site_name][this.options[j]] += data[i][this.options[j]];  

                }            
            };

            //this.sites = []; // TODO: попробовать не удалять this.sites, а обновить их

            var new_site = [];
            for (var site in sites_summary){
                new_site.push(site);
                for(var i=0; i<new_site.length; i++){   
                    if(new_site[i] == site){
                        //console.log(new_site[i]);
                        this.sites[i] = new_site[i];   
                    }       
                }
                //console.log(sites_summary); 
                //console.log(site);    
            }
            //console.log(new_site);

                
            this.sites = this.sites.sort();
            console.log(this.sites);

            var series = [];
            for (var i=0;i<this.options.length; i++){
                var seria = {};
                seria.name = this.options_data[this.options[i]].caption;
                seria.color = this.options_data[this.options[i]].color;
                seria.data = [];
                for (var j=0; j<this.sites.length; j++){
                    seria.data.push(sites_summary[this.sites[j]][this.options[i]]);
                }
                series.push(seria);
            }
            console.log(series);
            this.jobStatus = series;
        },
// Изучать до этого момента.
    },
    //============================================================================
    //    VIEW
    //============================================================================
    View: {
        status_table_id: null,
        chart: null,

        

        initialize: function(appHolderId) {
            this.status_table_id = appHolderId;


        },

        fillStatusTableWithData: function() {
            var data = CMSJobStatusTwo.Controller.getJobStatusData();
            var names = CMSJobStatusTwo.Controller.getSiteNames();

            $(this.status_table_id).highcharts({
                chart: {
                    type: 'bar',
                    pointWidth: 20
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: names,
                    labels: {
                formatter: function () {
                    if ('T1_RU_JINR' === this.value) {
                        return '<span style="color: red;font-weight: bold;">' + this.value + '</span>';
                    } else {
                        return this.value;
                    }
                }
            }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        pointPadding: 0.1, // Defaults to 0.1
                        groupPadding: 0,
                        borderWidth: 0
                    }
                },
                series: data
            });
        }
    },


    jquery:{
        hideUpdate: function(){
            $('#CMSJobStatusTwo-update').hide();
        },
    
        showUpdate: function(){
            $('#CMSJobStatusTwo-update').show();
        }

    },

    //============================================================================
    //    CONTROLLER

    //============================================================================
    Controller: {

        
        appHolderId: '',

        startApp: function(appHolderId) {
            this.appHolderId = appHolderId;
            CMSJobStatusTwo.View.initialize(appHolderId);
            CMSJobStatusTwo.Controller.loadStatus();
        },
        // TODO: on Fail


        loadStatus: function() {
            console.log(new Date());
            CMSJobStatusTwo.jquery.showUpdate();

            $.ajax({
                url:CMSJobStatusTwo.Configuration.ssb_status_url,  
                success: function(data) {
                    console.log('AJAX.Success');
                    CMSJobStatusTwo.Model.setJobStatus(data);
                    CMSJobStatusTwo.View.fillStatusTableWithData();
                    setTimeout(CMSJobStatusTwo.Controller.loadStatus, 3000);
                },
                error: function(jqXHR, status, error_thrown) {
                    console.log('AJAX.Error');
                },
                complete: function(jqXHR, status) {
                    console.log('AJAX.Complete');
                }
            });
            console.log(new Date());
            CMSJobStatusTwo.jquery.hideUpdate();
        },        


        getJobStatusData: function (site_name) {
            return CMSJobStatusTwo.Model.jobStatus;
        },
        getSiteNames: function (site_name) {
            return CMSJobStatusTwo.Model.sites;
        },
    },
    startApp: function(appHolderId) {
       CMSJobStatusTwo.Controller.startApp(appHolderId);
    }
};


