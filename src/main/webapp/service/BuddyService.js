export class BuddyService{
    getChosenBuddy(buddy){
        return fetch('restservices/study/buddy/', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(buddy)
        })
            .then(response => {
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
                return response.json();
            })
            .catch(error => {
                console.error("Error getting buddy:", error);
                return null;
            });
    }


}