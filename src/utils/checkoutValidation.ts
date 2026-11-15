
import type { Checkout } from "../types";

// struttura degli errori associati ai campi del checkout
export type FormErrors = Record<keyof Checkout, string[]>;

// inizializzazione degli errori per tutti i campi
export function emptyErrors(): FormErrors {
    return {
        nome: [],
        classe: [],
        ritiro: [],
        pagamento: [],
        note: [],
    };
}

// validazione dei dati del checkout e restituzione degli errori
export function getCheckoutErrors(
    checkout: Checkout,
    total: number
): FormErrors {
    const errors = emptyErrors();
    const nome = checkout.nome.trim();

    if (!nome) {
        errors.nome.push("Il nome è obbligatorio");
    } else {
        if (nome.length < 2) {
            errors.nome.push("Il nome deve avere almeno 2 caratteri");
        }

        if (/\d/.test(nome)) {
            errors.nome.push("Il nome non può contenere numeri");
        }
    }

    const classe = checkout.classe.trim();

    if (!classe) {
        errors.classe.push("La classe è obbligatoria");
    } else if (!/^[1-5][A-Z]$/.test(classe)) {
        // accetta una cifra da 1 a 5 seguita da una lettera maiuscola
        errors.classe.push("Inserisci una classe valida (es. 4B)");
    }

    // verifica dell'importo minimo richiesto per il pagamento con carta
    if (checkout.pagamento === "carta" && total < 3) {
        errors.pagamento.push(
            "Il pagamento con carta richiede un ordine minimo di 3,00 €"
        );
    }

    // verifica della lunghezza massima delle note
    if (checkout.note.length > 100) {
        errors.note.push("Le note possono avere al massimo 100 caratteri");
    }

    return errors;
}
