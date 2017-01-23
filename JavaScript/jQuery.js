/**
 * Created by ZY on 2017/1/23.
 */
//目前jQuery有1.x和2.x两个主要版本，
// 区别在于2.x移除了对古老的IE 6、7、8的支持，因此2.x的代码更精简。
// 选择哪个版本主要取决于你是否想支持IE 6~8。

/*
 window.jQuery; // jQuery(selector, context)
 window.$; // jQuery(selector, context)
 $ === jQuery; // true
 typeof($); // 'function'
 */

/*
 $函数名可能不是jQuery(selector, context)，
 因为很多JavaScript压缩工具可以对函数名和参数改名，
 所以压缩过的jQuery源码$函数可能变成a(b, c)。

 绝大多数时候，我们都直接用$（因为写起来更简单嘛）。
 但是，如果$这个变量不幸地被占用了，而且还不能改，
 那我们就只能让jQuery把$变量交出来，然后就只能使用jQuery这个变量：

 $; // jQuery(selector, context)
 jQuery.noConflict();
 $; // undefined
 jQuery; // jQuery(selector, context)
 这种黑魔法的原理是jQuery在占用$之前，
 先在内部保存了原来的$,
 调用jQuery.noConflict()时会把原来保存的变量还原
 */