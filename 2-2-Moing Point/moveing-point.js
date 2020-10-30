// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main(){
    gl_PointSize = 10.0;
    gl_Position=a_Position;
  }
`;

// 片元着色器
const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,1.0,0.0,1.0);
  }
`;

function main() {
    // Get
    var canvas = document.getElementById('webgl')
    const gl = canvas.getContext("webgl")

    if (!gl) {
        console.error('当前浏览器不支持webgl')
        return
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('着色器渲染失败')
    }

    // 获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if (a_Position < 0) {
        console.error('a_Position 获取失败')
        return
    }

    // 将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)

    // 设置canvas 背景色
    gl.clearColor(0.0, .0, .0, 1.0)

    // 清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)





}