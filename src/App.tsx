
import { useState } from "react";
import Menu from "./components/Menu";
import Order from "./components/Order";
import CheckoutForm from "./components/CheckoutForm";
import menu from "./data/menu";
import formatPrice from "./utils/formatPrice";
import type { Checkout } from "./types";

type OrderItem = {
    productId: number;
    quantity: number;
};

function App() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [confirmation, setConfirmation] = useState("");

    // consegna base: gestione dell'aggiunta dei prodotti all'ordine
    function handleAdd(id: number) {
        setConfirmation("");

        setOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (item) => item.productId === id
            );

            if (existingItem) {
                if (existingItem.quantity >= 5) {
                    return prevOrder;
                }

                return prevOrder.map((item) =>
                    item.productId === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevOrder, { productId: id, quantity: 1 }];
        });
    }

    // consegna base: gestione delle quantità e rimozione dei prodotti
    function handleQuantityChange(id: number, change: number) {
        setConfirmation("");

        setOrder((prevOrder) =>
            prevOrder
                .map((item) => {
                    if (item.productId !== id) {
                        return item;
                    }

                    const nextQuantity = item.quantity + change;

                    if (nextQuantity > 5) {
                        return item;
                    }

                    return { ...item, quantity: nextQuantity };
                })
                .filter((item) => item.quantity > 0)
        );
    }

    // consegna base: calcolo del totale e gestione della conferma
    function handleConfirmOrder(checkout: Checkout) {
        const total = order.reduce((sum, item) => {
            const product = menu.find(
                (product) => product.id === item.productId
            );

            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        setConfirmation(
            `Ordine per ${checkout.nome.trim} (${checkout.classe.trim}), ritiro a ${checkout.ritiro}, ${checkout.pagamento}: ${formatPrice(total)}`
        );

        setOrder([]);
    }

    return (
        <main className="mx-auto max-w-2xl space-y-8 p-6">
            <h1 className="text-center text-3xl font-bold">
                Il bar della scuola
            </h1>

            <Menu onAdd={handleAdd} order={order} />

            <Order
                order={order}
                onQuantityChange={handleQuantityChange}
            />

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Conferma ordine</h2>

                <CheckoutForm
                    onSubmit={handleConfirmOrder}
                    disabled={order.length === 0}
                />

                {confirmation && (
                    <p className="font-semibold text-green-800">
                        {confirmation}
                    </p>
                )}
            </section>
        </main>
    );
}

export default App;
