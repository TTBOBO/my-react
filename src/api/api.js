const REQUEST = {
  login: 'api/login/login',  //登录接口
  industry: 'api/common/industry',   //
  city: 'api/common/city',    //城市
  register: 'api/register/reg',
  register1: 'api/register/user_perfect',
  userInfo: 'api/user/user_info',  //获取用户信息
  sendMsg: 'api/common/send_msg',  //发送验证码
  userType: 'api/register/user_type',  //设置用户类型
  all_money: 'api/Analysis/all_money',   //广告投入总额
  ranking: 'api/index/ranking',        //排名榜
  bannerList: 'api/User/banner_list',     //轮播图
  label: 'api/banner/tab',
  bannerListAd: 'api/banner/lists',      //首页广告
  forgot_psw: 'api/login/forgot_psw',    //找回密码
  folderList: 'api/folder/lists',         //文件夹
  fbannerList: '/api/folder/banner_list',  //文件夹详情
  folderDel: 'api/folder/folder_del',     //文件夹删除
  bannerDel: 'api/banner/banner_del',
  promote: 'api/index/promote',     //我的推广列表
  promoteDetail: 'api/index/promote_detail',
  analysisList: 'api/banner/analysis_list',       //数据分析列表
  analysisDetail: 'api/banner/analysis_detail',       //数据分析列表详情
  earn: 'api/user/earn',            //我的钱包
  timeMoney: 'api/Analysis/time_money',         //个人中心  数据分析
  timeclick: 'api/Analysis/click',          //个人中心  数据分析
  edit_psw: 'api/user/edit_psw',          //账户设置
  message_list: 'api/banner/message_list',   //客户管理
  message_edit: 'api/banner/message_edit',   //客户管理编辑
  message_detail: 'api/banner/message_detail',  // 客户管理详情
  indexClick: 'api/analysis/index_click_get', // 首页 有效点击数
  indexClickZ: 'api/analysis/index_click',      //首页 总数
  indexPeople: 'api/analysis/index_people',    //首页传播数
  orderList: 'api/Analysis/index_banner_list',   //首页排名
  verify: 'api/user/verify',            //身份认证
  banner_add: 'api/banner/erji_banner_add',   //添加二级页
  indexAnalysis: 'api/Analysis/index_analysis',  //首页登录折线图
  bannerNameEdit: 'api/banner/banner_name_edit',  //修改文件夹名称
  bankList: 'api/user/bank_list',     //银行列表
  validatePsw: 'api/user/validate_psw',       //提现密码验证
  bank_add_one: 'api/user/bank_add_one',       //添加银行卡第一步
  bank_add_two: 'api/user/bank_add_two',        //添加银行卡第二步
  userRegister: 'api/user/finance',           //提现
  all_bank_list: 'api/user/all_bank_list',       //开户行列表
  delCard: 'api/user/bank_del',
  folder_status: 'api/banner/folder_status',   //修改文件夹状态
  Wxpay: 'api/Wxpay/index',                  //微信支付
  payStatus: 'api/Wxpay/order_time_conditions',  //查看支付成功状态
  upload_index_img: 'api/folder/upload_index_img',   //裁剪传图片
  qrcode: 'api/Qrcode/qrcode',
  index_fx: 'api/index/index_fx',
  yue_list: 'api/user/yue_list',    //充值提现记录
  makeAdSave: 'api/banner/banner_one',    //自制广告保存
  yue_list: 'api/user/yue_list',    //充值提现记录
  qrcode: '/api/Qrcode/qrcode',
  getTag: 'api/banner/tab',    //获取标签列表
  banner_two: 'api/banner/banner_two',       //添加创意广告
  tab_attr: 'api/banner/tab_attr',     //获取标签属性
  banner_detail: 'api/banner/banner_detail',    //获取广告详情（仅修改）
  balance: 'api/user/balance',       //用户收入余额
  creative_add: 'api/banner/creative_add',       //添加创意广告
  ad_rules: '/api/banner/ad_rules',   //获取规则
  banner_status_content: '/api/banner/banner_status_content',  //失败原因
  banner_charge: 'api/Banner/banner_charge',
  base64_upload: 'api/common/base_img',   //base64图片上传
  folder_img: 'api/banner/folder_img',   //上传新问题
  bc_all_money:"api/index/banner_lcb",  //广告投入总额
  banner_lcb: 'api/index/index_lcb', //币池总额
  float_ad:'api/banner/float_add',//添加/修改 悬浮广告
  index_list:'api/banner/index_list'//所有广告首页列表
}

export default REQUEST;
