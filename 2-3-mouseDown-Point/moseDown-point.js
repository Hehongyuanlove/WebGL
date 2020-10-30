const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main(){
    gl_PointSize = 10.0;
    gl_Position=a_Position;
  }
`;

const FSHADER_SOURCE = `
  void main(){
    gl_FragColor=vec4(1.0,1.0,0.0,1.0);
  }
`;

var g_points = []

function click(ev, gl, canvas, a_Position) {
  let x = ev.clientX;
  let y = ev.clientY;
  const rect = ev.target.getBoundingClientRect()

  x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)

  // 将坐标储存到 g_points 数组中
  g_points.push(x);
  g_points.push(y);


  // 清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  const len = g_points.length

  for (let i = 0; i < len; i += 2) {
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0)
    gl.drawArrays(gl.POINTS, 0, 1)
  }

}

function main() {
  const canvas = document.getElementById('webgl')
  const gl = canvas.getContext("webgl2")
  if (!gl) {
    console.error('当前浏览器不支持 WEBGL')
    return
  }
  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.error('着色器渲染失败')
    return
  }
  // 获取位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if (a_Position < 0) {
    console.error('a_Position 为获取到地址')
    return
  }

  // 注册鼠标点击事件
  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position)
  }

  // 设置canvas 背景色
  gl.clearColor(1.0, .0, .0, 1.0)
  // 清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

}
