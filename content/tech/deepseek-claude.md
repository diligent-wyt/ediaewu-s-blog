---
title: "在 Claude Code 中使用 CC Switch 接入 DeepSeek V4 Pro"
date: "2026-05-09"
category: "tech"
tags: ["Claude", "DeepSeek", "AI"]
summary: "通过 CC Switch 中转服务，在 Claude Code 中无缝接入 DeepSeek V4 Pro 模型，享受更低成本和高性能推理。"
draft: false
---

Claude Code 默认使用 Anthropic 的模型，能力很强但成本不低。DeepSeek V4 Pro 是 DeepSeek 最新的推理模型，在代码生成、逻辑推理等任务上表现优异，且价格远低于同等能力的闭源模型。在这个五月不得不感谢梁总的格局哈哈哈， 直接让大模型的价格起飞，人人都能用的舒坦！下面我就来说一下我是怎么去接入的。
![模型细节](/images/模型细节.png)

**CC Switch** 是一个模型中转服务，它的作用是：

- 提供一个兼容 Anthropic API 的接口
- 背后转发到 DeepSeek V4 Pro（或其他模型）
- Claude Code 无需任何代码改动，只需配置环境变量即可切换

简单说：**Claude Code 以为自己还在和 Anthropic 对话，实际上你的请求已经发到了 DeepSeek。**

---

## 步骤一：安装 CC Switch

直接去github 上面下载cc switch的压缩包然后本地安装即可，传送门[cc switch](https://github.com/farion1231/cc-switch)

---

## 步骤二：创建 API Key

登录deepsek， 在左侧菜单找到「API Keys」，点击创建新的 API Key。当然了，在创建之前是要充值后才能正常使用的。创建完成后把这个key添加到cc switch中，注意key要妥善保管，不要外泄！！！

![创建 API key](/images/创建api%20key.png)

---

## 步骤三：添加 DeepSeek V4 Pro/DeepSeek V4 flash 模型

启动cc switch如下，选中claude后点击红色+号进入添加供应商页面添加供应商

![CC Switch 首页](/images/ccswitch指引.png)

![添加供应商](/images/添加供应商.png)

然后输入api key（后续在deepseek中创建的key填入这里即可）

![输入KEY](/images/添加key.png)

接着输入自己喜欢的模型（例如deepseek-v4-pro[1m]），最后保存即可

![添加模型](/images/手动添加模型.png)

配好之后，你的 API Key 就与 DeepSeek V4 Pro 模型关联了。

CC Switch 支持多种模型，你可以后续根据需要添加其他模型。

---

## 步骤四：安装claude

安装claude，deepseek接口文档中给出了详细的说明，这里就不多赘述了

![安装claude code](/images/安装cc.png)

然后你就可以干你想干的事了~

## 步骤五：用量与充值

在 deepseek 管网用量页面可以查看 API 调用次数和余额。

![充值](/images/用量充值.png)
![用量](/images/用量信息.png)

DeepSeek V4 Pro 的计费按 token 计算，相比 Anthropic 的官方模型，费用约为 **十分之一甚至更低**。

---
