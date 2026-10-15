import journalCover from './assets/journal-lake.jpg'

export { journalCover }

// 原生预览使用网络原图，正文仍使用随包缩略图，避免包内路径的跨端差异。
const journalOriginal = 'https://images.unsplash.com/photo-1536686984648-9bcaa70abf45?auto=format&fit=crop&w=2400&h=1500&q=90'

/** 所有文章排版都由富文本自身的 HTML 与样式映射实现。 */
export const journalStyles: Record<string, string> = {
  'journal-kicker': 'font-size:11px;letter-spacing:2px;color:var(--wot-success-main);margin:0 0 14px;',
  'journal-title': 'font-size:36px;line-height:1.25;font-weight:bold;letter-spacing:1px;margin:0 0 16px;',
  'journal-deck': 'font-size:15px;line-height:1.9;color:var(--wot-text-secondary);margin:0 0 20px;',
  'journal-caption': 'font-size:11px;line-height:1.7;color:var(--wot-text-secondary);text-align:left;margin:8px 0 24px;',
  'journal-heading': 'font-size:18px;line-height:1.5;margin:24px 0 12px;',
  'journal-quote': 'font-size:19px;line-height:1.8;border-color:var(--wot-success-main);border-width:0 0 0 2px;padding-left:16px;margin:24px 0;',
  'journal-note': 'font-size:12px;color:var(--wot-text-secondary);margin:20px 0 0;',
  'journal-highlight': 'background-color:var(--wot-success-surface);color:var(--wot-success-main);padding:0 4px;'
}

export const articleContent = `
<p class="journal-kicker">WEEKEND JOURNAL &nbsp; / &nbsp; VOL. 01</p>
<h1 class="journal-title">周末出走<br>山野手记</h1>
<p class="journal-deck">关掉闹钟，沿着林间小路走一段。<br>在湖水与群山之间，找回生活的留白。</p>
<img src="${journalCover}" original-src="${journalOriginal}" alt="山峰与森林环抱的蓝色湖泊" width="100%">
<p class="journal-caption">01 / 山湖之间，风有了形状。<br>摄影 Will Truettner · Unsplash</p>
<p>清晨的光越过山脊，落在安静的湖面上。我们沿着岸边慢慢走，听松针在脚下轻响，也听远处的鸟鸣。这里没有必须抵达的终点，<strong>走慢一点，本身就是这趟旅程的意义。</strong></p>
<blockquote class="journal-quote">把周末留给山野，<br>把时间还给自己。</blockquote>
<p>在树荫下坐一会儿，把热茶倒进杯子。水面映着流动的云，风带来草木的气息。<em>不必安排得太满</em>，一次停留、一张照片，都值得被认真收藏。</p>
<h2 class="journal-heading">出发前，装好这三样</h2>
<ul><li>一双舒适的鞋，陪你走过林间小径。</li><li>饮水与轻食，让途中每次休息都有期待。</li><li>一个随身袋，<mark class="journal-highlight">把美好留下，把垃圾带走。</mark></li></ul>
<h2 class="journal-heading">给一天留一点余地</h2>
<table><tr><th>时刻</th><th>小小安排</th></tr><tr><td>09:00</td><td>沿湖慢走，寻找第一束光</td></tr><tr><td>12:00</td><td>树下野餐，分享一杯热茶</td></tr><tr><td>16:00</td><td>带着风的记忆，慢慢返程</td></tr></table>
<p class="journal-note">下一次见面，也许就在另一片山野。<br><a href="/journal/gear">阅读行前准备清单 →</a></p>`

export const noticeContent = '<p><strong>周末来信</strong></p><p>本周的计划很简单：去户外走走，让眼睛看看远处。</p>'
export const updatedNoticeContent = '<p><strong>计划已更新</strong></p><p>出发时间改为周六上午九点。别忘了带上水和一件轻外套。</p>'
export const linkContent =
  '<p>一次轻装出行，从一份简单的<a href="/journal/gear">行前准备清单</a>开始。沿途看到喜欢的风景，也记得<a href="/journal/share">分享给同行的人</a>。</p>'
export const previewContent = `<img original-src="${journalOriginal}" src="${journalCover}" alt="点击查看山湖大图" width="100%"><p class="journal-note">轻触照片，看看远处的山。</p>`
export const failedImageContent = '<img src="" alt="这张照片暂时无法加载" width="100%" height="80">'
export const customImageContent = `<a href="/journal/story"><img src="${journalCover}" alt="阅读山野手记" width="100%"></a>`

export const invitationStyles: Record<string, string> = {
  'invitation-label': 'font-size:11px;letter-spacing:3px;color:var(--wot-success-main);margin:0 0 16px;',
  'invitation-title': 'font-size:28px;font-weight:bold;line-height:1.5;margin:0 0 16px;',
  'invitation-note': 'font-size:13px;color:var(--wot-text-secondary);line-height:2;margin:16px 0;'
}
export const invitationContent =
  '<p class="invitation-label">YOU ARE INVITED</p><h2 class="invitation-title">一起，去见山</h2><p>把一整个下午<br>交给阳光、草地和好朋友。</p><hr><p class="invitation-note">周六 09:00 · 湖畔步道入口<br>轻装出发，自带一份好心情。</p><p><a href="/journal/join">收下这份邀请 →</a></p>'
export const themeContent =
  '<h3>山野里的晚安</h3><p>天色慢慢暗下来，最后一束光落在山尖。<strong>愿你今晚，也有一个好梦。</strong></p><p><a href="/journal/story">再读一段旅途故事 →</a></p>'
