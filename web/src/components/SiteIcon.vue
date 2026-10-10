<script setup lang="ts">
withDefaults(defineProps<{ name?: string }>(), { name: 'phone' })
const paths: Record<string, string> = {
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.08 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z',
  truck: 'M1 3h14v12H1z M15 8h4l3 4v3h-7 M5.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5 M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  check: 'm5 12 4 4L19 6',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  close: 'm6 6 12 12 M6 18 18 6',
  arrow: 'M3 12h18 M14 5l7 7-7 7',
  yard: 'M3 21V8l9-6 9 6v13H3Z M7 21V11h10v10 M7 15h10 M7 18h10',
  scale: 'M3 21h18 M5 21v-4h14v4 M12 17V7 M5 7h14 M9 3h6v4H9z M7 7l-3 7h6L7 7Z M17 7l-3 7h6l-3-7Z',
  card: 'M2 6h20v14H2z M2 10h20 M6 16h5',
  layers: 'm12 3 10 5-10 5L2 8l10-5 M2 12l10 5 10-5 M2 16l10 5 10-5',
}
</script>
<template><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="icon"><path :d="paths[name] || paths.phone" /></svg></template>

