export class StartupService {
    getSessionStartupData(name, chosenBuddy, focusMinutes, breakMinutes, loopAmount, todolist){
        return fetch('restservices/study/session/save', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify(name, chosenBuddy, focusMinutes, breakMinutes, loopAmount, todolist)
        })
            .then(response => {
                if (!response.ok){
                    return response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            throw new Error(`Failed to retrieve session data: ${json.message}`);
                        } catch {
                            throw new Error(`Failed to retrieve session data: ${text}`);
                        }
                    });
                }
                return response.json();
            })
            .catch(error => {
                console.error("Error saving session data" +
                    ":", error);
                return null;
            });

    }
}