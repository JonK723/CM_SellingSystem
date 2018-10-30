<?php
  require("sendgrid-php/sendgrid-php.php");

  date_default_timezone_set('America/New_York');

  $name = $_POST["userName"];
  $email = $_POST["email"];
  $totalPrice = number_format(floatval($_POST["totalPrice"]), 2);
  $postData = json_decode($_POST["data"]);
  $fileName = date("U")."_favoriteList.html";

  $pageOutput = "<html><head><title></title></head><body style='font-size: 12px;'>" . "<table><tr><td>" . "<a href='http://www.kay.com' target='_blank' style='color:black; text-decoration: none;'><img src='http://www.charmedmemories.com/sellingSystem/images/cmLogo.png' style='text-align: center;' /></a></td><br><br><tr><td colspan='3'><h3>" . $name . ", here are the charms you selected!</h3><br></td></tr><tr><td><h3>You have " . $_POST["totalQuantity"] ." favorites selected</h3></td></tr><br>";

  for($n = 0; $n < count($postData); $n++) {

    $pageOutput .= "<tr><td><img src='http://www.charmedmemories.com/sellingSystem/images/charmImages/" . $postData[$n]->SKU . ".jpg'" . " width='150' height='150' /></td><td>" .
                   "<strong>SKU:</strong>         " . $postData[$n]->SKU . "<br>" .
                   "<strong>PRICE:</strong>       " . "$" . $postData[$n]->Retail . "<br>" .
                   "<strong>QUANTITY:</strong>    " . $postData[$n]->quantity . "<br>" .
                   "<strong>THEME:</strong>       " . $postData[$n]->Theme . "<br>" .
                   "<strong>DESCRIPTION:</strong> " . $postData[$n]->Description . "<br></td></tr>";
  }

  $pageOutput .= "<tr><td><h3>Total Price: $" . $totalPrice . "</h3></td></tr></table></body></html>";

  $sendgrid = new SendGrid('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');

  $sgEmail = new SendGrid\Email();
  $sgEmail
  ->addTo($email)
  ->setFrom('no-reply@charmedmemories.com', 'Charmed Memories')
  ->setSubject('Your Charmed Memories selections from Kay Jewelers!')
  ->setHtml($pageOutput);

  try {
    $sendgrid->send($sgEmail);
    echo "true";
  } catch(\SendGrid\Exception $e) {
    echo "false";
  }

  // if(mail($email, "Your Selected Charmed Memories Charms " . date("m.d.y  g:i"), $pageOutput, $headers, '-fno-reply@charmedmemories.com') == true){
  //   echo "true";
  // } else {
  //   echo "false";
  // }

//var_dump($_REQUEST);
?>
