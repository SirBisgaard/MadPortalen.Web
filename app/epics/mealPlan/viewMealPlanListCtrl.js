angular.module("madportalen").controller("viewMealPlanListCtrl",
    function ($scope, mealPlanService, dialogService) {

        $scope.mealPlans = mealPlanService.query({}, function () {
        }, dialogService.showServerError);
    });
