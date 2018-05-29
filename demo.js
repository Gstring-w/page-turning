(function ($) {
    function fillHtml(dom,args){
        dom.empty();
        //上一页
        if(args.current > 1){
            dom.append('<a href="#" class="prevAct">上一页</a>')
        }else {
            dom.remove('.prevAct');
            dom.append('<span class="prevNeg">上一页</span>')
        }
        if(args.pageCount > 2 && args.current != 1){
            dom.append('<a href="#" class="index">1</a>')
        }
        if(args.current == 1){
            dom.append('<a href="#" class="indexAct">1</a>')
        }
        if (args.current > 4){
            dom.append('<span>...</span>');
        }
        //当前页
        if( args.pageCount > 5 ){
            var start = args.current - 2;
            var end = args.current + 2;
            for (; start <= end; start++) {
                if (start == 1 || start == args.pageCount) {

                } else if (start == args.current) {
                    dom.append('<a href="#" class="indexAct">' + start + '</a>')
                } else if (start < 1 || start > args.pageCount){

                }else {
                    dom.append('<a href="#" class="index">' + start + '</a>')
                }
            }
        }
    
        if ((args.pageCount - args.current) > 3 ) {
            dom.append('<span>...</span>');
        }
        if(args.current == args.pageCount){
            dom.append('<a href="#" class="indexAct">' + args.pageCount+'</a>')
        }
        if (args.pageCount > 3 && args.current != args.pageCount){
            dom.append('<a href="#" class="index">'+args.pageCount+'</a>')
        }
        //下一页
        if(args.current < args.pageCount){
            dom.append('<a href="#" class="nextAct">下一页</a>')
        }else {
            dom.remove('.prevAct');
            dom.append('<span class="nextNeg">下一页</span>')
        }
    }
    function bindEvent(dom,args) {
        dom.on('click','.prevAct',function (){
            fillHtml(dom,{
                pageCount : args.pageCount,
                current: --args.current,
            })
            if (typeof (args.callback == "function")) {
                args.callback(args.current);
            }
        })
        dom.on('click', '.nextAct', function () {
            fillHtml(dom, {
                pageCount: args.pageCount,
                current: ++args.current,
            })
            if (typeof (args.callback == "function")) {
                args.callback(args.current);
            }
        })
        dom.on('click', '.index', function () {
            var current = parseInt($(this).text());
            fillHtml(dom, {
                pageCount: args.pageCount,
                current: current,
            })
            if (typeof (args.callback == "function")) {
                args.callback(current);
            }
        })




    }
    function init(dom,args){
        if(args.pageCount >= args.current){
            fillHtml(dom,args);
            bindEvent(dom,args);
        }else {
            alert('请输入正确的页数');
        }
    }
    $.fn.createPage = function (option){
        var args = $.extend({
            pageCount : 10,
            current : 5,
            callback: function () {} 
        },option);
        init(this,option);
    }


})(jQuery)