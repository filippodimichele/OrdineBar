import { useState } from "react";
import Menu from "./components/Menu";
import Order from "./components/Order";
import menu from "./data/menu";
import formatPrice from "./utils/formatPrice";

type OrderItem = {
    productId: number;
    quantity: number;
};

function App() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [customerName, setCustomerName] = useState("");
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState("");

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

   
    // consegna pro: gestione delle quantità con limite massimo di 5
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


    function handleConfirmOrder() {
        if (customerName.trim() === "") {
            setError("Inserisci il nome per il ritiro.");
            return;
        }

        if (order.length === 0) {
            setError("Aggiungi almeno un prodotto all'ordine.");
            return;
        }

        const total = order.reduce((sum, item) => {
            const product = menu.find(
                (product) => product.id === item.productId
            );

            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        setConfirmation(
            `Ordine per ${customerName.trim()}: ${formatPrice(total)}`
        );

        setOrder([]);
        setCustomerName("");
        setError("");
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

                <div className="space-y-2">
                    <label htmlFor="customerName" className="font-medium">
                        Nome per il ritiro
                    </label>

                    <input
                        id="customerName"
                        type="text"
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        placeholder="Inserisci il tuo nome"
                        className="w-full rounded-full bg-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleConfirmOrder}
                    disabled={order.length === 0}
                    className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    Conferma ordine
                </button>

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