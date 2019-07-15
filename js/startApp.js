window.onload = function() {
    //加载内容；
    new elms({
        data: {
            hello: "this is elms!",
            test: "hi,",
            shows: "（双击查看）",
            aa: Math.random()
        },
        elements: [{
            el: document.getElementById("app"),
            actions: [{
                action: 'click',
            }]
        }, {
            el: document.getElementById("22"),
            actions: [{
                action: 'click',
                test: '$.tests(\'5\')'
            }]
        }],
        methods: {
            tests(a) {
                console.log(a)
            },
            show() {
                $.tests('this is a test msg')
                $.shows = "什么都做不了！"
            }
        }
    })
}