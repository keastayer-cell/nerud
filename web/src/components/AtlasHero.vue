<script setup lang="ts">
import { hero, company, directions, quickFacts } from '~/data/company'
const publicAsset = usePublicAsset()
</script>

<template>
  <section class="atlas-hero" aria-labelledby="atlas-title">
    <div class="hero-wrap">
      <div class="hero-intro">
        <div class="hero-heading"><p class="atlas-region">{{ company.region }}</p><h1 id="atlas-title"><span v-for="(line, index) in hero.title" :key="line">{{ line }}<b v-if="index === hero.title.length - 1" aria-hidden="true">.</b></span></h1></div>
        <div class="hero-order"><p class="hero-description"><span v-for="line in hero.description" :key="line">{{ line }} </span></p><a class="atlas-phone" :href="company.phoneHref">{{ company.phone }}</a><a class="hero-call" data-prominent-call :href="company.phoneHref">{{ hero.primaryAction }}<SiteIcon name="arrow" /></a><p class="hero-hint">{{ hero.callHint }}</p></div>
      </div>
      <nav class="hero-directions" aria-label="Материалы и спецтехника">
        <a v-for="(direction, index) in directions" :key="direction.id" :href="direction.href" class="direction" :aria-label="direction.title">
          <span class="direction-number">0{{ index + 1 }}</span>
          <div class="direction-image"><img :src="publicAsset(direction.image)" :alt="direction.alt" width="640" height="640" decoding="async"></div>
          <span class="direction-title">{{ direction.title }}</span><SiteIcon name="arrow" />
        </a>
      </nav>
    </div>
    <div class="hero-facts"><div class="hero-wrap fact-list"><div v-for="fact in quickFacts" :key="fact.text" class="quick-fact"><SiteIcon :name="fact.icon" /><span>{{ fact.text }}</span></div><a class="quick-fact fact-address" :href="company.mapHref" target="_blank" rel="noopener noreferrer"><SiteIcon name="pin" /><span>{{ hero.shortAddress }}</span></a></div></div>
  </section>
</template>

<style scoped>
.atlas-hero { background: var(--paper); }
.hero-wrap { width: calc(100% - 32px); max-width: 1408px; margin-inline: auto; }
.hero-intro { display: grid; gap: 22px; padding-top: 23px; }
.atlas-region { color: var(--mineral); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 15px; }
h1 { font-size: clamp(40px, 10.7vw, 47px); font-weight: 850; line-height: .99; letter-spacing: -1.9px; }
h1 span { display: block; }
h1 b { color: var(--mineral); }
.hero-description { font-size: 18px; line-height: 1.4; max-width: 440px; }
.atlas-phone { display: inline-flex; align-items: center; min-height: 40px; margin-top: 10px; font-size: 22px; font-weight: 650; letter-spacing: -.5px; }
.hero-call { display: flex; align-items: center; justify-content: space-between; gap: 15px; min-height: 58px; margin-top: 8px; padding: 14px 18px; background: #a96518; color: #fffaf2; font-weight: 650; font-size: 16px; line-height: 1.35; }
.hero-call:hover { background: #8b5012; }
.hero-call .icon { width: 27px; height: 27px; flex-shrink: 0; }
.hero-hint { font-size: 12px; color: var(--muted); margin-top: 12px; }
.hero-directions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 28px; margin-bottom: 25px; }
.direction { display: flex; flex-direction: column; min-width: 0; padding: 14px 12px 15px; border-top: 1px solid var(--line); }
.direction:nth-child(odd) { border-right: 1px solid var(--line); padding-left: 0; }
.direction:nth-child(even) { padding-right: 0; }
.direction-number { color: #754017; font-size: 12px; font-weight: 600; }
.direction-image { position: relative; height: clamp(124px, 36vw, 165px); margin-inline: -7px; }
.direction-image img { position: absolute; inset: 0; width: 100%; height: 100%; min-height: 0; object-fit: contain; }
.direction-title { font-size: clamp(19px, 5.4vw, 24px); line-height: 1.1; letter-spacing: -.7px; font-weight: 750; margin-top: 4px; }
.direction>.icon { margin-top: 10px; width: 28px; height: 24px; color: var(--mineral); transition: transform .18s; }
.direction:hover>.icon { transform: translateX(7px); }
.hero-facts { border-block: 1px solid var(--line); padding-block: 20px; }
.fact-list { display: grid; gap: 16px; }
.quick-fact { display: flex; align-items: center; gap: 12px; font-size: 14px; line-height: 1.35; }
.quick-fact .icon { width: 27px; height: 27px; flex-shrink: 0; color: #754017; }
.fact-address:hover { color: var(--mineral); }
@media(min-width:600px) {
  .hero-wrap { width: calc(100% - 48px); }
  h1 { font-size: 74px; letter-spacing: -3.7px; }
  .hero-order { max-width: 560px; }
  .hero-description { font-size: 23px; }
  .hero-call { font-size: 20px; min-height: 68px; }
  .hero-hint { font-size: 15px; }
  .direction-image { height: 260px; }
  .direction-title { font-size: 30px; }
  .fact-list { grid-template-columns: 1fr 1fr; }
}
@media(min-width:1000px) {
  .hero-wrap { width: calc(100% - 112px); }
  .hero-intro { grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 60px; padding-top: 24px; align-items: center; }
  .atlas-region { font-size: 15px; letter-spacing: 2.2px; margin-bottom: 14px; }
  h1 { font-size: clamp(68px, 7.1vw, 106px); line-height: .94; letter-spacing: -4.5px; }
  .hero-order { padding-top: 32px; }
  .hero-description { font-size: clamp(23px, 2.2vw, 34px); line-height: 1.2; max-width: none; }
  .hero-description span { display: block; }

  .hero-call { font-size: clamp(18px, 1.7vw, 26px); margin-top: 30px; min-height: 82px; padding-inline: 25px; }
  .hero-call .icon { width: 33px; height: 33px; }
  .hero-hint { font-size: 17px; margin-top: 21px; }
  .hero-directions { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 43px; margin-bottom: 32px; }
  .direction { padding: 13px 25px 12px; border-top: 0; border-right: 1px solid var(--line); }
  .direction:nth-child(odd) { padding-left: 25px; }
  .direction:first-child { padding-left: 0; }
  .direction:last-child { padding-right: 0; border-right: 0; }
  .direction-number { font-size: 16px; }
  .direction-image { height: clamp(210px, 16vw, 255px); margin-inline: -25px; }
  .direction-title { font-size: clamp(25px, 2.3vw, 35px); letter-spacing: -1px; margin-top: 2px; }
  .direction>.icon { width: 32px; height: 28px; margin-top: 15px; }
  .hero-facts { padding-block: 24px; }
  .fact-list { display: flex; justify-content: space-between; gap: 24px; }
  .quick-fact { font-size: 14px; gap: 14px; }
  .quick-fact+.quick-fact { border-left: 1px solid var(--line); padding-left: 24px; }
  .quick-fact .icon { width: 30px; height: 30px; }
}
@media(min-width:1200px) { .atlas-phone { display: none; } }
</style>
