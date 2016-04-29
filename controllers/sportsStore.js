angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:5500/products")
    .constant("orderUrl","http://localhost:5500/order")
    .controller("sportsStoreCtrl", function ($scope,$http,$location,dataUrl,orderUrl,cart) {
        $scope.data={};
        $http.get(dataUrl)
            .success(function(data){
                $scope.data.products=data;
            })
            .error(function(error){
                $scope.data.error=error;
            });
        $scope.sendOrder=function(shippingDetails){
            var order=angular.copy(shippingDetails);
            order.products=cart.getProducts();
            $http.post(orderUrl,order)
                .success(function(data){
                    $scope.data.orderId=data.id;
                    cart.getProducts().length=0;
                })
                .error(function(error){
                    $scope.data.orderError=error;
                }).finally(function(){
                    $location.path("/complete");
                });
        }
        //$scope.data = {
        //    products: [
        //        {name: "Product #1", description: "A product", category: "Category #1", price: 100},
        //        {name: "Product #2", description: "A product", category: "Category #1", price: 200},
        //        {name: "Product #3", description: "A product", category: "Category #2", price: 300},
        //        {name: "Product #4", description: "A product", category: "Category #3", price: 400},
        //        {name: "Product #5", description: "A product", category: "Category #4", price: 100},
        //        {name: "Product #6", description: "A product", category: "Category #1", price: 200},
        //        {name: "Product #7", description: "A product", category: "Category #2", price: 300},
        //        {name: "Product #8", description: "A product", category: "Category #3", price: 400}
        //    ]
        //};

    });