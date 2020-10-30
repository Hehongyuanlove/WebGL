// 顶点着色器 Vertex shader
var VSHADER_SOURCE =
    'void main() { \n  '
    + ' gl_Position = vec4(0.5,0.5,0.0,1.0);\n'
    + ' gl_PointSize = 10.0 ; \n'
    + '}'
// 片元着色器 Fragment shader
var FSHADER_SOURCE =
    'void main() { \n '
    + ' gl_FragColor = vec4(1.0,1.0,0.0,1.0); \n'
    + '}'

function main() {
    var canvas = document.getElementById('webgl')
    const gl = canvas.getContext('webgl')
    // 
    if (!gl) {
        console.error('当前浏览器不持支Webgl')
        return
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('着色器创建失败')
        return
    }

    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制dian 
    gl.drawArrays(gl.POINTS, 0, 1)

}