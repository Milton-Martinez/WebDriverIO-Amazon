import { browser, expect, $ } from '@wdio/globals';

describe('Cart Flow', () => {
  let productPrice;

  before(async () => {
    await browser.url('/');
    const searchInput = await $('#twotabsearchtextbox');
    const searchButton = await $('input[type="submit"]');
    await searchInput.addValue('tshirt');
    await searchButton.click();
  });

  it('Add to Cart', async () => {
    await $('.s-product-image-container').click();
    
    productPrice = await $$('.a-price.aok-align-center')[1].getText();
    
    await $('#add-to-cart-button').click();
    
    // await expect($('#NATC_SMART_WAGON_CONF_MSG_SUCCESS span')).toHaveText('Added to Cart');
    // const subtotal = await $('.a-price.sw-subtotal-amount span').getText();
    
    browser.pause(1000)
    const subtotal = await browser.execute(() => {
      return document.querySelector('.a-price.sw-subtotal-amount span').textContent
    })

    await expect(subtotal).toEqual(productPrice);
  });

  it('Update Cart Qty', async () => {
    await $('#nav-cart').click();
    await $('#a-autoid-0-announce').click();
    await $('#quantity_6').click();
    const updatedSubtotal = await $('#sc-subtotal-amount-activecart span');
    await expect(updatedSubtotal).not.toHaveText(productPrice);
  });
});