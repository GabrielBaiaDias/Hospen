window.addEventListener("scroll", function () {
    let header = document.querySelector("#header");
    header.classList.toggle('rolagem', this.window.scrollY > 0)
})

const linkPlanos = document.querySelector('#linkPlanos')
linkPlanos.addEventListener('click', function (event) {
    event.preventDefault();

    var headerHeight = 80;
    var element = document.querySelector('#area-escolha-planos');
    var elementPosition = element.getBoundingClientRect().top + window.scrollY;
    var offset = elementPosition - headerHeight;
    
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
    
    controls[1].click()
});

var planos = document.querySelectorAll(".plano");
planos.forEach(plano => {
    if (!plano.classList.contains("plano-principal")) {
        plano.style.paddingTop = "45px";
    }
});

/* Carrossel */

const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".plano");
let lengthItems = items.length;

let idCount = 0;
items.forEach((item) => {
    item.id = "plano" + idCount;
    idCount++
})

controls.forEach((control) => control.addEventListener("click", () => {
    const isLeft = control.classList.contains("arrow-left");

    currentItem = isLeft == true ? currentItem -= 1 : currentItem += 1;

    if (currentItem < 0) {
        currentItem = lengthItems - 1;
    }
    if (currentItem > lengthItems - 1) {
        currentItem = 0;
    }

    FocarCurrentItem();

    // console.log("controls: " + controls, " - currentitem: " + currentItem, " - items: " + items, " - lengthItems: " + lengthItems);
}))

items.forEach((item) => item.addEventListener("click", () => {
    currentItem = Number(item.id.slice(-1));
    FocarCurrentItem();
}))

function FocarCurrentItem() {
    items.forEach((item) => item.classList.remove("plano-selected"));
    items[currentItem].classList.add("plano-selected");
    items[currentItem].scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth"
    });
}

/* ==-=-=-== */

function MostraDialog(e) {
    const idNumBtn = (Number(e.id.slice(-1)) - 1)
    const btnSMs = document.querySelectorAll(".btnSM");
    const modals = document.querySelectorAll(".modal");
    btnSMs[idNumBtn].classList.toggle("aberto");
    if (btnSMs[idNumBtn].classList.contains("aberto")) {
        modals[idNumBtn].show();
    } else {
        modals[idNumBtn].close();
        linkPlanos.click()
    }
    // console.log(idNumBtn, btnSMs, btnSMs[idNumBtn], modals, modals[idNumBtn], setas);
}