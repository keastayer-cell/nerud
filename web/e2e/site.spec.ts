import { test, expect } from '@playwright/test'

test('complete site: materials, fractions, navigation and mobile call flow', async ({ page }, testInfo) => {
  const errors: string[] = []
  const appBaseURL = process.env.NUXT_APP_BASE_URL || '/'
  const failedAssets: string[] = []
  page.on('response', response => { if (response.status() >= 400) failedAssets.push(response.url()) })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('./')
  await expect(page.getByRole('tab', { name: /Гранитный/ })).toBeEnabled()
  await page.evaluate(() => document.fonts.ready)
  const overflow = async () => expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
  await overflow()
  await expect(page.locator('.hero-directions .direction')).toHaveCount(4)
  for (const image of await page.locator('.hero-directions img').all()) {
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate(img => (img as HTMLImageElement).naturalWidth > 0)).toBeTruthy()
  }
  for (const direction of await page.locator('.hero-directions .direction').all()) {
    const image = await direction.locator('img').boundingBox()
    const title = await direction.locator('.direction-title').boundingBox()
    expect(image!.y + image!.height).toBeLessThanOrEqual(title!.y + 1)
  }
  await expect(page.locator('body')).not.toContainText('Атлас материала')
  for (const [name, id] of [['Песок', 'sand'], ['Щебень', 'stone'], ['Грунт', 'soil'], ['Спецтехника', 'equipment']]) {
    await page.locator('.hero-directions').getByRole('link', {name, exact: true}).click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(page.locator(`#${id}`)).toBeInViewport()
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: `../output/final-${testInfo.project.name}-hero.png` })
  const mobile = testInfo.project.name !== 'desktop'
  const call = page.getByRole('link', { name: 'Позвонить и узнать цену', exact: true })
  await expect(call).toHaveAttribute('href', 'tel:+78312322333')
  if (mobile) {
    await call.scrollIntoViewIfNeeded()
    await expect(page.locator('.atlas-mobile-bar')).toBeHidden()
    await page.getByRole('button', { name: 'Меню', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Меню', exact: true })).toHaveAttribute('aria-expanded', 'true')
    await page.locator('#mobile-menu').getByRole('link', { name: 'Материалы' }).click()
    await expect(page.locator('#mobile-menu')).toHaveCount(0)
  } else await page.locator('.hero-directions').getByRole('link', { name: 'Щебень', exact: true }).click()
  const kinds = [
    { label: 'Гранитный', id: 'granite', fractions: ['05–20', '20–40', '40–70'] },
    { label: 'Гравийный', id: 'gravel', fractions: ['05–20'] },
    { label: 'Известняковый', id: 'limestone', fractions: ['20–40'] },
    { label: 'Вторичный', id: 'recycled', fractions: ['20–40'] },
  ]
  for (const kind of kinds) {
    const tab = page.getByRole('tab', { name: new RegExp(kind.label) })
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('.material-panel')).toHaveCount(1)
    await expect(page.locator('.material-intro h3')).toContainText(kind.label)
    await expect(page.locator('.fractions button')).toHaveCount(kind.fractions.length)
    for (const fraction of kind.fractions) {
      const choice = page.getByRole('button', { name: `Фракция ${fraction} мм`, exact: true })
      await choice.click()
      await expect(choice).toHaveAttribute('aria-pressed', 'true')
      await expect(page.locator('.fractions button[aria-pressed=true]')).toHaveCount(1)
      const sample = page.locator('.material-sample img')
      const filename = fraction === '05–20' ? '5-20' : fraction.replace('–', '-')
      await expect(sample).toHaveAttribute('src', `${appBaseURL}images/${kind.id}-${filename}.webp`)
      await expect(sample).toHaveJSProperty('complete', true)
      expect(await sample.evaluate(img => (img as HTMLImageElement).naturalWidth > 0)).toBeTruthy()
      await expect(page.locator('.material-properties')).toContainText(fraction === '05–20' ? '5–20 мм' : `${fraction} мм`)
      await overflow()
    }
  }
  await page.getByRole('tab', { name: /Гранитный/ }).click()
  await expect(page.getByRole('button', { name: 'Фракция 40–70 мм', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Фракция 20–40 мм', exact: true }).click()
  if (mobile) await expect(page.locator('.atlas-mobile-bar')).toBeVisible()
  const style = '.atlas-header, .atlas-mobile-bar, .skip-link { visibility: hidden !important; }'
  await page.locator('.material-catalog').screenshot({ path: `../output/final-${testInfo.project.name}-catalog.png`, style })
  const graniteTab = page.getByRole('tab', { name: /Гранитный/ })
  await graniteTab.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: /Гравийный/ })).toBeFocused()
  await expect(page.getByRole('tab', { name: /Гравийный/ })).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('Home')
  await expect(graniteTab).toHaveAttribute('aria-selected', 'true')
  for (const [label, id] of [['Материалы', 'materials'], ['Спецтехника', 'equipment'], ['Доставка', 'delivery'], ['Контакты', 'contacts']]) {
    if (mobile) await page.getByRole('button', { name: 'Меню', exact: true }).click()
    const nav = page.locator(mobile ? '#mobile-menu' : '.atlas-desktop-nav')
    await nav.getByRole('link', { name: label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(page.locator(`#${id}`)).toBeInViewport()
    await overflow()
  }
  await expect(page.locator('.route-link')).toHaveAttribute('href', /^https:\/\/yandex\.ru\/maps\/\?text=/)
  await expect(page.locator('#contacts')).toContainText('Производственная, 11')
  await expect(page.locator('.additional-materials article')).toHaveCount(2)
  await expect(page.locator('.equipment-strip')).toContainText('Фронтальные погрузчики')
  await expect(page.locator('#about')).toContainText('Собственные автомобильные весы')
  await expect(page.locator('body')).not.toContainText('ОПОРА')
  await expect(page.locator('body')).not.toContainText('+7 (000)')
  await page.locator('#contacts [data-prominent-call]').scrollIntoViewIfNeeded()
  if (mobile) await expect(page.locator('.atlas-mobile-bar')).toBeHidden()
  await page.locator('details').first().locator('summary').click()
  await expect(page.locator('details').first()).toHaveAttribute('open', '')
  await page.locator('details').first().locator('summary').click()
  await page.locator('#delivery').screenshot({ path: `../output/final-${testInfo.project.name}-delivery.png`, style })
  await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo(0, 0) })
  await page.screenshot({ path: `../output/final-${testInfo.project.name}.png`, fullPage: true })
  expect(errors).toEqual([])
  expect(failedAssets).toEqual([])
})
