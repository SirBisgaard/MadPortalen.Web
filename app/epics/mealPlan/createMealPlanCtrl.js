/**
 * Created by christinekirk on 12/05/16.
 */
angular.module("madportalen").controller("createMealPlanCtrl",

    function($scope, $rootScope, $state, authService, mealPlanService, dialogService, recipeService, $stateParams, $uibModal){

        $scope.mealPlan = new mealPlanService();
        $scope.mealPlan.createdBy = authService.getUser().id;

        $scope.recipes = [];
        $scope.recipe = {
            ingredients: []
        };

        //Determines Tilføj or fjern btn
        $scope.viewType = {};
        $scope.viewType.one = 1;
        $scope.viewType.two = 2;

        //Prepare the recipes-array to be saved
        $scope.addDaysToArray = function(){
            var days = [];
            days.push({"nameOfDay": "Mandag", "recipes": []});
            days.push({"nameOfDay": "Tirsdag", "recipes": []});
            days.push({"nameOfDay": "Onsdag", "recipes": []});
            days.push({"nameOfDay": "Torsdag", "recipes": []});
            days.push({"nameOfDay": "Fredag", "recipes": []});
            days.push({"nameOfDay": "Lørdag", "recipes": []});
            days.push({"nameOfDay": "Søndag", "recipes": []});

           return days;
        };

        $scope.daysObjInMealplan = $scope.addDaysToArray();
        $rootScope.days = $scope.addDaysToArray();
        $scope.mealPlan.days = $scope.addDaysToArray();

        // method called from Modal, adds recipe_id to mealplan.days.recipes to be saved
        $rootScope.addRecipeIdToMP = function(recipe_id, name_of_day){
            for(var i = 0; i < $scope.mealPlan.days.length; i++){

                if($scope.mealPlan.days[i].nameOfDay == name_of_day){

                    $scope.mealPlan.days[i].recipes.push(recipe_id);
                    break;
                }
            };

        };
        // method called from Modal, adds recipe object to recipes-array to view in MealPlan
        $rootScope.addRecipeObjToMP = function(recipe_id, name_of_day){
            for(var i = 0; i < $scope.daysObjInMealplan.length; i++){
            if($scope.daysObjInMealplan[i].nameOfDay == name_of_day) {
                var recipeObj = recipeService.get({id: recipe_id});

                $scope.daysObjInMealplan[i].recipes.push(recipeObj);
                }
            };
        };
        //removes recipe_id from mealplan.days.recipes to be saved
        $scope.removeRecipeFromDayInMP = function(recipe_id){

            for(var i = 0; i < $scope.daysObjInMealplan.length; i++){

                var objRecipesLength = $scope.daysObjInMealplan[i].recipes.length;
                var mpRecipesLength = $scope.mealPlan.days[i].recipes.length;


                if(objRecipesLength < mpRecipesLength){

                    var j = $scope.mealPlan.days[i].recipes.indexOf(recipe_id);
                    $scope.mealPlan.days[i].recipes.splice(j,1);

                };
            }
        };

        // btn in recipeList
        $scope.toggleModalMP = function(recipe_id){

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
        // saves mealplan
        $scope.createMealPlan = function(){
            if ($scope.createMealPlanForm.$valid) {

                $scope.mealPlan.$save({
                }, function () {
                    $state.go('home.viewMealPlanList');
                }, dialogService.showServerError);
            }
            else {
                dialogService.showOkay("Fejl!", "Du mangler at udfylde hele formen.");
            }

        };

        //updates search in Recipes by ingredient
        $scope.$watchCollection('recipe.ingredients', function (newCol, oldCol)
        {
            $scope.updateRecipes();
        });

        $scope.updateRecipes = function (){
            var recipes = recipeService.query({ data: $scope.recipe}, function ()
            {
                $scope.recipes = recipes;
                $('#loadingModal').modal('hide');
            }, function ()
            {
                alert("Der skete en server fejl, prøv igen senere.");

                $('#loadingModal').modal('hide');
            });
        };
    });