
app.directive('ingredientPicker', function (ingredientService, dialogService) {
    return {
        restrict: "E",
        scope: true,
        templateUrl: "/app/directives/ingredientPicker.html",
        link: function (scope, element, attr) {
            /* this is the temp list of ingredient that are selectable */
            scope.listIngredients = [];

            /* This method will add an ingredient to ingredients */
            scope.addToIngredients = function (ingredient) {
                var newIngredient = ingredient;

                var isThere = false;
                for (var i = 0; i < scope.recipe.ingredients.length; i++) {
                    if (scope.recipe.ingredients[i].ingredient.name == newIngredient.name) {
                        isThere = true;
                        break;
                    }
                }

                if (!isThere) {
                    scope.recipe.ingredients = [{
                        amount: 0,
                        ingredient: newIngredient
                    }].concat(scope.recipe.ingredients);

                    scope.searchText = "";
                    scope.listIngredients = [];
                }
                else {
                    dialogService.showOkay("Fejl!", "Du kan ikke tilføje den same Ingrediens 2 gange.");
                }
            };

            /* This method will remove a added ingredient from the ingredients */
            scope.removeFromIngridiants = function (ingredient) {

                for (var i = 0; i < scope.recipe.ingredients.length; i++) {

                    if (scope.recipe.ingredients[i].ingredient.id == ingredient.ingredient.id) {
                        scope.recipe.ingredients.splice(i, 1);
                        break;
                    }
                }
            };

            /* This method will get the ingredients and added to the list */
            scope.getIngridiants = function () {
                if (scope.searchText == "") {
                    scope.listIngredients = [];
                }
                else {
                    var ingredients = ingredientService.query({
                        data: {
                            name: scope.searchText
                        }
                    }, function () {
                        scope.listIngredients = ingredients;
                    }, function () {
                        dialogService.showServerError();
                    });
                }
            };
        }
    };
});
