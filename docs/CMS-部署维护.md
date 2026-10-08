# CMS 部署与维护（交给网站负责人）

采用 Payload 3.90.2 和官方 SQLite 适配器。Next.js 调整为 Payload 当前支持的 15.4.11，保留 React、Tailwind 与 Framer Motion。现有公开 URL 不变；后台路由为 /admin、REST 为 /api。

## 两种部署方式

### A. 自有服务器部署整站（内地迁移可选此方式）

单实例运行 Next.js 与 Payload，数据库和上传目录使用持久磁盘。建议起步使用有足够内存进行构建的 Linux 主机，不把运行时数据写入临时容器或 release 目录。内地使用域名通常需要备案。软件没有许可证费用；服务器、备份与流量费用由选用服务决定。

1. Node.js >=20.9（开发验证 Node.js 24），执行 `npm ci`。
2. 根据 `.env.example` 设置环境：`CMS_ENABLED=true`、至少 32 字符的独立随机 `PAYLOAD_SECRET`、绝对 `DATABASE_URI=file:/.../content.db`、`CMS_STORAGE_DIR`、HTTPS 的 `CMS_SERVER_URL`。密钥须固定保存，不要每次部署重新生成。
3. 创建数据目录并限制操作系统权限，确保服务账号可写。生产保持 `CMS_ALLOW_SCHEMA_PUSH=false`。
4. 新空数据库先 `NODE_ENV=production npm run cms:migrate`，再 `NODE_ENV=production npm run cms:seed`。导入脚本保留已有内容；不是重置数据库。
5. 在交互终端运行 `NODE_ENV=production npm run cms:admin`，填写真实管理员邮箱和至少 12 位密码；密码输入不回显。也可通过安全进程环境传入 CMS_ADMIN_EMAIL/CMS_ADMIN_PASSWORD，但不要写入代码、命令历史或公开日志。不要把环境配置里的密钥当成登录密码。
6. `npm run build` 后 `npm run start`；使用进程管理与 HTTPS 反向代理，保留 Cookie 和上传请求。将请求体上限与 50 MB 上传限制匹配。
7. 验证登录、上传、草稿预览、发布、退出登录和公开作品页。

开发可将 `CMS_ALLOW_SCHEMA_PUSH=true` 后 `npm run cms:seed`；不应用此模式维护生产数据库。schema 变更需创建、审阅迁移文件，再部署应用；应用、数据和媒体应一起备份。

### B. Vercel 前台 + 独立后台（保留现有 Vercel）

后台按 A 部署，可用子域名。Vercel 项目设置 `CMS_ENABLED=false`，设置 `CMS_REMOTE_URL=https://后台域名`，重新构建前台。不需要给 Vercel 提供数据库口令或管理员密码，前台只读取公开已发布内容。

Vercel 的 /admin 会跳转到后台，草稿预览在后台域名完成；前台图片来自后台并由 Next Image 优化。图片域名由 CMS_REMOTE_URL 在构建时加入允许列表，因此改后台地址需重新部署前台。后台必须保持在线；不可将后台数据库或上传文件放在 Vercel 临时文件系统。

不要把「在 Vercel 构建成功」误认为后台持久存储已经部署。当前任务仅完成本地实现，不创建服务器或付费账号，不改生产环境。

## 迁移与备份

SQLite 适合当前小型单管理员作品集与单实例后台。不要让多个服务器同时写同一数据库文件。访问规模扩大、多个编辑或多实例时可另行迁移至 Payload 支持的 PostgreSQL，而不是复制同一个 SQLite 文件到多台服务。

定期备份数据库、上传目录、密钥及环境配置。最简单的可靠方式是在维护窗口停止后台，复制数据库（包括存在的 WAL/SHM 侧文件）和全部上传文件，确认备份完成后再启动。上传文件不要仅靠 GitHub；它们是运行时数据。更新前先备份，并在独立环境验证还原。

迁移服务器时保留稳定 URL 或配置新媒体域名；复制持久数据，安装相同锁文件版本，再验证。不要先执行迁移回滚或重置命令来“修复”线上数据。

## 测试

- `npm run build`、`npm run typecheck`。
- 生产迁移已在新的独立测试库验证；权限、匿名注册拒绝、草稿隔离、发布无需重建、上传与排序均有测试。
- `tests/cms.ts` 仅允许本地 production-test 数据库，防止误测线上内容。先迁移、导入独立 `.cms/production-test.db`，用相同 DATABASE_URI 在 3010 启动服务，然后执行 `NODE_ENV=production DATABASE_URI=file:/绝对项目路径/.cms/production-test.db CMS_ALLOW_SCHEMA_PUSH=false npm run cms:test`。测试临时会话存在忽略目录；完成浏览器测试后运行同样环境的 `npm run cms:test:cleanup`。
- 手动检查桌面/手机、管理员图片替换、详情图拖动、预览按钮、发布按钮和退出登录后的权限。

## 安全边界

初始管理员只通过服务器命令创建；公开 first-register 接口也受 hook 拦截。创建/修改/删除及历史版本仅管理员可访问，访客只读取发布内容。管理员登录有失败锁定，HTTPS 环境 Cookie 为 secure；未启用 CMS 或未配置足够长度的密钥时 API 写入口关闭。媒体文件为公开网站素材；草稿不应上传涉及隐私的附件。

当前未配置 SMTP，密码重置邮件明确关闭，避免假装邮件已经发送。负责人可运行 `npm run cms:admin:reset`，在服务器重置指定已有账号的密码。未来要开邮件服务应作为单独配置任务，不要求用户在聊天提供密钥。
