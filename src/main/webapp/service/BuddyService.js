export class BuddyService{
    getChosenBuddy(name, chosenBuddy){
        const url = `/restservices/study/buddy/${name}/${chosenBuddy}`;
        return fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
        })
            .then(async response => {
                if (!response.ok){
                    return response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            throw new Error(`Failed to retrieve chosen buddy: ${json.message}`);
                        } catch {
                            throw new Error(`Failed to retrieve chosen buddy: ${text}`);
                        }
                    });
                }
                const text = await response.text();
                return text ? JSON.parse(text) : {};
            })
            .then(data =>{
                sessionStorage.setItem('buddyName', name);
                if (chosenBuddy) sessionStorage.setItem('buddyType', chosenBuddy);
                return data;
            })
            .catch(error => {
                console.error("Error getting buddy:", error);
                return null;
            });
    }


}