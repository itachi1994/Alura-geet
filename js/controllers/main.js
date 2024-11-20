import { servicesProducts } from "../services/product-services.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

// Función para crear la estructura HTML de un producto
function createCard({ name = "Producto sin nombre", price = "0", image = "./assets/defaultImage.jpg", id = "" }) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}" onerror="this.src='./assets/defaultImage.jpg'">
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>$ ${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="./assets/trashIcon.svg" alt="Eliminar">
                </button>
            </div>
        </div>
    `;

    addDeleteEvent(card, id);

    return card;
}

// Agrega el evento para eliminar un producto
function addDeleteEvent(card, id) {
    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
        try {
            await servicesProducts.deleteProduct(id);
            card.remove();
            console.log(`Producto con ID ${id} eliminado.`);
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${id}:`, error);
        }
    });
}

// Renderiza todos los productos en el contenedor
const renderProducts = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            productsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error al renderizar productos:", error);
    }
};

// Manejo del envío del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value.trim();
    const price = document.querySelector("[data-price]").value.trim();
    const image = document.querySelector("[data-image]").value.trim();

    if (!name || !price || !image) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    try {
        const newProduct = await servicesProducts.createProduct(name, price, image);
        console.log("Producto devuelto por createProduct:", newProduct);

        if (newProduct && newProduct.name && newProduct.price && newProduct.image) {
            const newCard = createCard(newProduct);
            productsContainer.appendChild(newCard);
            form.reset();
        } else {
            console.error("El producto creado es inválido:", newProduct);
        }
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }
});

// Renderiza los productos al cargar la página
renderProducts();


