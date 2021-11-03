// pages/music/music.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancelButton: false,
    musicInputName: '',
    musicType: 'migu',
    musicResult: [],
    errorShow: false,
    errorInfo: '',
    radioGroup: [{
        index: 0,
        value: 'migu',
        name: '咪咕',
        type: 'success'
      },
      {
        index: 1,
        value: 'netease',
        name: '网易',
        type: 'circle'
      },
      {
        index: 2,
        value: 'qq',
        name: 'QQ',
        type: 'circle'
      },
      {
        index: 3,
        value: 'kugou',
        name: '酷狗',
        type: 'circle'
      },
      {
        index: 4,
        value: 'kuwo',
        name: '酷我',
        type: 'circle'
      },
      {
        index: 5,
        value: '1ting',
        name: '一听',
        type: 'circle'
      },
      {
        index: 6,
        value: 'lizhi',
        name: '荔枝',
        type: 'circle'
      },
      {
        index: 7,
        value: 'qingting',
        name: '蜻蜓',
        type: 'circle'
      },
      {
        index: 8,
        value: 'ximalaya',
        name: '喜马拉雅',
        type: 'circle'
      },
      {
        index: 9,
        value: '5singyc',
        name: '5sing原创',
        type: 'circle'
      },
      {
        index: 10,
        value: '5singfc',
        name: '5sing翻唱',
        type: 'circle'
      },
    ],
    chooseIconIndex: 0,
    showLoadMoreFlag: false,
    page: 1
  },

  // 输入的过程中，不停调用
  bindInput: function (event) {
    this.setData({
      musicInputName: event.detail.value,
      page: 1,
      musicResult: []
    })
  },
  // 点击clear按钮时
  bindClear: function (event) {
    console.log(event);
    this.setData({
      errorShow: false,
      errorInfo: ''
    })
  },

  loadMore: function () {
    let page_ = this.data.page;
    this.setData({
      page: page_ + 1
    })
    this.searchMusic();
  },

  searchMusic: function () {
    // 记录原来的数据
    let musicLists = this.data.musicResult;

    util.getMusicLink(this.data.musicInputName, this.data.musicType, this.data.page).then((data) => {
      // let bgMusicManager = wx.getBackgroundAudioManager();
      // bgMusicManager.title = data[0].title;
      // bgMusicManager.epname = data[0].title;
      // bgMusicManager.singer = data[0].author;
      // bgMusicManager.coverImgUrl =  data[0].pic;
      // // 设置url后会自动播放
      // bgMusicManager.src = data[0].url;
      if (data.code != 200) {
        this.setData({
          showLoadMoreFlag: false,
          errorShow: true,
          errorInfo: data.error
        })
      } else {
        this.setData({
          errorShow: false,
          musicResult: musicLists.concat(data.data) // 合并原来的
        })

        if (data.data.length < 10) {
          this.setData({
            showLoadMoreFlag: false
          })
        } else {
          this.setData({
            showLoadMoreFlag: true
          })
        }
      }
    })
  },

  // 重新搜索，关闭错误提示
  research: function () {
    this.setData({
      errorShow: false,
      errorInfo: ''
    })
  },

  playMusic: function (event) {
    let item = event.currentTarget.dataset.item;
    wx.playBackgroundAudio({
      dataUrl: item.url,
      title: item.title,
      coverImgUrl: item.pic,
      success() {
        console.log('音乐播放成功');
      }
    });
  },

  changeChooseIcon: function (event) {
    // console.log(event.currentTarget.dataset.index)
    // console.log(event.currentTarget.dataset.value)
    let index = event.currentTarget.dataset.index;
    let value = event.currentTarget.dataset.value;
    let items = this.data.radioGroup;
    // 改变radioGroup的type
    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.index == index) {
        item.type = 'success'
      } else {
        item.type = 'circle'
      }
    }
    this.setData({
      radioGroup: items,
      musicType: value
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绑定搜索和显示
    // this.setData({
    //   search: this.search.bind(this)
    // })
    // 默认第一个被选中

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