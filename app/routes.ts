import {index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("users", "pages/users/users.tsx", [
        route("add-user", "pages/users/add_user/add_user.tsx"),
        // route(":id", "pages/user_details/user_details.tsx"),
    ]),

    route("users/:id", "pages/user_details/user_details.tsx"),

] satisfies RouteConfig;

