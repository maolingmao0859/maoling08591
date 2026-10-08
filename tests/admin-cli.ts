import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {getPayload} from 'payload';
import config from '../payload.config';
if(!process.env.DATABASE_URI?.includes('production-test'))throw new Error('仅限独立测试库。');
const email=`cli-check-${Date.now()}@example.invalid`,password=randomBytes(24).toString('hex'),nextPassword=randomBytes(24).toString('hex');
const cms=await getPayload({config});let id:number|undefined;
try{const created=spawnSync('npm',['run','cms:admin'],{env:{...process.env,CMS_ADMIN_EMAIL:email,CMS_ADMIN_PASSWORD:password},encoding:'utf8'});assert.equal(created.status,0,'初始化命令失败');const user=await cms.login({collection:'users',data:{email,password}});id=user.user.id;const reset=spawnSync('npm',['run','cms:admin','--','--reset'],{env:{...process.env,CMS_ADMIN_EMAIL:email,CMS_ADMIN_PASSWORD:nextPassword},encoding:'utf8'});assert.equal(reset.status,0,'重置命令失败');await cms.login({collection:'users',data:{email,password:nextPassword}});console.log('PASS administrator initialization and password reset commands')}finally{if(id)await cms.delete({collection:'users',id});await cms.destroy()}
