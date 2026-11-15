
import { useState } from "react";
import type { Checkout } from "../types";

type CheckoutFormProps = {
    onSubmit: (checkout: Checkout) => void;
    disabled: boolean;
};

// consegna base: gestione del form di conferma con un unico stato
function CheckoutForm({ onSubmit, disabled }: CheckoutFormProps) {
    // tutti i campi del form condividono un unico stato
    const [checkout, setCheckout] = useState<Checkout>({
        nome: "",
        classe: "",
        ritiro: "ricreazione",
        pagamento: "contanti",
        note: "",
    });

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        // impedisce il comportamento predefinito del form, evitando il ricaricamento della pagina
        event.preventDefault();

        // invia ad App tutti i dati raccolti nel form
        onSubmit(checkout);

        //ripristino valori iniziali post conferma
        setCheckout({
            nome: "",
            classe: "",
            ritiro: "ricreazione",
            pagamento: "contanti",
            note: "",
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="nome" className="font-medium">
                    Nome per il ritiro
                </label>

                <input
                    id="nome"
                    type="text"
                    value={checkout.nome}
                    // aggiorna solamente il nome, mantenendo invariati gli altri campi
                    onChange={(event) =>
                        setCheckout({ ...checkout, nome: event.target.value })
                    }
                    placeholder="Inserisci il tuo nome"
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="classe" className="font-medium">
                    Classe
                </label>

                <input
                    id="classe"
                    type="text"
                    value={checkout.classe}
                    onChange={(event) =>
                        setCheckout({ ...checkout, classe: event.target.value })
                    }
                    placeholder="Es. 4B"
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <div className="space-y-2">
                <p className="font-medium">Ritiro</p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        // type button impedisce l'invio accidentale del form
                        onClick={() =>
                            setCheckout({ ...checkout, ritiro: "ricreazione" })
                        }
                        className="rounded-lg border px-4 py-2"
                    >
                        Ricreazione
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setCheckout({ ...checkout, ritiro: "pranzo" })
                        }
                        className="rounded-lg border px-4 py-2"
                    >
                        Pranzo
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <p className="font-medium">Pagamento</p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            setCheckout({ ...checkout, pagamento: "contanti" })
                        }
                        className="rounded-lg border px-4 py-2"
                    >
                        Contanti
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setCheckout({ ...checkout, pagamento: "carta" })
                        }
                        className="rounded-lg border px-4 py-2"
                    >
                        Carta
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="note" className="font-medium">
                    Note
                </label>

                <textarea
                    id="note"
                    rows={3}
                    value={checkout.note}
                    onChange={(event) =>
                        setCheckout({ ...checkout, note: event.target.value })
                    }
                    placeholder="Eventuali richieste"
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <button
                type="submit"
                disabled={disabled}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
                Conferma ordine
            </button>
        </form>
    );
}

export default CheckoutForm;
