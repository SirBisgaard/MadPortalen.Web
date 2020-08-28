angular.module("madportalen").factory("mealPlanService",
    function($resource, authService){
        //var mealPlan = {};

        var mealPlanService = $resource('/api/mealPlan/:id', {id:""},{
            'get': {
                method: 'GET',
                cache: false,
                headers: {
                    "x-access-token": authService.getToken()
                }
            },
            'getById': {
                method: 'GET',
                cache: false,
                params: '',
                headers: {
                    "x-access-token": authService.getToken()
                }
            },
            'save': {
               method:'POST',
               headers: {
                   "x-access-token": authService.getToken()
               }
            },
            'update': {
                method: 'PATCH',
                params: '',
                headers: {
                    "x-access-token": authService.getToken()
                }
            },
            'delete': {
                method: 'DELETE',
                params: '',
                headers: {
                    "x-access-token": authService.getToken()
                }
            },
            'query': {
                url: "/api/mealPlan/",
                method: 'GET',
                cache: false,
                headers: {
                    "x-access-token": authService.getToken()
                },
                isArray: true
            }
        });

        return mealPlanService;
});