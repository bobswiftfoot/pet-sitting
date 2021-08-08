module.exports = {
    //For debuging values sent to handlebars
    debug: optionalValue =>
    {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
    
        if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
        }
    }
};  