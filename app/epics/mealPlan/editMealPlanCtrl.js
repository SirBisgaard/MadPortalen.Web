/**
 * Created by chris on 23/05/16.
 */
angular.module("madportalen").controller("editMealPlanCtrl",
    function ($scope, $state, $rootScope, $uibModal, mealPlanService, recipeService, dialogService, authService) {

        $scope.mealPlan = {};
        $scope.recipes = [];
        $scope.recipe = {
            ingredients: []
        };


        //Determines Tilføj or fjern btn
        $scope.viewType = {};
        $scope.viewType.one = 1;
        $scope.viewType.two = 2;


        $scope.$watchCollection('recipe.Ingredients', function (newCol, oldCol) {
            $scope.updateRecipes();
        });

        $scope.updateRecipes = function () {
            var recipes = recipeService.query({data: $scope.recipe}, function () {
                $scope.recipes = recipes;
            }, function () {
                alert("Der skete en server fejl, prøv igen senere.");
            });
        };


        var loadMealPlan = function () {
            $scope.mealPlan = mealPlanService.getById({
                id: $state.params.id
            }, function () {
                $rootScope.days = $scope.mealPlan.days;


            }), dialogService.showServerError
        };

        $scope.editMealPlan = function () {
            if ($scope.editMealPlanForm.$valid)

                $scope.mealPlan.$update({id: $state.params.id}, function () {
                    $state.go('home.viewMealPlan',  { "id": $state.params.id });
                }, dialogService.showServerError);
        };


        // method called from Modal, adds recipe_id to mealplan.days.recipes to be saved
        $rootScope.addRecipeIdToMP = function (recipe_id, name_of_day) {

        };

        // method called from Modal, adds recipe object to recipes-array to view in MealPlan
        $rootScope.addRecipeObjToMP = function (recipe_id, name_of_day) {
            for (var i = 0; i < $scope.mealPlan.days.length; i++) {
                if ($scope.mealPlan.days[i].nameOfDay == name_of_day) {
                    var recipeObj = recipeService.get({id: recipe_id});

                    $scope.mealPlan.days[i].recipes.push(recipeObj);
                }
            }
            ;
        };


        //removes recipe_id from mealplan.days.recipes to be saved
        $scope.removeRecipeFromDayInMP = function (recipe_id) {

            for (var i = 0; i < $scope.daysObjInMealplan.length; i++) {

                var objRecipesLength = $scope.daysObjInMealplan[i].recipes.length;
                var mpRecipesLength = $scope.mealPlan.days[i].recipes.length;

                if (objRecipesLength < mpRecipesLength) {
                    var j = $scope.mealPlan.days[i].recipes.indexOf(recipe_id);
                    $scope.mealPlan.days[i].recipes.splice(j, 1);
                }
                ;
            }
        };


        // btn in recipeList
        $scope.toggleModalMP = function (recipe_id) {

            $uibModal.open({
                templateUrl: 'app/epics/mealPlan/selectDayPopUp.html',
                controller: "selectDayPopUpCtrl",
                resolve: {
                    id: function () {
                        return recipe_id;
                    }
                }
            })
        };

        loadMealPlan();

    });