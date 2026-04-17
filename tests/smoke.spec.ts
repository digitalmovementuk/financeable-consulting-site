import type { Page } from '@playwright/test'
import { devices, expect, test } from '@playwright/test'

const heroHeading =
  'Senior finance support for businesses that need clearer monthly decisions.'
const featuresHeading = 'Power up your finance rhythm.'
const processHeading = /Your path from delayed reporting to live monthly decisions/i
const firstFaqAnswer = /founder-led businesses, growing SMEs, and small leadership teams/i
const faqQuestion = 'What services does Financeable Consulting offer?'
const faqAnswer = /The core services are Monthly CFO, Financial Reporting, and Cashflow Management/i
const mobileDevice = devices['Pixel 7']

async function openHomepage(page: Page) {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: heroHeading,
    }),
  ).toBeVisible()
}

test('desktop hero and anchor navigation keep key sections reachable', async ({ page }) => {
  await openHomepage(page)

  const header = page.locator('header').first()
  const headerNav = header.locator('nav')
  await expect(header).toBeVisible()
  await expect(headerNav).toBeVisible()

  await Promise.all([
    page.waitForURL(/#features$/),
    headerNav.getByRole('link', { name: 'Capabilities' }).click(),
  ])
  await expect(
    page.getByRole('heading', {
      name: featuresHeading,
    }),
  ).toBeVisible()
  await expect(header).toBeVisible()

  await Promise.all([
    page.waitForURL(/#journey$/),
    headerNav.getByRole('link', { name: 'Journey' }).click(),
  ])
  await expect(
    page.getByRole('heading', {
      name: processHeading,
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Understand the current finance setup',
    }),
  ).toBeVisible()
})

test('desktop FAQ accordion can switch answers and collapse again', async ({ page }) => {
  await openHomepage(page)

  await page.locator('#faq').scrollIntoViewIfNeeded()
  await page
    .getByRole('button', { name: 'Who is Financeable Consulting best suited to?' })
    .click()
  await expect(page.getByText(firstFaqAnswer)).toBeVisible()

  const servicesQuestion = page.getByRole('button', { name: faqQuestion })
  await servicesQuestion.click()
  await expect(page.getByText(faqAnswer)).toBeVisible()
  await expect(page.getByText(firstFaqAnswer)).toBeHidden()

  await servicesQuestion.click()
  await expect(page.getByText(faqAnswer)).toBeHidden()
})

test.describe('mobile homepage', () => {
  test.use({
    viewport: mobileDevice.viewport,
    userAgent: mobileDevice.userAgent,
    deviceScaleFactor: mobileDevice.deviceScaleFactor,
    isMobile: mobileDevice.isMobile,
    hasTouch: mobileDevice.hasTouch,
  })

  test('mobile hides desktop nav but still exposes the stacked process journey', async ({ page }) => {
    await openHomepage(page)

    await expect(page.locator('header nav')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible()

    const journey = page.locator('#journey')
    await journey.scrollIntoViewIfNeeded()
    await expect(
      page.getByRole('heading', {
        name: processHeading,
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('heading', {
        name: 'Understand the current finance setup',
      }),
    ).toBeVisible()

    const nextJourneyButton = journey.getByRole('button', { name: 'Next journey step' })
    await nextJourneyButton.click()
    await nextJourneyButton.click()
    await nextJourneyButton.click()
    await nextJourneyButton.click()

    const finalStep = page.getByRole('heading', { name: 'Refine the finance layer as the business grows' })
    await expect(finalStep).toBeVisible()
  })
})
