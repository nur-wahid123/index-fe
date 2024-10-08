export async function postFetch(url: string, data: any) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
    });
    if (res && res.ok) { // Check if the response is successful
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            return data || null; // Return the data if it exists, otherwise return null
        }
    }
    return null;
}

export async function getFetch(url: string) {
    const res = await fetch(url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    });
    return await res.json();
}