# koishi-plugin-qianfan-service

[![npm](https://img.shields.io/npm/v/koishi-plugin-qianfan-service?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-qianfan-service)

百度智能云千帆大模型平台基础服务

## 配置项

- `API_KEY`: 千帆大模型平台应用 API Key
- `SECRET_KEY`: 千帆大模型平台应用 Secret Key

## 支持接口

接口请求参数、返回值的数据结构与官网基本一致，具体参考 [千帆大模型平台 - API 列表](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Nlks5zkzu)

### ctx.qianfan.chat(body: ChatBody, model: ChatModel)

发起对话请求

- `body`: 请求参数
- `model`: 使用的模型，默认 Ernie-Bot
- 返回值: ChatResp

### ctx.qianfan.imagine(body: Text2ImageBody)

发起文生图请求

- `body`: 请求参数
- 返回值: Text2ImageResp

## 调用示例

```typescript
// 声明服务依赖
import {} from "koishi-plugin-qianfan-service";
export const inject = ["qianfan"];

// 对话
const body = {
  messages: [
    {
      role: "user",
      content: "Hello World",
    },
  ],
};
const resp = await ctx.qianfan.chat(body);
logger.debug(resp.result); // 处理结果

// 绘画
const body = {
  prompt: "cute,white,cat",
};
const resp = await ctx.qianfan.imagine(body);
logger.debug(resp.data[0].b64_image); // 处理结果
```
