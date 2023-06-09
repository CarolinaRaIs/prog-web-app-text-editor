const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log("event" + event)
    event.preventDefault();
    window.deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('prompt Event')
    //window.deferredPrompt= keep track of a browser event that the code wants 
    //to defer handling until later (prompt to install the app).
    const promptEvent = window.deferredPrompt;
    //checks if promptEvent exists. If promptEvent is null, undefined, or any other "falsy" value, 
    //this line of code will return and stop the execution of the function.
    if (!promptEvent) {
        return;
    }
    //calls prompt method on promptEvent= window.deferredPrompt
    //prompt= method used to show a prompt to the user
    promptEvent.prompt();
    //clears out the stored event now that it has been used
    window.deferredPrompt = null;
    //classList= a property that exists on all HTML elements in JavaScript, and it's a way to work with the classes of an element. classList gives us a handy way to add, remove, and toggle classes on an HTML element in JavaScript.
    //HTML element like a box, and classList a list or a bag of special stickers that tell us something about the box (sticker= classes). 
        //classList method = toggle = "If the box doesn't have this sticker, put it on. If it does have the sticker, take it off."  
            //true = refers to the toggle. Without this true, if the 'hidden' sticker (class) was already in the box, the toggle command would actually remove it. But with true, toggle will always add the sticker (class).
        //"I want to put the 'hidden' class in butInstall no matter what". Even if the 'hidden' class is already in the html, we put it there again
            //This usually means that something(a button) will become hidden
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully')
    // Clear prompt
    window.deferredPrompt = null;
});
