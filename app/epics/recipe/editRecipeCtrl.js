/* Created by Anders modified by Martin */
angular.module("madportalen").controller("editRecipeCtrl",
    function ($scope, $state, recipeService, fileService, dialogService) {
        var now = "rand=" + Date.now();
        $scope.recipePictureURL = "/pics/recipe/defaultRecipePic.png";

        $scope.recipe =
            {
                ingredients: []
            };

        var loadRecipe = function () {
            $scope.recipe = recipeService.get({
                id: $state.params.id
            }, function () {
                $scope.recipePictureURL = $scope.recipe.pictureLocation + "?" + now;
            }, function () {
                $state.go("home.personalCookbook");
                dialogService.showServerError();
            });
        }


        $scope.uploadPicture = function () {
            var file = $scope.profilePicture;
            if (file) {
                fileService.uploadFileToUrl(file, "/api/recipe/" + $scope.recipe.id + "/recipePicture", function (error) {
                    if (error) {
                        dialogService.showServerError();
                    }
                    else {
                        loadRecipe();
                    }
                });
            }
            else {
                dialogService.showOkay("Fejl!", "Du skal vælge et billede!.");
            }
        };

        $scope.editRecipe = function () {

            if ($scope.editRecipeForm.$valid) {
                $scope.recipe.$update({
                    id: $scope.recipe.id
                }, function () {
                    $state.go('home.frontPage');
                }, dialogService.showServerError);
            }
            else {
                dialogService.showOkay("Fejl!", "Du skal udfylde hele formen.");
            }
        };

        $scope.deleteRecipe = function () {
            dialogService.showComfirm(
                "Slet ´" + $scope.recipe.name + "´",
                "Er du sikker på at slette?", function (result) {
                    if (result) {
                        recipeService.delete({
                            id: $state.params.id
                        }, function () {
                            $state.go("home.personalCookbook");
                        }, dialogService.showServerError);
                    }
                });
        }

        loadRecipe();
    });
