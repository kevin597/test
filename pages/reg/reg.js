// pages/reg/reg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender_index: 0,
    title_index: 0,
    flag: 0,
    gender: ['性别', '男', '女'],
    title: ['职称职务', '主任医师', '副主任医师', '主治医师', '医师', '教授', '副教授', '研究员', '副研究员', '院长', '副院长', '主任', '副主任', '其他']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var self = this;
    wx.request({
      url: 'https://www.chinamed-ce.com/huiyi/wx_detail.asp',
      data: {
        id: 4
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (result) {
        self.setData({
          detail: result.data.listdata
        })
      }
    }),
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (personInfo) {
      //更新数据
      //console.log(personInfo)  
      that.setData({
        personInfo: personInfo
      })
    })
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
  
  },
  genderChange: function (e) {
    this.setData({
      gender_index: e.detail.value
    })
  },
  titleChange: function (e) {
    this.setData({
      title_index: e.detail.value
    })
  },
  //添加 
  formSubmit: function (e) {
    var w_name = e.detail.value.w_name;
    var w_gender = e.detail.value.w_gender;
    var w_age = e.detail.value.w_age;
    var w_mobile = e.detail.value.w_mobile;
    var w_company = e.detail.value.w_company;
    var w_title = e.detail.value.w_title;
    var w_nickName = e.detail.value.w_nickName;
    var w_avatarUrl = e.detail.value.w_avatarUrl;
    var self = this;
    if (w_name.length == 0 || w_gender.length == 0 || w_age.length == 0 || w_mobile.length == 0 || w_company.length == 0 || w_title.length == 0) {
      self.setData({
        flag: 0
      });
      wx.showToast({
        title: '请填写完整',
        icon: 'loading',
        duration: 1000
      });
      return;
    };
    wx.request({
      url: 'https://www.chinamed-ce.com/huiyi/wx_save.asp',
      data: {
        w_title: w_title,
        w_name: w_name,
        w_gender: w_gender,
        w_age: w_age,
        w_company: w_company,
        w_mobile: w_mobile,
        w_nickName: w_nickName,
        w_avatarUrl: w_avatarUrl
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (result) {
        //console.log(result.data)
        self.setData({
          userid: result.data,
          //gender_index: 0,
          //title_index: 0,
          flag: 1,
          //gender: ['性别'],
          //title: ['职称职务']
        });
        wx.showToast({
          title: '注册签到成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function () {
        // fail
        console.log("注册签到失败")
      },
      complete: function () {
        // complete
      }
    })
  }
})