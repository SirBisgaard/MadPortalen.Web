/* Created by Martin */
/*  Ingredient Service  */
angular.module("madportalen").factory('ingredientService', function ($resource, authService) {
    var ingredient = $resource('/api/ingredient', {}, {
        'query': {
            method: 'GET',
            cache: false,
            headers: {
                "x-access-token": authService.getToken()
            },
            isArray: true
        },
        'save': {
            method: 'POST',
            headers: {
                "x-access-token": authService.getToken()
            }
        }
    });


    return ingredient;
});