if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var totalAmount = "0,00"

function ready() {
    // botão remover produto
    const removeCartProductButtons = document.getElementsByClassName("remove-product-button")

    for (var i = 0; i < removeCartProductButtons.length; i++) {
        removeCartProductButtons[i].addEventListener("click", removeProduct)
    }
    // mudança valor dos inputs
    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", updateTotal)
    }
    // botão add produto ao carrinho
    const addToCartButtons = document.getElementsByClassName("button-hover-background")
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }
    // botão comprar
    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)

}

function makePurchase() {
    if (totalAmount === "0,00") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `
                Obrigado pela sua compra!
                Valor do pedido: R$${totalAmount}
                Volte sempre :)
            `
        )

    }
    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event) {
    
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove()
    }
    updateTotal()

}

function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    const productsCartName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText === productTitle) {
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")
    newCartProduct.innerHTML =
        `
    <td class="product-identification">
                        <strong class="cart-product-title">${productTitle}</strong>
                    </td>
                    <td>
                        <span class="cart-product-price">${productPrice}</span>
                    </td>
                    <td>
                        <input type="number" value="1" min="0" class="product-qtd-input">
                        <button type="button" class="remove-product-button">Remover</button>
                    </td>
`
    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)

    updateTotal()
    
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

// atualizar o valor total do carrinho
function updateTotal() {
    
    const cartProducts = document.getElementsByClassName("cart-product")
    totalAmount = 0
    for (var i = 0; i < cartProducts.length; i++) {
        //console.log(cartProducts[i])
        const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

        totalAmount += productPrice * productQuantity
    }

    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}

// animações
ScrollReveal().reveal('.flex-container',{
    origin: 'right',
    duration: 3000,
    distance: '20%'
})

ScrollReveal().reveal('.card-grid',{
    origin: 'left',
    duration: 2000,
    distance: '20%'
})

ScrollReveal().reveal('.cart-table',{
    origin: 'left',
    duration: 2000,
    distance: '20%'
})


