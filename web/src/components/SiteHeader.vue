<script setup lang="ts">
import { company } from '~/data/company'
const open = ref(false)
const ready = ref(false)
onMounted(() => { ready.value = true })
const menuButton = ref<HTMLButtonElement | null>(null)
const links = [{ href: '#materials', label: 'Каталог щебня' }, { href: '#delivery', label: 'Доставка' }, { href: '#about', label: 'О компании' }, { href: '#faq', label: 'Вопросы' }, { href: '#contacts', label: 'Контакты' }]
function closeMenu() { open.value = false; menuButton.value?.focus() }
</script>

<template>
  <a class="skip-link" href="#main">Перейти к содержимому</a>
  <header class="atlas-header" @keydown.esc="closeMenu">
    <div class="atlas-header-inner">
      <a class="atlas-brand" href="#" :aria-label="`${company.name} — на главную`">{{ company.name }}<span>{{ company.descriptor }}</span></a>
      <nav class="atlas-desktop-nav" aria-label="Основная навигация"><a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a></nav>
      <a class="atlas-header-phone" :href="company.phoneHref">{{ company.phone }}</a>
      <button ref="menuButton" class="atlas-menu-toggle" aria-label="Меню" :disabled="!ready" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open"><SiteIcon :name="open ? 'close' : 'menu'" /></button>
    </div>
    <nav v-if="open" id="mobile-menu" class="atlas-mobile-menu" aria-label="Мобильная навигация"><a v-for="link in links" :key="link.href" :href="link.href" @click="open = false">{{ link.label }}</a><a :href="company.phoneHref">{{ company.phone }}</a></nav>
  </header>
</template>

<style scoped>
.atlas-header { position: sticky; top: 0; z-index: 10; background: #f2efe8; border-bottom: 1px solid #d1d3c8; color: #242622; font-family: 'Golos Text', sans-serif; }
.atlas-header-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; width: calc(100% - 32px); max-width: 1344px; margin-inline: auto; min-height: 66px; }
.atlas-brand { font-size: 28px; font-weight: 750; letter-spacing: -1.4px; line-height: 1; }
.atlas-brand span { display: block; color: #465b4a; font-size: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
.atlas-desktop-nav, .atlas-header-phone { display: none; }
.atlas-menu-toggle { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid #bfc4b8; background: transparent; color: #242622; }
.atlas-mobile-menu { padding: 5px 16px 15px; }
.atlas-mobile-menu a { display: block; border-top: 1px solid #d1d3c8; padding: 15px 0; font-size: 16px; }
a:focus-visible, button:focus-visible { outline: 2px solid #465b4a; outline-offset: 4px; }
@media (min-width: 600px) {
  .atlas-header-inner { width: calc(100% - 48px); }
  .atlas-mobile-menu { padding-inline: 24px; }
}
@media (min-width: 1000px) {
  .atlas-header-inner { width: calc(100% - 96px); min-height: 88px; }
  .atlas-brand { font-size: 33px; }
  .atlas-brand span { font-size: 9px; }
  .atlas-desktop-nav { display: flex; align-items: center; gap: 26px; font-size: 14px; }
  .atlas-desktop-nav a { padding-block: 15px; }
  .atlas-header-phone { display: block; font-size: 18px; font-weight: 500; white-space: nowrap; }
  .atlas-menu-toggle { display: none; }
}
</style>
