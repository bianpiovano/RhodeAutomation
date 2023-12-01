import { expect, type Locator, type Page } from '@playwright/test';

export class RhodePage{
    readonly page: Page;
    readonly SearchLabel: Locator;
    readonly ProductBarLabel: Locator;
    readonly ProductItem: Locator;
    readonly ColourItem: Locator;
    readonly BuyButton: Locator;
    readonly IncreaseButton: Locator;
    readonly FreeShippingText: Locator;
    readonly ProductQuantity: Locator;


    constructor(page: Page){
        this.page = page;
        this.SearchLabel = page.getByText('SEARCH', { exact: true });
        this.ProductBarLabel = page.locator('input.js-search-input');
        this.ProductItem = page.locator('xpath=//*[@id="js-search-feed"]/div/div[2]/a/div[2]/div');
        this.ColourItem = page.locator("xpath=//div[@class='Product-swatches']//div[@aria-label='Select peptide lip treatment watermelon slice']");
        this.BuyButton = page.locator('.js-product-main-details').getByRole('button', { name: 'BUY lip treatment - $16.00' });
        this.IncreaseButton = page.getByRole('button', { name: 'Increase quantity' });
        this.FreeShippingText = page.locator('span.CartDrawer-shippingLabel:has-text("Free standard shipping unlocked")');
        this.ProductQuantity = page.locator('p.CartDrawer-titleLink:has-text("10 items")');
    }

    // Navigate to Rhode site
    async goto(){
        await this.page.goto('https://rhodeskin.com/');
    }

    // Click on search bar
    async search(){
        await this.SearchLabel.click();
    }

    // Search product
    async writeText(){
        await this.ProductBarLabel.fill('Lip Treat');
    }

    // Click my product
    async selectProduct(){
        await this.ProductItem.click();
        await this.page.waitForTimeout(3000);
    }

    // Select colour/flavour option
    async selectColour(){
        await this.ColourItem.click();
    }

    // Click on buying button
    async proceedPurchase(){
        await this.BuyButton.click();
    }

    // Add multiple items to cart
    async addMoreItems(numberOfClicks: number){
        const addMore = this.IncreaseButton;
        if (addMore) {
            for (let i = 0; i < numberOfClicks; i++) {
              await addMore.click();
              await this.page.waitForTimeout(1000)
            }
          } else {
            console.error('Unable to find increase button');
          }
        }

    // Verify free shipping option is avalaible 
    async verifyFreeShipping(){
       const freeShipping = await this.FreeShippingText;
       if (freeShipping) {
        console.log('Shipping is free');
    } else {
      console.log('Unable to find free shipping message');
       }
       await this.page.waitForTimeout(3000);
    }

    // Verify user is not able to add more than 10 lip treatments
    async verifyItemsQuantity(){
        const itemQuantity = await this.ProductQuantity
        if (itemQuantity) {
            console.log('No more than 10 items were added');
    } else {
      console.log('There is an issue with the items in the cart');
    }
    
        }
}

      
    

