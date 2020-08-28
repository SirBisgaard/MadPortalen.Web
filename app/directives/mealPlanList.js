app.directive('mealPlanList', function ($state, authService, userService, dialogService) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: '/app/directives/mealPlanList.html',
        link: function (scope) {

            scope.openMealPlan = function (id) {
                $state.go("home.viewMealPlan", {"id": id});
            };

            scope.addSharedMealPlanToCookbook = function (mealPlan_id) {
                userService.saveInCookbook({
                        id: authService.getUser().id,
                        type: "mealPlans",
                        tid: mealPlan_id

                    }, function () {
                        authService.getUser().cookbook.mealPlans.push(mealPlan_id);
                    },
                    function () {

                        dialogService.showServerError();
                    });
            };

            scope.removeSharedRecipeFromCookbook = function (mealPlan_id) {
                userService.deleteInCookbook({
                        id: authService.getUser().id,
                        type: "mealPlans",
                        tid: mealPlan_id

                    }, function () {
                        var mealPlanToRemove = authService.getUser().cookbook.mealPlans;
                        var index = mealPlanToRemove.indexOf(mealPlan_id);
                        mealPlanToRemove.splice(index, 1);
                        $state.reload();
                    },
                    function () {
                        dialogService.showServerError();
                    });
            };

            scope.isMealPlanInCookbook = function (mealPlan_id) {

                var isThere = false;
                var user = authService.getUser();
                if (user.cookbook.mealPlans) {
                    for (var i = 0; i < user.cookbook.mealPlans.length; i++) {

                        if (user.cookbook.mealPlans[i] === mealPlan_id) {
                            isThere = true;
                            break;
                        }
                    }
                }
                return isThere;
            };

            scope.isNotOwnerOfMealPlan = function (mealPlan_createdBy_id) {
                return userService.isNotOwnerOfMealPlan(mealPlan_createdBy_id)
            };
            
            scope.numberOfRecipesInMealPlan = function (mealPlan) {
                var count = 0;
                
                for(var i = 0; i < mealPlan.days.length; i++){
                    count += mealPlan.days[i].recipes.length;
                }
                
                return count;
            }
        }

    };
});
