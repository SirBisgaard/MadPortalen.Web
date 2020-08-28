angular.module('madportalen').controller('createIngredientModalCtrl', function ($scope, $uibModalInstance, ingredientService) {

    $scope.unitTypes = [
        'stk.', 
        'gram',
        'kg',
        'cl.',
        'ml.',
        'dl.',
        'l.',
        'tsk.',
        'spsk.',
        'knsp.'
    ];

    $scope.save = function () {
        if($scope.ingredientForm.$valid){
            ingredientService.save({
                name: $scope.ingredient.name,
                unitType: $scope.ingredient.unitType
            }, function () {
                $uibModalInstance.dismiss('save');
            }, function () {
                alert("Der skete en server fejl, prøv igen senere.");
            });
        }else {
            alert("Du mangler at udfylde hele formen.");
        }
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    
});
