// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Url from "../common/Url.js";
import * as Meta from "../components/Meta.js";
import * as Next from "../bindings/Next.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Markdown from "../components/Markdown.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as SidebarLayout from "./SidebarLayout.js";
import * as VersionSelect from "../components/VersionSelect.js";
import * as DocFrontmatter from "../common/DocFrontmatter.js";

function makeBreadcrumbsFromPaths(basePath, paths) {
  var match = Belt_Array.reduce(paths, [
        basePath,
        []
      ], (function (acc, path) {
          var ret = acc[1];
          var href = acc[0] + ("/" + path);
          ret.push({
                name: Url.prettyString(path),
                href: href
              });
          return [
                  href,
                  ret
                ];
        }));
  return Belt_List.fromArray(match[1]);
}

function makeBreadcrumbs(basePath, route) {
  var url = Url.parse(route);
  var match = Belt_Array.reduce(url.pagepath, [
        basePath,
        []
      ], (function (acc, path) {
          var ret = acc[1];
          var href = acc[0] + ("/" + path);
          ret.push({
                name: Url.prettyString(path),
                href: href
              });
          return [
                  href,
                  ret
                ];
        }));
  return Belt_List.fromArray(match[1]);
}

function DocsLayout(Props) {
  var breadcrumbs = Props.breadcrumbs;
  var title = Props.title;
  var metaTitleCategory = Props.metaTitleCategory;
  var frontmatter = Props.frontmatter;
  var version = Props.version;
  var availableVersions = Props.availableVersions;
  var activeToc = Props.activeToc;
  var categories = Props.categories;
  var componentsOpt = Props.components;
  var themeOpt = Props.theme;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : Markdown.$$default;
  var theme = themeOpt !== undefined ? themeOpt : "Reason";
  var router = Next.Router.useRouter(undefined);
  var route = router.route;
  var match = React.useState(function () {
        return false;
      });
  var setSidebarOpen = match[1];
  var isSidebarOpen = match[0];
  var toggleSidebar = function (param) {
    return Curry._1(setSidebarOpen, (function (prev) {
                  return !prev;
                }));
  };
  React.useEffect((function () {
          var events = router.events;
          var onChangeComplete = function (_url) {
            return Curry._1(setSidebarOpen, (function (param) {
                          return false;
                        }));
          };
          Curry._2(Next.Router.Events.on, events, {
                NAME: "routeChangeComplete",
                VAL: onChangeComplete
              });
          Curry._2(Next.Router.Events.on, events, {
                NAME: "hashChangeComplete",
                VAL: onChangeComplete
              });
          return (function (param) {
                    Curry._2(Next.Router.Events.off, events, {
                          NAME: "routeChangeComplete",
                          VAL: onChangeComplete
                        });
                    return Curry._2(Next.Router.Events.off, events, {
                                NAME: "hashChangeComplete",
                                VAL: onChangeComplete
                              });
                  });
        }), []);
  var tmp;
  if (version !== undefined) {
    if (availableVersions !== undefined) {
      var onChange = function (evt) {
        evt.preventDefault();
        var version = evt.target.value;
        var url = Url.parse(route);
        var targetUrl = "/" + (url.base.join("/") + ("/" + (version + ("/" + url.pagepath.join("/")))));
        return Next.Router.push(router, targetUrl);
      };
      tmp = React.createElement(VersionSelect.make, {
            onChange: onChange,
            version: version,
            availableVersions: availableVersions
          });
    } else {
      tmp = React.createElement("span", {
            className: "font-mono text-sm"
          }, version);
    }
  } else {
    tmp = null;
  }
  var preludeSection = React.createElement("div", {
        className: "flex justify-between text-primary font-medium items-baseline"
      }, title, tmp);
  var tmp$1 = {
    categories: categories,
    route: route,
    title: title,
    preludeSection: preludeSection,
    isOpen: isSidebarOpen,
    toggle: toggleSidebar
  };
  if (activeToc !== undefined) {
    tmp$1.activeToc = Caml_option.valFromOption(activeToc);
  }
  var sidebar = React.createElement(SidebarLayout.Sidebar.make, tmp$1);
  var metaTitle = metaTitleCategory !== undefined ? metaTitleCategory + " | ReScript Documentation" : title;
  var match$1;
  if (frontmatter !== undefined) {
    var fm = DocFrontmatter.decode(Caml_option.valFromOption(frontmatter));
    if (fm.TAG === /* Ok */0) {
      var fm$1 = fm._0;
      var canonical = fm$1.canonical;
      var description = fm$1.description;
      var title$1;
      if (metaTitleCategory !== undefined) {
        var metaTitle$1 = fm$1.metaTitle;
        var metaTitle$2 = metaTitle$1 !== null ? metaTitle$1 : fm$1.title;
        title$1 = metaTitle$2 + (" | " + metaTitleCategory);
      } else {
        title$1 = title;
      }
      var tmp$2 = {
        title: title$1
      };
      var tmp$3 = description === null ? undefined : Caml_option.some(description);
      if (tmp$3 !== undefined) {
        tmp$2.description = Caml_option.valFromOption(tmp$3);
      }
      var tmp$4 = canonical === null ? undefined : Caml_option.some(canonical);
      if (tmp$4 !== undefined) {
        tmp$2.canonical = Caml_option.valFromOption(tmp$4);
      }
      var meta = React.createElement(Meta.make, tmp$2);
      match$1 = [
        meta,
        fm$1.ghEditHref
      ];
    } else {
      match$1 = [
        null,
        undefined
      ];
    }
  } else {
    match$1 = [
      null,
      undefined
    ];
  }
  var tmp$5 = {
    metaTitle: metaTitle,
    theme: theme,
    components: components,
    sidebarState: [
      isSidebarOpen,
      setSidebarOpen
    ],
    sidebar: sidebar,
    children: null
  };
  var tmp$6 = match$1[1];
  if (tmp$6 !== undefined) {
    tmp$5.editHref = Caml_option.valFromOption(tmp$6);
  }
  if (breadcrumbs !== undefined) {
    tmp$5.breadcrumbs = Caml_option.valFromOption(breadcrumbs);
  }
  return React.createElement(SidebarLayout.make, tmp$5, match$1[0], children);
}

