<script setup lang="ts">
import { catalog, catalogCopy, company, materials } from '~/data/company'
const selectedKind = ref('granite')
const selectedFractions = reactive<Record<string, string>>({ granite: '20–40' })
const ready = ref(false)
const kindButtons = ref<HTMLButtonElement[]>([])
onMounted(() => { ready.value = true })
const group = computed(() => catalog.find(item => item.id === selectedKind.value) || catalog[0]!)
const fractions = computed(() => materials.filter(item => item.kind === selectedKind.value))
const selected = computed(() => fractions.value.find(item => item.fraction === selectedFractions[selectedKind.value]) || fractions.value[0]!)
function displayFraction(value: string) { return value === '5–20' ? '05–20' : value }
function selectKind(id: string) { selectedKind.value = id }
function navigateKinds(event: KeyboardEvent, index: number) {
  let target: number
  if (event.key === 'ArrowRight') target = (index + 1) % catalog.length
  else if (event.key === 'ArrowLeft') target = (index + catalog.length - 1) % catalog.length
  else if (event.key === 'Home') target = 0
  else if (event.key === 'End') target = catalog.length - 1
  else return
  event.preventDefault()
  selectKind(catalog[target]!.id)
  nextTick(() => kindButtons.value[target]?.focus())
}
const publicAsset = usePublicAsset()
</script>

<template>
  <section id="materials" class="material-catalog page-section" aria-labelledby="catalog-title">
    <div class="page-wrap">
      <div class="section-topline"><p>01 / Каталог</p><span>Виды и фракции</span></div>
      <h2 id="catalog-title" class="catalog-title">{{ catalogCopy.heading }}</h2>
      <div class="material-nav" role="tablist" aria-label="Вид щебня">
        <button v-for="(kind, index) in catalog" :id="`tab-${kind.id}`" :key="kind.id" ref="kindButtons" role="tab" :aria-selected="selectedKind === kind.id" aria-controls="material-panel" :tabindex="selectedKind === kind.id ? 0 : -1" :disabled="!ready" @click="selectKind(kind.id)" @keydown="navigateKinds($event, index)"><span class="material-nav-number">0{{ index + 1 }}</span>{{ kind.label }}</button>
      </div>
      <article id="material-panel" class="material-panel" role="tabpanel" :aria-labelledby="`tab-${selectedKind}`" tabindex="0">
        <div class="material-intro"><h3>{{ group.title }}</h3><p>{{ group.description }}</p></div>
        <div class="fraction-control"><p id="fraction-label">{{ catalogCopy.fractionLabel }}</p><div class="fractions" role="group" aria-labelledby="fraction-label"><button v-for="fraction in fractions" :key="fraction.id" :disabled="!ready" :aria-pressed="fraction.id === selected.id" :aria-label="`Фракция ${displayFraction(fraction.fraction)} мм`" @click="selectedFractions[selectedKind] = fraction.fraction">{{ displayFraction(fraction.fraction) }}</button></div></div>
        <figure class="material-sample"><img :src="publicAsset(selected.image)" :alt="`${group.title}, ${selected.fraction} мм — временное фото образца`" width="800" height="800" loading="lazy"><figcaption><span>{{ group.label }} · {{ displayFraction(selected.fraction) }} мм</span><span>Образец</span></figcaption></figure>
        <div class="material-details" aria-live="polite" aria-atomic="true">
          <p class="material-use">{{ selected.usage }}</p>
          <dl class="material-properties"><div><dt>{{ group.originLabel }}</dt><dd>{{ group.origin }}</dd></div><div><dt>{{ catalogCopy.sizeLabel }}</dt><dd>{{ selected.fraction }} мм</dd></div><div><dt>{{ catalogCopy.supplyLabel }}</dt><dd>{{ catalogCopy.supplyValue }}</dd></div></dl>
          <p class="material-note">{{ catalogCopy.note }}</p><a class="text-action" :href="company.phoneHref">{{ catalogCopy.priceAction }}</a>
        </div>
      </article>
      <p class="catalog-photo-note">{{ catalogCopy.photoNote }}</p>
    </div>
  </section>
</template>
