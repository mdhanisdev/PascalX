import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem("pascalx-skip-preloader", "true"));
});

test("homepage exposes the main navigation and programme carousel", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#main-content")).toBeVisible();
  await expect(page.getByRole("link", { name: /explore programmes/i }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Next programme" })).toBeVisible();
  await expect(page.getByRole("tab", { name: /show security operations center/i })).toBeVisible();
});

test("a programme card opens its course page and returns to the programme section", async ({ page }) => {
  await page.goto("/");
  await page.locator(".programme-slide").first().click();
  await expect(page).toHaveURL(/\/programmes\/security-operations-center-soc$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Back to all programmes" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#programs")).toBeVisible();
});

test("course enquiry opens WhatsApp with a prefilled course name", async ({ page }) => {
  await page.goto("/programmes/security-operations-center-soc");
  await page.getByLabel("Full name").fill("Test Learner");
  await page.getByLabel("WhatsApp number").fill("9999999999");
  await page.getByLabel("Email address").fill("test@example.com");

  await page.context().route("https://wa.me/**", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: "WhatsApp test destination" });
  });

  const popup = page.waitForEvent("popup");
  await page.getByRole("button", { name: /continue on whatsapp/i }).click();
  expect((await popup).url()).toContain("wa.me/919441276060");
  await expect(page.getByRole("status")).toContainText("Message prefilled");
});

test("mobile navigation opens and can be dismissed", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only interaction");
  await page.goto("/");

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.locator("#mobile-navigation")).toHaveClass(/is-open/);
  await page.locator(".mobile-nav-toggle").click();
  await expect(page.locator("#mobile-navigation")).not.toHaveClass(/is-open/);
});
