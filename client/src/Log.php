<?php
$myfile = fopen("C:\Users\smd052\Desktop\sam.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("C:\Users\smd052\Desktop\sam.txt"));
fclose($myfile);
?>