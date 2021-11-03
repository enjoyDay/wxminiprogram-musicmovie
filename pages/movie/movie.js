// pages/movie/movie.js
const util = require('../../utils/util.js');
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancelButton: false,
    movieInputName: '',
    movieResult: {}, // 电影结果列表
    searchMovieResult: false,
    errorShow: false,
    errorInfo: '',
    radioGroup: [{
      index: 0,
      value: 'tengxun',
      name: '腾讯视频',
      type: 'success'
    }],
    chooseChannelIndex: 0,
    chooseIconIndex: 0,
    chooseIconName: '腾讯视频',
    movieType: 'tengxun',
    movieList: []
  },

  research: function () {
    this.setData({
      errorShow: false,
      errorInfo: '',
      // searchMovieResult: false
    })
  },

  bindInput: function (event) {
    this.setData({
      movieInputName: event.detail.value
    })
  },

  // 点击clear按钮时
  bindClear: function (event) {
    this.setData({
      errorShow: false,
      errorInfo: '',
      searchMovieResult: false
    })
  },

  searchMovie: function () {
    let this_ = this;
    util.movieList(this_.data.movieInputName).then(data => {
      // 解析html文件，返回的是一个数组，因为可能会找到多个影视列表
      // 数据结构  数组
      // {
      //   id: 'sdp00187zx8i0dq',
      //   title: '宝贝\x05大赢家\x06剪辑2019',
      //   fugurePic: 'https://puui.qpic.cn/vcover_vt_pic/0/sdp00187zx8i0dq1626754103/260',
      //   backupLink: 'https://v.qq.com/search_redirect.html?cid=sdp00187zx8i0dq&url=http%3A%2F%2Fwww.iqiyi.com%2Fv_19rsk58w6g.html%3Fvfm%3Dm_103_txsp',
      //   figureCaption: '',
      //   sub: '(2019)',
      //   type: '综艺',
      //   score: '',
      //   desc: '',
      //   site: 'qiyi',
      //   originName: '爱奇艺',
      //   originImage: 'https://puui.qpic.cn/vupload/0/20180830_1535597639625_irx4kb4qds.png/0'
      // }
      let movieList = util.parseTencentVHtml(data);
      this_.setData({
        movieList: movieList,
        searchMovieResult: true
      })
    })
  },
  changeChooseIcon: function (event) {
    let index = event.currentTarget.dataset.index;
    let value = event.currentTarget.dataset.value;
    let name = '';
    let items = this.data.radioGroup;
    // 改变radioGroup的type
    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.index == index) {
        item.type = 'success'
        name = item.name
      } else {
        item.type = 'circle'
      }
    }
    this.setData({
      radioGroup: items,
      movieType: value,
      chooseIconIndex: index,
      chooseIconName: name
    })
  },

  playMovie: function (event) {
    let item = event.currentTarget.dataset.item;
    let playListItem;

    if (item.id == '') {
      wx.showToast({
        title: "不能播放",
        icon: "error"
      });
      return;
    }

    if (this.data.chooseIconIndex == 0) {
      // 腾讯，可以获取接口数据
      util.getTencentMovieData(item.id, item.site).then(data => {
        // 对返回的数据处理一下
        let playListItem = {};
        playListItem.backupLink = item.backupLink;
        playListItem.type = item.type;
        playListItem.title = item.title;
        let firstBlockSites = data.data.normalList.itemList[0].videoInfo.firstBlockSites[0];
        if (firstBlockSites) {
          playListItem.episodeInfoList = firstBlockSites.episodeInfoList
          playListItem.showName = firstBlockSites.showName
          playListItem.totalEpisode = firstBlockSites.totalEpisode;
        }
        // 设置到全局去
        appInstance.globalData.playListItem = playListItem;
        wx.navigateTo({
          url: '/pages/movieDetail/movieDetail?chooseIconIndex= ' + this.data.chooseIconIndex,
          success: function (res) {}
        })
      })
    } else {
      console.log('其他电影渠道')
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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