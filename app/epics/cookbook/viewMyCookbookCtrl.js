/* Created by Anders modified by Martin */
angular.module("madportalen").controller("viewMyCookbookCtrl",
    function ($scope, $state, userService, authService, dialogService)
    {

        $scope.cookbook = userService.getCookbook({id: authService.getUser().id}, function ()
        {
            $scope.recipes = $scope.cookbook.recipes;
            $scope.mealPlans = $scope.cookbook.mealPlans;
        }, dialogService.showServerError);

        $scope.toggleRecipes = function ()
        {
            $('#myCookbookRecipes').toggle();
        };

        $scope.toggleMealPlans = function ()
        {
            $('#myCookbookMealPlans').toggle();
        };
    });