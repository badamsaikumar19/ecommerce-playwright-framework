import {Page, Locator,expect} from '@playwright/test';

export class BasePage{
readonly page:Page;

    constructor(page:Page){

        this.page = page;
    }

async navigate(path:string){
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded')
}

async clickElement(locator: Locator){
    await locator.waitFor({state:'visible'});
    await locator.click();
}

async fillInput(locator:Locator,text:string){
    await locator.waitFor({state:'visible'});
    await locator.clear();
    await locator.fill(text);

}

async verifyText(locator:Locator,expectedText:string){
    await expect(locator).toContainText(expectedText);
}
async waitForURL(urlPattern: string) {
    await this.page.waitForURL(`**${urlPattern}**`);
    //         ↑
    //   Waits DURING navigation
    //   Uses wildcard ** matching
}

// ── Verifications ──
async verifyURL(expectedURL: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedURL));
    //         ↑
    //   Asserts AFTER page loaded
    //   Uses RegExp matching
}

async verifyVisible(locator:Locator){
    await expect(locator).toBeVisible();
}

async isVisible(locator:Locator):Promise<boolean>{
return await locator.isVisible();

}

}