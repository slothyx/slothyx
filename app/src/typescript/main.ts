import {greetPerson} from "./utility/greeter";

function showHello(divName: string, name: string) {
    const el = document.getElementById(divName);
    el.innerText = greetPerson(name);
}

showHello("greeting", "Matthias");

