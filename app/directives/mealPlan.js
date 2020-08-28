app.directive('mealPlan', function () {

    return {
        restrict: 'E',
        replace:true,
        scope: {
            days: '=',
            viewType: '='
        },
        templateUrl: '/app/directives/mealPlan.html',
        link: function (scope) {
            //scope.viewType = 0;
            scope.toggleMealPlanDay = function (name)
            {
                $('#' + name).toggle();
            };
        }
    };
});