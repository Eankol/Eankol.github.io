(function(global, bean) {
    var beans = bean();
    global.elms = beans.elms;
    global.$ = beans.$;

}(this, function() {

    var $ = {}; //全局属性；

    var $data = {} //数据监听池；


    function addWatch(elements) {
        if (elements && elements.length > 0) {
            for (let e of elements) {
                if (e.el) {
                    switch (typeof(e.el)) {
                        case "string":
                            //TODO
                            break;
                        case 'object':

                            //寻找替换key;
                            let inners = e.el.innerHTML
                            keys = inners.match(/\{\{(.+?)\}\}/g)
                            for (let i = 0; i < keys.length; i++) {
                                let k = keys[i].replace(/\{|\}/g, "")
                                if (!$data[k]) { //监听池增加属性监听；
                                    $data[k] = []
                                }
                                $data[k].push({
                                    el: e.el,
                                    data: inners,
                                    prop: 'innerHTML'
                                })
                            }
                            break;
                        default:
                            console.log("unknow target:" + e.el)
                            break;
                    }
                }
            }
        }

    }

    //绑定值；
    function def(obj, k, val) {
        Object.defineProperty(obj, k, {
            configurable: true,
            enumerable: true,
            get: function() {
                return val;
            },
            set: function(newVal) {
                // if (val === newVal) {
                //     return;
                // }
                //取监听池监听修改内容；
                if ($data[k] && $data[k].length > 0) {
                    for (let e of $data[k]) {
                        let preRes = e.data;
                        let reg = eval("/\{\{" + k + "\}\}/g")
                        preRes = preRes.replace(reg, newVal)
                        let other = preRes.match(/\{\{(.+?)\}\}/g)
                        if (other && other.length > 0) {
                            for (let i = 0; i < other.length; i++) {
                                let r = eval("/" + other[i] + "/g")
                                preRes = preRes.replace(r, $[other[i].replace(/\{|\}/g, "")])
                            }
                        }
                        e.el.innerHTML = preRes
                    }
                }
                val = newVal;
            }
        });
    }

    function elms(options) {

        //function 检查；
        var methods = options.methods;
        for (let m in methods) {
            $[m] = methods[m]
        }

        //注入对象获取；
        var elements = options.elements
        addWatch(elements)
        var option = options.data; //传入属性；
        //传入属性绑定；
        for (let k in option) {
            def($, k, option[k])
        }
        //初始化属性值；
        for (let k in options.data) {
            $[k] = options.data[k]
        }

        document.addEventListener('dblclick', function() {
            $.show()
        })


    }

    return { elms, $ };
}))