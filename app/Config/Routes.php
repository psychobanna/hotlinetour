<?php

namespace Config;

use App\Controllers\AdminController;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (is_file(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
//$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');


error_reporting(-1);
ini_set('display_errors', '1');

$routes->post('/api/login', 'AdminController::login');
$routes->get('/api/checktokenstatus', 'AdminController::checkTokenStatus');
$routes->post('/api/changepassword/(:num)', 'AdminController::ChangePassword');
$routes->post('/api/editpaymentsettings', 'AdminController::PaymentSettings');
$routes->get('/api/viewpaymentkeyvalue', 'AdminController::ViewPaymentKeyValue');


$routes->post('/api/addagent', 'AgentController::AddAgent');
$routes->get('/api/viewagent', 'AgentController::ViewAgent');
$routes->get('/api/viewagent/(:num)', 'AgentController::ViewAgent');
$routes->get('/api/viewactiveagent', 'AgentController::ViewActiveAgent');
$routes->post('/api/editagent/(:num)', 'AgentController::EditAgent');
$routes->delete('/api/deleteagent/(:num)', 'AgentController::DeleteAgent');

$routes->get('/api/viewticket', 'TicketController::ViewTicket');
$routes->post('/api/editticket', 'TicketController::EditTicket');

$routes->post('/api/addpage', 'PagesController::AddPage');
$routes->get('/api/viewpage', 'PagesController::ViewPage');
$routes->get('/api/viewpage/(:num)', 'PagesController::ViewPage');
$routes->get('/api/viewactivepage', 'PagesController::ViewActivePage');
$routes->get('/api/viewactivepage/(:num)', 'PagesController::ViewActivePage');
$routes->post('/api/editpage/(:num)', 'PagesController::EditPage');
$routes->delete('/api/deletepage/(:num)', 'PagesController::DeletePage');

$routes->post('/api/addbooking', 'BookingController::AddBooking');
$routes->get('/api/viewbooking', 'BookingController::ViewBooking');
$routes->get('/api/ticketstatus', 'BookingController::TicketStatus');
$routes->get('/api/thankyou/(:num)', 'BookingController::ViewBookingById');


/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}

$routes->set404Override(function () {
    echo view('welcome_message');
});