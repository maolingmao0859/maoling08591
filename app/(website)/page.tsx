import {getSite} from '@/lib/content';
import HomeContent from '@/components/home-content';
export const dynamic='force-dynamic';
export default async function Home(){return <HomeContent site={await getSite()}/>};
