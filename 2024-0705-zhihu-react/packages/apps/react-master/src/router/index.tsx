import React from "react";
import { Outlet, RouteObject } from "react-router-dom";
import Home from "../pages/home";
import Education from "../pages/education";
import Learning from "../pages/education/learning";
// import CommandList from "../pages/home/commandList";
import CommandList from "../pages/home/commandList/comd";

export interface extraBizObject {
    title?: string;
    isShown?: boolean;
}

export type ZHRouter = Array<RouteObject & extraBizObject>

export const router: ZHRouter = [
    {
        path: '/', element: <Home />, title: "首页", isShown: true,
        children: [
            { path: "", element: <CommandList /> },
            { path: "/follow", element: <div>follow</div> },
            { path: "/hot", element: <div>hot</div> },
            { path: "/zvideo", element: <div>zvideo</div> },
        ]
    },
    {
        path: '/education', element: <Education />, title: "知乎知学堂", isShown: true,
        children: [
            { path: "learning", element: <Learning /> },
        ]
    },
    {
        path: '/explore', element: <div>explore</div>, title: "发现"
    },
    {
        path: '/question', element: <div>question</div>, title: "等你来答", isShown: true,
        children: [
            { path: "waiting", element: <div>waiting</div> },
        ]
    },
]