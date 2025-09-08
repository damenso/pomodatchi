export class TimerService {

    createTimer(focusMinutes, breakMinutes, loopAmount){
        const url = `restservices/study/timer/create/${focusMinutes}/${breakMinutes}/${loopAmount}`;
        return fetch (url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
        .then(async response => {
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
            const text = await response.text();
            return text ? JSON.parse(text) : {};
        })
        .then (data => {
            sessionStorage.setItem("focusMinutes", String(focusMinutes));
            sessionStorage.setItem("breakMinutes", String(breakMinutes));
            sessionStorage.setItem("loopAmount", String(loopAmount));
            return data;
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
            .then(async response => {
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
                const text = await response.text();
                return text ? JSON.parse(text) : {};
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
            .then(async response => {
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
                const text = await response.text();
                return text ? JSON.parse(text) : {};
            })
            .catch( error => {
                console.error("Error resuming timer:", error);
                return null;
            });
    }

    getFocus(){
        const focusTime = Number(sessionStorage.getItem("focusMinutes") ?? 25);
        return focusTime;
    }

    getBreak(){
        const breakTime = Number(sessionStorage.getItem("breakMinutes") ?? 5);
        return breakTime;
    }

    getLoops(){
        const loops = Number(sessionStorage.getItem("loopAmount") ?? 2);
        return loops;
    }

}