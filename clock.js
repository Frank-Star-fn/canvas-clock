
function animate(time){
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  let hr = now.getHours();
  if(hr>=12){
    hr-=12; // 转换成12小时制
  }
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // const ctx = document.getElementById("canvas").getContext("2d");
  ctx.save(); // 将状态存档

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.translate(canvas.width/2,canvas.height/2); // 重新映射画布上的坐标原点
  ctx.rotate(-Math.PI/2); // 旋转坐标轴

  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // 绘制表盘
  ctx.save();
  ctx.strokeStyle = "rgb(107 114 128)";
  for(let i=0;i<12;i++){
    ctx.beginPath();
    ctx.rotate(Math.PI/6);
    ctx.moveTo(115,0);
    ctx.lineTo(119,0);
    ctx.stroke();
  }
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = "rgb(209 213 219)";
  ctx.lineWidth = 3;
  for(let i=0;i<60;i++){
    if(i%5==4){
      ctx.rotate(Math.PI/30);
      continue;
    }
    ctx.beginPath();
    ctx.rotate(Math.PI/30);
    ctx.moveTo(117,0);
    ctx.lineTo(117,0);
    ctx.stroke();
  }
  ctx.restore();

  // 时针
  ctx.save();
  ctx.rotate(
    hr*(Math.PI/6)+min*(Math.PI/360)+sec*(Math.PI/360/60) 
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-12,0);
  ctx.lineTo(65,0);
  ctx.stroke();
  ctx.restore();

  // 分针
  ctx.save();
  ctx.rotate(
    min*(Math.PI/30)+sec*(Math.PI/1800) 
  );
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-20,0);
  ctx.lineTo(95,0);
  ctx.stroke();
  ctx.restore();


  // 秒针和圆
  ctx.save();
  ctx.rotate(
    sec*(Math.PI/30) 
  );
  ctx.strokeStyle = "rgb(220 38 38)"; // "#D40000";
  ctx.fillStyle = "rgb(220 38 38)"; // "#D40000";
  ctx.lineWidth = 6;

  // 秒针
  ctx.beginPath();
  ctx.moveTo(-30,0);
  ctx.lineTo(120,0);
  ctx.stroke();

  // 中心圆
  ctx.beginPath();
  ctx.arc(0,0,10,0,Math.PI*2,true);
  ctx.fill();

  // ctx.fillStyle = "rgba(0,0,0,0.5)";
  // ctx.arc(0,0,1,0,Math.PI,true);
  // ctx.fill();

  ctx.restore();


  ctx.restore(); // 读档恢复状态

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);