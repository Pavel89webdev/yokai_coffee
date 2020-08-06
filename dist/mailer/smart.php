<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$payment = $_POST['payment'];
$item1 = $_POST['item1'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'pafnyti89@yandex.ru';                 // Наш логин
$mail->Password = 'wide_enough_else';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('pafnyti89@yandex.ru', 'Yokaicoffee_order_service');   // От кого письмо 
$mail->addAddress('erpavel1989@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    =  "Пользователь оставил данные <br> \r\n 
Имя: $name <br>\r\n
Номер телефона: $phone <br>\r\n
E-mail: $email <br>\r\n
<br>\r\n
Оплата: $payment <br>\r\n
<br>\r\n
$item1 <br>\r\n
Конец сообщения";

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>