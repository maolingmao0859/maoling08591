import {readFile,unlink} from 'node:fs/promises';
import {getPayload} from 'payload';
import config from '../payload.config';
if(!process.env.DATABASE_URI?.includes('production-test'))throw new Error('仅允许清理独立测试库。');
const cms=await getPayload({config});
try{const {adminId,projectId,mediaId}=JSON.parse(await readFile('.cms/test-cleanup.json','utf8'));if(projectId)await cms.delete({collection:'projects',id:projectId});if(mediaId)await cms.delete({collection:'media',id:mediaId});if(adminId)await cms.delete({collection:'users',id:adminId});await unlink('.cms/test-session.json');await unlink('.cms/test-cleanup.json');console.log('临时管理员、作品、上传与凭据文件已清理。')}finally{await cms.destroy()}
