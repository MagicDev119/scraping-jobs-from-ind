const { Scraper, Root, OpenLinks, CollectContent, DownloadContent } = require('nodejs-web-scraper')
const fs = require('fs')

const scrapingFunc = async (pageStartNumber) => {
  const pages = []//All ad pages.
  let pageNum = pageStartNumber
  const getPageObject = (pageObject, address) => {
    pageObject.pageNum = pageNum
    pages.push(pageObject)
  }

  const user_agents_list = [
    'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.83 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  ]

  const config = {
    baseSiteUrl: `https://www.indeed.com`,
    startUrl: `https://www.indeed.com/jobs?q=full+time&l=United+States&sc=0bf%3Aexrec%28%29%3B&fromage=1`,
    filePath: './images/',
    maxRetries: 1,
    cloneFiles: false,
    logPath: './logs/',
    headers: { 'User-Agent': user_agents_list[2] }
  }

  const scraper = new Scraper(config)
  let pageCount = 1
  let isLastPage = false
  while (true) {
    const root = new Root({ pagination: { queryString: 'start', begin: pageNum, end: pageNum } })//Open pages 1-10. You need to supply the querystring that the site uses(more details in the API docs).
    const pageManager = new CollectContent('.jobsearch-SerpMainContent > .jobsearch-LeftPane > nav > div', { name: 'hasNext' })
    const jobAds = new OpenLinks('.jobsearch-ResultsList > li table.jobCard_mainContent .jobTitle a', { name: 'list', getPageObject })//Opens every job ad, and calls the getPageObject, passing the formatted dictionary.
    const title = new CollectContent('h1.jobsearch-JobInfoHeader-title', { name: 'title' })
    const description = new CollectContent('#jobDescriptionText', { name: 'description' })
    const companyName = new CollectContent('.jobsearch-InlineCompanyRating-companyHeader a', { name: 'companyName' })
    const location = new CollectContent('.jobsearch-JobInfoHeader-subtitle div:nth-child(1)', { name: 'location' })

    const compnayLink = new OpenLinks('.jobsearch-InlineCompanyRating-companyHeader a', { name: 'companyInfo' })//Opens every job ad, and calls the getPageObject, passing the formatted dictionary.
    const companySize = new CollectContent('li[data-testid="companyInfo-employee"] div:nth-child(1)', { name: 'companySize' })
    const companyIndustry = new CollectContent('li[data-testid="companyInfo-industry"] div:nth-child(1)', { name: 'companyIndustry' })
    const companyHappinessValue = new CollectContent('div[aria-labelledby="cmp-HappinessWidget-head"] > div div:last-child > div div[aria-hidden="true"]:first-child', { name: 'companyHappinessValue' })
    const companyHappinessKey = new CollectContent('div[aria-labelledby="cmp-HappinessWidget-head"] > div div:last-child > div div[aria-hidden="true"]:last-child div', { name: 'companyHappinessKey' })

    root.addOperation(pageManager)
    root.addOperation(jobAds)
    jobAds.addOperation(title)
    jobAds.addOperation(description)
    jobAds.addOperation(companyName)
    jobAds.addOperation(location)
    jobAds.addOperation(compnayLink)
    compnayLink.addOperation(companySize)
    compnayLink.addOperation(companyIndustry)
    compnayLink.addOperation(companyHappinessValue)
    compnayLink.addOperation(companyHappinessKey)

    await scraper.scrape(root)

    const getPageManager = pageManager.getData()
    pageNum += 20
    pageCount++
    // if (getPageManager[getPageManager.length - 1] !== '' || getPageManager[getPageManager.length - 1].indexOf('svg') != -1) {
    isLastPage = true
    // break
    // }
    if (pageCount >= 1) {
      break
    }
  }

  if (!isLastPage) {
    scrapingFunc(pageNum)
  } else {
    fs.writeFile('./pages-' + pageNum + '.json', JSON.stringify(pages), () => {
    })
  }
}

const startScraping = () => {
  scrapingFunc(10)
}

startScraping()