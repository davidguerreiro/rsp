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
* Call this function from root. It may returns null if the file name is not read
*
* @param String ( required ) $file_name
* @return String $content || null 
*/
function ppt_get_json_content( $file_name ) {

  $content = '';

  if( !is_string( $file_name ) || $file_name == '' )
     return $content;

  $path    = './json/' . $file_name . '.json';
  $content = json_decode( file_get_contents( $path ) );

  return $content;

}

/**
 * Get best players data
 *
 * @return Array $players 
 */
function ppt_get_best_players() {
 
  $json_content = ppt_get_json_content( 'best_players' );

  if( is_object( $json_content ) 
      && property_exists( $json_content, 'players')
      && is_array( $json_content->players ) 
  ) 
    return $json_content->players;

  return array();

}

?>
