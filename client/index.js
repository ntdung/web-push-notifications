const client = (() => {

    let serviceWorkerRegObj = undefined;
    const notificationButton = document.getElementById("btn-notify");

    const showNotificationButton = () => {
        notificationButton.style.display = "block";
        notificationButton.addEventListener("click", showNotification);
    }

    const showNotification = () => {
        const simpleTextNotification = reg => reg.showNotification("My First Notification")

        const customizedNotification = reg => {
            const options = {
                body: 'This is an important body!'
            }
            reg.showNotification('Second Notification', {
                body: "Buzz! Buzz!",
               
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: "vibration-sample",
              })
        }
        navigator.serviceWorker.getRegistration()
        .then(registration => customizedNotification(registration));
    }

    const checkNotificationSupport = () => {
        if (!('Notification' in window)) {
            return Promise.reject("The browser doesn't support notifications.")
        }
        console.log("The browser supports notifications!")

        return Promise.resolve("Ok!")
    }

    const registerServiceWorker = () =>{
        if (!('serviceWorker' in navigator)) {
            return Promise.reject("ServiceWorker support is not available.")
        }

        return navigator.serviceWorker.register('service-worker.js')
            .then(regObj => {
                console.log("service worker is registered successfully!");
                serviceWorkerRegObj = regObj;
                showNotificationButton();
            })
    }

    const requestNotificationPermissions = () => {
        return Notification.requestPermission(status => {
            console.log("Notification permission status: ", status);
        })
    }
    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermissions)
        .catch(err => console.error(err))
})()