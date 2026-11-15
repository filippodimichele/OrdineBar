
import menu from "../data/menu";
import formatPrice from "../utils/formatPrice";
import type { OrderItem } from "../types";

interface MenuProps {
    onAdd: (id: number) => void;
    order: OrderItem[];
}

const categories = [
    { id: "panini", name: "Panini" },
    { id: "bevande", name: "Bevande" },
    { id: "dolci", name: "Dolci" },
] as const;

function Menu({ onAdd, order }: MenuProps) {
    return (
        <div className="space-y-8">
            {categories.map((category) => {
                const products = menu.filter(
                    (product) => product.category === category.id
                );

                return (
                    <section key={category.id} className="space-y-3">
                        <h2 className="text-2xl font-bold">
                            {category.name}
                        </h2>

                        <div className="space-y-3">
                            {products.map((product) => {
                                const orderItem = order.find(
                                    (item) => item.productId === product.id
                                );

                                const quantity = orderItem?.quantity ?? 0;

                                return (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between rounded-2xl border border-gray-300 p-4"
                                    >
                                        <div>
                                            <h3 className="font-semibold">
                                                {product.name}
                                            </h3>

                                            <p className="text-gray-500">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => onAdd(product.id)}
                                            disabled={quantity >= 5}
                                            className="rounded-3xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Aggiungi
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default Menu;
