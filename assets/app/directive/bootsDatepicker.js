(function(){

    var app = angular.module("myDirective",[]);

    app.directive("bootsDatepicker",function(){
        return{
            restrict : "EA",
            replace : true,
            template : "<input type='text' >",
            link : function (scope,el,attr) {
                el.attr('class', 'datepicker form-control');
                el.datepicker(
                    {
                        autoclose: true,

                        format: "yyyy-mm-dd"

                    }
                );
            }
        }
    });
}());
