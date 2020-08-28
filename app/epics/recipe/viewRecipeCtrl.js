/* Created by Christine and Christoffer modified by Anders and Martin */
angular.module("madportalen").controller("viewRecipeCtrl",
function ($scope, $state, $uibModal,recipeService, authService, userService, dialogService) {
    $scope.user = authService.getUser();
    $scope.recipePictureURL = "/pics/recipe/defaultRecipePic.png";
    var now = "rand=" + Date.now();
    //Rate recipe
    $scope.max = 5;
    $scope.rate = 0;

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = value;
    };

    function load() {
        var recipe = recipeService.get({
            id: $state.params.id
        }, function () {
            $scope.recipe = recipe;
            $scope.recipePictureURL = $scope.recipe.pictureLocation + "?" + now;

            var hasRateFromUser = false;
            for (var i = 0; i < recipe.ratings.length; i++) {
                var rating = recipe.ratings[i];
                if (rating.createdBy == $scope.user.id) {
                    $scope.rate = rating.rating;
                    hasRateFromUser = true;
                    break;
                }
            }
            if(!hasRateFromUser)
            {
                $scope.rate = recipe.rating;
            }

        }, dialogService.showServerError);
    }
    load();

    $scope.addSharedRecipeToCookbook = function (recipe_id) {
        userService.addSharedRecipeToCookbook(recipe_id)
    };

    $scope.removeSharedRecipeFromCookbook = function (recipe_id) {
        userService.removeSharedRecipeFromCookbook(recipe_id)
    };

    $scope.isRecipeInCookbook = function (recipe_id) {
        return userService.isRecipeInCookbook(recipe_id)
    };

    $scope.isNotOwnerOfRecipe = function (mealPlan_createdBy) {
        return userService.isNotOwnerOfRecipe(mealPlan_createdBy)
    };

    $scope.addRecipeToMealPlan = function (recipe_id) {
        $uibModal.open({
            templateUrl: 'app/epics/mealPlan/recipeToMealPlanPopUp.html',
            controller: 'recipeToMealPlanCtrl',
            resolve: {
                id: function () {
                    return recipe_id;
                }
            }
        });
    };

    $scope.rateRecipe = function () {
        recipeService.rate({ id: $scope.recipe.id }, {
            rating: $scope.rate
        }, function () {
            load();
        }, dialogService.showServerError);
    };
})

;