import { withPayload } from '@payloadcms/next/withPayload';
import type {NextConfig} from 'next';
const remote=process.env.CMS_REMOTE_URL?new URL(process.env.CMS_REMOTE_URL):null;
const nextConfig:NextConfig={images:{formats:['image/avif','image/webp'],remotePatterns:remote?[{protocol:remote.protocol==='https:'?'https':'http',hostname:remote.hostname,port:remote.port,pathname:'/api/media/file/**'}]:[]}};
export default withPayload(nextConfig);
