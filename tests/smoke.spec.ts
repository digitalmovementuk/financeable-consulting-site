import { expect, test } from '@playwright/test'

test('renders the Financeable homepage', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: 'Senior finance support for businesses that need clearer monthly decisions.',
    }),
  ).toBeVisible()

  await expect(page.getByText('Book a consultation').first()).toBeVisible()
  await expect(page.getByText('Monthly CFO').first()).toBeVisible()
})

test('scrolls through the key homepage journey', async ({ page }) => {
  await page.goto('/')

  await page.locator('#services').scrollIntoViewIfNeeded()
  await expect(
    page.getByRole('heading', {
      name: 'Three finance support routes, built around the moments growing businesses lose clarity.',
    }),
  ).toBeVisible()

  await page.locator('#monthly-cfo').scrollIntoViewIfNeeded()
  await expect(
    page.getByRole('heading', {
      name: 'Monthly CFO support that connects reporting, cash visibility, and leadership decisions.',
    }),
  ).toBeVisible()

  await page.locator('#faq').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'What services does Financeable Consulting offer?' }).click()
  await expect(
    page.getByText(
      'The core services are Monthly CFO, Financial Reporting, and Cashflow Management.',
    ),
  ).toBeVisible()
})
