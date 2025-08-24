export class BuddyService{
    getChosenBuddy(name, chosenBuddy){
        let fetchData = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({name: name, chosenBuddy : chosenBuddy})
        }
        return fetch(`restservices/study/buddy/`, fetchData)
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