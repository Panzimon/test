/**
 * Created by XYSM on 2017/2/1.
 */

const model = require('./model');

let
    Pet = model.Pet,
    User = model.User;


(async () => {
        "use strict";
        var user = await User.create({
            name: 'John',
            gender: false,
            email: 'john-' + Date.now() + '@garfield.pet',
            passwd: 'hahaha'
        });
        console.log('created: '+ JSON.stringify(user));

        var cat = await Pet.create({
            ownerId: user.id,
            name:　'Garfield',
            gender: false,
            birth: '2015-05-06'
        });
        console.log('created: ' + JSON.stringify(cat));

        var dog = await Pet.create({
            ownerId: user.id,
            name: 'Odie',
            gender: false,
            birth: '2008-08-08'
        });
        console.log('created: ' + JSON.stringify(dog));
    })();

//吗各级...又找了一个小时，
// 为什么会没有初始化我的pet和user，
// 原来是没有在我的MODELS文件夹里面写。。。