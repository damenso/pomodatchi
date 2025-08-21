export class BuddyService{
    getChosenBuddy(name, chosenBuddy){
        return fetch(`restservices/study/buddy/${name}/${chosenBuddy}`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(name, chosenBuddy)
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