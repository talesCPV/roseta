<?php   
	if (IsSet($_POST["path"]) && IsSet($_POST["file"])){
        $file = $_POST["file"];
        $json = json_decode(json_decode($file));
        $filename =  explode(".",$json->name)[0].".rst";
        $path = getcwd().$_POST["path"];
//echo $path;        

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $fp = fopen($path.$filename, "w");
        fwrite($fp,json_encode($json));
        fclose($fp); 

        print $file;

    }        
    
?>