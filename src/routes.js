/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import DogsPageIcon from "@material-ui/icons/Pets";
// core components/views for Admin layout
import DogsPage from "views/Dogs/Dogs.js";

const dashboardRoutes = [
    {
        path: "/dogs",
        name: "Dog Search",
        rtlName: "لوحة القيادة",
        icon: DogsPageIcon,
        component: DogsPage,
        layout: "/admin"
    },
];

export default dashboardRoutes;
