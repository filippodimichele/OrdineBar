
import { useState } from "react";
import Menu from "./components/Menu";
import Order from "./components/Order";
import CheckoutForm from "./components/CheckoutForm";
import PendingOrders from "./components/PendingOrders";
import menu from "./data/menu";
import formatPrice from "./utils/formatPrice";
import type { Checkout, OrderItem, ConfirmedOrder } from "./types";

const productsById = new Map(menu.map((product) => [product.id, product]));

function App() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [confirmation, setConfirmation] = useState("");
    const [pendingOrders, setPendingOrders] = useState<ConfirmedOrder[]>([]);

    // calcolo del totale corrente del carrello
    const total = order.reduce((sum, item) => {
        const product = productsById.get(item.productId);

        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    // aggiunta di prodotti al carrello con limite massimo di quantità
    function handleAdd(id: number) {
        setConfirmation("");

        setOrder((prevOrder) => {
            const existingItem = prevOrder.find(
                (item) => item.productId === id
            );

            if (existingItem && existingItem.quantity >= 5) {
                return prevOrder;
            }

            return existingItem
                ? prevOrder.map((item) =>
                    item.productId === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prevOrder, { productId: id, quantity: 1 }];
        });
    }

    // aggiornamento delle quantità e rimozione dei prodotti dal carrello
    function handleQuantityChange(id: number, change: number) {
        setConfirmation("");

        setOrder((prevOrder) =>
            prevOrder
                .map((item) =>
                    item.productId === id
                        ? { ...item, quantity: Math.min(item.quantity + change, 5) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    // creazione e registrazione di un ordine confermato
    function handleConfirmOrder(checkout: Checkout) {
        const confirmedOrder: ConfirmedOrder = {
            id: Date.now(),
            nome: checkout.nome.trim(),
            classe: checkout.classe.trim(),
            ritiro: checkout.ritiro,
            pagamento: checkout.pagamento,
            products: order.map((item) => {
                const product = productsById.get(item.productId)!;

                return {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                };
            }),
            total,
        };

        setPendingOrders((prevOrders) => [...prevOrders, confirmedOrder]);

        setConfirmation(
            `Ordine per ${confirmedOrder.nome} (${confirmedOrder.classe}), ritiro a ${confirmedOrder.ritiro}, ${confirmedOrder.pagamento}: ${formatPrice(total)}`
        );

        setOrder([]);
    }

    // rimozione di un ordine dopo il ritiro
    function handleOrderCollected(id: number) {
        setPendingOrders((prevOrders) =>
            prevOrders.filter((item) => item.id !== id)
        );
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
                    total={total}
                />

                {confirmation && (
                    <p className="font-semibold text-green-800">
                        {confirmation}
                    </p>
                )}
            </section>

            <PendingOrders
                orders={pendingOrders}
                onCollected={handleOrderCollected}
            />
        </main>
    );
}

export default App;
