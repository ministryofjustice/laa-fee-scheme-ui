import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;

const sanitiseFormData = (formData) => {
    if (!formData.boltonItems) return formData;
    return {
        ...formData,
        boltonItems: formData.boltonItems.map(({ id, ...rest }) => rest),
    };
};

export const submitAdvocacyFeeRequest = async (formData) => {
    const response = await axios.post(apiUrl, sanitiseFormData(formData), {
        headers: {
            Authorization: apiToken,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
