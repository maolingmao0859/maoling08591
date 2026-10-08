import config from '@payload-config';
import {REST_GET,REST_POST,REST_DELETE,REST_PATCH,REST_PUT,REST_OPTIONS} from '@payloadcms/next/routes';
import {cmsEnabled} from '@/lib/cms-enabled';
export const dynamic='force-dynamic';
function guard(handler:ReturnType<typeof REST_GET>){return async (...args:Parameters<typeof handler>)=>cmsEnabled()?handler(...args):Response.json({error:'CMS 尚未配置'},{status:503})}
export const GET=guard(REST_GET(config));
export const POST=guard(REST_POST(config));
export const DELETE=guard(REST_DELETE(config));
export const PATCH=guard(REST_PATCH(config));
export const PUT=guard(REST_PUT(config));
export const OPTIONS=guard(REST_OPTIONS(config));
