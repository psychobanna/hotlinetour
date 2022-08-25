import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoPage from './pages/NoPage';
import { Header } from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import { ChangePassword } from './pages/ChangePassword';
import { TicketSettings } from './pages/TicketSettings';
import { Agent } from './pages/Agent';
import { ViewBooking } from './pages/ViewBooking';
import { Settings } from './pages/Settings';
import { BookingForm } from './pages/BookingForm';
import { PolicySettings } from './pages/PolicySettings';
import { ProfileSettings } from './pages/ProfileSettings';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ThankYou } from './pages/ThankYou';

const Root = () =>      <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Header />}>
                                    <Route index element={<BookingForm />} />
                                    <Route path="home" element={<Home />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="changepassword" element={<ChangePassword />} />
                                    <Route path="profilesettings" element={<ProfileSettings />} />
                                    <Route path="ticketsettings" element={<TicketSettings />} />
                                    <Route path="policysettings" element={<PolicySettings />} />
                                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                                    <Route path="agent" element={<Agent />} />
                                    <Route path="agent/:id" element={<Agent />} />
                                    <Route path="settings" element={<Settings />} />
                                    <Route path="booking" element={<ViewBooking />} />
                                    <Route path="thankyou/:id" element={<ThankYou />} />
                                    <Route path="forgotpassword" element={<ForgotPassword />} />
                                    <Route path="*" exact={true} element={<NoPage />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>;

let container = document.getElementById('app');
let component = <Root/>;

ReactDOM.render(component, container);  