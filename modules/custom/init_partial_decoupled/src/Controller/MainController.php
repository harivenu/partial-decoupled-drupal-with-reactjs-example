<?php

  namespace Drupal\init_partial_decoupled\Controller;

  use Drupal\Core\Controller\ControllerBase;

  /**
   * Controller class.
   */
  class MainController extends ControllerBase {
    /**
     * Overview of content.
     */
    public function article() {
      $html = <<<HTML
<div class="region region-content">
<div id="app-root"></div>
</div>
HTML;

      $response = array(
        '#markup' => $html,
      );

      return $response;
    }
    public function news() {
      $html = <<<HTML
<div class="region region-content">
<div id="app-root"></div>
</div>
HTML;

      $response = array(
        '#markup' => $html,
      );

      return $response;
    }
  }


