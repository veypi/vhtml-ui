export default async ($mod) => {
  // 加载 i18n 翻译文件
  await $mod.fetch('/langs.json').then(e => e.json().then(e => $mod.$i18n.load(e)))
}
