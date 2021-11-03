const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getMusicLink = function (name, type, page) {
  wx.showToast({
    title: "加载中...",
    icon: "loading",
    duration: 30000
  });
  return new Promise((resolve, reject) => {
    wx.request({ // 发送请求
      url: "https://music.liuzhijin.cn/", // 请求的url
      method: 'POST',
      header: {
        'Host': 'music.liuzhijin.cn',
        'Connection': 'keep-alive',
        // 后端会校验这个长度，直接注释掉即可
        // 'Content-Length': 71,
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://music.liuzhijin.cn',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        // 微信小程序中 header 中不能设置 Referer
        // 'Referer': 'https://music.liuzhijin.cn/?name=%E6%B8%85%E7%99%BD%E4%B9%8B%E5%B9%B4&type=migu',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'Hm_lvt_50027a9c88cdde04a70f5272a88a10fa=1628269559,1628336187; Hm_lpvt_50027a9c88cdde04a70f5272a88a10fa=1628343334'
      },
      data: {
        input: name,
        filter: 'name',
        type: type,
        page: page
      },
      success: (res) => { // 请求成功的回调函数
        // console.log(res); // 请求的成功的数据对象，注意是封装后的对象
        resolve(res.data);
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // 隐藏提示加载信息
        wx.hideToast();
      }
    })
  })
}

const movieList = function (name) {
  wx.showToast({
    title: "加载中...",
    icon: "loading",
    duration: 30000
  });
  return new Promise((resolve, reject) => {
    wx.request({ // 发送请求
      url: "https://v.qq.com/x/search/?q=" + name + "&stag=102&smartbox_ab=", // 请求的url
      success: (res) => {
        resolve(res.data);
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // 隐藏提示加载信息
        wx.hideToast();
      }
    })
  })
}

const parseTencentVHtml = function (data) {
  var regStart = /result_item_v/g;
  var regStop = /_playlist/g;
  var regStart1 = /_cur_playsrc"/g;
  var resultList = [];

  do {
    var regStartResult = regStart.exec(data);
    var regStopResult = regStop.exec(data);

    if (regStartResult == null || regStopResult == null) {
      break;
    } else {
      let str = data.slice(regStartResult.index, regStopResult.index);
      let result = parseInfo(str)

      // 解析原始视频来源
      let data_orignalName = data.replace(/\s/g, "");
      var regStart1Result = regStart1.exec(data_orignalName);
      var regStop1Result = regStart1Result.index + 200;
      let str_orignalName = data_orignalName.slice(regStart1Result.index, regStop1Result);
      otherParse(result, str_orignalName);

      resultList.push(result);
    }

  } while (true);

  return resultList;
}

