# koishi-plugin-youpokedme

[![npm](https://img.shields.io/npm/v/koishi-plugin-youpokedme?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-youpokedme)

A koishi plugin you can poke back to who poked you  


# 你怎么戳我！！
喂!(#`O′) 戳我干什么!!  
回复写一些调皮的东西，并且概率戳回去！！  

## 配置
 > 图片或者音频如果使用网络url随机api时不会随机可以在api末尾加"?v=123",如https://api.yourdomain.com/img?v=123
 > 如果仍旧无法随机则联系api作者或者自己检查后端api


我觉得在配置上写的挺清楚的了,这里就不再详细说明了,有问题提issues.  

## History
### v0.0.1
- * 发布第一个版本试试，应该会有bug的
### v1.0.0-alpha.1
- 修改了有概率无法回复

### v1.0.0-alpha.2
- 修改了图片发送为audio的问题
- 需要注意的是路径不要用中文名
- 当img数组audio数组与imgFolder、audioFolder都有配置的时候，对应各回复几率是0.5

### v1.0.0
- 没错，只要协议支持，配置没错就能用了,记得装ffmpeg  
- 完善README

## 注意
遇到bug不要慌，我大抵没时间修（bushi）  
所以慌也没用 o(*￣▽￣*)o  
记得装ffmpeg  
- 1.如果没有任何反应，首先检查登录协议（目前MacOS、手表不支持，apad、ipad、手机支持）是否支持，再检查概率配置、路径配置是否合规。（文件夹路径需要以/结尾）
- 2.回复"呜呜呜"可能是配置有问题

## 示例
rdmImgFolder: /mnt/f/photos/img/4-24/acc/  
bktxt: 0.3  
pokebk: 0.4  
bkimg: 0.4  
rdmAudioFolder: /mnt/f/music/web/a/  
bkaudio: 0.3  
audioarr:  
    - /mnt/f/music/web/a/a.mp3  
imgarr:  
    - /mnt/a/b.jpg  

以上是我的配置，是我能正常使用的，可以借鉴  
