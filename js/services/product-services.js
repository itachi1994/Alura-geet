const products = [];

export const servicesProducts = {
    productList: async () => {
        return products;
    },
    createProduct: async (name, price, image) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newProduct = { id, name, price, image };
        products.push(newProduct);
        return newProduct;
    },
    deleteProduct: async (id) => {
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
        } else {
            throw new Error(`Producto con ID ${id} no encontrado.`);
        }
    },
};

