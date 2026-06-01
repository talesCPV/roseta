<?php   
	if (IsSet($_POST["path"]) && IsSet($_POST["file"]) && IsSet($_POST["filename"])){

        $file = $_POST["file"];
        $path = getcwd().$_POST["path"];

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $filename = $_POST["filename"];

//        echo $path.$filename;   

        $fp = fopen($path.$filename, "w");
        fwrite($fp,$file);
        fclose($fp); 

        print $file;

    }        
    
?>