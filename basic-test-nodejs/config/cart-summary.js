class CartSummary {
    constructor(items) {
        this.items = items;
    }
    getSubtotal() {
        if (this.items.length) {
            let subtotal = 0;
            return this.items.reduce((subtotal, item) => {
                return subtotal + (item.quantity * item.price);
            }, subtotal);
        }
        return 0;
    }
}

module.exports = CartSummary;