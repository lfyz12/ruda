import {ReactElement} from "react";
import {
    ADMINROUTER,
    DASHBOARDROUTER, DEVICEROUTER,
    LOGINROUTER,
    REGISTROUTER,
    TASKLOGROUTER,
    TASKROUTER,
    WORKSESSIONROUTER
} from "./utils/consts";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import WorkSessionPage from "./pages/workSessionPage/WorkSessionPage";
import TaskPage from "./pages/task/TaskPage";
import TaskTimeLogsPage from "./pages/taskTimeLogsPage/TaskTimeLogsPage";
import DeviceTable from "./pages/DeviceTable";
import AdminPanel from "./pages/AdminPanel";

export interface IRoutes {
    path: string
    element: ReactElement
}

export const publicRoutes: IRoutes[] = [
    {
        path: LOGINROUTER,
        element: <Auth/>
    },
    {
        path: REGISTROUTER,
        element: <Auth/>
    }
]

export const authRoutes: IRoutes[] = [
    {
        path: DASHBOARDROUTER,
        element: <Dashboard/>
    },
    {
        path: WORKSESSIONROUTER,
        element: <WorkSessionPage/>
    },
    {
        path: TASKROUTER,
        element: <TaskPage/>
    },
    {
        path: TASKLOGROUTER,
        element: <TaskTimeLogsPage/>
    },
    {
        path: DEVICEROUTER,
        element: <DeviceTable/>
    },
    {
        path: ADMINROUTER,
        element: <AdminPanel/>
    },
]