import { Context, Schema, Random } from 'koishi'
import { pathToFileURL } from 'url'
import { resolve } from 'path'
const fs = require('fs');
const path = require('path');

export const name = 'youpokedme'

export interface Config {
  text: string[],
  pokebk: number,
  bktxt: number,
  bkimg: number,
  bkaudio: number,
  imgarr: string[],
  audioarr: string[],
  rdmImgFolder: string,
  rdmAudioFolder: string
}

export const schema = Schema.object({
  text: Schema.array(String).description("定义自定义回复文本")
  .default(['喂(#`O′)，戳我干什么','不许戳！','再这样我要叫警察叔叔啦','讨厌没有边界感的人类','你就不能抱抱我吗','再戳我就要戳回去啦']),
  pokebk: Schema.number().default(0.5).description('戳回去的概率0-1'),
  bktxt: Schema.number().default(1).description('回复文本的概率0-1,三个的概率之和不能大于1'),
  bkimg: Schema.number().default(0).description('回复图片的概率0-1,三个的概率之和不能大于1'),
  bkaudio: Schema.number().default(0).description('回复语音的概率0-1,三个的概率之和不能大于1'),
  imgarr: Schema.array(String).description("自定义回复图片(http(s)或者文件绝对路径)"),
  audioarr: Schema.array(String).description("自定义回复音频(http(s)或者文件绝对路径)"),
  rdmImgFolder: Schema.string().description('随机文件夹内的图片(绝对路径)'),
  rdmAudioFolder: Schema.string().description('随机文件夹内的音频(绝对路径)')
})

export function apply(ctx: Context, config: Config) {
  // 戳一戳消息监听
  ctx.on('notice/poke',async (session) => {
    // 防止配置文件错误
    if (config.bkaudio+config.bkimg+config.bktxt > 1) {
      config.bktxt=1;
      config.bkaudio=0;
      config.bkimg=0;
    }
    // 当戳一戳的目标为bot时触发
    if (session.targetId === session.selfId) {
      if(Random.bool(config.pokebk? config.pokebk:0.5))
        await session.send(`<onebot:poke qq="${session.userId}"/>`);
      else if (!config.rdmAudioFolder&&!config.rdmImgFolder) {
        if(Random.bool(config.bktxt)) {
          config.bkimg = null;
          config.bkaudio = null;
          session.send(Random.pick(config.text));
        }
        if(Random.bool(config.bkimg)) {
          config.bktxt= null;
          config.bkaudio = null;
          session.send(solvImg(Random.pick(config.imgarr)));
        }
        if(Random.bool(config.bkaudio)) {
          config.bktxt = null;
          config.bkimg = null;
          session.send(solvAudio(Random.pick(config.audioarr)));
        }
      }
      else if(config.rdmImgFolder || config.rdmAudioFolder) {
        if(Random.bool(config.bkimg)) {
          config.bkaudio = null;
          var imgfile = config.rdmImgFolder+Random.pick(solvImgFolder(config.rdmImgFolder));
          session.send(<image url={pathToFileURL(resolve(__dirname, imgfile)).href}/>);
        }
        if(Random.bool(config.bkaudio)) {
          config.bkimg = null;
          var audiofile = config.rdmAudioFolder+Random.pick(solvAudioFolder(config.rdmAudioFolder));
          session.send(<audio url={pathToFileURL(resolve(__dirname, audiofile)).href}/>);
        }
      }
      else session.send(Random.pick(config.text));
    }
    // 释放变量
    config.bkimg=config.bktxt=config.bkaudio=null;
  })
}

function solvImg(pataurl) {
  var patt = /^https?:\/\/(.*)/g;
  if(pataurl.match(patt)) return <image url={pataurl}/>
  else <image url={pathToFileURL(resolve(__dirname, pataurl)).href}/>
}

function solvAudio(pataurl) {
  var patt = /^https?:\/\/(.*)/g;
  if(pataurl.match(patt)) return <audio url={pataurl}/>
  else return <audio url={pathToFileURL(resolve(__dirname, pataurl)).href}/>
}

function solvImgFolder(folder) {
  let imgfilename = readFilenames(folder);
  const filteredArr = imgfilename.filter((filename) => {
    return /\.(png|jpg|jpeg|ico|svg)$/i.test(filename);
  });
  return filteredArr;
}

function solvAudioFolder(folder) {
  let imgfilename = readFilenames(folder);
  const filteredArr = imgfilename.filter((filename) => {
    return /\.(mp3|flac|ogg|m4a)$/i.test(filename);
  });
  return filteredArr;
}

// 递归获取文件夹内所有文件的文件名
function readFilenames(dirPath) {
  let filenames = [];
  const files = fs.readdirSync(dirPath);
  files.forEach((filename) => {
    const fullPath = path.join(dirPath, filename);
    if (fs.statSync(fullPath).isDirectory()) {
      filenames = filenames.concat(readFilenames(fullPath));
    } else {
      filenames.push(filename);
    }
  });
  return filenames;
}
