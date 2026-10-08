import config from '@payload-config';
import {getPayload} from 'payload';
import {RootPage,generatePageMetadata} from '@payloadcms/next/views';
import {importMap} from '../importMap';
type Props={params:Promise<{segments:string[]}>;searchParams:Promise<{[key:string]:string|string[]}>};
export const generateMetadata=({params,searchParams}:Props)=>generatePageMetadata({config,params,searchParams});
export default async function Page({params,searchParams}:Props){const cms=await getPayload({config});const {totalDocs}=await cms.count({collection:'users'});if(totalDocs===0)return <main style={{padding:'60px',maxWidth:'700px',margin:'auto'}}><h1>MR.CAT 后台尚未初始化</h1><p>本站不开放管理员注册。请让站点负责人在服务器上运行管理员初始化命令，再使用自己的邮箱和密码登录。</p><p>内容与原网站已保留，普通访客无法创建管理员账号。</p></main>;return RootPage({config,params,searchParams,importMap})}
