import { useState } from "react"


export const useHandleSubmit = (submitCallback, successMes, errorMes) => {
    const [validated, setValidated] = useState(false)

    const handleSubmit = async (e,...parameters) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true)
            return;
        }
        setValidated(true)
        try {
            const data = await submitCallback(...parameters);
            console.log("Response data:", data);
            if (data && data.EC === 0) {
                alert(successMes);
                return data;
            } else {
                alert(data?.EM || errorMes)
                return null;
            }
        } catch (error) {
            alert("An Error Occurred. Please try again")
            console.log(error)
            return null
        }
    };
    return { validated, handleSubmit }
}
