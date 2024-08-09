import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp, ConfigProvider, Typography } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { getApiEndpoint, getAxiosInstance } from "./config/network";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import {
  OrganizationCreate,
  OrganizationEdit,
  OrganizationList,
  OrganizationShow,
} from "./pages/organizations";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";
import { dataProvider } from "./rest-data-provider";
import {
  ExperienceCreate,
  ExperienceEdit,
  ExperienceList,
  ExperienceShow,
} from "./pages/experiences";
import {
  ActivityCreate,
  ActivityEdit,
  ActivityList,
  ActivityShow,
} from "./pages/activities";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { ApartmentOutlined, CalendarOutlined, EnvironmentOutlined, GlobalOutlined, HeartOutlined, PartitionOutlined, UserOutlined } from "@ant-design/icons";

function App() {
  const apiEndpoint = getApiEndpoint();
  const httpClient = getAxiosInstance();

  return (
    <BrowserRouter basename="/admin">
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider(apiEndpoint, httpClient)}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <UserOutlined />,
                  },
                },
                {
                  name: "organizations",
                  list: "/organizations",
                  create: "/organizations/create",
                  edit: "/organizations/edit/:id",
                  show: "/organizations/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <HeartOutlined />
                  },
                },
                {
                  name: "experiences",
                  list: "/experiences",
                  create: "/experiences/create",
                  edit: "/experiences/edit/:id",
                  show: "/experiences/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <EnvironmentOutlined />
                  },
                },
                {
                  name: "activities",
                  list: "/activities",
                  create: "/activities/create",
                  edit: "/activities/edit/:id",
                  show: "/activities/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <CalendarOutlined />
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                    icon: <PartitionOutlined />
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "Lrcfu8-KRbdRN-IPXpIw",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={(props) => (
                          <ThemedSiderV2
                            {...props}
                            Title={() => <Typography>ATTIVATI</Typography>}
                            fixed
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/organizations">
                    <Route index element={<OrganizationList />} />
                    <Route path="create" element={<OrganizationCreate />} />
                    <Route path="edit/:id" element={<OrganizationEdit />} />
                    <Route path="show/:id" element={<OrganizationShow />} />
                  </Route>

                  <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path="create" element={<UserCreate />} />
                    <Route path="edit/:id" element={<UserEdit />} />
                    <Route path="show/:id" element={<UserShow />} />
                  </Route>

                  <Route path="/experiences">
                    <Route index element={<ExperienceList />} />
                    <Route path="create" element={<ExperienceCreate />} />
                    <Route path="edit/:id" element={<ExperienceEdit />} />
                    <Route path="show/:id" element={<ExperienceShow />} />
                  </Route>

                  <Route path="/activities">
                    <Route index element={<ActivityList />} />
                    <Route path="create" element={<ActivityCreate />} />
                    <Route path="edit/:id" element={<ActivityEdit />} />
                    <Route path="show/:id" element={<ActivityShow />} />
                  </Route>

                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
