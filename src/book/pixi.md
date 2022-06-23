# PIXI

## 创建Pixi应用和stage
let app = new PIXI.Application({ 
    width: 256,         // default: 800 宽度
    height: 256,        // default: 600 高度
    antialias: true,    // default: false 反锯齿
    transparent: false, // default: false 透明度
    resolution: 1       // default: 1 分辨率
  }
);
document.body.appendChild(app.view);

forceCanvas: true // renderer对象将默认为WebGL。如果您想使用canvas绘图API，可以将forceCanvas选项设置为true
app.renderer.backgroundColor = 0x061639;  // 背景颜色
app.renderer.autoResize = true;
app.renderer.resize(512, 512);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";


## 纹理Texture
因为Pixi使用WebGL在GPU上渲染图像，图像需要转换为GPU可以处理的东西，这个东西被称为texture（纹理）。为保证快速高效，Pixi使用texture cache（纹理缓存）来存储和引用你的精灵需要的所有纹理。texture（纹理）的名称就是引用图像的文件的路径。这意味着，如果您有一个从“images/cat.png”加载的纹理
let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];  // 加载图像到纹理缓存

## loader 加载器
  const loader = PIXI.Loader.shared; // 公开实例可以直接使用
  const loader = new PIXI.Loader(); // 创建一个实例
  loader.add('bunny', 'data/bunny.png') //加载图片
  loader.load(setup)  // 加载完成回调
  function setup () {

  } 

PIXI.loader.on("progress", loadProgressHandler)   // 监控加载进度

##  sprite 精灵
sprite（精灵）是一种的特殊图像对象。您可以控制它们的位置、大小和其他属性。学习制作和控制sprite（精灵）非常重要。如果你知道如何制作sprite（精灵）并将它们添加到舞台上
  let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];
  let sprite = new PIXI.Sprite(texture);
  PIXI.loader
    .add("images/anyImage.png")
    .load(setup);

  function setup() {
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources["images/anyImage.png"].texture
    );
  }

  //  定位
  let cat = new Sprite(resources["images/cat.png"].texture);
  //Change the sprite's position
  cat.x = 96;
  cat.y = 96;
  //  sprite.position.set(x, y)
  //  精灵的width和height属性来改变它的大小
  cat.width = 80;
  cat.height = 120;
  //  缩放
  cat.scale.x = 0.5;
  cat.scale.y = 0.5;
  //  按比例改变精灵的宽度和高度
  //  cat.scale.set(0.5, 0.5)

  // 旋转
  cat.rotation = 0.5 // 旋转的弧度值
  // 瞄点 围绕这个锚点旋转
  cat.anchor.x = 0.5
  cat.anchor.y = 0.5
  // cat.anchor.set(0.5, 0.5)

### 移动精灵
  // 游戏循环
  app.ticker.add(delta => gameLoop(delta))
  function gameLoop(delta) {
    cat.x += 1
  }
  delta = (当前帧的时间 - 上一帧的时间) / (1000 / 60); 其中1000是指1000ms，即1秒， 60是1秒种执行60次。 (1000 / 60)就是每秒钟执行60次，帧与帧之前的平均时间间隔。

  除了用Pixi的ticker去创造一个游戏循环，你还可以使用requestAnimationFrame
  function gameLoop() {
    requestAnimationFrame(gameLoop)
    cat.x += 1
  }

### 使用速度属性
  使用两个速度属性（vx和vy）来控制精灵的移动速度,会比上面更灵活。vx用于设置精灵在x轴上（水平）的速度和方向。 vy用于在y轴上（垂直）设置精灵的速度和方向。 无需直接更改精灵的x和y值，只需更新速度变量，然后给精灵设置这些速度值。
  let cat = new Sprite(Loder.resource["image/cat.pmg"].texture)
  // 先给精灵的vx和vy设置一个初始值
  cat.vx = 0
  cat.vy = 0
  
  function gameLoop(delta){
    cat.vx = 1
    cat.vy = 1

    cat.x += cat.vx
    cat.y += cat.vy
  }

## 雪碧图
  当图像加载后，使用雪碧图的一个矩形区域内容来创建精灵的图像
  Pixi有一个内置的Rectangle对象(Pixi.Rectangle)，它是用于定义矩形形状的通用对象。它有四个参数。前两个参数定义了矩形的x和y位置。后两个定义了它的宽度width和高度height
  let rectangle = new PIXI.Rectangle(x, y, width, height);

  // 
  let texture = TextureCache["images/tileset.png"];
  let rectangle = new Rectangle(96, 64, 32, 32);

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;

  //Create the sprite from the texture
  let rocket = new Sprite(texture);

  