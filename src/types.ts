
// consegna base: definizione dei dati del checkout
export type Checkout = {
    nome: string;
    classe: string;
    ritiro: "ricreazione" | "pranzo";
    pagamento: "contanti" | "carta";
    note: string;
};
