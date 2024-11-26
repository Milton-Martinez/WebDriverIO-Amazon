import { $, expect, browser } from "@wdio/globals";

describe('Amazon Home Page', () => {
    it('Access url, verify url and title', async () => {
        await browser.url('/');
        await expect(browser).toHaveUrl(expect.stringContaining("amazon"));
        await expect(browser).toHaveTitle('Amazon.com. Spend less. Smile more.');
    });
});