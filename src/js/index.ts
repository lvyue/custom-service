$(() => {
    var [$window, $message, $input, $send] = [$(window), $('#message'), $("#msg-input"), $('#send-msg')];
    var [connected, socket] = [false, io('/cs')];

    socket.on('msg', (data:any) => {
        $message.append('<div><span class="user">系统</span>&nbsp;[<span class="time">'+ moment().format() +'</span>]:<br><p>'+ data.msg +'</p></div>');
    });
    var sendMsg =  () => {
        socket.send($input.val());
        $input.val('');
    };
    $send.on('click', sendMsg);
    $input.on('keydown', (event) =>{
        if (event.keyCode === 13){
            sendMsg();
            event.preventDefault();
        }
    });
});