import { expect, test } from '@playwright/test'

test('design version four loads the enterprise-style homepage and faq', async ({ page }) => {
  await page.goto('/v4/')

  await expect(page.getByText('Design version 04')).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Senior finance support for businesses that need clearer monthly decisions.',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Three finance support routes, built around the moments growing businesses lose clarity.',
    }),
  ).toBeVisible()

  const faqTrigger = page.getByRole('button', {
    name: 'What services does cunos consulting offer?',
  })
  await faqTrigger.click()
  await expect(
    page.getByText(/The core services are Monthly CFO, Financial Reporting, and Cashflow Management/i),
  ).toBeVisible()
})
