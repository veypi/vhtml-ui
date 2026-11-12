/*
 * vmessage.js — toast/dialog 消息组件（v0.10.3 自 vhtml 内核迁入）
 * Copyright (C) 2025 veypi <i@veypi.com>
 *
 * Distributed under terms of the MIT license.
 *
 * 本文件零内核 import（纯自包含，硬编码样式/位置）。由 vhtml-ui 的
 * env.js 经 all.define('$message', message) 定义到 manager.globals——
 * 模板 `$message.xxx` 经 $mod 层 root 链回落解析。未装载 vhtml-ui
 * env 的模块中 $message 未定义（sandbox 未命中警告），内核不再内置。
 */

const MESSAGE_STYLE_ID = "vhtml-message-style";

const MESSAGE_STYLE = `
  .vmsg-container {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--v-z-toast, 2000);
    width: min(420px, calc(100vw - 32px));
    pointer-events: none;
  }

  .vmsg-item {
    --vmsg-accent: var(--v-color-info);
    /* 独立高明度配色：近白亮底、鲜亮前景与同色系浅阴影。 */
    --vmsg-bg: #eef7ff;
    --vmsg-fg: #0787ff;
    --vmsg-solid: #2aa7ff;
    margin-bottom: 8px;
    padding: 12px;
    border: 1px solid color-mix(in srgb, var(--vmsg-solid) 28%, var(--vmsg-bg));
    border-radius: var(--v-radius-md, 8px);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--vmsg-solid) 14%, transparent);
    background: var(--vmsg-bg);
    color: var(--vmsg-fg);
    transform: translateY(-8px) scale(0.985);
    opacity: 0;
    transition: opacity var(--v-transition-fast, 150ms), transform var(--v-transition-fast, 150ms);
    display: flex;
    align-items: flex-start;
    pointer-events: auto;
  }

  .vmsg-item.show {
    transform: translateY(0);
    opacity: 1;
  }

  .vmsg-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 26px;
    width: 26px;
    height: 26px;
    margin-right: 10px;
    border-radius: 7px;
    background: color-mix(in srgb, var(--vmsg-solid) 22%, var(--vmsg-bg));
    color: var(--vmsg-solid);
    line-height: 1;
  }

  .vmsg-icon svg {
    width: 16px;
    height: 16px;
  }

  .vmsg-content {
    flex: 1;
    padding-top: 2px;
    min-width: 0;
    color: var(--vmsg-fg);
    font-size: 14px;
    line-height: 20px;
  }

  .vmsg-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    margin: 1px -4px -1px 8px;
    border-radius: var(--v-radius-sm, 5px);
    color: var(--v-text-color-tertiary);
    cursor: pointer;
    font-size: 18px;
    transition: color var(--v-transition-fast, 150ms), background-color var(--v-transition-fast, 150ms);
  }

  .vmsg-close:hover {
    color: var(--vmsg-fg);
    background: color-mix(in srgb, var(--vmsg-solid) 12%, var(--vmsg-bg));
  }

  .vmsg-success {
    --vmsg-accent: var(--v-color-success);
    --vmsg-bg: #effff9;
    --vmsg-fg: #00b578;
    --vmsg-solid: #20d99b;
  }
  .vmsg-warning {
    --vmsg-accent: var(--v-color-warning);
    --vmsg-bg: #fffbea;
    --vmsg-fg: #ed9f00;
    --vmsg-solid: #ffb020;
  }
  .vmsg-error {
    --vmsg-accent: var(--v-color-danger);
    --vmsg-bg: #fff1f4;
    --vmsg-fg: #f43f5e;
    --vmsg-solid: #ff5c8a;
  }
  .vmsg-info {
    --vmsg-accent: var(--v-color-info);
    --vmsg-bg: #eef7ff;
    --vmsg-fg: #0787ff;
    --vmsg-solid: #2aa7ff;
  }

  :root[theme="dark"] .vmsg-item {
    --vmsg-bg: hsl(from var(--vmsg-accent) h 32% 20%);
    --vmsg-fg: hsl(from var(--vmsg-accent) h 70% 82%);
    --vmsg-solid: hsl(from var(--vmsg-accent) h 65% 62%);
  }

  .vmsg-overlay {
    position: fixed;
    inset: 0;
    background-color: color-mix(in srgb, var(--v-text-color) 38%, transparent);
    z-index: var(--v-z-modal, 1000);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity var(--v-transition-base, 200ms);
  }

  .vmsg-overlay.show {
    opacity: 1;
  }

  .vmsg-dialog {
    background: var(--v-bg-color);
    color: var(--v-text-color);
    border: 1px solid var(--v-border-color);
    border-radius: var(--v-radius-lg, 12px);
    box-shadow: var(--v-shadow-lg);
    min-width: min(400px, calc(100vw - 32px));
    max-width: min(460px, calc(100vw - 32px));
    overflow: hidden;
    transform: translateY(6px) scale(0.985);
    transition: transform var(--v-transition-fast, 150ms);
  }

  .vmsg-overlay.show .vmsg-dialog {
    transform: scale(1);
  }

  .vmsg-header {
    padding: 10px 14px 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vmsg-dialog-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    border-radius: 7px;
    color: var(--v-color-info);
  }

  .vmsg-dialog-icon svg {
    width: 17px;
    height: 17px;
  }

  .vmsg-title {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--v-text-color-secondary);
    margin: 0;
  }

  .vmsg-close-btn {
    cursor: pointer;
    font-size: 20px;
    color: var(--v-text-color-tertiary);
    border: none;
    background: none;
    padding: 0;
    width: 28px;
    height: 28px;
    border-radius: var(--v-radius-sm, 5px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vmsg-close-btn:hover {
    color: var(--v-text-color);
    background: var(--v-bg-color-secondary);
  }

  .vmsg-body {
    padding: 12px 16px 16px;
    font-size: 15px;
    line-height: 1.65;
  }

  .vmsg-prompt-content {
    margin-bottom: 16px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--v-text-color);
  }

  .vmsg-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--v-border-color);
    border-radius: var(--v-radius-md, 8px);
    background: var(--v-bg-color);
    color: var(--v-text-color);
    font-size: 14px;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .vmsg-input:focus {
    outline: none;
    border-color: var(--v-color-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--v-color-primary) 18%, transparent);
  }

  .vmsg-footer {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
    padding: 4px 14px 12px;
    background: transparent;
  }

  .vmsg-btn {
    min-height: 28px;
    padding: 3px 9px;
    border: 1px solid transparent;
    border-radius: var(--v-radius-sm, 5px);
    font-size: 12px;
    cursor: pointer;
    margin-left: 0;
    transition: background-color var(--v-transition-fast, 150ms), border-color var(--v-transition-fast, 150ms);
  }

  .vmsg-btn-cancel {
    background: transparent;
    color: var(--v-text-color-secondary);
  }

  .vmsg-btn-cancel:hover {
    background: var(--v-bg-color-secondary);
    border-color: transparent;
  }

  .vmsg-btn-confirm {
    background: color-mix(in srgb, var(--v-color-primary) 10%, var(--v-bg-color));
    color: var(--v-color-primary);
    border-color: transparent;
  }

  .vmsg-btn-confirm:hover {
    background: color-mix(in srgb, var(--v-color-primary) 16%, var(--v-bg-color));
    border-color: transparent;
  }
`;

