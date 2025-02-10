export const userLevel = async (currentLevel) => {
    const levelContainer = document.querySelector('.level-value')
    levelContainer.innerText = currentLevel.amount
}
