angular.module("customFilters",[])
.filter("unique",function(){
        return function(data,propertyName){
            if(angular.isArray(data)&&angular.isString(propertyName)){
                var results=[];
                var keys={};
                for(var i=0;i<data.length;i++){
                    var val=data[i][propertyName];
                    if(angular.isUndefined(keys[val])){
                        keys[val]=true;//angular.isUndefined(true)=false
                        results.push(val);//排除重复的值
                    }
                }
                return results;
            }else{
                return data;
            }
        }
    })
.filter("range",function($filter){
        return function(data,page,size){
            if(angular.isArray(data)&&angular.isNumber(page)&&angular.isNumber(size)){
                var start_index=(page-1)*size;
                if(data.length<start_index){
                    return [];
                }else{
                    return $filter("limitTo")(data.splice(start_index),size);//data.splice(start_index,size)
                }
            }else{
                return data;
            }
        }
    })//根据size删选一页显示的产品
.filter("pageCount",function(){
        return function(data,size){
            if(angular.isArray(data)){
                var result=[];
                for(var i=0;i<Math.ceil(data.length/size);i++){//Math.ceil（2.2）=3
                    result.push(i);
                }
                return result;
            }else{
                return data;
            }
        }
    })//显示的页码数
