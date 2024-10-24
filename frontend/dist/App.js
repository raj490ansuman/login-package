import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
var App = function () {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/login", element: _jsx(LoginForm, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) })] }) }));
};
export default App;
