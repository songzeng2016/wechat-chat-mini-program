// pages/chatRecord/chatRecord.js
const app = getApp()
const { wc } = app
let { openId } = app
const { host, data, isSuccess, success } = wc

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    openId = wx.getStorageSync('openId')
    let id = options.id
    this.data.id = id
    this.data.index = 1
    this.getData()
    // const that = this

    // let getData = {
    //   Action: 'GetChatList',
    //   ID: id,
    //   pageSize: 20,
    //   pageIndex: 1
    // }

    // wc.get(getData, (json) => {
    //   if (json[isSuccess] === success) {
    //     for (let i in json[data]) {
    //       that.getMessage(json[data][i])
    //     }
    //   }
    // })
  },

  getData: function (index) {
    const that = this
    let id = this.data.id

    let getData = {
      Action: 'GetChatList',
      ID: id,
      pageSize: 20,
      pageIndex: index || 1
    }

    wc.get(getData, (json) => {
      if (json[isSuccess] === success) {
        for (let i in json[data]) {
          that.getMessage(json[data][i])
        }
      }
    })
  },

  // 处理接收的消息
  getMessage: function (json) {
    const that = this
    let talk = that.data.talk || []

    if (json.openid === openId) {
      json.isMe = true
    }

    talk.push(json)

    that.setData({
      talk,
      bottom: 'bottom'
    })
  },

  loadMore: function () {

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
    this.data.index += 1
    this.getData(this.data.index)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})