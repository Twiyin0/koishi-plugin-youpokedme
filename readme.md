# koishi-plugin-youpokedme

[![npm](https://img.shields.io/npm/v/koishi-plugin-youpokedme?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-youpokedme)

A koishi plugin you can poke back to who poked you  

# 你怎么戳我！！
喂!(#`O′) 戳我干什么!!  
回复写一些调皮的东西，并且概率戳回去！！  
**仅支持onebot**  

## 配置
* reply: 回复的内容，必填项，见[回复内容](#回复内容)一节
* pokebk: 戳回去的概率(0~1)
* rdmImgFolder: 随机本地文件夹内的图片(绝对路径),如(`C:\\User\\Download\\photos\\`或者`/root/photos/`) 末尾的`/`不要忘了
* rdmImgodds: 回复为本地文件夹内图片的概率(0~1)
* rdmAudioFolder: 随机本地文件夹内的音频(绝对路径),如(`C:\\User\\Download\\audio\\`或者`/root/audio/`) 末尾的`/`不要忘了
* rdmAudioodds: 回复为本地文件夹内音频的概率(0~1)

## 回复内容
* 纯文本: 直接在数组内打字即可
* 图文: 文字&lt;image url="图片url"/&gt; ======>图片url: 本地`file://绝对路径` 远程`http(s)://地址`
示例:   
你好啊&lt;image url="file:///www/photos/awa.jpg"/&gt;  
空妮姬蛙&lt;image url="file://C:/User/photos/qwq.png"/&gt;  
Hello&lt;image url="https://example.com/path/to/image.png"/&gt;  
* 音频: &lt;audio url="音频url"&gt;  ======>图片url: 本地`file://绝对路径` 远程`http(s)://地址`
示例:  
&lt;audio url="file:///www/audio/awa.mp3"/&gt;  
&lt;audio url="file://C:/User/audio/qwq.ogg"/&gt;  
&lt;audio url="https://example.com/path/to/audio.mp3"/&gt;  
### 注意
音频和文本不要复用，不然会导致一系列问题（包括但不限于多条发送，QQ冻结）

## History
### v1.1.1
- 修复了无法扫描gif的问题

### v1.1.0
- 重构了shi山代码
- 修复一堆问题

### v1.0.0
- 没错，只要协议支持，配置没错就能用了,记得装ffmpeg  
- 完善README

### v1.0.0-alpha.2
- 修改了图片发送为audio的问题
- 需要注意的是路径不要用中文名
- 当img数组audio数组与imgFolder、audioFolder都有配置的时候，对应各回复几率是0.5

### v1.0.0-alpha.1
- 修改了有概率无法回复

### v0.0.1
- * 发布第一个版本试试，应该会有bug的

## 注意
** 仅支持onebot **  
遇到bug不要慌，我大抵没时间修（bushi）  
所以慌也没用 o(*￣▽￣*)o  
记得装ffmpeg  
- 1.如果没有任何反应，首先检查登录协议是否支持（目前MacOS、手表不支持，apad、ipad、手机支持），再检查概率配置、路径配置是否合规。（文件夹路径需要以/结尾）
- 2.如果有报错请检查路径是否正确（文件夹路径需要以/结尾），远程资源是否可用，文件是否损坏等
如有问题请在github提issues，报错附上完整日志

## 示例
youpokedme:  
    reply:  
        - awa  
        - 啊啊啊&lt;image url="https://example.ccom/img/acc?type=webp"/&gt;  
        - &lt;audio url="https://example.com/audio/audio.mp3"/&gt;  
    rdmImgFolder: /opt/koishi/photos/  
    rdmAudioFolder: /opt/koishi/audio/  
    pokebk: 0.42  
    rdmImgodds: 0.42  
    rdmAudioodds: 0.46  

以上是我的配置，是我能正常使用的，可以借鉴  
