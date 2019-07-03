window.onload = function() {
    //加载内容；
    new elms({
        data: {
            hello: "this is elms!",
            test: "hi,"
        },
        elements: [{
            el: document.getElementById("app")
        }],
        methods: {
            tests() {
                alert("method tests")
            },
            show() {
                alert("method show")
            }
        }
    })
}