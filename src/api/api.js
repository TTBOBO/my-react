const REQUEST = {
  get_channel:"/api/news/get_channel",
  news:"/api/news",
  sent_msg:"/api/user/sent_msg",
  login:"/api/user/login",
  adetail:'/api/Newsdetail/detail',  //文章详情
  news_rand:'/api/Newsdetail/news_rand',  //文章详情3条随机文字广告
  getAdvertisement:'/api/Newsdetail/getAdvertisement',  //文章详情广告
  acomment:'/api/Newsdetail/comment', //文章详情评论
  groom:"/api/Newsdetail/groom",
  write_comment:'/api/Newsdetail/write_comment',
  channelList:"/api/Videolist/channelList",
  videoList:"/api/Videolist/video",
  videoDetail:'/api/video/videoDetail',
  video_rand:'/api/video/video_rand',
  vcomment: '/api/video/comment',
  vgroom:'/api/video/groom',
  search:'/api/news/search', //搜索文章
  hot_news:'/api/news/hot_news',  //24小时热文
}

export default REQUEST;
