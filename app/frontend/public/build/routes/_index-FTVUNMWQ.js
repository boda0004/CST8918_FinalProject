import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation
} from "/build/_shared/chunk-3PE5W5OV.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-PMFDEFM7.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:@remix-run/node
var require_node = __commonJS({
  "empty-module:@remix-run/node"(exports, module) {
    module.exports = {};
  }
});

// app/routes/_index.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);

// app/api-services/open-weather-service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\api-services\\open-weather-service.ts"
  );
  import.meta.hot.lastModified = "1754666672190.3706";
}
function formatTemperature(temp) {
  return `${Math.round(temp)}\xB0C`;
}
function capitalizeDescription(description) {
  return description.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1754666692147.9282";
}
var meta = () => {
  return [{
    title: "Weather App"
  }, {
    name: "description",
    content: "Get current weather information for any city"
  }];
};
function Index() {
  _s();
  const {
    defaultWeather
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [city, setCity] = (0, import_react2.useState)("");
  const isLoading = navigation.state === "submitting";
  const currentWeather = actionData?.weather || defaultWeather;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    fontFamily: "system-ui, sans-serif",
    lineHeight: "1.8"
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
      textAlign: "center",
      color: "#2563eb",
      marginBottom: "2rem"
    }, children: "\u{1F324}\uFE0F Weather App" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 92,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginBottom: "2rem"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
      display: "flex",
      gap: "1rem",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "city", value: city, onChange: (e) => setCity(e.target.value), placeholder: "Enter city name (e.g., Toronto, London)", style: {
        flex: 1,
        padding: "0.75rem",
        border: "2px solid #d1d5db",
        borderRadius: "0.5rem",
        fontSize: "1rem"
      }, disabled: isLoading }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 108,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isLoading, style: {
        padding: "0.75rem 1.5rem",
        backgroundColor: isLoading ? "#9ca3af" : "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        cursor: isLoading ? "not-allowed" : "pointer"
      }, children: isLoading ? "Loading..." : "Get Weather" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 115,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 103,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 100,
      columnNumber: 9
    }, this),
    actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      padding: "1rem",
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      borderRadius: "0.5rem",
      marginBottom: "2rem",
      border: "1px solid #fecaca"
    }, children: [
      "\u274C ",
      actionData.error
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 129,
      columnNumber: 31
    }, this),
    currentWeather && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "1rem",
      padding: "2rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        marginBottom: "1.5rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
            margin: 0,
            color: "#1e293b",
            fontSize: "1.5rem"
          }, children: [
            "\u{1F4CD} ",
            currentWeather.data.name,
            ", ",
            currentWeather.data.sys.country
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 154,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            margin: "0.5rem 0",
            color: "#64748b"
          }, children: [
            "Data source: ",
            currentWeather.source === "cache" ? "\u{1F4E6} Cache" : "\u{1F310} Live API"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 161,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 153,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          textAlign: "right"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            fontSize: "3rem",
            margin: 0
          }, children: formatTemperature(currentWeather.data.main.temp) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 171,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            color: "#64748b"
          }, children: [
            "Feels like ",
            formatTemperature(currentWeather.data.main.feels_like)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 177,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 168,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
            color: "#374151",
            marginBottom: "0.5rem"
          }, children: "\u{1F324}\uFE0F Conditions" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 191,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: capitalizeDescription(currentWeather.data.weather[0].description) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 195,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
            color: "#374151",
            marginBottom: "0.5rem"
          }, children: "\u{1F321}\uFE0F Temperature" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 199,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "High: ",
            formatTemperature(currentWeather.data.main.temp_max)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 203,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Low: ",
            formatTemperature(currentWeather.data.main.temp_min)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 204,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
            color: "#374151",
            marginBottom: "0.5rem"
          }, children: "\u{1F4A7} Details" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 208,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Humidity: ",
            currentWeather.data.main.humidity,
            "%"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 212,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Pressure: ",
            currentWeather.data.main.pressure,
            " hPa"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 213,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 207,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
            color: "#374151",
            marginBottom: "0.5rem"
          }, children: "\u{1F4A8} Wind" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 217,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Speed: ",
            currentWeather.data.wind.speed,
            " m/s"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 221,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Direction: ",
            currentWeather.data.wind.deg,
            "\xB0"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 222,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 216,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 185,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginTop: "1.5rem",
        padding: "1rem",
        backgroundColor: "#e0f2fe",
        borderRadius: "0.5rem"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        margin: 0,
        fontSize: "0.875rem",
        color: "#0369a1"
      }, children: "\u{1F4A1} This weather data is fetched from our backend API with Redis caching for improved performance." }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 232,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 226,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 140,
      columnNumber: 28
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 87,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 83,
    columnNumber: 10
  }, this);
}
_s(Index, "+H6zifHwx+GO1vszzrbdw/xeDic=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-FTVUNMWQ.js.map
