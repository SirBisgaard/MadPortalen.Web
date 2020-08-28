/**
 * Created by chris on 17/05/16.
 */
angular.module('madportalen').controller('recipeToMealPlanCtrl', function ($scope, $uibModalInstance, authService, mealPlanService, id) {

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        var mealPlanIndex = $scope.mealPlans.indexOf($scope.mealPlanSelected);

        $scope.mealPlanObject = $scope.mealPlans[mealPlanIndex];


        var dayIndex = $scope.mealPlanObject.days.indexOf($scope.daySelected);
        $scope.mealPlanObject.days[dayIndex].recipes.push(id);

        $scope.saveChanges();
        $uibModalInstance.dismiss('save');
    };

    $scope.saveChanges = function() {
        $scope.mealPlanObject.$update({
            id: $scope.mealPlanObject.id
        }, function() {
        });
    };


    $scope.updateMealPlan = function (mealPlan) {
        $scope.mealPlanSelected = mealPlan;
        $scope.days = mealPlan.days;

    };

    $scope.updateDay = function (day) {
        $scope.daySelected = day;
    };

    var user = authService.getUser();
    var mealPlans = mealPlanService.query({data: {createdBy: user.id}}, function () {
        $scope.mealPlans = mealPlans;
    }, function () {
        alert("Der skete en server fejl, prøv igen senere.");

    });


});