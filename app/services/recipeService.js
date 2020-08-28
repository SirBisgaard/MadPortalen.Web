/* Created by Martin Modified by Christine */
/*  Recipe Service  */
angular.module("madportalen").factory('recipeService', function ($resource, authService)
{
    var recipeService = $resource('/api/recipe/:id', { id: "" }, {
        'get': {
            method: 'GET',
            cache: false,
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'save': {
            method: 'POST',
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'update': {
            method: 'PATCH',
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'query': {
            url: "/api/recipe/",
            method: 'GET',
            cache: false,
            headers: {
                "x-access-token": authService.getToken()
            },
            isArray: true
        },
        'delete': {
            method: 'DELETE',
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'queryTopRated': {
            url: "/api/recipe/topRated",
            method: 'GET',
            cache: false,
            headers: {
                "x-access-token": authService.getToken()
            },
            isArray: true
        },
        "rate":{
            url: "/api/recipe/:id/rate",
            params: { id: "" },
            method: 'PUT',
            headers: {
                "x-access-token": authService.getToken()
            }
        }
    });
    return recipeService;
});