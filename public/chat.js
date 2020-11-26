const socket = io();


let message = document.getElementById('message');
let username = document.getElementById('username');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

let btn = document.getElementById('send');

message.addEventListener('keypress', () => {
    socket.emit("chat typing", {
        username: username.value
    });
});

socket.on("chat typing", (data) => {
    actions.innerHTML = `
                        <p>
                            <em>${data.username} is typing a message</em>: 
                        </p>
                    `
});

btn.addEventListener('click', () => {
    socket.emit("chat message", {
        message: message.value,
        username: username.value
    });
});
socket.on("chat message", (data) => {
    actions.innerHTML='';
    output.innerHTML += `
                        <p>
                            <strong>${data.username}</strong>: ${data.message}
                        </p>
                    `
});