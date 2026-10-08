# V2 素材接入状态

上传文件 MRCAT网页设计.rar 超过附件传输工具的 32 MiB 上限，尚未下载、解压或检查。当前四个项目真实素材尚未接入；所有四个项目的 image 和 gallery 均为空，不显示无关风景照片。本分支是待接入素材的开发稿，不应合并上线。

请分别上传小于 32 MiB 的普通 ZIP，必要时每个项目再拆为数份，本人形象已在后续消息单独提供，见文末。

## 接入位置

- 原图保存在仓库外 /workspace/mrcat-originals，保持原始文件与目录，不覆盖。
- 本人形象的网页文件：public/portrait/
- 四个项目的网页文件：public/projects/01-fanzhi-yunting/、02-shanye-camp/、03-fanjing-resort/、04-annori-homestay/
- 主配置：content/site.ts；作品配置：content/projects.ts。

待实际检查素材后记录数量、原始文件名、尺寸和类型，选择封面，再生成 WebP 优化副本。保留真实人物和完整建筑构图，不把效果图标为实景。Next Image 会提供响应式加载和格式优化，gallery 项应填入实际 width、height 防止布局跳动。总平面图使用完整比例显示。

每张 gallery 图片包含 src、alt、caption、kind、width、height。kind 为现场照片、设计效果图、概念示意或总平面图；按现场空间优先、设计过程随后排序。未知素材类型先待确认，不猜测。

## 尚未完成

项目素材清点、实际封面选择、WebP 副本生成、真实图片的视觉验证与灯箱端到端验证。灯箱已用临时测试图片验证键盘切换、Escape、关闭及焦点返回；测试入口已移除。空图库不提供放大入口，真实素材的视觉验证仍未完成。

## 已接入首页肖像

用户在后续消息中单独提供本人形象图，现已通过图像编辑工具去背景，网页素材保存在 public/portrait/mr-cat-hero.png（透明 PNG）。原始工具输出保留在工作区 generated_images；请审阅脸部与服装边缘。Hero 已替换抽象人形，不影响四个项目素材仍待导入的状态。
