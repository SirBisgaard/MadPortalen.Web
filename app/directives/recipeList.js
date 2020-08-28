app.directive('recipeList', function (recipeService, $state, authService, userService, $uibModal, dialogService) {

    return {
        restrict: 'E',
        scope: {
            recipes: '=recipes',
            metode: '&',
            viewType: '=viewType',
            removel: '&'
        },
        templateUrl: '/app/directives/recipeList.html',
        link: function (scope) {
            if (!scope.viewType) {
                scope.viewType = 0;
            }


            var now = "rand=" + Date.now();
            scope.$state = $state;

            scope.addSharedRecipeToCookbook = function (recipe_id) {
                userService.addSharedRecipeToCookbook(recipe_id)
            };

            scope.removeSharedRecipeFromCookbook = function (recipe_id) {
                userService.removeSharedRecipeFromCookbook(recipe_id)
            };

            scope.isRecipeInCookbook = function (recipe_id) {
                return userService.isRecipeInCookbook(recipe_id)
            };

            scope.isNotOwnerOfRecipe = function (recipe_createdBy_id) {
                return userService.isNotOwnerOfRecipe(recipe_createdBy_id)
            };

            scope.createRecipeURL = function (recipeURL) {
                return recipeURL + "?" + now;
            };

            scope.addRecipeToMealPlan = function (recipe_id) {
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

            // Btn in createMealPLan, removes recipe from recipes-array.
            scope.removeRecipeFromMP = function(recipe_id){
                var i = scope.recipes.indexOf(recipe_id);
                scope.recipes.splice(i,1);
                scope.removel({id: recipe_id});

            };

            function updateRecipe() {
                var recipe = recipeService.get({
                    id: $state.params.id
                }, function () {
                    scope.recipe = recipe;
                }, function () {
                    $state.go("home.personalCookbook");
                    dialogService.showServerError();
                });
            }

            function updateUser() {
                scope.user = authService.getUser();
            }

        }
    };
});

