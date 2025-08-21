export class TimerService {

    createTimer(focusMinutes, breakMinutes, loopAmount){
        return fetch(`restservices/study/timer/create/${focusMinutes}/${breakMinutes}/${loopAmount}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(focusMinutes, breakMinutes, loopAmount)
        })
            .then(response => {
                if (!response.ok){
                    return response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            throw new Error(`Failed to create timer: ${json.message}`);
                        } catch {
                            throw new Error(`Failed to create timer: ${text}`);
                        }
                    });
                }
                return response.json();
            })
            .catch( error => {
                console.error("Error creating timer:", error);
                return null;
            });
    }

    pauseTimer(){
        return fetch("restservices/study/timer/pause", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
            .then(response => {
                if (!response.ok){
                    return response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            throw new Error(`Failed to pause timer: ${json.message}`);
                        } catch {
                            throw new Error(`Failed to pause timer: ${text}`);
                        }
                    });
                }
                return response.json();
            })
            .catch( error => {
                console.error("Error pausing timer:", error);
                return null;
            });
    }

    resumeTimer(){
        return fetch("restservices/study/timer/resume", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
            .then(response => {
                if (!response.ok){
                    return response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            throw new Error(`Failed to resume timer: ${json.message}`);
                        } catch {
                            throw new Error(`Failed to resume timer: ${text}`);
                        }
                    });
                }
                return response.json();
            })
            .catch( error => {
                console.error("Error resuming timer:", error);
                return null;
            });
    }

}