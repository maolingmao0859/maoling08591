export function cmsEnabled(){return !process.env.CMS_REMOTE_URL&&process.env.CMS_ENABLED==='true'&&(process.env.PAYLOAD_SECRET?.length||0)>=32}
export function remoteCMS(){return (process.env.CMS_REMOTE_URL||'').replace(/\/$/,'')}
