angular.module("madportalen").controller("createRecipeCtrl",
    function ($scope, $state, recipeService, authService, fileService, $uibModal, dialogService) {

        $scope.recipe = new recipeService();
        $scope.recipe.ingredients = [];
        $scope.recipe.createdBy = authService.getUser().id;


        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#recipePicture').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#recipePictureInput").change(function () {
            readURL(this);
        });


        $scope.createRecipe = function () {
            if ($scope.createRecipeForm.$valid) {
                $scope.recipe.$save({}, function () {

                    var file = $scope.recipePicture;
                    if (file) {
                        fileService.uploadFileToUrl(file, "/api/recipe/" + $scope.recipe.id + "/recipePicture", function (error) {
                            if (error) {
                                dialogService.showServerError();
                            }
                            else {
                                $state.go("home.viewRecipe", {"id": $scope.recipe.id});
                            }
                        });
                    }
                    else {
                        $state.go("home.viewRecipe", {"id": $scope.recipe.id});
                    }
                }, dialogService.showServerError);
            }
            else {
                dialogService.showOkay("Fejl!", "Du mangler at udfylde hele formen.");
            }
        };

        $scope.createIngredient = function () {
            $uibModal.open({
                templateUrl: 'app/modals/createIngredientModal.html',
                controller: 'createIngredientModalCtrl',
                resolve: {}
            });
        };
    });