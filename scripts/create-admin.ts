import {createInterface} from 'node:readline/promises';
import {stdin,stdout} from 'node:process';
import {getPayload} from 'payload';
import config from '../payload.config';
import {cmsEnabled} from '../lib/cms-enabled';
if(!cmsEnabled())throw new Error('请先配置 CMS_ENABLED=true、至少 32 字符的 PAYLOAD_SECRET，且不要设置 CMS_REMOTE_URL。');
const rl=createInterface({input:stdin,output:stdout});
const email=(process.env.CMS_ADMIN_EMAIL||await rl.question('管理员邮箱：')).trim();
rl.close();
async function passwordPrompt():Promise<string>{if(process.env.CMS_ADMIN_PASSWORD)return process.env.CMS_ADMIN_PASSWORD;if(!stdin.isTTY)throw new Error('请在交互终端运行，或安全配置 CMS_ADMIN_PASSWORD。');stdout.write('管理员密码（不显示输入）：');stdin.setRawMode(true);stdin.resume();return new Promise((resolve,reject)=>{let value='';const onData=(chunk:Buffer)=>{for(const c of chunk.toString()){if(c==='\r'||c==='\n'){stdin.off('data',onData);stdin.setRawMode(false);stdin.pause();stdout.write('\n');resolve(value);return}if(c==='\u0003'){stdin.off('data',onData);stdin.setRawMode(false);stdin.pause();reject(new Error('已取消'));return}if(c==='\u007f')value=value.slice(0,-1);else value+=c}};stdin.on('data',onData)})}
const password=await passwordPrompt();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<12)throw new Error('请输入有效邮箱，以及至少 12 位的密码。');
const cms=await getPayload({config});
try{const existing=await cms.find({collection:'users',where:{email:{equals:email}},limit:1});if(existing.docs.length){if(!process.argv.includes('--reset'))throw new Error('该账号已存在；重置密码请运行 npm run cms:admin -- --reset。');await cms.update({collection:'users',id:existing.docs[0].id,data:{password}});console.log('管理员密码已重置。')}else{await cms.create({collection:'users',context:{cmsBootstrap:true},data:{email,password,name:'网站管理员'}});console.log('管理员已创建。请打开 /admin 登录；密码不会记录到日志。')}}finally{await cms.destroy()}