const MESSAGE_ICONS = {
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5"></path><path d="M12 8h.01"></path></svg>',
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 2.5 2.5L16 9"></path></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 4.1 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
  error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6"></path><path d="m15 9-6 6"></path></svg>',
  confirm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9.8 9a2.3 2.3 0 1 1 3.3 2.1c-.8.4-1.1 1-1.1 1.9"></path><path d="M12 17h.01"></path></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"></path></svg>',
};

class MessageRuntime {
  constructor() {
    this.container = null;
    this.messageTimers = new WeakMap();
  }

  ensureReady() {
    if (typeof document === "undefined") {
      return false;
    }
    if (!document.head || !document.body) {
      return false;
    }
    this.ensureStyle();
    this.ensureContainer();
    return true;
  }

  ensureStyle() {
    if (document.getElementById(MESSAGE_STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = MESSAGE_STYLE_ID;
    style.textContent = MESSAGE_STYLE;
    document.head.appendChild(style);
  }

  ensureContainer() {
    if (this.container?.isConnected) {
      return this.container;
    }
    this.container = document.createElement("div");
    this.container.className = "vmsg-container";
    document.body.appendChild(this.container);
    return this.container;
  }

  queue(task) {
    if (this.ensureReady()) {
      return task();
    }
    const run = () => {
      window.removeEventListener("DOMContentLoaded", run);
      task();
    };
    window.addEventListener("DOMContentLoaded", run, { once: true });
    return null;
  }

  schedule(callback, delay) {
    return window.setTimeout(callback, delay);
  }

  trackTimers(node, ids) {
    if (!node || ids.length === 0) {
      return;
    }
    this.messageTimers.set(node, ids);
  }

  clearTimers(node) {
    const timers = this.messageTimers.get(node);
    if (!timers) {
      return;
    }
    timers.forEach((id) => window.clearTimeout(id));
    this.messageTimers.delete(node);
  }
}

class Message {
  constructor(runtime = new MessageRuntime()) {
    this.runtime = runtime;
    this.translator = null;
  }

  setTranslator(translator) {
    this.translator = typeof translator === "function" ? translator : null;
  }

  t(key) {
    if (this.translator) return this.translator(key);
    const defaults = {
      "message.dialogTitle": "提示",
      "message.copied": "已复制",
      "dialog.confirm": "确定",
      "dialog.cancel": "取消",
    };
    return defaults[key] || key;
  }

  createMessage(type, content, options = {}) {
    return this.runtime.queue(() => {
      const { duration = 3000, showClose = true, onClose = null } = options;
      const container = this.runtime.ensureContainer();
      const messageItem = document.createElement("div");
      messageItem.className = `vmsg-item vmsg-${type}`;

      const icon = document.createElement("span");
      icon.className = "vmsg-icon";
      icon.innerHTML = MESSAGE_ICONS[type] || MESSAGE_ICONS.info;

      const contentEl = document.createElement("div");
      contentEl.className = "vmsg-content";
      contentEl.textContent = content;

      messageItem.appendChild(icon);
      messageItem.appendChild(contentEl);

      let closed = false;
      const close = () => {
        if (closed) {
          return;
        }
        closed = true;
        this.removeMessage(messageItem);
        if (typeof onClose === "function") {
          onClose();
        }
      };

      if (showClose) {
        const closeBtn = document.createElement("span");
        closeBtn.className = "vmsg-close";
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", close);
        messageItem.appendChild(closeBtn);
      }

      container.appendChild(messageItem);

      const showTimer = this.runtime.schedule(() => {
        messageItem.classList.add("show");
      }, 10);
      const timers = [showTimer];
      if (duration > 0) {
        timers.push(this.runtime.schedule(close, duration));
      }
      this.runtime.trackTimers(messageItem, timers);
      return messageItem;
    });
  }

  removeMessage(messageItem) {
    if (!messageItem || !messageItem.parentNode) {
      return;
    }
    this.runtime.clearTimers(messageItem);
    messageItem.classList.remove("show");
    const removeTimer = this.runtime.schedule(() => {
      if (messageItem.parentNode) {
        messageItem.parentNode.removeChild(messageItem);
      }
    }, 300);
    this.runtime.trackTimers(messageItem, [removeTimer]);
  }
  copy(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      this.success(this.t("message.copied"));
    });
  }

