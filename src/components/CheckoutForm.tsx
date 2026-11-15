
import { useEffect, useState } from "react";
import type { Checkout } from "../types";
import CheckoutOptions from "./CheckoutOptions";
import CheckoutFields from "./CheckoutFields";
import {
    emptyErrors,
    getCheckoutErrors,
} from "../utils/checkoutValidation";
import type { FormErrors } from "../utils/checkoutValidation";

type CheckoutFormProps = {
    onSubmit: (checkout: Checkout) => void;
    disabled: boolean;
    total: number;
};

// gestione del modulo di conferma attraverso un unico stato
function CheckoutForm({ onSubmit, disabled, total }: CheckoutFormProps) {
    // stato centralizzato contenente tutti i campi del modulo
    const [checkout, setCheckout] = useState<Checkout>({
        nome: "",
        classe: "",
        ritiro: "ricreazione",
        pagamento: "contanti",
        note: "",
    });

    // gestione degli errori e dei tentativi di invio
    const [errors, setErrors] = useState<FormErrors>(emptyErrors());
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // aggiornamento automatico degli errori dopo il primo invio
    useEffect(() => {
        if (hasSubmitted) {
            setErrors(getCheckoutErrors(checkout, total));
        }
    }, [checkout, total, hasSubmitted]);

    // aggiornamento dei dati del modulo
    function updateCheckout(updatedCheckout: Checkout) {
        setCheckout(updatedCheckout);
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        // impedisce il ricaricamento della pagina durante l'invio
        event.preventDefault();

        const validationErrors = getCheckoutErrors(checkout, total);
        setErrors(validationErrors);
        setHasSubmitted(true);

        const hasErrors = Object.values(validationErrors).some(
            (fieldErrors) => fieldErrors.length > 0
        );

        if (hasErrors || disabled) {
            return;
        }

        // invio ad App dei dati validati del modulo
        onSubmit({
            ...checkout,
            nome: checkout.nome.trim(),
            classe: checkout.classe.trim(),
        });

        // ripristino dello stato iniziale dopo la conferma
        setCheckout({
            nome: "",
            classe: "",
            ritiro: "ricreazione",
            pagamento: "contanti",
            note: "",
        });

        setErrors(emptyErrors());
        setHasSubmitted(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CheckoutFields
                nome={checkout.nome}
                classe={checkout.classe}
                note={checkout.note}
                errorsNome={errors.nome}
                errorsClasse={errors.classe}
                errorsNote={errors.note}
                onNomeChange={(nome) =>
                    updateCheckout({ ...checkout, nome })
                }
                onClasseChange={(classe) =>
                    updateCheckout({ ...checkout, classe })
                }
                onNoteChange={(note) =>
                    updateCheckout({ ...checkout, note })
                }
            />

            <CheckoutOptions
                ritiro={checkout.ritiro}
                pagamento={checkout.pagamento}
                onRitiroChange={(ritiro) =>
                    updateCheckout({ ...checkout, ritiro })
                }
                onPagamentoChange={(pagamento) =>
                    updateCheckout({ ...checkout, pagamento })
                }
                errorsRitiro={errors.ritiro}
                errorsPagamento={errors.pagamento}
            />

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
