# 首页背景视频

来源：用户提供的 `2024独白.mp4`。原文件保存在工作区 attachments，未覆盖。

网页版本：`mrcat-hero.mp4`，完整约 26 秒，1280×720、30fps、H.264 / yuv420p、移除音轨、faststart。
封面：原视频第 3 秒提取的静态帧 `hero-poster.jpg`。

默认静音循环；暂停/播放按钮；离开首屏或切换标签时暂停。prefers-reduced-motion 下不挂载 video，不请求视频数据，只显示静态帧。自动播放被浏览器拒绝时保留海报和手动播放按钮。
配置入口为 content/site.ts 的 home.hero.video / poster；将 video 设为空字符串可恢复米灰色首屏。
