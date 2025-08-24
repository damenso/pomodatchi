export class StartupService {
    saveSession(name, chosenBuddy, focusMinutes, breakMinutes, loopAmount, todolist){
        return fetch('restservices/study/session/save', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({name: name, chosenBuddy: chosenBuddy,focusMinutes: focusMinutes,
                breakMinutes: breakMinutes, loopAmount: loopAmount, todolist: todolist})
        })
            .then(async response => {
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
                const text = await response.text();
                return text ? JSON.parse(text) : {};
            })
            .then(data =>{
                sessionStorage.setItem('buddyName', name);
                if (chosenBuddy) sessionStorage.setItem('buddyType', chosenBuddy);
                sessionStorage.setItem('focusMinutes', String(focusMinutes));
                sessionStorage.setItem('breakMinutes', String(breakMinutes));
                sessionStorage.setItem('loopAmount', String(loopAmount));
                sessionStorage.setItem('tasks', JSON.stringify(todolist));
                return data
            })
            .catch(error => {
                console.error("Error saving session data" +
                    ":", error);
                return null;
            });

    }
}