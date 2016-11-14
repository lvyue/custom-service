$(function () {
    var _a = [$(window), $('#message'), $("#msg-input"), $('#send-msg')], $window = _a[0], $message = _a[1], $input = _a[2], $send = _a[3];
    var _b = [false, io('/cs')], connected = _b[0], socket = _b[1];
    socket.on('msg', function (data) {
        $message.append('<div><span class="user">系统</span>&nbsp;[<span class="time">' + moment().format() + '</span>]:<br><p>' + data.msg + '</p></div>');
    });
    var sendMsg = function () {
        socket.send($input.val());
        $input.val('');
    };
    $send.on('click', sendMsg);
    $input.on('keydown', function (event) {
        if (event.keyCode === 13) {
            sendMsg();
            event.preventDefault();
        }
    });
});
//# sourceMappingURL=index.js.map