export const listContent =
  '<ol><li>沿湖出发，先让脚步慢下来。</li><li>找一处树荫，打开野餐篮。<ul><li>分享水果与面包</li><li>收好包装，不留下痕迹</li></ul></li><li>在日落前返程，留一点期待给下次。</li></ol>'
export const tableContent =
  '<table style="width:560px"><tr><th>时间</th><th>地点</th><th>安排</th><th>随身物品</th></tr><tr><td>09:00</td><td>湖畔步道</td><td>慢走与拍照</td><td>水、轻便外套</td></tr><tr><td>12:00</td><td>林间草地</td><td>野餐与阅读</td><td>野餐垫、一本书</td></tr><tr><td>16:00</td><td>步道入口</td><td>集合返程</td><td>随身垃圾袋</td></tr></table>'
export const mergedTableContent =
  '<table><colgroup><col width="20%"><col width="25%"><col width="55%"></colgroup><tr><th>行程</th><th colspan="2">周末慢游计划</th></tr><tr><td rowspan="2">上午</td><td>09:00</td><td>湖畔集合</td></tr><tr><td>10:00</td><td><a href="/journal/gear">林间轻徒步</a></td></tr><tr><td>下午</td><td>14:00</td><td>草地阅读会</td></tr></table>'

/** 按编辑器正式导出的 HTML 格式编写；真实 API 导出样本另存于 tests/fixtures。 */
export const editorSamples = [
  {
    name: 'Quill',
    note: '字号、衬线字体、段落缩进与任务清单。',
    content:
      '<p class="ql-align-center"><span class="ql-size-large ql-font-serif">给周末，一点留白</span></p><p class="ql-indent-1">沿着湖岸走，把时间交给风。</p><ul><li data-list="checked">收好行囊，带上好心情</li><li data-list="unchecked"><a href="/journal/gear">看看还有什么要准备</a></li></ul>'
  },
  {
    name: 'wangEditor',
    note: '段落对齐、首行缩进、强调与嵌套列表。',
    content:
      '<h3 style="text-align:center">一份轻装出行提案</h3><p style="text-indent:2em">不用走得很远，<strong>附近的山野，也值得认真遇见。</strong></p><ol><li>选一条喜欢的路<ul><li>林间步道 · 湖畔栈道</li></ul></li><li><a href="/journal/gear">带上简单的行前清单</a></li></ol>'
  },
  {
    name: 'TinyMCE',
    note: '图片说明、列宽与表格里的长单词换行。',
    content: `<figure><img src="${journalCover}" alt="湖畔一角" width="100%" height="100"><figcaption>01 / 把风景装进口袋</figcaption></figure><table style="table-layout:fixed"><colgroup><col width="25%"><col width="75%"></colgroup><tr><td>手记</td><td><a href="/journal/story">WeekendJournal_AWalkByTheLake_2026_WeekendEscape</a></td></tr></table>`
  }
]
export const videoContent =
  '<video id="trip-video" title="旅途片段" controls poster="https://images.unsplash.com/photo-1536686984648-9bcaa70abf45?auto=format&fit=crop&w=1200&h=750&q=85" src="https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4"></video>'
export const audioContent =
  '<audio id="reading-audio" title="阅读时，听一段轻音乐" src="https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3"></audio>'

/** 只在用户展开长文时创建内容；不会进入页面的默认渲染树。 */
export function createLongArticle() {
  const chapters = [
    [
      '晨光',
      '出门的时候，街道还没有完全醒来。早餐店的热气升起，我们带上刚买的面包，把一天的时间留给远处的山。',
      '车窗外的楼房渐渐变成田野。每过一个转弯，风景就多一点绿色，心里的事情也少一点。'
    ],
    [
      '入林',
      '步道从一片树林开始。阳光穿过枝叶，在地面留下细碎的光斑。我们不急着赶路，停下来辨认一朵小花。',
      '身旁的朋友讲起小时候的故事。原来走路可以让话题变得很长，也可以让沉默变得很舒服。'
    ],
    [
      '见湖',
      '湖面出现在树木的尽头。远处的山峰倒映在水里，风吹过的时候，整幅画都轻轻动了一下。',
      '我们沿着湖边找到一块平整的石头，放下背包坐了很久。没有人看时间，也没有人催促下一站。'
    ],
    [
      '午后',
      '午餐是面包、水果和一壶热茶。简单的食物，因为眼前的景色，变成了一顿值得记住的饭。',
      '读了几页书，又把书合上。耳边的风和水声，比任何背景音乐都适合这个下午。'
    ],
    [
      '拾光',
      '回程时，光线变得柔和。我们拍下水边的草、树上的影子，还有彼此被风吹乱的头发。',
      '照片未必能留下所有感觉，但以后翻到这一页，一定会想起今天的温度和空气。'
    ],
    [
      '归途',
      '离开之前，我们检查了一遍休息过的地方。带来的东西都带走，草地仍然是刚到时的样子。',
      '在车上有一句没一句地聊天，看夕阳慢慢落下。周末没有变长，但这一天，过得很充实。'
    ]
  ]
  return (
    '<p class="journal-kicker">THE FULL STORY / 完整手记</p><h2>沿着湖岸，慢慢走</h2>' +
    chapters
      .map(
        ([title, first, second], index) =>
          `<h3 id="chapter-${index + 1}" class="journal-heading">0${index + 1} / ${title}</h3><p>${first}</p><p>${second}</p>`
      )
      .join('') +
    '<blockquote class="journal-quote">下次出发，不必等很久。</blockquote><p><a href="#chapter-1">回到晨光，再读一次 →</a></p>'
  )
}
