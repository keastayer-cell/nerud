<script setup lang="ts">
import { hero as atlas, company } from '~/data/company'
const publicAsset = usePublicAsset()
</script>

<template>
  <section class="atlas-hero" aria-labelledby="atlas-title">
    <div class="atlas-wrap atlas-hero-layout">
      <div class="atlas-hero-copy">
        <p class="atlas-region">{{ company.region }}</p>
        <h1 id="atlas-title"><span v-for="line in atlas.title" :key="line">{{ line }}</span></h1>
        <p class="atlas-description">{{ atlas.description }}</p>
        <a class="atlas-phone" :href="company.phoneHref">{{ company.phone }}</a>
        <a class="atlas-primary" data-prominent-call :href="company.phoneHref">{{ atlas.primaryAction }}</a>
        <p class="atlas-call-hint">{{ atlas.callHint }}</p>
        <a class="atlas-secondary" href="#materials">{{ atlas.secondaryAction }}</a>
      </div>
      <figure class="atlas-hero-sample">
        <div class="atlas-hero-image">
          <img :src="publicAsset(atlas.visual.src)" :alt="atlas.visual.alt" width="800" height="800" fetchpriority="high">
          <div class="atlas-sample-caption">
            <p>{{ atlas.visual.material }}</p>
            <span class="atlas-sample-fraction">{{ atlas.visual.fraction }}<small>мм</small></span>
          </div>
        </div>
        <figcaption><span>{{ atlas.visual.marking }}</span><span>{{ atlas.visual.note }}</span></figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.atlas-hero { background: #f2efe8; color: #242622; font-family: 'Golos Text', sans-serif; }
.atlas-wrap { width: calc(100% - 32px); max-width: 1344px; margin-inline: auto; }
.atlas-hero-layout { display: grid; padding-top: 24px; padding-bottom: 32px; gap: 26px; }
.atlas-region { color: #75471f; font-size: 14px; line-height: 1.4; margin-bottom: 16px; }
h1 { font-size: clamp(40px, 10.8vw, 44px); font-weight: 750; line-height: 1.02; letter-spacing: -1.9px; }
h1 span { display: block; }
.atlas-description { margin-top: 18px; max-width: 350px; font-size: 16px; line-height: 1.5; color: #5e574e; }
.atlas-phone { display: inline-block; font-size: 20px; letter-spacing: -.5px; font-weight: 600; line-height: 1.4; margin-top: 18px; }
.atlas-primary { display: flex; justify-content: center; align-items: center; min-height: 58px; padding: 14px 16px; margin-top: 14px; background: #e2ad42; color: #242622; font-size: 16px; font-weight: 600; line-height: 1.35; text-align: center; }
.atlas-primary:hover { background: #d49a2c; }
.atlas-call-hint { margin-top: 10px; font-size: 13px; color: #6b6258; line-height: 1.45; max-width: 330px; }
.atlas-secondary { display: inline-flex; align-items: center; min-height: 44px; font-size: 16px; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: #75471f; margin-top: 7px; }
.atlas-secondary:hover, .atlas-phone:hover { color: #75471f; }
.atlas-hero-sample { margin: 0; }
.atlas-hero-image { position: relative; height: 266px; background: #75471f; overflow: hidden; }
.atlas-hero-image img { height: 100%; width: 100%; object-fit: cover; }
.atlas-hero-image::after { content: ''; position: absolute; inset: 35% 0 0; background: linear-gradient(transparent, rgb(20 26 20 / 75%)); pointer-events: none; }
.atlas-sample-caption { position: absolute; left: 20px; bottom: 19px; right: 20px; z-index: 1; color: #f2efe8; }
.atlas-sample-caption p { font-size: 16px; line-height: 1.3; }
.atlas-sample-fraction { display: flex; align-items: baseline; gap: 10px; font-size: 66px; letter-spacing: -3px; font-weight: 600; line-height: 1.1; margin-top: 8px; font-variant-numeric: tabular-nums; }
.atlas-sample-fraction small { font-size: 15px; font-weight: 400; letter-spacing: 0; }
figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 5px 15px; margin-top: 10px; font-size: 11px; line-height: 1.5; color: #6b6258; }
figcaption span:first-child { text-transform: uppercase; letter-spacing: .8px; }
a:focus-visible { outline: 2px solid #75471f; outline-offset: 4px; }
@media (min-width: 600px) {
  .atlas-wrap { width: calc(100% - 48px); }
  .atlas-hero-copy { max-width: 560px; }
  h1 { font-size: 60px; }
  .atlas-description { max-width: 460px; font-size: 18px; }
  .atlas-primary { max-width: 400px; }
  .atlas-hero-image { height: 420px; }
}
@media (min-width: 1000px) {
  .atlas-wrap { width: calc(100% - 96px); }
  .atlas-hero-layout { grid-template-columns: minmax(0, .4fr) minmax(0, .6fr); gap: 40px; padding-top: 38px; padding-bottom: 48px; align-items: stretch; }
  .atlas-hero-copy { padding-top: 15px; padding-bottom: 10px; }
  .atlas-region { margin-bottom: 25px; font-size: 15px; }
  h1 { font-size: clamp(49px, 4.7vw, 70px); letter-spacing: -3px; line-height: 1.02; }
  .atlas-description { margin-top: 24px; font-size: 18px; max-width: 390px; }
  .atlas-phone { margin-top: 25px; font-size: 23px; }
  .atlas-primary { margin-top: 18px; max-width: 100%; min-height: 62px; font-size: 16px; }
  .atlas-call-hint { font-size: 14px; margin-top: 12px; max-width: 370px; }
  .atlas-secondary { margin-top: 12px; }
  .atlas-hero-sample { display: flex; flex-direction: column; }
  .atlas-hero-image { height: clamp(550px, 42vw, 620px); flex: initial; min-height: 0; }
  .atlas-sample-caption { left: 32px; right: 32px; bottom: 28px; }
  .atlas-sample-caption p { font-size: 21px; }
  .atlas-sample-fraction { font-size: clamp(95px, 9vw, 138px); letter-spacing: -6px; margin-top: 10px; }
  .atlas-sample-fraction small { font-size: 20px; }
  figcaption { font-size: 11px; margin-top: 12px; }
}
</style>
