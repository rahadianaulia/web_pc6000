(function(){

    var app = angular.module("myDirective",[]);

    app.directive("bootsDatepicker",function(){
        return{
            restrict : "EA",
            replace : true,
            template : "<input type='text' >",
            link : function (scope,el,attr) {
                //el.attr('class', 'form-control');
                el.datepicker(
                    {
                        autoclose: true,
                        format: "yyyy-mm-dd",
                        todayHighlight: true,
                        todayBtn: "linked",
                        calendarWeeks: true

                    }
                );
            }
        }
    });
}());
