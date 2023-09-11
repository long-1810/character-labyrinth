const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = screen.width;
canvas.height = screen.height;

let buffer = []
const characterNumber = 200
const velocity = 20

const textColor = "rgb(0,255,0)"
const fontStyle = "20px sans-serif"

function generateRandomCharacter() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя!@#$%^&*()_+-=[]{}|;':"
    // console.log(characters[Math.floor(Math.random() * characters.length)])
    return characters[Math.floor(Math.random() * characters.length)]
}

function generateRandomStartingPos() {
    // console.log([Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)])
    return [Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)]
}

function displayCharacter(character, posX, posY, color, font) {
    ctx.clearRect(posX, posY - parseInt(font), ctx.measureText(character).width, parseInt(font));

    ctx.fillStyle = color
    ctx.font = font
    ctx.fillText(character, posX, posY)
}

function initialize() {
    for (let i = 0; i < characterNumber; i++) {
        const randomChar = generateRandomCharacter()
        const [randomX, randomY] = generateRandomStartingPos()
        buffer.push({
            char: randomChar,
            x: randomX,
            y: randomY,
        })

    }
}


function renderBuffer() {
    for (let i = 0; i < buffer.length; i++) {

        const charData = buffer[i]
        // console.log(charData)
        displayCharacter(charData.char, charData.x, charData.y, textColor, fontStyle)
    }

}

function animation() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    renderBuffer()
    for (let i = 0; i < buffer.length; i++) {
        displayCharacter(generateRandomCharacter(), buffer[i].x, buffer[i].y, textColor, fontStyle);
        buffer[i].y += velocity;

        if (buffer[i].y > canvas.height) {
            buffer[i].y = 0;
            buffer[i].x = Math.floor(Math.random() * canvas.width);
        }

    }
    requestAnimationFrame(animation)
}


initialize()
animation()

