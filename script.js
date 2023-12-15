const body = document.body
const main = document.getElementById("main-container")
const cards = ["nline", "naver", "starbucks", "bamin"]
const color = ["#131DB6","#6ED441", "#1C6E17", "#26BCAA"]
const translateInitValue = 600

for(const cardName of cards) {
    const card = document.getElementById(`${cardName}-front`)
    const container = document.getElementById(`${cardName}-container`)
    const overlay = document.getElementById(`${cardName}-overlay`)
    container.style.height = `${card.getBoundingClientRect().height}px`
    container.style.width = `${card.getBoundingClientRect().width}px`
    overlay.style.height = `${card.getBoundingClientRect().height}px`
    overlay.style.width = `${card.getBoundingClientRect().width}px`
}

const mouseMove = (e) => {
    const container = document.getElementById(`${cards[CardList.currentCardIndex]}-container`)
    const h = container.getBoundingClientRect().height
    const w = container.getBoundingClientRect().width
    const overlay = document.getElementById(`${cards[CardList.currentCardIndex]}-overlay`)
    overlay.style.backgroundPosition = `${e.offsetX/5 + e.offsetY/5}%`
    container.style.transform = `perspective(350px) rotateX(${-40/h * e.offsetY + 20}deg) rotateY(${-40/w * e.offsetX + 20}deg) scale(1.5)`
    overlay.style.opacity = 1
}

const mouseOut = () => {
    const container = document.getElementById(`${cards[CardList.currentCardIndex]}-container`)
    const overlay = document.getElementById(`${cards[CardList.currentCardIndex]}-overlay`)
    container.style.transform = `perspective(350px) rotateX(0deg) rotateY(0deg) scale(1.5)`
    overlay.style.opacity = 0
}

class CardList {
    static currentCardIndex = 0
    static translateX = translateInitValue
    static reset() {
        for(const cardName of cards) {
            const container = document.getElementById(`${cardName}-container`)
            container.classList.remove("select")
            container.removeEventListener('mousemove', mouseMove, false)
            container.removeEventListener('mousemove', mouseOut, false)
            container.style.transform = ``
        }
    }
    static update() {
        body.style.backgroundColor = color[CardList.currentCardIndex]
        const container = document.getElementById(`${cards[CardList.currentCardIndex]}-container`)
        container.classList.add("select")
        main.style.transform = `translateX(${CardList.translateX}px)`
        container.addEventListener('mousemove', mouseMove)
        container.addEventListener('mouseout', mouseOut)
    }
    static next() {
        if(CardList.currentCardIndex < 3) {
            CardList.currentCardIndex += 1
            CardList.translateX -= 400
            CardList.update()
        } else {
            CardList.currentCardIndex = 0
            CardList.translateX = translateInitValue
            CardList.update()
        }
        
    }
    static prior() {
        if(CardList.currentCardIndex > 0) {
            CardList.currentCardIndex -= 1
            CardList.translateX += 400
            CardList.update()
        } else {
            CardList.currentCardIndex = 3
            CardList.translateX = translateInitValue - 400 * 3
            CardList.update()
        }
    }
}
CardList.update()
window.addEventListener('wheel', (e) => {
    console.log(e.deltaY )
    if(e.deltaY > 0) {
        CardList.reset()
        const overlay = document.getElementById(`${cards[CardList.currentCardIndex]}-overlay`)
        overlay.style.opacity = 0
        CardList.next()
    } else {
        CardList.reset()
        const overlay = document.getElementById(`${cards[CardList.currentCardIndex]}-overlay`)
        overlay.style.opacity = 0
        CardList.prior()
    }
})