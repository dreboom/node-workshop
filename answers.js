function printStuff() {
    for (var i = 0; i < 10; i++) {
        console.log('Hello World!');
    }
}

printStuff()

setTimeout(function () {
	printStuff();
	console.log('Hello World Again!!');
}, 10000);

