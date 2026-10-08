import {projects} from './projects';
// 编辑入口：空图片路径显示占位，不使用网络肖像；项目状态以真实资料为准。
export const site = {
  brand: 'MR.CAT', name: '个人姓名待填写', englishName: 'Independent Designer / Visual Artist',
  title: '在空间之外，寻找感受。', subtitle: 'Beyond space, toward experience.',
  bio: '我以空间为起点，向自然、体验与影像延伸。长期关注文旅场景、自然环境与人的感受关系。在克制与真实之间，寻找一种更有温度的表达。',
  bioNote: '',
  email: '', wechat: '', instagram: '', location: 'Guizhou, China', hero: '',
  navigation: [{href:'/about',label:'About'},{href:'/works',label:'Works'},{href:'/journal',label:'Journal'},{href:'/contact',label:'Contact'}],
  home: {
    hero: {portrait:'',portraitAlt:'MR.CAT 本人全身肖像',portraitNote:'本人全身透明背景照片待提供',disciplines:'Space / Nature / Experience',index:'PORTFOLIO — 01 / 06',scroll:'SCROLL TO DISCOVER'},
    philosophy: {label:'ABOUT THE PRACTICE',title:'我以空间为起点，\n向自然、体验与影像延伸。',text:'长期关注文旅场景、自然环境与人的感受关系。\n在克制与真实之间，寻找一种更有温度的表达。',english:'Starting from space, extending toward nature, experience and image.',note:'',image:'',imageAlt:'',imageNote:''},
    works: {label:'SELECTED WORKS / 代表作品',title:'Spaces with a sense of place.',link:'查看作品档案',note:'关于空间、自然与体验的持续实践。'},
    about: {label:'ABOUT / 关于我',title:'A Designer.\nAn Observer.\nAn Explorer.',image:'',imageAlt:'本人旅行或工作纪实照片',imageNote:'本人旅行 / 工作纪实照片待提供',link:'认识 MR.CAT'},
    journal: {label:'JOURNAL / 日常观察',title:'The art of paying attention.',intro:'旅行、摄影、音乐与思考。让日常成为创作的另一条路径。',link:'进入探索手记'},
    contact: {label:'CONTACT / 合作联系',title:"LET’S CREATE\nSOMETHING\nMEANINGFUL.",intro:'从一次对话开始，探索空间、自然与体验的新可能。',emailLabel:'EMAIL / 邮箱',wechatLabel:'WECHAT / 微信',emailPlaceholder:'真实邮箱待填写',wechatPlaceholder:'真实微信待填写'}
  },
  works: projects,
  journal: [
    {id:'travel',label:'旅行 / TRAVEL',title:'沿着风的方向',image:'',text:'旅行记录占位。这里将收录真实的旅途观察、路径与片段。'},
    {id:'photography',label:'摄影 / PHOTOGRAPHY',title:'光落下的瞬间',image:'',text:'摄影记录占位。这里将展示你的原创照片与拍摄手记。'},
    {id:'music',label:'音乐 / MUSIC',title:'日常的另一种频率',image:'',text:'音乐记录占位。这里将分享真实的聆听记录与创作。'},
    {id:'thoughts',label:'思考 / THOUGHTS',title:'留一点空间给未知',image:'',text:'思考记录占位。这里将收录真实的设计观察与文字。'},
  ]
};
