export default async ($env) => {
  // 加载 i18n 翻译文件
  $env.$i18n.load(await (await fetch('./langs.json')).json())
}
