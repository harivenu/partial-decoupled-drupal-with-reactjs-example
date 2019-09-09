<?php

  namespace Drupal\init_partial_decoupled\Controller;

  use Drupal\Core\Controller\ControllerBase;
  use Drupal\Core\Database\Database;
  use Symfony\Component\HttpFoundation\JsonResponse;

  /**
   * Controller class.
   */
  class NewsController extends ControllerBase {
    /**
     * News data
     */
    public function news_all() {
      $connection = Database::getConnection();
      $arr = Array();
      /*
       * Query to get the data from database
       * */
      $query = $connection -> select ('node_field_data', 'nfd');
      $query-> fields ('nfd', ['nid', 'title']);
      $query-> fields ('nsd', ['body_value']);
      $query-> join ('node__body', 'nsd', 'nsd.entity_id = nfd.nid');
      $query->condition('nfd.type', 'news');
      $rawdata = $query->execute()->fetchAll();
      foreach($rawdata as $keyrawdata => $valuerawdata) {
        $arr[$keyrawdata]['nid'] = $valuerawdata->nid;
        $arr[$keyrawdata]['title'] = $valuerawdata->title;
        //$arr[$keyrawdata]['body'] = $valuerawdata->body_value;
      }
      $response = $arr;
      return new JsonResponse( $response );
    }
    public function news_json($nid) {
      $connection = Database::getConnection();
      $arr = Array();
      /*
       * Query to get the data from database
       * */
      $query = $connection -> select ('node_field_data', 'nfd');
      $query-> fields ('nfd', ['nid', 'title']);
      $query-> fields ('nsd', ['body_value']);
      $query-> join ('node__body', 'nsd', 'nsd.entity_id = nfd.nid');
      $query->condition('nfd.type', 'news');
      $query->condition('nfd.nid', $nid);
      $rawdata = $query->execute()->fetchAll();
      foreach($rawdata as $keyrawdata => $valuerawdata) {
        $arr[$keyrawdata]['nid'] = $valuerawdata->nid;
        $arr[$keyrawdata]['title'] = $valuerawdata->title;
        $arr[$keyrawdata]['body'] = $valuerawdata->body_value;
      }
      $response = $arr;
      return new JsonResponse( $response );
    }

  }


