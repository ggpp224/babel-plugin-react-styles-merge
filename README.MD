#babel-plugin-react-styles-merge
> react 中 将多个style对象合并成一个style

html中 class 我们可以传入多个:
```html
<a class="cls1 cls2 cls3" ></a>

```
那么style有没有类似简便的写法?

没有!!!

不过,我们借助 babel 可以模拟实现:
```jsx
 var o1 = {color:'red'};
 var o2 = {width: '10px'};
 var o3 = {height: '3px'};

 <a styles={[o1, o2, o3]} ></a>

```




## 安装

```
 $ npm install babel-plugin-react-styles-merge
```

## 使用

修改 .babelrc 文件
```
{
  "plugins": ["react-styles-merge"]
}

```

## 说明
同时存在style 和 styles时, 会将styles合并到style中, 相同属性,style中会被styles中的属性
覆盖。


**In**
```
var obj = {
            "paddingLeft": '75px',
             padding: '6px 10px',
             fontSize:'24px',
             height:'75px',
             length:'100px'
        };


return(
        <li style={{backgroundColor:'grey'}} styles={[{a:1},{b:2}, obj]}></li>
      )
```


**Out**

```
_react2.default.createElement('li', { style: Object.assign({}, { backgroundColor: 'grey' }, { a: 1 }, { b: 2 }, obj) })


```

