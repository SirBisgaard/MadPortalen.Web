/* Created by Martin */
angular.module("madportalen").controller("refrigeratorCtrl",
    function ($scope, $state, recipeService, dialogService)
{
    $scope.$parent.$watch('name', function (v)
    {
        $scope.recipe.name = v;
        $scope.updateRecipes();
        $('#searchFilters').show(); 
    });

    $scope.$watch('recipe.name', function (v)
    {
        $scope.$parent.name = v
    });
    
    $scope.$watchCollection('recipe.ingredients', function (newCol, oldCol)
    {
        $scope.updateRecipes();
    });
    
    $scope.recipes = [];
    $scope.recipe = {
        ingredients: []
    };
    
    $scope.updateRecipes = function ()
    {
        var recipes = recipeService.query({ data: $scope.recipe}, function ()
        {
            $scope.recipes = recipes;
        }, function ()
        {
                dialogService.showServerError();
        });
    }
    $scope.updateRecipes();
    
    /* Toggle filters */
    $scope.toggleFilters = function ()
    {
        $('#searchFilters').toggle();
    };
});