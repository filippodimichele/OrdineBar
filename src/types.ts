
 // dati raccolti dal modulo di conferma dell'ordine
export type Checkout = {
    nome: string;
    classe: string;
    ritiro: "ricreazione" | "pranzo";
    pagamento: "contanti" | "carta";
    note: string;
};

// identificativo del prodotto e quantità nel carrello
export type OrderItem = {
    productId: number;
    quantity: number;
};

// dati dell'ordine salvati al momento della conferma
export type ConfirmedOrder = {
    id: number;
    nome: string;
    classe: string;
    ritiro: Checkout["ritiro"];
    pagamento: Checkout["pagamento"];
    products: {
        productId: number;
        name: string;
        price: number;
        quantity: number;
    }[];
    total: number;
};
