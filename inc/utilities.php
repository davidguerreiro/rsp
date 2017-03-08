<?php

/**
*
* PHP logic file.
*
* Contains all the PHP funcionality required by the Game
* The scope of each funciont is global
*
* All funcions must be named using the next namespacing
* convention : ppt_funcion_name()
*
* All functions must be documented using PHPDocs standards
*
* @since 1.0.0
* @author David Guerreiro
* @package ppt/inc/
*/

/**
*
* Get JSON data
*
* File name must be passed as a parameter.
* Do not include extension.
*
* @param String ( required ) $file_name
* @return String $content
*/
function ppt_get_json_content( $file_name ) {

  $content = '';

  if( !is_string( $file_name ) || $file_name == '' )
     return $content;

  return $content;
}

?>
