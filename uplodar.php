<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Uploader </title>
  <link rel="stylesheet" href="uploder.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
</head>
<body>
    <?php
  //$file_name: Retrieves the original name of the uploaded file from the $_FILES superglobal array using the key 'file'.
  $file_name =  $_FILES['file']['name'];
  //$tmp_name: Retrieves the temporary name/location of the uploaded file from the $_FILES superglobal array using the key 'file'
  $tmp_name = $_FILES['file']['tmp_name'];
  //$file_up_name: Generates a unique file name by concatenating the current timestamp (obtained using time()) with the original file name.
  $file_up_name = time().$file_name;
  //move_uploaded_file: Moves the uploaded file from its temporary location ($tmp_name) to the desired directory ("files/") with the new file name ($file_up_name).
  move_uploaded_file($tmp_name, "files/".$file_up_name);
?>
  <div class="container">
    <header>File Uploader JavaScript</header>
    <form action="#">
      <input class="file-input" type="file" name="file" hidden>
      <i class="fas fa-cloud-upload-alt"></i>
      <p>Browse File to Upload</p>
    </form>
    <section class="progress-area"></section>
    <section class="uploaded-area"></section>
  </div>

  <script src="uploder.js"></script>

</body>
</html>