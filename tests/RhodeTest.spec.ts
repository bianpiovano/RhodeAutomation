import { test, expect } from '@playwright/test';
import { RhodePage } from './RhodePage';


test('Verify product purchase limit per order', async ({ page }) => {
  test.setTimeout(120000);
  
  const rhode = new RhodePage(page);
       
  await rhode.goto();
  await rhode.search();
  await rhode.writeText();
  await rhode.selectProduct();
  await rhode.selectColour();
  await rhode.proceedPurchase();
  await rhode.addMoreItems(11);
  await rhode.verifyItemsQuantity();
});

test('Verify free shipping available', async ({ page }) => {
  test.setTimeout(120000);
  
  const rhode = new RhodePage(page);
       
  await rhode.goto();
  await rhode.search();
  await rhode.writeText();
  await rhode.selectProduct();
  await rhode.selectColour();
  await rhode.proceedPurchase();
  await rhode.addMoreItems(11);
  await rhode.verifyFreeShipping();
});

