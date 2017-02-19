/**
 * Created by ZY on 2017/2/13.
 */
/*
 一个TODO列表在DOM结构的表现形式就是一组<li>节点：

 <ol>
 <li>
 <dl>
 <dt>产品评审</dt>
 <dd>新款iPhone上市前评审</dd>
 </dl>
 </li>
 <li>
 <dl>
 <dt>开发计划</dt>
 <dd>与PM确定下一版Android开发计划</dd>
 </dl>
 </li>
 <li>
 <dl>
 <dt>VC会议</dt>
 <dd>敲定C轮5000万美元融资</dd>
 </dl>
 </li>
 </ol>
 而对应的Model可以用JavaScript数组表示：

 todos: [
 {
 name: '产品评审',
 description: '新款iPhone上市前评审'
 },
 {
 name: '开发计划',
 description: '与PM确定下一版Android开发计划'
 },
 {
 name: 'VC会议',
 description: '敲定C轮5000万美元融资'
 }
 ]
 使用MVVM时，当我们更新Model时，
 DOM结构会随着Model的变化而自动更新。
 当todos数组增加或删除元素时，
 相应的DOM节点会增加<li>或者删除<li>节点。

 在Vue中，可以使用v-for指令来实现：

 <ol>
 <li v-for="t in todos">
 <dl>
 <dt>{{ t.name }}</dt>
 <dd>{{ t.description }}</dd>
 </dl>
 </li>
 </ol>
 这样，我们只关心如何更新Model，
 不关心如何增删DOM节点，大大简化了整个页面的逻辑。
 */
/*
 我们可以在浏览器console中用window.vm.todos[0].name='计划有变'
 查看View的变化，
 或者通过
 window.vm.todos.push({name:'新计划',description:'blabla...'})
 来增加一个数组元素，从而自动添加一个<li>元素。
 */

/*
!!!
 但是，对于数组元素的赋值，却没有办法直接监听，
 因此，如果我们直接对数组元素赋值：

 vm.todos[0] = {
 name: 'New name',
 description: 'New description'
 };
 会导致Vue无法更新View。

 正确的方法是不要对数组元素赋值，而是更新：

 vm.todos[0].name = 'New name';
 vm.todos[0].description = 'New description';
 */

/*
 或者，通过splice()方法，删除某个元素后，
 再添加一个元素，达到“赋值”的效果：

 var index = 0;
 var newElement = {...};
 vm.todos.splice(index, 1, newElement);
 Vue可以监听数组的splice、push、unshift等方法调用，
 所以，上述代码可以正确更新View。
 */

/*todo 大神tips

 vue与jQuery尽可能不要混用

 通过jQuery动态插入的元素没法正确vue初始化。

 考虑到vue的初始化发生在页面DOM初始化后，也就是如果jQuery的插入元素不是在页面加载时加入进来的话，vue是无法初始化成功的。

 比如用jQuery或原生js对一个元素添加v-for或者v-test之类的属性。

 还有{{}}语法，vue和jinja2/nonjects也会起冲突。最好约束写法。
 */
/*
 MVVM的适用范围

 从几个例子我们可以看到，
 MVVM最大的优势是编写前端逻辑非常复杂的页面，
 尤其是需要大量DOM操作的逻辑，利用MVVM可以极大地简化前端页面的逻辑。

 但是MVVM不是万能的，它的目的是为了解决复杂的前端逻辑。
 对于以展示逻辑为主的页面，例如，新闻，博客、文档等，
 不能使用MVVM展示数据，因为这些页面需要被搜索引擎索引，
 而搜索引擎无法获取使用MVVM并通过API加载的数据。

 所以，需要SEO（Search Engine Optimization）的页面，
 不能使用MVVM展示数据。不需要SEO的页面，如果前端逻辑复杂，
 就适合使用MVVM展示数据，例如，工具类页面，复杂的表单页面，
 用户登录后才能操作的页面等等。
 */