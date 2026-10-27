import test from 'node:test'
import assert from 'node:assert/strict'

let importSeq = 0

function eventTarget() {
  const listeners = new Map()
  return {
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type).add(listener)
    },
    emit(type, event = {}) {
      for (const listener of [...(listeners.get(type) || [])]) listener(event)
    },
    count(type) {
      return listeners.get(type)?.size || 0
    },
  }
}

function manager() {
  return {
    globals: {},
    define(key, value) {
      this.globals[key] = value
      this[key] = value
    },
  }
}

async function withBrowser(options, run) {
  const descriptors = new Map()
  for (const key of ['window', 'document', 'localStorage']) {
    descriptors.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
  }
  const media = eventTarget()
  media.matches = false
  const windowEvents = eventTarget()
  const values = new Map()
  const attributes = {}
  const documentElement = {
    style: {},
    setAttribute(key, value) { attributes[key] = value },
  }
  globalThis.window = {
    matchMedia: () => media,
    addEventListener: windowEvents.addEventListener,
  }
  globalThis.document = { documentElement }
  globalThis.localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null },
    setItem(key, value) { values.set(key, String(value)) },
  }
  let failed = false
  const mod = {
    $i18n: { load() {} },
    $t: key => key,
    async fetch() {
      if (options.failFirst && !failed) {
        failed = true
        throw new Error('langs unavailable')
      }
      return { json: async () => ({}) }
    },
  }
  try {
    const load = async () => (await import(`../ui/env.js?theme-test=${++importSeq}`)).default
    const init = await load()
    await run({ init, load, mod, media, windowEvents, values, attributes })
  } finally {
    for (const [key, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
    }
  }
}

test('theme runtime is idempotent across repeated env initialization', { concurrency: false }, async () => {
  await withBrowser({}, async ({ init, load, mod, media, windowEvents, values }) => {
    const first = manager()
    await init(mod, first)
    const theme = first.$theme
    let oldNotifications = 0
    let newNotifications = 0
    const offOld = theme.subscribe(() => { oldNotifications++ })

    const second = manager()
    const reloaded = await load()
    await reloaded(mod, second)
    assert.equal(second.$theme, theme, 'reinitialization must reuse the window-scoped service')
    assert.equal(oldNotifications, 0, 'unchanged reinitialization must not notify old subscribers')
    const offNew = second.$theme.subscribe(() => { newNotifications++ })

    values.set('vhtml-ui-theme', 'dark')
    await init(mod, manager())
    assert.equal(oldNotifications, 1, 'changed reinitialization still notifies old subscribers')
    assert.equal(newNotifications, 1, 'changed reinitialization still notifies new subscribers')
    oldNotifications = 0
    newNotifications = 0

    assert.equal(media.count('change'), 1)
    assert.equal(windowEvents.count('storage'), 1)

    theme.set('auto')
    oldNotifications = 0
    newNotifications = 0
    media.matches = true
    media.emit('change')
    assert.equal(oldNotifications, 1, 'old subscriber sees exactly one application')
    assert.equal(newNotifications, 1, 'new subscriber sees exactly one application')

    values.set('vhtml-ui-theme', 'dark')
    windowEvents.emit('storage', { key: 'vhtml-ui-theme' })
    assert.equal(oldNotifications, 2)
    assert.equal(newNotifications, 2)

    offOld()
    offNew()
    theme.set('auto')
    oldNotifications = 0
    newNotifications = 0
    media.emit('change')
    assert.equal(oldNotifications, 0)
    assert.equal(newNotifications, 0)
  })
})

test('failed initialization retry does not add global listeners', { concurrency: false }, async () => {
  await withBrowser({ failFirst: true }, async ({ init, mod, media, windowEvents }) => {
    await assert.rejects(init(mod, manager()), /langs unavailable/)
    assert.equal(media.count('change'), 1)
    assert.equal(windowEvents.count('storage'), 1)

    await init(mod, manager())
    assert.equal(media.count('change'), 1)
    assert.equal(windowEvents.count('storage'), 1)
  })
})
