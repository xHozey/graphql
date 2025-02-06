import { extractData } from "../api/data_scraper.js"
import { currentLevel } from "../utils/queries.js"

export const userLevel = async () => {
    const levelContainer = document.querySelector('.level-value')
    const data = await extractData(currentLevel)
    levelContainer.innerText = data.data.transaction_aggregate.aggregate.max.amount

}
