import { $, expect, browser } from "@wdio/globals";

describe('Amazon Home Page', () => {
    it('Access url, verify url and title', async () => {
        await browser.url('/');
        await expect(browser).toHaveUrl(expect.stringContaining("amazon"));
        await expect(browser).toHaveTitle('Amazon.com. Spend less. Smile more.');
    });
    it('Search Content and Verify Text', async () => {
        await browser.url('/');
        const searchInput = await $('#twotabsearchtextbox');
        const searchButton = await $('input[type="submit"]');
        const expectedSearchText = await $('.a-color-state.a-text-bold');
    
        await searchInput.addValue('macbook');
        await searchButton.click();
        await expect(expectedSearchText).toHaveText('"macbook"');
      });
      it('Auto Suggestion', async () => {
        await browser.url('/');
        const searchInput = await $('#twotabsearchtextbox');
        const suggestionPane = await $('.left-pane-results-container');
        const firstSearchResult = await suggestionPane.$('div');
        const expectedSearchText = await $('.dcl-container-inner');
    
        await searchInput.click();
        await expect(suggestionPane).toBeDisplayed();
        await browser.keys('ArrowDown');
        // const expectedText = await firstSearchResult.getText();
        await browser.keys('Enter');
        await expect(expectedSearchText).toHaveText(expect.stringContaining('The Holiday Shop'));
      });
});