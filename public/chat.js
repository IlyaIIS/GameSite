//Make connection
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message');
var handle = document.getElementById('currentUser');
var btn = document.getElementById('send');
var output = document.getElementById('output');


// emit events

btn.addEventListener('click',function(){
  if (handle.value != 'гость'){
    socket.emit('chat',{
      message: message.value,
      handle: handle.value
    });

    message.value = '';
  } else {
    alert('Авторизуйтесь, чтобы пользоваться чатом');
  }

});

//listen for events

socket.on('chat', function(data) {
  output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
});