function parseInfo(str) {
  let result = {}

  str = str.replace(/\s/g, "");
  //解析_infos 中的 title  figure_pic figureCaption sub type result_score
  let result_item_v_index = str.search(/result_item_v/g);
  let c_video_normal_index = str.search(/c-video-normal/g);
  let dataSlice1 = str.slice(result_item_v_index, c_video_normal_index);
  let data_id_index = dataSlice1.search(/data-id/g)
  let r_component_index = dataSlice1.search(/r-component/g)
  let id = dataSlice1.slice(data_id_index + 9, r_component_index - 1);
  result.id = id;

  // 解析infos
  let result_info_index = str.search(/result_info/g);
  let r_component2result_info = str.slice(c_video_normal_index, result_info_index);

  // 标题
  let title_index_1 = r_component2result_info.search(/title/g);
  let titleData = r_component2result_info.slice(title_index_1, result_info_index)
  let title_index = titleData.search(/title/g);
  let title_stop_index = titleData.search(/;/g);
  let title = titleData.slice(title_index + 7, title_stop_index - 1)
  result.title = title;

  // 大图
  let fugure_pic_index = r_component2result_info.search(/figure_pic/g);
  let r_imgerr_index = r_component2result_info.search(/r-imgerr/g);
  let figurePic = "https:" + r_component2result_info.slice(fugure_pic_index + 16, r_imgerr_index - 1)
  result.figurePic = figurePic;

  // 备份链接
  let infoIndex = r_component2result_info.search(/_infos/g);
  let imageLinkContent = r_component2result_info.slice(infoIndex, fugure_pic_index);
  let backStartIndex = imageLinkContent.search(/<a/g);
  let backStopIndex = imageLinkContent.search(/figure/g);
  let backupLink = imageLinkContent.slice(backStartIndex + 8, backStopIndex - 8);
  result.backupLink = backupLink;

  // 更新到多少集
  let figure_info_index = r_component2result_info.search(/figure_info/g);
  let sub_index = r_component2result_info.search(/sub/g);
  let figure_caption_c = r_component2result_info.slice(figure_info_index, sub_index)
  let sindex = figure_caption_c.search(/>/g);
  let s1index = figure_caption_c.search(/</g);
  let figureCaption = figure_caption_c.slice(sindex + 1, s1index)
  result.figureCaption = figureCaption;

  // (普通话/原版/2021)
  let subLastContent = r_component2result_info.slice(sub_index, result_info_index)
  let span_index = subLastContent.search(/span/g);
  let sub_index_1 = subLastContent.search(/sub/g);
  let sub = subLastContent.slice(sub_index_1 + '<!---->'.length + 5, span_index - '<!---->'.length - 2)
  result.sub = sub

  // 电视剧还是电影
  let type_index = subLastContent.search(/type/g);
  let typeLastContent = subLastContent.slice(type_index)
  let typeStartIndex = typeLastContent.search(/>/g);
  let typeStopIndex = typeLastContent.search(/</g)
  let type = typeLastContent.slice(typeStartIndex + 1, typeStopIndex);
  result.type = type

  // 评分
  let result_score_index = typeLastContent.search(/result_score/g);
  if (result_score_index != 0) {
    let result_score_content = typeLastContent.slice(result_score_index);
    let scoreStartIndex = result_score_content.search(/>/g);
    let scoreStopIndex = result_score_content.search(/</g)
    let score = result_score_content.slice(scoreStartIndex + 1, scoreStopIndex);
    result.score = score
  }

  // 如果都存在，则解析desc_text
  let _playlist_index = str.search(/_playlist/g);
  let _playListContent = str.slice(result_info_index, _playlist_index);

  // 描述
  let desc_text_index = _playListContent.search(/desc_text/g)
  let desc_text_content = _playListContent.slice(desc_text_index)
  let descStopIndex = desc_text_content.search(/</g)
  let descStartIndex = desc_text_content.search(/>/g)
  let desc = desc_text_content.slice(descStartIndex + 1, descStopIndex)
  result.desc = desc

  // 站点拼音
  let siteContent = str.slice(result_item_v_index, _playlist_index);
  let siteStartIndex = siteContent.search(/site_id/g);
  let siteContent_ = siteContent.slice(siteStartIndex);
  let siteStopIndex = siteContent_.search(/&/g);
  let site = siteContent_.slice(8, siteStopIndex);
  result.site = site;

  return result;
}

