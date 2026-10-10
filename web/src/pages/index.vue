<script setup lang="ts">
import { company } from '~/data/company'
useSeoMeta({ title: `${company.name} — песок, щебень и грунт | ${company.region}`, description: company.description })
</script>
<template>
  <SiteHeader />
  <main id="main"><AtlasHero /><MaterialCatalog /><SiteSections /></main>
  <footer class="site-footer"><div class="page-wrap footer-inner"><a class="footer-brand" href="#">{{ company.name }}</a><p>Песок · Щебень · Грунт · Спецтехника</p><span>© {{ new Date().getFullYear() }} · Демонстрационный макет</span></div></footer>
  <MobileCallBar />
</template>
