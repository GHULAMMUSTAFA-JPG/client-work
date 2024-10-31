// useForm.ts
import { useState } from 'react';

interface UseFormProps {
    initialValues: Record<string, any>;
    validate?: (values: Record<string, any>) => Record<string, string>;
}

const useForm = ({ initialValues, validate }: UseFormProps) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });

        if (validate) {
            const validationErrors = validate({ ...values, [name]: value });
            setErrors(validationErrors);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, callback: () => void) => {
        event.preventDefault();
        if (!validate || Object.keys(errors).length === 0) {
            callback();
        }
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useForm;
