function main() {
    // 获取canvas 元素
    var canvas = document.getElementById('webgl');
    // 获取Webgl绘图上下文
    var gl = canvas.getContext('webgl')
    if (!gl) {
        console.log('当前浏览器不支持 WebGl')
        return
    }

    // 指定清空Canvas 颜色
    gl.clearColor(1.0, 0.0, 0.0, 1.0)

    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT)


}