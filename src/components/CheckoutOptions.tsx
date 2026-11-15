
import type { Checkout } from "../types";
import FieldErrors from "./FieldErrors";

type CheckoutOptionsProps = {
    ritiro: Checkout["ritiro"];
    pagamento: Checkout["pagamento"];
    onRitiroChange: (ritiro: Checkout["ritiro"]) => void;
    onPagamentoChange: (pagamento: Checkout["pagamento"]) => void;
    errorsRitiro: string[];
    errorsPagamento: string[];
};

function CheckoutOptions({
    ritiro,
    pagamento,
    onRitiroChange,
    onPagamentoChange,
    errorsRitiro,
    errorsPagamento,
}: CheckoutOptionsProps) {
    return (
        <>
            <div className="space-y-2">
                <p className="font-medium">Ritiro</p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => onRitiroChange("ricreazione")}
                        className={`rounded-lg border px-4 py-2 ${ritiro === "ricreazione"
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                    >
                        Ricreazione
                    </button>

                    <button
                        type="button"
                        onClick={() => onRitiroChange("pranzo")}
                        className={`rounded-lg border px-4 py-2 ${ritiro === "pranzo"
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                    >
                        Pranzo
                    </button>
                </div>

                <FieldErrors errors={errorsRitiro} />
            </div>

            <div className="space-y-2">
                <p className="font-medium">Pagamento</p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => onPagamentoChange("contanti")}
                        className={`rounded-lg border px-4 py-2 ${pagamento === "contanti"
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                    >
                        Contanti
                    </button>

                    <button
                        type="button"
                        onClick={() => onPagamentoChange("carta")}
                        className={`rounded-lg border px-4 py-2 ${pagamento === "carta"
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-300 bg-white text-gray-700"
                            }`}
                    >
                        Carta
                    </button>
                </div>

                <FieldErrors errors={errorsPagamento} />
            </div>
        </>
    );
}

export default CheckoutOptions;
