var app = getApp();
Page({
	data: {
		goods:
		[
			{
				id: 1,
				name: '周杰伦',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				price: 2
			},
			{
				id: 2,
				name: '彭于晏',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				price: 3
			},
			{
				id: 3,
				name: '蔡依林',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				price: 2
			},
			{
				id: 4,
				name: '林俊杰',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				price: 2
			}
		],
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		
	},
	
	
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id);
	},
	
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
		console.log(1)
	},
	
	countCart: function(){
		var count = 0,
			total = 0;
		for (var id in this.data.cart.list) {
			var goods = this.data.goods[id];
			count = this.data.cart.list[id];
			total = this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
		console.log(this.data.cart.list)
	},
	
	
});

