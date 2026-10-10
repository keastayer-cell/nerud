<script setup lang="ts">
import { company } from '~/data/company'
const open = ref(false)
const ready = ref(false)
onMounted(() => { ready.value = true })
const menuButton = ref<HTMLButtonElement | null>(null)
const links = [{ href: '#materials', label: 'Материалы' }, { href: '#equipment', label: 'Спецтехника' }, { href: '#delivery', label: 'Доставка' }, { href: '#contacts', label: 'Контакты' }]
function closeMenu() { open.value = false; menuButton.value?.focus() }
</script>

<template>
  <a class="skip-link" href="#main">Перейти к содержимому</a>
  <header class="atlas-header" @keydown.esc="closeMenu">
    <div class="atlas-header-inner">
      <a class="atlas-brand" href="#" :aria-label="`${company.name} — на главную`"><BrandMark /><span class="brand-copy"><strong>{{ company.wordmark }}</strong><span>{{ company.descriptor }}</span></span></a>
      <nav class="atlas-desktop-nav" aria-label="Основная навигация"><a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a></nav>
      <a class="atlas-header-phone" :href="company.phoneHref"><span><SiteIcon name="phone" />{{ company.phone }}</span><small>Стоимость по звонку</small></a>
      <button ref="menuButton" class="atlas-menu-toggle" aria-label="Меню" :disabled="!ready" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open"><SiteIcon :name="open ? 'close' : 'menu'" /></button>
    </div>
    <nav v-if="open" id="mobile-menu" class="atlas-mobile-menu" aria-label="Мобильная навигация"><a v-for="link in links" :key="link.href" :href="link.href" @click="open = false">{{ link.label }}</a><a :href="company.phoneHref">{{ company.phone }}</a></nav>
  </header>
</template>

<style scoped>
.atlas-header { position: sticky; top: 0; z-index: 10; background: var(--paper); color: var(--ink); }
.atlas-header-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: calc(100% - 32px); max-width: 1408px; margin-inline: auto; min-height: 72px; }
.atlas-brand { display: flex; align-items: center; gap: 7px; min-width: 0; }
.brand-copy { display: grid; gap: 4px; }
.brand-copy strong { font-size: 20px; font-weight: 700; letter-spacing: -.5px; line-height: 1; }
.brand-copy>span { font-size: 9px; line-height: 1.3; color: var(--muted); }
.atlas-desktop-nav, .atlas-header-phone { display: none; }
.atlas-menu-toggle { display: grid; place-items: center; flex-shrink: 0; width: 44px; height: 44px; border: 1px solid var(--line); background: transparent; color: var(--ink); }
.atlas-mobile-menu { padding: 5px 16px 15px; border-bottom: 1px solid var(--line); }
.atlas-mobile-menu a { display: block; border-top: 1px solid var(--line); padding: 15px 0; font-size: 16px; }
@media (min-width: 600px) {
  .atlas-header-inner { width: calc(100% - 48px); min-height: 82px; }
  .brand-copy strong { font-size: 25px; }
  .brand-copy>span { font-size: 12px; }
  .atlas-mobile-menu { padding-inline: 24px; }
}
@media (min-width: 1200px) {
  .atlas-header-inner { width: calc(100% - 112px); min-height: 100px; gap: 24px; }
  .atlas-brand { gap: 12px; }
  .brand-copy strong { font-size: clamp(27px, 2.25vw, 34px); letter-spacing: -.7px; }
  .brand-copy>span { font-size: 14px; }
  .atlas-desktop-nav { display: flex; align-items: center; gap: clamp(22px, 2.5vw, 42px); font-size: 16px; }
  .atlas-desktop-nav a { padding-block: 15px; }
  .atlas-desktop-nav a:hover { color: var(--mineral); }
  .atlas-header-phone { display: grid; gap: 4px; white-space: nowrap; text-align: right; }
  .atlas-header-phone>span { display: flex; align-items: center; gap: 12px; font-size: clamp(23px, 1.95vw, 30px); font-weight: 600; letter-spacing: -.4px; }
  .atlas-header-phone .icon { width: 20px; height: 20px; color: var(--muted); }
  .atlas-header-phone small { font-size: 12px; color: var(--muted); }
  .atlas-menu-toggle { display: none; }
}
</style>
