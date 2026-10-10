<script setup lang="ts">
import { company } from '~/data/company'
useSeoMeta({ title: `${company.name} — щебень с доставкой | ${company.region}`, description: 'Гранитный, гравийный, известняковый и вторичный щебень. Виды, фракции и расчёт доставки по телефону.' })
</script>
<template>
  <SiteHeader />
  <main id="main"><AtlasHero /><MaterialCatalog /><SiteSections /></main>
  <footer class="site-footer"><div class="page-wrap footer-inner"><a class="footer-brand" href="#">{{ company.name }}</a><p>Щебень · Доставка · Самовывоз</p><span>© {{ new Date().getFullYear() }} · Демонстрационный макет</span></div></footer>
  <MobileCallBar />
</template>
