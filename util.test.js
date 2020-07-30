// const util = require('./util');
// const generateText = util.generateText;
const { generateText, checkAngGenerate, validateInput } = require('./util'); // using destructuring!
const puppeteer = require('puppeteer');

// ---------- UNIT TESTS ---------------
// Testam a menor unidade de um sistema, as funções básicas, que não dependem de outras funões.
test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');

    const text2 = generateText('Ana', 25);
    expect(text2).toBe('Ana (25 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');

    const text2 = generateText();
    expect(text2).toBe('undefined (undefined years old)');
});

test('should return true for a correct entry', () => {
    const isValid = validateInput('Max', true, false);
    expect(isValid).toBe(true);

    //...
})
// ...

// ---------- INTEGRATION TESTS ---------------
// Os teste de integração checam funções não unitárias, ou seja, aquelas que dependem de outras funões.
// Os teste de integração se confiam nos testes unitários previamente realizados.
test('should generate a valid text output', () => {
    const text = checkAngGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

// ---------- END-TO-END TESTS (e2e tests) ---------------
// Testes de interface de usuário (full stack tests)
// A dependência usada 'puppeteer' baixa todo o core do navegador Chromium junto
test('should  create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true, // with/without showing the browser
        // slowMo: 80, // slow mode
        // args: ['--window-size=1280,800'] // browser window size
    });
    const page = await browser.newPage();
    await page.goto('file:///home/icaro/Desenvolvimento/workspace-vsc/js-testing-introduction/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('button#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (28 years old)');
})