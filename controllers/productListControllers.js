angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")//设置全局常量
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount, cart) {
        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }
        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }
        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null || product.category == selectedCategory;//删选产品
        }
        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";//选中产品按钮高亮显示
        }
        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? productListActiveClass : "";//选中页码高亮显示
        }
        $scope.addProductToCart = function (product) {
            cart.addProduct(product.id, product.name, product.price);
        }

    })
    //.controller("aa", function ($scope, $parse) {
    //    $scope.$watch('expr', function (newVal, oldVal, scope) {
    //        if (newVal !== oldVal) {
    //            var parseFun = $parse(newVal);
    //            $scope.parsedValue = parseFun(scope);
    //        }
    //    });
    //});
