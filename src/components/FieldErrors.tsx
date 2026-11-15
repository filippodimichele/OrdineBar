
type FieldErrorsProps = {
    errors: string[];
};

// consegna medio: visualizzazione degli errori associati a un campo
function FieldErrors({ errors }: FieldErrorsProps) {
    if (errors.length === 0) {
        return null;
    }

    return (
        <ul className="space-y-1 text-sm text-red-600">
            {errors.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
        </ul>
    );
}

export default FieldErrors;
