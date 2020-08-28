angular.module("madportalen").controller("viewMealPlanCtrl",
    function ($scope, $state, mealPlanService, $stateParams, dialogService, userService) {

        $scope.mealPlan = mealPlanService.get({
            id: $stateParams.id
        }, function () {
        }, dialogService.showServerError);

        $scope.isNotOwnerOfMealPlan = function (mealPlan_createdBy_id) {
            return userService.isNotOwnerOfMealPlan(mealPlan_createdBy_id)
        };

        $scope.deleteMealPlan = function () {
            dialogService.showComfirm(
                "Slet ´" + $scope.mealPlan.title + "´",
                "Er du sikker på at slette?", function (result) {
                    if (result) {
                        mealPlanService.delete({
                            id: $scope.mealPlan.id
                        }, function () {
                            $state.go('home.viewMealPlanList');
                        }, dialogService.showServerError);
                    }
                });
        }

    });

