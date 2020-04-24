/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1_3306
Source Server Version : 50716
Source Host           : 127.0.0.1:3306
Source Database       : reactblog

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2020-04-24 10:41:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `ID` int(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1', 'wg', '19961228');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `article_content` text NOT NULL,
  `introduce` text NOT NULL,
  `addTime` varchar(20) NOT NULL,
  `view_count` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '1', '啊港第一篇', '文章内容React内容', '这是测试文章', '2020-04-16 10:22:55', '20');
INSERT INTO `article` VALUES ('3', '1', '第三篇react', '文章内容', '这是react第三批', '2020-04-17 19:06:22', '15');
INSERT INTO `article` VALUES ('4', '2', '笔记类型', '文章是笔记', '这是笔记类型', '2020-04-17 19:47:55', '30');
INSERT INTO `article` VALUES ('11', '1', '我要自己实现mycall', '# 改变this指向的作用：\n> 动态的更改this的指向，能够帮助我們更好的复用代码，提升代码质量，编写扩展性、维护性强的代码，这是修炼内功必不可少的一个环节。\n\n## 举个栗子：\n当年某天加班回来，想要煮点面条的时候，发现没有盐了，可是太累又不想下去买了，这个时候像友好的邻居借一下，岂不是美滋滋，既达到了目的，又节省了时间。所以在代码里能够运用其他对象的方法，来处理现在的需求，是非常又必要的，不可能一个对象吧所有的功能都囊括在里面吧，那的要多少行 “小目标” 代码呢。\n\n# Call 方法实现：\n ## 实现原理\n  当一个函数调用call方法时，将当前函数挂载到用户传的对象上，然后再执行完之后，删除对象的中的此属性，返回函数执行结果。上代码：\n  ```\n  function test(...arg) {\n    console.log(\'测试函数\', \'传递的参数\', arg)\n }\n\n Function.prototype.mycall = function (context, ...arg) {\n    if (context === null || context === undefined) {\n        context = window //   如果没有则赋值给 window 浏览器是window 为顶层对象 node 不同\n\n    } else {\n        context = Object(context) // 返回传递的对象\n    }\n\n    context.fn = this // 将当前函数的 绑定到 传递的对象上执行\n    let result = context.fn(...arg)\n    delete context.fn // 删除传递过来的对象\n    return result // 返回对象\n\n    console.log(\'测试函数传递过来的参数\', ...arg) // 得到call 函数多个参数的值 xxx,xxx\n}\n\ntest.mycall(this, \'xx\', \'xx\') // [\'xxx\',\'xxx\'] // arg 是数组类型\n```\n***\n*这里要主要判断context 有没有传递，没有的话挂载到window 对象，再浏览器里window是顶层对象，node不同*。\n\n\n# apply 实现\n ## 实现原理\n  和 mycall 一样 只是传递的参数不同，这里需要接受一个数组。\n```\nFunction.prototype.myapply = function (context, arg) {\n    // apply 函数执行机制跟call 一样 ，要判断传入的是不是数组\n    context = Object(context) || window\n    context.fn = this\n    let result = null\n    if (arg) { // 如果传入了数组\n        let isarr = Array.isArray(arg)\n        if (!isarr) {\n            return new TypeError(\'传递的参数不是数组，请重新传参\')\n        }\n        result = context.fn(...arg)\n    } else {\n        result = context.fn()\n\n    }\n    return result\n\n}\n//test.myapply(this, [\'xx\']) // [\'xx\']\n\n``` \n# bind 实现\n ## bind 实现原理\n bind和其他两个调用的区别在于,bind是返回一个绑定好的函数,apply是直接调用.那么只要返回一个函数,里面执行了apply上述的操作就行.不过有一个需要判断的点,因为返回新的函数,要考虑到使用new去调用,并且new的优先级比较高,所以需要判断new的调用,还有一个特点就是bind调用的时候支持/支持柯里化形式传参。 上代码。\n\n ```\n\nFunction.prototype.mybind = function (objthis, ...params) {\n    // bind 函数返回的是一个函数 不是一个函数执行的结果\n    const thisfn = this\n    let fnobj = function (...arg) {\n        let result = this instanceof fnobj\n        const context = result ? this : Object(objthis) // new调用就绑定到this上,否则就绑定到传入的context上\n        return thisfn.call(context, ...params, ...arg);\n    }\n    fnobj.prototype = Object.create(thisfn.prototype)\n    return fnobj\n}\n```\n要完善可以加入对传递的参数 是不是所需类型的判断，比如传入的第一个是不是对象，处理异常等。下一节再见\n', '自己实现mycall', '2019-09-19 17:22:22', '0');

-- ----------------------------
-- Table structure for blog_content
-- ----------------------------
DROP TABLE IF EXISTS `blog_content`;
CREATE TABLE `blog_content` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `introduce` text NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_content
-- ----------------------------
INSERT INTO `blog_content` VALUES ('1', '啊港的第一篇', '文字教程', '第一篇文章', '这是内容的文本');

-- ----------------------------
-- Table structure for nav_type
-- ----------------------------
DROP TABLE IF EXISTS `nav_type`;
CREATE TABLE `nav_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nav_Name` varchar(255) NOT NULL,
  `nav_Icon` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of nav_type
-- ----------------------------
INSERT INTO `nav_type` VALUES ('1', '首页', 'w-shouye');
INSERT INTO `nav_type` VALUES ('2', '分类', 'w-fenlei');
INSERT INTO `nav_type` VALUES ('3', '笔记', 'w-icon-test');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL,
  `orderNum` int(11) NOT NULL,
  `typeIcon` varchar(255) NOT NULL,
  `nav_id` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES ('1', 'React教程', '1', 'w-wenzi', '2');
INSERT INTO `type` VALUES ('2', 'Vue笔记', '2', 'w-icon-test', '3');
INSERT INTO `type` VALUES ('3', 'Vue技术栈', '3', 'w-wenzi', '2');
