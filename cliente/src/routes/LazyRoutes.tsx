import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingIcon from "@/constants/Icons";
import lazyRoutes from "@/constants/lazyRoutes";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function LazyRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingIcon />}>
          <Routes>
            {lazyRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.lazyComponent />}
              >
                {route.children &&
                  route.children.map((child, childIndex) => (
                    <Route
                      key={childIndex}
                      path={child.path}
                      element={<child.lazyComponent />}
                    />
                  ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default LazyRoutes;
