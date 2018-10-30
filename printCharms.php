<?php
  date_default_timezone_set('America/New_York');

  $totalPrice = number_format(floatval($_POST["totalPrice"]), 2);
  $postData = json_decode($_POST["data"]);

  $fileName = date("U")."_favoriteList.html";

  $fhandle = fopen($fileName, 'w') or die('Cannot openf file: ' . $fileName);

  $pageOutput = "<html><head><title></title><style> body{ font-size: 10px; } </style></head><body><table width='600'><tr><td><a href='http://www.kay.com' target='_blank' style='color:black; text-decoration: none;'><img src='http://www.charmedmemories.com/sellingSystem/images/cmLogo.png' /></a></td><br><br><tr><td colspan='3'><h3>Here are the charms you selected!</h3><br></td></tr>
  <tr><td><h3>You have " . $_POST["totalQuantity"] ." favorites selected</h3></td></tr><br>";

  for($n = 0; $n < count($postData); $n++) {

    $pageOutput .= "<tr style='margin-bottom: 1.5cm;'><td><img src='http://www.charmedmemories.com/sellingSystem/images/charmImages/" . $postData[$n]->SKU . ".jpg'" . " style='float: left; margin-right: 1.25cm; margin-bottom: 1.5cm; width: 2.00cm; height: 2.00cm;' />" .
                   "<small><strong>SKU:</strong>         " . $postData[$n]->SKU . "</small><br>" .
                   "<small><strong>PRICE:</strong>       " . "$" . $postData[$n]->Retail . "</small><br>" .
                   "<small><strong>QUANTITY:</strong>    " . $postData[$n]->quantity . "</small><br>" .
                   "<small><strong>THEME:</strong>       " . $postData[$n]->Theme . "</small><br>" .
                   "<small><strong>DESCRIPTION:</strong> " . $postData[$n]->Description . "</small><br><br></td></tr>";
  }

  $pageOutput .= "<tr><td><h3>Total Price: $" . $totalPrice . "</h3></td></tr></table></body></html>";

  fwrite($fhandle, $pageOutput);
  fclose($fhandle);

  //echo $pageOutput;
  echo $fileName;
?>
