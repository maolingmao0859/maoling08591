import '@payloadcms/next/css';
import config from '@payload-config';
import {RootLayout,handleServerFunctions} from '@payloadcms/next/layouts';
import type {ServerFunctionClient} from 'payload';
import {notFound,redirect} from 'next/navigation';
import {cmsEnabled,remoteCMS} from '@/lib/cms-enabled';
import {importMap} from './admin/importMap';
const serverFunction:ServerFunctionClient=async args=>{'use server';if(!cmsEnabled())throw new Error('CMS 未启用');return handleServerFunctions({...args,config,importMap})};
export default function Layout({children}:{children:React.ReactNode}){if(remoteCMS())redirect(`${remoteCMS()}/admin`);if(!cmsEnabled())notFound();return RootLayout({children,config,importMap,serverFunction})}
