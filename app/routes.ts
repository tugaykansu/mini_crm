import {index, route, type RouteConfig} from "@react-router/dev/routes";
import { Navigate } from 'react-router-dom';


export default [
    index("pages/redirect_to_users.tsx"),
    route("users", "pages/users_page/users_page.tsx", [
        route("add-user", "pages/users_page/add_user_modal/add_user_modal.tsx"),
        route("filter-users", "pages/users_page/filter_users_modal/filter_users_modal.tsx"),
    ]),
    route("users/:id", "pages/user_details_page/user_details_page.tsx"),
] satisfies RouteConfig;

