import { Context, Schema, Service } from "koishi";
import { Qianfan } from "qianfan";
import type { ChatBody, ChatModel, Text2ImageBody, PluginName, PluginBody } from "qianfan/dist/interface";

export const name = "qianfan-service";

export interface Config {
  API_KEY: string;
  SECRET_KEY: string;
}

export const Config: Schema<Config> = Schema.object({
  API_KEY: Schema.string().required(),
  SECRET_KEY: Schema.string().required().role("secret"),
});

declare module "koishi" {
  interface Context {
    qianfan: QianfanService;
  }
}

export class QianfanService extends Service {
  private client: Qianfan;
  constructor(public ctx: Context, public config: Config) {
    super(ctx, "qianfan", true);
    this.client = new Qianfan(config.API_KEY, config.SECRET_KEY);
  }

  /**
   * 发起对话请求
   * @param body 请求体
   * @param model 使用的模型
   * @param endpoint 申请发布时填写的API地址
   */
  async chat<T extends ChatModel>(
    body: ChatBody<T>,
    model: T = "ERNIE-Bot-4" as T,
    endpoint = ""
  ) {
    const resp = await this.client.chat(body, model, endpoint);
    this.logger.debug({
      body,
      resp,
    });
    return resp;
  }

  /**
   * 发起文生图请求
   * @param body 请求体
   */
  async imagine(body: Text2ImageBody) {
    const resp = await this.client.text2image(body);
    this.logger.debug({
      body,
      resp,
    });
    return resp;
  }


  /**
   * 发起插件应用请求
   * @param endpoint 服务地址后缀
   * @param plugins 插件列表
   * @param body 请求参数
   * @returns Promise<PluginResp>
   */
  async plugin<T extends PluginName>(endpoint: string, plugins: T, body: PluginBody<T>) {
    const resp = await this.client.plugin(endpoint, plugins, body);
    this.logger.debug({
      body,
      resp,
    });
    return resp;
  }
}

export function apply(ctx: Context, config: Config) {
  ctx.plugin(QianfanService, config);
}
