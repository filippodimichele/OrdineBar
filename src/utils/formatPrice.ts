function formatPrice(price: number): string {
    return price.toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR",
    });
}

export default formatPrice;