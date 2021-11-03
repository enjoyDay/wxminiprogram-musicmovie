// pages/movieDetail/movieDetail.js
const m1907 = require('../../utils/m1907.js');
const util = require('../../utils/util.js');
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData: {}, // m1907获取的数据
    otherMovieParseData: [], // 其他视频解析
    videoUrl: '', // ，默认要播放的地址
    chooseIconIndex: 0, // 要播放的视频渠道 
    chooseChannelIndex: 0, // 选择破解播放的通道
    systemInfo: {},
    channelGroup: [ // 破解通道组
      {
        "name": "纯净1",
        "url": "https://z1.m1907.cn/?jx="
      }, //这个别动
      {
        "name": "B站1",
        "url": "https://vip.parwix.com:4433/player/?url="
      },
      {
        "name": "爱跟",
        "url": "https://vip.2ktvb.com/player/?url="
      },
      {
        "name": "BL",
        "url": "https://vip.bljiex.com/?v="
      },
      {
        "name": "CK",
        "url": "https://www.ckplayer.vip/jiexi/?url="
      },
      {
        "name": "CHok",
        "url": "https://www.gai4.com/?url="
      },
      {
        "name": "冰豆",
        "url": "https://api.qianqi.net/vip/?url="
      },
      {
        "name": "百域",
        "url": "https://jx.618g.com/?url="
      },
      {
        "name": "ckmov",
        "url": "https://www.ckmov.vip/api.php?url="
      },
      {
        "name": "大白",
        "url": "https://api.myzch.cn/?url="
      },
      {
        "name": "大幕",
        "url": "https://jx.52damu.com/dmjx/jiexi.php?url="
      },
      {
        "name": "迪奥",
        "url": "https://123.1dior.cn/?url="
      },
      {
        "name": "福星",
        "url": "https://jx.popo520.cn/jiexi/?url="
      },
      {
        "name": "跟剧",
        "url": "https://www.5igen.com/dmplayer/player/?url="
      },
      {
        "name": "RDHK",
        "url": "https://jx.rdhk.net/?v=",
        "t": "m"
      },
      {
        "name": "H8",
        "url": "https://www.h8jx.com/jiexi.php?url="
      },
      {
        "name": "解析",
        "url": "https://ckmov.ccyjjd.com/ckmov/?url="
      },
      {
        "name": "解析la",
        "url": "https://api.jiexi.la/?url="
      },
      {
        "name": "久播",
        "url": "https://jx.jiubojx.com/vip.php?url="
      },
      {
        "name": "九八",
        "url": "https://jx.youyitv.com/?url="
      },
      {
        "name": "可乐",
        "url": "https://jx.keleapi.com/?url=",
        "t": "m"
      },
      {
        "name": "LE",
        "url": "https://lecurl.cn/?url="
      },
      {
        "name": "懒猫",
        "url": "https://api.lanmaody.com/dm/?url="
      },
      {
        "name": "老板",
        "url": "https://vip.laobandq.com/jiexi.php?url="
      },
      {
        "name": "乐多",
        "url": "https://api.leduotv.com/wp-api/ifr.php?isDp=1&vid="
      },
      {
        "name": "乐喵",
        "url": "https://jx.hao-zsj.cn/vip/?url="
      },
      {
        "name": "Mao",
        "url": "https://qd.hxys.tv/m3u8.php?url="
      },
      {
        "name": "M3U8",
        "url": "https://jx.m3u8.tv/jiexi/?url="
      },
      {
        "name": "MUTV",
        "url": "https://jiexi.janan.net/jiexi/?url="
      },
      {
        "name": "明日",
        "url": "https://jx.yingxiangbao.cn/vip.php?url="
      },
      {
        "name": "磨菇",
        "url": "https://jx.wzslw.cn/?url="
      },
      {
        "name": "诺诺",
        "url": "https://www.ckmov.com/?url="
      },
      {
        "name": "诺讯",
        "url": "https://www.nxflv.com/?url="
      },
      {
        "name": "OK",
        "url": "https://okjx.cc/?url="
      },
      {
        "name": "PM",
        "url": "https://www.playm3u8.cn/jiexi.php?url="
      },
      {
        "name": "盘古",
        "url": "https://www.pangujiexi.cc/jiexi.php?url="
      },
      {
        "name": "全民",
        "url": "https://jx.quanmingjiexi.com/?url="
      },
      {
        "name": "SSAMAO",
        "url": "https://www.ssamao.com/jx/?url="
      },
      {
        "name": "思云",
        "url": "https://jx.ap2p.cn/?url="
      },
      {
        "name": "思古",
        "url": "https://api.sigujx.com/?url="
      },
      {
        "name": "思古2",
        "url": "https://api.bbbbbb.me/jx/?url="
      },
      {
        "name": "思古3",
        "url": "https://jsap.attakids.com/?url="
      },
      {
        "name": "淘电影",
        "url": "https://jx.vodjx.top/vip/?url="
      },
      {
        "name": "听乐",
        "url": "https://jx.dj6u.com/?url=",
      },
      {
        "name": "维多",
        "url": "https://jx.ivito.cn/?url="
      },
      {
        "name": "虾米",
        "url": "https://jx.xmflv.com/?url="
      },
      {
        "name": "小蒋",
        "url": "https://www.kpezp.cn/jlexi.php?url="
      },
      {
        "name": "小狼",
        "url": "https://jx.yaohuaxuan.com/?url="
      },
      {
        "name": "星驰",
        "url": "https://vip.cjys.top/?url="
      },
      {
        "name": "月亮",
        "url": "https://api.yueliangjx.com/?url="
      },
      {
        "name": "云点播",
        "url": "https://api.iopenyun.com:88/vip/?url="
      },
      {
        "name": "云端",
        "url": "https://jx.ergan.top/?url="
      },
      {
        "name": "云析",
        "url": "https://jx.yparse.com/index.php?url="
      },
      {
        "name": "0523",
        "url": "https://go.yh0523.cn/y.cy?url="
      },
      {
        "name": "17云",
        "url": "https://www.1717yun.com/jx/ty.php?url="
      },
      {
        "name": "66",
        "url": "https://api.3jx.top/vip/?url="
      },
      {
        "name": "116",
        "url": "https://jx.116kan.com/?url="
      },
      {
        "name": "200",
        "url": "https://vip.66parse.club/?url="
      },
      {
        "name": "8090",
        "url": "https://www.8090g.cn/?url="
      }
    ],
    channelArray: [],
    index: 0,
    viewId: 'id0',
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value,
      viewId: "id" + e.detail.value
    })
  },

  playMovie: function (event) {
    let playUrl = event.currentTarget.dataset.playUrl;
    let browser = event.currentTarget.dataset.browser;
    if (browser) {
      // 提示复制成功,粘贴到浏览器播放
      wx.showModal({
        title: '复制成功',
        content: '去浏览器地址栏粘贴播放~',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 复制
            wx.setClipboardData({
              data: playUrl,
              success(res) {
                wx.getClipboardData({
                  success(res) {
                    console.log(res.data) // data
                  }
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({
        videoUrl: playUrl
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let this_ = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        this_.setData({
          systemInfo: res
        })
      }
    })

    // channelGroup
    var array = [];
    this_.data.channelGroup.forEach(channel => {
      array.push(channel.name);
    })
    this_.setData({
      channelArray: array
    })

    let chooseIconIndex = options.chooseIconIndex;
    let playListItem = appInstance.globalData.playListItem;
    // 对playListItem中的url解码
    playListItem.backupLink = util.parseURI(playListItem.backupLink);
    if (playListItem.episodeInfoList) {
      let episodeInfoList = [];
      playListItem.episodeInfoList.forEach(item => {
        item.url = util.parseURI(item.url)
        episodeInfoList.push(item);
      })
      playListItem.episodeInfoList = episodeInfoList;
    }

    // chooseIconIndexw为0表示腾讯
    if (chooseIconIndex == 0) {
      // 先获取m1907的视频
      if (playListItem.backupLink != '') {
        m1907.getM3u8Url(playListItem.backupLink).then((data) => {
          this_.setData({
            // m1907获取的数据
            movieData: data,
            // 默认第一集
            videoUrl: data.data[0].source.eps[0].url,
            chooseIconIndex: chooseIconIndex,
            chooseChannelIndex: 0
          })
        })
      }
      if (playListItem.episodeInfoList && playListItem.episodeInfoList.length > 0) {
        //  不要纯净解析的
        var episodeInfoArr = [];
        for (var i = 1; i < this_.data.channelGroup.length; i++) {
          var channel = this_.data.channelGroup[i];
          // 解析一个通道的数据
          var playItem = {};
          playItem.title = playListItem.title;
          playItem.totalEpisode = playListItem.totalEpisode;
          playItem.type = playListItem.type;
          playItem.showName = playListItem.showName;
          playItem.backupLink = playListItem.backupLink;
          playItem.parseName = channel.name;
          playItem.episodeInfoList = [];

          playListItem.episodeInfoList.forEach(episode => {
            var episodeInfo = {};
            episodeInfo.id = episode.id;
            episodeInfo.checkUpTime = episode.checkUpTime;
            episodeInfo.dataType = episode.dataType;
            episodeInfo.imgUrl = episode.imgUrl;
            episodeInfo.markLabel = episode.markLabel;
            episodeInfo.title = episode.title;
            episodeInfo.url = episode.url;
            episodeInfo.displayType = episode.displayType;
            episodeInfo.parseUrl = channel.url + episode.url;
            playItem.episodeInfoList.push(episodeInfo);
          })
          episodeInfoArr.push(playItem);
        }
        this_.setData({
          otherMovieParseData: episodeInfoArr
        })
      }
    } else {
      console.log('其他途径暂不支持')
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})