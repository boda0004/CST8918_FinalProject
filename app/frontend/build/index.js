var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action,
  default: () => Index,
  loader: () => loader,
  meta: () => meta
});
import { json } from "@remix-run/node";
import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";

// app/api-services/open-weather-service.ts
async function getWeatherByCity(city) {
  try {
    let backendUrl = getBackendUrl(), response = await fetch(`${backendUrl}/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok)
      throw new Error(`Weather API returned ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    throw console.error("Error fetching weather data:", error), new Error(
      error instanceof Error ? `Failed to fetch weather data: ${error.message}` : "Failed to fetch weather data"
    );
  }
}
function getBackendUrl() {
  return typeof window < "u" ? "http://localhost:3000" : process.env.BACKEND_URL || "http://localhost:3000";
}
function formatTemperature(temp) {
  return `${Math.round(temp)}\xB0C`;
}
function capitalizeDescription(description) {
  return description.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// app/routes/_index.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Weather App" },
  { name: "description", content: "Get current weather information for any city" }
], loader = async () => {
  try {
    let defaultWeather = await getWeatherByCity("Ottawa");
    return json({ defaultWeather });
  } catch {
    return json({ defaultWeather: null, error: "Failed to load default weather" });
  }
}, action = async ({ request }) => {
  let city = (await request.formData()).get("city");
  if (!city || city.trim() === "")
    return json(
      { error: "Please enter a city name" },
      { status: 400 }
    );
  try {
    let weather = await getWeatherByCity(city.trim());
    return json({ weather });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
      { status: 500 }
    );
  }
};
function Index() {
  let { defaultWeather } = useLoaderData(), actionData = useActionData(), navigation = useNavigation(), [city, setCity] = useState(""), isLoading = navigation.state === "submitting", currentWeather = actionData?.weather || defaultWeather;
  return /* @__PURE__ */ jsxDEV3("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: /* @__PURE__ */ jsxDEV3("div", { style: { maxWidth: "800px", margin: "0 auto", padding: "2rem" }, children: [
    /* @__PURE__ */ jsxDEV3("h1", { style: { textAlign: "center", color: "#2563eb", marginBottom: "2rem" }, children: "\u{1F324}\uFE0F Weather App" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 59,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { style: { marginBottom: "2rem" }, children: /* @__PURE__ */ jsxDEV3(Form, { method: "post", style: { display: "flex", gap: "1rem", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxDEV3(
        "input",
        {
          type: "text",
          name: "city",
          value: city,
          onChange: (e) => setCity(e.target.value),
          placeholder: "Enter city name (e.g., Toronto, London)",
          style: {
            flex: 1,
            padding: "0.75rem",
            border: "2px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem"
          },
          disabled: isLoading
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 65,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV3(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          style: {
            padding: "0.75rem 1.5rem",
            backgroundColor: isLoading ? "#9ca3af" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            cursor: isLoading ? "not-allowed" : "pointer"
          },
          children: isLoading ? "Loading..." : "Get Weather"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 80,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 64,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    actionData?.error && /* @__PURE__ */ jsxDEV3("div", { style: {
      padding: "1rem",
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      borderRadius: "0.5rem",
      marginBottom: "2rem",
      border: "1px solid #fecaca"
    }, children: [
      "\u274C ",
      actionData.error
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 99,
      columnNumber: 11
    }, this),
    currentWeather && /* @__PURE__ */ jsxDEV3("div", { style: {
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "1rem",
      padding: "2rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }, children: [
      /* @__PURE__ */ jsxDEV3("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }, children: [
        /* @__PURE__ */ jsxDEV3("div", { children: [
          /* @__PURE__ */ jsxDEV3("h2", { style: { margin: 0, color: "#1e293b", fontSize: "1.5rem" }, children: [
            "\u{1F4CD} ",
            currentWeather.data.name,
            ", ",
            currentWeather.data.sys.country
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 121,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { style: { margin: "0.5rem 0", color: "#64748b" }, children: [
            "Data source: ",
            currentWeather.source === "cache" ? "\u{1F4E6} Cache" : "\u{1F310} Live API"
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 124,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 120,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { style: { textAlign: "right" }, children: [
          /* @__PURE__ */ jsxDEV3("div", { style: { fontSize: "3rem", margin: 0 }, children: formatTemperature(currentWeather.data.main.temp) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 129,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("div", { style: { color: "#64748b" }, children: [
            "Feels like ",
            formatTemperature(currentWeather.data.main.feels_like)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 132,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 128,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }, children: [
        /* @__PURE__ */ jsxDEV3("div", { children: [
          /* @__PURE__ */ jsxDEV3("h3", { style: { color: "#374151", marginBottom: "0.5rem" }, children: "\u{1F324}\uFE0F Conditions" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 140,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: capitalizeDescription(currentWeather.data.weather[0].description) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 141,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { children: [
          /* @__PURE__ */ jsxDEV3("h3", { style: { color: "#374151", marginBottom: "0.5rem" }, children: "\u{1F321}\uFE0F Temperature" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 145,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: [
            "High: ",
            formatTemperature(currentWeather.data.main.temp_max)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 146,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: [
            "Low: ",
            formatTemperature(currentWeather.data.main.temp_min)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 147,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 144,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { children: [
          /* @__PURE__ */ jsxDEV3("h3", { style: { color: "#374151", marginBottom: "0.5rem" }, children: "\u{1F4A7} Details" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 151,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: [
            "Humidity: ",
            currentWeather.data.main.humidity,
            "%"
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 152,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: [
            "Pressure: ",
            currentWeather.data.main.pressure,
            " hPa"
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 153,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 150,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { children: [
          /* @__PURE__ */ jsxDEV3("h3", { style: { color: "#374151", marginBottom: "0.5rem" }, children: "\u{1F4A8} Wind" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 157,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: [
            "Speed: ",
            currentWeather.data.wind.speed,
            " m/s"
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 158,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: [
            "Direction: ",
            currentWeather.data.wind.deg,
            "\xB0"
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 159,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 156,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 138,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { style: { marginTop: "1.5rem", padding: "1rem", backgroundColor: "#e0f2fe", borderRadius: "0.5rem" }, children: /* @__PURE__ */ jsxDEV3("p", { style: { margin: 0, fontSize: "0.875rem", color: "#0369a1" }, children: "\u{1F4A1} This weather data is fetched from our backend API with Redis caching for improved performance." }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 164,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 163,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 58,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-HCYGRT2Y.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-3PE5W5OV.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-PMFDEFM7.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-VIKXQGX3.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-FTVUNMWQ.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "e179ee54", hmr: { runtime: "/build/_shared\\chunk-PMFDEFM7.js", timestamp: 1754668974937 }, url: "/build/manifest-E179EE54.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
