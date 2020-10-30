// 顶点着色器
const VSHADER_SOURCE =
    `
  attribute vec4 a_Position;
  void main(){
    gl_PointSize = 10.0;
    gl_Position=a_Position;
  }
`;
// 片元着色器
const FSHADER_SOUSE =
    `
  precision mediump float; // 精度限定词 [最大值/最小值]/精度
  uniform vec4 u_FragColor;
  void main(){
    gl_FragColor = u_FragColor;
  }
`;

const g_points = []
const g_color = []
function click(ev, gl, canvas, a_Position, u_FragColor) {
    // 确定坐标
    let x = ev.clientX;
    let y = ev.clientY;

    const rect = ev.target.getBoundingClientRect()

    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)

    // 输入 position [x,y]
    g_points.push([x, y])

    // 输入 color(r,g,b,a)
    if (x >= 0.0 && y >= 0.0) {
        // 第一象限
        g_color.push([1.0, 1.0, 0.0, 1.0]) // 红色
    } else if (x < 0.0 && y < 0.0) {
        // 第三象限
        g_color.push([0.0, 1.0, 0.0, 1.0]) // 绿色
    }
    else {
        // 二/四象限
        g_color.push([1.0, 1.0, 1.0, 1.0]) // 白色
    }

    gl.clear(gl.COLOR_BUFFER_BIT)

    for (let i = 0; i < g_points.length; i++) {
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0)
        gl.uniform4f(u_FragColor, g_color[i][0], g_color[i][1], g_color[i][2], g_color[i][3])
        gl.drawArrays(gl.POINTS, 0, 1)
    }

}

function main() {
    const canvas = document.getElementById('webgl')
    const gl = canvas.getContext('webgl')
    if (!gl) {
        console.error('当前浏览器支不支持webgl')
        return
    }

    // 初始化 着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOUSE)) {
        console.error('着色器渲染失败')
        return
    }

    // 获取 a_Position return 储存地址 > 0
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0) {
        console.error(' a_Position 获取失败')
        return
    }

    // 获取 u_FragColor return null/non-null
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    if (!u_FragColor) {
        console.error('u_FragColor 获取失败')
        return
    }

    // 设置背景色
    gl.clearColor(1.0, .0, .0, 1.0)

    // 清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 点击描点
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, u_FragColor)
    }
}