  success(content, options = {}) {
    return this.createMessage("success", content, options);
  }

  warning(content, options = {}) {
    return this.createMessage("warning", content, options);
  }

  error(content, options = {}) {
    return this.createMessage("error", content, options);
  }

  info(content, options = {}) {
    return this.createMessage("info", content, options);
  }

  _prompt(content, options = {}) {
    return new Promise((resolve) => {
      this.runtime.queue(() => {
        const {
          title = "",
          type = "confirm",
          inputValue = "",
          confirmText = this.t("dialog.confirm"),
          cancelText = this.t("dialog.cancel"),
          onConfirm = null,
          onCancel = null,
        } = options;

        const overlay = document.createElement("div");
        overlay.className = "vmsg-overlay";

        const dialog = document.createElement("div");
        dialog.className = "vmsg-dialog";

        const header = document.createElement("div");
        header.className = "vmsg-header";

        const dialogIcon = document.createElement("span");
        dialogIcon.className = "vmsg-dialog-icon";
        dialogIcon.innerHTML = MESSAGE_ICONS[type === "input" ? "edit" : "confirm"];

        const titleEl = document.createElement("h3");
        titleEl.className = "vmsg-title";
        // 输入弹窗的说明就是任务标题；显式 title 仍保留“标题 + 详细说明”形态。
        titleEl.textContent = title || (type === "input" ? content : this.t("message.dialogTitle"));

        const closeBtn = document.createElement("button");
        closeBtn.className = "vmsg-close-btn";
        closeBtn.innerHTML = "&times;";

        header.appendChild(dialogIcon);
        header.appendChild(titleEl);
        header.appendChild(closeBtn);

        const body = document.createElement("div");
        body.className = "vmsg-body";

        if (type !== "input" || title) {
          const contentEl = document.createElement("div");
          contentEl.className = "vmsg-prompt-content";
          contentEl.textContent = content;
          body.appendChild(contentEl);
        }

        let inputEl = null;
        if (type === "input") {
          inputEl = document.createElement("input");
          inputEl.className = "vmsg-input";
          inputEl.type = "text";
          inputEl.value = inputValue;
          body.appendChild(inputEl);
        }

        const footer = document.createElement("div");
        footer.className = "vmsg-footer";

        const cancelBtn = document.createElement("button");
        cancelBtn.className = "vmsg-btn vmsg-btn-cancel";
        cancelBtn.textContent = cancelText;

        const confirmBtn = document.createElement("button");
        confirmBtn.className = "vmsg-btn vmsg-btn-confirm";
        confirmBtn.textContent = confirmText;

        footer.appendChild(cancelBtn);
        footer.appendChild(confirmBtn);

        dialog.appendChild(header);
        dialog.appendChild(body);
        dialog.appendChild(footer);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const cleanup = [];
        let settled = false;

        const finalize = (callback) => {
          if (settled) {
            return;
          }
          settled = true;
          overlay.classList.remove("show");
          cleanup.splice(0).forEach((fn) => fn());
          window.setTimeout(() => {
            overlay.remove();
            callback();
          }, 300);
        };

        // 空值语义：取消是正常用户行为，不走 error 通道——
        // confirm 取消 → false；prompt 取消 → null（空字符串输入是合法值，用 null 区分）
        const cancel = () => {
          finalize(() => {
            if (typeof onCancel === "function") {
              onCancel();
            }
            resolve(inputEl ? null : false);
          });
        };

        const confirm = () => {
          const value = inputEl ? inputEl.value : true;
          finalize(() => {
            resolve(value);
            if (typeof onConfirm === "function") {
              onConfirm(value);
            }
          });
        };

        const escHandler = (event) => {
          if (event.defaultPrevented || event.isComposing || event.keyCode === 229) return;
          if (event.key !== "Escape" && event.key !== "Enter") return;
          // 弹窗接管按键，避免底层输入框再次发送或执行斜杠指令。
          event.preventDefault();
          event.stopPropagation();
          if (event.repeat) return;
          if (event.key === "Escape") {
            cancel();
          } else if (event.key === "Enter") {
            // 回车确认（prompt 输入框内回车同样确认）；settled 守卫防与按钮 click 双触发
            confirm();
          }
        };

        cleanup.push(() => document.removeEventListener("keydown", escHandler, true));

        closeBtn.addEventListener("click", cancel);
        cancelBtn.addEventListener("click", cancel);
        confirmBtn.addEventListener("click", confirm);
        overlay.addEventListener("click", (event) => {
          if (event.target === overlay) {
            cancel();
          }
        });

        const showTimer = this.runtime.schedule(() => {
          overlay.classList.add("show");
          // 打开弹窗的 Enter 仍在传播；显示后才监听，不能用同一次按键确认。
          document.addEventListener("keydown", escHandler, true);
        }, 10);
        cleanup.push(() => window.clearTimeout(showTimer));

        if (inputEl) {
          const focusTimer = this.runtime.schedule(() => {
            inputEl.focus();
            inputEl.select();
          }, 300);
          cleanup.push(() => window.clearTimeout(focusTimer));
        }
      });
    });
  }

  confirm(content, options = {}) {
    return this._prompt(content, {
      ...options,
      type: "confirm",
    });
  }

  prompt(message, content, options = {}) {
    return this._prompt(message, {
      ...options,
      type: "input",
      inputValue: content,
    });
  }
}

const message = new Message();

export default message;
export { Message, MessageRuntime };
