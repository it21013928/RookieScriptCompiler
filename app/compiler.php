<?php
$language = strtolower($_POST['language']);

if ($language == "python"){
    $language = "py";
}
$code = $_POST['code'];

$random = substr(md5(mt_rand()), 0, 7);
$filePath = "D:\\xampp\htdocs\RookieScriptCompiler\app\\temp\\" . $random . "." . $language;
$programFile = fopen($filePath, "w");
fwrite($programFile, $code);
fclose($programFile);

if ($language == "php") {
    $output = shell_exec("D:\\xampp\php\php.exe $filePath 2>&1");
    if ($output === null) {
        echo "Command execution failed.";
    } else {
        echo  $output;
    }
   
}
if ($language == "py") {
    $output = shell_exec("python $filePath 2>&1");
    echo $output;
}
if ($language == "java") {
    $files = glob("D:\\xampp\htdocs\RookieScriptCompiler\app\\temp\\" . '/*');

    // Loop through the files and delete them
    foreach ($files as $file) {
        // Check if the file is a regular file (not a directory)
        if (is_file($file)) {
            unlink($file); // Delete the file
        }
    }
    sleep(1);
    $random = substr(md5(mt_rand()), 0, 7);
    $filePath = "D:\\xampp\htdocs\RookieScriptCompiler\app\\temp\\" . $random . "." . $language;
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $code);
    fclose($programFile);
    sleep(3);
    $output = shell_exec("javac $filePath 2>&1");

    sleep(1);
    // Get a list of files in the directory (excluding '.' and '..')
    $files = array_diff(scandir("D:\\xampp\htdocs\RookieScriptCompiler\app\\temp\\"), array('..', '.'));

    $fileCount = count($files);

    if (!($fileCount === 2)) {
        echo $output;
    }else{
        // Get a list of files in the directory
    $files = glob("D:\\xampp\htdocs\RookieScriptCompiler\app\\temp\\*.class");


    // Sort the files by their creation time in descending order
    usort($files, function ($a, $b) {
        return filectime($b) <=> filectime($a);
    });

    // Get the name of the last created file
    if (!empty($files)) {
        $lastCreatedFile = $files[0];
        $pathInfo = pathinfo($lastCreatedFile);
        $lastCreatedFileName = $pathInfo['filename']; // This will give you the file name without extension
        // $lastCreatedFileName = basename($lastCreatedFile);
        // echo "The last created file is: $lastCreatedFileName";
        $command = 'cd "D:\\xampp\\htdocs\\RookieScriptCompiler\\app\\temp\\" && java ' . $lastCreatedFileName . ' 2>&1';
        $output = shell_exec($command);      
        echo $output;
    } else {
        echo "No files found";
}}

}