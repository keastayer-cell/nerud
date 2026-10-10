<script setup lang="ts">
import { hero, company, directions, quickFacts } from '~/data/company'
const publicAsset = usePublicAsset()
</script>

<template>
  <section class="atlas-hero" aria-labelledby="atlas-title">
    <div class="hero-wrap">
      <div class="hero-intro">
        <div class="hero-heading"><p class="atlas-region">{{ company.region }}</p><h1 id="atlas-title">{{ hero.title }}</h1></div>
        <div class="hero-order"><p class="hero-description"><span v-for="line in hero.description" :key="line">{{ line }} </span></p><a class="atlas-phone" :href="company.phoneHref">{{ company.phone }}</a><a class="hero-call" data-prominent-call :href="company.phoneHref">{{ hero.primaryAction }}<SiteIcon name="arrow" /></a><p class="hero-hint">{{ hero.callHint }}</p></div>
      </div>
      <nav class="hero-directions" aria-label="Материалы и спецтехника">
        <a v-for="direction in directions" :key="direction.id" :href="direction.href" class="direction" :class="direction.id" :aria-label="direction.title">
          <div class="direction-image"><img :src="publicAsset(direction.image)" :alt="direction.alt" width="640" height="640" decoding="async"></div>
          <span class="direction-title">{{ direction.title }}</span>
        </a>
      </nav>
    </div>
    <div class="hero-facts"><div class="hero-wrap fact-list"><div v-for="fact in quickFacts" :key="fact.text" class="quick-fact"><SiteIcon :name="fact.icon" /><span>{{ fact.text }}</span></div><a class="quick-fact fact-address" :href="company.mapHref" target="_blank" rel="noopener noreferrer"><SiteIcon name="pin" /><span>{{ hero.shortAddress }}</span></a></div></div>
  </section>
</template>

<style scoped>
.atlas-hero { background: var(--paper); }
.hero-wrap { width: calc(100% - 32px); max-width: 1408px; margin-inline: auto; }
.hero-intro { display: grid; gap: 22px; padding-top: 24px; }
.atlas-region { color: var(--muted); font-size: 11px; letter-spacing: 1.1px; text-transform: uppercase; margin-bottom: 16px; }
h1 { font-size: clamp(38px, 10.25vw, 44px); font-weight: 680; line-height: 1.08; letter-spacing: -.7px; max-width: 100%; }
.hero-description { font-size: 18px; line-height: 1.45; max-width: 440px; }
.atlas-phone { display: inline-flex; align-items: center; min-height: 40px; margin-top: 8px; font-size: 21px; font-weight: 600; letter-spacing: -.3px; }
.hero-call { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 54px; max-width: 100%; margin-top: 8px; padding: 13px 18px; background: var(--ochre); color: var(--ink); font-weight: 600; font-size: 16px; line-height: 1.35; }
.hero-call:hover { background: #d49a2c; }
.hero-call .icon { width: 20px; height: 20px; flex-shrink: 0; }
.hero-hint { font-size: 12px; color: var(--muted); margin-top: 12px; }
.hero-directions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 30px; margin-bottom: 24px; }
.direction { display: flex; flex-direction: column; align-items: center; min-width: 0; padding: 12px 12px 16px; border-top: 1px solid var(--line); }
.direction:nth-child(odd) { border-right: 1px solid var(--line); }
.direction-image { position: relative; height: 104px; width: 100%; }
.direction-image img { position: absolute; inset: 0; width: min(100%, 210px); height: 100%; margin-inline: auto; min-height: 0; object-fit: contain; }
.direction.loader img { width: min(100%, 140px); }
.direction-title { font-size: clamp(18px, 4.8vw, 21px); line-height: 1.2; letter-spacing: -.3px; font-weight: 550; margin-top: 5px; }
.direction:hover .direction-title { text-decoration: underline; text-underline-offset: 5px; }
.hero-facts { border-block: 1px solid var(--line); padding-block: 18px; }
.fact-list { display: grid; gap: 16px; }
.quick-fact { display: flex; align-items: center; gap: 12px; font-size: 14px; line-height: 1.35; }
.quick-fact .icon { width: 25px; height: 25px; flex-shrink: 0; color: var(--muted); }
.fact-address:hover { color: var(--mineral); }
@media(min-width:600px) {
  .hero-wrap { width: calc(100% - 48px); }
  h1 { font-size: 58px; letter-spacing: -1px; max-width: 850px; }
  .hero-order { max-width: 560px; }
  .hero-description { font-size: 22px; }
  .hero-hint { font-size: 13px; }
  .direction-image { height: 126px; }
  .direction.loader img { width: min(100%, 172px); }
  .direction-title { font-size: 22px; }
  .fact-list { grid-template-columns: 1fr 1fr; }
}
@media(min-width:1000px) {
  .hero-wrap { width: calc(100% - 112px); }
  .hero-intro { padding-top: 32px; }
  .atlas-region { font-size: 12px; letter-spacing: 1.3px; margin-bottom: 20px; }
  .hero-directions { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 36px; margin-bottom: 30px; }
  .direction { padding: 14px 20px 16px; border-top: 0; border-right: 1px solid var(--line); }
  .direction:last-child { border-right: 0; }
  .direction-title { font-size: 23px; margin-top: 8px; }
  .fact-list { display: flex; justify-content: space-between; gap: 24px; }
  .quick-fact { font-size: 14px; gap: 12px; }
  .quick-fact+.quick-fact { border-left: 1px solid var(--line); padding-left: 24px; }
}
@media(min-width:1200px) {
  .hero-intro { grid-template-columns: minmax(0, 2.6fr) minmax(0, 1fr); gap: clamp(40px, 3.9vw, 56px); align-items: center; padding-top: 40px; }
  h1 { font-size: clamp(66px, 5.55vw, 84px); line-height: 1.08; letter-spacing: -1.5px; max-width: 970px; }
  .hero-order { padding-top: 36px; }
  .hero-description { font-size: clamp(22px, 1.66vw, 24px); line-height: 1.4; max-width: none; }
  .atlas-phone { display: none; }
  .hero-call { margin-top: 20px; }
  .hero-hint { font-size: 13px; margin-top: 13px; }
  .hero-directions { margin-top: 42px; }
}
</style>