function Make(Content) {
  var DocsLayout$Make = function (Props) {
    var breadcrumbs = Props.breadcrumbs;
    var title = Props.title;
    var metaTitleCategory = Props.metaTitleCategory;
    var frontmatter = Props.frontmatter;
    var version = Props.version;
    var availableVersions = Props.availableVersions;
    var components = Props.components;
    var theme = Props.theme;
    var children = Props.children;
    var router = Next.Router.useRouter(undefined);
    var route = router.route;
    console.log(Content.tocData);
    var breadcrumbs$1 = Belt_Option.mapWithDefault(Js_dict.get(Content.tocData, route), breadcrumbs, (function (data) {
            var title = data.title;
            return Belt_Option.map(breadcrumbs, (function (bc) {
                          return Belt_List.concat(bc, {
                                      hd: {
                                        name: title,
                                        href: route
                                      },
                                      tl: /* [] */0
                                    });
                        }));
          }));
    var activeToc = Belt_Option.map(Js_dict.get(Content.tocData, route), (function (data) {
            var title = data.title;
            var entries = Belt_Array.map(data.headers, (function (header) {
                    return {
                            header: header.name,
                            href: "#" + header.href
                          };
                  }));
            return {
                    title: title,
                    entries: entries
                  };
          }));
    var groups = Belt_Array.reduce(Js_dict.entries(Content.tocData), {}, (function (acc, next) {
            var category = next[1].category;
            if (category == null) {
              console.log("has NO category", next);
            } else {
              var arr = Js_dict.get(acc, category);
              if (arr !== undefined) {
                arr.push(next);
                acc[category] = arr;
              } else {
                acc[category] = [next];
              }
            }
            return acc;
          }));
    var categories = Belt_Array.map(Js_dict.entries(groups), (function (param) {
            return {
                    name: param[0],
                    items: Belt_Array.map(param[1], (function (param) {
                            return {
                                    name: param[1].title,
                                    href: param[0]
                                  };
                          }))
                  };
          }));
    return DocsLayout({
                breadcrumbs: breadcrumbs$1,
                title: title,
                metaTitleCategory: metaTitleCategory,
                frontmatter: frontmatter,
                version: version,
                availableVersions: availableVersions,
                activeToc: activeToc,
                categories: categories,
                components: components,
                theme: theme,
                children: children
              });
  };
  return {
          make: DocsLayout$Make
        };
}

var make = DocsLayout;

export {
  makeBreadcrumbsFromPaths ,
  makeBreadcrumbs ,
  make ,
  Make ,
  
}
/* Meta Not a pure module */
