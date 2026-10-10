<script setup lang="ts">
import { company } from '~/data/company'
const showBar = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  const calls = document.querySelectorAll('[data-prominent-call]')
  const visible = new Map<Element, boolean>()
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) visible.set(entry.target, entry.isIntersecting)
    showBar.value = !Array.from(visible.values()).some(Boolean)
  })
  calls.forEach(call => observer!.observe(call))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div v-show="showBar" class="atlas-mobile-bar" aria-label="Быстрый звонок">
    <a href="#materials">Каталог</a>
    <a :href="company.phoneHref">Позвонить</a>
  </div>
</template>

<style scoped>
.atlas-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 15; display: grid; grid-template-columns: 1fr 1.6fr; gap: 12px; padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); background: #f2efe8; border-top: 1px solid #bfc4b8; color: #242622; font-family: 'Golos Text', sans-serif; }
a { display: flex; justify-content: center; align-items: center; min-height: 48px; font-size: 16px; }
a:last-child { background: #e9b949; font-weight: 600; }
a:focus-visible { outline: 2px solid #465b4a; outline-offset: 3px; }
@media (min-width: 1000px) { .atlas-mobile-bar { display: none!important; } }
</style>