function otherParse(result, str) {
  // 原始视频来源中文名
  let nameStartIndex = str.search(/icon_text/g);
  let nameStopIndex = str.search(/<\/span/g);
  let originName = str.slice(nameStartIndex + 17, nameStopIndex);

  result.originName = originName;
  // 原始视频来源图标
  let originImageStartIndex = str.search(/_cur_playsrc_img/g);
  let originImage = str.slice(originImageStartIndex + 22, nameStartIndex - 14)
  result.originImage = originImage

  // result.originImage = originImage;
  // 腾讯 qq
  // 爱奇艺：qiyi
  // 芒果 hunantv
  // 咪咕 migu
  // 优酷 youku

  // 视频列表内容
  // let playListStartIndex = data.search(/_playlist/g)
  // let playListStopIndex = data.search(/tip_download/g)
  // let playListContent = data.slice(playListStartIndex, playListStopIndex)
  // id 有些搜索没有
  // let idIndex = playListContent.search(/id/g);
  // let idContent = playListContent.slice(idIndex)
  // let gapIndex = idContent.search(/;/g)
  // let dataId = idContent.slice(4, gapIndex - 1);
  // result.dataId = dataId;
  // dataType 有些搜索没有
  // let dataTypeIndex = playListContent.search(/dataType/g)
  // let dataTypeContent = playListContent.slice(dataTypeIndex)
  // gapIndex = dataTypeContent.search(/;/g)
  // let dataType = dataTypeContent.slice(10, gapIndex - 1);
  // result.dataType = dataType;
  // site 有些搜索没有 来源根据来源名字映射
  // let siteIndex = playListContent.search(/site/g)
  // let siteContent = playListContent.slice(siteIndex)
  // gapIndex = siteContent.search(/;/g)
  // let site = siteContent.slice(6, gapIndex - 1);
  // result.site = site;



  return result;
}

const getTencentMovieData = function (id, site) {
  wx.showToast({
    title: "加载中...",
    icon: "loading",
    duration: 30000
  });
  return new Promise((resolve, reject) => {
    wx.request({ // 发送请求
      url: "https://pbaccess.video.qq.com/trpc.videosearch.search_cgi.http/load_playsource_list_info?pageNum=0&id=" + id + "&dataType=2&pageContext=need_async%3Dtrue&scene=2&platform=2&appId=10718&site=" + site,
      // url: "https://s.video.qq.com/get_playsource?id=" + id + "&plat=2&type=4&data_type=2&video_type=3&range=1-23&plname=qq&otype=json&num_mod_cnt=20&callback=_jsonp_2_9fb6&_t=1595406976612",
      success: (res) => {
        // 去掉头_jsonp_2_9fb6( 和尾)
        resolve(res.data);
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // // 隐藏提示加载信息
        wx.hideToast();
      }
    })
  })
}

function intToByte(i) {
  var b = i & 0xFF;
  var c = 0;
  if (b >= 128) {
    c = b % 128;
    c = -1 * (128 - c);
  } else {
    c = b;
  }
  return c;
}

const decodeURI = function (s) {
  let needToChange = false;
  let numChars = s.length;

  let i = 0;
  let sb = '';

  let c;
  let bytes = [];

  while (i < numChars) {
    c = s.charAt(i);
    switch (c) {
      case '+':
        sb += " "
        i++;
        needToChange = true;
        break;
      case '%':
        try {
          let pos = 0;

          while (((i + 2) < numChars) && (c == '%')) {
            let subs = s.substr(i + 1, 2)
            let v = parseInt(subs, 16);
            if (v < 0)
              throw "URLDecoder: Illegal hex characters in escape (%) pattern - negative value"
            bytes[pos++] = intToByte(v);
            i += 3;
            if (i < numChars)
              c = s.charAt(i);
          }

          if ((i < numChars) && (c == '%'))
            throw "URLDecoder: Incomplete trailing escape (%) pattern";

          for (var x = 0; x < pos; x++) {
            sb += String.fromCharCode(bytes[x]);
          }

        } catch (err) {
          console.log(err)
        }

        needToChange = true;
        break;
      default:
        sb += c;
        i++;
        break;
    }
  }
  return (needToChange ? sb : s);
}
const parseURI = function (uri) {
  let decodeUri = decodeURI(uri);

  let result = /redirect/g.exec(decodeUri);
  let result2 = /url/g.exec(decodeUri);
  if (result != null && result.index > 0 && result2 != null && result2.index > 0) {
    return decodeUri.slice(result2.index + 4);
  } else {
    return decodeUri;
  }
}

module.exports = {
  formatTime,
  getMusicLink,
  movieList,
  parseTencentVHtml,
  getTencentMovieData,
  decodeURI,
  parseURI
}