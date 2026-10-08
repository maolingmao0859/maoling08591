My Personal Design Portfolio

# BEYOND · 独立设计师作品集

Next.js 15 / React 19 / Tailwind CSS 4 / Framer Motion / TypeScript。

## 本地运行

需要 Node.js 20.9 或更新版本（本环境已验证 Node.js 24）。

```bash
npm ci --cache /tmp/portfolio-npm-cache
npm run dev
```

开发端口默认 3000。生产构建与运行：

```bash
npm run build
npm run start
```

类型检查：`npm run typecheck`。

## 编辑内容

修改 `content/site.ts`，集中配置姓名、简介、作品名称与介绍、图片路径、Journal、邮箱与社交主页。邮箱留空时显示“联系方式待填写”，不生成无效发送链接。

图片放入 `public/images/` 后更新对应路径。当前图片为明确标注的自然氛围占位，非项目现场、非设计师原创摄影；来源见 `public/images/CREDITS.md`。当前姓名、简介、所在地、联系方式、项目资料及 Journal 记录均需用真实资料替换；不包含虚构项目年份、地点或成果。

## 页面与体验

- `/`：Hero、Philosophy、Selected Works、Journal、Contact
- `/about`、`/works`、`/journal`、`/contact`
- `/works/yunting`、`/works/zhucaotang`：作品详情
- 无效路由显示 404

支持桌面与移动端、移动导航、键盘焦点、跳至内容链接，以及系统 reduced-motion 偏好。图片存于本地，运行不依赖外部图片服务或字体服务。无需环境变量或外部服务。
