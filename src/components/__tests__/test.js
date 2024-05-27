import puppeteer from 'puppeteer'
import lighthouse from 'lighthouse'
import { URL } from 'url'

async function runTest() {
  const browser = await puppeteer.launch({
    headless: true,
    logLevel: 'silent'
  })
  const page = await browser.newPage()

  try {
    const targetUrl = 'http://localhost:5173/'
    await page.goto(targetUrl)

    const lighthouseResult = await runLighthouse(page, browser)

    console.log('Lighthouse Report:', lighthouseResult)

    // Проходим по каждой кнопке и замеряем время
    const deleteButtons = await page.$$('.--delete')

    const result = []

    for (let i = 0; i < deleteButtons.length; i++) {
      const button = deleteButtons[i]
      await button.click()
      const renderTime = await measureRenderTime(page)
      result.push(renderTime)
    }
    console.log(result.slice(0, 100))
    console.log(result.slice(100, 200))
  } catch (error) {
    console.error('Test failed:', error)
  }
}

async function runLighthouse(page, browser) {
  const lighthouseConfig = {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance']
    }
  }

  const options = {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json'
  }

  const lighthouseResult = await lighthouse(page.url(), options, lighthouseConfig)
  return lighthouseResult.lhr
}

async function measureRenderTime(page) {
  return page.evaluate(() => {
    const renderStart = performance.now()

    // Ждем события, которое говорит о том, что отрисовка завершена
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const renderEnd = performance.now()
        resolve(renderEnd - renderStart)
      })
    })
  })
}

runTest()
