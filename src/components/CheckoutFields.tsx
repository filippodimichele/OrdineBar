
import FieldErrors from "./FieldErrors";

type CheckoutFieldsProps = {
    nome: string;
    classe: string;
    note: string;
    errorsNome: string[];
    errorsClasse: string[];
    errorsNote: string[];
    onNomeChange: (nome: string) => void;
    onClasseChange: (classe: string) => void;
    onNoteChange: (note: string) => void;
};

function CheckoutFields({
    nome,
    classe,
    note,
    errorsNome,
    errorsClasse,
    errorsNote,
    onNomeChange,
    onClasseChange,
    onNoteChange,
}: CheckoutFieldsProps) {
    return (
        <>
            <div className="space-y-2">
                <label htmlFor="nome" className="font-medium">
                    Nome per il ritiro
                </label>

                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(event) => onNomeChange(event.target.value)}
                    placeholder="Inserisci il tuo nome"
                    className="w-full rounded-lg border border-gray-300 p-3"
                />

                <FieldErrors errors={errorsNome} />
            </div>

            <div className="space-y-2">
                <label htmlFor="classe" className="font-medium">
                    Classe
                </label>

                <input
                    id="classe"
                    type="text"
                    value={classe}
                    onChange={(event) => onClasseChange(event.target.value)}
                    placeholder="Es. 4B"
                    className="w-full rounded-lg border border-gray-300 p-3"
                />

                <FieldErrors errors={errorsClasse} />
            </div>

            <div className="space-y-2">
                <label htmlFor="note" className="font-medium">
                    Note
                </label>

                <textarea
                    id="note"
                    rows={3}
                    value={note}
                    onChange={(event) => onNoteChange(event.target.value)}
                    placeholder="Eventuali richieste"
                    className="w-full rounded-lg border border-gray-300 p-3"
                />

                <p
                    className={`text-sm ${
                        note.length > 100
                            ? "text-red-600"
                            : "text-gray-500"
                    }`}
                >
                    {note.length}/100
                </p>

                <FieldErrors errors={errorsNote} />
            </div>
        </>
    );
}

export default CheckoutFields;
