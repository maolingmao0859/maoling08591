// 编辑入口：空图片路径显示占位，不使用网络肖像；项目状态以真实资料为准。
export const site = {
  brand: 'MR.CAT', name: '个人姓名待填写', englishName: 'Independent Designer',
  title: '在既定之外，寻找可能。', subtitle: 'Exploring Beyond the Ordinary',
  bio: '以空间为起点，向自然与生活延伸。在文旅空间、自然景观、精品民宿与概念设计之间，寻找人与环境相遇的可能。旅行、摄影与音乐，也是持续观察世界的方式。',
  bioNote: '个人简介示例，真实经历与创作背景待补充。',
  email: '', wechat: '', instagram: '', location: '所在地待填写', hero: '/images/lake.jpg',
  navigation: [{href:'/about',label:'About'},{href:'/works',label:'Works'},{href:'/journal',label:'Journal'},{href:'/contact',label:'Contact'}],
  home: {
    hero: {portrait:'',portraitAlt:'MR.CAT 本人全身肖像',portraitNote:'本人全身透明背景照片待提供',disciplines:'Space / Nature / Experience',index:'PORTFOLIO — 01 / 06',scroll:'SCROLL TO DISCOVER'},
    philosophy: {label:'PHILOSOPHY / 设计理念',title:'设计，不应该\n凌驾于自然之上。',text:'从地形、光线与材质出发，让空间成为环境的延续。保留自然的秩序，也保留人的感受；用克制的表达，回应场所本来的力量。',note:'设计理念文案示例，待本人确认。',image:'/images/maple.jpg',imageAlt:'自然叶片与光影氛围示意',imageNote:'自然氛围占位 · 非项目摄影'},
    works: {label:'SELECTED WORKS / 代表作品',title:'Spaces with a sense of place.',link:'查看作品档案',note:'已建成 / 概念设计将根据真实资料分类；当前均未确认。'},
    about: {label:'ABOUT / 关于我',title:'A Designer.\nAn Observer.\nAn Explorer.',image:'',imageAlt:'本人旅行或工作纪实照片',imageNote:'本人旅行 / 工作纪实照片待提供',link:'认识 MR.CAT'},
    journal: {label:'JOURNAL / 日常观察',title:'The art of paying attention.',intro:'旅行、摄影、音乐与思考。让日常成为创作的另一条路径。',link:'进入探索手记'},
    contact: {label:'CONTACT / 合作联系',title:"LET’S CREATE\nSOMETHING\nMEANINGFUL.",intro:'从一次对话开始，探索空间、自然与体验的新可能。',emailLabel:'EMAIL / 邮箱',wechatLabel:'WECHAT / 微信',emailPlaceholder:'真实邮箱待填写',wechatPlaceholder:'真实微信待填写'}
  },
  works: [
    {slug:'yunting',name:'梵之·云汀',english:'Hospitality / Spatial Design',category:'空间设计 / SPACE',status:'项目状态待确认',image:'/images/mountains.jpg',imageNote:'自然氛围占位 · 非项目现场',description:'项目名称由本人提供。是否已建成、项目地点、年份、设计职责与成果均待确认。当前图片为自然氛围示意，不代表项目现场。',material:'空间 / 光线 / 材质'},
    {slug:'zhucaotang',name:'猪槽塘原始河谷',english:'Landscape / Nature Experience',category:'自然文旅 / NATURE',status:'项目状态待确认',image:'/images/lake.jpg',imageNote:'自然氛围占位 · 非项目现场',description:'项目名称由本人提供。建设状态、背景与具体设计内容待补充；当前图片为自然氛围示意，不代表项目现场。',material:'自然 / 地形 / 感知'},
    {slug:'mountain-retreat',name:'山地精品民宿',english:'Boutique Retreat / Concept',category:'概念栏目 / CONCEPT',status:'概念栏目占位 · 待确认',image:'',imageNote:'建筑 / 项目影像待提供',description:'首页代表项目的展示位置，尚未提供真实项目资料；概念方向、正式名称、设计内容与状态均待本人确认，不代表已完成或已建成项目。',material:'待补充'},
  ],
  journal: [
    {id:'travel',label:'旅行 / TRAVEL',title:'沿着风的方向',image:'/images/lake.jpg',text:'旅行记录占位。这里将收录真实的旅途观察、路径与片段。'},
    {id:'photography',label:'摄影 / PHOTOGRAPHY',title:'光落下的瞬间',image:'/images/maple.jpg',text:'摄影记录占位。这里将展示你的原创照片与拍摄手记。'},
    {id:'music',label:'音乐 / MUSIC',title:'日常的另一种频率',image:'',text:'音乐记录占位。这里将分享真实的聆听记录与创作。'},
    {id:'thoughts',label:'思考 / THOUGHTS',title:'留一点空间给未知',image:'',text:'思考记录占位。这里将收录真实的设计观察与文字。'},
  ]
};
