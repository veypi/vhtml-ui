import { checkValue } from './validate.js'

const THEME_KEY = 'vhtml-ui-theme'

export default async ($mod) => {
  // 共享表单校验
  $mod.checkValue = checkValue

  // 主题管理：t1 默认亮色，t2 暗黑；持久化到 localStorage
  $mod.theme = {
    get() {
      return localStorage.getItem(THEME_KEY) || 't1'
    },
    set(name) {
      localStorage.setItem(THEME_KEY, name)
      document.documentElement.setAttribute('theme', name)
    },
    toggle() {
      this.set(this.get() === 't1' ? 't2' : 't1')
    }
  }
  document.documentElement.setAttribute('theme', $mod.theme.get())

  // 组件导航注册表：外壳菜单与首页共用
  const icon = (body) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
  $mod.navItems = [
    { name: 'btn', labelKey: 'menu.btn', descKey: 'home.desc.btn', icon: icon('<rect x="4" y="6" width="16" height="12" rx="2"></rect>') },
    { name: 'input', labelKey: 'menu.input', descKey: 'home.desc.input', icon: icon('<rect x="4" y="6" width="16" height="12" rx="2"></rect><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="12" y2="14"></line>') },
    { name: 'form', labelKey: 'menu.form', descKey: 'home.desc.form', icon: icon('<rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="12" x2="15" y2="12"></line><line x1="9" y1="15" x2="12" y2="15"></line>') },
    { name: 'card', labelKey: 'menu.card', descKey: 'home.desc.card', icon: icon('<rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line>') },
    { name: 'tag', labelKey: 'menu.tag', descKey: 'home.desc.tag', icon: icon('<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z"></path><circle cx="7" cy="7" r="1"></circle>') },
    { name: 'alert', labelKey: 'menu.alert', descKey: 'home.desc.alert', icon: icon('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>') },
    { name: 'spinner', labelKey: 'menu.spinner', descKey: 'home.desc.spinner', icon: icon('<path d="M21 12a9 9 0 1 1-6.22-8.56"></path>') },
    { name: 'empty', labelKey: 'menu.empty', descKey: 'home.desc.empty', icon: icon('<rect x="3" y="6" width="18" height="14" rx="2"></rect><line x1="8" y1="12" x2="16" y2="12" opacity="0.4"></line><line x1="10" y1="16" x2="14" y2="16" opacity="0.4"></line>') },
    { name: 'tooltip', labelKey: 'menu.tooltip', descKey: 'home.desc.tooltip', icon: icon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>') },
    { name: 'table', labelKey: 'menu.table', descKey: 'home.desc.table', icon: icon('<rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line><line x1="9" y1="4" x2="9" y2="20"></line>') },
    { name: 'pagination', labelKey: 'menu.pagination', descKey: 'home.desc.pagination', icon: icon('<polyline points="9 18 3 12 9 6"></polyline><polyline points="15 18 21 12 15 6"></polyline>') },
    { name: 'badge', labelKey: 'menu.badge', descKey: 'home.desc.badge', icon: icon('<rect x="3" y="8" width="14" height="12" rx="2"></rect><circle cx="17" cy="7" r="4" fill="currentColor" stroke="none"></circle>') },
    { name: 'avatar', labelKey: 'menu.avatar', descKey: 'home.desc.avatar', icon: icon('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>') },
    { name: 'popover', labelKey: 'menu.popover', descKey: 'home.desc.popover', icon: icon('<rect x="3" y="3" width="18" height="12" rx="2"></rect><path d="M12 15l-3 4 3-2 3 2-3-4"></path>') },
    { name: 'skeleton', labelKey: 'menu.skeleton', descKey: 'home.desc.skeleton', icon: icon('<rect x="3" y="4" width="18" height="6" rx="2"></rect><line x1="3" y1="14" x2="21" y2="14" opacity="0.5"></line><line x1="3" y1="18" x2="14" y2="18" opacity="0.5"></line>') },
    { name: 'breadcrumb', labelKey: 'menu.breadcrumb', descKey: 'home.desc.breadcrumb', icon: icon('<path d="M4 6h6M4 12h10M4 18h14"></path><polyline points="14 9 17 12 14 15"></polyline>') },
    { name: 'tree', labelKey: 'menu.tree', descKey: 'home.desc.tree', icon: icon('<path d="M12 3v18M8 7h8M8 12h8M8 17h8"/>') },
    { name: 'sidebar', labelKey: 'menu.sidebar', descKey: 'home.desc.sidebar', icon: icon('<rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>') },
    { name: 'tabs', labelKey: 'menu.tabs', descKey: 'home.desc.tabs', icon: icon('<rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line>') },
    { name: 'dialog', labelKey: 'menu.dialog', descKey: 'home.desc.dialog', icon: icon('<rect x="5" y="5" width="14" height="14" rx="2"></rect><line x1="5" y1="9" x2="19" y2="9"></line>') },
    { name: 'dropdown', labelKey: 'menu.dropdown', descKey: 'home.desc.dropdown', icon: icon('<polyline points="6 9 12 15 18 9"></polyline>') }
  ]

  // 加载 i18n 翻译文件
  await $mod.fetch('/langs.json').then(e => e.json().then(e => $mod.$i18n.load(e)))
}
