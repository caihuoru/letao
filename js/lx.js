var page=1;

var search=getQueryString('search');

$(function(){
    mui.init({
        pullRefresh:{
            container:'#pillrefresh',
            down:{
                contentdown:'下拉刷新效果',
                contentover:'拉动的时候的效果',
                contentrefresh:'松开手的时候正在加载数据的显示文本....',
                callback:function(){
                    setTimeout(function(){
                        getProductList({
                            proName:'鞋',
                            brandId:2,
                            price:1,
                            num:1,
                            page:1,
                            pageSize:2,
                        },function(data){
                            var html=template('productListTmp',data);

                            $('.productlist-content .mui-row').html(html);
                            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                        })
                    },1000);
                }
            },

            up:{
                contentrefresh:'加载中...',
                contentnomore:'在下实在是给不了更多了',

                callback:function(){
                    setTimeout(function(){
                        page++;
                        getProductList({
                            proName:'鞋',
                            brandId:1,
                            price1,
                            num:1,
                            page:page,
                            pageSize:2.
                        },function(data){
                            var html=template('productListTmp',data);
                            $('.productlist-content .mui-row').append(html);
                            if(data.data.length<=0){
                                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(true);
                                return;
                            }

                            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                        });
                    },1000);
                }
            }
        }
    });

    $('.search-input').val(search);

    getProductList({
        proName:search,
        price:1,
        num:1,
        page:1,
        pageSize:6,
    },function(data){
        var html=template('productListTmp',data);
        $('.productlist-content .mui-row').html(html);
    });

    searchProductlist();
    productlistSort();
    linkDetail();
});