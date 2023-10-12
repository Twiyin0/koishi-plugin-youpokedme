import { Context, Schema, Random,h,Logger } from 'koishi'
import { pathToFileURL } from 'url'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

export const name = 'youpokedme'
const logger = new Logger(name)

export const usage = `
**该插件仅支持onebot支持戳一戳的协议**  
reply是必填项，必须填reply配置项才能正常使用  
使用方法请看[README](https://www.npmjs.com/package/koishi-plugin-youpokedme)  
**注意** 由于go-cqhttp已停止更新，而新的协议暂不支持戳一戳，因此本插件也随之停止更新  
感谢go-cqhttp的陪伴，也感谢大家的支持。
`

export interface Config {
  reply: string[],
  pokebk: number,
  rdmImgFolder: string,
  rdmImgodds: number,
  rdmAudioFolder: string,
  rdmAudioodds: number
}

export const schema = Schema.object({
  reply: Schema.array(String).description("定义自定义回复").required(),
  pokebk: Schema.percent().default(0.5).description('戳回去的概率'),
  rdmImgFolder: Schema.string().description('随机文件夹内的图片(绝对路径)'),
  rdmImgodds: Schema.percent().default(0.5).description('戳回去回复图片的概率'),
  rdmAudioFolder: Schema.string().description('随机文件夹内的音频(绝对路径)'),
  rdmAudioodds: Schema.percent().default(0.5).description('戳回去回复音频的概率')
})

export function apply(ctx: Context, config: Config) {
  // 戳一戳消息监听
  ctx.on('notice/poke',async (session) => {
    try {
    let sendcontent:any;
      // 当戳一戳的目标为bot时触发
      if (session.targetId === session.selfId) {
      if (Random.bool(config.pokebk)) await session.send(`<onebot:poke qq="${session.userId}"/>`);
      else {
        if(config.rdmAudioFolder && Random.bool(config.rdmAudioodds)) {
          var audiofile = config.rdmAudioFolder+Random.pick(solvAudioFolder(config.rdmAudioFolder));
          sendcontent = <audio url={pathToFileURL(resolve(__dirname, audiofile)).href}/>;
        }
        else if(config.rdmImgFolder && Random.bool(config.rdmImgodds)) {
          var imgfile = config.rdmImgFolder+Random.pick(solvImgFolder(config.rdmImgFolder));
          sendcontent = <image url={pathToFileURL(resolve(__dirname, imgfile)).href}/>;
        }
        else sendcontent = h.unescape(Random.pick(config.reply));
        session.send(sendcontent);
      }
    }
    } catch (err) {
      logger.error('戳一戳时发生错误：',err);
    }
  })
}

function solvImgFolder(folder) {
  let imgfilename = readFilenames(folder);
  const filteredArr = imgfilename.filter((filename) => {
    return /\.(png|jpg|jpeg|ico|svg|gif|webp)$/i.test(filename);
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
