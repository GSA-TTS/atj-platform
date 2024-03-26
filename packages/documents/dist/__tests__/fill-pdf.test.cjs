"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/.pnpm/ansi-styles@5.2.0/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../node_modules/.pnpm/ansi-styles@5.2.0/node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles2 = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles2.color.gray = styles2.color.blackBright;
      styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
      styles2.color.grey = styles2.color.blackBright;
      styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles2)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles2[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles2[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles2, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles2, "codes", {
        value: codes,
        enumerable: false
      });
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      styles2.color.ansi256 = wrapAnsi256();
      styles2.color.ansi16m = wrapAnsi16m();
      styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles2, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex2) => {
            const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex2.toString(16));
            if (!matches) {
              return [0, 0, 0];
            }
            let { colorString } = matches.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character) => character + character).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex2) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex2)),
          enumerable: false
        }
      });
      return styles2;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/collections.js
var require_collections = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/collections.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.printIteratorEntries = printIteratorEntries;
    exports2.printIteratorValues = printIteratorValues;
    exports2.printListItems = printListItems;
    exports2.printObjectProperties = printObjectProperties;
    var getKeysOfEnumerableProperties = (object3, compareKeys) => {
      const rawKeys = Object.keys(object3);
      const keys2 = compareKeys !== null ? rawKeys.sort(compareKeys) : rawKeys;
      if (Object.getOwnPropertySymbols) {
        Object.getOwnPropertySymbols(object3).forEach((symbol) => {
          if (Object.getOwnPropertyDescriptor(object3, symbol).enumerable) {
            keys2.push(symbol);
          }
        });
      }
      return keys2;
    };
    function printIteratorEntries(iterator, config2, indentation, depth, refs, printer, separator = ": ") {
      let result = "";
      let width = 0;
      let current = iterator.next();
      if (!current.done) {
        result += config2.spacingOuter;
        const indentationNext = indentation + config2.indent;
        while (!current.done) {
          result += indentationNext;
          if (width++ === config2.maxWidth) {
            result += "\u2026";
            break;
          }
          const name = printer(
            current.value[0],
            config2,
            indentationNext,
            depth,
            refs
          );
          const value = printer(
            current.value[1],
            config2,
            indentationNext,
            depth,
            refs
          );
          result += name + separator + value;
          current = iterator.next();
          if (!current.done) {
            result += `,${config2.spacingInner}`;
          } else if (!config2.min) {
            result += ",";
          }
        }
        result += config2.spacingOuter + indentation;
      }
      return result;
    }
    function printIteratorValues(iterator, config2, indentation, depth, refs, printer) {
      let result = "";
      let width = 0;
      let current = iterator.next();
      if (!current.done) {
        result += config2.spacingOuter;
        const indentationNext = indentation + config2.indent;
        while (!current.done) {
          result += indentationNext;
          if (width++ === config2.maxWidth) {
            result += "\u2026";
            break;
          }
          result += printer(current.value, config2, indentationNext, depth, refs);
          current = iterator.next();
          if (!current.done) {
            result += `,${config2.spacingInner}`;
          } else if (!config2.min) {
            result += ",";
          }
        }
        result += config2.spacingOuter + indentation;
      }
      return result;
    }
    function printListItems(list, config2, indentation, depth, refs, printer) {
      let result = "";
      if (list.length) {
        result += config2.spacingOuter;
        const indentationNext = indentation + config2.indent;
        for (let i = 0; i < list.length; i++) {
          result += indentationNext;
          if (i === config2.maxWidth) {
            result += "\u2026";
            break;
          }
          if (i in list) {
            result += printer(list[i], config2, indentationNext, depth, refs);
          }
          if (i < list.length - 1) {
            result += `,${config2.spacingInner}`;
          } else if (!config2.min) {
            result += ",";
          }
        }
        result += config2.spacingOuter + indentation;
      }
      return result;
    }
    function printObjectProperties(val, config2, indentation, depth, refs, printer) {
      let result = "";
      const keys2 = getKeysOfEnumerableProperties(val, config2.compareKeys);
      if (keys2.length) {
        result += config2.spacingOuter;
        const indentationNext = indentation + config2.indent;
        for (let i = 0; i < keys2.length; i++) {
          const key = keys2[i];
          const name = printer(key, config2, indentationNext, depth, refs);
          const value = printer(val[key], config2, indentationNext, depth, refs);
          result += `${indentationNext + name}: ${value}`;
          if (i < keys2.length - 1) {
            result += `,${config2.spacingInner}`;
          } else if (!config2.min) {
            result += ",";
          }
        }
        result += config2.spacingOuter + indentation;
      }
      return result;
    }
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/AsymmetricMatcher.js
var require_AsymmetricMatcher = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _collections = require_collections();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var asymmetricMatcher = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("jest.asymmetricMatcher") : 1267621;
    var SPACE = " ";
    var serialize2 = (val, config2, indentation, depth, refs, printer) => {
      const stringedValue = val.toString();
      if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
        if (++depth > config2.maxDepth) {
          return `[${stringedValue}]`;
        }
        return `${stringedValue + SPACE}[${(0, _collections.printListItems)(
          val.sample,
          config2,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
        if (++depth > config2.maxDepth) {
          return `[${stringedValue}]`;
        }
        return `${stringedValue + SPACE}{${(0, _collections.printObjectProperties)(
          val.sample,
          config2,
          indentation,
          depth,
          refs,
          printer
        )}}`;
      }
      if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
        return stringedValue + SPACE + printer(val.sample, config2, indentation, depth, refs);
      }
      if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
        return stringedValue + SPACE + printer(val.sample, config2, indentation, depth, refs);
      }
      if (typeof val.toAsymmetricMatcher !== "function") {
        throw new Error(
          `Asymmetric matcher ${val.constructor.name} does not implement toAsymmetricMatcher()`
        );
      }
      return val.toAsymmetricMatcher();
    };
    exports2.serialize = serialize2;
    var test3 = (val) => val && val.$$typeof === asymmetricMatcher;
    exports2.test = test3;
    var plugin2 = {
      serialize: serialize2,
      test: test3
    };
    var _default = plugin2;
    exports2.default = _default;
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/DOMCollection.js
var require_DOMCollection = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/DOMCollection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _collections = require_collections();
    var SPACE = " ";
    var OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
    var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
    var testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
    var test3 = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
    exports2.test = test3;
    var isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
    var serialize2 = (collection, config2, indentation, depth, refs, printer) => {
      const name = collection.constructor.name;
      if (++depth > config2.maxDepth) {
        return `[${name}]`;
      }
      return (config2.min ? "" : name + SPACE) + (OBJECT_NAMES.indexOf(name) !== -1 ? `{${(0, _collections.printObjectProperties)(
        isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
          props[attribute.name] = attribute.value;
          return props;
        }, {}) : {
          ...collection
        },
        config2,
        indentation,
        depth,
        refs,
        printer
      )}}` : `[${(0, _collections.printListItems)(
        Array.from(collection),
        config2,
        indentation,
        depth,
        refs,
        printer
      )}]`);
    };
    exports2.serialize = serialize2;
    var plugin2 = {
      serialize: serialize2,
      test: test3
    };
    var _default = plugin2;
    exports2.default = _default;
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/lib/escapeHTML.js
var require_escapeHTML = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = escapeHTML;
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/lib/markup.js
var require_markup = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/lib/markup.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.printText = exports2.printProps = exports2.printElementAsLeaf = exports2.printElement = exports2.printComment = exports2.printChildren = void 0;
    var _escapeHTML = _interopRequireDefault(require_escapeHTML());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var printProps = (keys2, props, config2, indentation, depth, refs, printer) => {
      const indentationNext = indentation + config2.indent;
      const colors = config2.colors;
      return keys2.map((key) => {
        const value = props[key];
        let printed = printer(value, config2, indentationNext, depth, refs);
        if (typeof value !== "string") {
          if (printed.indexOf("\n") !== -1) {
            printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
          }
          printed = `{${printed}}`;
        }
        return `${config2.spacingInner + indentation + colors.prop.open + key + colors.prop.close}=${colors.value.open}${printed}${colors.value.close}`;
      }).join("");
    };
    exports2.printProps = printProps;
    var printChildren = (children, config2, indentation, depth, refs, printer) => children.map(
      (child) => config2.spacingOuter + indentation + (typeof child === "string" ? printText(child, config2) : printer(child, config2, indentation, depth, refs))
    ).join("");
    exports2.printChildren = printChildren;
    var printText = (text, config2) => {
      const contentColor = config2.colors.content;
      return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
    };
    exports2.printText = printText;
    var printComment = (comment, config2) => {
      const commentColor = config2.colors.comment;
      return `${commentColor.open}<!--${(0, _escapeHTML.default)(comment)}-->${commentColor.close}`;
    };
    exports2.printComment = printComment;
    var printElement = (type2, printedProps, printedChildren, config2, indentation) => {
      const tagColor = config2.colors.tag;
      return `${tagColor.open}<${type2}${printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open}${printedChildren ? `>${tagColor.close}${printedChildren}${config2.spacingOuter}${indentation}${tagColor.open}</${type2}` : `${printedProps && !config2.min ? "" : " "}/`}>${tagColor.close}`;
    };
    exports2.printElement = printElement;
    var printElementAsLeaf = (type2, config2) => {
      const tagColor = config2.colors.tag;
      return `${tagColor.open}<${type2}${tagColor.close} \u2026${tagColor.open} />${tagColor.close}`;
    };
    exports2.printElementAsLeaf = printElementAsLeaf;
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/DOMElement.js
var require_DOMElement = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/DOMElement.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _markup = require_markup();
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
    var testHasAttribute = (val) => {
      try {
        return typeof val.hasAttribute === "function" && val.hasAttribute("is");
      } catch {
        return false;
      }
    };
    var testNode = (val) => {
      const constructorName = val.constructor.name;
      const { nodeType, tagName } = val;
      const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
      return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE && constructorName === "Text" || nodeType === COMMENT_NODE && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
    };
    var test3 = (val) => val?.constructor?.name && testNode(val);
    exports2.test = test3;
    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }
    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }
    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }
    var serialize2 = (node, config2, indentation, depth, refs, printer) => {
      if (nodeIsText(node)) {
        return (0, _markup.printText)(node.data, config2);
      }
      if (nodeIsComment(node)) {
        return (0, _markup.printComment)(node.data, config2);
      }
      const type2 = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
      if (++depth > config2.maxDepth) {
        return (0, _markup.printElementAsLeaf)(type2, config2);
      }
      return (0, _markup.printElement)(
        type2,
        (0, _markup.printProps)(
          nodeIsFragment(node) ? [] : Array.from(node.attributes, (attr) => attr.name).sort(),
          nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {}),
          config2,
          indentation + config2.indent,
          depth,
          refs,
          printer
        ),
        (0, _markup.printChildren)(
          Array.prototype.slice.call(node.childNodes || node.children),
          config2,
          indentation + config2.indent,
          depth,
          refs,
          printer
        ),
        config2,
        indentation
      );
    };
    exports2.serialize = serialize2;
    var plugin2 = {
      serialize: serialize2,
      test: test3
    };
    var _default = plugin2;
    exports2.default = _default;
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/Immutable.js
var require_Immutable = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/Immutable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _collections = require_collections();
    var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
    var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
    var IS_KEYED_SENTINEL2 = "@@__IMMUTABLE_KEYED__@@";
    var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
    var IS_ORDERED_SENTINEL2 = "@@__IMMUTABLE_ORDERED__@@";
    var IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
    var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
    var IS_SET_SENTINEL2 = "@@__IMMUTABLE_SET__@@";
    var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
    var getImmutableName = (name) => `Immutable.${name}`;
    var printAsLeaf = (name) => `[${name}]`;
    var SPACE = " ";
    var LAZY = "\u2026";
    var printImmutableEntries = (val, config2, indentation, depth, refs, printer, type2) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type2)) : `${getImmutableName(type2) + SPACE}{${(0, _collections.printIteratorEntries)(
      val.entries(),
      config2,
      indentation,
      depth,
      refs,
      printer
    )}}`;
    function getRecordEntries(val) {
      let i = 0;
      return {
        next() {
          if (i < val._keys.length) {
            const key = val._keys[i++];
            return {
              done: false,
              value: [key, val.get(key)]
            };
          }
          return {
            done: true,
            value: void 0
          };
        }
      };
    }
    var printImmutableRecord = (val, config2, indentation, depth, refs, printer) => {
      const name = getImmutableName(val._name || "Record");
      return ++depth > config2.maxDepth ? printAsLeaf(name) : `${name + SPACE}{${(0, _collections.printIteratorEntries)(
        getRecordEntries(val),
        config2,
        indentation,
        depth,
        refs,
        printer
      )}}`;
    };
    var printImmutableSeq = (val, config2, indentation, depth, refs, printer) => {
      const name = getImmutableName("Seq");
      if (++depth > config2.maxDepth) {
        return printAsLeaf(name);
      }
      if (val[IS_KEYED_SENTINEL2]) {
        return `${name + SPACE}{${// from Immutable collection of entries or from ECMAScript object
        val._iter || val._object ? (0, _collections.printIteratorEntries)(
          val.entries(),
          config2,
          indentation,
          depth,
          refs,
          printer
        ) : LAZY}}`;
      }
      return `${name + SPACE}[${val._iter || // from Immutable collection of values
      val._array || // from ECMAScript array
      val._collection || // from ECMAScript collection in immutable v4
      val._iterable ? (0, _collections.printIteratorValues)(
        val.values(),
        config2,
        indentation,
        depth,
        refs,
        printer
      ) : LAZY}]`;
    };
    var printImmutableValues = (val, config2, indentation, depth, refs, printer, type2) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type2)) : `${getImmutableName(type2) + SPACE}[${(0, _collections.printIteratorValues)(
      val.values(),
      config2,
      indentation,
      depth,
      refs,
      printer
    )}]`;
    var serialize2 = (val, config2, indentation, depth, refs, printer) => {
      if (val[IS_MAP_SENTINEL]) {
        return printImmutableEntries(
          val,
          config2,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL2] ? "OrderedMap" : "Map"
        );
      }
      if (val[IS_LIST_SENTINEL]) {
        return printImmutableValues(
          val,
          config2,
          indentation,
          depth,
          refs,
          printer,
          "List"
        );
      }
      if (val[IS_SET_SENTINEL2]) {
        return printImmutableValues(
          val,
          config2,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL2] ? "OrderedSet" : "Set"
        );
      }
      if (val[IS_STACK_SENTINEL]) {
        return printImmutableValues(
          val,
          config2,
          indentation,
          depth,
          refs,
          printer,
          "Stack"
        );
      }
      if (val[IS_SEQ_SENTINEL]) {
        return printImmutableSeq(val, config2, indentation, depth, refs, printer);
      }
      return printImmutableRecord(val, config2, indentation, depth, refs, printer);
    };
    exports2.serialize = serialize2;
    var test3 = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
    exports2.test = test3;
    var plugin2 = {
      serialize: serialize2,
      test: test3
    };
    var _default = plugin2;
    exports2.default = _default;
  }
});

// ../../node_modules/.pnpm/react-is@18.2.0/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../node_modules/.pnpm/react-is@18.2.0/node_modules/react-is/cjs/react-is.production.min.js"(exports2) {
    "use strict";
    var b2 = Symbol.for("react.element");
    var c = Symbol.for("react.portal");
    var d2 = Symbol.for("react.fragment");
    var e = Symbol.for("react.strict_mode");
    var f = Symbol.for("react.profiler");
    var g = Symbol.for("react.provider");
    var h = Symbol.for("react.context");
    var k = Symbol.for("react.server_context");
    var l = Symbol.for("react.forward_ref");
    var m2 = Symbol.for("react.suspense");
    var n2 = Symbol.for("react.suspense_list");
    var p2 = Symbol.for("react.memo");
    var q = Symbol.for("react.lazy");
    var t = Symbol.for("react.offscreen");
    var u2;
    u2 = Symbol.for("react.module.reference");
    function v2(a) {
      if ("object" === typeof a && null !== a) {
        var r = a.$$typeof;
        switch (r) {
          case b2:
            switch (a = a.type, a) {
              case d2:
              case f:
              case e:
              case m2:
              case n2:
                return a;
              default:
                switch (a = a && a.$$typeof, a) {
                  case k:
                  case h:
                  case l:
                  case q:
                  case p2:
                  case g:
                    return a;
                  default:
                    return r;
                }
            }
          case c:
            return r;
        }
      }
    }
    exports2.ContextConsumer = h;
    exports2.ContextProvider = g;
    exports2.Element = b2;
    exports2.ForwardRef = l;
    exports2.Fragment = d2;
    exports2.Lazy = q;
    exports2.Memo = p2;
    exports2.Portal = c;
    exports2.Profiler = f;
    exports2.StrictMode = e;
    exports2.Suspense = m2;
    exports2.SuspenseList = n2;
    exports2.isAsyncMode = function() {
      return false;
    };
    exports2.isConcurrentMode = function() {
      return false;
    };
    exports2.isContextConsumer = function(a) {
      return v2(a) === h;
    };
    exports2.isContextProvider = function(a) {
      return v2(a) === g;
    };
    exports2.isElement = function(a) {
      return "object" === typeof a && null !== a && a.$$typeof === b2;
    };
    exports2.isForwardRef = function(a) {
      return v2(a) === l;
    };
    exports2.isFragment = function(a) {
      return v2(a) === d2;
    };
    exports2.isLazy = function(a) {
      return v2(a) === q;
    };
    exports2.isMemo = function(a) {
      return v2(a) === p2;
    };
    exports2.isPortal = function(a) {
      return v2(a) === c;
    };
    exports2.isProfiler = function(a) {
      return v2(a) === f;
    };
    exports2.isStrictMode = function(a) {
      return v2(a) === e;
    };
    exports2.isSuspense = function(a) {
      return v2(a) === m2;
    };
    exports2.isSuspenseList = function(a) {
      return v2(a) === n2;
    };
    exports2.isValidElementType = function(a) {
      return "string" === typeof a || "function" === typeof a || a === d2 || a === f || a === e || a === m2 || a === n2 || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p2 || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u2 || void 0 !== a.getModuleId) ? true : false;
    };
    exports2.typeOf = v2;
  }
});

// ../../node_modules/.pnpm/react-is@18.2.0/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../node_modules/.pnpm/react-is@18.2.0/node_modules/react-is/cjs/react-is.development.js"(exports2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type2) {
          if (typeof type2 === "string" || typeof type2 === "function") {
            return true;
          }
          if (type2 === REACT_FRAGMENT_TYPE || type2 === REACT_PROFILER_TYPE || enableDebugTracing || type2 === REACT_STRICT_MODE_TYPE || type2 === REACT_SUSPENSE_TYPE || type2 === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type2 === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type2 === "object" && type2 !== null) {
            if (type2.$$typeof === REACT_LAZY_TYPE || type2.$$typeof === REACT_MEMO_TYPE || type2.$$typeof === REACT_PROVIDER_TYPE || type2.$$typeof === REACT_CONTEXT_TYPE || type2.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type2.$$typeof === REACT_MODULE_REFERENCE || type2.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function typeOf3(object3) {
          if (typeof object3 === "object" && object3 !== null) {
            var $$typeof = object3.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type2 = object3.type;
                switch (type2) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type2;
                  default:
                    var $$typeofType = type2 && type2.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object3) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object3) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object3) {
          return typeOf3(object3) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object3) {
          return typeOf3(object3) === REACT_PROVIDER_TYPE;
        }
        function isElement(object3) {
          return typeof object3 === "object" && object3 !== null && object3.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object3) {
          return typeOf3(object3) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object3) {
          return typeOf3(object3) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object3) {
          return typeOf3(object3) === REACT_LAZY_TYPE;
        }
        function isMemo(object3) {
          return typeOf3(object3) === REACT_MEMO_TYPE;
        }
        function isPortal(object3) {
          return typeOf3(object3) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object3) {
          return typeOf3(object3) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object3) {
          return typeOf3(object3) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object3) {
          return typeOf3(object3) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object3) {
          return typeOf3(object3) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports2.ContextConsumer = ContextConsumer;
        exports2.ContextProvider = ContextProvider;
        exports2.Element = Element2;
        exports2.ForwardRef = ForwardRef;
        exports2.Fragment = Fragment;
        exports2.Lazy = Lazy;
        exports2.Memo = Memo;
        exports2.Portal = Portal;
        exports2.Profiler = Profiler;
        exports2.StrictMode = StrictMode;
        exports2.Suspense = Suspense;
        exports2.SuspenseList = SuspenseList;
        exports2.isAsyncMode = isAsyncMode;
        exports2.isConcurrentMode = isConcurrentMode;
        exports2.isContextConsumer = isContextConsumer;
        exports2.isContextProvider = isContextProvider;
        exports2.isElement = isElement;
        exports2.isForwardRef = isForwardRef;
        exports2.isFragment = isFragment;
        exports2.isLazy = isLazy;
        exports2.isMemo = isMemo;
        exports2.isPortal = isPortal;
        exports2.isProfiler = isProfiler;
        exports2.isStrictMode = isStrictMode;
        exports2.isSuspense = isSuspense;
        exports2.isSuspenseList = isSuspenseList;
        exports2.isValidElementType = isValidElementType;
        exports2.typeOf = typeOf3;
      })();
    }
  }
});

// ../../node_modules/.pnpm/react-is@18.2.0/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/.pnpm/react-is@18.2.0/node_modules/react-is/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_is_production_min();
    } else {
      module2.exports = require_react_is_development();
    }
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/ReactElement.js
var require_ReactElement = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/ReactElement.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var ReactIs = _interopRequireWildcard(require_react_is());
    var _markup = require_markup();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache2 = _getRequireWildcardCache(nodeInterop);
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    var getChildren = (arg, children = []) => {
      if (Array.isArray(arg)) {
        arg.forEach((item) => {
          getChildren(item, children);
        });
      } else if (arg != null && arg !== false) {
        children.push(arg);
      }
      return children;
    };
    var getType3 = (element) => {
      const type2 = element.type;
      if (typeof type2 === "string") {
        return type2;
      }
      if (typeof type2 === "function") {
        return type2.displayName || type2.name || "Unknown";
      }
      if (ReactIs.isFragment(element)) {
        return "React.Fragment";
      }
      if (ReactIs.isSuspense(element)) {
        return "React.Suspense";
      }
      if (typeof type2 === "object" && type2 !== null) {
        if (ReactIs.isContextProvider(element)) {
          return "Context.Provider";
        }
        if (ReactIs.isContextConsumer(element)) {
          return "Context.Consumer";
        }
        if (ReactIs.isForwardRef(element)) {
          if (type2.displayName) {
            return type2.displayName;
          }
          const functionName3 = type2.render.displayName || type2.render.name || "";
          return functionName3 !== "" ? `ForwardRef(${functionName3})` : "ForwardRef";
        }
        if (ReactIs.isMemo(element)) {
          const functionName3 = type2.displayName || type2.type.displayName || type2.type.name || "";
          return functionName3 !== "" ? `Memo(${functionName3})` : "Memo";
        }
      }
      return "UNDEFINED";
    };
    var getPropKeys = (element) => {
      const { props } = element;
      return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
    };
    var serialize2 = (element, config2, indentation, depth, refs, printer) => ++depth > config2.maxDepth ? (0, _markup.printElementAsLeaf)(getType3(element), config2) : (0, _markup.printElement)(
      getType3(element),
      (0, _markup.printProps)(
        getPropKeys(element),
        element.props,
        config2,
        indentation + config2.indent,
        depth,
        refs,
        printer
      ),
      (0, _markup.printChildren)(
        getChildren(element.props.children),
        config2,
        indentation + config2.indent,
        depth,
        refs,
        printer
      ),
      config2,
      indentation
    );
    exports2.serialize = serialize2;
    var test3 = (val) => val != null && ReactIs.isElement(val);
    exports2.test = test3;
    var plugin2 = {
      serialize: serialize2,
      test: test3
    };
    var _default = plugin2;
    exports2.default = _default;
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/ReactTestComponent.js
var require_ReactTestComponent = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/plugins/ReactTestComponent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.test = exports2.serialize = exports2.default = void 0;
    var _markup = require_markup();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var testSymbol = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("react.test.json") : 245830487;
    var getPropKeys = (object3) => {
      const { props } = object3;
      return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
    };
    var serialize2 = (object3, config2, indentation, depth, refs, printer) => ++depth > config2.maxDepth ? (0, _markup.printElementAsLeaf)(object3.type, config2) : (0, _markup.printElement)(
      object3.type,
      object3.props ? (0, _markup.printProps)(
        getPropKeys(object3),
        object3.props,
        config2,
        indentation + config2.indent,
        depth,
        refs,
        printer
      ) : "",
      object3.children ? (0, _markup.printChildren)(
        object3.children,
        config2,
        indentation + config2.indent,
        depth,
        refs,
        printer
      ) : "",
      config2,
      indentation
    );
    exports2.serialize = serialize2;
    var test3 = (val) => val && val.$$typeof === testSymbol;
    exports2.test = test3;
    var plugin2 = {
      serialize: serialize2,
      test: test3
    };
    var _default = plugin2;
    exports2.default = _default;
  }
});

// ../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/index.js
var require_build = __commonJS({
  "../../node_modules/.pnpm/pretty-format@29.7.0/node_modules/pretty-format/build/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = exports2.DEFAULT_OPTIONS = void 0;
    exports2.format = format4;
    exports2.plugins = void 0;
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    var _collections = require_collections();
    var _AsymmetricMatcher = _interopRequireDefault(
      require_AsymmetricMatcher()
    );
    var _DOMCollection = _interopRequireDefault(require_DOMCollection());
    var _DOMElement = _interopRequireDefault(require_DOMElement());
    var _Immutable = _interopRequireDefault(require_Immutable());
    var _ReactElement = _interopRequireDefault(require_ReactElement());
    var _ReactTestComponent = _interopRequireDefault(
      require_ReactTestComponent()
    );
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toString3 = Object.prototype.toString;
    var toISOString = Date.prototype.toISOString;
    var errorToString = Error.prototype.toString;
    var regExpToString = RegExp.prototype.toString;
    var getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
    var isWindow = (val) => typeof window !== "undefined" && val === window;
    var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    var NEWLINE_REGEXP = /\n/gi;
    var PrettyFormatPluginError = class extends Error {
      constructor(message, stack) {
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
      }
    };
    function isToStringedArrayType(toStringed) {
      return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
    }
    function printNumber(val) {
      return Object.is(val, -0) ? "-0" : String(val);
    }
    function printBigInt(val) {
      return String(`${val}n`);
    }
    function printFunction(val, printFunctionName2) {
      if (!printFunctionName2) {
        return "[Function]";
      }
      return `[Function ${val.name || "anonymous"}]`;
    }
    function printSymbol(val) {
      return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
    }
    function printError(val) {
      return `[${errorToString.call(val)}]`;
    }
    function printBasicValue(val, printFunctionName2, escapeRegex2, escapeString) {
      if (val === true || val === false) {
        return `${val}`;
      }
      if (val === void 0) {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      const typeOf3 = typeof val;
      if (typeOf3 === "number") {
        return printNumber(val);
      }
      if (typeOf3 === "bigint") {
        return printBigInt(val);
      }
      if (typeOf3 === "string") {
        if (escapeString) {
          return `"${val.replace(/"|\\/g, "\\$&")}"`;
        }
        return `"${val}"`;
      }
      if (typeOf3 === "function") {
        return printFunction(val, printFunctionName2);
      }
      if (typeOf3 === "symbol") {
        return printSymbol(val);
      }
      const toStringed = toString3.call(val);
      if (toStringed === "[object WeakMap]") {
        return "WeakMap {}";
      }
      if (toStringed === "[object WeakSet]") {
        return "WeakSet {}";
      }
      if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
        return printFunction(val, printFunctionName2);
      }
      if (toStringed === "[object Symbol]") {
        return printSymbol(val);
      }
      if (toStringed === "[object Date]") {
        return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
      }
      if (toStringed === "[object Error]") {
        return printError(val);
      }
      if (toStringed === "[object RegExp]") {
        if (escapeRegex2) {
          return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        return regExpToString.call(val);
      }
      if (val instanceof Error) {
        return printError(val);
      }
      return null;
    }
    function printComplexValue(val, config2, indentation, depth, refs, hasCalledToJSON) {
      if (refs.indexOf(val) !== -1) {
        return "[Circular]";
      }
      refs = refs.slice();
      refs.push(val);
      const hitMaxDepth = ++depth > config2.maxDepth;
      const min = config2.min;
      if (config2.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
        return printer(val.toJSON(), config2, indentation, depth, refs, true);
      }
      const toStringed = toString3.call(val);
      if (toStringed === "[object Arguments]") {
        return hitMaxDepth ? "[Arguments]" : `${min ? "" : "Arguments "}[${(0, _collections.printListItems)(
          val,
          config2,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (isToStringedArrayType(toStringed)) {
        return hitMaxDepth ? `[${val.constructor.name}]` : `${min ? "" : !config2.printBasicPrototype && val.constructor.name === "Array" ? "" : `${val.constructor.name} `}[${(0, _collections.printListItems)(
          val,
          config2,
          indentation,
          depth,
          refs,
          printer
        )}]`;
      }
      if (toStringed === "[object Map]") {
        return hitMaxDepth ? "[Map]" : `Map {${(0, _collections.printIteratorEntries)(
          val.entries(),
          config2,
          indentation,
          depth,
          refs,
          printer,
          " => "
        )}}`;
      }
      if (toStringed === "[object Set]") {
        return hitMaxDepth ? "[Set]" : `Set {${(0, _collections.printIteratorValues)(
          val.values(),
          config2,
          indentation,
          depth,
          refs,
          printer
        )}}`;
      }
      return hitMaxDepth || isWindow(val) ? `[${getConstructorName(val)}]` : `${min ? "" : !config2.printBasicPrototype && getConstructorName(val) === "Object" ? "" : `${getConstructorName(val)} `}{${(0, _collections.printObjectProperties)(
        val,
        config2,
        indentation,
        depth,
        refs,
        printer
      )}}`;
    }
    function isNewPlugin(plugin2) {
      return plugin2.serialize != null;
    }
    function printPlugin(plugin2, val, config2, indentation, depth, refs) {
      let printed;
      try {
        printed = isNewPlugin(plugin2) ? plugin2.serialize(val, config2, indentation, depth, refs, printer) : plugin2.print(
          val,
          (valChild) => printer(valChild, config2, indentation, depth, refs),
          (str) => {
            const indentationNext = indentation + config2.indent;
            return indentationNext + str.replace(NEWLINE_REGEXP, `
${indentationNext}`);
          },
          {
            edgeSpacing: config2.spacingOuter,
            min: config2.min,
            spacing: config2.spacingInner
          },
          config2.colors
        );
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
      if (typeof printed !== "string") {
        throw new Error(
          `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
        );
      }
      return printed;
    }
    function findPlugin(plugins5, val) {
      for (let p2 = 0; p2 < plugins5.length; p2++) {
        try {
          if (plugins5[p2].test(val)) {
            return plugins5[p2];
          }
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
      }
      return null;
    }
    function printer(val, config2, indentation, depth, refs, hasCalledToJSON) {
      const plugin2 = findPlugin(config2.plugins, val);
      if (plugin2 !== null) {
        return printPlugin(plugin2, val, config2, indentation, depth, refs);
      }
      const basicResult = printBasicValue(
        val,
        config2.printFunctionName,
        config2.escapeRegex,
        config2.escapeString
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(
        val,
        config2,
        indentation,
        depth,
        refs,
        hasCalledToJSON
      );
    }
    var DEFAULT_THEME = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green"
    };
    var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
    var toOptionsSubtype = (options) => options;
    var DEFAULT_OPTIONS = toOptionsSubtype({
      callToJSON: true,
      compareKeys: void 0,
      escapeRegex: false,
      escapeString: true,
      highlight: false,
      indent: 2,
      maxDepth: Infinity,
      maxWidth: Infinity,
      min: false,
      plugins: [],
      printBasicPrototype: true,
      printFunctionName: true,
      theme: DEFAULT_THEME
    });
    exports2.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    function validateOptions(options) {
      Object.keys(options).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(DEFAULT_OPTIONS, key)) {
          throw new Error(`pretty-format: Unknown option "${key}".`);
        }
      });
      if (options.min && options.indent !== void 0 && options.indent !== 0) {
        throw new Error(
          'pretty-format: Options "min" and "indent" cannot be used together.'
        );
      }
      if (options.theme !== void 0) {
        if (options.theme === null) {
          throw new Error('pretty-format: Option "theme" must not be null.');
        }
        if (typeof options.theme !== "object") {
          throw new Error(
            `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
          );
        }
      }
    }
    var getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
      const color = value && _ansiStyles.default[value];
      if (color && typeof color.close === "string" && typeof color.open === "string") {
        colors[key] = color;
      } else {
        throw new Error(
          `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
        );
      }
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      colors[key] = {
        close: "",
        open: ""
      };
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getPrintFunctionName = (options) => options?.printFunctionName ?? DEFAULT_OPTIONS.printFunctionName;
    var getEscapeRegex = (options) => options?.escapeRegex ?? DEFAULT_OPTIONS.escapeRegex;
    var getEscapeString = (options) => options?.escapeString ?? DEFAULT_OPTIONS.escapeString;
    var getConfig = (options) => ({
      callToJSON: options?.callToJSON ?? DEFAULT_OPTIONS.callToJSON,
      colors: options?.highlight ? getColorsHighlight(options) : getColorsEmpty(),
      compareKeys: typeof options?.compareKeys === "function" || options?.compareKeys === null ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
      escapeRegex: getEscapeRegex(options),
      escapeString: getEscapeString(options),
      indent: options?.min ? "" : createIndent(options?.indent ?? DEFAULT_OPTIONS.indent),
      maxDepth: options?.maxDepth ?? DEFAULT_OPTIONS.maxDepth,
      maxWidth: options?.maxWidth ?? DEFAULT_OPTIONS.maxWidth,
      min: options?.min ?? DEFAULT_OPTIONS.min,
      plugins: options?.plugins ?? DEFAULT_OPTIONS.plugins,
      printBasicPrototype: options?.printBasicPrototype ?? true,
      printFunctionName: getPrintFunctionName(options),
      spacingInner: options?.min ? " " : "\n",
      spacingOuter: options?.min ? "" : "\n"
    });
    function createIndent(indent) {
      return new Array(indent + 1).join(" ");
    }
    function format4(val, options) {
      if (options) {
        validateOptions(options);
        if (options.plugins) {
          const plugin2 = findPlugin(options.plugins, val);
          if (plugin2 !== null) {
            return printPlugin(plugin2, val, getConfig(options), "", 0, []);
          }
        }
      }
      const basicResult = printBasicValue(
        val,
        getPrintFunctionName(options),
        getEscapeRegex(options),
        getEscapeString(options)
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(val, getConfig(options), "", 0, []);
    }
    var plugins4 = {
      AsymmetricMatcher: _AsymmetricMatcher.default,
      DOMCollection: _DOMCollection.default,
      DOMElement: _DOMElement.default,
      Immutable: _Immutable.default,
      ReactElement: _ReactElement.default,
      ReactTestComponent: _ReactTestComponent.default
    };
    exports2.plugins = plugins4;
    var _default = format4;
    exports2.default = _default;
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/helpers.js
function colorise(value, styleType) {
  const color = ansiColors[styles[styleType]] || ansiColors[styleType];
  if (!color) {
    return String(value);
  }
  return `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m`;
}
function normaliseOptions({
  showHidden = false,
  depth = 2,
  colors = false,
  customInspect = true,
  showProxy = false,
  maxArrayLength = Infinity,
  breakLength = Infinity,
  seen = [],
  // eslint-disable-next-line no-shadow
  truncate: truncate2 = Infinity,
  stylize = String
} = {}) {
  const options = {
    showHidden: Boolean(showHidden),
    depth: Number(depth),
    colors: Boolean(colors),
    customInspect: Boolean(customInspect),
    showProxy: Boolean(showProxy),
    maxArrayLength: Number(maxArrayLength),
    breakLength: Number(breakLength),
    truncate: Number(truncate2),
    seen,
    stylize
  };
  if (options.colors) {
    options.stylize = colorise;
  }
  return options;
}
function truncate(string4, length, tail = truncator) {
  string4 = String(string4);
  const tailLength = tail.length;
  const stringLength = string4.length;
  if (tailLength > length && stringLength > tailLength) {
    return tail;
  }
  if (stringLength > length && stringLength > tailLength) {
    return `${string4.slice(0, length - tailLength)}${tail}`;
  }
  return string4;
}
function inspectList(list, options, inspectItem, separator = ", ") {
  inspectItem = inspectItem || options.inspect;
  const size = list.length;
  if (size === 0)
    return "";
  const originalLength = options.truncate;
  let output = "";
  let peek = "";
  let truncated = "";
  for (let i = 0; i < size; i += 1) {
    const last = i + 1 === list.length;
    const secondToLast = i + 2 === list.length;
    truncated = `${truncator}(${list.length - i})`;
    const value = list[i];
    options.truncate = originalLength - output.length - (last ? 0 : separator.length);
    const string4 = peek || inspectItem(value, options) + (last ? "" : separator);
    const nextLength = output.length + string4.length;
    const truncatedLength = nextLength + truncated.length;
    if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) {
      break;
    }
    if (!last && !secondToLast && truncatedLength > originalLength) {
      break;
    }
    peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator);
    if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength) {
      break;
    }
    output += string4;
    if (!last && !secondToLast && nextLength + peek.length >= originalLength) {
      truncated = `${truncator}(${list.length - i - 1})`;
      break;
    }
    truncated = "";
  }
  return `${output}${truncated}`;
}
function quoteComplexKey(key) {
  if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
    return key;
  }
  return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
function inspectProperty([key, value], options) {
  options.truncate -= 2;
  if (typeof key === "string") {
    key = quoteComplexKey(key);
  } else if (typeof key !== "number") {
    key = `[${options.inspect(key, options)}]`;
  }
  options.truncate -= key.length;
  value = options.inspect(value, options);
  return `${key}: ${value}`;
}
var ansiColors, styles, truncator;
var init_helpers = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/helpers.js"() {
    "use strict";
    ansiColors = {
      bold: ["1", "22"],
      dim: ["2", "22"],
      italic: ["3", "23"],
      underline: ["4", "24"],
      // 5 & 6 are blinking
      inverse: ["7", "27"],
      hidden: ["8", "28"],
      strike: ["9", "29"],
      // 10-20 are fonts
      // 21-29 are resets for 1-9
      black: ["30", "39"],
      red: ["31", "39"],
      green: ["32", "39"],
      yellow: ["33", "39"],
      blue: ["34", "39"],
      magenta: ["35", "39"],
      cyan: ["36", "39"],
      white: ["37", "39"],
      brightblack: ["30;1", "39"],
      brightred: ["31;1", "39"],
      brightgreen: ["32;1", "39"],
      brightyellow: ["33;1", "39"],
      brightblue: ["34;1", "39"],
      brightmagenta: ["35;1", "39"],
      brightcyan: ["36;1", "39"],
      brightwhite: ["37;1", "39"],
      grey: ["90", "39"]
    };
    styles = {
      special: "cyan",
      number: "yellow",
      bigint: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      symbol: "green",
      date: "magenta",
      regexp: "red"
    };
    truncator = "\u2026";
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/array.js
function inspectArray(array3, options) {
  const nonIndexProperties = Object.keys(array3).slice(array3.length);
  if (!array3.length && !nonIndexProperties.length)
    return "[]";
  options.truncate -= 4;
  const listContents = inspectList(array3, options);
  options.truncate -= listContents.length;
  let propertyContents = "";
  if (nonIndexProperties.length) {
    propertyContents = inspectList(
      nonIndexProperties.map((key) => [key, array3[key]]),
      options,
      inspectProperty
    );
  }
  return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
var init_array = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/array.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/get-func-name@2.0.2/node_modules/get-func-name/index.js
var require_get_func_name = __commonJS({
  "../../node_modules/.pnpm/get-func-name@2.0.2/node_modules/get-func-name/index.js"(exports2, module2) {
    "use strict";
    var toString3 = Function.prototype.toString;
    var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
    var maxFunctionSourceLength = 512;
    function getFuncName3(aFunc) {
      if (typeof aFunc !== "function") {
        return null;
      }
      var name = "";
      if (typeof Function.prototype.name === "undefined" && typeof aFunc.name === "undefined") {
        var functionSource = toString3.call(aFunc);
        if (functionSource.indexOf("(") > maxFunctionSourceLength) {
          return name;
        }
        var match = functionSource.match(functionNameMatch);
        if (match) {
          name = match[1];
        }
      } else {
        name = aFunc.name;
      }
      return name;
    }
    module2.exports = getFuncName3;
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/typedarray.js
function inspectTypedArray(array3, options) {
  const name = getArrayName(array3);
  options.truncate -= name.length + 4;
  const nonIndexProperties = Object.keys(array3).slice(array3.length);
  if (!array3.length && !nonIndexProperties.length)
    return `${name}[]`;
  let output = "";
  for (let i = 0; i < array3.length; i++) {
    const string4 = `${options.stylize(truncate(array3[i], options.truncate), "number")}${i === array3.length - 1 ? "" : ", "}`;
    options.truncate -= string4.length;
    if (array3[i] !== array3.length && options.truncate <= 3) {
      output += `${truncator}(${array3.length - array3[i] + 1})`;
      break;
    }
    output += string4;
  }
  let propertyContents = "";
  if (nonIndexProperties.length) {
    propertyContents = inspectList(
      nonIndexProperties.map((key) => [key, array3[key]]),
      options,
      inspectProperty
    );
  }
  return `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
var import_get_func_name, getArrayName;
var init_typedarray = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/typedarray.js"() {
    "use strict";
    import_get_func_name = __toESM(require_get_func_name());
    init_helpers();
    getArrayName = (array3) => {
      if (typeof Buffer === "function" && array3 instanceof Buffer) {
        return "Buffer";
      }
      if (array3[Symbol.toStringTag]) {
        return array3[Symbol.toStringTag];
      }
      return (0, import_get_func_name.default)(array3.constructor);
    };
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/date.js
function inspectDate(dateObject, options) {
  const stringRepresentation = dateObject.toJSON();
  if (stringRepresentation === null) {
    return "Invalid Date";
  }
  const split = stringRepresentation.split("T");
  const date = split[0];
  return options.stylize(`${date}T${truncate(split[1], options.truncate - date.length - 1)}`, "date");
}
var init_date = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/date.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/function.js
function inspectFunction(func, options) {
  const name = (0, import_get_func_name2.default)(func);
  if (!name) {
    return options.stylize("[Function]", "special");
  }
  return options.stylize(`[Function ${truncate(name, options.truncate - 11)}]`, "special");
}
var import_get_func_name2;
var init_function = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/function.js"() {
    "use strict";
    import_get_func_name2 = __toESM(require_get_func_name());
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/map.js
function inspectMapEntry([key, value], options) {
  options.truncate -= 4;
  key = options.inspect(key, options);
  options.truncate -= key.length;
  value = options.inspect(value, options);
  return `${key} => ${value}`;
}
function mapToEntries(map2) {
  const entries = [];
  map2.forEach((value, key) => {
    entries.push([key, value]);
  });
  return entries;
}
function inspectMap(map2, options) {
  const size = map2.size - 1;
  if (size <= 0) {
    return "Map{}";
  }
  options.truncate -= 7;
  return `Map{ ${inspectList(mapToEntries(map2), options, inspectMapEntry)} }`;
}
var init_map = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/map.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/number.js
function inspectNumber(number2, options) {
  if (isNaN2(number2)) {
    return options.stylize("NaN", "number");
  }
  if (number2 === Infinity) {
    return options.stylize("Infinity", "number");
  }
  if (number2 === -Infinity) {
    return options.stylize("-Infinity", "number");
  }
  if (number2 === 0) {
    return options.stylize(1 / number2 === Infinity ? "+0" : "-0", "number");
  }
  return options.stylize(truncate(number2, options.truncate), "number");
}
var isNaN2;
var init_number = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/number.js"() {
    "use strict";
    init_helpers();
    isNaN2 = Number.isNaN || ((i) => i !== i);
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/bigint.js
function inspectBigInt(number2, options) {
  let nums = truncate(number2.toString(), options.truncate - 1);
  if (nums !== truncator)
    nums += "n";
  return options.stylize(nums, "bigint");
}
var init_bigint = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/bigint.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/regexp.js
function inspectRegExp(value, options) {
  const flags = value.toString().split("/")[2];
  const sourceLength = options.truncate - (2 + flags.length);
  const source = value.source;
  return options.stylize(`/${truncate(source, sourceLength)}/${flags}`, "regexp");
}
var init_regexp = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/regexp.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/set.js
function arrayFromSet(set3) {
  const values = [];
  set3.forEach((value) => {
    values.push(value);
  });
  return values;
}
function inspectSet(set3, options) {
  if (set3.size === 0)
    return "Set{}";
  options.truncate -= 7;
  return `Set{ ${inspectList(arrayFromSet(set3), options)} }`;
}
var init_set = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/set.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/string.js
function escape(char) {
  return escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(hex)}`.slice(-unicodeLength)}`;
}
function inspectString(string4, options) {
  if (stringEscapeChars.test(string4)) {
    string4 = string4.replace(stringEscapeChars, escape);
  }
  return options.stylize(`'${truncate(string4, options.truncate - 2)}'`, "string");
}
var stringEscapeChars, escapeCharacters, hex, unicodeLength;
var init_string = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/string.js"() {
    "use strict";
    init_helpers();
    stringEscapeChars = new RegExp(
      "['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]",
      "g"
    );
    escapeCharacters = {
      "\b": "\\b",
      "	": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      "'": "\\'",
      "\\": "\\\\"
    };
    hex = 16;
    unicodeLength = 4;
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/symbol.js
function inspectSymbol(value) {
  if ("description" in Symbol.prototype) {
    return value.description ? `Symbol(${value.description})` : "Symbol()";
  }
  return value.toString();
}
var init_symbol = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/symbol.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/promise.js
var getPromiseValue, promise_default;
var init_promise = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/promise.js"() {
    "use strict";
    getPromiseValue = () => "Promise{\u2026}";
    try {
      const { getPromiseDetails, kPending, kRejected } = process.binding("util");
      if (Array.isArray(getPromiseDetails(Promise.resolve()))) {
        getPromiseValue = (value, options) => {
          const [state, innerValue] = getPromiseDetails(value);
          if (state === kPending) {
            return "Promise{<pending>}";
          }
          return `Promise${state === kRejected ? "!" : ""}{${options.inspect(innerValue, options)}}`;
        };
      }
    } catch (notNode) {
    }
    promise_default = getPromiseValue;
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/object.js
function inspectObject(object3, options) {
  const properties = Object.getOwnPropertyNames(object3);
  const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object3) : [];
  if (properties.length === 0 && symbols.length === 0) {
    return "{}";
  }
  options.truncate -= 4;
  options.seen = options.seen || [];
  if (options.seen.indexOf(object3) >= 0) {
    return "[Circular]";
  }
  options.seen.push(object3);
  const propertyContents = inspectList(
    properties.map((key) => [key, object3[key]]),
    options,
    inspectProperty
  );
  const symbolContents = inspectList(
    symbols.map((key) => [key, object3[key]]),
    options,
    inspectProperty
  );
  options.seen.pop();
  let sep = "";
  if (propertyContents && symbolContents) {
    sep = ", ";
  }
  return `{ ${propertyContents}${sep}${symbolContents} }`;
}
var init_object = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/object.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/class.js
function inspectClass(value, options) {
  let name = "";
  if (toStringTag && toStringTag in value) {
    name = value[toStringTag];
  }
  name = name || (0, import_get_func_name3.default)(value.constructor);
  if (!name || name === "_class") {
    name = "<Anonymous Class>";
  }
  options.truncate -= name.length;
  return `${name}${inspectObject(value, options)}`;
}
var import_get_func_name3, toStringTag;
var init_class = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/class.js"() {
    "use strict";
    import_get_func_name3 = __toESM(require_get_func_name());
    init_object();
    toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag ? Symbol.toStringTag : false;
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/arguments.js
function inspectArguments(args, options) {
  if (args.length === 0)
    return "Arguments[]";
  options.truncate -= 13;
  return `Arguments[ ${inspectList(args, options)} ]`;
}
var init_arguments = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/arguments.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/error.js
function inspectObject2(error, options) {
  const properties = Object.getOwnPropertyNames(error).filter((key) => errorKeys.indexOf(key) === -1);
  const name = error.name;
  options.truncate -= name.length;
  let message = "";
  if (typeof error.message === "string") {
    message = truncate(error.message, options.truncate);
  } else {
    properties.unshift("message");
  }
  message = message ? `: ${message}` : "";
  options.truncate -= message.length + 5;
  const propertyContents = inspectList(
    properties.map((key) => [key, error[key]]),
    options,
    inspectProperty
  );
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
var errorKeys;
var init_error = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/error.js"() {
    "use strict";
    init_helpers();
    errorKeys = [
      "stack",
      "line",
      "column",
      "name",
      "message",
      "fileName",
      "lineNumber",
      "columnNumber",
      "number",
      "description"
    ];
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/html.js
function inspectAttribute([key, value], options) {
  options.truncate -= 3;
  if (!value) {
    return `${options.stylize(key, "yellow")}`;
  }
  return `${options.stylize(key, "yellow")}=${options.stylize(`"${value}"`, "string")}`;
}
function inspectHTMLCollection(collection, options) {
  return inspectList(collection, options, inspectHTML, "\n");
}
function inspectHTML(element, options) {
  const properties = element.getAttributeNames();
  const name = element.tagName.toLowerCase();
  const head = options.stylize(`<${name}`, "special");
  const headClose = options.stylize(`>`, "special");
  const tail = options.stylize(`</${name}>`, "special");
  options.truncate -= name.length * 2 + 5;
  let propertyContents = "";
  if (properties.length > 0) {
    propertyContents += " ";
    propertyContents += inspectList(
      properties.map((key) => [key, element.getAttribute(key)]),
      options,
      inspectAttribute,
      " "
    );
  }
  options.truncate -= propertyContents.length;
  const truncate2 = options.truncate;
  let children = inspectHTMLCollection(element.children, options);
  if (children && children.length > truncate2) {
    children = `${truncator}(${element.children.length})`;
  }
  return `${head}${propertyContents}${headClose}${children}${tail}`;
}
var init_html = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/lib/html.js"() {
    "use strict";
    init_helpers();
  }
});

// ../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/index.js
var loupe_exports = {};
__export(loupe_exports, {
  custom: () => custom,
  default: () => loupe_default,
  inspect: () => inspect,
  registerConstructor: () => registerConstructor,
  registerStringTag: () => registerStringTag
});
function FakeMap() {
  this.key = "chai/loupe__" + Math.random() + Date.now();
}
function inspect(value, options) {
  options = normaliseOptions(options);
  options.inspect = inspect;
  const { customInspect } = options;
  let type2 = value === null ? "null" : typeof value;
  if (type2 === "object") {
    type2 = toString.call(value).slice(8, -1);
  }
  if (baseTypesMap[type2]) {
    return baseTypesMap[type2](value, options);
  }
  if (customInspect && value) {
    const output = inspectCustom(value, options, type2);
    if (output) {
      if (typeof output === "string")
        return output;
      return inspect(output, options);
    }
  }
  const proto = value ? Object.getPrototypeOf(value) : false;
  if (proto === Object.prototype || proto === null) {
    return inspectObject(value, options);
  }
  if (value && typeof HTMLElement === "function" && value instanceof HTMLElement) {
    return inspectHTML(value, options);
  }
  if ("constructor" in value) {
    if (value.constructor !== Object) {
      return inspectClass(value, options);
    }
    return inspectObject(value, options);
  }
  if (value === Object(value)) {
    return inspectObject(value, options);
  }
  return options.stylize(String(value), type2);
}
function registerConstructor(constructor, inspector) {
  if (constructorMap.has(constructor)) {
    return false;
  }
  constructorMap.set(constructor, inspector);
  return true;
}
function registerStringTag(stringTag, inspector) {
  if (stringTag in stringTagMap) {
    return false;
  }
  stringTagMap[stringTag] = inspector;
  return true;
}
var symbolsSupported, chaiInspect, nodeInspect, constructorMap, stringTagMap, baseTypesMap, inspectCustom, toString, custom, loupe_default;
var init_loupe = __esm({
  "../../node_modules/.pnpm/loupe@2.3.7/node_modules/loupe/index.js"() {
    "use strict";
    init_array();
    init_typedarray();
    init_date();
    init_function();
    init_map();
    init_number();
    init_bigint();
    init_regexp();
    init_set();
    init_string();
    init_symbol();
    init_promise();
    init_class();
    init_object();
    init_arguments();
    init_error();
    init_html();
    init_helpers();
    symbolsSupported = typeof Symbol === "function" && typeof Symbol.for === "function";
    chaiInspect = symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect";
    nodeInspect = false;
    try {
      const nodeUtil = require("util");
      nodeInspect = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
    } catch (noNodeInspect) {
      nodeInspect = false;
    }
    FakeMap.prototype = {
      // eslint-disable-next-line object-shorthand
      get: function get(key) {
        return key[this.key];
      },
      // eslint-disable-next-line object-shorthand
      has: function has(key) {
        return this.key in key;
      },
      // eslint-disable-next-line object-shorthand
      set: function set(key, value) {
        if (Object.isExtensible(key)) {
          Object.defineProperty(key, this.key, {
            // eslint-disable-next-line object-shorthand
            value,
            configurable: true
          });
        }
      }
    };
    constructorMap = new (typeof WeakMap === "function" ? WeakMap : FakeMap)();
    stringTagMap = {};
    baseTypesMap = {
      undefined: (value, options) => options.stylize("undefined", "undefined"),
      null: (value, options) => options.stylize(null, "null"),
      boolean: (value, options) => options.stylize(value, "boolean"),
      Boolean: (value, options) => options.stylize(value, "boolean"),
      number: inspectNumber,
      Number: inspectNumber,
      bigint: inspectBigInt,
      BigInt: inspectBigInt,
      string: inspectString,
      String: inspectString,
      function: inspectFunction,
      Function: inspectFunction,
      symbol: inspectSymbol,
      // A Symbol polyfill will return `Symbol` not `symbol` from typedetect
      Symbol: inspectSymbol,
      Array: inspectArray,
      Date: inspectDate,
      Map: inspectMap,
      Set: inspectSet,
      RegExp: inspectRegExp,
      Promise: promise_default,
      // WeakSet, WeakMap are totally opaque to us
      WeakSet: (value, options) => options.stylize("WeakSet{\u2026}", "special"),
      WeakMap: (value, options) => options.stylize("WeakMap{\u2026}", "special"),
      Arguments: inspectArguments,
      Int8Array: inspectTypedArray,
      Uint8Array: inspectTypedArray,
      Uint8ClampedArray: inspectTypedArray,
      Int16Array: inspectTypedArray,
      Uint16Array: inspectTypedArray,
      Int32Array: inspectTypedArray,
      Uint32Array: inspectTypedArray,
      Float32Array: inspectTypedArray,
      Float64Array: inspectTypedArray,
      Generator: () => "",
      DataView: () => "",
      ArrayBuffer: () => "",
      Error: inspectObject2,
      HTMLCollection: inspectHTMLCollection,
      NodeList: inspectHTMLCollection
    };
    inspectCustom = (value, options, type2) => {
      if (chaiInspect in value && typeof value[chaiInspect] === "function") {
        return value[chaiInspect](options);
      }
      if (nodeInspect && nodeInspect in value && typeof value[nodeInspect] === "function") {
        return value[nodeInspect](options.depth, options);
      }
      if ("inspect" in value && typeof value.inspect === "function") {
        return value.inspect(options.depth, options);
      }
      if ("constructor" in value && constructorMap.has(value.constructor)) {
        return constructorMap.get(value.constructor)(value, options);
      }
      if (stringTagMap[type2]) {
        return stringTagMap[type2](value, options);
      }
      return "";
    };
    toString = Object.prototype.toString;
    custom = chaiInspect;
    loupe_default = inspect;
  }
});

// ../../node_modules/.pnpm/diff-sequences@29.6.3/node_modules/diff-sequences/build/index.js
var require_build2 = __commonJS({
  "../../node_modules/.pnpm/diff-sequences@29.6.3/node_modules/diff-sequences/build/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = diffSequence;
    var pkg = "diff-sequences";
    var NOT_YET_SET = 0;
    var countCommonItemsF = (aIndex, aEnd, bIndex, bEnd, isCommon) => {
      let nCommon = 0;
      while (aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex)) {
        aIndex += 1;
        bIndex += 1;
        nCommon += 1;
      }
      return nCommon;
    };
    var countCommonItemsR = (aStart, aIndex, bStart, bIndex, isCommon) => {
      let nCommon = 0;
      while (aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex)) {
        aIndex -= 1;
        bIndex -= 1;
        nCommon += 1;
      }
      return nCommon;
    };
    var extendPathsF = (d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF) => {
      let iF = 0;
      let kF = -d2;
      let aFirst = aIndexesF[iF];
      let aIndexPrev1 = aFirst;
      aIndexesF[iF] += countCommonItemsF(
        aFirst + 1,
        aEnd,
        bF + aFirst - kF + 1,
        bEnd,
        isCommon
      );
      const nF = d2 < iMaxF ? d2 : iMaxF;
      for (iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2) {
        if (iF !== d2 && aIndexPrev1 < aIndexesF[iF]) {
          aFirst = aIndexesF[iF];
        } else {
          aFirst = aIndexPrev1 + 1;
          if (aEnd <= aFirst) {
            return iF - 1;
          }
        }
        aIndexPrev1 = aIndexesF[iF];
        aIndexesF[iF] = aFirst + countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
      }
      return iMaxF;
    };
    var extendPathsR = (d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR) => {
      let iR = 0;
      let kR = d2;
      let aFirst = aIndexesR[iR];
      let aIndexPrev1 = aFirst;
      aIndexesR[iR] -= countCommonItemsR(
        aStart,
        aFirst - 1,
        bStart,
        bR + aFirst - kR - 1,
        isCommon
      );
      const nR = d2 < iMaxR ? d2 : iMaxR;
      for (iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2) {
        if (iR !== d2 && aIndexesR[iR] < aIndexPrev1) {
          aFirst = aIndexesR[iR];
        } else {
          aFirst = aIndexPrev1 - 1;
          if (aFirst < aStart) {
            return iR - 1;
          }
        }
        aIndexPrev1 = aIndexesR[iR];
        aIndexesR[iR] = aFirst - countCommonItemsR(
          aStart,
          aFirst - 1,
          bStart,
          bR + aFirst - kR - 1,
          isCommon
        );
      }
      return iMaxR;
    };
    var extendOverlappablePathsF = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
      const bF = bStart - aStart;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      const kMinOverlapF = -baDeltaLength - (d2 - 1);
      const kMaxOverlapF = -baDeltaLength + (d2 - 1);
      let aIndexPrev1 = NOT_YET_SET;
      const nF = d2 < iMaxF ? d2 : iMaxF;
      for (let iF = 0, kF = -d2; iF <= nF; iF += 1, kF += 2) {
        const insert2 = iF === 0 || iF !== d2 && aIndexPrev1 < aIndexesF[iF];
        const aLastPrev = insert2 ? aIndexesF[iF] : aIndexPrev1;
        const aFirst = insert2 ? aLastPrev : aLastPrev + 1;
        const bFirst = bF + aFirst - kF;
        const nCommonF = countCommonItemsF(
          aFirst + 1,
          aEnd,
          bFirst + 1,
          bEnd,
          isCommon
        );
        const aLast = aFirst + nCommonF;
        aIndexPrev1 = aIndexesF[iF];
        aIndexesF[iF] = aLast;
        if (kMinOverlapF <= kF && kF <= kMaxOverlapF) {
          const iR = (d2 - 1 - (kF + baDeltaLength)) / 2;
          if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
            const bLastPrev = bF + aLastPrev - (insert2 ? kF + 1 : kF - 1);
            const nCommonR = countCommonItemsR(
              aStart,
              aLastPrev,
              bStart,
              bLastPrev,
              isCommon
            );
            const aIndexPrevFirst = aLastPrev - nCommonR;
            const bIndexPrevFirst = bLastPrev - nCommonR;
            const aEndPreceding = aIndexPrevFirst + 1;
            const bEndPreceding = bIndexPrevFirst + 1;
            division.nChangePreceding = d2 - 1;
            if (d2 - 1 === aEndPreceding + bEndPreceding - aStart - bStart) {
              division.aEndPreceding = aStart;
              division.bEndPreceding = bStart;
            } else {
              division.aEndPreceding = aEndPreceding;
              division.bEndPreceding = bEndPreceding;
            }
            division.nCommonPreceding = nCommonR;
            if (nCommonR !== 0) {
              division.aCommonPreceding = aEndPreceding;
              division.bCommonPreceding = bEndPreceding;
            }
            division.nCommonFollowing = nCommonF;
            if (nCommonF !== 0) {
              division.aCommonFollowing = aFirst + 1;
              division.bCommonFollowing = bFirst + 1;
            }
            const aStartFollowing = aLast + 1;
            const bStartFollowing = bFirst + nCommonF + 1;
            division.nChangeFollowing = d2 - 1;
            if (d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
              division.aStartFollowing = aEnd;
              division.bStartFollowing = bEnd;
            } else {
              division.aStartFollowing = aStartFollowing;
              division.bStartFollowing = bStartFollowing;
            }
            return true;
          }
        }
      }
      return false;
    };
    var extendOverlappablePathsR = (d2, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division) => {
      const bR = bEnd - aEnd;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      const kMinOverlapR = baDeltaLength - d2;
      const kMaxOverlapR = baDeltaLength + d2;
      let aIndexPrev1 = NOT_YET_SET;
      const nR = d2 < iMaxR ? d2 : iMaxR;
      for (let iR = 0, kR = d2; iR <= nR; iR += 1, kR -= 2) {
        const insert2 = iR === 0 || iR !== d2 && aIndexesR[iR] < aIndexPrev1;
        const aLastPrev = insert2 ? aIndexesR[iR] : aIndexPrev1;
        const aFirst = insert2 ? aLastPrev : aLastPrev - 1;
        const bFirst = bR + aFirst - kR;
        const nCommonR = countCommonItemsR(
          aStart,
          aFirst - 1,
          bStart,
          bFirst - 1,
          isCommon
        );
        const aLast = aFirst - nCommonR;
        aIndexPrev1 = aIndexesR[iR];
        aIndexesR[iR] = aLast;
        if (kMinOverlapR <= kR && kR <= kMaxOverlapR) {
          const iF = (d2 + (kR - baDeltaLength)) / 2;
          if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
            const bLast = bFirst - nCommonR;
            division.nChangePreceding = d2;
            if (d2 === aLast + bLast - aStart - bStart) {
              division.aEndPreceding = aStart;
              division.bEndPreceding = bStart;
            } else {
              division.aEndPreceding = aLast;
              division.bEndPreceding = bLast;
            }
            division.nCommonPreceding = nCommonR;
            if (nCommonR !== 0) {
              division.aCommonPreceding = aLast;
              division.bCommonPreceding = bLast;
            }
            division.nChangeFollowing = d2 - 1;
            if (d2 === 1) {
              division.nCommonFollowing = 0;
              division.aStartFollowing = aEnd;
              division.bStartFollowing = bEnd;
            } else {
              const bLastPrev = bR + aLastPrev - (insert2 ? kR - 1 : kR + 1);
              const nCommonF = countCommonItemsF(
                aLastPrev,
                aEnd,
                bLastPrev,
                bEnd,
                isCommon
              );
              division.nCommonFollowing = nCommonF;
              if (nCommonF !== 0) {
                division.aCommonFollowing = aLastPrev;
                division.bCommonFollowing = bLastPrev;
              }
              const aStartFollowing = aLastPrev + nCommonF;
              const bStartFollowing = bLastPrev + nCommonF;
              if (d2 - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
                division.aStartFollowing = aEnd;
                division.bStartFollowing = bEnd;
              } else {
                division.aStartFollowing = aStartFollowing;
                division.bStartFollowing = bStartFollowing;
              }
            }
            return true;
          }
        }
      }
      return false;
    };
    var divide = (nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division) => {
      const bF = bStart - aStart;
      const bR = bEnd - aEnd;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      let iMaxF = aLength;
      let iMaxR = aLength;
      aIndexesF[0] = aStart - 1;
      aIndexesR[0] = aEnd;
      if (baDeltaLength % 2 === 0) {
        const dMin = (nChange || baDeltaLength) / 2;
        const dMax = (aLength + bLength) / 2;
        for (let d2 = 1; d2 <= dMax; d2 += 1) {
          iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
          if (d2 < dMin) {
            iMaxR = extendPathsR(d2, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
          } else if (
            // If a reverse path overlaps a forward path in the same diagonal,
            // return a division of the index intervals at the middle change.
            extendOverlappablePathsR(
              d2,
              aStart,
              aEnd,
              bStart,
              bEnd,
              isCommon,
              aIndexesF,
              iMaxF,
              aIndexesR,
              iMaxR,
              division
            )
          ) {
            return;
          }
        }
      } else {
        const dMin = ((nChange || baDeltaLength) + 1) / 2;
        const dMax = (aLength + bLength + 1) / 2;
        let d2 = 1;
        iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
        for (d2 += 1; d2 <= dMax; d2 += 1) {
          iMaxR = extendPathsR(
            d2 - 1,
            aStart,
            bStart,
            bR,
            isCommon,
            aIndexesR,
            iMaxR
          );
          if (d2 < dMin) {
            iMaxF = extendPathsF(d2, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
          } else if (
            // If a forward path overlaps a reverse path in the same diagonal,
            // return a division of the index intervals at the middle change.
            extendOverlappablePathsF(
              d2,
              aStart,
              aEnd,
              bStart,
              bEnd,
              isCommon,
              aIndexesF,
              iMaxF,
              aIndexesR,
              iMaxR,
              division
            )
          ) {
            return;
          }
        }
      }
      throw new Error(
        `${pkg}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`
      );
    };
    var findSubsequences = (nChange, aStart, aEnd, bStart, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division) => {
      if (bEnd - bStart < aEnd - aStart) {
        transposed = !transposed;
        if (transposed && callbacks.length === 1) {
          const { foundSubsequence: foundSubsequence2, isCommon: isCommon2 } = callbacks[0];
          callbacks[1] = {
            foundSubsequence: (nCommon, bCommon, aCommon) => {
              foundSubsequence2(nCommon, aCommon, bCommon);
            },
            isCommon: (bIndex, aIndex) => isCommon2(aIndex, bIndex)
          };
        }
        const tStart = aStart;
        const tEnd = aEnd;
        aStart = bStart;
        aEnd = bEnd;
        bStart = tStart;
        bEnd = tEnd;
      }
      const { foundSubsequence, isCommon } = callbacks[transposed ? 1 : 0];
      divide(
        nChange,
        aStart,
        aEnd,
        bStart,
        bEnd,
        isCommon,
        aIndexesF,
        aIndexesR,
        division
      );
      const {
        nChangePreceding,
        aEndPreceding,
        bEndPreceding,
        nCommonPreceding,
        aCommonPreceding,
        bCommonPreceding,
        nCommonFollowing,
        aCommonFollowing,
        bCommonFollowing,
        nChangeFollowing,
        aStartFollowing,
        bStartFollowing
      } = division;
      if (aStart < aEndPreceding && bStart < bEndPreceding) {
        findSubsequences(
          nChangePreceding,
          aStart,
          aEndPreceding,
          bStart,
          bEndPreceding,
          transposed,
          callbacks,
          aIndexesF,
          aIndexesR,
          division
        );
      }
      if (nCommonPreceding !== 0) {
        foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding);
      }
      if (nCommonFollowing !== 0) {
        foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing);
      }
      if (aStartFollowing < aEnd && bStartFollowing < bEnd) {
        findSubsequences(
          nChangeFollowing,
          aStartFollowing,
          aEnd,
          bStartFollowing,
          bEnd,
          transposed,
          callbacks,
          aIndexesF,
          aIndexesR,
          division
        );
      }
    };
    var validateLength = (name, arg) => {
      if (typeof arg !== "number") {
        throw new TypeError(`${pkg}: ${name} typeof ${typeof arg} is not a number`);
      }
      if (!Number.isSafeInteger(arg)) {
        throw new RangeError(`${pkg}: ${name} value ${arg} is not a safe integer`);
      }
      if (arg < 0) {
        throw new RangeError(`${pkg}: ${name} value ${arg} is a negative integer`);
      }
    };
    var validateCallback = (name, arg) => {
      const type2 = typeof arg;
      if (type2 !== "function") {
        throw new TypeError(`${pkg}: ${name} typeof ${type2} is not a function`);
      }
    };
    function diffSequence(aLength, bLength, isCommon, foundSubsequence) {
      validateLength("aLength", aLength);
      validateLength("bLength", bLength);
      validateCallback("isCommon", isCommon);
      validateCallback("foundSubsequence", foundSubsequence);
      const nCommonF = countCommonItemsF(0, aLength, 0, bLength, isCommon);
      if (nCommonF !== 0) {
        foundSubsequence(nCommonF, 0, 0);
      }
      if (aLength !== nCommonF || bLength !== nCommonF) {
        const aStart = nCommonF;
        const bStart = nCommonF;
        const nCommonR = countCommonItemsR(
          aStart,
          aLength - 1,
          bStart,
          bLength - 1,
          isCommon
        );
        const aEnd = aLength - nCommonR;
        const bEnd = bLength - nCommonR;
        const nCommonFR = nCommonF + nCommonR;
        if (aLength !== nCommonFR && bLength !== nCommonFR) {
          const nChange = 0;
          const transposed = false;
          const callbacks = [
            {
              foundSubsequence,
              isCommon
            }
          ];
          const aIndexesF = [NOT_YET_SET];
          const aIndexesR = [NOT_YET_SET];
          const division = {
            aCommonFollowing: NOT_YET_SET,
            aCommonPreceding: NOT_YET_SET,
            aEndPreceding: NOT_YET_SET,
            aStartFollowing: NOT_YET_SET,
            bCommonFollowing: NOT_YET_SET,
            bCommonPreceding: NOT_YET_SET,
            bEndPreceding: NOT_YET_SET,
            bStartFollowing: NOT_YET_SET,
            nChangeFollowing: NOT_YET_SET,
            nChangePreceding: NOT_YET_SET,
            nCommonFollowing: NOT_YET_SET,
            nCommonPreceding: NOT_YET_SET
          };
          findSubsequences(
            nChange,
            aStart,
            aEnd,
            bStart,
            bEnd,
            transposed,
            callbacks,
            aIndexesF,
            aIndexesR,
            division
          );
        }
        if (nCommonR !== 0) {
          foundSubsequence(nCommonR, aEnd, bEnd);
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/assertion-error@1.1.0/node_modules/assertion-error/index.js
var require_assertion_error = __commonJS({
  "../../node_modules/.pnpm/assertion-error@1.1.0/node_modules/assertion-error/index.js"(exports2, module2) {
    "use strict";
    function exclude() {
      var excludes = [].slice.call(arguments);
      function excludeProps(res, obj) {
        Object.keys(obj).forEach(function(key) {
          if (!~excludes.indexOf(key))
            res[key] = obj[key];
        });
      }
      return function extendExclude() {
        var args = [].slice.call(arguments), i = 0, res = {};
        for (; i < args.length; i++) {
          excludeProps(res, args[i]);
        }
        return res;
      };
    }
    module2.exports = AssertionError2;
    function AssertionError2(message, _props, ssf) {
      var extend = exclude("name", "message", "stack", "constructor", "toJSON"), props = extend(_props || {});
      this.message = message || "Unspecified AssertionError";
      this.showDiff = false;
      for (var key in props) {
        this[key] = props[key];
      }
      ssf = ssf || AssertionError2;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ssf);
      } else {
        try {
          throw new Error();
        } catch (e) {
          this.stack = e.stack;
        }
      }
    }
    AssertionError2.prototype = Object.create(Error.prototype);
    AssertionError2.prototype.name = "AssertionError";
    AssertionError2.prototype.constructor = AssertionError2;
    AssertionError2.prototype.toJSON = function(stack) {
      var extend = exclude("constructor", "toJSON", "stack"), props = extend({ name: this.name }, this);
      if (false !== stack && this.stack) {
        props.stack = this.stack;
      }
      return props;
    };
  }
});

// ../../node_modules/.pnpm/pathval@1.1.1/node_modules/pathval/index.js
var require_pathval = __commonJS({
  "../../node_modules/.pnpm/pathval@1.1.1/node_modules/pathval/index.js"(exports2, module2) {
    "use strict";
    function hasProperty(obj, name) {
      if (typeof obj === "undefined" || obj === null) {
        return false;
      }
      return name in Object(obj);
    }
    function parsePath(path2) {
      var str = path2.replace(/([^\\])\[/g, "$1.[");
      var parts = str.match(/(\\\.|[^.]+?)+/g);
      return parts.map(function mapMatches(value) {
        if (value === "constructor" || value === "__proto__" || value === "prototype") {
          return {};
        }
        var regexp = /^\[(\d+)\]$/;
        var mArr = regexp.exec(value);
        var parsed = null;
        if (mArr) {
          parsed = { i: parseFloat(mArr[1]) };
        } else {
          parsed = { p: value.replace(/\\([.[\]])/g, "$1") };
        }
        return parsed;
      });
    }
    function internalGetPathValue(obj, parsed, pathDepth) {
      var temporaryValue = obj;
      var res = null;
      pathDepth = typeof pathDepth === "undefined" ? parsed.length : pathDepth;
      for (var i = 0; i < pathDepth; i++) {
        var part = parsed[i];
        if (temporaryValue) {
          if (typeof part.p === "undefined") {
            temporaryValue = temporaryValue[part.i];
          } else {
            temporaryValue = temporaryValue[part.p];
          }
          if (i === pathDepth - 1) {
            res = temporaryValue;
          }
        }
      }
      return res;
    }
    function internalSetPathValue(obj, val, parsed) {
      var tempObj = obj;
      var pathDepth = parsed.length;
      var part = null;
      for (var i = 0; i < pathDepth; i++) {
        var propName = null;
        var propVal = null;
        part = parsed[i];
        if (i === pathDepth - 1) {
          propName = typeof part.p === "undefined" ? part.i : part.p;
          tempObj[propName] = val;
        } else if (typeof part.p !== "undefined" && tempObj[part.p]) {
          tempObj = tempObj[part.p];
        } else if (typeof part.i !== "undefined" && tempObj[part.i]) {
          tempObj = tempObj[part.i];
        } else {
          var next = parsed[i + 1];
          propName = typeof part.p === "undefined" ? part.i : part.p;
          propVal = typeof next.p === "undefined" ? [] : {};
          tempObj[propName] = propVal;
          tempObj = tempObj[propName];
        }
      }
    }
    function getPathInfo(obj, path2) {
      var parsed = parsePath(path2);
      var last = parsed[parsed.length - 1];
      var info = {
        parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
        name: last.p || last.i,
        value: internalGetPathValue(obj, parsed)
      };
      info.exists = hasProperty(info.parent, info.name);
      return info;
    }
    function getPathValue(obj, path2) {
      var info = getPathInfo(obj, path2);
      return info.value;
    }
    function setPathValue(obj, path2, val) {
      var parsed = parsePath(path2);
      internalSetPathValue(obj, val, parsed);
      return obj;
    }
    module2.exports = {
      hasProperty,
      getPathInfo,
      getPathValue,
      setPathValue
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/flag.js
var require_flag = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/flag.js"(exports2, module2) {
    "use strict";
    module2.exports = function flag(obj, key, value) {
      var flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
      if (arguments.length === 3) {
        flags[key] = value;
      } else {
        return flags[key];
      }
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/test.js
var require_test = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/test.js"(exports2, module2) {
    "use strict";
    var flag = require_flag();
    module2.exports = function test3(obj, args) {
      var negate = flag(obj, "negate"), expr = args[0];
      return negate ? !expr : expr;
    };
  }
});

// ../../node_modules/.pnpm/type-detect@4.0.8/node_modules/type-detect/type-detect.js
var require_type_detect = __commonJS({
  "../../node_modules/.pnpm/type-detect@4.0.8/node_modules/type-detect/type-detect.js"(exports2, module2) {
    "use strict";
    (function(global3, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global3.typeDetect = factory();
    })(exports2, function() {
      "use strict";
      var promiseExists = typeof Promise === "function";
      var globalObject2 = typeof self === "object" ? self : global;
      var symbolExists = typeof Symbol !== "undefined";
      var mapExists = typeof Map !== "undefined";
      var setExists = typeof Set !== "undefined";
      var weakMapExists = typeof WeakMap !== "undefined";
      var weakSetExists = typeof WeakSet !== "undefined";
      var dataViewExists = typeof DataView !== "undefined";
      var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== "undefined";
      var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== "undefined";
      var setEntriesExists = setExists && typeof Set.prototype.entries === "function";
      var mapEntriesExists = mapExists && typeof Map.prototype.entries === "function";
      var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Set()).entries());
      var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Map()).entries());
      var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === "function";
      var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
      var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === "function";
      var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(""[Symbol.iterator]());
      var toStringLeftSliceLength = 8;
      var toStringRightSliceLength = -1;
      function typeDetect2(obj) {
        var typeofObj = typeof obj;
        if (typeofObj !== "object") {
          return typeofObj;
        }
        if (obj === null) {
          return "null";
        }
        if (obj === globalObject2) {
          return "global";
        }
        if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
          return "Array";
        }
        if (typeof window === "object" && window !== null) {
          if (typeof window.location === "object" && obj === window.location) {
            return "Location";
          }
          if (typeof window.document === "object" && obj === window.document) {
            return "Document";
          }
          if (typeof window.navigator === "object") {
            if (typeof window.navigator.mimeTypes === "object" && obj === window.navigator.mimeTypes) {
              return "MimeTypeArray";
            }
            if (typeof window.navigator.plugins === "object" && obj === window.navigator.plugins) {
              return "PluginArray";
            }
          }
          if ((typeof window.HTMLElement === "function" || typeof window.HTMLElement === "object") && obj instanceof window.HTMLElement) {
            if (obj.tagName === "BLOCKQUOTE") {
              return "HTMLQuoteElement";
            }
            if (obj.tagName === "TD") {
              return "HTMLTableDataCellElement";
            }
            if (obj.tagName === "TH") {
              return "HTMLTableHeaderCellElement";
            }
          }
        }
        var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
        if (typeof stringTag === "string") {
          return stringTag;
        }
        var objPrototype = Object.getPrototypeOf(obj);
        if (objPrototype === RegExp.prototype) {
          return "RegExp";
        }
        if (objPrototype === Date.prototype) {
          return "Date";
        }
        if (promiseExists && objPrototype === Promise.prototype) {
          return "Promise";
        }
        if (setExists && objPrototype === Set.prototype) {
          return "Set";
        }
        if (mapExists && objPrototype === Map.prototype) {
          return "Map";
        }
        if (weakSetExists && objPrototype === WeakSet.prototype) {
          return "WeakSet";
        }
        if (weakMapExists && objPrototype === WeakMap.prototype) {
          return "WeakMap";
        }
        if (dataViewExists && objPrototype === DataView.prototype) {
          return "DataView";
        }
        if (mapExists && objPrototype === mapIteratorPrototype) {
          return "Map Iterator";
        }
        if (setExists && objPrototype === setIteratorPrototype) {
          return "Set Iterator";
        }
        if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
          return "Array Iterator";
        }
        if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
          return "String Iterator";
        }
        if (objPrototype === null) {
          return "Object";
        }
        return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
      }
      return typeDetect2;
    });
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/expectTypes.js
var require_expectTypes = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/expectTypes.js"(exports2, module2) {
    "use strict";
    var AssertionError2 = require_assertion_error();
    var flag = require_flag();
    var type2 = require_type_detect();
    module2.exports = function expectTypes(obj, types) {
      var flagMsg = flag(obj, "message");
      var ssfi = flag(obj, "ssfi");
      flagMsg = flagMsg ? flagMsg + ": " : "";
      obj = flag(obj, "object");
      types = types.map(function(t) {
        return t.toLowerCase();
      });
      types.sort();
      var str = types.map(function(t, index2) {
        var art = ~["a", "e", "i", "o", "u"].indexOf(t.charAt(0)) ? "an" : "a";
        var or = types.length > 1 && index2 === types.length - 1 ? "or " : "";
        return or + art + " " + t;
      }).join(", ");
      var objType = type2(obj).toLowerCase();
      if (!types.some(function(expected) {
        return objType === expected;
      })) {
        throw new AssertionError2(
          flagMsg + "object tested must be " + str + ", but " + objType + " given",
          void 0,
          ssfi
        );
      }
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getActual.js
var require_getActual = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getActual.js"(exports2, module2) {
    "use strict";
    module2.exports = function getActual(obj, args) {
      return args.length > 4 ? args[4] : obj._obj;
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/config.js
var require_config = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/config.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      /**
       * ### config.includeStack
       *
       * User configurable property, influences whether stack trace
       * is included in Assertion error message. Default of false
       * suppresses stack trace in the error message.
       *
       *     chai.config.includeStack = true;  // enable stack on error
       *
       * @param {Boolean}
       * @api public
       */
      includeStack: false,
      /**
       * ### config.showDiff
       *
       * User configurable property, influences whether or not
       * the `showDiff` flag should be included in the thrown
       * AssertionErrors. `false` will always be `false`; `true`
       * will be true when the assertion has requested a diff
       * be shown.
       *
       * @param {Boolean}
       * @api public
       */
      showDiff: true,
      /**
       * ### config.truncateThreshold
       *
       * User configurable property, sets length threshold for actual and
       * expected values in assertion errors. If this threshold is exceeded, for
       * example for large data structures, the value is replaced with something
       * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
       *
       * Set it to zero if you want to disable truncating altogether.
       *
       * This is especially userful when doing assertions on arrays: having this
       * set to a reasonable large value makes the failure messages readily
       * inspectable.
       *
       *     chai.config.truncateThreshold = 0;  // disable truncating
       *
       * @param {Number}
       * @api public
       */
      truncateThreshold: 40,
      /**
       * ### config.useProxy
       *
       * User configurable property, defines if chai will use a Proxy to throw
       * an error when a non-existent property is read, which protects users
       * from typos when using property-based assertions.
       *
       * Set it to false if you want to disable this feature.
       *
       *     chai.config.useProxy = false;  // disable use of Proxy
       *
       * This feature is automatically disabled regardless of this config value
       * in environments that don't support proxies.
       *
       * @param {Boolean}
       * @api public
       */
      useProxy: true,
      /**
       * ### config.proxyExcludedKeys
       *
       * User configurable property, defines which properties should be ignored
       * instead of throwing an error if they do not exist on the assertion.
       * This is only applied if the environment Chai is running in supports proxies and
       * if the `useProxy` configuration setting is enabled.
       * By default, `then` and `inspect` will not throw an error if they do not exist on the
       * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
       * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
       *
       *     // By default these keys will not throw an error if they do not exist on the assertion object
       *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
       *
       * @param {Array}
       * @api public
       */
      proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"]
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/inspect.js
var require_inspect = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/inspect.js"(exports2, module2) {
    "use strict";
    var getName = require_get_func_name();
    var loupe = (init_loupe(), __toCommonJS(loupe_exports));
    var config2 = require_config();
    module2.exports = inspect3;
    function inspect3(obj, showHidden, depth, colors) {
      var options = {
        colors,
        depth: typeof depth === "undefined" ? 2 : depth,
        showHidden,
        truncate: config2.truncateThreshold ? config2.truncateThreshold : Infinity
      };
      return loupe.inspect(obj, options);
    }
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/objDisplay.js
var require_objDisplay = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/objDisplay.js"(exports2, module2) {
    "use strict";
    var inspect3 = require_inspect();
    var config2 = require_config();
    module2.exports = function objDisplay2(obj) {
      var str = inspect3(obj), type2 = Object.prototype.toString.call(obj);
      if (config2.truncateThreshold && str.length >= config2.truncateThreshold) {
        if (type2 === "[object Function]") {
          return !obj.name || obj.name === "" ? "[Function]" : "[Function: " + obj.name + "]";
        } else if (type2 === "[object Array]") {
          return "[ Array(" + obj.length + ") ]";
        } else if (type2 === "[object Object]") {
          var keys2 = Object.keys(obj), kstr = keys2.length > 2 ? keys2.splice(0, 2).join(", ") + ", ..." : keys2.join(", ");
          return "{ Object (" + kstr + ") }";
        } else {
          return str;
        }
      } else {
        return str;
      }
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getMessage.js
var require_getMessage = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getMessage.js"(exports2, module2) {
    "use strict";
    var flag = require_flag();
    var getActual = require_getActual();
    var objDisplay2 = require_objDisplay();
    module2.exports = function getMessage(obj, args) {
      var negate = flag(obj, "negate"), val = flag(obj, "object"), expected = args[3], actual = getActual(obj, args), msg = negate ? args[2] : args[1], flagMsg = flag(obj, "message");
      if (typeof msg === "function")
        msg = msg();
      msg = msg || "";
      msg = msg.replace(/#\{this\}/g, function() {
        return objDisplay2(val);
      }).replace(/#\{act\}/g, function() {
        return objDisplay2(actual);
      }).replace(/#\{exp\}/g, function() {
        return objDisplay2(expected);
      });
      return flagMsg ? flagMsg + ": " + msg : msg;
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/transferFlags.js
var require_transferFlags = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/transferFlags.js"(exports2, module2) {
    "use strict";
    module2.exports = function transferFlags(assertion, object3, includeAll) {
      var flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
      if (!object3.__flags) {
        object3.__flags = /* @__PURE__ */ Object.create(null);
      }
      includeAll = arguments.length === 3 ? includeAll : true;
      for (var flag in flags) {
        if (includeAll || flag !== "object" && flag !== "ssfi" && flag !== "lockSsfi" && flag != "message") {
          object3.__flags[flag] = flags[flag];
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/deep-eql@4.1.3/node_modules/deep-eql/index.js
var require_deep_eql = __commonJS({
  "../../node_modules/.pnpm/deep-eql@4.1.3/node_modules/deep-eql/index.js"(exports2, module2) {
    "use strict";
    var type2 = require_type_detect();
    function FakeMap2() {
      this._key = "chai/deep-eql__" + Math.random() + Date.now();
    }
    FakeMap2.prototype = {
      get: function get2(key) {
        return key[this._key];
      },
      set: function set3(key, value) {
        if (Object.isExtensible(key)) {
          Object.defineProperty(key, this._key, {
            value,
            configurable: true
          });
        }
      }
    };
    var MemoizeMap = typeof WeakMap === "function" ? WeakMap : FakeMap2;
    function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
      if (!memoizeMap || isPrimitive3(leftHandOperand) || isPrimitive3(rightHandOperand)) {
        return null;
      }
      var leftHandMap = memoizeMap.get(leftHandOperand);
      if (leftHandMap) {
        var result = leftHandMap.get(rightHandOperand);
        if (typeof result === "boolean") {
          return result;
        }
      }
      return null;
    }
    function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
      if (!memoizeMap || isPrimitive3(leftHandOperand) || isPrimitive3(rightHandOperand)) {
        return;
      }
      var leftHandMap = memoizeMap.get(leftHandOperand);
      if (leftHandMap) {
        leftHandMap.set(rightHandOperand, result);
      } else {
        leftHandMap = new MemoizeMap();
        leftHandMap.set(rightHandOperand, result);
        memoizeMap.set(leftHandOperand, leftHandMap);
      }
    }
    module2.exports = deepEqual;
    module2.exports.MemoizeMap = MemoizeMap;
    function deepEqual(leftHandOperand, rightHandOperand, options) {
      if (options && options.comparator) {
        return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
      }
      var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
      if (simpleResult !== null) {
        return simpleResult;
      }
      return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
    }
    function simpleEqual(leftHandOperand, rightHandOperand) {
      if (leftHandOperand === rightHandOperand) {
        return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
      }
      if (leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
      rightHandOperand !== rightHandOperand) {
        return true;
      }
      if (isPrimitive3(leftHandOperand) || isPrimitive3(rightHandOperand)) {
        return false;
      }
      return null;
    }
    function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
      options = options || {};
      options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
      var comparator2 = options && options.comparator;
      var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
      if (memoizeResultLeft !== null) {
        return memoizeResultLeft;
      }
      var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
      if (memoizeResultRight !== null) {
        return memoizeResultRight;
      }
      if (comparator2) {
        var comparatorResult = comparator2(leftHandOperand, rightHandOperand);
        if (comparatorResult === false || comparatorResult === true) {
          memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
          return comparatorResult;
        }
        var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
        if (simpleResult !== null) {
          return simpleResult;
        }
      }
      var leftHandType = type2(leftHandOperand);
      if (leftHandType !== type2(rightHandOperand)) {
        memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
        return false;
      }
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
      var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
      return result;
    }
    function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
      switch (leftHandType) {
        case "String":
        case "Number":
        case "Boolean":
        case "Date":
          return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
        case "Promise":
        case "Symbol":
        case "function":
        case "WeakMap":
        case "WeakSet":
          return leftHandOperand === rightHandOperand;
        case "Error":
          return keysEqual(leftHandOperand, rightHandOperand, ["name", "message", "code"], options);
        case "Arguments":
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "Array":
          return iterableEqual(leftHandOperand, rightHandOperand, options);
        case "RegExp":
          return regexpEqual(leftHandOperand, rightHandOperand);
        case "Generator":
          return generatorEqual(leftHandOperand, rightHandOperand, options);
        case "DataView":
          return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
        case "ArrayBuffer":
          return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
        case "Set":
          return entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Map":
          return entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.Instant":
        case "Temporal.ZonedDateTime":
        case "Temporal.PlainYearMonth":
        case "Temporal.PlainMonthDay":
          return leftHandOperand.equals(rightHandOperand);
        case "Temporal.Duration":
          return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
        case "Temporal.TimeZone":
        case "Temporal.Calendar":
          return leftHandOperand.toString() === rightHandOperand.toString();
        default:
          return objectEqual(leftHandOperand, rightHandOperand, options);
      }
    }
    function regexpEqual(leftHandOperand, rightHandOperand) {
      return leftHandOperand.toString() === rightHandOperand.toString();
    }
    function entriesEqual(leftHandOperand, rightHandOperand, options) {
      if (leftHandOperand.size !== rightHandOperand.size) {
        return false;
      }
      if (leftHandOperand.size === 0) {
        return true;
      }
      var leftHandItems = [];
      var rightHandItems = [];
      leftHandOperand.forEach(function gatherEntries(key, value) {
        leftHandItems.push([key, value]);
      });
      rightHandOperand.forEach(function gatherEntries(key, value) {
        rightHandItems.push([key, value]);
      });
      return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
    }
    function iterableEqual(leftHandOperand, rightHandOperand, options) {
      var length = leftHandOperand.length;
      if (length !== rightHandOperand.length) {
        return false;
      }
      if (length === 0) {
        return true;
      }
      var index2 = -1;
      while (++index2 < length) {
        if (deepEqual(leftHandOperand[index2], rightHandOperand[index2], options) === false) {
          return false;
        }
      }
      return true;
    }
    function generatorEqual(leftHandOperand, rightHandOperand, options) {
      return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
    }
    function hasIteratorFunction(target) {
      return typeof Symbol !== "undefined" && typeof target === "object" && typeof Symbol.iterator !== "undefined" && typeof target[Symbol.iterator] === "function";
    }
    function getIteratorEntries(target) {
      if (hasIteratorFunction(target)) {
        try {
          return getGeneratorEntries(target[Symbol.iterator]());
        } catch (iteratorError) {
          return [];
        }
      }
      return [];
    }
    function getGeneratorEntries(generator) {
      var generatorResult = generator.next();
      var accumulator = [generatorResult.value];
      while (generatorResult.done === false) {
        generatorResult = generator.next();
        accumulator.push(generatorResult.value);
      }
      return accumulator;
    }
    function getEnumerableKeys(target) {
      var keys2 = [];
      for (var key in target) {
        keys2.push(key);
      }
      return keys2;
    }
    function getEnumerableSymbols(target) {
      var keys2 = [];
      var allKeys = Object.getOwnPropertySymbols(target);
      for (var i = 0; i < allKeys.length; i += 1) {
        var key = allKeys[i];
        if (Object.getOwnPropertyDescriptor(target, key).enumerable) {
          keys2.push(key);
        }
      }
      return keys2;
    }
    function keysEqual(leftHandOperand, rightHandOperand, keys2, options) {
      var length = keys2.length;
      if (length === 0) {
        return true;
      }
      for (var i = 0; i < length; i += 1) {
        if (deepEqual(leftHandOperand[keys2[i]], rightHandOperand[keys2[i]], options) === false) {
          return false;
        }
      }
      return true;
    }
    function objectEqual(leftHandOperand, rightHandOperand, options) {
      var leftHandKeys = getEnumerableKeys(leftHandOperand);
      var rightHandKeys = getEnumerableKeys(rightHandOperand);
      var leftHandSymbols = getEnumerableSymbols(leftHandOperand);
      var rightHandSymbols = getEnumerableSymbols(rightHandOperand);
      leftHandKeys = leftHandKeys.concat(leftHandSymbols);
      rightHandKeys = rightHandKeys.concat(rightHandSymbols);
      if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
        if (iterableEqual(mapSymbols(leftHandKeys).sort(), mapSymbols(rightHandKeys).sort()) === false) {
          return false;
        }
        return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
      }
      var leftHandEntries = getIteratorEntries(leftHandOperand);
      var rightHandEntries = getIteratorEntries(rightHandOperand);
      if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
        leftHandEntries.sort();
        rightHandEntries.sort();
        return iterableEqual(leftHandEntries, rightHandEntries, options);
      }
      if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
        return true;
      }
      return false;
    }
    function isPrimitive3(value) {
      return value === null || typeof value !== "object";
    }
    function mapSymbols(arr) {
      return arr.map(function mapSymbol(entry) {
        if (typeof entry === "symbol") {
          return entry.toString();
        }
        return entry;
      });
    }
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/isProxyEnabled.js
var require_isProxyEnabled = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/isProxyEnabled.js"(exports2, module2) {
    "use strict";
    var config2 = require_config();
    module2.exports = function isProxyEnabled() {
      return config2.useProxy && typeof Proxy !== "undefined" && typeof Reflect !== "undefined";
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addProperty.js
var require_addProperty = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addProperty.js"(exports2, module2) {
    "use strict";
    var chai3 = require_chai();
    var flag = require_flag();
    var isProxyEnabled = require_isProxyEnabled();
    var transferFlags = require_transferFlags();
    module2.exports = function addProperty(ctx, name, getter) {
      getter = getter === void 0 ? function() {
      } : getter;
      Object.defineProperty(
        ctx,
        name,
        {
          get: function propertyGetter() {
            if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
              flag(this, "ssfi", propertyGetter);
            }
            var result = getter.call(this);
            if (result !== void 0)
              return result;
            var newAssertion = new chai3.Assertion();
            transferFlags(this, newAssertion);
            return newAssertion;
          },
          configurable: true
        }
      );
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addLengthGuard.js
var require_addLengthGuard = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addLengthGuard.js"(exports2, module2) {
    "use strict";
    var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {
    }, "length");
    module2.exports = function addLengthGuard(fn2, assertionName, isChainable) {
      if (!fnLengthDesc.configurable)
        return fn2;
      Object.defineProperty(fn2, "length", {
        get: function() {
          if (isChainable) {
            throw Error("Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
          }
          throw Error("Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".');
        }
      });
      return fn2;
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getProperties.js
var require_getProperties = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getProperties.js"(exports2, module2) {
    "use strict";
    module2.exports = function getProperties(object3) {
      var result = Object.getOwnPropertyNames(object3);
      function addProperty(property) {
        if (result.indexOf(property) === -1) {
          result.push(property);
        }
      }
      var proto = Object.getPrototypeOf(object3);
      while (proto !== null) {
        Object.getOwnPropertyNames(proto).forEach(addProperty);
        proto = Object.getPrototypeOf(proto);
      }
      return result;
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/proxify.js
var require_proxify = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/proxify.js"(exports2, module2) {
    "use strict";
    var config2 = require_config();
    var flag = require_flag();
    var getProperties = require_getProperties();
    var isProxyEnabled = require_isProxyEnabled();
    var builtins = ["__flags", "__methods", "_obj", "assert"];
    module2.exports = function proxify(obj, nonChainableMethodName) {
      if (!isProxyEnabled())
        return obj;
      return new Proxy(obj, {
        get: function proxyGetter(target, property) {
          if (typeof property === "string" && config2.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
            if (nonChainableMethodName) {
              throw Error("Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
            }
            var suggestion = null;
            var suggestionDistance = 4;
            getProperties(target).forEach(function(prop) {
              if (!Object.prototype.hasOwnProperty(prop) && builtins.indexOf(prop) === -1) {
                var dist2 = stringDistanceCapped(
                  property,
                  prop,
                  suggestionDistance
                );
                if (dist2 < suggestionDistance) {
                  suggestion = prop;
                  suggestionDistance = dist2;
                }
              }
            });
            if (suggestion !== null) {
              throw Error("Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?');
            } else {
              throw Error("Invalid Chai property: " + property);
            }
          }
          if (builtins.indexOf(property) === -1 && !flag(target, "lockSsfi")) {
            flag(target, "ssfi", proxyGetter);
          }
          return Reflect.get(target, property);
        }
      });
    };
    function stringDistanceCapped(strA, strB, cap) {
      if (Math.abs(strA.length - strB.length) >= cap) {
        return cap;
      }
      var memo = [];
      for (var i = 0; i <= strA.length; i++) {
        memo[i] = Array(strB.length + 1).fill(0);
        memo[i][0] = i;
      }
      for (var j = 0; j < strB.length; j++) {
        memo[0][j] = j;
      }
      for (var i = 1; i <= strA.length; i++) {
        var ch = strA.charCodeAt(i - 1);
        for (var j = 1; j <= strB.length; j++) {
          if (Math.abs(i - j) >= cap) {
            memo[i][j] = cap;
            continue;
          }
          memo[i][j] = Math.min(
            memo[i - 1][j] + 1,
            memo[i][j - 1] + 1,
            memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1)
          );
        }
      }
      return memo[strA.length][strB.length];
    }
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addMethod.js
var require_addMethod = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addMethod.js"(exports2, module2) {
    "use strict";
    var addLengthGuard = require_addLengthGuard();
    var chai3 = require_chai();
    var flag = require_flag();
    var proxify = require_proxify();
    var transferFlags = require_transferFlags();
    module2.exports = function addMethod(ctx, name, method) {
      var methodWrapper = function() {
        if (!flag(this, "lockSsfi")) {
          flag(this, "ssfi", methodWrapper);
        }
        var result = method.apply(this, arguments);
        if (result !== void 0)
          return result;
        var newAssertion = new chai3.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      };
      addLengthGuard(methodWrapper, name, false);
      ctx[name] = proxify(methodWrapper, name);
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/overwriteProperty.js
var require_overwriteProperty = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/overwriteProperty.js"(exports2, module2) {
    "use strict";
    var chai3 = require_chai();
    var flag = require_flag();
    var isProxyEnabled = require_isProxyEnabled();
    var transferFlags = require_transferFlags();
    module2.exports = function overwriteProperty(ctx, name, getter) {
      var _get = Object.getOwnPropertyDescriptor(ctx, name), _super = function() {
      };
      if (_get && "function" === typeof _get.get)
        _super = _get.get;
      Object.defineProperty(
        ctx,
        name,
        {
          get: function overwritingPropertyGetter() {
            if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
              flag(this, "ssfi", overwritingPropertyGetter);
            }
            var origLockSsfi = flag(this, "lockSsfi");
            flag(this, "lockSsfi", true);
            var result = getter(_super).call(this);
            flag(this, "lockSsfi", origLockSsfi);
            if (result !== void 0) {
              return result;
            }
            var newAssertion = new chai3.Assertion();
            transferFlags(this, newAssertion);
            return newAssertion;
          },
          configurable: true
        }
      );
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/overwriteMethod.js
var require_overwriteMethod = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/overwriteMethod.js"(exports2, module2) {
    "use strict";
    var addLengthGuard = require_addLengthGuard();
    var chai3 = require_chai();
    var flag = require_flag();
    var proxify = require_proxify();
    var transferFlags = require_transferFlags();
    module2.exports = function overwriteMethod(ctx, name, method) {
      var _method = ctx[name], _super = function() {
        throw new Error(name + " is not a function");
      };
      if (_method && "function" === typeof _method)
        _super = _method;
      var overwritingMethodWrapper = function() {
        if (!flag(this, "lockSsfi")) {
          flag(this, "ssfi", overwritingMethodWrapper);
        }
        var origLockSsfi = flag(this, "lockSsfi");
        flag(this, "lockSsfi", true);
        var result = method(_super).apply(this, arguments);
        flag(this, "lockSsfi", origLockSsfi);
        if (result !== void 0) {
          return result;
        }
        var newAssertion = new chai3.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      };
      addLengthGuard(overwritingMethodWrapper, name, false);
      ctx[name] = proxify(overwritingMethodWrapper, name);
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addChainableMethod.js
var require_addChainableMethod = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/addChainableMethod.js"(exports2, module2) {
    "use strict";
    var addLengthGuard = require_addLengthGuard();
    var chai3 = require_chai();
    var flag = require_flag();
    var proxify = require_proxify();
    var transferFlags = require_transferFlags();
    var canSetPrototype = typeof Object.setPrototypeOf === "function";
    var testFn = function() {
    };
    var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
      var propDesc = Object.getOwnPropertyDescriptor(testFn, name);
      if (typeof propDesc !== "object")
        return true;
      return !propDesc.configurable;
    });
    var call2 = Function.prototype.call;
    var apply = Function.prototype.apply;
    module2.exports = function addChainableMethod(ctx, name, method, chainingBehavior) {
      if (typeof chainingBehavior !== "function") {
        chainingBehavior = function() {
        };
      }
      var chainableBehavior = {
        method,
        chainingBehavior
      };
      if (!ctx.__methods) {
        ctx.__methods = {};
      }
      ctx.__methods[name] = chainableBehavior;
      Object.defineProperty(
        ctx,
        name,
        {
          get: function chainableMethodGetter() {
            chainableBehavior.chainingBehavior.call(this);
            var chainableMethodWrapper = function() {
              if (!flag(this, "lockSsfi")) {
                flag(this, "ssfi", chainableMethodWrapper);
              }
              var result = chainableBehavior.method.apply(this, arguments);
              if (result !== void 0) {
                return result;
              }
              var newAssertion = new chai3.Assertion();
              transferFlags(this, newAssertion);
              return newAssertion;
            };
            addLengthGuard(chainableMethodWrapper, name, true);
            if (canSetPrototype) {
              var prototype = Object.create(this);
              prototype.call = call2;
              prototype.apply = apply;
              Object.setPrototypeOf(chainableMethodWrapper, prototype);
            } else {
              var asserterNames = Object.getOwnPropertyNames(ctx);
              asserterNames.forEach(function(asserterName) {
                if (excludeNames.indexOf(asserterName) !== -1) {
                  return;
                }
                var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
                Object.defineProperty(chainableMethodWrapper, asserterName, pd);
              });
            }
            transferFlags(this, chainableMethodWrapper);
            return proxify(chainableMethodWrapper);
          },
          configurable: true
        }
      );
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/overwriteChainableMethod.js
var require_overwriteChainableMethod = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/overwriteChainableMethod.js"(exports2, module2) {
    "use strict";
    var chai3 = require_chai();
    var transferFlags = require_transferFlags();
    module2.exports = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
      var chainableBehavior = ctx.__methods[name];
      var _chainingBehavior = chainableBehavior.chainingBehavior;
      chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
        var result = chainingBehavior(_chainingBehavior).call(this);
        if (result !== void 0) {
          return result;
        }
        var newAssertion = new chai3.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      };
      var _method = chainableBehavior.method;
      chainableBehavior.method = function overwritingChainableMethodWrapper() {
        var result = method(_method).apply(this, arguments);
        if (result !== void 0) {
          return result;
        }
        var newAssertion = new chai3.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      };
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/compareByInspect.js
var require_compareByInspect = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/compareByInspect.js"(exports2, module2) {
    "use strict";
    var inspect3 = require_inspect();
    module2.exports = function compareByInspect(a, b2) {
      return inspect3(a) < inspect3(b2) ? -1 : 1;
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js
var require_getOwnEnumerablePropertySymbols = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js"(exports2, module2) {
    "use strict";
    module2.exports = function getOwnEnumerablePropertySymbols(obj) {
      if (typeof Object.getOwnPropertySymbols !== "function")
        return [];
      return Object.getOwnPropertySymbols(obj).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
      });
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js
var require_getOwnEnumerableProperties = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js"(exports2, module2) {
    "use strict";
    var getOwnEnumerablePropertySymbols = require_getOwnEnumerablePropertySymbols();
    module2.exports = function getOwnEnumerableProperties(obj) {
      return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
    };
  }
});

// ../../node_modules/.pnpm/check-error@1.0.3/node_modules/check-error/index.js
var require_check_error = __commonJS({
  "../../node_modules/.pnpm/check-error@1.0.3/node_modules/check-error/index.js"(exports2, module2) {
    "use strict";
    var getFunctionName2 = require_get_func_name();
    function compatibleInstance(thrown, errorLike) {
      return errorLike instanceof Error && thrown === errorLike;
    }
    function compatibleConstructor(thrown, errorLike) {
      if (errorLike instanceof Error) {
        return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
      } else if (errorLike.prototype instanceof Error || errorLike === Error) {
        return thrown.constructor === errorLike || thrown instanceof errorLike;
      }
      return false;
    }
    function compatibleMessage(thrown, errMatcher) {
      var comparisonString = typeof thrown === "string" ? thrown : thrown.message;
      if (errMatcher instanceof RegExp) {
        return errMatcher.test(comparisonString);
      } else if (typeof errMatcher === "string") {
        return comparisonString.indexOf(errMatcher) !== -1;
      }
      return false;
    }
    function getConstructorName(errorLike) {
      var constructorName = errorLike;
      if (errorLike instanceof Error) {
        constructorName = getFunctionName2(errorLike.constructor);
      } else if (typeof errorLike === "function") {
        constructorName = getFunctionName2(errorLike);
        if (constructorName === "") {
          var newConstructorName = getFunctionName2(new errorLike());
          constructorName = newConstructorName || constructorName;
        }
      }
      return constructorName;
    }
    function getMessage(errorLike) {
      var msg = "";
      if (errorLike && errorLike.message) {
        msg = errorLike.message;
      } else if (typeof errorLike === "string") {
        msg = errorLike;
      }
      return msg;
    }
    module2.exports = {
      compatibleInstance,
      compatibleConstructor,
      compatibleMessage,
      getMessage,
      getConstructorName
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/isNaN.js
var require_isNaN = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/isNaN.js"(exports2, module2) {
    "use strict";
    function isNaN3(value) {
      return value !== value;
    }
    module2.exports = Number.isNaN || isNaN3;
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getOperator.js
var require_getOperator = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/getOperator.js"(exports2, module2) {
    "use strict";
    var type2 = require_type_detect();
    var flag = require_flag();
    function isObjectType(obj) {
      var objectType = type2(obj);
      var objectTypes = ["Array", "Object", "function"];
      return objectTypes.indexOf(objectType) !== -1;
    }
    module2.exports = function getOperator(obj, args) {
      var operator = flag(obj, "operator");
      var negate = flag(obj, "negate");
      var expected = args[3];
      var msg = negate ? args[2] : args[1];
      if (operator) {
        return operator;
      }
      if (typeof msg === "function")
        msg = msg();
      msg = msg || "";
      if (!msg) {
        return void 0;
      }
      if (/\shave\s/.test(msg)) {
        return void 0;
      }
      var isObject4 = isObjectType(expected);
      if (/\snot\s/.test(msg)) {
        return isObject4 ? "notDeepStrictEqual" : "notStrictEqual";
      }
      return isObject4 ? "deepStrictEqual" : "strictEqual";
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/index.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/utils/index.js"(exports2) {
    "use strict";
    var pathval = require_pathval();
    exports2.test = require_test();
    exports2.type = require_type_detect();
    exports2.expectTypes = require_expectTypes();
    exports2.getMessage = require_getMessage();
    exports2.getActual = require_getActual();
    exports2.inspect = require_inspect();
    exports2.objDisplay = require_objDisplay();
    exports2.flag = require_flag();
    exports2.transferFlags = require_transferFlags();
    exports2.eql = require_deep_eql();
    exports2.getPathInfo = pathval.getPathInfo;
    exports2.hasProperty = pathval.hasProperty;
    exports2.getName = require_get_func_name();
    exports2.addProperty = require_addProperty();
    exports2.addMethod = require_addMethod();
    exports2.overwriteProperty = require_overwriteProperty();
    exports2.overwriteMethod = require_overwriteMethod();
    exports2.addChainableMethod = require_addChainableMethod();
    exports2.overwriteChainableMethod = require_overwriteChainableMethod();
    exports2.compareByInspect = require_compareByInspect();
    exports2.getOwnEnumerablePropertySymbols = require_getOwnEnumerablePropertySymbols();
    exports2.getOwnEnumerableProperties = require_getOwnEnumerableProperties();
    exports2.checkError = require_check_error();
    exports2.proxify = require_proxify();
    exports2.addLengthGuard = require_addLengthGuard();
    exports2.isProxyEnabled = require_isProxyEnabled();
    exports2.isNaN = require_isNaN();
    exports2.getOperator = require_getOperator();
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/assertion.js
var require_assertion = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/assertion.js"(exports2, module2) {
    "use strict";
    var config2 = require_config();
    module2.exports = function(_chai, util2) {
      var AssertionError2 = _chai.AssertionError, flag = util2.flag;
      _chai.Assertion = Assertion2;
      function Assertion2(obj, msg, ssfi, lockSsfi) {
        flag(this, "ssfi", ssfi || Assertion2);
        flag(this, "lockSsfi", lockSsfi);
        flag(this, "object", obj);
        flag(this, "message", msg);
        return util2.proxify(this);
      }
      Object.defineProperty(Assertion2, "includeStack", {
        get: function() {
          console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
          return config2.includeStack;
        },
        set: function(value) {
          console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
          config2.includeStack = value;
        }
      });
      Object.defineProperty(Assertion2, "showDiff", {
        get: function() {
          console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
          return config2.showDiff;
        },
        set: function(value) {
          console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
          config2.showDiff = value;
        }
      });
      Assertion2.addProperty = function(name, fn2) {
        util2.addProperty(this.prototype, name, fn2);
      };
      Assertion2.addMethod = function(name, fn2) {
        util2.addMethod(this.prototype, name, fn2);
      };
      Assertion2.addChainableMethod = function(name, fn2, chainingBehavior) {
        util2.addChainableMethod(this.prototype, name, fn2, chainingBehavior);
      };
      Assertion2.overwriteProperty = function(name, fn2) {
        util2.overwriteProperty(this.prototype, name, fn2);
      };
      Assertion2.overwriteMethod = function(name, fn2) {
        util2.overwriteMethod(this.prototype, name, fn2);
      };
      Assertion2.overwriteChainableMethod = function(name, fn2, chainingBehavior) {
        util2.overwriteChainableMethod(this.prototype, name, fn2, chainingBehavior);
      };
      Assertion2.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
        var ok = util2.test(this, arguments);
        if (false !== showDiff)
          showDiff = true;
        if (void 0 === expected && void 0 === _actual)
          showDiff = false;
        if (true !== config2.showDiff)
          showDiff = false;
        if (!ok) {
          msg = util2.getMessage(this, arguments);
          var actual = util2.getActual(this, arguments);
          var assertionErrorObjectProperties = {
            actual,
            expected,
            showDiff
          };
          var operator = util2.getOperator(this, arguments);
          if (operator) {
            assertionErrorObjectProperties.operator = operator;
          }
          throw new AssertionError2(
            msg,
            assertionErrorObjectProperties,
            config2.includeStack ? this.assert : flag(this, "ssfi")
          );
        }
      };
      Object.defineProperty(
        Assertion2.prototype,
        "_obj",
        {
          get: function() {
            return flag(this, "object");
          },
          set: function(val) {
            flag(this, "object", val);
          }
        }
      );
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/core/assertions.js
var require_assertions = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/core/assertions.js"(exports2, module2) {
    "use strict";
    module2.exports = function(chai3, _) {
      var Assertion2 = chai3.Assertion, AssertionError2 = chai3.AssertionError, flag = _.flag;
      [
        "to",
        "be",
        "been",
        "is",
        "and",
        "has",
        "have",
        "with",
        "that",
        "which",
        "at",
        "of",
        "same",
        "but",
        "does",
        "still",
        "also"
      ].forEach(function(chain) {
        Assertion2.addProperty(chain);
      });
      Assertion2.addProperty("not", function() {
        flag(this, "negate", true);
      });
      Assertion2.addProperty("deep", function() {
        flag(this, "deep", true);
      });
      Assertion2.addProperty("nested", function() {
        flag(this, "nested", true);
      });
      Assertion2.addProperty("own", function() {
        flag(this, "own", true);
      });
      Assertion2.addProperty("ordered", function() {
        flag(this, "ordered", true);
      });
      Assertion2.addProperty("any", function() {
        flag(this, "any", true);
        flag(this, "all", false);
      });
      Assertion2.addProperty("all", function() {
        flag(this, "all", true);
        flag(this, "any", false);
      });
      function an(type2, msg) {
        if (msg)
          flag(this, "message", msg);
        type2 = type2.toLowerCase();
        var obj = flag(this, "object"), article = ~["a", "e", "i", "o", "u"].indexOf(type2.charAt(0)) ? "an " : "a ";
        this.assert(
          type2 === _.type(obj).toLowerCase(),
          "expected #{this} to be " + article + type2,
          "expected #{this} not to be " + article + type2
        );
      }
      Assertion2.addChainableMethod("an", an);
      Assertion2.addChainableMethod("a", an);
      function SameValueZero(a, b2) {
        return _.isNaN(a) && _.isNaN(b2) || a === b2;
      }
      function includeChainingBehavior() {
        flag(this, "contains", true);
      }
      function include(val, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag(this, "message"), negate = flag(this, "negate"), ssfi = flag(this, "ssfi"), isDeep = flag(this, "deep"), descriptor = isDeep ? "deep " : "";
        flagMsg = flagMsg ? flagMsg + ": " : "";
        var included = false;
        switch (objType) {
          case "string":
            included = obj.indexOf(val) !== -1;
            break;
          case "weakset":
            if (isDeep) {
              throw new AssertionError2(
                flagMsg + "unable to use .deep.include with WeakSet",
                void 0,
                ssfi
              );
            }
            included = obj.has(val);
            break;
          case "map":
            var isEql = isDeep ? _.eql : SameValueZero;
            obj.forEach(function(item) {
              included = included || isEql(item, val);
            });
            break;
          case "set":
            if (isDeep) {
              obj.forEach(function(item) {
                included = included || _.eql(item, val);
              });
            } else {
              included = obj.has(val);
            }
            break;
          case "array":
            if (isDeep) {
              included = obj.some(function(item) {
                return _.eql(item, val);
              });
            } else {
              included = obj.indexOf(val) !== -1;
            }
            break;
          default:
            if (val !== Object(val)) {
              throw new AssertionError2(
                flagMsg + "the given combination of arguments (" + objType + " and " + _.type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + _.type(val).toLowerCase(),
                void 0,
                ssfi
              );
            }
            var props = Object.keys(val), firstErr = null, numErrs = 0;
            props.forEach(function(prop) {
              var propAssertion = new Assertion2(obj);
              _.transferFlags(this, propAssertion, true);
              flag(propAssertion, "lockSsfi", true);
              if (!negate || props.length === 1) {
                propAssertion.property(prop, val[prop]);
                return;
              }
              try {
                propAssertion.property(prop, val[prop]);
              } catch (err) {
                if (!_.checkError.compatibleConstructor(err, AssertionError2)) {
                  throw err;
                }
                if (firstErr === null)
                  firstErr = err;
                numErrs++;
              }
            }, this);
            if (negate && props.length > 1 && numErrs === props.length) {
              throw firstErr;
            }
            return;
        }
        this.assert(
          included,
          "expected #{this} to " + descriptor + "include " + _.inspect(val),
          "expected #{this} to not " + descriptor + "include " + _.inspect(val)
        );
      }
      Assertion2.addChainableMethod("include", include, includeChainingBehavior);
      Assertion2.addChainableMethod("contain", include, includeChainingBehavior);
      Assertion2.addChainableMethod("contains", include, includeChainingBehavior);
      Assertion2.addChainableMethod("includes", include, includeChainingBehavior);
      Assertion2.addProperty("ok", function() {
        this.assert(
          flag(this, "object"),
          "expected #{this} to be truthy",
          "expected #{this} to be falsy"
        );
      });
      Assertion2.addProperty("true", function() {
        this.assert(
          true === flag(this, "object"),
          "expected #{this} to be true",
          "expected #{this} to be false",
          flag(this, "negate") ? false : true
        );
      });
      Assertion2.addProperty("false", function() {
        this.assert(
          false === flag(this, "object"),
          "expected #{this} to be false",
          "expected #{this} to be true",
          flag(this, "negate") ? true : false
        );
      });
      Assertion2.addProperty("null", function() {
        this.assert(
          null === flag(this, "object"),
          "expected #{this} to be null",
          "expected #{this} not to be null"
        );
      });
      Assertion2.addProperty("undefined", function() {
        this.assert(
          void 0 === flag(this, "object"),
          "expected #{this} to be undefined",
          "expected #{this} not to be undefined"
        );
      });
      Assertion2.addProperty("NaN", function() {
        this.assert(
          _.isNaN(flag(this, "object")),
          "expected #{this} to be NaN",
          "expected #{this} not to be NaN"
        );
      });
      function assertExist() {
        var val = flag(this, "object");
        this.assert(
          val !== null && val !== void 0,
          "expected #{this} to exist",
          "expected #{this} to not exist"
        );
      }
      Assertion2.addProperty("exist", assertExist);
      Assertion2.addProperty("exists", assertExist);
      Assertion2.addProperty("empty", function() {
        var val = flag(this, "object"), ssfi = flag(this, "ssfi"), flagMsg = flag(this, "message"), itemsCount;
        flagMsg = flagMsg ? flagMsg + ": " : "";
        switch (_.type(val).toLowerCase()) {
          case "array":
          case "string":
            itemsCount = val.length;
            break;
          case "map":
          case "set":
            itemsCount = val.size;
            break;
          case "weakmap":
          case "weakset":
            throw new AssertionError2(
              flagMsg + ".empty was passed a weak collection",
              void 0,
              ssfi
            );
          case "function":
            var msg = flagMsg + ".empty was passed a function " + _.getName(val);
            throw new AssertionError2(msg.trim(), void 0, ssfi);
          default:
            if (val !== Object(val)) {
              throw new AssertionError2(
                flagMsg + ".empty was passed non-string primitive " + _.inspect(val),
                void 0,
                ssfi
              );
            }
            itemsCount = Object.keys(val).length;
        }
        this.assert(
          0 === itemsCount,
          "expected #{this} to be empty",
          "expected #{this} not to be empty"
        );
      });
      function checkArguments() {
        var obj = flag(this, "object"), type2 = _.type(obj);
        this.assert(
          "Arguments" === type2,
          "expected #{this} to be arguments but got " + type2,
          "expected #{this} to not be arguments"
        );
      }
      Assertion2.addProperty("arguments", checkArguments);
      Assertion2.addProperty("Arguments", checkArguments);
      function assertEqual(val, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        if (flag(this, "deep")) {
          var prevLockSsfi = flag(this, "lockSsfi");
          flag(this, "lockSsfi", true);
          this.eql(val);
          flag(this, "lockSsfi", prevLockSsfi);
        } else {
          this.assert(
            val === obj,
            "expected #{this} to equal #{exp}",
            "expected #{this} to not equal #{exp}",
            val,
            this._obj,
            true
          );
        }
      }
      Assertion2.addMethod("equal", assertEqual);
      Assertion2.addMethod("equals", assertEqual);
      Assertion2.addMethod("eq", assertEqual);
      function assertEql(obj, msg) {
        if (msg)
          flag(this, "message", msg);
        this.assert(
          _.eql(obj, flag(this, "object")),
          "expected #{this} to deeply equal #{exp}",
          "expected #{this} to not deeply equal #{exp}",
          obj,
          this._obj,
          true
        );
      }
      Assertion2.addMethod("eql", assertEql);
      Assertion2.addMethod("eqls", assertEql);
      function assertAbove(n2, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n2).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to above must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to above must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount > n2,
            "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}",
            "expected #{this} to not have a " + descriptor + " above #{exp}",
            n2,
            itemsCount
          );
        } else {
          this.assert(
            obj > n2,
            "expected #{this} to be above #{exp}",
            "expected #{this} to be at most #{exp}",
            n2
          );
        }
      }
      Assertion2.addMethod("above", assertAbove);
      Assertion2.addMethod("gt", assertAbove);
      Assertion2.addMethod("greaterThan", assertAbove);
      function assertLeast(n2, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n2).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to least must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to least must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount >= n2,
            "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}",
            "expected #{this} to have a " + descriptor + " below #{exp}",
            n2,
            itemsCount
          );
        } else {
          this.assert(
            obj >= n2,
            "expected #{this} to be at least #{exp}",
            "expected #{this} to be below #{exp}",
            n2
          );
        }
      }
      Assertion2.addMethod("least", assertLeast);
      Assertion2.addMethod("gte", assertLeast);
      Assertion2.addMethod("greaterThanOrEqual", assertLeast);
      function assertBelow(n2, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n2).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to below must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to below must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount < n2,
            "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}",
            "expected #{this} to not have a " + descriptor + " below #{exp}",
            n2,
            itemsCount
          );
        } else {
          this.assert(
            obj < n2,
            "expected #{this} to be below #{exp}",
            "expected #{this} to be at least #{exp}",
            n2
          );
        }
      }
      Assertion2.addMethod("below", assertBelow);
      Assertion2.addMethod("lt", assertBelow);
      Assertion2.addMethod("lessThan", assertBelow);
      function assertMost(n2, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n2).toLowerCase(), errorMessage, shouldThrow = true;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && nType !== "date")) {
          errorMessage = msgPrefix + "the argument to most must be a date";
        } else if (nType !== "number" && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the argument to most must be a number";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount <= n2,
            "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}",
            "expected #{this} to have a " + descriptor + " above #{exp}",
            n2,
            itemsCount
          );
        } else {
          this.assert(
            obj <= n2,
            "expected #{this} to be at most #{exp}",
            "expected #{this} to be above #{exp}",
            n2
          );
        }
      }
      Assertion2.addMethod("most", assertMost);
      Assertion2.addMethod("lte", assertMost);
      Assertion2.addMethod("lessThanOrEqual", assertMost);
      Assertion2.addMethod("within", function(start, finish, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), startType = _.type(start).toLowerCase(), finishType = _.type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = startType === "date" && finishType === "date" ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
        if (doLength && objType !== "map" && objType !== "set") {
          new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
        }
        if (!doLength && (objType === "date" && (startType !== "date" || finishType !== "date"))) {
          errorMessage = msgPrefix + "the arguments to within must be dates";
        } else if ((startType !== "number" || finishType !== "number") && (doLength || objType === "number")) {
          errorMessage = msgPrefix + "the arguments to within must be numbers";
        } else if (!doLength && (objType !== "date" && objType !== "number")) {
          var printObj = objType === "string" ? "'" + obj + "'" : obj;
          errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
        } else {
          shouldThrow = false;
        }
        if (shouldThrow) {
          throw new AssertionError2(errorMessage, void 0, ssfi);
        }
        if (doLength) {
          var descriptor = "length", itemsCount;
          if (objType === "map" || objType === "set") {
            descriptor = "size";
            itemsCount = obj.size;
          } else {
            itemsCount = obj.length;
          }
          this.assert(
            itemsCount >= start && itemsCount <= finish,
            "expected #{this} to have a " + descriptor + " within " + range,
            "expected #{this} to not have a " + descriptor + " within " + range
          );
        } else {
          this.assert(
            obj >= start && obj <= finish,
            "expected #{this} to be within " + range,
            "expected #{this} to not be within " + range
          );
        }
      });
      function assertInstanceOf(constructor, msg) {
        if (msg)
          flag(this, "message", msg);
        var target = flag(this, "object");
        var ssfi = flag(this, "ssfi");
        var flagMsg = flag(this, "message");
        try {
          var isInstanceOf = target instanceof constructor;
        } catch (err) {
          if (err instanceof TypeError) {
            flagMsg = flagMsg ? flagMsg + ": " : "";
            throw new AssertionError2(
              flagMsg + "The instanceof assertion needs a constructor but " + _.type(constructor) + " was given.",
              void 0,
              ssfi
            );
          }
          throw err;
        }
        var name = _.getName(constructor);
        if (name === null) {
          name = "an unnamed constructor";
        }
        this.assert(
          isInstanceOf,
          "expected #{this} to be an instance of " + name,
          "expected #{this} to not be an instance of " + name
        );
      }
      ;
      Assertion2.addMethod("instanceof", assertInstanceOf);
      Assertion2.addMethod("instanceOf", assertInstanceOf);
      function assertProperty(name, val, msg) {
        if (msg)
          flag(this, "message", msg);
        var isNested = flag(this, "nested"), isOwn = flag(this, "own"), flagMsg = flag(this, "message"), obj = flag(this, "object"), ssfi = flag(this, "ssfi"), nameType = typeof name;
        flagMsg = flagMsg ? flagMsg + ": " : "";
        if (isNested) {
          if (nameType !== "string") {
            throw new AssertionError2(
              flagMsg + "the argument to property must be a string when using nested syntax",
              void 0,
              ssfi
            );
          }
        } else {
          if (nameType !== "string" && nameType !== "number" && nameType !== "symbol") {
            throw new AssertionError2(
              flagMsg + "the argument to property must be a string, number, or symbol",
              void 0,
              ssfi
            );
          }
        }
        if (isNested && isOwn) {
          throw new AssertionError2(
            flagMsg + 'The "nested" and "own" flags cannot be combined.',
            void 0,
            ssfi
          );
        }
        if (obj === null || obj === void 0) {
          throw new AssertionError2(
            flagMsg + "Target cannot be null or undefined.",
            void 0,
            ssfi
          );
        }
        var isDeep = flag(this, "deep"), negate = flag(this, "negate"), pathInfo = isNested ? _.getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name];
        var descriptor = "";
        if (isDeep)
          descriptor += "deep ";
        if (isOwn)
          descriptor += "own ";
        if (isNested)
          descriptor += "nested ";
        descriptor += "property ";
        var hasProperty;
        if (isOwn)
          hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
        else if (isNested)
          hasProperty = pathInfo.exists;
        else
          hasProperty = _.hasProperty(obj, name);
        if (!negate || arguments.length === 1) {
          this.assert(
            hasProperty,
            "expected #{this} to have " + descriptor + _.inspect(name),
            "expected #{this} to not have " + descriptor + _.inspect(name)
          );
        }
        if (arguments.length > 1) {
          this.assert(
            hasProperty && (isDeep ? _.eql(val, value) : val === value),
            "expected #{this} to have " + descriptor + _.inspect(name) + " of #{exp}, but got #{act}",
            "expected #{this} to not have " + descriptor + _.inspect(name) + " of #{act}",
            val,
            value
          );
        }
        flag(this, "object", value);
      }
      Assertion2.addMethod("property", assertProperty);
      function assertOwnProperty(name, value, msg) {
        flag(this, "own", true);
        assertProperty.apply(this, arguments);
      }
      Assertion2.addMethod("ownProperty", assertOwnProperty);
      Assertion2.addMethod("haveOwnProperty", assertOwnProperty);
      function assertOwnPropertyDescriptor(name, descriptor, msg) {
        if (typeof descriptor === "string") {
          msg = descriptor;
          descriptor = null;
        }
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
        if (actualDescriptor && descriptor) {
          this.assert(
            _.eql(descriptor, actualDescriptor),
            "expected the own property descriptor for " + _.inspect(name) + " on #{this} to match " + _.inspect(descriptor) + ", got " + _.inspect(actualDescriptor),
            "expected the own property descriptor for " + _.inspect(name) + " on #{this} to not match " + _.inspect(descriptor),
            descriptor,
            actualDescriptor,
            true
          );
        } else {
          this.assert(
            actualDescriptor,
            "expected #{this} to have an own property descriptor for " + _.inspect(name),
            "expected #{this} to not have an own property descriptor for " + _.inspect(name)
          );
        }
        flag(this, "object", actualDescriptor);
      }
      Assertion2.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
      Assertion2.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
      function assertLengthChain() {
        flag(this, "doLength", true);
      }
      function assertLength(n2, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi"), descriptor = "length", itemsCount;
        switch (objType) {
          case "map":
          case "set":
            descriptor = "size";
            itemsCount = obj.size;
            break;
          default:
            new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
            itemsCount = obj.length;
        }
        this.assert(
          itemsCount == n2,
          "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}",
          "expected #{this} to not have a " + descriptor + " of #{act}",
          n2,
          itemsCount
        );
      }
      Assertion2.addChainableMethod("length", assertLength, assertLengthChain);
      Assertion2.addChainableMethod("lengthOf", assertLength, assertLengthChain);
      function assertMatch(re, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        this.assert(
          re.exec(obj),
          "expected #{this} to match " + re,
          "expected #{this} not to match " + re
        );
      }
      Assertion2.addMethod("match", assertMatch);
      Assertion2.addMethod("matches", assertMatch);
      Assertion2.addMethod("string", function(str, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(obj, flagMsg, ssfi, true).is.a("string");
        this.assert(
          ~obj.indexOf(str),
          "expected #{this} to contain " + _.inspect(str),
          "expected #{this} to not contain " + _.inspect(str)
        );
      });
      function assertKeys(keys2) {
        var obj = flag(this, "object"), objType = _.type(obj), keysType = _.type(keys2), ssfi = flag(this, "ssfi"), isDeep = flag(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = flag(this, "message");
        flagMsg = flagMsg ? flagMsg + ": " : "";
        var mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
        if (objType === "Map" || objType === "Set") {
          deepStr = isDeep ? "deeply " : "";
          actual = [];
          obj.forEach(function(val, key) {
            actual.push(key);
          });
          if (keysType !== "Array") {
            keys2 = Array.prototype.slice.call(arguments);
          }
        } else {
          actual = _.getOwnEnumerableProperties(obj);
          switch (keysType) {
            case "Array":
              if (arguments.length > 1) {
                throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
              }
              break;
            case "Object":
              if (arguments.length > 1) {
                throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
              }
              keys2 = Object.keys(keys2);
              break;
            default:
              keys2 = Array.prototype.slice.call(arguments);
          }
          keys2 = keys2.map(function(val) {
            return typeof val === "symbol" ? val : String(val);
          });
        }
        if (!keys2.length) {
          throw new AssertionError2(flagMsg + "keys required", void 0, ssfi);
        }
        var len = keys2.length, any = flag(this, "any"), all = flag(this, "all"), expected = keys2;
        if (!any && !all) {
          all = true;
        }
        if (any) {
          ok = expected.some(function(expectedKey) {
            return actual.some(function(actualKey) {
              if (isDeep) {
                return _.eql(expectedKey, actualKey);
              } else {
                return expectedKey === actualKey;
              }
            });
          });
        }
        if (all) {
          ok = expected.every(function(expectedKey) {
            return actual.some(function(actualKey) {
              if (isDeep) {
                return _.eql(expectedKey, actualKey);
              } else {
                return expectedKey === actualKey;
              }
            });
          });
          if (!flag(this, "contains")) {
            ok = ok && keys2.length == actual.length;
          }
        }
        if (len > 1) {
          keys2 = keys2.map(function(key) {
            return _.inspect(key);
          });
          var last = keys2.pop();
          if (all) {
            str = keys2.join(", ") + ", and " + last;
          }
          if (any) {
            str = keys2.join(", ") + ", or " + last;
          }
        } else {
          str = _.inspect(keys2[0]);
        }
        str = (len > 1 ? "keys " : "key ") + str;
        str = (flag(this, "contains") ? "contain " : "have ") + str;
        this.assert(
          ok,
          "expected #{this} to " + deepStr + str,
          "expected #{this} to not " + deepStr + str,
          expected.slice(0).sort(_.compareByInspect),
          actual.sort(_.compareByInspect),
          true
        );
      }
      Assertion2.addMethod("keys", assertKeys);
      Assertion2.addMethod("key", assertKeys);
      function assertThrows(errorLike, errMsgMatcher, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), ssfi = flag(this, "ssfi"), flagMsg = flag(this, "message"), negate = flag(this, "negate") || false;
        new Assertion2(obj, flagMsg, ssfi, true).is.a("function");
        if (errorLike instanceof RegExp || typeof errorLike === "string") {
          errMsgMatcher = errorLike;
          errorLike = null;
        }
        var caughtErr;
        try {
          obj();
        } catch (err) {
          caughtErr = err;
        }
        var everyArgIsUndefined = errorLike === void 0 && errMsgMatcher === void 0;
        var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
        var errorLikeFail = false;
        var errMsgMatcherFail = false;
        if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
          var errorLikeString = "an error";
          if (errorLike instanceof Error) {
            errorLikeString = "#{exp}";
          } else if (errorLike) {
            errorLikeString = _.checkError.getConstructorName(errorLike);
          }
          this.assert(
            caughtErr,
            "expected #{this} to throw " + errorLikeString,
            "expected #{this} to not throw an error but #{act} was thrown",
            errorLike && errorLike.toString(),
            caughtErr instanceof Error ? caughtErr.toString() : typeof caughtErr === "string" ? caughtErr : caughtErr && _.checkError.getConstructorName(caughtErr)
          );
        }
        if (errorLike && caughtErr) {
          if (errorLike instanceof Error) {
            var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);
            if (isCompatibleInstance === negate) {
              if (everyArgIsDefined && negate) {
                errorLikeFail = true;
              } else {
                this.assert(
                  negate,
                  "expected #{this} to throw #{exp} but #{act} was thrown",
                  "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""),
                  errorLike.toString(),
                  caughtErr.toString()
                );
              }
            }
          }
          var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
          if (isCompatibleConstructor === negate) {
            if (everyArgIsDefined && negate) {
              errorLikeFail = true;
            } else {
              this.assert(
                negate,
                "expected #{this} to throw #{exp} but #{act} was thrown",
                "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
                errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike),
                caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)
              );
            }
          }
        }
        if (caughtErr && errMsgMatcher !== void 0 && errMsgMatcher !== null) {
          var placeholder = "including";
          if (errMsgMatcher instanceof RegExp) {
            placeholder = "matching";
          }
          var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
          if (isCompatibleMessage === negate) {
            if (everyArgIsDefined && negate) {
              errMsgMatcherFail = true;
            } else {
              this.assert(
                negate,
                "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}",
                "expected #{this} to throw error not " + placeholder + " #{exp}",
                errMsgMatcher,
                _.checkError.getMessage(caughtErr)
              );
            }
          }
        }
        if (errorLikeFail && errMsgMatcherFail) {
          this.assert(
            negate,
            "expected #{this} to throw #{exp} but #{act} was thrown",
            "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
            errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike),
            caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)
          );
        }
        flag(this, "object", caughtErr);
      }
      ;
      Assertion2.addMethod("throw", assertThrows);
      Assertion2.addMethod("throws", assertThrows);
      Assertion2.addMethod("Throw", assertThrows);
      function respondTo(method, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), itself = flag(this, "itself"), context = "function" === typeof obj && !itself ? obj.prototype[method] : obj[method];
        this.assert(
          "function" === typeof context,
          "expected #{this} to respond to " + _.inspect(method),
          "expected #{this} to not respond to " + _.inspect(method)
        );
      }
      Assertion2.addMethod("respondTo", respondTo);
      Assertion2.addMethod("respondsTo", respondTo);
      Assertion2.addProperty("itself", function() {
        flag(this, "itself", true);
      });
      function satisfy(matcher, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object");
        var result = matcher(obj);
        this.assert(
          result,
          "expected #{this} to satisfy " + _.objDisplay(matcher),
          "expected #{this} to not satisfy" + _.objDisplay(matcher),
          flag(this, "negate") ? false : true,
          result
        );
      }
      Assertion2.addMethod("satisfy", satisfy);
      Assertion2.addMethod("satisfies", satisfy);
      function closeTo(expected, delta, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(obj, flagMsg, ssfi, true).is.a("number");
        if (typeof expected !== "number" || typeof delta !== "number") {
          flagMsg = flagMsg ? flagMsg + ": " : "";
          var deltaMessage = delta === void 0 ? ", and a delta is required" : "";
          throw new AssertionError2(
            flagMsg + "the arguments to closeTo or approximately must be numbers" + deltaMessage,
            void 0,
            ssfi
          );
        }
        this.assert(
          Math.abs(obj - expected) <= delta,
          "expected #{this} to be close to " + expected + " +/- " + delta,
          "expected #{this} not to be close to " + expected + " +/- " + delta
        );
      }
      Assertion2.addMethod("closeTo", closeTo);
      Assertion2.addMethod("approximately", closeTo);
      function isSubsetOf(subset, superset, cmp, contains, ordered) {
        if (!contains) {
          if (subset.length !== superset.length)
            return false;
          superset = superset.slice();
        }
        return subset.every(function(elem, idx) {
          if (ordered)
            return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
          if (!cmp) {
            var matchIdx = superset.indexOf(elem);
            if (matchIdx === -1)
              return false;
            if (!contains)
              superset.splice(matchIdx, 1);
            return true;
          }
          return superset.some(function(elem2, matchIdx2) {
            if (!cmp(elem, elem2))
              return false;
            if (!contains)
              superset.splice(matchIdx2, 1);
            return true;
          });
        });
      }
      Assertion2.addMethod("members", function(subset, msg) {
        if (msg)
          flag(this, "message", msg);
        var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(obj, flagMsg, ssfi, true).to.be.an("array");
        new Assertion2(subset, flagMsg, ssfi, true).to.be.an("array");
        var contains = flag(this, "contains");
        var ordered = flag(this, "ordered");
        var subject, failMsg, failNegateMsg;
        if (contains) {
          subject = ordered ? "an ordered superset" : "a superset";
          failMsg = "expected #{this} to be " + subject + " of #{exp}";
          failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}";
        } else {
          subject = ordered ? "ordered members" : "members";
          failMsg = "expected #{this} to have the same " + subject + " as #{exp}";
          failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}";
        }
        var cmp = flag(this, "deep") ? _.eql : void 0;
        this.assert(
          isSubsetOf(subset, obj, cmp, contains, ordered),
          failMsg,
          failNegateMsg,
          subset,
          obj,
          true
        );
      });
      function oneOf(list, msg) {
        if (msg)
          flag(this, "message", msg);
        var expected = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi"), contains = flag(this, "contains"), isDeep = flag(this, "deep");
        new Assertion2(list, flagMsg, ssfi, true).to.be.an("array");
        if (contains) {
          this.assert(
            list.some(function(possibility) {
              return expected.indexOf(possibility) > -1;
            }),
            "expected #{this} to contain one of #{exp}",
            "expected #{this} to not contain one of #{exp}",
            list,
            expected
          );
        } else {
          if (isDeep) {
            this.assert(
              list.some(function(possibility) {
                return _.eql(expected, possibility);
              }),
              "expected #{this} to deeply equal one of #{exp}",
              "expected #{this} to deeply equal one of #{exp}",
              list,
              expected
            );
          } else {
            this.assert(
              list.indexOf(expected) > -1,
              "expected #{this} to be one of #{exp}",
              "expected #{this} to not be one of #{exp}",
              list,
              expected
            );
          }
        }
      }
      Assertion2.addMethod("oneOf", oneOf);
      function assertChanges(subject, prop, msg) {
        if (msg)
          flag(this, "message", msg);
        var fn2 = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(fn2, flagMsg, ssfi, true).is.a("function");
        var initial;
        if (!prop) {
          new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
          initial = subject();
        } else {
          new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
          initial = subject[prop];
        }
        fn2();
        var final = prop === void 0 || prop === null ? subject() : subject[prop];
        var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
        flag(this, "deltaMsgObj", msgObj);
        flag(this, "initialDeltaValue", initial);
        flag(this, "finalDeltaValue", final);
        flag(this, "deltaBehavior", "change");
        flag(this, "realDelta", final !== initial);
        this.assert(
          initial !== final,
          "expected " + msgObj + " to change",
          "expected " + msgObj + " to not change"
        );
      }
      Assertion2.addMethod("change", assertChanges);
      Assertion2.addMethod("changes", assertChanges);
      function assertIncreases(subject, prop, msg) {
        if (msg)
          flag(this, "message", msg);
        var fn2 = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(fn2, flagMsg, ssfi, true).is.a("function");
        var initial;
        if (!prop) {
          new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
          initial = subject();
        } else {
          new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
          initial = subject[prop];
        }
        new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
        fn2();
        var final = prop === void 0 || prop === null ? subject() : subject[prop];
        var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
        flag(this, "deltaMsgObj", msgObj);
        flag(this, "initialDeltaValue", initial);
        flag(this, "finalDeltaValue", final);
        flag(this, "deltaBehavior", "increase");
        flag(this, "realDelta", final - initial);
        this.assert(
          final - initial > 0,
          "expected " + msgObj + " to increase",
          "expected " + msgObj + " to not increase"
        );
      }
      Assertion2.addMethod("increase", assertIncreases);
      Assertion2.addMethod("increases", assertIncreases);
      function assertDecreases(subject, prop, msg) {
        if (msg)
          flag(this, "message", msg);
        var fn2 = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
        new Assertion2(fn2, flagMsg, ssfi, true).is.a("function");
        var initial;
        if (!prop) {
          new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
          initial = subject();
        } else {
          new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
          initial = subject[prop];
        }
        new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
        fn2();
        var final = prop === void 0 || prop === null ? subject() : subject[prop];
        var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
        flag(this, "deltaMsgObj", msgObj);
        flag(this, "initialDeltaValue", initial);
        flag(this, "finalDeltaValue", final);
        flag(this, "deltaBehavior", "decrease");
        flag(this, "realDelta", initial - final);
        this.assert(
          final - initial < 0,
          "expected " + msgObj + " to decrease",
          "expected " + msgObj + " to not decrease"
        );
      }
      Assertion2.addMethod("decrease", assertDecreases);
      Assertion2.addMethod("decreases", assertDecreases);
      function assertDelta(delta, msg) {
        if (msg)
          flag(this, "message", msg);
        var msgObj = flag(this, "deltaMsgObj");
        var initial = flag(this, "initialDeltaValue");
        var final = flag(this, "finalDeltaValue");
        var behavior = flag(this, "deltaBehavior");
        var realDelta = flag(this, "realDelta");
        var expression;
        if (behavior === "change") {
          expression = Math.abs(final - initial) === Math.abs(delta);
        } else {
          expression = realDelta === Math.abs(delta);
        }
        this.assert(
          expression,
          "expected " + msgObj + " to " + behavior + " by " + delta,
          "expected " + msgObj + " to not " + behavior + " by " + delta
        );
      }
      Assertion2.addMethod("by", assertDelta);
      Assertion2.addProperty("extensible", function() {
        var obj = flag(this, "object");
        var isExtensible = obj === Object(obj) && Object.isExtensible(obj);
        this.assert(
          isExtensible,
          "expected #{this} to be extensible",
          "expected #{this} to not be extensible"
        );
      });
      Assertion2.addProperty("sealed", function() {
        var obj = flag(this, "object");
        var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
        this.assert(
          isSealed,
          "expected #{this} to be sealed",
          "expected #{this} to not be sealed"
        );
      });
      Assertion2.addProperty("frozen", function() {
        var obj = flag(this, "object");
        var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
        this.assert(
          isFrozen,
          "expected #{this} to be frozen",
          "expected #{this} to not be frozen"
        );
      });
      Assertion2.addProperty("finite", function(msg) {
        var obj = flag(this, "object");
        this.assert(
          typeof obj === "number" && isFinite(obj),
          "expected #{this} to be a finite number",
          "expected #{this} to not be a finite number"
        );
      });
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/interface/expect.js
var require_expect = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/interface/expect.js"(exports2, module2) {
    "use strict";
    module2.exports = function(chai3, util2) {
      chai3.expect = function(val, message) {
        return new chai3.Assertion(val, message);
      };
      chai3.expect.fail = function(actual, expected, message, operator) {
        if (arguments.length < 2) {
          message = actual;
          actual = void 0;
        }
        message = message || "expect.fail()";
        throw new chai3.AssertionError(message, {
          actual,
          expected,
          operator
        }, chai3.expect.fail);
      };
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/interface/should.js
var require_should = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/interface/should.js"(exports2, module2) {
    "use strict";
    module2.exports = function(chai3, util2) {
      var Assertion2 = chai3.Assertion;
      function loadShould() {
        function shouldGetter() {
          if (this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol === "function" && this instanceof Symbol || typeof BigInt === "function" && this instanceof BigInt) {
            return new Assertion2(this.valueOf(), null, shouldGetter);
          }
          return new Assertion2(this, null, shouldGetter);
        }
        function shouldSetter(value) {
          Object.defineProperty(this, "should", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        }
        Object.defineProperty(Object.prototype, "should", {
          set: shouldSetter,
          get: shouldGetter,
          configurable: true
        });
        var should2 = {};
        should2.fail = function(actual, expected, message, operator) {
          if (arguments.length < 2) {
            message = actual;
            actual = void 0;
          }
          message = message || "should.fail()";
          throw new chai3.AssertionError(message, {
            actual,
            expected,
            operator
          }, should2.fail);
        };
        should2.equal = function(val1, val2, msg) {
          new Assertion2(val1, msg).to.equal(val2);
        };
        should2.Throw = function(fn2, errt, errs, msg) {
          new Assertion2(fn2, msg).to.Throw(errt, errs);
        };
        should2.exist = function(val, msg) {
          new Assertion2(val, msg).to.exist;
        };
        should2.not = {};
        should2.not.equal = function(val1, val2, msg) {
          new Assertion2(val1, msg).to.not.equal(val2);
        };
        should2.not.Throw = function(fn2, errt, errs, msg) {
          new Assertion2(fn2, msg).to.not.Throw(errt, errs);
        };
        should2.not.exist = function(val, msg) {
          new Assertion2(val, msg).to.not.exist;
        };
        should2["throw"] = should2["Throw"];
        should2.not["throw"] = should2.not["Throw"];
        return should2;
      }
      ;
      chai3.should = loadShould;
      chai3.Should = loadShould;
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/interface/assert.js
var require_assert = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai/interface/assert.js"(exports2, module2) {
    "use strict";
    module2.exports = function(chai3, util2) {
      var Assertion2 = chai3.Assertion, flag = util2.flag;
      var assert2 = chai3.assert = function(express, errmsg) {
        var test3 = new Assertion2(null, null, chai3.assert, true);
        test3.assert(
          express,
          errmsg,
          "[ negation message unavailable ]"
        );
      };
      assert2.fail = function(actual, expected, message, operator) {
        if (arguments.length < 2) {
          message = actual;
          actual = void 0;
        }
        message = message || "assert.fail()";
        throw new chai3.AssertionError(message, {
          actual,
          expected,
          operator
        }, assert2.fail);
      };
      assert2.isOk = function(val, msg) {
        new Assertion2(val, msg, assert2.isOk, true).is.ok;
      };
      assert2.isNotOk = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotOk, true).is.not.ok;
      };
      assert2.equal = function(act, exp, msg) {
        var test3 = new Assertion2(act, msg, assert2.equal, true);
        test3.assert(
          exp == flag(test3, "object"),
          "expected #{this} to equal #{exp}",
          "expected #{this} to not equal #{act}",
          exp,
          act,
          true
        );
      };
      assert2.notEqual = function(act, exp, msg) {
        var test3 = new Assertion2(act, msg, assert2.notEqual, true);
        test3.assert(
          exp != flag(test3, "object"),
          "expected #{this} to not equal #{exp}",
          "expected #{this} to equal #{act}",
          exp,
          act,
          true
        );
      };
      assert2.strictEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.strictEqual, true).to.equal(exp);
      };
      assert2.notStrictEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.notStrictEqual, true).to.not.equal(exp);
      };
      assert2.deepEqual = assert2.deepStrictEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.deepEqual, true).to.eql(exp);
      };
      assert2.notDeepEqual = function(act, exp, msg) {
        new Assertion2(act, msg, assert2.notDeepEqual, true).to.not.eql(exp);
      };
      assert2.isAbove = function(val, abv, msg) {
        new Assertion2(val, msg, assert2.isAbove, true).to.be.above(abv);
      };
      assert2.isAtLeast = function(val, atlst, msg) {
        new Assertion2(val, msg, assert2.isAtLeast, true).to.be.least(atlst);
      };
      assert2.isBelow = function(val, blw, msg) {
        new Assertion2(val, msg, assert2.isBelow, true).to.be.below(blw);
      };
      assert2.isAtMost = function(val, atmst, msg) {
        new Assertion2(val, msg, assert2.isAtMost, true).to.be.most(atmst);
      };
      assert2.isTrue = function(val, msg) {
        new Assertion2(val, msg, assert2.isTrue, true).is["true"];
      };
      assert2.isNotTrue = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotTrue, true).to.not.equal(true);
      };
      assert2.isFalse = function(val, msg) {
        new Assertion2(val, msg, assert2.isFalse, true).is["false"];
      };
      assert2.isNotFalse = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotFalse, true).to.not.equal(false);
      };
      assert2.isNull = function(val, msg) {
        new Assertion2(val, msg, assert2.isNull, true).to.equal(null);
      };
      assert2.isNotNull = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotNull, true).to.not.equal(null);
      };
      assert2.isNaN = function(val, msg) {
        new Assertion2(val, msg, assert2.isNaN, true).to.be.NaN;
      };
      assert2.isNotNaN = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotNaN, true).not.to.be.NaN;
      };
      assert2.exists = function(val, msg) {
        new Assertion2(val, msg, assert2.exists, true).to.exist;
      };
      assert2.notExists = function(val, msg) {
        new Assertion2(val, msg, assert2.notExists, true).to.not.exist;
      };
      assert2.isUndefined = function(val, msg) {
        new Assertion2(val, msg, assert2.isUndefined, true).to.equal(void 0);
      };
      assert2.isDefined = function(val, msg) {
        new Assertion2(val, msg, assert2.isDefined, true).to.not.equal(void 0);
      };
      assert2.isFunction = function(val, msg) {
        new Assertion2(val, msg, assert2.isFunction, true).to.be.a("function");
      };
      assert2.isNotFunction = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotFunction, true).to.not.be.a("function");
      };
      assert2.isObject = function(val, msg) {
        new Assertion2(val, msg, assert2.isObject, true).to.be.a("object");
      };
      assert2.isNotObject = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotObject, true).to.not.be.a("object");
      };
      assert2.isArray = function(val, msg) {
        new Assertion2(val, msg, assert2.isArray, true).to.be.an("array");
      };
      assert2.isNotArray = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotArray, true).to.not.be.an("array");
      };
      assert2.isString = function(val, msg) {
        new Assertion2(val, msg, assert2.isString, true).to.be.a("string");
      };
      assert2.isNotString = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotString, true).to.not.be.a("string");
      };
      assert2.isNumber = function(val, msg) {
        new Assertion2(val, msg, assert2.isNumber, true).to.be.a("number");
      };
      assert2.isNotNumber = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotNumber, true).to.not.be.a("number");
      };
      assert2.isFinite = function(val, msg) {
        new Assertion2(val, msg, assert2.isFinite, true).to.be.finite;
      };
      assert2.isBoolean = function(val, msg) {
        new Assertion2(val, msg, assert2.isBoolean, true).to.be.a("boolean");
      };
      assert2.isNotBoolean = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotBoolean, true).to.not.be.a("boolean");
      };
      assert2.typeOf = function(val, type2, msg) {
        new Assertion2(val, msg, assert2.typeOf, true).to.be.a(type2);
      };
      assert2.notTypeOf = function(val, type2, msg) {
        new Assertion2(val, msg, assert2.notTypeOf, true).to.not.be.a(type2);
      };
      assert2.instanceOf = function(val, type2, msg) {
        new Assertion2(val, msg, assert2.instanceOf, true).to.be.instanceOf(type2);
      };
      assert2.notInstanceOf = function(val, type2, msg) {
        new Assertion2(val, msg, assert2.notInstanceOf, true).to.not.be.instanceOf(type2);
      };
      assert2.include = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.include, true).include(inc);
      };
      assert2.notInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notInclude, true).not.include(inc);
      };
      assert2.deepInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.deepInclude, true).deep.include(inc);
      };
      assert2.notDeepInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notDeepInclude, true).not.deep.include(inc);
      };
      assert2.nestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.nestedInclude, true).nested.include(inc);
      };
      assert2.notNestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notNestedInclude, true).not.nested.include(inc);
      };
      assert2.deepNestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.deepNestedInclude, true).deep.nested.include(inc);
      };
      assert2.notDeepNestedInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notDeepNestedInclude, true).not.deep.nested.include(inc);
      };
      assert2.ownInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.ownInclude, true).own.include(inc);
      };
      assert2.notOwnInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notOwnInclude, true).not.own.include(inc);
      };
      assert2.deepOwnInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.deepOwnInclude, true).deep.own.include(inc);
      };
      assert2.notDeepOwnInclude = function(exp, inc, msg) {
        new Assertion2(exp, msg, assert2.notDeepOwnInclude, true).not.deep.own.include(inc);
      };
      assert2.match = function(exp, re, msg) {
        new Assertion2(exp, msg, assert2.match, true).to.match(re);
      };
      assert2.notMatch = function(exp, re, msg) {
        new Assertion2(exp, msg, assert2.notMatch, true).to.not.match(re);
      };
      assert2.property = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.property, true).to.have.property(prop);
      };
      assert2.notProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.notProperty, true).to.not.have.property(prop);
      };
      assert2.propertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.propertyVal, true).to.have.property(prop, val);
      };
      assert2.notPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notPropertyVal, true).to.not.have.property(prop, val);
      };
      assert2.deepPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.deepPropertyVal, true).to.have.deep.property(prop, val);
      };
      assert2.notDeepPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
      };
      assert2.ownProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.ownProperty, true).to.have.own.property(prop);
      };
      assert2.notOwnProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.notOwnProperty, true).to.not.have.own.property(prop);
      };
      assert2.ownPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.ownPropertyVal, true).to.have.own.property(prop, value);
      };
      assert2.notOwnPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
      };
      assert2.deepOwnPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
      };
      assert2.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
        new Assertion2(obj, msg, assert2.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
      };
      assert2.nestedProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.nestedProperty, true).to.have.nested.property(prop);
      };
      assert2.notNestedProperty = function(obj, prop, msg) {
        new Assertion2(obj, msg, assert2.notNestedProperty, true).to.not.have.nested.property(prop);
      };
      assert2.nestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.nestedPropertyVal, true).to.have.nested.property(prop, val);
      };
      assert2.notNestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
      };
      assert2.deepNestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
      };
      assert2.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
        new Assertion2(obj, msg, assert2.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
      };
      assert2.lengthOf = function(exp, len, msg) {
        new Assertion2(exp, msg, assert2.lengthOf, true).to.have.lengthOf(len);
      };
      assert2.hasAnyKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.hasAnyKeys, true).to.have.any.keys(keys2);
      };
      assert2.hasAllKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.hasAllKeys, true).to.have.all.keys(keys2);
      };
      assert2.containsAllKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.containsAllKeys, true).to.contain.all.keys(keys2);
      };
      assert2.doesNotHaveAnyKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys2);
      };
      assert2.doesNotHaveAllKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAllKeys, true).to.not.have.all.keys(keys2);
      };
      assert2.hasAnyDeepKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.hasAnyDeepKeys, true).to.have.any.deep.keys(keys2);
      };
      assert2.hasAllDeepKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.hasAllDeepKeys, true).to.have.all.deep.keys(keys2);
      };
      assert2.containsAllDeepKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.containsAllDeepKeys, true).to.contain.all.deep.keys(keys2);
      };
      assert2.doesNotHaveAnyDeepKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys2);
      };
      assert2.doesNotHaveAllDeepKeys = function(obj, keys2, msg) {
        new Assertion2(obj, msg, assert2.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys2);
      };
      assert2.throws = function(fn2, errorLike, errMsgMatcher, msg) {
        if ("string" === typeof errorLike || errorLike instanceof RegExp) {
          errMsgMatcher = errorLike;
          errorLike = null;
        }
        var assertErr = new Assertion2(fn2, msg, assert2.throws, true).to.throw(errorLike, errMsgMatcher);
        return flag(assertErr, "object");
      };
      assert2.doesNotThrow = function(fn2, errorLike, errMsgMatcher, msg) {
        if ("string" === typeof errorLike || errorLike instanceof RegExp) {
          errMsgMatcher = errorLike;
          errorLike = null;
        }
        new Assertion2(fn2, msg, assert2.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
      };
      assert2.operator = function(val, operator, val2, msg) {
        var ok;
        switch (operator) {
          case "==":
            ok = val == val2;
            break;
          case "===":
            ok = val === val2;
            break;
          case ">":
            ok = val > val2;
            break;
          case ">=":
            ok = val >= val2;
            break;
          case "<":
            ok = val < val2;
            break;
          case "<=":
            ok = val <= val2;
            break;
          case "!=":
            ok = val != val2;
            break;
          case "!==":
            ok = val !== val2;
            break;
          default:
            msg = msg ? msg + ": " : msg;
            throw new chai3.AssertionError(
              msg + 'Invalid operator "' + operator + '"',
              void 0,
              assert2.operator
            );
        }
        var test3 = new Assertion2(ok, msg, assert2.operator, true);
        test3.assert(
          true === flag(test3, "object"),
          "expected " + util2.inspect(val) + " to be " + operator + " " + util2.inspect(val2),
          "expected " + util2.inspect(val) + " to not be " + operator + " " + util2.inspect(val2)
        );
      };
      assert2.closeTo = function(act, exp, delta, msg) {
        new Assertion2(act, msg, assert2.closeTo, true).to.be.closeTo(exp, delta);
      };
      assert2.approximately = function(act, exp, delta, msg) {
        new Assertion2(act, msg, assert2.approximately, true).to.be.approximately(exp, delta);
      };
      assert2.sameMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.sameMembers, true).to.have.same.members(set22);
      };
      assert2.notSameMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.notSameMembers, true).to.not.have.same.members(set22);
      };
      assert2.sameDeepMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.sameDeepMembers, true).to.have.same.deep.members(set22);
      };
      assert2.notSameDeepMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.notSameDeepMembers, true).to.not.have.same.deep.members(set22);
      };
      assert2.sameOrderedMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.sameOrderedMembers, true).to.have.same.ordered.members(set22);
      };
      assert2.notSameOrderedMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.notSameOrderedMembers, true).to.not.have.same.ordered.members(set22);
      };
      assert2.sameDeepOrderedMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set22);
      };
      assert2.notSameDeepOrderedMembers = function(set1, set22, msg) {
        new Assertion2(set1, msg, assert2.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set22);
      };
      assert2.includeMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeMembers, true).to.include.members(subset);
      };
      assert2.notIncludeMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeMembers, true).to.not.include.members(subset);
      };
      assert2.includeDeepMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeDeepMembers, true).to.include.deep.members(subset);
      };
      assert2.notIncludeDeepMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
      };
      assert2.includeOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeOrderedMembers, true).to.include.ordered.members(subset);
      };
      assert2.notIncludeOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
      };
      assert2.includeDeepOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
      };
      assert2.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
        new Assertion2(superset, msg, assert2.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
      };
      assert2.oneOf = function(inList, list, msg) {
        new Assertion2(inList, msg, assert2.oneOf, true).to.be.oneOf(list);
      };
      assert2.changes = function(fn2, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        new Assertion2(fn2, msg, assert2.changes, true).to.change(obj, prop);
      };
      assert2.changesBy = function(fn2, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn2, msg, assert2.changesBy, true).to.change(obj, prop).by(delta);
      };
      assert2.doesNotChange = function(fn2, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn2, msg, assert2.doesNotChange, true).to.not.change(obj, prop);
      };
      assert2.changesButNotBy = function(fn2, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn2, msg, assert2.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
      };
      assert2.increases = function(fn2, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn2, msg, assert2.increases, true).to.increase(obj, prop);
      };
      assert2.increasesBy = function(fn2, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn2, msg, assert2.increasesBy, true).to.increase(obj, prop).by(delta);
      };
      assert2.doesNotIncrease = function(fn2, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn2, msg, assert2.doesNotIncrease, true).to.not.increase(obj, prop);
      };
      assert2.increasesButNotBy = function(fn2, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn2, msg, assert2.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
      };
      assert2.decreases = function(fn2, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn2, msg, assert2.decreases, true).to.decrease(obj, prop);
      };
      assert2.decreasesBy = function(fn2, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn2, msg, assert2.decreasesBy, true).to.decrease(obj, prop).by(delta);
      };
      assert2.doesNotDecrease = function(fn2, obj, prop, msg) {
        if (arguments.length === 3 && typeof obj === "function") {
          msg = prop;
          prop = null;
        }
        return new Assertion2(fn2, msg, assert2.doesNotDecrease, true).to.not.decrease(obj, prop);
      };
      assert2.doesNotDecreaseBy = function(fn2, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        return new Assertion2(fn2, msg, assert2.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
      };
      assert2.decreasesButNotBy = function(fn2, obj, prop, delta, msg) {
        if (arguments.length === 4 && typeof obj === "function") {
          var tmpMsg = delta;
          delta = prop;
          msg = tmpMsg;
        } else if (arguments.length === 3) {
          delta = prop;
          prop = null;
        }
        new Assertion2(fn2, msg, assert2.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
      };
      assert2.ifError = function(val) {
        if (val) {
          throw val;
        }
      };
      assert2.isExtensible = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isExtensible, true).to.be.extensible;
      };
      assert2.isNotExtensible = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isNotExtensible, true).to.not.be.extensible;
      };
      assert2.isSealed = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isSealed, true).to.be.sealed;
      };
      assert2.isNotSealed = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isNotSealed, true).to.not.be.sealed;
      };
      assert2.isFrozen = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isFrozen, true).to.be.frozen;
      };
      assert2.isNotFrozen = function(obj, msg) {
        new Assertion2(obj, msg, assert2.isNotFrozen, true).to.not.be.frozen;
      };
      assert2.isEmpty = function(val, msg) {
        new Assertion2(val, msg, assert2.isEmpty, true).to.be.empty;
      };
      assert2.isNotEmpty = function(val, msg) {
        new Assertion2(val, msg, assert2.isNotEmpty, true).to.not.be.empty;
      };
      (function alias(name, as) {
        assert2[as] = assert2[name];
        return alias;
      })("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")("isExtensible", "extensible")("isNotExtensible", "notExtensible")("isSealed", "sealed")("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")("isNotEmpty", "notEmpty");
    };
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai.js
var require_chai = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/lib/chai.js"(exports2) {
    "use strict";
    var used = [];
    exports2.version = "4.3.8";
    exports2.AssertionError = require_assertion_error();
    var util2 = require_utils();
    exports2.use = function(fn2) {
      if (!~used.indexOf(fn2)) {
        fn2(exports2, util2);
        used.push(fn2);
      }
      return exports2;
    };
    exports2.util = util2;
    var config2 = require_config();
    exports2.config = config2;
    var assertion = require_assertion();
    exports2.use(assertion);
    var core2 = require_assertions();
    exports2.use(core2);
    var expect2 = require_expect();
    exports2.use(expect2);
    var should2 = require_should();
    exports2.use(should2);
    var assert2 = require_assert();
    exports2.use(assert2);
  }
});

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/index.js
var require_chai2 = __commonJS({
  "../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_chai();
  }
});

// ../../node_modules/.pnpm/@jridgewell+sourcemap-codec@1.4.15/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
function encode(decoded) {
  const state = new Int32Array(5);
  const bufLength = 1024 * 16;
  const subLength = bufLength - 36;
  const buf = new Uint8Array(bufLength);
  const sub = buf.subarray(0, subLength);
  let pos = 0;
  let out = "";
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    if (i > 0) {
      if (pos === bufLength) {
        out += td.decode(buf);
        pos = 0;
      }
      buf[pos++] = semicolon;
    }
    if (line.length === 0)
      continue;
    state[0] = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (pos > subLength) {
        out += td.decode(sub);
        buf.copyWithin(0, subLength, pos);
        pos -= subLength;
      }
      if (j > 0)
        buf[pos++] = comma;
      pos = encodeInteger(buf, pos, state, segment, 0);
      if (segment.length === 1)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 1);
      pos = encodeInteger(buf, pos, state, segment, 2);
      pos = encodeInteger(buf, pos, state, segment, 3);
      if (segment.length === 4)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 4);
    }
  }
  return out + td.decode(buf.subarray(0, pos));
}
function encodeInteger(buf, pos, state, segment, j) {
  const next = segment[j];
  let num = next - state[j];
  state[j] = next;
  num = num < 0 ? -num << 1 | 1 : num << 1;
  do {
    let clamped = num & 31;
    num >>>= 5;
    if (num > 0)
      clamped |= 32;
    buf[pos++] = intToChar[clamped];
  } while (num > 0);
  return pos;
}
var comma, semicolon, chars, intToChar, charToInt, td;
var init_sourcemap_codec = __esm({
  "../../node_modules/.pnpm/@jridgewell+sourcemap-codec@1.4.15/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs"() {
    "use strict";
    comma = ",".charCodeAt(0);
    semicolon = ";".charCodeAt(0);
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    intToChar = new Uint8Array(64);
    charToInt = new Uint8Array(128);
    for (let i = 0; i < chars.length; i++) {
      const c = chars.charCodeAt(i);
      intToChar[i] = c;
      charToInt[c] = i;
    }
    td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
      decode(buf) {
        const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
        return out.toString();
      }
    } : {
      decode(buf) {
        let out = "";
        for (let i = 0; i < buf.length; i++) {
          out += String.fromCharCode(buf[i]);
        }
        return out;
      }
    };
  }
});

// ../../node_modules/.pnpm/magic-string@0.30.7/node_modules/magic-string/dist/magic-string.es.mjs
var magic_string_es_exports = {};
__export(magic_string_es_exports, {
  Bundle: () => Bundle,
  SourceMap: () => SourceMap,
  default: () => MagicString
});
function getBtoa() {
  if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
    return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
}
function guessIndent(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current) => {
    const numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--)
      fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
function isObject2(thing) {
  return toString2.call(thing) === "[object Object]";
}
function getLocator(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate(index2) {
    let i = 0;
    let j = lineOffsets.length;
    while (i < j) {
      const m2 = i + j >> 1;
      if (index2 < lineOffsets[m2]) {
        j = m2;
      } else {
        i = m2 + 1;
      }
    }
    const line = i - 1;
    const column = index2 - lineOffsets[line];
    return { line, column };
  };
}
var BitSet, Chunk, btoa, SourceMap, toString2, wordRegex, Mappings, n, warned, MagicString, hasOwnProp, Bundle;
var init_magic_string_es = __esm({
  "../../node_modules/.pnpm/magic-string@0.30.7/node_modules/magic-string/dist/magic-string.es.mjs"() {
    "use strict";
    init_sourcemap_codec();
    BitSet = class _BitSet {
      constructor(arg) {
        this.bits = arg instanceof _BitSet ? arg.bits.slice() : [];
      }
      add(n2) {
        this.bits[n2 >> 5] |= 1 << (n2 & 31);
      }
      has(n2) {
        return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
      }
    };
    Chunk = class _Chunk {
      constructor(start, end, content) {
        this.start = start;
        this.end = end;
        this.original = content;
        this.intro = "";
        this.outro = "";
        this.content = content;
        this.storeName = false;
        this.edited = false;
        {
          this.previous = null;
          this.next = null;
        }
      }
      appendLeft(content) {
        this.outro += content;
      }
      appendRight(content) {
        this.intro = this.intro + content;
      }
      clone() {
        const chunk = new _Chunk(this.start, this.end, this.original);
        chunk.intro = this.intro;
        chunk.outro = this.outro;
        chunk.content = this.content;
        chunk.storeName = this.storeName;
        chunk.edited = this.edited;
        return chunk;
      }
      contains(index2) {
        return this.start < index2 && index2 < this.end;
      }
      eachNext(fn2) {
        let chunk = this;
        while (chunk) {
          fn2(chunk);
          chunk = chunk.next;
        }
      }
      eachPrevious(fn2) {
        let chunk = this;
        while (chunk) {
          fn2(chunk);
          chunk = chunk.previous;
        }
      }
      edit(content, storeName, contentOnly) {
        this.content = content;
        if (!contentOnly) {
          this.intro = "";
          this.outro = "";
        }
        this.storeName = storeName;
        this.edited = true;
        return this;
      }
      prependLeft(content) {
        this.outro = content + this.outro;
      }
      prependRight(content) {
        this.intro = content + this.intro;
      }
      reset() {
        this.intro = "";
        this.outro = "";
        if (this.edited) {
          this.content = this.original;
          this.storeName = false;
          this.edited = false;
        }
      }
      split(index2) {
        const sliceIndex = index2 - this.start;
        const originalBefore = this.original.slice(0, sliceIndex);
        const originalAfter = this.original.slice(sliceIndex);
        this.original = originalBefore;
        const newChunk = new _Chunk(index2, this.end, originalAfter);
        newChunk.outro = this.outro;
        this.outro = "";
        this.end = index2;
        if (this.edited) {
          newChunk.edit("", false);
          this.content = "";
        } else {
          this.content = originalBefore;
        }
        newChunk.next = this.next;
        if (newChunk.next)
          newChunk.next.previous = newChunk;
        newChunk.previous = this;
        this.next = newChunk;
        return newChunk;
      }
      toString() {
        return this.intro + this.content + this.outro;
      }
      trimEnd(rx) {
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length)
          return true;
        const trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.start + trimmed.length).edit("", void 0, true);
            if (this.edited) {
              this.edit(trimmed, this.storeName, true);
            }
          }
          return true;
        } else {
          this.edit("", void 0, true);
          this.intro = this.intro.replace(rx, "");
          if (this.intro.length)
            return true;
        }
      }
      trimStart(rx) {
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length)
          return true;
        const trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            const newChunk = this.split(this.end - trimmed.length);
            if (this.edited) {
              newChunk.edit(trimmed, this.storeName, true);
            }
            this.edit("", void 0, true);
          }
          return true;
        } else {
          this.edit("", void 0, true);
          this.outro = this.outro.replace(rx, "");
          if (this.outro.length)
            return true;
        }
      }
    };
    btoa = /* @__PURE__ */ getBtoa();
    SourceMap = class {
      constructor(properties) {
        this.version = 3;
        this.file = properties.file;
        this.sources = properties.sources;
        this.sourcesContent = properties.sourcesContent;
        this.names = properties.names;
        this.mappings = encode(properties.mappings);
        if (typeof properties.x_google_ignoreList !== "undefined") {
          this.x_google_ignoreList = properties.x_google_ignoreList;
        }
      }
      toString() {
        return JSON.stringify(this);
      }
      toUrl() {
        return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
      }
    };
    toString2 = Object.prototype.toString;
    wordRegex = /\w/;
    Mappings = class {
      constructor(hires) {
        this.hires = hires;
        this.generatedCodeLine = 0;
        this.generatedCodeColumn = 0;
        this.raw = [];
        this.rawSegments = this.raw[this.generatedCodeLine] = [];
        this.pending = null;
      }
      addEdit(sourceIndex, content, loc, nameIndex) {
        if (content.length) {
          let contentLineEnd = content.indexOf("\n", 0);
          let previousContentLineEnd = -1;
          while (contentLineEnd >= 0) {
            const segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
            if (nameIndex >= 0) {
              segment2.push(nameIndex);
            }
            this.rawSegments.push(segment2);
            this.generatedCodeLine += 1;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
            this.generatedCodeColumn = 0;
            previousContentLineEnd = contentLineEnd;
            contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
          }
          const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
          if (nameIndex >= 0) {
            segment.push(nameIndex);
          }
          this.rawSegments.push(segment);
          this.advance(content.slice(previousContentLineEnd + 1));
        } else if (this.pending) {
          this.rawSegments.push(this.pending);
          this.advance(content);
        }
        this.pending = null;
      }
      addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
        let originalCharIndex = chunk.start;
        let first = true;
        let charInHiresBoundary = false;
        while (originalCharIndex < chunk.end) {
          if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
            const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
            if (this.hires === "boundary") {
              if (wordRegex.test(original[originalCharIndex])) {
                if (!charInHiresBoundary) {
                  this.rawSegments.push(segment);
                  charInHiresBoundary = true;
                }
              } else {
                this.rawSegments.push(segment);
                charInHiresBoundary = false;
              }
            } else {
              this.rawSegments.push(segment);
            }
          }
          if (original[originalCharIndex] === "\n") {
            loc.line += 1;
            loc.column = 0;
            this.generatedCodeLine += 1;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
            this.generatedCodeColumn = 0;
            first = true;
          } else {
            loc.column += 1;
            this.generatedCodeColumn += 1;
            first = false;
          }
          originalCharIndex += 1;
        }
        this.pending = null;
      }
      advance(str) {
        if (!str)
          return;
        const lines = str.split("\n");
        if (lines.length > 1) {
          for (let i = 0; i < lines.length - 1; i++) {
            this.generatedCodeLine++;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
          }
          this.generatedCodeColumn = 0;
        }
        this.generatedCodeColumn += lines[lines.length - 1].length;
      }
    };
    n = "\n";
    warned = {
      insertLeft: false,
      insertRight: false,
      storeName: false
    };
    MagicString = class _MagicString {
      constructor(string4, options = {}) {
        const chunk = new Chunk(0, string4.length, string4);
        Object.defineProperties(this, {
          original: { writable: true, value: string4 },
          outro: { writable: true, value: "" },
          intro: { writable: true, value: "" },
          firstChunk: { writable: true, value: chunk },
          lastChunk: { writable: true, value: chunk },
          lastSearchedChunk: { writable: true, value: chunk },
          byStart: { writable: true, value: {} },
          byEnd: { writable: true, value: {} },
          filename: { writable: true, value: options.filename },
          indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
          sourcemapLocations: { writable: true, value: new BitSet() },
          storedNames: { writable: true, value: {} },
          indentStr: { writable: true, value: void 0 },
          ignoreList: { writable: true, value: options.ignoreList }
        });
        this.byStart[0] = chunk;
        this.byEnd[string4.length] = chunk;
      }
      addSourcemapLocation(char) {
        this.sourcemapLocations.add(char);
      }
      append(content) {
        if (typeof content !== "string")
          throw new TypeError("outro content must be a string");
        this.outro += content;
        return this;
      }
      appendLeft(index2, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index2);
        const chunk = this.byEnd[index2];
        if (chunk) {
          chunk.appendLeft(content);
        } else {
          this.intro += content;
        }
        return this;
      }
      appendRight(index2, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index2);
        const chunk = this.byStart[index2];
        if (chunk) {
          chunk.appendRight(content);
        } else {
          this.outro += content;
        }
        return this;
      }
      clone() {
        const cloned = new _MagicString(this.original, { filename: this.filename });
        let originalChunk = this.firstChunk;
        let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
        while (originalChunk) {
          cloned.byStart[clonedChunk.start] = clonedChunk;
          cloned.byEnd[clonedChunk.end] = clonedChunk;
          const nextOriginalChunk = originalChunk.next;
          const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
          if (nextClonedChunk) {
            clonedChunk.next = nextClonedChunk;
            nextClonedChunk.previous = clonedChunk;
            clonedChunk = nextClonedChunk;
          }
          originalChunk = nextOriginalChunk;
        }
        cloned.lastChunk = clonedChunk;
        if (this.indentExclusionRanges) {
          cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
        }
        cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
        cloned.intro = this.intro;
        cloned.outro = this.outro;
        return cloned;
      }
      generateDecodedMap(options) {
        options = options || {};
        const sourceIndex = 0;
        const names = Object.keys(this.storedNames);
        const mappings = new Mappings(options.hires);
        const locate = getLocator(this.original);
        if (this.intro) {
          mappings.advance(this.intro);
        }
        this.firstChunk.eachNext((chunk) => {
          const loc = locate(chunk.start);
          if (chunk.intro.length)
            mappings.advance(chunk.intro);
          if (chunk.edited) {
            mappings.addEdit(
              sourceIndex,
              chunk.content,
              loc,
              chunk.storeName ? names.indexOf(chunk.original) : -1
            );
          } else {
            mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
          }
          if (chunk.outro.length)
            mappings.advance(chunk.outro);
        });
        return {
          file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
          sources: [
            options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
          ],
          sourcesContent: options.includeContent ? [this.original] : void 0,
          names,
          mappings: mappings.raw,
          x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
        };
      }
      generateMap(options) {
        return new SourceMap(this.generateDecodedMap(options));
      }
      _ensureindentStr() {
        if (this.indentStr === void 0) {
          this.indentStr = guessIndent(this.original);
        }
      }
      _getRawIndentString() {
        this._ensureindentStr();
        return this.indentStr;
      }
      getIndentString() {
        this._ensureindentStr();
        return this.indentStr === null ? "	" : this.indentStr;
      }
      indent(indentStr, options) {
        const pattern = /^[^\r\n]/gm;
        if (isObject2(indentStr)) {
          options = indentStr;
          indentStr = void 0;
        }
        if (indentStr === void 0) {
          this._ensureindentStr();
          indentStr = this.indentStr || "	";
        }
        if (indentStr === "")
          return this;
        options = options || {};
        const isExcluded = {};
        if (options.exclude) {
          const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
          exclusions.forEach((exclusion) => {
            for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
              isExcluded[i] = true;
            }
          });
        }
        let shouldIndentNextCharacter = options.indentStart !== false;
        const replacer = (match) => {
          if (shouldIndentNextCharacter)
            return `${indentStr}${match}`;
          shouldIndentNextCharacter = true;
          return match;
        };
        this.intro = this.intro.replace(pattern, replacer);
        let charIndex = 0;
        let chunk = this.firstChunk;
        while (chunk) {
          const end = chunk.end;
          if (chunk.edited) {
            if (!isExcluded[charIndex]) {
              chunk.content = chunk.content.replace(pattern, replacer);
              if (chunk.content.length) {
                shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
              }
            }
          } else {
            charIndex = chunk.start;
            while (charIndex < end) {
              if (!isExcluded[charIndex]) {
                const char = this.original[charIndex];
                if (char === "\n") {
                  shouldIndentNextCharacter = true;
                } else if (char !== "\r" && shouldIndentNextCharacter) {
                  shouldIndentNextCharacter = false;
                  if (charIndex === chunk.start) {
                    chunk.prependRight(indentStr);
                  } else {
                    this._splitChunk(chunk, charIndex);
                    chunk = chunk.next;
                    chunk.prependRight(indentStr);
                  }
                }
              }
              charIndex += 1;
            }
          }
          charIndex = chunk.end;
          chunk = chunk.next;
        }
        this.outro = this.outro.replace(pattern, replacer);
        return this;
      }
      insert() {
        throw new Error(
          "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
        );
      }
      insertLeft(index2, content) {
        if (!warned.insertLeft) {
          console.warn(
            "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
          );
          warned.insertLeft = true;
        }
        return this.appendLeft(index2, content);
      }
      insertRight(index2, content) {
        if (!warned.insertRight) {
          console.warn(
            "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
          );
          warned.insertRight = true;
        }
        return this.prependRight(index2, content);
      }
      move(start, end, index2) {
        if (index2 >= start && index2 <= end)
          throw new Error("Cannot move a selection inside itself");
        this._split(start);
        this._split(end);
        this._split(index2);
        const first = this.byStart[start];
        const last = this.byEnd[end];
        const oldLeft = first.previous;
        const oldRight = last.next;
        const newRight = this.byStart[index2];
        if (!newRight && last === this.lastChunk)
          return this;
        const newLeft = newRight ? newRight.previous : this.lastChunk;
        if (oldLeft)
          oldLeft.next = oldRight;
        if (oldRight)
          oldRight.previous = oldLeft;
        if (newLeft)
          newLeft.next = first;
        if (newRight)
          newRight.previous = last;
        if (!first.previous)
          this.firstChunk = last.next;
        if (!last.next) {
          this.lastChunk = first.previous;
          this.lastChunk.next = null;
        }
        first.previous = newLeft;
        last.next = newRight || null;
        if (!newLeft)
          this.firstChunk = first;
        if (!newRight)
          this.lastChunk = last;
        return this;
      }
      overwrite(start, end, content, options) {
        options = options || {};
        return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
      }
      update(start, end, content, options) {
        if (typeof content !== "string")
          throw new TypeError("replacement content must be a string");
        while (start < 0)
          start += this.original.length;
        while (end < 0)
          end += this.original.length;
        if (end > this.original.length)
          throw new Error("end is out of bounds");
        if (start === end)
          throw new Error(
            "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
          );
        this._split(start);
        this._split(end);
        if (options === true) {
          if (!warned.storeName) {
            console.warn(
              "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
            );
            warned.storeName = true;
          }
          options = { storeName: true };
        }
        const storeName = options !== void 0 ? options.storeName : false;
        const overwrite = options !== void 0 ? options.overwrite : false;
        if (storeName) {
          const original = this.original.slice(start, end);
          Object.defineProperty(this.storedNames, original, {
            writable: true,
            value: true,
            enumerable: true
          });
        }
        const first = this.byStart[start];
        const last = this.byEnd[end];
        if (first) {
          let chunk = first;
          while (chunk !== last) {
            if (chunk.next !== this.byStart[chunk.end]) {
              throw new Error("Cannot overwrite across a split point");
            }
            chunk = chunk.next;
            chunk.edit("", false);
          }
          first.edit(content, storeName, !overwrite);
        } else {
          const newChunk = new Chunk(start, end, "").edit(content, storeName);
          last.next = newChunk;
          newChunk.previous = last;
        }
        return this;
      }
      prepend(content) {
        if (typeof content !== "string")
          throw new TypeError("outro content must be a string");
        this.intro = content + this.intro;
        return this;
      }
      prependLeft(index2, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index2);
        const chunk = this.byEnd[index2];
        if (chunk) {
          chunk.prependLeft(content);
        } else {
          this.intro = content + this.intro;
        }
        return this;
      }
      prependRight(index2, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index2);
        const chunk = this.byStart[index2];
        if (chunk) {
          chunk.prependRight(content);
        } else {
          this.outro = content + this.outro;
        }
        return this;
      }
      remove(start, end) {
        while (start < 0)
          start += this.original.length;
        while (end < 0)
          end += this.original.length;
        if (start === end)
          return this;
        if (start < 0 || end > this.original.length)
          throw new Error("Character is out of bounds");
        if (start > end)
          throw new Error("end must be greater than start");
        this._split(start);
        this._split(end);
        let chunk = this.byStart[start];
        while (chunk) {
          chunk.intro = "";
          chunk.outro = "";
          chunk.edit("");
          chunk = end > chunk.end ? this.byStart[chunk.end] : null;
        }
        return this;
      }
      reset(start, end) {
        while (start < 0)
          start += this.original.length;
        while (end < 0)
          end += this.original.length;
        if (start === end)
          return this;
        if (start < 0 || end > this.original.length)
          throw new Error("Character is out of bounds");
        if (start > end)
          throw new Error("end must be greater than start");
        this._split(start);
        this._split(end);
        let chunk = this.byStart[start];
        while (chunk) {
          chunk.reset();
          chunk = end > chunk.end ? this.byStart[chunk.end] : null;
        }
        return this;
      }
      lastChar() {
        if (this.outro.length)
          return this.outro[this.outro.length - 1];
        let chunk = this.lastChunk;
        do {
          if (chunk.outro.length)
            return chunk.outro[chunk.outro.length - 1];
          if (chunk.content.length)
            return chunk.content[chunk.content.length - 1];
          if (chunk.intro.length)
            return chunk.intro[chunk.intro.length - 1];
        } while (chunk = chunk.previous);
        if (this.intro.length)
          return this.intro[this.intro.length - 1];
        return "";
      }
      lastLine() {
        let lineIndex = this.outro.lastIndexOf(n);
        if (lineIndex !== -1)
          return this.outro.substr(lineIndex + 1);
        let lineStr = this.outro;
        let chunk = this.lastChunk;
        do {
          if (chunk.outro.length > 0) {
            lineIndex = chunk.outro.lastIndexOf(n);
            if (lineIndex !== -1)
              return chunk.outro.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.outro + lineStr;
          }
          if (chunk.content.length > 0) {
            lineIndex = chunk.content.lastIndexOf(n);
            if (lineIndex !== -1)
              return chunk.content.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.content + lineStr;
          }
          if (chunk.intro.length > 0) {
            lineIndex = chunk.intro.lastIndexOf(n);
            if (lineIndex !== -1)
              return chunk.intro.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.intro + lineStr;
          }
        } while (chunk = chunk.previous);
        lineIndex = this.intro.lastIndexOf(n);
        if (lineIndex !== -1)
          return this.intro.substr(lineIndex + 1) + lineStr;
        return this.intro + lineStr;
      }
      slice(start = 0, end = this.original.length) {
        while (start < 0)
          start += this.original.length;
        while (end < 0)
          end += this.original.length;
        let result = "";
        let chunk = this.firstChunk;
        while (chunk && (chunk.start > start || chunk.end <= start)) {
          if (chunk.start < end && chunk.end >= end) {
            return result;
          }
          chunk = chunk.next;
        }
        if (chunk && chunk.edited && chunk.start !== start)
          throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
        const startChunk = chunk;
        while (chunk) {
          if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
            result += chunk.intro;
          }
          const containsEnd = chunk.start < end && chunk.end >= end;
          if (containsEnd && chunk.edited && chunk.end !== end)
            throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
          const sliceStart = startChunk === chunk ? start - chunk.start : 0;
          const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
          result += chunk.content.slice(sliceStart, sliceEnd);
          if (chunk.outro && (!containsEnd || chunk.end === end)) {
            result += chunk.outro;
          }
          if (containsEnd) {
            break;
          }
          chunk = chunk.next;
        }
        return result;
      }
      // TODO deprecate this? not really very useful
      snip(start, end) {
        const clone2 = this.clone();
        clone2.remove(0, start);
        clone2.remove(end, clone2.original.length);
        return clone2;
      }
      _split(index2) {
        if (this.byStart[index2] || this.byEnd[index2])
          return;
        let chunk = this.lastSearchedChunk;
        const searchForward = index2 > chunk.end;
        while (chunk) {
          if (chunk.contains(index2))
            return this._splitChunk(chunk, index2);
          chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
        }
      }
      _splitChunk(chunk, index2) {
        if (chunk.edited && chunk.content.length) {
          const loc = getLocator(this.original)(index2);
          throw new Error(
            `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
          );
        }
        const newChunk = chunk.split(index2);
        this.byEnd[index2] = chunk;
        this.byStart[index2] = newChunk;
        this.byEnd[newChunk.end] = newChunk;
        if (chunk === this.lastChunk)
          this.lastChunk = newChunk;
        this.lastSearchedChunk = chunk;
        return true;
      }
      toString() {
        let str = this.intro;
        let chunk = this.firstChunk;
        while (chunk) {
          str += chunk.toString();
          chunk = chunk.next;
        }
        return str + this.outro;
      }
      isEmpty() {
        let chunk = this.firstChunk;
        do {
          if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
            return false;
        } while (chunk = chunk.next);
        return true;
      }
      length() {
        let chunk = this.firstChunk;
        let length = 0;
        do {
          length += chunk.intro.length + chunk.content.length + chunk.outro.length;
        } while (chunk = chunk.next);
        return length;
      }
      trimLines() {
        return this.trim("[\\r\\n]");
      }
      trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      }
      trimEndAborted(charType) {
        const rx = new RegExp((charType || "\\s") + "+$");
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length)
          return true;
        let chunk = this.lastChunk;
        do {
          const end = chunk.end;
          const aborted = chunk.trimEnd(rx);
          if (chunk.end !== end) {
            if (this.lastChunk === chunk) {
              this.lastChunk = chunk.next;
            }
            this.byEnd[chunk.end] = chunk;
            this.byStart[chunk.next.start] = chunk.next;
            this.byEnd[chunk.next.end] = chunk.next;
          }
          if (aborted)
            return true;
          chunk = chunk.previous;
        } while (chunk);
        return false;
      }
      trimEnd(charType) {
        this.trimEndAborted(charType);
        return this;
      }
      trimStartAborted(charType) {
        const rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length)
          return true;
        let chunk = this.firstChunk;
        do {
          const end = chunk.end;
          const aborted = chunk.trimStart(rx);
          if (chunk.end !== end) {
            if (chunk === this.lastChunk)
              this.lastChunk = chunk.next;
            this.byEnd[chunk.end] = chunk;
            this.byStart[chunk.next.start] = chunk.next;
            this.byEnd[chunk.next.end] = chunk.next;
          }
          if (aborted)
            return true;
          chunk = chunk.next;
        } while (chunk);
        return false;
      }
      trimStart(charType) {
        this.trimStartAborted(charType);
        return this;
      }
      hasChanged() {
        return this.original !== this.toString();
      }
      _replaceRegexp(searchValue, replacement) {
        function getReplacement(match, str) {
          if (typeof replacement === "string") {
            return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
              if (i === "$")
                return "$";
              if (i === "&")
                return match[0];
              const num = +i;
              if (num < match.length)
                return match[+i];
              return `$${i}`;
            });
          } else {
            return replacement(...match, match.index, str, match.groups);
          }
        }
        function matchAll(re, str) {
          let match;
          const matches = [];
          while (match = re.exec(str)) {
            matches.push(match);
          }
          return matches;
        }
        if (searchValue.global) {
          const matches = matchAll(searchValue, this.original);
          matches.forEach((match) => {
            if (match.index != null)
              this.overwrite(
                match.index,
                match.index + match[0].length,
                getReplacement(match, this.original)
              );
          });
        } else {
          const match = this.original.match(searchValue);
          if (match && match.index != null)
            this.overwrite(
              match.index,
              match.index + match[0].length,
              getReplacement(match, this.original)
            );
        }
        return this;
      }
      _replaceString(string4, replacement) {
        const { original } = this;
        const index2 = original.indexOf(string4);
        if (index2 !== -1) {
          this.overwrite(index2, index2 + string4.length, replacement);
        }
        return this;
      }
      replace(searchValue, replacement) {
        if (typeof searchValue === "string") {
          return this._replaceString(searchValue, replacement);
        }
        return this._replaceRegexp(searchValue, replacement);
      }
      _replaceAllString(string4, replacement) {
        const { original } = this;
        const stringLength = string4.length;
        for (let index2 = original.indexOf(string4); index2 !== -1; index2 = original.indexOf(string4, index2 + stringLength)) {
          this.overwrite(index2, index2 + stringLength, replacement);
        }
        return this;
      }
      replaceAll(searchValue, replacement) {
        if (typeof searchValue === "string") {
          return this._replaceAllString(searchValue, replacement);
        }
        if (!searchValue.global) {
          throw new TypeError(
            "MagicString.prototype.replaceAll called with a non-global RegExp argument"
          );
        }
        return this._replaceRegexp(searchValue, replacement);
      }
    };
    hasOwnProp = Object.prototype.hasOwnProperty;
    Bundle = class _Bundle {
      constructor(options = {}) {
        this.intro = options.intro || "";
        this.separator = options.separator !== void 0 ? options.separator : "\n";
        this.sources = [];
        this.uniqueSources = [];
        this.uniqueSourceIndexByFilename = {};
      }
      addSource(source) {
        if (source instanceof MagicString) {
          return this.addSource({
            content: source,
            filename: source.filename,
            separator: this.separator
          });
        }
        if (!isObject2(source) || !source.content) {
          throw new Error(
            "bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`"
          );
        }
        ["filename", "ignoreList", "indentExclusionRanges", "separator"].forEach((option) => {
          if (!hasOwnProp.call(source, option))
            source[option] = source.content[option];
        });
        if (source.separator === void 0) {
          source.separator = this.separator;
        }
        if (source.filename) {
          if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
            this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
            this.uniqueSources.push({ filename: source.filename, content: source.content.original });
          } else {
            const uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
            if (source.content.original !== uniqueSource.content) {
              throw new Error(`Illegal source: same filename (${source.filename}), different contents`);
            }
          }
        }
        this.sources.push(source);
        return this;
      }
      append(str, options) {
        this.addSource({
          content: new MagicString(str),
          separator: options && options.separator || ""
        });
        return this;
      }
      clone() {
        const bundle = new _Bundle({
          intro: this.intro,
          separator: this.separator
        });
        this.sources.forEach((source) => {
          bundle.addSource({
            filename: source.filename,
            content: source.content.clone(),
            separator: source.separator
          });
        });
        return bundle;
      }
      generateDecodedMap(options = {}) {
        const names = [];
        let x_google_ignoreList = void 0;
        this.sources.forEach((source) => {
          Object.keys(source.content.storedNames).forEach((name) => {
            if (!~names.indexOf(name))
              names.push(name);
          });
        });
        const mappings = new Mappings(options.hires);
        if (this.intro) {
          mappings.advance(this.intro);
        }
        this.sources.forEach((source, i) => {
          if (i > 0) {
            mappings.advance(this.separator);
          }
          const sourceIndex = source.filename ? this.uniqueSourceIndexByFilename[source.filename] : -1;
          const magicString = source.content;
          const locate = getLocator(magicString.original);
          if (magicString.intro) {
            mappings.advance(magicString.intro);
          }
          magicString.firstChunk.eachNext((chunk) => {
            const loc = locate(chunk.start);
            if (chunk.intro.length)
              mappings.advance(chunk.intro);
            if (source.filename) {
              if (chunk.edited) {
                mappings.addEdit(
                  sourceIndex,
                  chunk.content,
                  loc,
                  chunk.storeName ? names.indexOf(chunk.original) : -1
                );
              } else {
                mappings.addUneditedChunk(
                  sourceIndex,
                  chunk,
                  magicString.original,
                  loc,
                  magicString.sourcemapLocations
                );
              }
            } else {
              mappings.advance(chunk.content);
            }
            if (chunk.outro.length)
              mappings.advance(chunk.outro);
          });
          if (magicString.outro) {
            mappings.advance(magicString.outro);
          }
          if (source.ignoreList && sourceIndex !== -1) {
            if (x_google_ignoreList === void 0) {
              x_google_ignoreList = [];
            }
            x_google_ignoreList.push(sourceIndex);
          }
        });
        return {
          file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
          sources: this.uniqueSources.map((source) => {
            return options.file ? getRelativePath(options.file, source.filename) : source.filename;
          }),
          sourcesContent: this.uniqueSources.map((source) => {
            return options.includeContent ? source.content : null;
          }),
          names,
          mappings: mappings.raw,
          x_google_ignoreList
        };
      }
      generateMap(options) {
        return new SourceMap(this.generateDecodedMap(options));
      }
      getIndentString() {
        const indentStringCounts = {};
        this.sources.forEach((source) => {
          const indentStr = source.content._getRawIndentString();
          if (indentStr === null)
            return;
          if (!indentStringCounts[indentStr])
            indentStringCounts[indentStr] = 0;
          indentStringCounts[indentStr] += 1;
        });
        return Object.keys(indentStringCounts).sort((a, b2) => {
          return indentStringCounts[a] - indentStringCounts[b2];
        })[0] || "	";
      }
      indent(indentStr) {
        if (!arguments.length) {
          indentStr = this.getIndentString();
        }
        if (indentStr === "")
          return this;
        let trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
        this.sources.forEach((source, i) => {
          const separator = source.separator !== void 0 ? source.separator : this.separator;
          const indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
          source.content.indent(indentStr, {
            exclude: source.indentExclusionRanges,
            indentStart
            //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
          });
          trailingNewline = source.content.lastChar() === "\n";
        });
        if (this.intro) {
          this.intro = indentStr + this.intro.replace(/^[^\n]/gm, (match, index2) => {
            return index2 > 0 ? indentStr + match : match;
          });
        }
        return this;
      }
      prepend(str) {
        this.intro = str + this.intro;
        return this;
      }
      toString() {
        const body = this.sources.map((source, i) => {
          const separator = source.separator !== void 0 ? source.separator : this.separator;
          const str = (i > 0 ? separator : "") + source.content.toString();
          return str;
        }).join("");
        return this.intro + body;
      }
      isEmpty() {
        if (this.intro.length && this.intro.trim())
          return false;
        if (this.sources.some((source) => !source.content.isEmpty()))
          return false;
        return true;
      }
      length() {
        return this.sources.reduce(
          (length, source) => length + source.content.length(),
          this.intro.length
        );
      }
      trimLines() {
        return this.trim("[\\r\\n]");
      }
      trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      }
      trimStart(charType) {
        const rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (!this.intro) {
          let source;
          let i = 0;
          do {
            source = this.sources[i++];
            if (!source) {
              break;
            }
          } while (!source.content.trimStartAborted(charType));
        }
        return this;
      }
      trimEnd(charType) {
        const rx = new RegExp((charType || "\\s") + "+$");
        let source;
        let i = this.sources.length - 1;
        do {
          source = this.sources[i--];
          if (!source) {
            this.intro = this.intro.replace(rx, "");
            break;
          }
        } while (!source.content.trimEndAborted(charType));
        return this;
      }
    };
  }
});

// ../../node_modules/.pnpm/@vitest+utils@0.34.6/node_modules/@vitest/utils/dist/helpers.js
function assertTypes(value, name, types) {
  const receivedType = typeof value;
  const pass = types.includes(receivedType);
  if (!pass)
    throw new TypeError(`${name} value must be ${types.join(" or ")}, received "${receivedType}"`);
}
function isObject(item) {
  return item != null && typeof item === "object" && !Array.isArray(item);
}
function isFinalObj(obj) {
  return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function getType(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}
function collectOwnProperties(obj, collector) {
  const collect = typeof collector === "function" ? collector : (key) => collector.add(key);
  Object.getOwnPropertyNames(obj).forEach(collect);
  Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getOwnProperties(obj) {
  const ownProps = /* @__PURE__ */ new Set();
  if (isFinalObj(obj))
    return [];
  collectOwnProperties(obj, ownProps);
  return Array.from(ownProps);
}
var defaultCloneOptions = { forceWritable: false };
function deepClone(val, options = defaultCloneOptions) {
  const seen = /* @__PURE__ */ new WeakMap();
  return clone(val, seen, options);
}
function clone(val, seen, options = defaultCloneOptions) {
  let k, out;
  if (seen.has(val))
    return seen.get(val);
  if (Array.isArray(val)) {
    out = Array(k = val.length);
    seen.set(val, out);
    while (k--)
      out[k] = clone(val[k], seen);
    return out;
  }
  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = Object.create(Object.getPrototypeOf(val));
    seen.set(val, out);
    const props = getOwnProperties(val);
    for (const k2 of props) {
      const descriptor = Object.getOwnPropertyDescriptor(val, k2);
      if (!descriptor)
        continue;
      const cloned = clone(val[k2], seen);
      if ("get" in descriptor) {
        Object.defineProperty(out, k2, {
          ...descriptor,
          get() {
            return cloned;
          }
        });
      } else {
        Object.defineProperty(out, k2, {
          ...descriptor,
          writable: options.forceWritable ? true : descriptor.writable,
          value: cloned
        });
      }
    }
    return out;
  }
  return val;
}
function noop() {
}
function objectAttr(source, path2, defaultValue = void 0) {
  const paths = path2.replace(/\[(\d+)\]/g, ".$1").split(".");
  let result = source;
  for (const p2 of paths) {
    result = Object(result)[p2];
    if (result === void 0)
      return defaultValue;
  }
  return result;
}

// ../../node_modules/.pnpm/@vitest+utils@0.34.6/node_modules/@vitest/utils/dist/chunk-display.js
var import_pretty_format = __toESM(require_build(), 1);
init_loupe();
var {
  AsymmetricMatcher,
  DOMCollection,
  DOMElement,
  Immutable,
  ReactElement,
  ReactTestComponent
} = import_pretty_format.plugins;
var PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher
];
function stringify(object3, maxDepth = 10, { maxLength, ...options } = {}) {
  const MAX_LENGTH = maxLength ?? 1e4;
  let result;
  try {
    result = (0, import_pretty_format.format)(object3, {
      maxDepth,
      escapeString: false,
      // min: true,
      plugins: PLUGINS,
      ...options
    });
  } catch {
    result = (0, import_pretty_format.format)(object3, {
      callToJSON: false,
      maxDepth,
      escapeString: false,
      // min: true,
      plugins: PLUGINS,
      ...options
    });
  }
  return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify(object3, Math.floor(maxDepth / 2)) : result;
}
var formatRegExp = /%[sdjifoOcj%]/g;
function format(...args) {
  if (typeof args[0] !== "string") {
    const objects = [];
    for (let i2 = 0; i2 < args.length; i2++)
      objects.push(inspect2(args[i2], { depth: 0, colors: false, compact: 3 }));
    return objects.join(" ");
  }
  const len = args.length;
  let i = 1;
  const template = args[0];
  let str = String(template).replace(formatRegExp, (x) => {
    if (x === "%%")
      return "%";
    if (i >= len)
      return x;
    switch (x) {
      case "%s": {
        const value = args[i++];
        if (typeof value === "bigint")
          return `${value.toString()}n`;
        if (typeof value === "number" && value === 0 && 1 / value < 0)
          return "-0";
        if (typeof value === "object" && value !== null)
          return inspect2(value, { depth: 0, colors: false, compact: 3 });
        return String(value);
      }
      case "%d": {
        const value = args[i++];
        if (typeof value === "bigint")
          return `${value.toString()}n`;
        return Number(value).toString();
      }
      case "%i": {
        const value = args[i++];
        if (typeof value === "bigint")
          return `${value.toString()}n`;
        return Number.parseInt(String(value)).toString();
      }
      case "%f":
        return Number.parseFloat(String(args[i++])).toString();
      case "%o":
        return inspect2(args[i++], { showHidden: true, showProxy: true });
      case "%O":
        return inspect2(args[i++]);
      case "%c": {
        i++;
        return "";
      }
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (err) {
          const m2 = err.message;
          if (
            // chromium
            m2.includes("circular structure") || m2.includes("cyclic structures") || m2.includes("cyclic object")
          )
            return "[Circular]";
          throw err;
        }
      default:
        return x;
    }
  });
  for (let x = args[i]; i < len; x = args[++i]) {
    if (x === null || typeof x !== "object")
      str += ` ${x}`;
    else
      str += ` ${inspect2(x)}`;
  }
  return str;
}
function inspect2(obj, options = {}) {
  if (options.truncate === 0)
    options.truncate = Number.POSITIVE_INFINITY;
  return inspect(obj, options);
}
function objDisplay(obj, options = {}) {
  const truncateThreshold = options.truncate ?? 40;
  const str = inspect2(obj, options);
  const type2 = Object.prototype.toString.call(obj);
  if (truncateThreshold && str.length >= truncateThreshold) {
    if (type2 === "[object Function]") {
      const fn2 = obj;
      return !fn2.name || fn2.name === "" ? "[Function]" : `[Function: ${fn2.name}]`;
    } else if (type2 === "[object Array]") {
      return `[ Array(${obj.length}) ]`;
    } else if (type2 === "[object Object]") {
      const keys2 = Object.keys(obj);
      const kstr = keys2.length > 2 ? `${keys2.splice(0, 2).join(", ")}, ...` : keys2.join(", ");
      return `{ Object (${kstr}) }`;
    } else {
      return str;
    }
  }
  return str;
}

// ../../node_modules/.pnpm/@vitest+utils@0.34.6/node_modules/@vitest/utils/dist/chunk-colors.js
var SAFE_TIMERS_SYMBOL = Symbol("vitest:SAFE_TIMERS");
var SAFE_COLORS_SYMBOL = Symbol("vitest:SAFE_COLORS");
var colorsMap = {
  bold: ["\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"],
  dim: ["\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"],
  italic: ["\x1B[3m", "\x1B[23m"],
  underline: ["\x1B[4m", "\x1B[24m"],
  inverse: ["\x1B[7m", "\x1B[27m"],
  hidden: ["\x1B[8m", "\x1B[28m"],
  strikethrough: ["\x1B[9m", "\x1B[29m"],
  black: ["\x1B[30m", "\x1B[39m"],
  red: ["\x1B[31m", "\x1B[39m"],
  green: ["\x1B[32m", "\x1B[39m"],
  yellow: ["\x1B[33m", "\x1B[39m"],
  blue: ["\x1B[34m", "\x1B[39m"],
  magenta: ["\x1B[35m", "\x1B[39m"],
  cyan: ["\x1B[36m", "\x1B[39m"],
  white: ["\x1B[37m", "\x1B[39m"],
  gray: ["\x1B[90m", "\x1B[39m"],
  bgBlack: ["\x1B[40m", "\x1B[49m"],
  bgRed: ["\x1B[41m", "\x1B[49m"],
  bgGreen: ["\x1B[42m", "\x1B[49m"],
  bgYellow: ["\x1B[43m", "\x1B[49m"],
  bgBlue: ["\x1B[44m", "\x1B[49m"],
  bgMagenta: ["\x1B[45m", "\x1B[49m"],
  bgCyan: ["\x1B[46m", "\x1B[49m"],
  bgWhite: ["\x1B[47m", "\x1B[49m"]
};
var colorsEntries = Object.entries(colorsMap);
function string(str) {
  return String(str);
}
string.open = "";
string.close = "";
var defaultColors = /* @__PURE__ */ colorsEntries.reduce((acc, [key]) => {
  acc[key] = string;
  return acc;
}, { isColorSupported: false });
function getColors() {
  return globalThis[SAFE_COLORS_SYMBOL] || defaultColors;
}

// ../../node_modules/.pnpm/@vitest+utils@0.34.6/node_modules/@vitest/utils/dist/index.js
var import_pretty_format2 = __toESM(require_build(), 1);
init_loupe();
function getSafeTimers() {
  const {
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout,
    setImmediate: safeSetImmediate,
    clearImmediate: safeClearImmediate
  } = globalThis[SAFE_TIMERS_SYMBOL] || globalThis;
  const {
    nextTick: safeNextTick
  } = globalThis[SAFE_TIMERS_SYMBOL] || globalThis.process || { nextTick: (cb) => cb() };
  return {
    nextTick: safeNextTick,
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout,
    setImmediate: safeSetImmediate,
    clearImmediate: safeClearImmediate
  };
}
function createSimpleStackTrace(options) {
  const { message = "error", stackTraceLimit = 1 } = options || {};
  const limit = Error.stackTraceLimit;
  const prepareStackTrace = Error.prepareStackTrace;
  Error.stackTraceLimit = stackTraceLimit;
  Error.prepareStackTrace = (e) => e.stack;
  const err = new Error(message);
  const stackTrace = err.stack || "";
  Error.prepareStackTrace = prepareStackTrace;
  Error.stackTraceLimit = limit;
  return stackTrace;
}

// ../../node_modules/.pnpm/@vitest+utils@0.34.6/node_modules/@vitest/utils/dist/diff.js
var import_pretty_format3 = __toESM(require_build(), 1);
var diff$1 = __toESM(require_build2(), 1);
function getType2(value) {
  if (value === void 0) {
    return "undefined";
  } else if (value === null) {
    return "null";
  } else if (Array.isArray(value)) {
    return "array";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (typeof value === "function") {
    return "function";
  } else if (typeof value === "number") {
    return "number";
  } else if (typeof value === "string") {
    return "string";
  } else if (typeof value === "bigint") {
    return "bigint";
  } else if (typeof value === "object") {
    if (value != null) {
      if (value.constructor === RegExp)
        return "regexp";
      else if (value.constructor === Map)
        return "map";
      else if (value.constructor === Set)
        return "set";
      else if (value.constructor === Date)
        return "date";
    }
    return "object";
  } else if (typeof value === "symbol") {
    return "symbol";
  }
  throw new Error(`value of unknown type: ${value}`);
}
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;
var Diff = class {
  0;
  1;
  constructor(op, text) {
    this[0] = op;
    this[1] = text;
  }
};
var NO_DIFF_MESSAGE = "Compared values have no visual difference.";
var SIMILAR_MESSAGE = "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.";
function formatTrailingSpaces(line, trailingSpaceFormatter) {
  return line.replace(/\s+$/, (match) => trailingSpaceFormatter(match));
}
function printDiffLine(line, isFirstOrLast, color, indicator, trailingSpaceFormatter, emptyFirstOrLastLinePlaceholder) {
  return line.length !== 0 ? color(
    `${indicator} ${formatTrailingSpaces(line, trailingSpaceFormatter)}`
  ) : indicator !== " " ? color(indicator) : isFirstOrLast && emptyFirstOrLastLinePlaceholder.length !== 0 ? color(`${indicator} ${emptyFirstOrLastLinePlaceholder}`) : "";
}
function printDeleteLine(line, isFirstOrLast, {
  aColor,
  aIndicator,
  changeLineTrailingSpaceColor,
  emptyFirstOrLastLinePlaceholder
}) {
  return printDiffLine(
    line,
    isFirstOrLast,
    aColor,
    aIndicator,
    changeLineTrailingSpaceColor,
    emptyFirstOrLastLinePlaceholder
  );
}
function printInsertLine(line, isFirstOrLast, {
  bColor,
  bIndicator,
  changeLineTrailingSpaceColor,
  emptyFirstOrLastLinePlaceholder
}) {
  return printDiffLine(
    line,
    isFirstOrLast,
    bColor,
    bIndicator,
    changeLineTrailingSpaceColor,
    emptyFirstOrLastLinePlaceholder
  );
}
function printCommonLine(line, isFirstOrLast, {
  commonColor,
  commonIndicator,
  commonLineTrailingSpaceColor,
  emptyFirstOrLastLinePlaceholder
}) {
  return printDiffLine(
    line,
    isFirstOrLast,
    commonColor,
    commonIndicator,
    commonLineTrailingSpaceColor,
    emptyFirstOrLastLinePlaceholder
  );
}
function createPatchMark(aStart, aEnd, bStart, bEnd, { patchColor }) {
  return patchColor(
    `@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`
  );
}
function joinAlignedDiffsNoExpand(diffs, options) {
  const iLength = diffs.length;
  const nContextLines = options.contextLines;
  const nContextLines2 = nContextLines + nContextLines;
  let jLength = iLength;
  let hasExcessAtStartOrEnd = false;
  let nExcessesBetweenChanges = 0;
  let i = 0;
  while (i !== iLength) {
    const iStart = i;
    while (i !== iLength && diffs[i][0] === DIFF_EQUAL)
      i += 1;
    if (iStart !== i) {
      if (iStart === 0) {
        if (i > nContextLines) {
          jLength -= i - nContextLines;
          hasExcessAtStartOrEnd = true;
        }
      } else if (i === iLength) {
        const n2 = i - iStart;
        if (n2 > nContextLines) {
          jLength -= n2 - nContextLines;
          hasExcessAtStartOrEnd = true;
        }
      } else {
        const n2 = i - iStart;
        if (n2 > nContextLines2) {
          jLength -= n2 - nContextLines2;
          nExcessesBetweenChanges += 1;
        }
      }
    }
    while (i !== iLength && diffs[i][0] !== DIFF_EQUAL)
      i += 1;
  }
  const hasPatch = nExcessesBetweenChanges !== 0 || hasExcessAtStartOrEnd;
  if (nExcessesBetweenChanges !== 0)
    jLength += nExcessesBetweenChanges + 1;
  else if (hasExcessAtStartOrEnd)
    jLength += 1;
  const jLast = jLength - 1;
  const lines = [];
  let jPatchMark = 0;
  if (hasPatch)
    lines.push("");
  let aStart = 0;
  let bStart = 0;
  let aEnd = 0;
  let bEnd = 0;
  const pushCommonLine = (line) => {
    const j = lines.length;
    lines.push(printCommonLine(line, j === 0 || j === jLast, options));
    aEnd += 1;
    bEnd += 1;
  };
  const pushDeleteLine = (line) => {
    const j = lines.length;
    lines.push(printDeleteLine(line, j === 0 || j === jLast, options));
    aEnd += 1;
  };
  const pushInsertLine = (line) => {
    const j = lines.length;
    lines.push(printInsertLine(line, j === 0 || j === jLast, options));
    bEnd += 1;
  };
  i = 0;
  while (i !== iLength) {
    let iStart = i;
    while (i !== iLength && diffs[i][0] === DIFF_EQUAL)
      i += 1;
    if (iStart !== i) {
      if (iStart === 0) {
        if (i > nContextLines) {
          iStart = i - nContextLines;
          aStart = iStart;
          bStart = iStart;
          aEnd = aStart;
          bEnd = bStart;
        }
        for (let iCommon = iStart; iCommon !== i; iCommon += 1)
          pushCommonLine(diffs[iCommon][1]);
      } else if (i === iLength) {
        const iEnd = i - iStart > nContextLines ? iStart + nContextLines : i;
        for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1)
          pushCommonLine(diffs[iCommon][1]);
      } else {
        const nCommon = i - iStart;
        if (nCommon > nContextLines2) {
          const iEnd = iStart + nContextLines;
          for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1)
            pushCommonLine(diffs[iCommon][1]);
          lines[jPatchMark] = createPatchMark(
            aStart,
            aEnd,
            bStart,
            bEnd,
            options
          );
          jPatchMark = lines.length;
          lines.push("");
          const nOmit = nCommon - nContextLines2;
          aStart = aEnd + nOmit;
          bStart = bEnd + nOmit;
          aEnd = aStart;
          bEnd = bStart;
          for (let iCommon = i - nContextLines; iCommon !== i; iCommon += 1)
            pushCommonLine(diffs[iCommon][1]);
        } else {
          for (let iCommon = iStart; iCommon !== i; iCommon += 1)
            pushCommonLine(diffs[iCommon][1]);
        }
      }
    }
    while (i !== iLength && diffs[i][0] === DIFF_DELETE) {
      pushDeleteLine(diffs[i][1]);
      i += 1;
    }
    while (i !== iLength && diffs[i][0] === DIFF_INSERT) {
      pushInsertLine(diffs[i][1]);
      i += 1;
    }
  }
  if (hasPatch)
    lines[jPatchMark] = createPatchMark(aStart, aEnd, bStart, bEnd, options);
  return lines.join("\n");
}
function joinAlignedDiffsExpand(diffs, options) {
  return diffs.map((diff2, i, diffs2) => {
    const line = diff2[1];
    const isFirstOrLast = i === 0 || i === diffs2.length - 1;
    switch (diff2[0]) {
      case DIFF_DELETE:
        return printDeleteLine(line, isFirstOrLast, options);
      case DIFF_INSERT:
        return printInsertLine(line, isFirstOrLast, options);
      default:
        return printCommonLine(line, isFirstOrLast, options);
    }
  }).join("\n");
}
var noColor = (string4) => string4;
var DIFF_CONTEXT_DEFAULT = 5;
function getDefaultOptions() {
  const c = getColors();
  return {
    aAnnotation: "Expected",
    aColor: c.green,
    aIndicator: "-",
    bAnnotation: "Received",
    bColor: c.red,
    bIndicator: "+",
    changeColor: c.inverse,
    changeLineTrailingSpaceColor: noColor,
    commonColor: c.dim,
    commonIndicator: " ",
    commonLineTrailingSpaceColor: noColor,
    compareKeys: void 0,
    contextLines: DIFF_CONTEXT_DEFAULT,
    emptyFirstOrLastLinePlaceholder: "",
    expand: true,
    includeChangeCounts: false,
    omitAnnotationLines: false,
    patchColor: c.yellow
  };
}
function getCompareKeys(compareKeys) {
  return compareKeys && typeof compareKeys === "function" ? compareKeys : void 0;
}
function getContextLines(contextLines) {
  return typeof contextLines === "number" && Number.isSafeInteger(contextLines) && contextLines >= 0 ? contextLines : DIFF_CONTEXT_DEFAULT;
}
function normalizeDiffOptions(options = {}) {
  return {
    ...getDefaultOptions(),
    ...options,
    compareKeys: getCompareKeys(options.compareKeys),
    contextLines: getContextLines(options.contextLines)
  };
}
function isEmptyString(lines) {
  return lines.length === 1 && lines[0].length === 0;
}
function countChanges(diffs) {
  let a = 0;
  let b2 = 0;
  diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE:
        a += 1;
        break;
      case DIFF_INSERT:
        b2 += 1;
        break;
    }
  });
  return { a, b: b2 };
}
function printAnnotation({
  aAnnotation,
  aColor,
  aIndicator,
  bAnnotation,
  bColor,
  bIndicator,
  includeChangeCounts,
  omitAnnotationLines
}, changeCounts) {
  if (omitAnnotationLines)
    return "";
  let aRest = "";
  let bRest = "";
  if (includeChangeCounts) {
    const aCount = String(changeCounts.a);
    const bCount = String(changeCounts.b);
    const baAnnotationLengthDiff = bAnnotation.length - aAnnotation.length;
    const aAnnotationPadding = " ".repeat(Math.max(0, baAnnotationLengthDiff));
    const bAnnotationPadding = " ".repeat(Math.max(0, -baAnnotationLengthDiff));
    const baCountLengthDiff = bCount.length - aCount.length;
    const aCountPadding = " ".repeat(Math.max(0, baCountLengthDiff));
    const bCountPadding = " ".repeat(Math.max(0, -baCountLengthDiff));
    aRest = `${aAnnotationPadding}  ${aIndicator} ${aCountPadding}${aCount}`;
    bRest = `${bAnnotationPadding}  ${bIndicator} ${bCountPadding}${bCount}`;
  }
  const a = `${aIndicator} ${aAnnotation}${aRest}`;
  const b2 = `${bIndicator} ${bAnnotation}${bRest}`;
  return `${aColor(a)}
${bColor(b2)}

`;
}
function printDiffLines(diffs, options) {
  return printAnnotation(options, countChanges(diffs)) + (options.expand ? joinAlignedDiffsExpand(diffs, options) : joinAlignedDiffsNoExpand(diffs, options));
}
function diffLinesUnified(aLines, bLines, options) {
  return printDiffLines(
    diffLinesRaw(
      isEmptyString(aLines) ? [] : aLines,
      isEmptyString(bLines) ? [] : bLines
    ),
    normalizeDiffOptions(options)
  );
}
function diffLinesUnified2(aLinesDisplay, bLinesDisplay, aLinesCompare, bLinesCompare, options) {
  if (isEmptyString(aLinesDisplay) && isEmptyString(aLinesCompare)) {
    aLinesDisplay = [];
    aLinesCompare = [];
  }
  if (isEmptyString(bLinesDisplay) && isEmptyString(bLinesCompare)) {
    bLinesDisplay = [];
    bLinesCompare = [];
  }
  if (aLinesDisplay.length !== aLinesCompare.length || bLinesDisplay.length !== bLinesCompare.length) {
    return diffLinesUnified(aLinesDisplay, bLinesDisplay, options);
  }
  const diffs = diffLinesRaw(aLinesCompare, bLinesCompare);
  let aIndex = 0;
  let bIndex = 0;
  diffs.forEach((diff2) => {
    switch (diff2[0]) {
      case DIFF_DELETE:
        diff2[1] = aLinesDisplay[aIndex];
        aIndex += 1;
        break;
      case DIFF_INSERT:
        diff2[1] = bLinesDisplay[bIndex];
        bIndex += 1;
        break;
      default:
        diff2[1] = bLinesDisplay[bIndex];
        aIndex += 1;
        bIndex += 1;
    }
  });
  return printDiffLines(diffs, normalizeDiffOptions(options));
}
function diffLinesRaw(aLines, bLines) {
  const aLength = aLines.length;
  const bLength = bLines.length;
  const isCommon = (aIndex2, bIndex2) => aLines[aIndex2] === bLines[bIndex2];
  const diffs = [];
  let aIndex = 0;
  let bIndex = 0;
  const foundSubsequence = (nCommon, aCommon, bCommon) => {
    for (; aIndex !== aCommon; aIndex += 1)
      diffs.push(new Diff(DIFF_DELETE, aLines[aIndex]));
    for (; bIndex !== bCommon; bIndex += 1)
      diffs.push(new Diff(DIFF_INSERT, bLines[bIndex]));
    for (; nCommon !== 0; nCommon -= 1, aIndex += 1, bIndex += 1)
      diffs.push(new Diff(DIFF_EQUAL, bLines[bIndex]));
  };
  const diffSequences = diff$1.default.default || diff$1.default;
  diffSequences(aLength, bLength, isCommon, foundSubsequence);
  for (; aIndex !== aLength; aIndex += 1)
    diffs.push(new Diff(DIFF_DELETE, aLines[aIndex]));
  for (; bIndex !== bLength; bIndex += 1)
    diffs.push(new Diff(DIFF_INSERT, bLines[bIndex]));
  return diffs;
}
function getCommonMessage(message, options) {
  const { commonColor } = normalizeDiffOptions(options);
  return commonColor(message);
}
var {
  AsymmetricMatcher: AsymmetricMatcher2,
  DOMCollection: DOMCollection2,
  DOMElement: DOMElement2,
  Immutable: Immutable2,
  ReactElement: ReactElement2,
  ReactTestComponent: ReactTestComponent2
} = import_pretty_format3.plugins;
var PLUGINS2 = [
  ReactTestComponent2,
  ReactElement2,
  DOMElement2,
  DOMCollection2,
  Immutable2,
  AsymmetricMatcher2
];
var FORMAT_OPTIONS = {
  plugins: PLUGINS2
};
var FALLBACK_FORMAT_OPTIONS = {
  callToJSON: false,
  maxDepth: 10,
  plugins: PLUGINS2
};
function diff(a, b2, options) {
  if (Object.is(a, b2))
    return "";
  const aType = getType2(a);
  let expectedType = aType;
  let omitDifference = false;
  if (aType === "object" && typeof a.asymmetricMatch === "function") {
    if (a.$$typeof !== Symbol.for("jest.asymmetricMatcher")) {
      return null;
    }
    if (typeof a.getExpectedType !== "function") {
      return null;
    }
    expectedType = a.getExpectedType();
    omitDifference = expectedType === "string";
  }
  if (expectedType !== getType2(b2)) {
    const { aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator } = normalizeDiffOptions(options);
    const formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options);
    const aDisplay = (0, import_pretty_format3.format)(a, formatOptions);
    const bDisplay = (0, import_pretty_format3.format)(b2, formatOptions);
    const aDiff = `${aColor(`${aIndicator} ${aAnnotation}:`)} 
${aDisplay}`;
    const bDiff = `${bColor(`${bIndicator} ${bAnnotation}:`)} 
${bDisplay}`;
    return `${aDiff}

${bDiff}`;
  }
  if (omitDifference)
    return null;
  switch (aType) {
    case "string":
      return diffLinesUnified(a.split("\n"), b2.split("\n"), options);
    case "boolean":
    case "number":
      return comparePrimitive(a, b2, options);
    case "map":
      return compareObjects(sortMap(a), sortMap(b2), options);
    case "set":
      return compareObjects(sortSet(a), sortSet(b2), options);
    default:
      return compareObjects(a, b2, options);
  }
}
function comparePrimitive(a, b2, options) {
  const aFormat = (0, import_pretty_format3.format)(a, FORMAT_OPTIONS);
  const bFormat = (0, import_pretty_format3.format)(b2, FORMAT_OPTIONS);
  return aFormat === bFormat ? "" : diffLinesUnified(aFormat.split("\n"), bFormat.split("\n"), options);
}
function sortMap(map2) {
  return new Map(Array.from(map2.entries()).sort());
}
function sortSet(set3) {
  return new Set(Array.from(set3.values()).sort());
}
function compareObjects(a, b2, options) {
  let difference;
  let hasThrown = false;
  try {
    const formatOptions = getFormatOptions(FORMAT_OPTIONS, options);
    difference = getObjectsDifference(a, b2, formatOptions, options);
  } catch {
    hasThrown = true;
  }
  const noDiffMessage = getCommonMessage(NO_DIFF_MESSAGE, options);
  if (difference === void 0 || difference === noDiffMessage) {
    const formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options);
    difference = getObjectsDifference(a, b2, formatOptions, options);
    if (difference !== noDiffMessage && !hasThrown) {
      difference = `${getCommonMessage(
        SIMILAR_MESSAGE,
        options
      )}

${difference}`;
    }
  }
  return difference;
}
function getFormatOptions(formatOptions, options) {
  const { compareKeys } = normalizeDiffOptions(options);
  return {
    ...formatOptions,
    compareKeys
  };
}
function getObjectsDifference(a, b2, formatOptions, options) {
  const formatOptionsZeroIndent = { ...formatOptions, indent: 0 };
  const aCompare = (0, import_pretty_format3.format)(a, formatOptionsZeroIndent);
  const bCompare = (0, import_pretty_format3.format)(b2, formatOptionsZeroIndent);
  if (aCompare === bCompare) {
    return getCommonMessage(NO_DIFF_MESSAGE, options);
  } else {
    const aDisplay = (0, import_pretty_format3.format)(a, formatOptions);
    const bDisplay = (0, import_pretty_format3.format)(b2, formatOptions);
    return diffLinesUnified2(
      aDisplay.split("\n"),
      bDisplay.split("\n"),
      aCompare.split("\n"),
      bCompare.split("\n"),
      options
    );
  }
}

// ../../node_modules/.pnpm/@vitest+utils@0.34.6/node_modules/@vitest/utils/dist/error.js
var import_pretty_format4 = __toESM(require_build(), 1);
var import_diff_sequences = __toESM(require_build2(), 1);
init_loupe();
var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isImmutable(v2) {
  return v2 && (v2[IS_COLLECTION_SYMBOL] || v2[IS_RECORD_SYMBOL]);
}
var OBJECT_PROTO = Object.getPrototypeOf({});
function getUnserializableMessage(err) {
  if (err instanceof Error)
    return `<unserializable>: ${err.message}`;
  if (typeof err === "string")
    return `<unserializable>: ${err}`;
  return "<unserializable>";
}
function serializeError(val, seen = /* @__PURE__ */ new WeakMap()) {
  if (!val || typeof val === "string")
    return val;
  if (typeof val === "function")
    return `Function<${val.name || "anonymous"}>`;
  if (typeof val === "symbol")
    return val.toString();
  if (typeof val !== "object")
    return val;
  if (isImmutable(val))
    return serializeError(val.toJSON(), seen);
  if (val instanceof Promise || val.constructor && val.constructor.prototype === "AsyncFunction")
    return "Promise";
  if (typeof Element !== "undefined" && val instanceof Element)
    return val.tagName;
  if (typeof val.asymmetricMatch === "function")
    return `${val.toString()} ${format(val.sample)}`;
  if (seen.has(val))
    return seen.get(val);
  if (Array.isArray(val)) {
    const clone2 = new Array(val.length);
    seen.set(val, clone2);
    val.forEach((e, i) => {
      try {
        clone2[i] = serializeError(e, seen);
      } catch (err) {
        clone2[i] = getUnserializableMessage(err);
      }
    });
    return clone2;
  } else {
    const clone2 = /* @__PURE__ */ Object.create(null);
    seen.set(val, clone2);
    let obj = val;
    while (obj && obj !== OBJECT_PROTO) {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        if (key in clone2)
          return;
        try {
          clone2[key] = serializeError(val[key], seen);
        } catch (err) {
          delete clone2[key];
          clone2[key] = getUnserializableMessage(err);
        }
      });
      obj = Object.getPrototypeOf(obj);
    }
    return clone2;
  }
}
function normalizeErrorMessage(message) {
  return message.replace(/__vite_ssr_import_\d+__\./g, "");
}
function processError(err, diffOptions) {
  if (!err || typeof err !== "object")
    return { message: err };
  if (err.stack)
    err.stackStr = String(err.stack);
  if (err.name)
    err.nameStr = String(err.name);
  if (err.showDiff || err.showDiff === void 0 && err.expected !== void 0 && err.actual !== void 0) {
    const clonedActual = deepClone(err.actual, { forceWritable: true });
    const clonedExpected = deepClone(err.expected, { forceWritable: true });
    const { replacedActual, replacedExpected } = replaceAsymmetricMatcher(clonedActual, clonedExpected);
    err.diff = diff(replacedExpected, replacedActual, diffOptions);
  }
  if (typeof err.expected !== "string")
    err.expected = stringify(err.expected, 10);
  if (typeof err.actual !== "string")
    err.actual = stringify(err.actual, 10);
  try {
    if (typeof err.message === "string")
      err.message = normalizeErrorMessage(err.message);
    if (typeof err.cause === "object" && typeof err.cause.message === "string")
      err.cause.message = normalizeErrorMessage(err.cause.message);
  } catch {
  }
  try {
    return serializeError(err);
  } catch (e) {
    return serializeError(new Error(`Failed to fully serialize error: ${e == null ? void 0 : e.message}
Inner error message: ${err == null ? void 0 : err.message}`));
  }
}
function isAsymmetricMatcher(data) {
  const type2 = getType(data);
  return type2 === "Object" && typeof data.asymmetricMatch === "function";
}
function isReplaceable(obj1, obj2) {
  const obj1Type = getType(obj1);
  const obj2Type = getType(obj2);
  return obj1Type === obj2Type && obj1Type === "Object";
}
function replaceAsymmetricMatcher(actual, expected, actualReplaced = /* @__PURE__ */ new WeakSet(), expectedReplaced = /* @__PURE__ */ new WeakSet()) {
  if (!isReplaceable(actual, expected))
    return { replacedActual: actual, replacedExpected: expected };
  if (actualReplaced.has(actual) || expectedReplaced.has(expected))
    return { replacedActual: actual, replacedExpected: expected };
  actualReplaced.add(actual);
  expectedReplaced.add(expected);
  getOwnProperties(expected).forEach((key) => {
    const expectedValue = expected[key];
    const actualValue = actual[key];
    if (isAsymmetricMatcher(expectedValue)) {
      if (expectedValue.asymmetricMatch(actualValue))
        actual[key] = expectedValue;
    } else if (isAsymmetricMatcher(actualValue)) {
      if (actualValue.asymmetricMatch(expectedValue))
        expected[key] = actualValue;
    } else if (isReplaceable(actualValue, expectedValue)) {
      const replaced = replaceAsymmetricMatcher(
        actualValue,
        expectedValue,
        actualReplaced,
        expectedReplaced
      );
      actual[key] = replaced.replacedActual;
      expected[key] = replaced.replacedExpected;
    }
  });
  return {
    replacedActual: actual,
    replacedExpected: expected
  };
}

// ../../node_modules/.pnpm/@vitest+runner@0.34.6/node_modules/@vitest/runner/dist/utils.js
function createChainable(keys2, fn2) {
  function create(context) {
    const chain2 = function(...args) {
      return fn2.apply(context, args);
    };
    Object.assign(chain2, fn2);
    chain2.withContext = () => chain2.bind(context);
    chain2.setContext = (key, value) => {
      context[key] = value;
    };
    chain2.mergeContext = (ctx) => {
      Object.assign(context, ctx);
    };
    for (const key of keys2) {
      Object.defineProperty(chain2, key, {
        get() {
          return create({ ...context, [key]: true });
        }
      });
    }
    return chain2;
  }
  const chain = create({});
  chain.fn = fn2;
  return chain;
}
function getNames(task) {
  const names = [task.name];
  let current = task;
  while ((current == null ? void 0 : current.suite) || (current == null ? void 0 : current.file)) {
    current = current.suite || current.file;
    if (current == null ? void 0 : current.name)
      names.unshift(current.name);
  }
  return names;
}

// ../../node_modules/.pnpm/@vitest+runner@0.34.6/node_modules/@vitest/runner/dist/index.js
var fnMap = /* @__PURE__ */ new WeakMap();
var fixtureMap = /* @__PURE__ */ new WeakMap();
var hooksMap = /* @__PURE__ */ new WeakMap();
function setFn(key, fn2) {
  fnMap.set(key, fn2);
}
function setFixture(key, fixture) {
  fixtureMap.set(key, fixture);
}
function getFixture(key) {
  return fixtureMap.get(key);
}
function setHooks(key, hooks) {
  hooksMap.set(key, hooks);
}
function getHooks(key) {
  return hooksMap.get(key);
}
var PendingError = class extends Error {
  constructor(message, task) {
    super(message);
    this.message = message;
    this.taskId = task.id;
  }
  code = "VITEST_PENDING";
  taskId;
};
var collectorContext = {
  tasks: [],
  currentSuite: null
};
function collectTask(task) {
  var _a2;
  (_a2 = collectorContext.currentSuite) == null ? void 0 : _a2.tasks.push(task);
}
async function runWithSuite(suite2, fn2) {
  const prev = collectorContext.currentSuite;
  collectorContext.currentSuite = suite2;
  await fn2();
  collectorContext.currentSuite = prev;
}
function withTimeout(fn2, timeout, isHook = false) {
  if (timeout <= 0 || timeout === Number.POSITIVE_INFINITY)
    return fn2;
  const { setTimeout, clearTimeout } = getSafeTimers();
  return (...args) => {
    return Promise.race([fn2(...args), new Promise((resolve2, reject) => {
      var _a2;
      const timer = setTimeout(() => {
        clearTimeout(timer);
        reject(new Error(makeTimeoutMsg(isHook, timeout)));
      }, timeout);
      (_a2 = timer.unref) == null ? void 0 : _a2.call(timer);
    })]);
  };
}
function createTestContext(test3, runner2) {
  var _a2;
  const context = function() {
    throw new Error("done() callback is deprecated, use promise instead");
  };
  context.meta = test3;
  context.task = test3;
  context.skip = () => {
    test3.pending = true;
    throw new PendingError("test is skipped; abort execution", test3);
  };
  context.onTestFailed = (fn2) => {
    test3.onFailed || (test3.onFailed = []);
    test3.onFailed.push(fn2);
  };
  return ((_a2 = runner2.extendTestContext) == null ? void 0 : _a2.call(runner2, context)) || context;
}
function makeTimeoutMsg(isHook, timeout) {
  return `${isHook ? "Hook" : "Test"} timed out in ${timeout}ms.
If this is a long-running ${isHook ? "hook" : "test"}, pass a timeout value as the last argument or configure it globally with "${isHook ? "hookTimeout" : "testTimeout"}".`;
}
function mergeContextFixtures(fixtures, context = {}) {
  const fixtureArray = Object.entries(fixtures).map(([prop, value], index2) => {
    const isFn = typeof value === "function";
    return {
      prop,
      value,
      index: index2,
      isFn
    };
  });
  if (Array.isArray(context.fixtures))
    context.fixtures = context.fixtures.concat(fixtureArray);
  else
    context.fixtures = fixtureArray;
  fixtureArray.forEach((fixture) => {
    if (fixture.isFn) {
      const usedProps = getUsedProps(fixture.value);
      if (usedProps.length)
        fixture.deps = context.fixtures.filter(({ index: index2, prop }) => index2 !== fixture.index && usedProps.includes(prop));
    }
  });
  return context;
}
var fixtureValueMap = /* @__PURE__ */ new Map();
var fixtureCleanupFnMap = /* @__PURE__ */ new Map();
function withFixtures(fn2, testContext) {
  return (hookContext) => {
    const context = hookContext || testContext;
    if (!context)
      return fn2({});
    let cleanupFnArray = fixtureCleanupFnMap.get(context.task.suite.id);
    if (!cleanupFnArray) {
      cleanupFnArray = [];
      fixtureCleanupFnMap.set(context.task.suite.id, cleanupFnArray);
    }
    const fixtures = getFixture(context);
    if (!(fixtures == null ? void 0 : fixtures.length))
      return fn2(context);
    const usedProps = getUsedProps(fn2);
    if (!usedProps.length)
      return fn2(context);
    const usedFixtures = fixtures.filter(({ prop }) => usedProps.includes(prop));
    const pendingFixtures = resolveDeps(usedFixtures);
    let cursor = 0;
    return new Promise((resolve2, reject) => {
      async function use2(fixtureValue) {
        const fixture = pendingFixtures[cursor++];
        context[fixture.prop] = fixtureValue;
        if (!fixtureValueMap.has(fixture)) {
          fixtureValueMap.set(fixture, fixtureValue);
          cleanupFnArray.unshift(() => {
            fixtureValueMap.delete(fixture);
          });
        }
        if (cursor < pendingFixtures.length) {
          await next();
        } else {
          try {
            resolve2(await fn2(context));
          } catch (err) {
            reject(err);
          }
          return new Promise((resolve22) => {
            cleanupFnArray.push(resolve22);
          });
        }
      }
      async function next() {
        const fixture = pendingFixtures[cursor];
        const { isFn, value } = fixture;
        if (fixtureValueMap.has(fixture))
          return use2(fixtureValueMap.get(fixture));
        else
          return isFn ? value(context, use2) : use2(value);
      }
      const setupFixturePromise = next();
      cleanupFnArray.unshift(() => setupFixturePromise);
    });
  };
}
function resolveDeps(fixtures, depSet = /* @__PURE__ */ new Set(), pendingFixtures = []) {
  fixtures.forEach((fixture) => {
    if (pendingFixtures.includes(fixture))
      return;
    if (!fixture.isFn || !fixture.deps) {
      pendingFixtures.push(fixture);
      return;
    }
    if (depSet.has(fixture))
      throw new Error("circular fixture dependency");
    depSet.add(fixture);
    resolveDeps(fixture.deps, depSet, pendingFixtures);
    pendingFixtures.push(fixture);
    depSet.clear();
  });
  return pendingFixtures;
}
function getUsedProps(fn2) {
  const match = fn2.toString().match(/[^(]*\(([^)]*)/);
  if (!match)
    return [];
  const args = splitByComma(match[1]);
  if (!args.length)
    return [];
  const first = args[0];
  if (!(first.startsWith("{") && first.endsWith("}")))
    throw new Error("the first argument must use object destructuring pattern");
  const _first = first.slice(1, -1).replace(/\s/g, "");
  const props = splitByComma(_first).map((prop) => {
    return prop.replace(/\:.*|\=.*/g, "");
  });
  const last = props.at(-1);
  if (last && last.startsWith("..."))
    throw new Error("Rest parameters are not supported");
  return props;
}
function splitByComma(s) {
  const result = [];
  const stack = [];
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "{" || s[i] === "[") {
      stack.push(s[i] === "{" ? "}" : "]");
    } else if (s[i] === stack[stack.length - 1]) {
      stack.pop();
    } else if (!stack.length && s[i] === ",") {
      const token = s.substring(start, i).trim();
      if (token)
        result.push(token);
      start = i + 1;
    }
  }
  const lastToken = s.substring(start).trim();
  if (lastToken)
    result.push(lastToken);
  return result;
}
var suite = createSuite();
var test = createTest(
  function(name, fn2, options) {
    getCurrentSuite().test.fn.call(this, formatName(name), fn2, options);
  }
);
var describe = suite;
var it = test;
var runner;
var defaultSuite;
function getRunner() {
  return runner;
}
function getCurrentSuite() {
  return collectorContext.currentSuite || defaultSuite;
}
function createSuiteHooks() {
  return {
    beforeAll: [],
    afterAll: [],
    beforeEach: [],
    afterEach: []
  };
}
function createSuiteCollector(name, factory = () => {
}, mode, concurrent, sequential, shuffle2, each, suiteOptions) {
  const tasks = [];
  const factoryQueue = [];
  let suite2;
  initSuite();
  const test22 = createTest(function(name2, fn2 = noop, options) {
    const mode2 = this.only ? "only" : this.skip ? "skip" : this.todo ? "todo" : "run";
    if (typeof options === "number")
      options = { timeout: options };
    if (typeof suiteOptions === "object")
      options = Object.assign({}, suiteOptions, options);
    const test3 = {
      id: "",
      type: "test",
      name: formatName(name2),
      each: this.each,
      mode: mode2,
      suite: void 0,
      fails: this.fails,
      retry: (options == null ? void 0 : options.retry) ?? runner.config.retry,
      repeats: options == null ? void 0 : options.repeats,
      meta: /* @__PURE__ */ Object.create(null)
    };
    if (this.concurrent || !sequential && (concurrent || runner.config.sequence.concurrent))
      test3.concurrent = true;
    if (shuffle2)
      test3.shuffle = true;
    const context = createTestContext(test3, runner);
    Object.defineProperty(test3, "context", {
      value: context,
      enumerable: false
    });
    setFixture(context, this.fixtures);
    setFn(test3, withTimeout(
      withFixtures(fn2, context),
      (options == null ? void 0 : options.timeout) ?? runner.config.testTimeout
    ));
    tasks.push(test3);
  });
  const custom2 = function(name2 = "") {
    const self2 = this || {};
    const task = {
      id: "",
      name: name2,
      type: "custom",
      mode: self2.only ? "only" : self2.skip ? "skip" : self2.todo ? "todo" : "run",
      meta: /* @__PURE__ */ Object.create(null)
    };
    tasks.push(task);
    return task;
  };
  const collector = {
    type: "collector",
    name,
    mode,
    options: suiteOptions,
    test: test22,
    tasks,
    collect,
    custom: custom2,
    clear,
    on: addHook
  };
  function addHook(name2, ...fn2) {
    getHooks(suite2)[name2].push(...fn2);
  }
  function initSuite() {
    if (typeof suiteOptions === "number")
      suiteOptions = { timeout: suiteOptions };
    suite2 = {
      id: "",
      type: "suite",
      name,
      mode,
      each,
      shuffle: shuffle2,
      tasks: [],
      meta: /* @__PURE__ */ Object.create(null)
    };
    setHooks(suite2, createSuiteHooks());
  }
  function clear() {
    tasks.length = 0;
    factoryQueue.length = 0;
    initSuite();
  }
  async function collect(file) {
    factoryQueue.length = 0;
    if (factory)
      await runWithSuite(collector, () => factory(test22));
    const allChildren = [];
    for (const i of [...factoryQueue, ...tasks])
      allChildren.push(i.type === "collector" ? await i.collect(file) : i);
    suite2.file = file;
    suite2.tasks = allChildren;
    allChildren.forEach((task) => {
      task.suite = suite2;
      if (file)
        task.file = file;
    });
    return suite2;
  }
  collectTask(collector);
  return collector;
}
function createSuite() {
  function suiteFn(name, factory, options) {
    const mode = this.only ? "only" : this.skip ? "skip" : this.todo ? "todo" : "run";
    const currentSuite = getCurrentSuite();
    if (typeof options === "number")
      options = { timeout: options };
    if (currentSuite == null ? void 0 : currentSuite.options)
      options = { ...currentSuite.options, ...options };
    return createSuiteCollector(formatName(name), factory, mode, this.concurrent, this.sequence, this.shuffle, this.each, options);
  }
  suiteFn.each = function(cases, ...args) {
    const suite2 = this.withContext();
    this.setContext("each", true);
    if (Array.isArray(cases) && args.length)
      cases = formatTemplateString(cases, args);
    return (name, fn2, options) => {
      const _name = formatName(name);
      const arrayOnlyCases = cases.every(Array.isArray);
      cases.forEach((i, idx) => {
        const items = Array.isArray(i) ? i : [i];
        arrayOnlyCases ? suite2(formatTitle(_name, items, idx), () => fn2(...items), options) : suite2(formatTitle(_name, items, idx), () => fn2(i), options);
      });
      this.setContext("each", void 0);
    };
  };
  suiteFn.skipIf = (condition) => condition ? suite.skip : suite;
  suiteFn.runIf = (condition) => condition ? suite : suite.skip;
  return createChainable(
    ["concurrent", "sequential", "shuffle", "skip", "only", "todo"],
    suiteFn
  );
}
function createTest(fn2, context) {
  const testFn = fn2;
  testFn.each = function(cases, ...args) {
    const test22 = this.withContext();
    this.setContext("each", true);
    if (Array.isArray(cases) && args.length)
      cases = formatTemplateString(cases, args);
    return (name, fn22, options) => {
      const _name = formatName(name);
      const arrayOnlyCases = cases.every(Array.isArray);
      cases.forEach((i, idx) => {
        const items = Array.isArray(i) ? i : [i];
        arrayOnlyCases ? test22(formatTitle(_name, items, idx), () => fn22(...items), options) : test22(formatTitle(_name, items, idx), () => fn22(i), options);
      });
      this.setContext("each", void 0);
    };
  };
  testFn.skipIf = (condition) => condition ? test.skip : test;
  testFn.runIf = (condition) => condition ? test : test.skip;
  testFn.extend = function(fixtures) {
    const _context = mergeContextFixtures(fixtures, context);
    return createTest(function fn22(name, fn22, options) {
      getCurrentSuite().test.fn.call(this, formatName(name), fn22, options);
    }, _context);
  };
  const _test2 = createChainable(
    ["concurrent", "skip", "only", "todo", "fails"],
    testFn
  );
  if (context)
    _test2.mergeContext(context);
  return _test2;
}
function formatName(name) {
  return typeof name === "string" ? name : name instanceof Function ? name.name || "<anonymous>" : String(name);
}
function formatTitle(template, items, idx) {
  if (template.includes("%#")) {
    template = template.replace(/%%/g, "__vitest_escaped_%__").replace(/%#/g, `${idx}`).replace(/__vitest_escaped_%__/g, "%%");
  }
  const count = template.split("%").length - 1;
  let formatted = format(template, ...items.slice(0, count));
  if (isObject(items[0])) {
    formatted = formatted.replace(
      /\$([$\w_.]+)/g,
      (_, key) => {
        var _a2, _b;
        return objDisplay(objectAttr(items[0], key), { truncate: (_b = (_a2 = runner == null ? void 0 : runner.config) == null ? void 0 : _a2.chaiConfig) == null ? void 0 : _b.truncateThreshold });
      }
      // https://github.com/chaijs/chai/pull/1490
    );
  }
  return formatted;
}
function formatTemplateString(cases, args) {
  const header = cases.join("").trim().replace(/ /g, "").split("\n").map((i) => i.split("|"))[0];
  const res = [];
  for (let i = 0; i < Math.floor(args.length / header.length); i++) {
    const oneCase = {};
    for (let j = 0; j < header.length; j++)
      oneCase[header[j]] = args[i * header.length + j];
    res.push(oneCase);
  }
  return res;
}
var now$1 = Date.now;
var _test;
function getCurrentTest() {
  return _test;
}
var now = Date.now;
function getDefaultHookTimeout() {
  return getRunner().config.hookTimeout;
}
function beforeAll(fn2, timeout) {
  return getCurrentSuite().on("beforeAll", withTimeout(fn2, timeout ?? getDefaultHookTimeout(), true));
}
function afterAll(fn2, timeout) {
  return getCurrentSuite().on("afterAll", withTimeout(fn2, timeout ?? getDefaultHookTimeout(), true));
}
function beforeEach(fn2, timeout) {
  return getCurrentSuite().on("beforeEach", withTimeout(withFixtures(fn2), timeout ?? getDefaultHookTimeout(), true));
}
function afterEach(fn2, timeout) {
  return getCurrentSuite().on("afterEach", withTimeout(withFixtures(fn2), timeout ?? getDefaultHookTimeout(), true));
}
var onTestFailed = createTestHook("onTestFailed", (test3, handler) => {
  test3.onFailed || (test3.onFailed = []);
  test3.onFailed.push(handler);
});
function createTestHook(name, handler) {
  return (fn2) => {
    const current = getCurrentTest();
    if (!current)
      throw new Error(`Hook ${name}() can only be called inside a test`);
    handler(current, fn2);
  };
}

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-global.97e4527c.js
function getWorkerState() {
  return globalThis.__vitest_worker__;
}
function getCurrentEnvironment() {
  const state = getWorkerState();
  return state == null ? void 0 : state.environment.name;
}

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-index.29282562.js
var _a;
var isNode = typeof process < "u" && typeof process.stdout < "u" && !((_a = process.versions) == null ? void 0 : _a.deno) && !globalThis.window;
var isWindows = isNode && process.platform === "win32";
function getRunMode() {
  return getWorkerState().config.mode;
}
function isRunningInBenchmark() {
  return getRunMode() === "benchmark";
}

// ../../node_modules/.pnpm/chai@4.3.10/node_modules/chai/index.mjs
var chai_exports = {};
__export(chai_exports, {
  Assertion: () => Assertion,
  AssertionError: () => AssertionError,
  assert: () => assert,
  config: () => config,
  core: () => core,
  default: () => chai_default,
  expect: () => expect,
  should: () => should,
  use: () => use,
  util: () => util,
  version: () => version
});
var import_index = __toESM(require_chai2(), 1);
var expect = import_index.default.expect;
var version = import_index.default.version;
var Assertion = import_index.default.Assertion;
var AssertionError = import_index.default.AssertionError;
var util = import_index.default.util;
var config = import_index.default.config;
var use = import_index.default.use;
var should = import_index.default.should;
var assert = import_index.default.assert;
var core = import_index.default.core;
var chai_default = import_index.default;

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-_commonjsHelpers.7d1333e8.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

// ../../node_modules/.pnpm/tinyspy@2.2.0/node_modules/tinyspy/dist/index.js
function m(e, t) {
  if (!e)
    throw new Error(t);
}
function y(e, t) {
  return typeof t === e;
}
function b(e) {
  return e instanceof Promise;
}
function d(e, t, n2) {
  Object.defineProperty(e, t, n2);
}
function p(e, t, n2) {
  Object.defineProperty(e, t, { value: n2 });
}
var u = Symbol.for("tinyspy:spy");
var I = /* @__PURE__ */ new Set();
var M = (e) => {
  e.called = false, e.callCount = 0, e.calls = [], e.results = [], e.next = [];
};
var C = (e) => (d(e, u, { value: { reset: () => M(e[u]) } }), e[u]);
var v = (e) => e[u] || C(e);
function T(e) {
  m(y("function", e) || y("undefined", e), "cannot spy on a non-function value");
  let t = function(...a) {
    let r = v(t);
    r.called = true, r.callCount++, r.calls.push(a);
    let i = r.next.shift();
    if (i) {
      r.results.push(i);
      let [s, l] = i;
      if (s === "ok")
        return l;
      throw l;
    }
    let o, c = "ok";
    if (r.impl)
      try {
        new.target ? o = Reflect.construct(r.impl, a, new.target) : o = r.impl.apply(this, a), c = "ok";
      } catch (s) {
        throw o = s, c = "error", r.results.push([c, s]), s;
      }
    let x = [c, o];
    if (b(o)) {
      let s = o.then((l) => x[1] = l).catch((l) => {
        throw x[0] = "error", x[1] = l, l;
      });
      Object.assign(s, o), o = s;
    }
    return r.results.push(x), o;
  };
  p(t, "_isMockFunction", true), p(t, "length", e ? e.length : 0), p(t, "name", e && e.name || "spy");
  let n2 = v(t);
  return n2.reset(), n2.impl = e, t;
}
var P = (e, t) => Object.getOwnPropertyDescriptor(e, t);
function E(e, t, n2) {
  m(!y("undefined", e), "spyOn could not find an object to spy upon"), m(y("object", e) || y("function", e), "cannot spyOn on a primitive value");
  let a = () => {
    if (!y("object", t))
      return [t, "value"];
    if ("getter" in t && "setter" in t)
      throw new Error("cannot spy on both getter and setter");
    if ("getter" in t)
      return [t.getter, "get"];
    if ("setter" in t)
      return [t.setter, "set"];
    throw new Error("specify getter or setter to spy on");
  }, [r, i] = a(), o = P(e, r), c = Object.getPrototypeOf(e), x = c && P(c, r), s = o || x;
  m(s || r in e, `${String(r)} does not exist`);
  let l = false;
  i === "value" && s && !s.value && s.get && (i = "get", l = true, n2 = s.get());
  let f;
  s ? f = s[i] : i !== "value" ? f = () => e[r] : f = e[r], n2 || (n2 = f);
  let S = T(n2), O = (w) => {
    let { value: G, ...k } = s || {
      configurable: true,
      writable: true
    };
    i !== "value" && delete k.writable, k[i] = w, d(e, r, k);
  }, K = () => s ? d(e, r, s) : O(f), A = S[u];
  return p(A, "restore", K), p(A, "getOriginal", () => l ? f() : f), p(A, "willCall", (w) => (A.impl = w, S)), O(l ? () => S : S), I.add(S), S;
}

// ../../node_modules/.pnpm/@vitest+spy@0.34.6/node_modules/@vitest/spy/dist/index.js
var spies = /* @__PURE__ */ new Set();
function isMockFunction(fn2) {
  return typeof fn2 === "function" && "_isMockFunction" in fn2 && fn2._isMockFunction;
}
function spyOn(obj, method, accessType) {
  const dictionary = {
    get: "getter",
    set: "setter"
  };
  const objMethod = accessType ? { [dictionary[accessType]]: method } : method;
  const stub = E(obj, objMethod);
  return enhanceSpy(stub);
}
var callOrder = 0;
function enhanceSpy(spy) {
  const stub = spy;
  let implementation;
  let instances = [];
  let invocations = [];
  const state = v(spy);
  const mockContext = {
    get calls() {
      return state.calls;
    },
    get instances() {
      return instances;
    },
    get invocationCallOrder() {
      return invocations;
    },
    get results() {
      return state.results.map(([callType, value]) => {
        const type2 = callType === "error" ? "throw" : "return";
        return { type: type2, value };
      });
    },
    get lastCall() {
      return state.calls[state.calls.length - 1];
    }
  };
  let onceImplementations = [];
  let implementationChangedTemporarily = false;
  function mockCall(...args) {
    instances.push(this);
    invocations.push(++callOrder);
    const impl = implementationChangedTemporarily ? implementation : onceImplementations.shift() || implementation || state.getOriginal() || (() => {
    });
    return impl.apply(this, args);
  }
  let name = stub.name;
  stub.getMockName = () => name || "vi.fn()";
  stub.mockName = (n2) => {
    name = n2;
    return stub;
  };
  stub.mockClear = () => {
    state.reset();
    instances = [];
    invocations = [];
    return stub;
  };
  stub.mockReset = () => {
    stub.mockClear();
    implementation = () => void 0;
    onceImplementations = [];
    return stub;
  };
  stub.mockRestore = () => {
    stub.mockReset();
    state.restore();
    implementation = void 0;
    return stub;
  };
  stub.getMockImplementation = () => implementation;
  stub.mockImplementation = (fn2) => {
    implementation = fn2;
    state.willCall(mockCall);
    return stub;
  };
  stub.mockImplementationOnce = (fn2) => {
    onceImplementations.push(fn2);
    return stub;
  };
  function withImplementation(fn2, cb) {
    const originalImplementation = implementation;
    implementation = fn2;
    state.willCall(mockCall);
    implementationChangedTemporarily = true;
    const reset = () => {
      implementation = originalImplementation;
      implementationChangedTemporarily = false;
    };
    const result = cb();
    if (result instanceof Promise) {
      return result.then(() => {
        reset();
        return stub;
      });
    }
    reset();
    return stub;
  }
  stub.withImplementation = withImplementation;
  stub.mockReturnThis = () => stub.mockImplementation(function() {
    return this;
  });
  stub.mockReturnValue = (val) => stub.mockImplementation(() => val);
  stub.mockReturnValueOnce = (val) => stub.mockImplementationOnce(() => val);
  stub.mockResolvedValue = (val) => stub.mockImplementation(() => Promise.resolve(val));
  stub.mockResolvedValueOnce = (val) => stub.mockImplementationOnce(() => Promise.resolve(val));
  stub.mockRejectedValue = (val) => stub.mockImplementation(() => Promise.reject(val));
  stub.mockRejectedValueOnce = (val) => stub.mockImplementationOnce(() => Promise.reject(val));
  Object.defineProperty(stub, "mock", {
    get: () => mockContext
  });
  state.willCall(mockCall);
  spies.add(stub);
  return stub;
}
function fn(implementation) {
  const enhancedSpy = enhanceSpy(E({ spy: implementation || (() => {
  }) }, "spy"));
  if (implementation)
    enhancedSpy.mockImplementation(implementation);
  return enhancedSpy;
}

// ../../node_modules/.pnpm/@vitest+expect@0.34.6/node_modules/@vitest/expect/dist/index.js
var MATCHERS_OBJECT = Symbol.for("matchers-object");
var JEST_MATCHERS_OBJECT = Symbol.for("$$jest-matchers-object");
var GLOBAL_EXPECT = Symbol.for("expect-global");
if (!Object.prototype.hasOwnProperty.call(globalThis, MATCHERS_OBJECT)) {
  const globalState = /* @__PURE__ */ new WeakMap();
  const matchers = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(globalThis, MATCHERS_OBJECT, {
    get: () => globalState
  });
  Object.defineProperty(globalThis, JEST_MATCHERS_OBJECT, {
    configurable: true,
    get: () => ({
      state: globalState.get(globalThis[GLOBAL_EXPECT]),
      matchers
    })
  });
}
function getState(expect2) {
  return globalThis[MATCHERS_OBJECT].get(expect2);
}
function setState(state, expect2) {
  const map2 = globalThis[MATCHERS_OBJECT];
  const current = map2.get(expect2) || {};
  Object.assign(current, state);
  map2.set(expect2, current);
}
function getMatcherUtils() {
  const c = () => getColors();
  const EXPECTED_COLOR = c().green;
  const RECEIVED_COLOR = c().red;
  const INVERTED_COLOR = c().inverse;
  const BOLD_WEIGHT = c().bold;
  const DIM_COLOR = c().dim;
  function matcherHint(matcherName, received = "received", expected = "expected", options = {}) {
    const {
      comment = "",
      isDirectExpectCall = false,
      // seems redundant with received === ''
      isNot = false,
      promise = "",
      secondArgument = "",
      expectedColor = EXPECTED_COLOR,
      receivedColor = RECEIVED_COLOR,
      secondArgumentColor = EXPECTED_COLOR
    } = options;
    let hint = "";
    let dimString = "expect";
    if (!isDirectExpectCall && received !== "") {
      hint += DIM_COLOR(`${dimString}(`) + receivedColor(received);
      dimString = ")";
    }
    if (promise !== "") {
      hint += DIM_COLOR(`${dimString}.`) + promise;
      dimString = "";
    }
    if (isNot) {
      hint += `${DIM_COLOR(`${dimString}.`)}not`;
      dimString = "";
    }
    if (matcherName.includes(".")) {
      dimString += matcherName;
    } else {
      hint += DIM_COLOR(`${dimString}.`) + matcherName;
      dimString = "";
    }
    if (expected === "") {
      dimString += "()";
    } else {
      hint += DIM_COLOR(`${dimString}(`) + expectedColor(expected);
      if (secondArgument)
        hint += DIM_COLOR(", ") + secondArgumentColor(secondArgument);
      dimString = ")";
    }
    if (comment !== "")
      dimString += ` // ${comment}`;
    if (dimString !== "")
      hint += DIM_COLOR(dimString);
    return hint;
  }
  const SPACE_SYMBOL = "\xB7";
  const replaceTrailingSpaces = (text) => text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL.repeat(spaces.length));
  const printReceived = (object3) => RECEIVED_COLOR(replaceTrailingSpaces(stringify(object3)));
  const printExpected = (value) => EXPECTED_COLOR(replaceTrailingSpaces(stringify(value)));
  return {
    EXPECTED_COLOR,
    RECEIVED_COLOR,
    INVERTED_COLOR,
    BOLD_WEIGHT,
    DIM_COLOR,
    matcherHint,
    printReceived,
    printExpected
  };
}
function equals(a, b2, customTesters, strictCheck) {
  customTesters = customTesters || [];
  return eq(a, b2, [], [], customTesters, strictCheck ? hasKey : hasDefinedKey);
}
var functionToString = Function.prototype.toString;
function isAsymmetric(obj) {
  return !!obj && typeof obj === "object" && "asymmetricMatch" in obj && isA("Function", obj.asymmetricMatch);
}
function asymmetricMatch(a, b2) {
  const asymmetricA = isAsymmetric(a);
  const asymmetricB = isAsymmetric(b2);
  if (asymmetricA && asymmetricB)
    return void 0;
  if (asymmetricA)
    return a.asymmetricMatch(b2);
  if (asymmetricB)
    return b2.asymmetricMatch(a);
}
function eq(a, b2, aStack, bStack, customTesters, hasKey2) {
  let result = true;
  const asymmetricResult = asymmetricMatch(a, b2);
  if (asymmetricResult !== void 0)
    return asymmetricResult;
  for (let i = 0; i < customTesters.length; i++) {
    const customTesterResult = customTesters[i](a, b2);
    if (customTesterResult !== void 0)
      return customTesterResult;
  }
  if (a instanceof Error && b2 instanceof Error)
    return a.message === b2.message;
  if (Object.is(a, b2))
    return true;
  if (a === null || b2 === null)
    return a === b2;
  const className2 = Object.prototype.toString.call(a);
  if (className2 !== Object.prototype.toString.call(b2))
    return false;
  switch (className2) {
    case "[object Boolean]":
    case "[object String]":
    case "[object Number]":
      if (typeof a !== typeof b2) {
        return false;
      } else if (typeof a !== "object" && typeof b2 !== "object") {
        return Object.is(a, b2);
      } else {
        return Object.is(a.valueOf(), b2.valueOf());
      }
    case "[object Date]": {
      const numA = +a;
      const numB = +b2;
      return numA === numB || Number.isNaN(numA) && Number.isNaN(numB);
    }
    case "[object RegExp]":
      return a.source === b2.source && a.flags === b2.flags;
  }
  if (typeof a !== "object" || typeof b2 !== "object")
    return false;
  if (isDomNode(a) && isDomNode(b2))
    return a.isEqualNode(b2);
  let length = aStack.length;
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b2;
    else if (bStack[length] === b2)
      return false;
  }
  aStack.push(a);
  bStack.push(b2);
  if (className2 === "[object Array]" && a.length !== b2.length)
    return false;
  const aKeys = keys(a, hasKey2);
  let key;
  let size = aKeys.length;
  if (keys(b2, hasKey2).length !== size)
    return false;
  while (size--) {
    key = aKeys[size];
    result = hasKey2(b2, key) && eq(a[key], b2[key], aStack, bStack, customTesters, hasKey2);
    if (!result)
      return false;
  }
  aStack.pop();
  bStack.pop();
  return result;
}
function keys(obj, hasKey2) {
  const keys2 = [];
  for (const key in obj) {
    if (hasKey2(obj, key))
      keys2.push(key);
  }
  return keys2.concat(
    Object.getOwnPropertySymbols(obj).filter(
      (symbol) => Object.getOwnPropertyDescriptor(obj, symbol).enumerable
    )
  );
}
function hasDefinedKey(obj, key) {
  return hasKey(obj, key) && obj[key] !== void 0;
}
function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === `[object ${typeName}]`;
}
function isDomNode(obj) {
  return obj !== null && typeof obj === "object" && "nodeType" in obj && typeof obj.nodeType === "number" && "nodeName" in obj && typeof obj.nodeName === "string" && "isEqualNode" in obj && typeof obj.isEqualNode === "function";
}
var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
function isImmutableUnorderedKeyed(maybeKeyed) {
  return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL] && !maybeKeyed[IS_ORDERED_SENTINEL]);
}
function isImmutableUnorderedSet(maybeSet) {
  return !!(maybeSet && maybeSet[IS_SET_SENTINEL] && !maybeSet[IS_ORDERED_SENTINEL]);
}
var IteratorSymbol = Symbol.iterator;
function hasIterator(object3) {
  return !!(object3 != null && object3[IteratorSymbol]);
}
function iterableEquality(a, b2, aStack = [], bStack = []) {
  if (typeof a !== "object" || typeof b2 !== "object" || Array.isArray(a) || Array.isArray(b2) || !hasIterator(a) || !hasIterator(b2))
    return void 0;
  if (a.constructor !== b2.constructor)
    return false;
  let length = aStack.length;
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b2;
  }
  aStack.push(a);
  bStack.push(b2);
  const iterableEqualityWithStack = (a2, b22) => iterableEquality(a2, b22, [...aStack], [...bStack]);
  if (a.size !== void 0) {
    if (a.size !== b2.size) {
      return false;
    } else if (isA("Set", a) || isImmutableUnorderedSet(a)) {
      let allFound = true;
      for (const aValue of a) {
        if (!b2.has(aValue)) {
          let has2 = false;
          for (const bValue of b2) {
            const isEqual = equals(aValue, bValue, [iterableEqualityWithStack]);
            if (isEqual === true)
              has2 = true;
          }
          if (has2 === false) {
            allFound = false;
            break;
          }
        }
      }
      aStack.pop();
      bStack.pop();
      return allFound;
    } else if (isA("Map", a) || isImmutableUnorderedKeyed(a)) {
      let allFound = true;
      for (const aEntry of a) {
        if (!b2.has(aEntry[0]) || !equals(aEntry[1], b2.get(aEntry[0]), [iterableEqualityWithStack])) {
          let has2 = false;
          for (const bEntry of b2) {
            const matchedKey = equals(aEntry[0], bEntry[0], [
              iterableEqualityWithStack
            ]);
            let matchedValue = false;
            if (matchedKey === true) {
              matchedValue = equals(aEntry[1], bEntry[1], [
                iterableEqualityWithStack
              ]);
            }
            if (matchedValue === true)
              has2 = true;
          }
          if (has2 === false) {
            allFound = false;
            break;
          }
        }
      }
      aStack.pop();
      bStack.pop();
      return allFound;
    }
  }
  const bIterator = b2[IteratorSymbol]();
  for (const aValue of a) {
    const nextB = bIterator.next();
    if (nextB.done || !equals(aValue, nextB.value, [iterableEqualityWithStack]))
      return false;
  }
  if (!bIterator.next().done)
    return false;
  aStack.pop();
  bStack.pop();
  return true;
}
function hasPropertyInObject(object3, key) {
  const shouldTerminate = !object3 || typeof object3 !== "object" || object3 === Object.prototype;
  if (shouldTerminate)
    return false;
  return Object.prototype.hasOwnProperty.call(object3, key) || hasPropertyInObject(Object.getPrototypeOf(object3), key);
}
function isObjectWithKeys(a) {
  return isObject(a) && !(a instanceof Error) && !Array.isArray(a) && !(a instanceof Date);
}
function subsetEquality(object3, subset) {
  const subsetEqualityWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => (object22, subset2) => {
    if (!isObjectWithKeys(subset2))
      return void 0;
    return Object.keys(subset2).every((key) => {
      if (isObjectWithKeys(subset2[key])) {
        if (seenReferences.has(subset2[key]))
          return equals(object22[key], subset2[key], [iterableEquality]);
        seenReferences.set(subset2[key], true);
      }
      const result = object22 != null && hasPropertyInObject(object22, key) && equals(object22[key], subset2[key], [
        iterableEquality,
        subsetEqualityWithContext(seenReferences)
      ]);
      seenReferences.delete(subset2[key]);
      return result;
    });
  };
  return subsetEqualityWithContext()(object3, subset);
}
function typeEquality(a, b2) {
  if (a == null || b2 == null || a.constructor === b2.constructor)
    return void 0;
  return false;
}
function arrayBufferEquality(a, b2) {
  let dataViewA = a;
  let dataViewB = b2;
  if (!(a instanceof DataView && b2 instanceof DataView)) {
    if (!(a instanceof ArrayBuffer) || !(b2 instanceof ArrayBuffer))
      return void 0;
    try {
      dataViewA = new DataView(a);
      dataViewB = new DataView(b2);
    } catch {
      return void 0;
    }
  }
  if (dataViewA.byteLength !== dataViewB.byteLength)
    return false;
  for (let i = 0; i < dataViewA.byteLength; i++) {
    if (dataViewA.getUint8(i) !== dataViewB.getUint8(i))
      return false;
  }
  return true;
}
function sparseArrayEquality(a, b2) {
  if (!Array.isArray(a) || !Array.isArray(b2))
    return void 0;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b2);
  return equals(a, b2, [iterableEquality, typeEquality], true) && equals(aKeys, bKeys);
}
function generateToBeMessage(deepEqualityName, expected = "#{this}", actual = "#{exp}") {
  const toBeMessage = `expected ${expected} to be ${actual} // Object.is equality`;
  if (["toStrictEqual", "toEqual"].includes(deepEqualityName))
    return `${toBeMessage}

If it should pass with deep equality, replace "toBe" with "${deepEqualityName}"

Expected: ${expected}
Received: serializes to the same string
`;
  return toBeMessage;
}
var AsymmetricMatcher3 = class {
  constructor(sample, inverse = false) {
    this.sample = sample;
    this.inverse = inverse;
  }
  // should have "jest" to be compatible with its ecosystem
  $$typeof = Symbol.for("jest.asymmetricMatcher");
  getMatcherContext(expect2) {
    return {
      ...getState(expect2 || globalThis[GLOBAL_EXPECT]),
      equals,
      isNot: this.inverse,
      utils: {
        ...getMatcherUtils(),
        diff,
        stringify,
        iterableEquality,
        subsetEquality
      }
    };
  }
};
var StringContaining = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    if (!isA("String", sample))
      throw new Error("Expected is not a string");
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    const result = isA("String", other) && other.includes(this.sample);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "string";
  }
};
var Anything = class extends AsymmetricMatcher3 {
  asymmetricMatch(other) {
    return other != null;
  }
  toString() {
    return "Anything";
  }
  toAsymmetricMatcher() {
    return "Anything";
  }
};
var ObjectContaining = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    super(sample, inverse);
  }
  getPrototype(obj) {
    if (Object.getPrototypeOf)
      return Object.getPrototypeOf(obj);
    if (obj.constructor.prototype === obj)
      return null;
    return obj.constructor.prototype;
  }
  hasProperty(obj, property) {
    if (!obj)
      return false;
    if (Object.prototype.hasOwnProperty.call(obj, property))
      return true;
    return this.hasProperty(this.getPrototype(obj), property);
  }
  asymmetricMatch(other) {
    if (typeof this.sample !== "object") {
      throw new TypeError(
        `You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`
      );
    }
    let result = true;
    for (const property in this.sample) {
      if (!this.hasProperty(other, property) || !equals(this.sample[property], other[property])) {
        result = false;
        break;
      }
    }
    return this.inverse ? !result : result;
  }
  toString() {
    return `Object${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "object";
  }
};
var ArrayContaining = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    if (!Array.isArray(this.sample)) {
      throw new TypeError(
        `You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`
      );
    }
    const result = this.sample.length === 0 || Array.isArray(other) && this.sample.every(
      (item) => other.some((another) => equals(item, another))
    );
    return this.inverse ? !result : result;
  }
  toString() {
    return `Array${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "array";
  }
};
var Any = class extends AsymmetricMatcher3 {
  constructor(sample) {
    if (typeof sample === "undefined") {
      throw new TypeError(
        "any() expects to be passed a constructor function. Please pass one or use anything() to match any object."
      );
    }
    super(sample);
  }
  fnNameFor(func) {
    if (func.name)
      return func.name;
    const functionToString2 = Function.prototype.toString;
    const matches = functionToString2.call(func).match(/^(?:async)?\s*function\s*\*?\s*([\w$]+)\s*\(/);
    return matches ? matches[1] : "<anonymous>";
  }
  asymmetricMatch(other) {
    if (this.sample === String)
      return typeof other == "string" || other instanceof String;
    if (this.sample === Number)
      return typeof other == "number" || other instanceof Number;
    if (this.sample === Function)
      return typeof other == "function" || other instanceof Function;
    if (this.sample === Boolean)
      return typeof other == "boolean" || other instanceof Boolean;
    if (this.sample === BigInt)
      return typeof other == "bigint" || other instanceof BigInt;
    if (this.sample === Symbol)
      return typeof other == "symbol" || other instanceof Symbol;
    if (this.sample === Object)
      return typeof other == "object";
    return other instanceof this.sample;
  }
  toString() {
    return "Any";
  }
  getExpectedType() {
    if (this.sample === String)
      return "string";
    if (this.sample === Number)
      return "number";
    if (this.sample === Function)
      return "function";
    if (this.sample === Object)
      return "object";
    if (this.sample === Boolean)
      return "boolean";
    return this.fnNameFor(this.sample);
  }
  toAsymmetricMatcher() {
    return `Any<${this.fnNameFor(this.sample)}>`;
  }
};
var StringMatching = class extends AsymmetricMatcher3 {
  constructor(sample, inverse = false) {
    if (!isA("String", sample) && !isA("RegExp", sample))
      throw new Error("Expected is not a String or a RegExp");
    super(new RegExp(sample), inverse);
  }
  asymmetricMatch(other) {
    const result = isA("String", other) && this.sample.test(other);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Matching`;
  }
  getExpectedType() {
    return "string";
  }
};
var JestAsymmetricMatchers = (chai3, utils) => {
  utils.addMethod(
    chai3.expect,
    "anything",
    () => new Anything()
  );
  utils.addMethod(
    chai3.expect,
    "any",
    (expected) => new Any(expected)
  );
  utils.addMethod(
    chai3.expect,
    "stringContaining",
    (expected) => new StringContaining(expected)
  );
  utils.addMethod(
    chai3.expect,
    "objectContaining",
    (expected) => new ObjectContaining(expected)
  );
  utils.addMethod(
    chai3.expect,
    "arrayContaining",
    (expected) => new ArrayContaining(expected)
  );
  utils.addMethod(
    chai3.expect,
    "stringMatching",
    (expected) => new StringMatching(expected)
  );
  chai3.expect.not = {
    stringContaining: (expected) => new StringContaining(expected, true),
    objectContaining: (expected) => new ObjectContaining(expected, true),
    arrayContaining: (expected) => new ArrayContaining(expected, true),
    stringMatching: (expected) => new StringMatching(expected, true)
  };
};
function recordAsyncExpect(test3, promise) {
  if (test3 && promise instanceof Promise) {
    promise = promise.finally(() => {
      const index2 = test3.promises.indexOf(promise);
      if (index2 !== -1)
        test3.promises.splice(index2, 1);
    });
    if (!test3.promises)
      test3.promises = [];
    test3.promises.push(promise);
  }
  return promise;
}
function wrapSoft(utils, fn2) {
  return function(...args) {
    var _a2;
    const test3 = utils.flag(this, "vitest-test");
    const state = (test3 == null ? void 0 : test3.context._local) ? test3.context.expect.getState() : getState(globalThis[GLOBAL_EXPECT]);
    if (!state.soft)
      return fn2.apply(this, args);
    if (!test3)
      throw new Error("expect.soft() can only be used inside a test");
    try {
      return fn2.apply(this, args);
    } catch (err) {
      test3.result || (test3.result = { state: "fail" });
      test3.result.state = "fail";
      (_a2 = test3.result).errors || (_a2.errors = []);
      test3.result.errors.push(processError(err));
    }
  };
}
var JestChaiExpect = (chai3, utils) => {
  const { AssertionError: AssertionError2 } = chai3;
  const c = () => getColors();
  function def(name, fn2) {
    const addMethod = (n2) => {
      const softWrapper = wrapSoft(utils, fn2);
      utils.addMethod(chai3.Assertion.prototype, n2, softWrapper);
      utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, n2, softWrapper);
    };
    if (Array.isArray(name))
      name.forEach((n2) => addMethod(n2));
    else
      addMethod(name);
  }
  ["throw", "throws", "Throw"].forEach((m2) => {
    utils.overwriteMethod(chai3.Assertion.prototype, m2, (_super) => {
      return function(...args) {
        const promise = utils.flag(this, "promise");
        const object3 = utils.flag(this, "object");
        const isNot = utils.flag(this, "negate");
        if (promise === "rejects") {
          utils.flag(this, "object", () => {
            throw object3;
          });
        } else if (promise === "resolves" && typeof object3 !== "function") {
          if (!isNot) {
            const message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't";
            const error = {
              showDiff: false
            };
            throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
          } else {
            return;
          }
        }
        _super.apply(this, args);
      };
    });
  });
  def("withTest", function(test3) {
    utils.flag(this, "vitest-test", test3);
    return this;
  });
  def("toEqual", function(expected) {
    const actual = utils.flag(this, "object");
    const equal = equals(
      actual,
      expected,
      [iterableEquality]
    );
    return this.assert(
      equal,
      "expected #{this} to deeply equal #{exp}",
      "expected #{this} to not deeply equal #{exp}",
      expected,
      actual
    );
  });
  def("toStrictEqual", function(expected) {
    const obj = utils.flag(this, "object");
    const equal = equals(
      obj,
      expected,
      [
        iterableEquality,
        typeEquality,
        sparseArrayEquality,
        arrayBufferEquality
      ],
      true
    );
    return this.assert(
      equal,
      "expected #{this} to strictly equal #{exp}",
      "expected #{this} to not strictly equal #{exp}",
      expected,
      obj
    );
  });
  def("toBe", function(expected) {
    const actual = this._obj;
    const pass = Object.is(actual, expected);
    let deepEqualityName = "";
    if (!pass) {
      const toStrictEqualPass = equals(
        actual,
        expected,
        [
          iterableEquality,
          typeEquality,
          sparseArrayEquality,
          arrayBufferEquality
        ],
        true
      );
      if (toStrictEqualPass) {
        deepEqualityName = "toStrictEqual";
      } else {
        const toEqualPass = equals(
          actual,
          expected,
          [iterableEquality]
        );
        if (toEqualPass)
          deepEqualityName = "toEqual";
      }
    }
    return this.assert(
      pass,
      generateToBeMessage(deepEqualityName),
      "expected #{this} not to be #{exp} // Object.is equality",
      expected,
      actual
    );
  });
  def("toMatchObject", function(expected) {
    const actual = this._obj;
    return this.assert(
      equals(actual, expected, [iterableEquality, subsetEquality]),
      "expected #{this} to match object #{exp}",
      "expected #{this} to not match object #{exp}",
      expected,
      actual
    );
  });
  def("toMatch", function(expected) {
    if (typeof expected === "string")
      return this.include(expected);
    else
      return this.match(expected);
  });
  def("toContain", function(item) {
    return this.contain(item);
  });
  def("toContainEqual", function(expected) {
    const obj = utils.flag(this, "object");
    const index2 = Array.from(obj).findIndex((item) => {
      return equals(item, expected);
    });
    this.assert(
      index2 !== -1,
      "expected #{this} to deep equally contain #{exp}",
      "expected #{this} to not deep equally contain #{exp}",
      expected
    );
  });
  def("toBeTruthy", function() {
    const obj = utils.flag(this, "object");
    this.assert(
      Boolean(obj),
      "expected #{this} to be truthy",
      "expected #{this} to not be truthy",
      obj,
      false
    );
  });
  def("toBeFalsy", function() {
    const obj = utils.flag(this, "object");
    this.assert(
      !obj,
      "expected #{this} to be falsy",
      "expected #{this} to not be falsy",
      obj,
      false
    );
  });
  def("toBeGreaterThan", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(
      actual > expected,
      `expected ${actual} to be greater than ${expected}`,
      `expected ${actual} to be not greater than ${expected}`,
      actual,
      expected,
      false
    );
  });
  def("toBeGreaterThanOrEqual", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(
      actual >= expected,
      `expected ${actual} to be greater than or equal to ${expected}`,
      `expected ${actual} to be not greater than or equal to ${expected}`,
      actual,
      expected,
      false
    );
  });
  def("toBeLessThan", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(
      actual < expected,
      `expected ${actual} to be less than ${expected}`,
      `expected ${actual} to be not less than ${expected}`,
      actual,
      expected,
      false
    );
  });
  def("toBeLessThanOrEqual", function(expected) {
    const actual = this._obj;
    assertTypes(actual, "actual", ["number", "bigint"]);
    assertTypes(expected, "expected", ["number", "bigint"]);
    return this.assert(
      actual <= expected,
      `expected ${actual} to be less than or equal to ${expected}`,
      `expected ${actual} to be not less than or equal to ${expected}`,
      actual,
      expected,
      false
    );
  });
  def("toBeNaN", function() {
    return this.be.NaN;
  });
  def("toBeUndefined", function() {
    return this.be.undefined;
  });
  def("toBeNull", function() {
    return this.be.null;
  });
  def("toBeDefined", function() {
    const negate = utils.flag(this, "negate");
    utils.flag(this, "negate", false);
    if (negate)
      return this.be.undefined;
    return this.not.be.undefined;
  });
  def("toBeTypeOf", function(expected) {
    const actual = typeof this._obj;
    const equal = expected === actual;
    return this.assert(
      equal,
      "expected #{this} to be type of #{exp}",
      "expected #{this} not to be type of #{exp}",
      expected,
      actual
    );
  });
  def("toBeInstanceOf", function(obj) {
    return this.instanceOf(obj);
  });
  def("toHaveLength", function(length) {
    return this.have.length(length);
  });
  def("toHaveProperty", function(...args) {
    if (Array.isArray(args[0]))
      args[0] = args[0].map((key) => String(key).replace(/([.[\]])/g, "\\$1")).join(".");
    const actual = this._obj;
    const [propertyName, expected] = args;
    const getValue = () => {
      const hasOwn = Object.prototype.hasOwnProperty.call(actual, propertyName);
      if (hasOwn)
        return { value: actual[propertyName], exists: true };
      return utils.getPathInfo(actual, propertyName);
    };
    const { value, exists } = getValue();
    const pass = exists && (args.length === 1 || equals(expected, value));
    const valueString = args.length === 1 ? "" : ` with value ${utils.objDisplay(expected)}`;
    return this.assert(
      pass,
      `expected #{this} to have property "${propertyName}"${valueString}`,
      `expected #{this} to not have property "${propertyName}"${valueString}`,
      actual
    );
  });
  def("toBeCloseTo", function(received, precision = 2) {
    const expected = this._obj;
    let pass = false;
    let expectedDiff = 0;
    let receivedDiff = 0;
    if (received === Number.POSITIVE_INFINITY && expected === Number.POSITIVE_INFINITY) {
      pass = true;
    } else if (received === Number.NEGATIVE_INFINITY && expected === Number.NEGATIVE_INFINITY) {
      pass = true;
    } else {
      expectedDiff = 10 ** -precision / 2;
      receivedDiff = Math.abs(expected - received);
      pass = receivedDiff < expectedDiff;
    }
    return this.assert(
      pass,
      `expected #{this} to be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`,
      `expected #{this} to not be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`,
      received,
      expected,
      false
    );
  });
  const assertIsMock = (assertion) => {
    if (!isMockFunction(assertion._obj))
      throw new TypeError(`${utils.inspect(assertion._obj)} is not a spy or a call to a spy!`);
  };
  const getSpy = (assertion) => {
    assertIsMock(assertion);
    return assertion._obj;
  };
  const ordinalOf = (i) => {
    const j = i % 10;
    const k = i % 100;
    if (j === 1 && k !== 11)
      return `${i}st`;
    if (j === 2 && k !== 12)
      return `${i}nd`;
    if (j === 3 && k !== 13)
      return `${i}rd`;
    return `${i}th`;
  };
  const formatCalls = (spy, msg, actualCall) => {
    if (spy.mock.calls) {
      msg += c().gray(`

Received: 

${spy.mock.calls.map((callArg, i) => {
        let methodCall = c().bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call:

`);
        if (actualCall)
          methodCall += diff(actualCall, callArg, { omitAnnotationLines: true });
        else
          methodCall += stringify(callArg).split("\n").map((line) => `    ${line}`).join("\n");
        methodCall += "\n";
        return methodCall;
      }).join("\n")}`);
    }
    msg += c().gray(`

Number of calls: ${c().bold(spy.mock.calls.length)}
`);
    return msg;
  };
  const formatReturns = (spy, msg, actualReturn) => {
    msg += c().gray(`

Received: 

${spy.mock.results.map((callReturn, i) => {
      let methodCall = c().bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call return:

`);
      if (actualReturn)
        methodCall += diff(actualReturn, callReturn.value, { omitAnnotationLines: true });
      else
        methodCall += stringify(callReturn).split("\n").map((line) => `    ${line}`).join("\n");
      methodCall += "\n";
      return methodCall;
    }).join("\n")}`);
    msg += c().gray(`

Number of calls: ${c().bold(spy.mock.calls.length)}
`);
    return msg;
  };
  def(["toHaveBeenCalledTimes", "toBeCalledTimes"], function(number2) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const callCount = spy.mock.calls.length;
    return this.assert(
      callCount === number2,
      `expected "${spyName}" to be called #{exp} times, but got ${callCount} times`,
      `expected "${spyName}" to not be called #{exp} times`,
      number2,
      callCount,
      false
    );
  });
  def("toHaveBeenCalledOnce", function() {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const callCount = spy.mock.calls.length;
    return this.assert(
      callCount === 1,
      `expected "${spyName}" to be called once, but got ${callCount} times`,
      `expected "${spyName}" to not be called once`,
      1,
      callCount,
      false
    );
  });
  def(["toHaveBeenCalled", "toBeCalled"], function() {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const callCount = spy.mock.calls.length;
    const called = callCount > 0;
    const isNot = utils.flag(this, "negate");
    let msg = utils.getMessage(
      this,
      [
        called,
        `expected "${spyName}" to be called at least once`,
        `expected "${spyName}" to not be called at all, but actually been called ${callCount} times`,
        true,
        called
      ]
    );
    if (called && isNot)
      msg = formatCalls(spy, msg);
    if (called && isNot || !called && !isNot)
      throw new AssertionError2(msg);
  });
  def(["toHaveBeenCalledWith", "toBeCalledWith"], function(...args) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const pass = spy.mock.calls.some((callArg) => equals(callArg, args, [iterableEquality]));
    const isNot = utils.flag(this, "negate");
    const msg = utils.getMessage(
      this,
      [
        pass,
        `expected "${spyName}" to be called with arguments: #{exp}`,
        `expected "${spyName}" to not be called with arguments: #{exp}`,
        args
      ]
    );
    if (pass && isNot || !pass && !isNot)
      throw new AssertionError2(formatCalls(spy, msg, args));
  });
  def(["toHaveBeenNthCalledWith", "nthCalledWith"], function(times, ...args) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const nthCall = spy.mock.calls[times - 1];
    this.assert(
      equals(nthCall, args, [iterableEquality]),
      `expected ${ordinalOf(times)} "${spyName}" call to have been called with #{exp}`,
      `expected ${ordinalOf(times)} "${spyName}" call to not have been called with #{exp}`,
      args,
      nthCall
    );
  });
  def(["toHaveBeenLastCalledWith", "lastCalledWith"], function(...args) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
    this.assert(
      equals(lastCall, args, [iterableEquality]),
      `expected last "${spyName}" call to have been called with #{exp}`,
      `expected last "${spyName}" call to not have been called with #{exp}`,
      args,
      lastCall
    );
  });
  def(["toThrow", "toThrowError"], function(expected) {
    if (typeof expected === "string" || typeof expected === "undefined" || expected instanceof RegExp)
      return this.throws(expected);
    const obj = this._obj;
    const promise = utils.flag(this, "promise");
    const isNot = utils.flag(this, "negate");
    let thrown = null;
    if (promise === "rejects") {
      thrown = obj;
    } else if (promise === "resolves" && typeof obj !== "function") {
      if (!isNot) {
        const message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't";
        const error = {
          showDiff: false
        };
        throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
      } else {
        return;
      }
    } else {
      let isThrow = false;
      try {
        obj();
      } catch (err) {
        isThrow = true;
        thrown = err;
      }
      if (!isThrow && !isNot) {
        const message = utils.flag(this, "message") || "expected function to throw an error, but it didn't";
        const error = {
          showDiff: false
        };
        throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
      }
    }
    if (typeof expected === "function") {
      const name = expected.name || expected.prototype.constructor.name;
      return this.assert(
        thrown && thrown instanceof expected,
        `expected error to be instance of ${name}`,
        `expected error not to be instance of ${name}`,
        expected,
        thrown,
        false
      );
    }
    if (expected instanceof Error) {
      return this.assert(
        thrown && expected.message === thrown.message,
        `expected error to have message: ${expected.message}`,
        `expected error not to have message: ${expected.message}`,
        expected.message,
        thrown && thrown.message
      );
    }
    if (typeof expected === "object" && "asymmetricMatch" in expected && typeof expected.asymmetricMatch === "function") {
      const matcher = expected;
      return this.assert(
        thrown && matcher.asymmetricMatch(thrown),
        "expected error to match asymmetric matcher",
        "expected error not to match asymmetric matcher",
        matcher.toString(),
        thrown,
        false
      );
    }
    throw new Error(`"toThrow" expects string, RegExp, function, Error instance or asymmetric matcher, got "${typeof expected}"`);
  });
  def(["toHaveReturned", "toReturn"], function() {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const calledAndNotThrew = spy.mock.calls.length > 0 && spy.mock.results.some(({ type: type2 }) => type2 !== "throw");
    this.assert(
      calledAndNotThrew,
      `expected "${spyName}" to be successfully called at least once`,
      `expected "${spyName}" to not be successfully called`,
      calledAndNotThrew,
      !calledAndNotThrew,
      false
    );
  });
  def(["toHaveReturnedTimes", "toReturnTimes"], function(times) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const successfulReturns = spy.mock.results.reduce((success, { type: type2 }) => type2 === "throw" ? success : ++success, 0);
    this.assert(
      successfulReturns === times,
      `expected "${spyName}" to be successfully called ${times} times`,
      `expected "${spyName}" to not be successfully called ${times} times`,
      `expected number of returns: ${times}`,
      `received number of returns: ${successfulReturns}`,
      false
    );
  });
  def(["toHaveReturnedWith", "toReturnWith"], function(value) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const pass = spy.mock.results.some(({ type: type2, value: result }) => type2 === "return" && equals(value, result));
    const isNot = utils.flag(this, "negate");
    const msg = utils.getMessage(
      this,
      [
        pass,
        `expected "${spyName}" to return with: #{exp} at least once`,
        `expected "${spyName}" to not return with: #{exp}`,
        value
      ]
    );
    if (pass && isNot || !pass && !isNot)
      throw new AssertionError2(formatReturns(spy, msg, value));
  });
  def(["toHaveLastReturnedWith", "lastReturnedWith"], function(value) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const { value: lastResult } = spy.mock.results[spy.mock.results.length - 1];
    const pass = equals(lastResult, value);
    this.assert(
      pass,
      `expected last "${spyName}" call to return #{exp}`,
      `expected last "${spyName}" call to not return #{exp}`,
      value,
      lastResult
    );
  });
  def(["toHaveNthReturnedWith", "nthReturnedWith"], function(nthCall, value) {
    const spy = getSpy(this);
    const spyName = spy.getMockName();
    const isNot = utils.flag(this, "negate");
    const { type: callType, value: callResult } = spy.mock.results[nthCall - 1];
    const ordinalCall = `${ordinalOf(nthCall)} call`;
    if (!isNot && callType === "throw")
      chai3.assert.fail(`expected ${ordinalCall} to return #{exp}, but instead it threw an error`);
    const nthCallReturn = equals(callResult, value);
    this.assert(
      nthCallReturn,
      `expected ${ordinalCall} "${spyName}" call to return #{exp}`,
      `expected ${ordinalCall} "${spyName}" call to not return #{exp}`,
      value,
      callResult
    );
  });
  def("toSatisfy", function(matcher, message) {
    return this.be.satisfy(matcher, message);
  });
  utils.addProperty(chai3.Assertion.prototype, "resolves", function __VITEST_RESOLVES__() {
    const error = new Error("resolves");
    utils.flag(this, "promise", "resolves");
    utils.flag(this, "error", error);
    const test3 = utils.flag(this, "vitest-test");
    const obj = utils.flag(this, "object");
    if (typeof (obj == null ? void 0 : obj.then) !== "function")
      throw new TypeError(`You must provide a Promise to expect() when using .resolves, not '${typeof obj}'.`);
    const proxy = new Proxy(this, {
      get: (target, key, receiver) => {
        const result = Reflect.get(target, key, receiver);
        if (typeof result !== "function")
          return result instanceof chai3.Assertion ? proxy : result;
        return async (...args) => {
          const promise = obj.then(
            (value) => {
              utils.flag(this, "object", value);
              return result.call(this, ...args);
            },
            (err) => {
              const _error = new AssertionError2(
                `promise rejected "${utils.inspect(err)}" instead of resolving`,
                { showDiff: false }
              );
              _error.stack = error.stack.replace(error.message, _error.message);
              throw _error;
            }
          );
          return recordAsyncExpect(test3, promise);
        };
      }
    });
    return proxy;
  });
  utils.addProperty(chai3.Assertion.prototype, "rejects", function __VITEST_REJECTS__() {
    const error = new Error("rejects");
    utils.flag(this, "promise", "rejects");
    utils.flag(this, "error", error);
    const test3 = utils.flag(this, "vitest-test");
    const obj = utils.flag(this, "object");
    const wrapper = typeof obj === "function" ? obj() : obj;
    if (typeof (wrapper == null ? void 0 : wrapper.then) !== "function")
      throw new TypeError(`You must provide a Promise to expect() when using .rejects, not '${typeof wrapper}'.`);
    const proxy = new Proxy(this, {
      get: (target, key, receiver) => {
        const result = Reflect.get(target, key, receiver);
        if (typeof result !== "function")
          return result instanceof chai3.Assertion ? proxy : result;
        return async (...args) => {
          const promise = wrapper.then(
            (value) => {
              const _error = new AssertionError2(
                `promise resolved "${utils.inspect(value)}" instead of rejecting`,
                { showDiff: false }
              );
              _error.stack = error.stack.replace(error.message, _error.message);
              throw _error;
            },
            (err) => {
              utils.flag(this, "object", err);
              return result.call(this, ...args);
            }
          );
          return recordAsyncExpect(test3, promise);
        };
      }
    });
    return proxy;
  });
};
function getMatcherState(assertion, expect2) {
  const obj = assertion._obj;
  const isNot = util.flag(assertion, "negate");
  const promise = util.flag(assertion, "promise") || "";
  const jestUtils = {
    ...getMatcherUtils(),
    diff,
    stringify,
    iterableEquality,
    subsetEquality
  };
  const matcherState = {
    ...getState(expect2),
    isNot,
    utils: jestUtils,
    promise,
    equals,
    // needed for built-in jest-snapshots, but we don't use it
    suppressedErrors: []
  };
  return {
    state: matcherState,
    isNot,
    obj
  };
}
var JestExtendError = class extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.actual = actual;
    this.expected = expected;
  }
};
function JestExtendPlugin(expect2, matchers) {
  return (c, utils) => {
    Object.entries(matchers).forEach(([expectAssertionName, expectAssertion]) => {
      function expectWrapper(...args) {
        const { state, isNot, obj } = getMatcherState(this, expect2);
        const result = expectAssertion.call(state, obj, ...args);
        if (result && typeof result === "object" && result instanceof Promise) {
          return result.then(({ pass: pass2, message: message2, actual: actual2, expected: expected2 }) => {
            if (pass2 && isNot || !pass2 && !isNot)
              throw new JestExtendError(message2(), actual2, expected2);
          });
        }
        const { pass, message, actual, expected } = result;
        if (pass && isNot || !pass && !isNot)
          throw new JestExtendError(message(), actual, expected);
      }
      const softWrapper = wrapSoft(utils, expectWrapper);
      utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, expectAssertionName, softWrapper);
      utils.addMethod(c.Assertion.prototype, expectAssertionName, softWrapper);
      class CustomMatcher extends AsymmetricMatcher3 {
        constructor(inverse = false, ...sample) {
          super(sample, inverse);
        }
        asymmetricMatch(other) {
          const { pass } = expectAssertion.call(
            this.getMatcherContext(expect2),
            other,
            ...this.sample
          );
          return this.inverse ? !pass : pass;
        }
        toString() {
          return `${this.inverse ? "not." : ""}${expectAssertionName}`;
        }
        getExpectedType() {
          return "any";
        }
        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.map(String).join(", ")}>`;
        }
      }
      Object.defineProperty(expect2, expectAssertionName, {
        configurable: true,
        enumerable: true,
        value: (...sample) => new CustomMatcher(false, ...sample),
        writable: true
      });
      Object.defineProperty(expect2.not, expectAssertionName, {
        configurable: true,
        enumerable: true,
        value: (...sample) => new CustomMatcher(true, ...sample),
        writable: true
      });
    });
  };
}
var JestExtend = (chai3, utils) => {
  utils.addMethod(chai3.expect, "extend", (expect2, expects) => {
    chai3.use(JestExtendPlugin(expect2, expects));
  });
};

// ../../node_modules/.pnpm/@vitest+snapshot@0.34.6/node_modules/@vitest/snapshot/dist/index.js
var import_pretty_format5 = __toESM(require_build(), 1);
function getDefaultExportFromCjs2(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var naturalCompare$2 = { exports: {} };
var naturalCompare = function(a, b2) {
  var i, codeA, codeB = 1, posA = 0, posB = 0, alphabet = String.alphabet;
  function getCode(str, pos, code) {
    if (code) {
      for (i = pos; code = getCode(str, i), code < 76 && code > 65; )
        ++i;
      return +str.slice(pos - 1, i);
    }
    code = alphabet && alphabet.indexOf(str.charAt(pos));
    return code > -1 ? code + 76 : (code = str.charCodeAt(pos) || 0, code < 45 || code > 127) ? code : code < 46 ? 65 : code < 48 ? code - 1 : code < 58 ? code + 18 : code < 65 ? code - 11 : code < 91 ? code + 11 : code < 97 ? code - 37 : code < 123 ? code + 5 : code - 63;
  }
  if ((a += "") != (b2 += ""))
    for (; codeB; ) {
      codeA = getCode(a, posA++);
      codeB = getCode(b2, posB++);
      if (codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66) {
        codeA = getCode(a, posA, posA);
        codeB = getCode(b2, posB, posA = i);
        posB = i;
      }
      if (codeA != codeB)
        return codeA < codeB ? -1 : 1;
    }
  return 0;
};
try {
  naturalCompare$2.exports = naturalCompare;
} catch (e) {
  String.naturalCompare = naturalCompare;
}
var naturalCompareExports = naturalCompare$2.exports;
var naturalCompare$1 = /* @__PURE__ */ getDefaultExportFromCjs2(naturalCompareExports);
function notNullish2(v2) {
  return v2 != null;
}
function isPrimitive2(value) {
  return value === null || typeof value !== "function" && typeof value !== "object";
}
function isObject3(item) {
  return item != null && typeof item === "object" && !Array.isArray(item);
}
function getCallLastIndex2(code) {
  let charIndex = -1;
  let inString = null;
  let startedBracers = 0;
  let endedBracers = 0;
  let beforeChar = null;
  while (charIndex <= code.length) {
    beforeChar = code[charIndex];
    charIndex++;
    const char = code[charIndex];
    const isCharString = char === '"' || char === "'" || char === "`";
    if (isCharString && beforeChar !== "\\") {
      if (inString === char)
        inString = null;
      else if (!inString)
        inString = char;
    }
    if (!inString) {
      if (char === "(")
        startedBracers++;
      if (char === ")")
        endedBracers++;
    }
    if (startedBracers && endedBracers && startedBracers === endedBracers)
      return charIndex;
  }
  return null;
}
var getPromiseValue2 = () => "Promise{\u2026}";
try {
  const { getPromiseDetails, kPending, kRejected } = process.binding("util");
  if (Array.isArray(getPromiseDetails(Promise.resolve()))) {
    getPromiseValue2 = (value, options) => {
      const [state, innerValue] = getPromiseDetails(value);
      if (state === kPending) {
        return "Promise{<pending>}";
      }
      return `Promise${state === kRejected ? "!" : ""}{${options.inspect(innerValue, options)}}`;
    };
  }
} catch (notNode) {
}
var nodeInspect2 = false;
try {
  const nodeUtil = require("util");
  nodeInspect2 = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
} catch (noNodeInspect) {
  nodeInspect2 = false;
}
var lineSplitRE = /\r?\n/;
function positionToOffset(source, lineNumber, columnNumber) {
  const lines = source.split(lineSplitRE);
  const nl = /\r\n/.test(source) ? 2 : 1;
  let start = 0;
  if (lineNumber > lines.length)
    return source.length;
  for (let i2 = 0; i2 < lineNumber - 1; i2++)
    start += lines[i2].length + nl;
  return start + columnNumber;
}
function offsetToLineNumber(source, offset) {
  if (offset > source.length) {
    throw new Error(
      `offset is longer than source length! offset ${offset} > length ${source.length}`
    );
  }
  const lines = source.split(lineSplitRE);
  const nl = /\r\n/.test(source) ? 2 : 1;
  let counted = 0;
  let line = 0;
  for (; line < lines.length; line++) {
    const lineLength = lines[line].length + nl;
    if (counted + lineLength >= offset)
      break;
    counted += lineLength;
  }
  return line + 1;
}
var serialize$1 = (val, config2, indentation, depth, refs, printer) => {
  const name = val.getMockName();
  const nameString = name === "vi.fn()" ? "" : ` ${name}`;
  let callsString = "";
  if (val.mock.calls.length !== 0) {
    const indentationNext = indentation + config2.indent;
    callsString = ` {${config2.spacingOuter}${indentationNext}"calls": ${printer(val.mock.calls, config2, indentationNext, depth, refs)}${config2.min ? ", " : ","}${config2.spacingOuter}${indentationNext}"results": ${printer(val.mock.results, config2, indentationNext, depth, refs)}${config2.min ? "" : ","}${config2.spacingOuter}${indentation}}`;
  }
  return `[MockFunction${nameString}]${callsString}`;
};
var test2 = (val) => val && !!val._isMockFunction;
var plugin = { serialize: serialize$1, test: test2 };
var {
  DOMCollection: DOMCollection3,
  DOMElement: DOMElement3,
  Immutable: Immutable3,
  ReactElement: ReactElement3,
  ReactTestComponent: ReactTestComponent3,
  AsymmetricMatcher: AsymmetricMatcher4
} = import_pretty_format5.plugins;
var PLUGINS3 = [
  ReactTestComponent3,
  ReactElement3,
  DOMElement3,
  DOMCollection3,
  Immutable3,
  AsymmetricMatcher4,
  plugin
];
function addSerializer(plugin2) {
  PLUGINS3 = [plugin2].concat(PLUGINS3);
}
function getSerializers() {
  return PLUGINS3;
}
function testNameToKey(testName, count) {
  return `${testName} ${count}`;
}
function keyToTestName(key) {
  if (!/ \d+$/.test(key))
    throw new Error("Snapshot keys must end with a number.");
  return key.replace(/ \d+$/, "");
}
function getSnapshotData(content, options) {
  const update = options.updateSnapshot;
  const data = /* @__PURE__ */ Object.create(null);
  let snapshotContents = "";
  let dirty = false;
  if (content != null) {
    try {
      snapshotContents = content;
      const populate = new Function("exports", snapshotContents);
      populate(data);
    } catch {
    }
  }
  const isInvalid = snapshotContents;
  if ((update === "all" || update === "new") && isInvalid)
    dirty = true;
  return { data, dirty };
}
function addExtraLineBreaks(string4) {
  return string4.includes("\n") ? `
${string4}
` : string4;
}
function removeExtraLineBreaks(string4) {
  return string4.length > 2 && string4.startsWith("\n") && string4.endsWith("\n") ? string4.slice(1, -1) : string4;
}
var escapeRegex = true;
var printFunctionName = false;
function serialize(val, indent = 2, formatOverrides = {}) {
  return normalizeNewlines(
    (0, import_pretty_format5.format)(val, {
      escapeRegex,
      indent,
      plugins: getSerializers(),
      printFunctionName,
      ...formatOverrides
    })
  );
}
function escapeBacktickString(str) {
  return str.replace(/`|\\|\${/g, "\\$&");
}
function printBacktickString(str) {
  return `\`${escapeBacktickString(str)}\``;
}
function normalizeNewlines(string4) {
  return string4.replace(/\r\n|\r/g, "\n");
}
async function saveSnapshotFile(environment, snapshotData, snapshotPath) {
  const snapshots = Object.keys(snapshotData).sort(naturalCompare$1).map(
    (key) => `exports[${printBacktickString(key)}] = ${printBacktickString(normalizeNewlines(snapshotData[key]))};`
  );
  const content = `${environment.getHeader()}

${snapshots.join("\n\n")}
`;
  const oldContent = await environment.readSnapshotFile(snapshotPath);
  const skipWriting = oldContent != null && oldContent === content;
  if (skipWriting)
    return;
  await environment.saveSnapshotFile(
    snapshotPath,
    content
  );
}
function prepareExpected(expected) {
  function findStartIndent() {
    var _a2, _b;
    const matchObject = /^( +)}\s+$/m.exec(expected || "");
    const objectIndent = (_a2 = matchObject == null ? void 0 : matchObject[1]) == null ? void 0 : _a2.length;
    if (objectIndent)
      return objectIndent;
    const matchText = /^\n( +)"/.exec(expected || "");
    return ((_b = matchText == null ? void 0 : matchText[1]) == null ? void 0 : _b.length) || 0;
  }
  const startIndent = findStartIndent();
  let expectedTrimmed = expected == null ? void 0 : expected.trim();
  if (startIndent) {
    expectedTrimmed = expectedTrimmed == null ? void 0 : expectedTrimmed.replace(new RegExp(`^${" ".repeat(startIndent)}`, "gm"), "").replace(/ +}$/, "}");
  }
  return expectedTrimmed;
}
function deepMergeArray(target = [], source = []) {
  const mergedOutput = Array.from(target);
  source.forEach((sourceElement, index2) => {
    const targetElement = mergedOutput[index2];
    if (Array.isArray(target[index2])) {
      mergedOutput[index2] = deepMergeArray(target[index2], sourceElement);
    } else if (isObject3(targetElement)) {
      mergedOutput[index2] = deepMergeSnapshot(target[index2], sourceElement);
    } else {
      mergedOutput[index2] = sourceElement;
    }
  });
  return mergedOutput;
}
function deepMergeSnapshot(target, source) {
  if (isObject3(target) && isObject3(source)) {
    const mergedOutput = { ...target };
    Object.keys(source).forEach((key) => {
      if (isObject3(source[key]) && !source[key].$$typeof) {
        if (!(key in target))
          Object.assign(mergedOutput, { [key]: source[key] });
        else
          mergedOutput[key] = deepMergeSnapshot(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        mergedOutput[key] = deepMergeArray(target[key], source[key]);
      } else {
        Object.assign(mergedOutput, { [key]: source[key] });
      }
    });
    return mergedOutput;
  } else if (Array.isArray(target) && Array.isArray(source)) {
    return deepMergeArray(target, source);
  }
  return target;
}
function normalizeWindowsPath(input = "") {
  if (!input || !input.includes("\\")) {
    return input;
  }
  return input.replace(/\\/g, "/");
}
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
function cwd() {
  if (typeof process !== "undefined") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
var resolve$2 = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index2 = arguments_.length - 1; index2 >= -1 && !resolvedAbsolute; index2--) {
    const path2 = index2 >= 0 ? arguments_[index2] : cwd();
    if (!path2 || path2.length === 0) {
      continue;
    }
    resolvedPath = `${path2}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path2);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index2 = 0; index2 <= path2.length; ++index2) {
    if (index2 < path2.length) {
      char = path2[index2];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index2 - 1 || dots === 1)
        ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index2;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, index2)}`;
        } else {
          res = path2.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute = function(p2) {
  return _IS_ABSOLUTE_RE.test(p2);
};
var comma2 = ",".charCodeAt(0);
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar2 = new Uint8Array(64);
var charToInt2 = new Uint8Array(128);
for (let i = 0; i < chars2.length; i++) {
  const c = chars2.charCodeAt(i);
  intToChar2[i] = c;
  charToInt2[c] = i;
}
function decode(mappings) {
  const state = new Int32Array(5);
  const decoded = [];
  let index2 = 0;
  do {
    const semi = indexOf(mappings, index2);
    const line = [];
    let sorted = true;
    let lastCol = 0;
    state[0] = 0;
    for (let i = index2; i < semi; i++) {
      let seg;
      i = decodeInteger(mappings, i, state, 0);
      const col = state[0];
      if (col < lastCol)
        sorted = false;
      lastCol = col;
      if (hasMoreVlq(mappings, i, semi)) {
        i = decodeInteger(mappings, i, state, 1);
        i = decodeInteger(mappings, i, state, 2);
        i = decodeInteger(mappings, i, state, 3);
        if (hasMoreVlq(mappings, i, semi)) {
          i = decodeInteger(mappings, i, state, 4);
          seg = [col, state[1], state[2], state[3], state[4]];
        } else {
          seg = [col, state[1], state[2], state[3]];
        }
      } else {
        seg = [col];
      }
      line.push(seg);
    }
    if (!sorted)
      sort(line);
    decoded.push(line);
    index2 = semi + 1;
  } while (index2 <= mappings.length);
  return decoded;
}
function indexOf(mappings, index2) {
  const idx = mappings.indexOf(";", index2);
  return idx === -1 ? mappings.length : idx;
}
function decodeInteger(mappings, pos, state, j) {
  let value = 0;
  let shift = 0;
  let integer = 0;
  do {
    const c = mappings.charCodeAt(pos++);
    integer = charToInt2[c];
    value |= (integer & 31) << shift;
    shift += 5;
  } while (integer & 32);
  const shouldNegate = value & 1;
  value >>>= 1;
  if (shouldNegate) {
    value = -2147483648 | -value;
  }
  state[j] += value;
  return pos;
}
function hasMoreVlq(mappings, i, length) {
  if (i >= length)
    return false;
  return mappings.charCodeAt(i) !== comma2;
}
function sort(line) {
  line.sort(sortComparator$1);
}
function sortComparator$1(a, b2) {
  return a[0] - b2[0];
}
var schemeRegex = /^[\w+.-]+:\/\//;
var urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
var fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
var UrlType;
(function(UrlType22) {
  UrlType22[UrlType22["Empty"] = 1] = "Empty";
  UrlType22[UrlType22["Hash"] = 2] = "Hash";
  UrlType22[UrlType22["Query"] = 3] = "Query";
  UrlType22[UrlType22["RelativePath"] = 4] = "RelativePath";
  UrlType22[UrlType22["AbsolutePath"] = 5] = "AbsolutePath";
  UrlType22[UrlType22["SchemeRelative"] = 6] = "SchemeRelative";
  UrlType22[UrlType22["Absolute"] = 7] = "Absolute";
})(UrlType || (UrlType = {}));
function isAbsoluteUrl(input) {
  return schemeRegex.test(input);
}
function isSchemeRelativeUrl(input) {
  return input.startsWith("//");
}
function isAbsolutePath(input) {
  return input.startsWith("/");
}
function isFileUrl(input) {
  return input.startsWith("file:");
}
function isRelative(input) {
  return /^[.?#]/.test(input);
}
function parseAbsoluteUrl(input) {
  const match = urlRegex.exec(input);
  return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
}
function parseFileUrl(input) {
  const match = fileRegex.exec(input);
  const path2 = match[2];
  return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path2) ? path2 : "/" + path2, match[3] || "", match[4] || "");
}
function makeUrl(scheme, user, host, port, path2, query, hash) {
  return {
    scheme,
    user,
    host,
    port,
    path: path2,
    query,
    hash,
    type: UrlType.Absolute
  };
}
function parseUrl(input) {
  if (isSchemeRelativeUrl(input)) {
    const url2 = parseAbsoluteUrl("http:" + input);
    url2.scheme = "";
    url2.type = UrlType.SchemeRelative;
    return url2;
  }
  if (isAbsolutePath(input)) {
    const url2 = parseAbsoluteUrl("http://foo.com" + input);
    url2.scheme = "";
    url2.host = "";
    url2.type = UrlType.AbsolutePath;
    return url2;
  }
  if (isFileUrl(input))
    return parseFileUrl(input);
  if (isAbsoluteUrl(input))
    return parseAbsoluteUrl(input);
  const url = parseAbsoluteUrl("http://foo.com/" + input);
  url.scheme = "";
  url.host = "";
  url.type = input ? input.startsWith("?") ? UrlType.Query : input.startsWith("#") ? UrlType.Hash : UrlType.RelativePath : UrlType.Empty;
  return url;
}
function stripPathFilename(path2) {
  if (path2.endsWith("/.."))
    return path2;
  const index2 = path2.lastIndexOf("/");
  return path2.slice(0, index2 + 1);
}
function mergePaths(url, base) {
  normalizePath(base, base.type);
  if (url.path === "/") {
    url.path = base.path;
  } else {
    url.path = stripPathFilename(base.path) + url.path;
  }
}
function normalizePath(url, type2) {
  const rel = type2 <= UrlType.RelativePath;
  const pieces = url.path.split("/");
  let pointer = 1;
  let positive = 0;
  let addTrailingSlash = false;
  for (let i = 1; i < pieces.length; i++) {
    const piece = pieces[i];
    if (!piece) {
      addTrailingSlash = true;
      continue;
    }
    addTrailingSlash = false;
    if (piece === ".")
      continue;
    if (piece === "..") {
      if (positive) {
        addTrailingSlash = true;
        positive--;
        pointer--;
      } else if (rel) {
        pieces[pointer++] = piece;
      }
      continue;
    }
    pieces[pointer++] = piece;
    positive++;
  }
  let path2 = "";
  for (let i = 1; i < pointer; i++) {
    path2 += "/" + pieces[i];
  }
  if (!path2 || addTrailingSlash && !path2.endsWith("/..")) {
    path2 += "/";
  }
  url.path = path2;
}
function resolve$1(input, base) {
  if (!input && !base)
    return "";
  const url = parseUrl(input);
  let inputType = url.type;
  if (base && inputType !== UrlType.Absolute) {
    const baseUrl = parseUrl(base);
    const baseType = baseUrl.type;
    switch (inputType) {
      case UrlType.Empty:
        url.hash = baseUrl.hash;
      case UrlType.Hash:
        url.query = baseUrl.query;
      case UrlType.Query:
      case UrlType.RelativePath:
        mergePaths(url, baseUrl);
      case UrlType.AbsolutePath:
        url.user = baseUrl.user;
        url.host = baseUrl.host;
        url.port = baseUrl.port;
      case UrlType.SchemeRelative:
        url.scheme = baseUrl.scheme;
    }
    if (baseType > inputType)
      inputType = baseType;
  }
  normalizePath(url, inputType);
  const queryHash = url.query + url.hash;
  switch (inputType) {
    case UrlType.Hash:
    case UrlType.Query:
      return queryHash;
    case UrlType.RelativePath: {
      const path2 = url.path.slice(1);
      if (!path2)
        return queryHash || ".";
      if (isRelative(base || input) && !isRelative(path2)) {
        return "./" + path2 + queryHash;
      }
      return path2 + queryHash;
    }
    case UrlType.AbsolutePath:
      return url.path + queryHash;
    default:
      return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
  }
}
function resolve(input, base) {
  if (base && !base.endsWith("/"))
    base += "/";
  return resolve$1(input, base);
}
function stripFilename(path2) {
  if (!path2)
    return "";
  const index2 = path2.lastIndexOf("/");
  return path2.slice(0, index2 + 1);
}
var COLUMN = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
function maybeSort(mappings, owned) {
  const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
  if (unsortedIndex === mappings.length)
    return mappings;
  if (!owned)
    mappings = mappings.slice();
  for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
    mappings[i] = sortSegments(mappings[i], owned);
  }
  return mappings;
}
function nextUnsortedSegmentLine(mappings, start) {
  for (let i = start; i < mappings.length; i++) {
    if (!isSorted(mappings[i]))
      return i;
  }
  return mappings.length;
}
function isSorted(line) {
  for (let j = 1; j < line.length; j++) {
    if (line[j][COLUMN] < line[j - 1][COLUMN]) {
      return false;
    }
  }
  return true;
}
function sortSegments(line, owned) {
  if (!owned)
    line = line.slice();
  return line.sort(sortComparator);
}
function sortComparator(a, b2) {
  return a[COLUMN] - b2[COLUMN];
}
var found = false;
function binarySearch(haystack, needle, low, high) {
  while (low <= high) {
    const mid = low + (high - low >> 1);
    const cmp = haystack[mid][COLUMN] - needle;
    if (cmp === 0) {
      found = true;
      return mid;
    }
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  found = false;
  return low - 1;
}
function upperBound(haystack, needle, index2) {
  for (let i = index2 + 1; i < haystack.length; index2 = i++) {
    if (haystack[i][COLUMN] !== needle)
      break;
  }
  return index2;
}
function lowerBound(haystack, needle, index2) {
  for (let i = index2 - 1; i >= 0; index2 = i--) {
    if (haystack[i][COLUMN] !== needle)
      break;
  }
  return index2;
}
function memoizedState() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function memoizedBinarySearch(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0;
  let high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle) {
      found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
      return lastIndex;
    }
    if (needle >= lastNeedle) {
      low = lastIndex === -1 ? 0 : lastIndex;
    } else {
      high = lastIndex;
    }
  }
  state.lastKey = key;
  state.lastNeedle = needle;
  return state.lastIndex = binarySearch(haystack, needle, low, high);
}
var LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
var COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
var LEAST_UPPER_BOUND = -1;
var GREATEST_LOWER_BOUND = 1;
var decodedMappings;
var originalPositionFor;
var TraceMap = class {
  constructor(map2, mapUrl) {
    const isString = typeof map2 === "string";
    if (!isString && map2._decodedMemo)
      return map2;
    const parsed = isString ? JSON.parse(map2) : map2;
    const { version: version2, file, names, sourceRoot, sources, sourcesContent } = parsed;
    this.version = version2;
    this.file = file;
    this.names = names;
    this.sourceRoot = sourceRoot;
    this.sources = sources;
    this.sourcesContent = sourcesContent;
    const from = resolve(sourceRoot || "", stripFilename(mapUrl));
    this.resolvedSources = sources.map((s) => resolve(s || "", from));
    const { mappings } = parsed;
    if (typeof mappings === "string") {
      this._encoded = mappings;
      this._decoded = void 0;
    } else {
      this._encoded = void 0;
      this._decoded = maybeSort(mappings, isString);
    }
    this._decodedMemo = memoizedState();
    this._bySources = void 0;
    this._bySourceMemos = void 0;
  }
};
(() => {
  decodedMappings = (map2) => {
    return map2._decoded || (map2._decoded = decode(map2._encoded));
  };
  originalPositionFor = (map2, { line, column, bias }) => {
    line--;
    if (line < 0)
      throw new Error(LINE_GTR_ZERO);
    if (column < 0)
      throw new Error(COL_GTR_EQ_ZERO);
    const decoded = decodedMappings(map2);
    if (line >= decoded.length)
      return OMapping(null, null, null, null);
    const segments = decoded[line];
    const index2 = traceSegmentInternal(segments, map2._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
    if (index2 === -1)
      return OMapping(null, null, null, null);
    const segment = segments[index2];
    if (segment.length === 1)
      return OMapping(null, null, null, null);
    const { names, resolvedSources } = map2;
    return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
  };
})();
function OMapping(source, line, column, name) {
  return { source, line, column, name };
}
function traceSegmentInternal(segments, memo, line, column, bias) {
  let index2 = memoizedBinarySearch(segments, column, memo, line);
  if (found) {
    index2 = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index2);
  } else if (bias === LEAST_UPPER_BOUND)
    index2++;
  if (index2 === -1 || index2 === segments.length)
    return -1;
  return index2;
}
var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
var stackIgnorePatterns = [
  "node:internal",
  /\/packages\/\w+\/dist\//,
  /\/@vitest\/\w+\/dist\//,
  "/vitest/dist/",
  "/vitest/src/",
  "/vite-node/dist/",
  "/vite-node/src/",
  "/node_modules/chai/",
  "/node_modules/tinypool/",
  "/node_modules/tinyspy/",
  "/deps/chai.js",
  /__vitest_browser__/
];
function extractLocation(urlLike) {
  if (!urlLike.includes(":"))
    return [urlLike];
  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  const parts = regExp.exec(urlLike.replace(/^\(|\)$/g, ""));
  if (!parts)
    return [urlLike];
  let url = parts[1];
  if (url.startsWith("http:") || url.startsWith("https:")) {
    const urlObj = new URL(url);
    url = urlObj.pathname;
  }
  if (url.startsWith("/@fs/")) {
    url = url.slice(typeof process !== "undefined" && process.platform === "win32" ? 5 : 4);
  }
  return [url, parts[2] || void 0, parts[3] || void 0];
}
function parseSingleFFOrSafariStack(raw) {
  let line = raw.trim();
  if (SAFARI_NATIVE_CODE_REGEXP.test(line))
    return null;
  if (line.includes(" > eval"))
    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
  if (!line.includes("@") && !line.includes(":"))
    return null;
  const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
  const matches = line.match(functionNameRegex);
  const functionName3 = matches && matches[1] ? matches[1] : void 0;
  const [url, lineNumber, columnNumber] = extractLocation(line.replace(functionNameRegex, ""));
  if (!url || !lineNumber || !columnNumber)
    return null;
  return {
    file: url,
    method: functionName3 || "",
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}
function parseSingleV8Stack(raw) {
  let line = raw.trim();
  if (!CHROME_IE_STACK_REGEXP.test(line))
    return null;
  if (line.includes("(eval "))
    line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
  let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
  const location = sanitizedLine.match(/ (\(.+\)$)/);
  sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
  const [url, lineNumber, columnNumber] = extractLocation(location ? location[1] : sanitizedLine);
  let method = location && sanitizedLine || "";
  let file = url && ["eval", "<anonymous>"].includes(url) ? void 0 : url;
  if (!file || !lineNumber || !columnNumber)
    return null;
  if (method.startsWith("async "))
    method = method.slice(6);
  if (file.startsWith("file://"))
    file = file.slice(7);
  file = resolve$2(file);
  if (method)
    method = method.replace(/__vite_ssr_import_\d+__\./g, "");
  return {
    method,
    file,
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}
function parseStacktrace(stack, options = {}) {
  const { ignoreStackEntries = stackIgnorePatterns } = options;
  let stacks = !CHROME_IE_STACK_REGEXP.test(stack) ? parseFFOrSafariStackTrace(stack) : parseV8Stacktrace(stack);
  if (ignoreStackEntries.length)
    stacks = stacks.filter((stack2) => !ignoreStackEntries.some((p2) => stack2.file.match(p2)));
  return stacks.map((stack2) => {
    var _a2;
    const map2 = (_a2 = options.getSourceMap) == null ? void 0 : _a2.call(options, stack2.file);
    if (!map2 || typeof map2 !== "object" || !map2.version)
      return stack2;
    const traceMap = new TraceMap(map2);
    const { line, column } = originalPositionFor(traceMap, stack2);
    if (line != null && column != null)
      return { ...stack2, line, column };
    return stack2;
  });
}
function parseFFOrSafariStackTrace(stack) {
  return stack.split("\n").map((line) => parseSingleFFOrSafariStack(line)).filter(notNullish2);
}
function parseV8Stacktrace(stack) {
  return stack.split("\n").map((line) => parseSingleV8Stack(line)).filter(notNullish2);
}
function parseErrorStacktrace(e, options = {}) {
  if (!e || isPrimitive2(e))
    return [];
  if (e.stacks)
    return e.stacks;
  const stackStr = e.stack || e.stackStr || "";
  const stackFrames = parseStacktrace(stackStr, options);
  e.stacks = stackFrames;
  return stackFrames;
}
async function saveInlineSnapshots(environment, snapshots) {
  const MagicString2 = (await Promise.resolve().then(() => (init_magic_string_es(), magic_string_es_exports))).default;
  const files = new Set(snapshots.map((i) => i.file));
  await Promise.all(Array.from(files).map(async (file) => {
    const snaps = snapshots.filter((i) => i.file === file);
    const code = await environment.readSnapshotFile(file);
    const s = new MagicString2(code);
    for (const snap of snaps) {
      const index2 = positionToOffset(code, snap.line, snap.column);
      replaceInlineSnap(code, s, index2, snap.snapshot);
    }
    const transformed = s.toString();
    if (transformed !== code)
      await environment.saveSnapshotFile(file, transformed);
  }));
}
var startObjectRegex = /(?:toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot)\s*\(\s*(?:\/\*[\S\s]*\*\/\s*|\/\/.*\s+)*\s*({)/m;
function replaceObjectSnap(code, s, index2, newSnap) {
  let _code = code.slice(index2);
  const startMatch = startObjectRegex.exec(_code);
  if (!startMatch)
    return false;
  _code = _code.slice(startMatch.index);
  let callEnd = getCallLastIndex2(_code);
  if (callEnd === null)
    return false;
  callEnd += index2 + startMatch.index;
  const shapeStart = index2 + startMatch.index + startMatch[0].length;
  const shapeEnd = getObjectShapeEndIndex(code, shapeStart);
  const snap = `, ${prepareSnapString(newSnap, code, index2)}`;
  if (shapeEnd === callEnd) {
    s.appendLeft(callEnd, snap);
  } else {
    s.overwrite(shapeEnd, callEnd, snap);
  }
  return true;
}
function getObjectShapeEndIndex(code, index2) {
  let startBraces = 1;
  let endBraces = 0;
  while (startBraces !== endBraces && index2 < code.length) {
    const s = code[index2++];
    if (s === "{")
      startBraces++;
    else if (s === "}")
      endBraces++;
  }
  return index2;
}
function prepareSnapString(snap, source, index2) {
  const lineNumber = offsetToLineNumber(source, index2);
  const line = source.split(lineSplitRE)[lineNumber - 1];
  const indent = line.match(/^\s*/)[0] || "";
  const indentNext = indent.includes("	") ? `${indent}	` : `${indent}  `;
  const lines = snap.trim().replace(/\\/g, "\\\\").split(/\n/g);
  const isOneline = lines.length <= 1;
  const quote = isOneline ? "'" : "`";
  if (isOneline)
    return `'${lines.join("\n").replace(/'/g, "\\'")}'`;
  else
    return `${quote}
${lines.map((i) => i ? indentNext + i : "").join("\n").replace(/`/g, "\\`").replace(/\${/g, "\\${")}
${indent}${quote}`;
}
var startRegex = /(?:toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot)\s*\(\s*(?:\/\*[\S\s]*\*\/\s*|\/\/.*\s+)*\s*[\w_$]*(['"`\)])/m;
function replaceInlineSnap(code, s, index2, newSnap) {
  const codeStartingAtIndex = code.slice(index2);
  const startMatch = startRegex.exec(codeStartingAtIndex);
  const firstKeywordMatch = /toMatchInlineSnapshot|toThrowErrorMatchingInlineSnapshot/.exec(codeStartingAtIndex);
  if (!startMatch || startMatch.index !== (firstKeywordMatch == null ? void 0 : firstKeywordMatch.index))
    return replaceObjectSnap(code, s, index2, newSnap);
  const quote = startMatch[1];
  const startIndex = index2 + startMatch.index + startMatch[0].length;
  const snapString = prepareSnapString(newSnap, code, index2);
  if (quote === ")") {
    s.appendRight(startIndex - 1, snapString);
    return true;
  }
  const quoteEndRE = new RegExp(`(?:^|[^\\\\])${quote}`);
  const endMatch = quoteEndRE.exec(code.slice(startIndex));
  if (!endMatch)
    return false;
  const endIndex = startIndex + endMatch.index + endMatch[0].length;
  s.overwrite(startIndex - 1, endIndex, snapString);
  return true;
}
var INDENTATION_REGEX = /^([^\S\n]*)\S/m;
function stripSnapshotIndentation(inlineSnapshot) {
  const match = inlineSnapshot.match(INDENTATION_REGEX);
  if (!match || !match[1]) {
    return inlineSnapshot;
  }
  const indentation = match[1];
  const lines = inlineSnapshot.split(/\n/g);
  if (lines.length <= 2) {
    return inlineSnapshot;
  }
  if (lines[0].trim() !== "" || lines[lines.length - 1].trim() !== "") {
    return inlineSnapshot;
  }
  for (let i = 1; i < lines.length - 1; i++) {
    if (lines[i] !== "") {
      if (lines[i].indexOf(indentation) !== 0) {
        return inlineSnapshot;
      }
      lines[i] = lines[i].substring(indentation.length);
    }
  }
  lines[lines.length - 1] = "";
  inlineSnapshot = lines.join("\n");
  return inlineSnapshot;
}
async function saveRawSnapshots(environment, snapshots) {
  await Promise.all(snapshots.map(async (snap) => {
    if (!snap.readonly)
      await environment.saveSnapshotFile(snap.file, snap.snapshot);
  }));
}
var SnapshotState = class _SnapshotState {
  constructor(testFilePath, snapshotPath, snapshotContent, options) {
    this.testFilePath = testFilePath;
    this.snapshotPath = snapshotPath;
    const { data, dirty } = getSnapshotData(
      snapshotContent,
      options
    );
    this._fileExists = snapshotContent != null;
    this._initialData = data;
    this._snapshotData = data;
    this._dirty = dirty;
    this._inlineSnapshots = [];
    this._rawSnapshots = [];
    this._uncheckedKeys = new Set(Object.keys(this._snapshotData));
    this._counters = /* @__PURE__ */ new Map();
    this.expand = options.expand || false;
    this.added = 0;
    this.matched = 0;
    this.unmatched = 0;
    this._updateSnapshot = options.updateSnapshot;
    this.updated = 0;
    this._snapshotFormat = {
      printBasicPrototype: false,
      ...options.snapshotFormat
    };
    this._environment = options.snapshotEnvironment;
  }
  _counters;
  _dirty;
  _updateSnapshot;
  _snapshotData;
  _initialData;
  _inlineSnapshots;
  _rawSnapshots;
  _uncheckedKeys;
  _snapshotFormat;
  _environment;
  _fileExists;
  added;
  expand;
  matched;
  unmatched;
  updated;
  static async create(testFilePath, options) {
    const snapshotPath = await options.snapshotEnvironment.resolvePath(testFilePath);
    const content = await options.snapshotEnvironment.readSnapshotFile(snapshotPath);
    return new _SnapshotState(testFilePath, snapshotPath, content, options);
  }
  get environment() {
    return this._environment;
  }
  markSnapshotsAsCheckedForTest(testName) {
    this._uncheckedKeys.forEach((uncheckedKey) => {
      if (keyToTestName(uncheckedKey) === testName)
        this._uncheckedKeys.delete(uncheckedKey);
    });
  }
  _inferInlineSnapshotStack(stacks) {
    const promiseIndex = stacks.findIndex((i) => i.method.match(/__VITEST_(RESOLVES|REJECTS)__/));
    if (promiseIndex !== -1)
      return stacks[promiseIndex + 3];
    const stackIndex = stacks.findIndex((i) => i.method.includes("__INLINE_SNAPSHOT__"));
    return stackIndex !== -1 ? stacks[stackIndex + 2] : null;
  }
  _addSnapshot(key, receivedSerialized, options) {
    this._dirty = true;
    if (options.isInline) {
      const stacks = parseErrorStacktrace(options.error || new Error("snapshot"), { ignoreStackEntries: [] });
      const stack = this._inferInlineSnapshotStack(stacks);
      if (!stack) {
        throw new Error(
          `@vitest/snapshot: Couldn't infer stack frame for inline snapshot.
${JSON.stringify(stacks)}`
        );
      }
      stack.column--;
      this._inlineSnapshots.push({
        snapshot: receivedSerialized,
        ...stack
      });
    } else if (options.rawSnapshot) {
      this._rawSnapshots.push({
        ...options.rawSnapshot,
        snapshot: receivedSerialized
      });
    } else {
      this._snapshotData[key] = receivedSerialized;
    }
  }
  clear() {
    this._snapshotData = this._initialData;
    this._counters = /* @__PURE__ */ new Map();
    this.added = 0;
    this.matched = 0;
    this.unmatched = 0;
    this.updated = 0;
    this._dirty = false;
  }
  async save() {
    const hasExternalSnapshots = Object.keys(this._snapshotData).length;
    const hasInlineSnapshots = this._inlineSnapshots.length;
    const hasRawSnapshots = this._rawSnapshots.length;
    const isEmpty = !hasExternalSnapshots && !hasInlineSnapshots && !hasRawSnapshots;
    const status = {
      deleted: false,
      saved: false
    };
    if ((this._dirty || this._uncheckedKeys.size) && !isEmpty) {
      if (hasExternalSnapshots) {
        await saveSnapshotFile(this._environment, this._snapshotData, this.snapshotPath);
        this._fileExists = true;
      }
      if (hasInlineSnapshots)
        await saveInlineSnapshots(this._environment, this._inlineSnapshots);
      if (hasRawSnapshots)
        await saveRawSnapshots(this._environment, this._rawSnapshots);
      status.saved = true;
    } else if (!hasExternalSnapshots && this._fileExists) {
      if (this._updateSnapshot === "all") {
        await this._environment.removeSnapshotFile(this.snapshotPath);
        this._fileExists = false;
      }
      status.deleted = true;
    }
    return status;
  }
  getUncheckedCount() {
    return this._uncheckedKeys.size || 0;
  }
  getUncheckedKeys() {
    return Array.from(this._uncheckedKeys);
  }
  removeUncheckedKeys() {
    if (this._updateSnapshot === "all" && this._uncheckedKeys.size) {
      this._dirty = true;
      this._uncheckedKeys.forEach((key) => delete this._snapshotData[key]);
      this._uncheckedKeys.clear();
    }
  }
  match({
    testName,
    received,
    key,
    inlineSnapshot,
    isInline,
    error,
    rawSnapshot
  }) {
    this._counters.set(testName, (this._counters.get(testName) || 0) + 1);
    const count = Number(this._counters.get(testName));
    if (!key)
      key = testNameToKey(testName, count);
    if (!(isInline && this._snapshotData[key] !== void 0))
      this._uncheckedKeys.delete(key);
    let receivedSerialized = rawSnapshot && typeof received === "string" ? received : serialize(received, void 0, this._snapshotFormat);
    if (!rawSnapshot)
      receivedSerialized = addExtraLineBreaks(receivedSerialized);
    if (rawSnapshot) {
      if (rawSnapshot.content && rawSnapshot.content.match(/\r\n/) && !receivedSerialized.match(/\r\n/))
        rawSnapshot.content = normalizeNewlines(rawSnapshot.content);
    }
    const expected = isInline ? inlineSnapshot : rawSnapshot ? rawSnapshot.content : this._snapshotData[key];
    const expectedTrimmed = prepareExpected(expected);
    const pass = expectedTrimmed === prepareExpected(receivedSerialized);
    const hasSnapshot = expected !== void 0;
    const snapshotIsPersisted = isInline || this._fileExists || rawSnapshot && rawSnapshot.content != null;
    if (pass && !isInline && !rawSnapshot) {
      this._snapshotData[key] = receivedSerialized;
    }
    if (hasSnapshot && this._updateSnapshot === "all" || (!hasSnapshot || !snapshotIsPersisted) && (this._updateSnapshot === "new" || this._updateSnapshot === "all")) {
      if (this._updateSnapshot === "all") {
        if (!pass) {
          if (hasSnapshot)
            this.updated++;
          else
            this.added++;
          this._addSnapshot(key, receivedSerialized, { error, isInline, rawSnapshot });
        } else {
          this.matched++;
        }
      } else {
        this._addSnapshot(key, receivedSerialized, { error, isInline, rawSnapshot });
        this.added++;
      }
      return {
        actual: "",
        count,
        expected: "",
        key,
        pass: true
      };
    } else {
      if (!pass) {
        this.unmatched++;
        return {
          actual: removeExtraLineBreaks(receivedSerialized),
          count,
          expected: expectedTrimmed !== void 0 ? removeExtraLineBreaks(expectedTrimmed) : void 0,
          key,
          pass: false
        };
      } else {
        this.matched++;
        return {
          actual: "",
          count,
          expected: "",
          key,
          pass: true
        };
      }
    }
  }
  async pack() {
    const snapshot = {
      filepath: this.testFilePath,
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      uncheckedKeys: [],
      unmatched: 0,
      updated: 0
    };
    const uncheckedCount = this.getUncheckedCount();
    const uncheckedKeys = this.getUncheckedKeys();
    if (uncheckedCount)
      this.removeUncheckedKeys();
    const status = await this.save();
    snapshot.fileDeleted = status.deleted;
    snapshot.added = this.added;
    snapshot.matched = this.matched;
    snapshot.unmatched = this.unmatched;
    snapshot.updated = this.updated;
    snapshot.unchecked = !status.deleted ? uncheckedCount : 0;
    snapshot.uncheckedKeys = Array.from(uncheckedKeys);
    return snapshot;
  }
};
function createMismatchError(message, actual, expected) {
  const error = new Error(message);
  Object.defineProperty(error, "actual", {
    value: actual,
    enumerable: true,
    configurable: true,
    writable: true
  });
  Object.defineProperty(error, "expected", {
    value: expected,
    enumerable: true,
    configurable: true,
    writable: true
  });
  return error;
}
var SnapshotClient = class {
  constructor(Service = SnapshotState) {
    this.Service = Service;
  }
  filepath;
  name;
  snapshotState;
  snapshotStateMap = /* @__PURE__ */ new Map();
  async setTest(filepath, name, options) {
    var _a2;
    this.filepath = filepath;
    this.name = name;
    if (((_a2 = this.snapshotState) == null ? void 0 : _a2.testFilePath) !== filepath) {
      this.resetCurrent();
      if (!this.getSnapshotState(filepath)) {
        this.snapshotStateMap.set(
          filepath,
          await this.Service.create(
            filepath,
            options
          )
        );
      }
      this.snapshotState = this.getSnapshotState(filepath);
    }
  }
  getSnapshotState(filepath) {
    return this.snapshotStateMap.get(filepath);
  }
  clearTest() {
    this.filepath = void 0;
    this.name = void 0;
  }
  skipTestSnapshots(name) {
    var _a2;
    (_a2 = this.snapshotState) == null ? void 0 : _a2.markSnapshotsAsCheckedForTest(name);
  }
  /**
   * Should be overridden by the consumer.
   *
   * Vitest checks equality with @vitest/expect.
   */
  equalityCheck(received, expected) {
    return received === expected;
  }
  assert(options) {
    const {
      filepath = this.filepath,
      name = this.name,
      message,
      isInline = false,
      properties,
      inlineSnapshot,
      error,
      errorMessage,
      rawSnapshot
    } = options;
    let { received } = options;
    if (!filepath)
      throw new Error("Snapshot cannot be used outside of test");
    if (typeof properties === "object") {
      if (typeof received !== "object" || !received)
        throw new Error("Received value must be an object when the matcher has properties");
      try {
        const pass2 = this.equalityCheck(received, properties);
        if (!pass2)
          throw createMismatchError("Snapshot properties mismatched", received, properties);
        else
          received = deepMergeSnapshot(received, properties);
      } catch (err) {
        err.message = errorMessage || "Snapshot mismatched";
        throw err;
      }
    }
    const testName = [
      name,
      ...message ? [message] : []
    ].join(" > ");
    const snapshotState = this.getSnapshotState(filepath);
    const { actual, expected, key, pass } = snapshotState.match({
      testName,
      received,
      isInline,
      error,
      inlineSnapshot,
      rawSnapshot
    });
    if (!pass)
      throw createMismatchError(`Snapshot \`${key || "unknown"}\` mismatched`, actual == null ? void 0 : actual.trim(), expected == null ? void 0 : expected.trim());
  }
  async assertRaw(options) {
    if (!options.rawSnapshot)
      throw new Error("Raw snapshot is required");
    const {
      filepath = this.filepath,
      rawSnapshot
    } = options;
    if (rawSnapshot.content == null) {
      if (!filepath)
        throw new Error("Snapshot cannot be used outside of test");
      const snapshotState = this.getSnapshotState(filepath);
      options.filepath || (options.filepath = filepath);
      rawSnapshot.file = await snapshotState.environment.resolveRawPath(filepath, rawSnapshot.file);
      rawSnapshot.content = await snapshotState.environment.readSnapshotFile(rawSnapshot.file) || void 0;
    }
    return this.assert(options);
  }
  async resetCurrent() {
    if (!this.snapshotState)
      return null;
    const result = await this.snapshotState.pack();
    this.snapshotState = void 0;
    return result;
  }
  clear() {
    this.snapshotStateMap.clear();
  }
};

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-tasks.f9d75aed.js
function getFullName(task, separator = " > ") {
  return getNames(task).join(separator);
}

// ../../node_modules/.pnpm/@vitest+utils@0.34.6/node_modules/@vitest/utils/dist/source-map.js
function normalizeWindowsPath2(input = "") {
  if (!input || !input.includes("\\")) {
    return input;
  }
  return input.replace(/\\/g, "/");
}
var _IS_ABSOLUTE_RE2 = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
function cwd2() {
  if (typeof process !== "undefined") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
var resolve$22 = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath2(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index2 = arguments_.length - 1; index2 >= -1 && !resolvedAbsolute; index2--) {
    const path2 = index2 >= 0 ? arguments_[index2] : cwd2();
    if (!path2 || path2.length === 0) {
      continue;
    }
    resolvedPath = `${path2}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute2(path2);
  }
  resolvedPath = normalizeString2(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute2(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString2(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index2 = 0; index2 <= path2.length; ++index2) {
    if (index2 < path2.length) {
      char = path2[index2];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index2 - 1 || dots === 1)
        ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index2;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, index2)}`;
        } else {
          res = path2.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute2 = function(p2) {
  return _IS_ABSOLUTE_RE2.test(p2);
};
var comma3 = ",".charCodeAt(0);
var chars3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar3 = new Uint8Array(64);
var charToInt3 = new Uint8Array(128);
for (let i = 0; i < chars3.length; i++) {
  const c = chars3.charCodeAt(i);
  intToChar3[i] = c;
  charToInt3[c] = i;
}
function decode2(mappings) {
  const state = new Int32Array(5);
  const decoded = [];
  let index2 = 0;
  do {
    const semi = indexOf2(mappings, index2);
    const line = [];
    let sorted = true;
    let lastCol = 0;
    state[0] = 0;
    for (let i = index2; i < semi; i++) {
      let seg;
      i = decodeInteger2(mappings, i, state, 0);
      const col = state[0];
      if (col < lastCol)
        sorted = false;
      lastCol = col;
      if (hasMoreVlq2(mappings, i, semi)) {
        i = decodeInteger2(mappings, i, state, 1);
        i = decodeInteger2(mappings, i, state, 2);
        i = decodeInteger2(mappings, i, state, 3);
        if (hasMoreVlq2(mappings, i, semi)) {
          i = decodeInteger2(mappings, i, state, 4);
          seg = [col, state[1], state[2], state[3], state[4]];
        } else {
          seg = [col, state[1], state[2], state[3]];
        }
      } else {
        seg = [col];
      }
      line.push(seg);
    }
    if (!sorted)
      sort2(line);
    decoded.push(line);
    index2 = semi + 1;
  } while (index2 <= mappings.length);
  return decoded;
}
function indexOf2(mappings, index2) {
  const idx = mappings.indexOf(";", index2);
  return idx === -1 ? mappings.length : idx;
}
function decodeInteger2(mappings, pos, state, j) {
  let value = 0;
  let shift = 0;
  let integer = 0;
  do {
    const c = mappings.charCodeAt(pos++);
    integer = charToInt3[c];
    value |= (integer & 31) << shift;
    shift += 5;
  } while (integer & 32);
  const shouldNegate = value & 1;
  value >>>= 1;
  if (shouldNegate) {
    value = -2147483648 | -value;
  }
  state[j] += value;
  return pos;
}
function hasMoreVlq2(mappings, i, length) {
  if (i >= length)
    return false;
  return mappings.charCodeAt(i) !== comma3;
}
function sort2(line) {
  line.sort(sortComparator$12);
}
function sortComparator$12(a, b2) {
  return a[0] - b2[0];
}
var UrlType2;
(function(UrlType3) {
  UrlType3[UrlType3["Empty"] = 1] = "Empty";
  UrlType3[UrlType3["Hash"] = 2] = "Hash";
  UrlType3[UrlType3["Query"] = 3] = "Query";
  UrlType3[UrlType3["RelativePath"] = 4] = "RelativePath";
  UrlType3[UrlType3["AbsolutePath"] = 5] = "AbsolutePath";
  UrlType3[UrlType3["SchemeRelative"] = 6] = "SchemeRelative";
  UrlType3[UrlType3["Absolute"] = 7] = "Absolute";
})(UrlType2 || (UrlType2 = {}));
var COLUMN2 = 0;
var SOURCES_INDEX2 = 1;
var SOURCE_LINE2 = 2;
var SOURCE_COLUMN2 = 3;
var NAMES_INDEX2 = 4;
var REV_GENERATED_LINE = 1;
var REV_GENERATED_COLUMN = 2;
var found2 = false;
function binarySearch2(haystack, needle, low, high) {
  while (low <= high) {
    const mid = low + (high - low >> 1);
    const cmp = haystack[mid][COLUMN2] - needle;
    if (cmp === 0) {
      found2 = true;
      return mid;
    }
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  found2 = false;
  return low - 1;
}
function upperBound2(haystack, needle, index2) {
  for (let i = index2 + 1; i < haystack.length; index2 = i++) {
    if (haystack[i][COLUMN2] !== needle)
      break;
  }
  return index2;
}
function lowerBound2(haystack, needle, index2) {
  for (let i = index2 - 1; i >= 0; index2 = i--) {
    if (haystack[i][COLUMN2] !== needle)
      break;
  }
  return index2;
}
function memoizedState2() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function memoizedBinarySearch2(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0;
  let high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle) {
      found2 = lastIndex !== -1 && haystack[lastIndex][COLUMN2] === needle;
      return lastIndex;
    }
    if (needle >= lastNeedle) {
      low = lastIndex === -1 ? 0 : lastIndex;
    } else {
      high = lastIndex;
    }
  }
  state.lastKey = key;
  state.lastNeedle = needle;
  return state.lastIndex = binarySearch2(haystack, needle, low, high);
}
function buildBySources(decoded, memos) {
  const sources = memos.map(buildNullArray);
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    for (let j = 0; j < line.length; j++) {
      const seg = line[j];
      if (seg.length === 1)
        continue;
      const sourceIndex = seg[SOURCES_INDEX2];
      const sourceLine = seg[SOURCE_LINE2];
      const sourceColumn = seg[SOURCE_COLUMN2];
      const originalSource = sources[sourceIndex];
      const originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []);
      const memo = memos[sourceIndex];
      const index2 = upperBound2(originalLine, sourceColumn, memoizedBinarySearch2(originalLine, sourceColumn, memo, sourceLine));
      insert(originalLine, memo.lastIndex = index2 + 1, [sourceColumn, i, seg[COLUMN2]]);
    }
  }
  return sources;
}
function insert(array3, index2, value) {
  for (let i = array3.length; i > index2; i--) {
    array3[i] = array3[i - 1];
  }
  array3[index2] = value;
}
function buildNullArray() {
  return { __proto__: null };
}
var LINE_GTR_ZERO2 = "`line` must be greater than 0 (lines start at line 1)";
var COL_GTR_EQ_ZERO2 = "`column` must be greater than or equal to 0 (columns start at column 0)";
var LEAST_UPPER_BOUND2 = -1;
var GREATEST_LOWER_BOUND2 = 1;
var decodedMappings2;
var originalPositionFor2;
var generatedPositionFor;
(() => {
  decodedMappings2 = (map2) => {
    return map2._decoded || (map2._decoded = decode2(map2._encoded));
  };
  originalPositionFor2 = (map2, { line, column, bias }) => {
    line--;
    if (line < 0)
      throw new Error(LINE_GTR_ZERO2);
    if (column < 0)
      throw new Error(COL_GTR_EQ_ZERO2);
    const decoded = decodedMappings2(map2);
    if (line >= decoded.length)
      return OMapping2(null, null, null, null);
    const segments = decoded[line];
    const index2 = traceSegmentInternal2(segments, map2._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND2);
    if (index2 === -1)
      return OMapping2(null, null, null, null);
    const segment = segments[index2];
    if (segment.length === 1)
      return OMapping2(null, null, null, null);
    const { names, resolvedSources } = map2;
    return OMapping2(resolvedSources[segment[SOURCES_INDEX2]], segment[SOURCE_LINE2] + 1, segment[SOURCE_COLUMN2], segment.length === 5 ? names[segment[NAMES_INDEX2]] : null);
  };
  generatedPositionFor = (map2, { source, line, column, bias }) => {
    return generatedPosition(map2, source, line, column, bias || GREATEST_LOWER_BOUND2, false);
  };
  function generatedPosition(map2, source, line, column, bias, all) {
    line--;
    if (line < 0)
      throw new Error(LINE_GTR_ZERO2);
    if (column < 0)
      throw new Error(COL_GTR_EQ_ZERO2);
    const { sources, resolvedSources } = map2;
    let sourceIndex = sources.indexOf(source);
    if (sourceIndex === -1)
      sourceIndex = resolvedSources.indexOf(source);
    if (sourceIndex === -1)
      return all ? [] : GMapping(null, null);
    const generated = map2._bySources || (map2._bySources = buildBySources(decodedMappings2(map2), map2._bySourceMemos = sources.map(memoizedState2)));
    const segments = generated[sourceIndex][line];
    if (segments == null)
      return all ? [] : GMapping(null, null);
    const memo = map2._bySourceMemos[sourceIndex];
    if (all)
      return sliceGeneratedPositions(segments, memo, line, column, bias);
    const index2 = traceSegmentInternal2(segments, memo, line, column, bias);
    if (index2 === -1)
      return GMapping(null, null);
    const segment = segments[index2];
    return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
  }
})();
function OMapping2(source, line, column, name) {
  return { source, line, column, name };
}
function GMapping(line, column) {
  return { line, column };
}
function traceSegmentInternal2(segments, memo, line, column, bias) {
  let index2 = memoizedBinarySearch2(segments, column, memo, line);
  if (found2) {
    index2 = (bias === LEAST_UPPER_BOUND2 ? upperBound2 : lowerBound2)(segments, column, index2);
  } else if (bias === LEAST_UPPER_BOUND2)
    index2++;
  if (index2 === -1 || index2 === segments.length)
    return -1;
  return index2;
}
function sliceGeneratedPositions(segments, memo, line, column, bias) {
  let min = traceSegmentInternal2(segments, memo, line, column, GREATEST_LOWER_BOUND2);
  if (!found2 && bias === LEAST_UPPER_BOUND2)
    min++;
  if (min === -1 || min === segments.length)
    return [];
  const matchedColumn = found2 ? column : segments[min][COLUMN2];
  if (!found2)
    min = lowerBound2(segments, matchedColumn, min);
  const max = upperBound2(segments, matchedColumn, min);
  const result = [];
  for (; min <= max; min++) {
    const segment = segments[min];
    result.push(GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]));
  }
  return result;
}
var CHROME_IE_STACK_REGEXP2 = /^\s*at .*(\S+:\d+|\(native\))/m;
var SAFARI_NATIVE_CODE_REGEXP2 = /^(eval@)?(\[native code])?$/;
function extractLocation2(urlLike) {
  if (!urlLike.includes(":"))
    return [urlLike];
  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  const parts = regExp.exec(urlLike.replace(/^\(|\)$/g, ""));
  if (!parts)
    return [urlLike];
  let url = parts[1];
  if (url.startsWith("http:") || url.startsWith("https:")) {
    const urlObj = new URL(url);
    url = urlObj.pathname;
  }
  if (url.startsWith("/@fs/")) {
    url = url.slice(typeof process !== "undefined" && process.platform === "win32" ? 5 : 4);
  }
  return [url, parts[2] || void 0, parts[3] || void 0];
}
function parseSingleFFOrSafariStack2(raw) {
  let line = raw.trim();
  if (SAFARI_NATIVE_CODE_REGEXP2.test(line))
    return null;
  if (line.includes(" > eval"))
    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
  if (!line.includes("@") && !line.includes(":"))
    return null;
  const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
  const matches = line.match(functionNameRegex);
  const functionName3 = matches && matches[1] ? matches[1] : void 0;
  const [url, lineNumber, columnNumber] = extractLocation2(line.replace(functionNameRegex, ""));
  if (!url || !lineNumber || !columnNumber)
    return null;
  return {
    file: url,
    method: functionName3 || "",
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}
function parseSingleStack(raw) {
  const line = raw.trim();
  if (!CHROME_IE_STACK_REGEXP2.test(line))
    return parseSingleFFOrSafariStack2(line);
  return parseSingleV8Stack2(line);
}
function parseSingleV8Stack2(raw) {
  let line = raw.trim();
  if (!CHROME_IE_STACK_REGEXP2.test(line))
    return null;
  if (line.includes("(eval "))
    line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
  let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
  const location = sanitizedLine.match(/ (\(.+\)$)/);
  sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
  const [url, lineNumber, columnNumber] = extractLocation2(location ? location[1] : sanitizedLine);
  let method = location && sanitizedLine || "";
  let file = url && ["eval", "<anonymous>"].includes(url) ? void 0 : url;
  if (!file || !lineNumber || !columnNumber)
    return null;
  if (method.startsWith("async "))
    method = method.slice(6);
  if (file.startsWith("file://"))
    file = file.slice(7);
  file = resolve$22(file);
  if (method)
    method = method.replace(/__vite_ssr_import_\d+__\./g, "");
  return {
    method,
    file,
    line: Number.parseInt(lineNumber),
    column: Number.parseInt(columnNumber)
  };
}

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-vi.6873a1c1.js
var import_util = __toESM(require("util"), 1);

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-date.6e993429.js
var RealDate = Date;
var now2 = null;
var MockDate = class extends RealDate {
  constructor(y2, m2, d2, h, M2, s, ms) {
    super();
    let date;
    switch (arguments.length) {
      case 0:
        if (now2 !== null)
          date = new RealDate(now2.valueOf());
        else
          date = new RealDate();
        break;
      case 1:
        date = new RealDate(y2);
        break;
      default:
        d2 = typeof d2 === "undefined" ? 1 : d2;
        h = h || 0;
        M2 = M2 || 0;
        s = s || 0;
        ms = ms || 0;
        date = new RealDate(y2, m2, d2, h, M2, s, ms);
        break;
    }
    return date;
  }
};
MockDate.UTC = RealDate.UTC;
MockDate.now = function() {
  return new MockDate().valueOf();
};
MockDate.parse = function(dateString) {
  return RealDate.parse(dateString);
};
MockDate.toString = function() {
  return RealDate.toString();
};
function mockDate(date) {
  const dateObj = new RealDate(date.valueOf());
  if (Number.isNaN(dateObj.getTime()))
    throw new TypeError(`mockdate: The time set is an invalid date: ${date}`);
  globalThis.Date = MockDate;
  now2 = dateObj.valueOf();
}
function resetDate() {
  globalThis.Date = RealDate;
}

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-vi.6873a1c1.js
function resetModules(modules, resetMocks = false) {
  const skipPaths = [
    // Vitest
    /\/vitest\/dist\//,
    /\/vite-node\/dist\//,
    // yarn's .store folder
    /vitest-virtual-\w+\/dist/,
    // cnpm
    /@vitest\/dist/,
    // don't clear mocks
    ...!resetMocks ? [/^mock:/] : []
  ];
  modules.forEach((mod, path2) => {
    if (skipPaths.some((re) => re.test(path2)))
      return;
    modules.invalidateModule(mod);
  });
}
function waitNextTick() {
  const { setTimeout } = getSafeTimers();
  return new Promise((resolve2) => setTimeout(resolve2, 0));
}
async function waitForImportsToResolve() {
  await waitNextTick();
  const state = getWorkerState();
  const promises = [];
  let resolvingCount = 0;
  for (const mod of state.moduleCache.values()) {
    if (mod.promise && !mod.evaluated)
      promises.push(mod.promise);
    if (mod.resolving)
      resolvingCount++;
  }
  if (!promises.length && !resolvingCount)
    return;
  await Promise.allSettled(promises);
  await waitForImportsToResolve();
}
var benchFns = /* @__PURE__ */ new WeakMap();
var benchOptsMap = /* @__PURE__ */ new WeakMap();
var bench = createBenchmark(
  function(name, fn2 = noop, options = {}) {
    if (!isRunningInBenchmark())
      throw new Error("`bench()` is only available in benchmark mode.");
    const task = getCurrentSuite().custom.call(this, formatName2(name));
    task.meta = {
      benchmark: true
    };
    benchFns.set(task, fn2);
    benchOptsMap.set(task, options);
  }
);
function createBenchmark(fn2) {
  const benchmark = createChainable(
    ["skip", "only", "todo"],
    fn2
  );
  benchmark.skipIf = (condition) => condition ? benchmark.skip : benchmark;
  benchmark.runIf = (condition) => condition ? benchmark : benchmark.skip;
  return benchmark;
}
function formatName2(name) {
  return typeof name === "string" ? name : name instanceof Function ? name.name || "<anonymous>" : String(name);
}
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var chaiSubset = { exports: {} };
(function(module2, exports2) {
  (function() {
    (function(chaiSubset2) {
      if (typeof commonjsRequire === "function" && true && true) {
        return module2.exports = chaiSubset2;
      } else {
        return chai.use(chaiSubset2);
      }
    })(function(chai3, utils) {
      var Assertion2 = chai3.Assertion;
      var assertionPrototype = Assertion2.prototype;
      Assertion2.addMethod("containSubset", function(expected) {
        var actual = utils.flag(this, "object");
        var showDiff = chai3.config.showDiff;
        assertionPrototype.assert.call(
          this,
          compare(expected, actual),
          "expected #{act} to contain subset #{exp}",
          "expected #{act} to not contain subset #{exp}",
          expected,
          actual,
          showDiff
        );
      });
      chai3.assert.containSubset = function(val, exp, msg) {
        new chai3.Assertion(val, msg).to.be.containSubset(exp);
      };
      function compare(expected, actual) {
        if (expected === actual) {
          return true;
        }
        if (typeof actual !== typeof expected) {
          return false;
        }
        if (typeof expected !== "object" || expected === null) {
          return expected === actual;
        }
        if (!!expected && !actual) {
          return false;
        }
        if (Array.isArray(expected)) {
          if (typeof actual.length !== "number") {
            return false;
          }
          var aa = Array.prototype.slice.call(actual);
          return expected.every(function(exp) {
            return aa.some(function(act) {
              return compare(exp, act);
            });
          });
        }
        if (expected instanceof Date) {
          if (actual instanceof Date) {
            return expected.getTime() === actual.getTime();
          } else {
            return false;
          }
        }
        return Object.keys(expected).every(function(key) {
          var eo = expected[key];
          var ao = actual[key];
          if (typeof eo === "object" && eo !== null && ao !== null) {
            return compare(eo, ao);
          }
          if (typeof eo === "function") {
            return eo(ao);
          }
          return ao === eo;
        });
      }
    });
  }).call(commonjsGlobal);
})(chaiSubset);
var chaiSubsetExports = chaiSubset.exports;
var Subset = /* @__PURE__ */ getDefaultExportFromCjs(chaiSubsetExports);
var MATCHERS_OBJECT2 = Symbol.for("matchers-object");
var JEST_MATCHERS_OBJECT2 = Symbol.for("$$jest-matchers-object");
var GLOBAL_EXPECT2 = Symbol.for("expect-global");
if (!Object.prototype.hasOwnProperty.call(globalThis, MATCHERS_OBJECT2)) {
  const globalState = /* @__PURE__ */ new WeakMap();
  const matchers = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(globalThis, MATCHERS_OBJECT2, {
    get: () => globalState
  });
  Object.defineProperty(globalThis, JEST_MATCHERS_OBJECT2, {
    configurable: true,
    get: () => ({
      state: globalState.get(globalThis[GLOBAL_EXPECT2]),
      matchers
    })
  });
}
function recordAsyncExpect2(test3, promise) {
  if (test3 && promise instanceof Promise) {
    promise = promise.finally(() => {
      const index2 = test3.promises.indexOf(promise);
      if (index2 !== -1)
        test3.promises.splice(index2, 1);
    });
    if (!test3.promises)
      test3.promises = [];
    test3.promises.push(promise);
  }
  return promise;
}
var VitestSnapshotClient = class extends SnapshotClient {
  equalityCheck(received, expected) {
    return equals(received, expected, [iterableEquality, subsetEquality]);
  }
};
var _client;
function getSnapshotClient() {
  if (!_client)
    _client = new VitestSnapshotClient();
  return _client;
}
function getErrorMessage(err) {
  if (err instanceof Error)
    return err.message;
  return err;
}
function getErrorString(expected, promise) {
  if (typeof expected !== "function") {
    if (!promise)
      throw new Error(`expected must be a function, received ${typeof expected}`);
    return getErrorMessage(expected);
  }
  try {
    expected();
  } catch (e) {
    return getErrorMessage(e);
  }
  throw new Error("snapshot function didn't throw");
}
var SnapshotPlugin = (chai3, utils) => {
  const getTestNames = (test3) => {
    var _a2;
    if (!test3)
      return {};
    return {
      filepath: (_a2 = test3.file) == null ? void 0 : _a2.filepath,
      name: getNames(test3).slice(1).join(" > ")
    };
  };
  for (const key of ["matchSnapshot", "toMatchSnapshot"]) {
    utils.addMethod(
      chai3.Assertion.prototype,
      key,
      function(properties, message) {
        const expected = utils.flag(this, "object");
        const test3 = utils.flag(this, "vitest-test");
        if (typeof properties === "string" && typeof message === "undefined") {
          message = properties;
          properties = void 0;
        }
        const errorMessage = utils.flag(this, "message");
        getSnapshotClient().assert({
          received: expected,
          message,
          isInline: false,
          properties,
          errorMessage,
          ...getTestNames(test3)
        });
      }
    );
  }
  utils.addMethod(
    chai3.Assertion.prototype,
    "toMatchFileSnapshot",
    function(file, message) {
      const expected = utils.flag(this, "object");
      const test3 = utils.flag(this, "vitest-test");
      const errorMessage = utils.flag(this, "message");
      const promise = getSnapshotClient().assertRaw({
        received: expected,
        message,
        isInline: false,
        rawSnapshot: {
          file
        },
        errorMessage,
        ...getTestNames(test3)
      });
      return recordAsyncExpect2(test3, promise);
    }
  );
  utils.addMethod(
    chai3.Assertion.prototype,
    "toMatchInlineSnapshot",
    function __INLINE_SNAPSHOT__(properties, inlineSnapshot, message) {
      var _a2;
      const test3 = utils.flag(this, "vitest-test");
      const isInsideEach = test3 && (test3.each || ((_a2 = test3.suite) == null ? void 0 : _a2.each));
      if (isInsideEach)
        throw new Error("InlineSnapshot cannot be used inside of test.each or describe.each");
      const expected = utils.flag(this, "object");
      const error = utils.flag(this, "error");
      if (typeof properties === "string") {
        message = inlineSnapshot;
        inlineSnapshot = properties;
        properties = void 0;
      }
      if (inlineSnapshot)
        inlineSnapshot = stripSnapshotIndentation(inlineSnapshot);
      const errorMessage = utils.flag(this, "message");
      getSnapshotClient().assert({
        received: expected,
        message,
        isInline: true,
        properties,
        inlineSnapshot,
        error,
        errorMessage,
        ...getTestNames(test3)
      });
    }
  );
  utils.addMethod(
    chai3.Assertion.prototype,
    "toThrowErrorMatchingSnapshot",
    function(message) {
      const expected = utils.flag(this, "object");
      const test3 = utils.flag(this, "vitest-test");
      const promise = utils.flag(this, "promise");
      const errorMessage = utils.flag(this, "message");
      getSnapshotClient().assert({
        received: getErrorString(expected, promise),
        message,
        errorMessage,
        ...getTestNames(test3)
      });
    }
  );
  utils.addMethod(
    chai3.Assertion.prototype,
    "toThrowErrorMatchingInlineSnapshot",
    function __INLINE_SNAPSHOT__(inlineSnapshot, message) {
      var _a2;
      const test3 = utils.flag(this, "vitest-test");
      const isInsideEach = test3 && (test3.each || ((_a2 = test3.suite) == null ? void 0 : _a2.each));
      if (isInsideEach)
        throw new Error("InlineSnapshot cannot be used inside of test.each or describe.each");
      const expected = utils.flag(this, "object");
      const error = utils.flag(this, "error");
      const promise = utils.flag(this, "promise");
      const errorMessage = utils.flag(this, "message");
      getSnapshotClient().assert({
        received: getErrorString(expected, promise),
        message,
        inlineSnapshot,
        isInline: true,
        error,
        errorMessage,
        ...getTestNames(test3)
      });
    }
  );
  utils.addMethod(
    chai3.expect,
    "addSnapshotSerializer",
    addSerializer
  );
};
use(JestExtend);
use(JestChaiExpect);
use(Subset);
use(SnapshotPlugin);
use(JestAsymmetricMatchers);
function createExpect(test3) {
  var _a2;
  const expect2 = (value, message) => {
    const { assertionCalls } = getState(expect2);
    setState({ assertionCalls: assertionCalls + 1, soft: false }, expect2);
    const assert2 = expect(value, message);
    const _test2 = test3 || getCurrentTest();
    if (_test2)
      return assert2.withTest(_test2);
    else
      return assert2;
  };
  Object.assign(expect2, expect);
  expect2.getState = () => getState(expect2);
  expect2.setState = (state) => setState(state, expect2);
  const globalState = getState(globalThis[GLOBAL_EXPECT]) || {};
  setState({
    // this should also add "snapshotState" that is added conditionally
    ...globalState,
    assertionCalls: 0,
    isExpectingAssertions: false,
    isExpectingAssertionsError: null,
    expectedAssertionsNumber: null,
    expectedAssertionsNumberErrorGen: null,
    environment: getCurrentEnvironment(),
    testPath: test3 ? (_a2 = test3.suite.file) == null ? void 0 : _a2.filepath : globalState.testPath,
    currentTestName: test3 ? getFullName(test3) : globalState.currentTestName
  }, expect2);
  expect2.extend = (matchers) => expect.extend(expect2, matchers);
  expect2.soft = (...args) => {
    const assert2 = expect2(...args);
    expect2.setState({
      soft: true
    });
    return assert2;
  };
  expect2.unreachable = (message) => {
    assert.fail(`expected${message ? ` "${message}" ` : " "}not to be reached`);
  };
  function assertions(expected) {
    const errorGen = () => new Error(`expected number of assertions to be ${expected}, but got ${expect2.getState().assertionCalls}`);
    if (Error.captureStackTrace)
      Error.captureStackTrace(errorGen(), assertions);
    expect2.setState({
      expectedAssertionsNumber: expected,
      expectedAssertionsNumberErrorGen: errorGen
    });
  }
  function hasAssertions() {
    const error = new Error("expected any number of assertion, but got none");
    if (Error.captureStackTrace)
      Error.captureStackTrace(error, hasAssertions);
    expect2.setState({
      isExpectingAssertions: true,
      isExpectingAssertionsError: error
    });
  }
  util.addMethod(expect2, "assertions", assertions);
  util.addMethod(expect2, "hasAssertions", hasAssertions);
  return expect2;
}
var globalExpect = createExpect();
Object.defineProperty(globalThis, GLOBAL_EXPECT, {
  value: globalExpect,
  writable: true,
  configurable: true
});
var fakeTimersSrc = { exports: {} };
var globalObject;
if (typeof commonjsGlobal !== "undefined") {
  globalObject = commonjsGlobal;
} else if (typeof window !== "undefined") {
  globalObject = window;
} else {
  globalObject = self;
}
var global2 = globalObject;
var throwsOnProto$1;
try {
  const object3 = {};
  object3.__proto__;
  throwsOnProto$1 = false;
} catch (_) {
  throwsOnProto$1 = true;
}
var throwsOnProto_1 = throwsOnProto$1;
var call = Function.call;
var throwsOnProto = throwsOnProto_1;
var disallowedProperties = [
  // ignore size because it throws from Map
  "size",
  "caller",
  "callee",
  "arguments"
];
if (throwsOnProto) {
  disallowedProperties.push("__proto__");
}
var copyPrototypeMethods = function copyPrototypeMethods2(prototype) {
  return Object.getOwnPropertyNames(prototype).reduce(
    function(result, name) {
      if (disallowedProperties.includes(name)) {
        return result;
      }
      if (typeof prototype[name] !== "function") {
        return result;
      }
      result[name] = call.bind(prototype[name]);
      return result;
    },
    /* @__PURE__ */ Object.create(null)
  );
};
var copyPrototype$5 = copyPrototypeMethods;
var array = copyPrototype$5(Array.prototype);
var every$1 = array.every;
function hasCallsLeft(callMap, spy) {
  if (callMap[spy.id] === void 0) {
    callMap[spy.id] = 0;
  }
  return callMap[spy.id] < spy.callCount;
}
function checkAdjacentCalls(callMap, spy, index2, spies2) {
  var calledBeforeNext = true;
  if (index2 !== spies2.length - 1) {
    calledBeforeNext = spy.calledBefore(spies2[index2 + 1]);
  }
  if (hasCallsLeft(callMap, spy) && calledBeforeNext) {
    callMap[spy.id] += 1;
    return true;
  }
  return false;
}
function calledInOrder(spies2) {
  var callMap = {};
  var _spies = arguments.length > 1 ? arguments : spies2;
  return every$1(_spies, checkAdjacentCalls.bind(null, callMap));
}
var calledInOrder_1 = calledInOrder;
var functionName$1 = function functionName(func) {
  if (!func) {
    return "";
  }
  try {
    return func.displayName || func.name || // Use function decomposition as a last resort to get function
    // name. Does not rely on function decomposition to work - if it
    // doesn't debugging will be slightly less informative
    // (i.e. toString will say 'spy' rather than 'myFunc').
    (String(func).match(/function ([^\s(]+)/) || [])[1];
  } catch (e) {
    return "";
  }
};
var functionName2 = functionName$1;
function className(value) {
  return value.constructor && value.constructor.name || // The next branch is for IE11 support only:
  // Because the name property is not set on the prototype
  // of the Function object, we finally try to grab the
  // name from its definition. This will never be reached
  // in node, so we are not able to test this properly.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
  typeof value.constructor === "function" && /* istanbul ignore next */
  functionName2(value.constructor) || null;
}
var className_1 = className;
var deprecated = {};
(function(exports2) {
  exports2.wrap = function(func, msg) {
    var wrapped = function() {
      exports2.printWarning(msg);
      return func.apply(this, arguments);
    };
    if (func.prototype) {
      wrapped.prototype = func.prototype;
    }
    return wrapped;
  };
  exports2.defaultMsg = function(packageName, funcName) {
    return `${packageName}.${funcName} is deprecated and will be removed from the public API in a future version of ${packageName}.`;
  };
  exports2.printWarning = function(msg) {
    if (typeof process === "object" && process.emitWarning) {
      process.emitWarning(msg);
    } else if (console.info) {
      console.info(msg);
    } else {
      console.log(msg);
    }
  };
})(deprecated);
var every = function every2(obj, fn2) {
  var pass = true;
  try {
    obj.forEach(function() {
      if (!fn2.apply(this, arguments)) {
        throw new Error();
      }
    });
  } catch (e) {
    pass = false;
  }
  return pass;
};
var sort3 = array.sort;
var slice = array.slice;
function comparator(a, b2) {
  var aCall = a.getCall(0);
  var bCall = b2.getCall(0);
  var aId = aCall && aCall.callId || -1;
  var bId = bCall && bCall.callId || -1;
  return aId < bId ? -1 : 1;
}
function orderByFirstCall(spies2) {
  return sort3(slice(spies2), comparator);
}
var orderByFirstCall_1 = orderByFirstCall;
var copyPrototype$4 = copyPrototypeMethods;
var _function = copyPrototype$4(Function.prototype);
var copyPrototype$3 = copyPrototypeMethods;
var map = copyPrototype$3(Map.prototype);
var copyPrototype$2 = copyPrototypeMethods;
var object = copyPrototype$2(Object.prototype);
var copyPrototype$1 = copyPrototypeMethods;
var set2 = copyPrototype$1(Set.prototype);
var copyPrototype = copyPrototypeMethods;
var string2 = copyPrototype(String.prototype);
var prototypes = {
  array,
  function: _function,
  map,
  object,
  set: set2,
  string: string2
};
var typeDetect = { exports: {} };
(function(module2, exports2) {
  (function(global3, factory) {
    module2.exports = factory();
  })(commonjsGlobal, function() {
    var promiseExists = typeof Promise === "function";
    var globalObject2 = typeof self === "object" ? self : commonjsGlobal;
    var symbolExists = typeof Symbol !== "undefined";
    var mapExists = typeof Map !== "undefined";
    var setExists = typeof Set !== "undefined";
    var weakMapExists = typeof WeakMap !== "undefined";
    var weakSetExists = typeof WeakSet !== "undefined";
    var dataViewExists = typeof DataView !== "undefined";
    var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== "undefined";
    var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== "undefined";
    var setEntriesExists = setExists && typeof Set.prototype.entries === "function";
    var mapEntriesExists = mapExists && typeof Map.prototype.entries === "function";
    var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Set()).entries());
    var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Map()).entries());
    var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === "function";
    var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
    var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === "function";
    var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(""[Symbol.iterator]());
    var toStringLeftSliceLength = 8;
    var toStringRightSliceLength = -1;
    function typeDetect2(obj) {
      var typeofObj = typeof obj;
      if (typeofObj !== "object") {
        return typeofObj;
      }
      if (obj === null) {
        return "null";
      }
      if (obj === globalObject2) {
        return "global";
      }
      if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
        return "Array";
      }
      if (typeof window === "object" && window !== null) {
        if (typeof window.location === "object" && obj === window.location) {
          return "Location";
        }
        if (typeof window.document === "object" && obj === window.document) {
          return "Document";
        }
        if (typeof window.navigator === "object") {
          if (typeof window.navigator.mimeTypes === "object" && obj === window.navigator.mimeTypes) {
            return "MimeTypeArray";
          }
          if (typeof window.navigator.plugins === "object" && obj === window.navigator.plugins) {
            return "PluginArray";
          }
        }
        if ((typeof window.HTMLElement === "function" || typeof window.HTMLElement === "object") && obj instanceof window.HTMLElement) {
          if (obj.tagName === "BLOCKQUOTE") {
            return "HTMLQuoteElement";
          }
          if (obj.tagName === "TD") {
            return "HTMLTableDataCellElement";
          }
          if (obj.tagName === "TH") {
            return "HTMLTableHeaderCellElement";
          }
        }
      }
      var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
      if (typeof stringTag === "string") {
        return stringTag;
      }
      var objPrototype = Object.getPrototypeOf(obj);
      if (objPrototype === RegExp.prototype) {
        return "RegExp";
      }
      if (objPrototype === Date.prototype) {
        return "Date";
      }
      if (promiseExists && objPrototype === Promise.prototype) {
        return "Promise";
      }
      if (setExists && objPrototype === Set.prototype) {
        return "Set";
      }
      if (mapExists && objPrototype === Map.prototype) {
        return "Map";
      }
      if (weakSetExists && objPrototype === WeakSet.prototype) {
        return "WeakSet";
      }
      if (weakMapExists && objPrototype === WeakMap.prototype) {
        return "WeakMap";
      }
      if (dataViewExists && objPrototype === DataView.prototype) {
        return "DataView";
      }
      if (mapExists && objPrototype === mapIteratorPrototype) {
        return "Map Iterator";
      }
      if (setExists && objPrototype === setIteratorPrototype) {
        return "Set Iterator";
      }
      if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
        return "Array Iterator";
      }
      if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
        return "String Iterator";
      }
      if (objPrototype === null) {
        return "Object";
      }
      return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
    }
    return typeDetect2;
  });
})(typeDetect);
var typeDetectExports = typeDetect.exports;
var type = typeDetectExports;
var typeOf = function typeOf2(value) {
  return type(value).toLowerCase();
};
function valueToString(value) {
  if (value && value.toString) {
    return value.toString();
  }
  return String(value);
}
var valueToString_1 = valueToString;
var lib = {
  global: global2,
  calledInOrder: calledInOrder_1,
  className: className_1,
  deprecated,
  every,
  functionName: functionName$1,
  orderByFirstCall: orderByFirstCall_1,
  prototypes,
  typeOf,
  valueToString: valueToString_1
};
(function(module2, exports2) {
  const globalObject2 = lib.global;
  let timersModule;
  if (typeof commonjsRequire === "function" && true) {
    try {
      timersModule = require("timers");
    } catch (e) {
    }
  }
  function withGlobal(_global) {
    const userAgent = _global.navigator && _global.navigator.userAgent;
    const isRunningInIE = userAgent && userAgent.indexOf("MSIE ") > -1;
    const maxTimeout = Math.pow(2, 31) - 1;
    const idCounterStart = 1e12;
    const NOOP = function() {
      return void 0;
    };
    const NOOP_ARRAY = function() {
      return [];
    };
    const timeoutResult = _global.setTimeout(NOOP, 0);
    const addTimerReturnsObject = typeof timeoutResult === "object";
    const hrtimePresent = _global.process && typeof _global.process.hrtime === "function";
    const hrtimeBigintPresent = hrtimePresent && typeof _global.process.hrtime.bigint === "function";
    const nextTickPresent = _global.process && typeof _global.process.nextTick === "function";
    const utilPromisify = _global.process && import_util.default.promisify;
    const performancePresent = _global.performance && typeof _global.performance.now === "function";
    const hasPerformancePrototype = _global.Performance && (typeof _global.Performance).match(/^(function|object)$/);
    const hasPerformanceConstructorPrototype = _global.performance && _global.performance.constructor && _global.performance.constructor.prototype;
    const queueMicrotaskPresent = _global.hasOwnProperty("queueMicrotask");
    const requestAnimationFramePresent = _global.requestAnimationFrame && typeof _global.requestAnimationFrame === "function";
    const cancelAnimationFramePresent = _global.cancelAnimationFrame && typeof _global.cancelAnimationFrame === "function";
    const requestIdleCallbackPresent = _global.requestIdleCallback && typeof _global.requestIdleCallback === "function";
    const cancelIdleCallbackPresent = _global.cancelIdleCallback && typeof _global.cancelIdleCallback === "function";
    const setImmediatePresent = _global.setImmediate && typeof _global.setImmediate === "function";
    if (isRunningInIE) {
      _global.setTimeout = _global.setTimeout;
      _global.clearTimeout = _global.clearTimeout;
      _global.setInterval = _global.setInterval;
      _global.clearInterval = _global.clearInterval;
      _global.Date = _global.Date;
    }
    if (setImmediatePresent) {
      _global.setImmediate = _global.setImmediate;
      _global.clearImmediate = _global.clearImmediate;
    }
    _global.clearTimeout(timeoutResult);
    const NativeDate = _global.Date;
    let uniqueTimerId = idCounterStart;
    function isNumberFinite(num) {
      if (Number.isFinite) {
        return Number.isFinite(num);
      }
      return isFinite(num);
    }
    let isNearInfiniteLimit = false;
    function checkIsNearInfiniteLimit(clock, i) {
      if (clock.loopLimit && i === clock.loopLimit - 1) {
        isNearInfiniteLimit = true;
      }
    }
    function resetIsNearInfiniteLimit() {
      isNearInfiniteLimit = false;
    }
    function parseTime(str) {
      if (!str) {
        return 0;
      }
      const strings = str.split(":");
      const l = strings.length;
      let i = l;
      let ms = 0;
      let parsed;
      if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
        throw new Error(
          "tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits"
        );
      }
      while (i--) {
        parsed = parseInt(strings[i], 10);
        if (parsed >= 60) {
          throw new Error(`Invalid time ${str}`);
        }
        ms += parsed * Math.pow(60, l - i - 1);
      }
      return ms * 1e3;
    }
    function nanoRemainder(msFloat) {
      const modulo = 1e6;
      const remainder = msFloat * 1e6 % modulo;
      const positiveRemainder = remainder < 0 ? remainder + modulo : remainder;
      return Math.floor(positiveRemainder);
    }
    function getEpoch(epoch) {
      if (!epoch) {
        return 0;
      }
      if (typeof epoch.getTime === "function") {
        return epoch.getTime();
      }
      if (typeof epoch === "number") {
        return epoch;
      }
      throw new TypeError("now should be milliseconds since UNIX epoch");
    }
    function inRange(from, to, timer) {
      return timer && timer.callAt >= from && timer.callAt <= to;
    }
    function getInfiniteLoopError(clock, job) {
      const infiniteLoopError = new Error(
        `Aborting after running ${clock.loopLimit} timers, assuming an infinite loop!`
      );
      if (!job.error) {
        return infiniteLoopError;
      }
      const computedTargetPattern = /target\.*[<|(|[].*?[>|\]|)]\s*/;
      let clockMethodPattern = new RegExp(
        String(Object.keys(clock).join("|"))
      );
      if (addTimerReturnsObject) {
        clockMethodPattern = new RegExp(
          `\\s+at (Object\\.)?(?:${Object.keys(clock).join("|")})\\s+`
        );
      }
      let matchedLineIndex = -1;
      job.error.stack.split("\n").some(function(line, i) {
        const matchedComputedTarget = line.match(computedTargetPattern);
        if (matchedComputedTarget) {
          matchedLineIndex = i;
          return true;
        }
        const matchedClockMethod = line.match(clockMethodPattern);
        if (matchedClockMethod) {
          matchedLineIndex = i;
          return false;
        }
        return matchedLineIndex >= 0;
      });
      const stack = `${infiniteLoopError}
${job.type || "Microtask"} - ${job.func.name || "anonymous"}
${job.error.stack.split("\n").slice(matchedLineIndex + 1).join("\n")}`;
      try {
        Object.defineProperty(infiniteLoopError, "stack", {
          value: stack
        });
      } catch (e) {
      }
      return infiniteLoopError;
    }
    function mirrorDateProperties(target, source) {
      let prop;
      for (prop in source) {
        if (source.hasOwnProperty(prop)) {
          target[prop] = source[prop];
        }
      }
      if (source.now) {
        target.now = function now3() {
          return target.clock.now;
        };
      } else {
        delete target.now;
      }
      if (source.toSource) {
        target.toSource = function toSource() {
          return source.toSource();
        };
      } else {
        delete target.toSource;
      }
      target.toString = function toString3() {
        return source.toString();
      };
      target.prototype = source.prototype;
      target.parse = source.parse;
      target.UTC = source.UTC;
      target.prototype.toUTCString = source.prototype.toUTCString;
      target.isFake = true;
      return target;
    }
    function createDate() {
      function ClockDate(year, month, date, hour, minute, second, ms) {
        if (!(this instanceof ClockDate)) {
          return new NativeDate(ClockDate.clock.now).toString();
        }
        switch (arguments.length) {
          case 0:
            return new NativeDate(ClockDate.clock.now);
          case 1:
            return new NativeDate(year);
          case 2:
            return new NativeDate(year, month);
          case 3:
            return new NativeDate(year, month, date);
          case 4:
            return new NativeDate(year, month, date, hour);
          case 5:
            return new NativeDate(year, month, date, hour, minute);
          case 6:
            return new NativeDate(
              year,
              month,
              date,
              hour,
              minute,
              second
            );
          default:
            return new NativeDate(
              year,
              month,
              date,
              hour,
              minute,
              second,
              ms
            );
        }
      }
      return mirrorDateProperties(ClockDate, NativeDate);
    }
    function enqueueJob(clock, job) {
      if (!clock.jobs) {
        clock.jobs = [];
      }
      clock.jobs.push(job);
    }
    function runJobs(clock) {
      if (!clock.jobs) {
        return;
      }
      for (let i = 0; i < clock.jobs.length; i++) {
        const job = clock.jobs[i];
        job.func.apply(null, job.args);
        checkIsNearInfiniteLimit(clock, i);
        if (clock.loopLimit && i > clock.loopLimit) {
          throw getInfiniteLoopError(clock, job);
        }
      }
      resetIsNearInfiniteLimit();
      clock.jobs = [];
    }
    function addTimer(clock, timer) {
      if (timer.func === void 0) {
        throw new Error("Callback must be provided to timer calls");
      }
      if (addTimerReturnsObject) {
        if (typeof timer.func !== "function") {
          throw new TypeError(
            `[ERR_INVALID_CALLBACK]: Callback must be a function. Received ${timer.func} of type ${typeof timer.func}`
          );
        }
      }
      if (isNearInfiniteLimit) {
        timer.error = new Error();
      }
      timer.type = timer.immediate ? "Immediate" : "Timeout";
      if (timer.hasOwnProperty("delay")) {
        if (typeof timer.delay !== "number") {
          timer.delay = parseInt(timer.delay, 10);
        }
        if (!isNumberFinite(timer.delay)) {
          timer.delay = 0;
        }
        timer.delay = timer.delay > maxTimeout ? 1 : timer.delay;
        timer.delay = Math.max(0, timer.delay);
      }
      if (timer.hasOwnProperty("interval")) {
        timer.type = "Interval";
        timer.interval = timer.interval > maxTimeout ? 1 : timer.interval;
      }
      if (timer.hasOwnProperty("animation")) {
        timer.type = "AnimationFrame";
        timer.animation = true;
      }
      if (timer.hasOwnProperty("idleCallback")) {
        timer.type = "IdleCallback";
        timer.idleCallback = true;
      }
      if (!clock.timers) {
        clock.timers = {};
      }
      timer.id = uniqueTimerId++;
      timer.createdAt = clock.now;
      timer.callAt = clock.now + (parseInt(timer.delay) || (clock.duringTick ? 1 : 0));
      clock.timers[timer.id] = timer;
      if (addTimerReturnsObject) {
        const res = {
          refed: true,
          ref: function() {
            this.refed = true;
            return res;
          },
          unref: function() {
            this.refed = false;
            return res;
          },
          hasRef: function() {
            return this.refed;
          },
          refresh: function() {
            timer.callAt = clock.now + (parseInt(timer.delay) || (clock.duringTick ? 1 : 0));
            clock.timers[timer.id] = timer;
            return res;
          },
          [Symbol.toPrimitive]: function() {
            return timer.id;
          }
        };
        return res;
      }
      return timer.id;
    }
    function compareTimers(a, b2) {
      if (a.callAt < b2.callAt) {
        return -1;
      }
      if (a.callAt > b2.callAt) {
        return 1;
      }
      if (a.immediate && !b2.immediate) {
        return -1;
      }
      if (!a.immediate && b2.immediate) {
        return 1;
      }
      if (a.createdAt < b2.createdAt) {
        return -1;
      }
      if (a.createdAt > b2.createdAt) {
        return 1;
      }
      if (a.id < b2.id) {
        return -1;
      }
      if (a.id > b2.id) {
        return 1;
      }
    }
    function firstTimerInRange(clock, from, to) {
      const timers2 = clock.timers;
      let timer = null;
      let id, isInRange;
      for (id in timers2) {
        if (timers2.hasOwnProperty(id)) {
          isInRange = inRange(from, to, timers2[id]);
          if (isInRange && (!timer || compareTimers(timer, timers2[id]) === 1)) {
            timer = timers2[id];
          }
        }
      }
      return timer;
    }
    function firstTimer(clock) {
      const timers2 = clock.timers;
      let timer = null;
      let id;
      for (id in timers2) {
        if (timers2.hasOwnProperty(id)) {
          if (!timer || compareTimers(timer, timers2[id]) === 1) {
            timer = timers2[id];
          }
        }
      }
      return timer;
    }
    function lastTimer(clock) {
      const timers2 = clock.timers;
      let timer = null;
      let id;
      for (id in timers2) {
        if (timers2.hasOwnProperty(id)) {
          if (!timer || compareTimers(timer, timers2[id]) === -1) {
            timer = timers2[id];
          }
        }
      }
      return timer;
    }
    function callTimer(clock, timer) {
      if (typeof timer.interval === "number") {
        clock.timers[timer.id].callAt += timer.interval;
      } else {
        delete clock.timers[timer.id];
      }
      if (typeof timer.func === "function") {
        timer.func.apply(null, timer.args);
      } else {
        const eval2 = eval;
        (function() {
          eval2(timer.func);
        })();
      }
    }
    function getClearHandler(ttype) {
      if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
        return `cancel${ttype}`;
      }
      return `clear${ttype}`;
    }
    function getScheduleHandler(ttype) {
      if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
        return `request${ttype}`;
      }
      return `set${ttype}`;
    }
    function createWarnOnce() {
      let calls = 0;
      return function(msg) {
        !calls++ && console.warn(msg);
      };
    }
    const warnOnce = createWarnOnce();
    function clearTimer(clock, timerId, ttype) {
      if (!timerId) {
        return;
      }
      if (!clock.timers) {
        clock.timers = {};
      }
      const id = Number(timerId);
      if (Number.isNaN(id) || id < idCounterStart) {
        const handlerName = getClearHandler(ttype);
        if (clock.shouldClearNativeTimers === true) {
          const nativeHandler = clock[`_${handlerName}`];
          return typeof nativeHandler === "function" ? nativeHandler(timerId) : void 0;
        }
        warnOnce(
          `FakeTimers: ${handlerName} was invoked to clear a native timer instead of one created by this library.
To automatically clean-up native timers, use \`shouldClearNativeTimers\`.`
        );
      }
      if (clock.timers.hasOwnProperty(id)) {
        const timer = clock.timers[id];
        if (timer.type === ttype || timer.type === "Timeout" && ttype === "Interval" || timer.type === "Interval" && ttype === "Timeout") {
          delete clock.timers[id];
        } else {
          const clear = getClearHandler(ttype);
          const schedule = getScheduleHandler(timer.type);
          throw new Error(
            `Cannot clear timer: timer created with ${schedule}() but cleared with ${clear}()`
          );
        }
      }
    }
    function uninstall(clock, config2) {
      let method, i, l;
      const installedHrTime = "_hrtime";
      const installedNextTick = "_nextTick";
      for (i = 0, l = clock.methods.length; i < l; i++) {
        method = clock.methods[i];
        if (method === "hrtime" && _global.process) {
          _global.process.hrtime = clock[installedHrTime];
        } else if (method === "nextTick" && _global.process) {
          _global.process.nextTick = clock[installedNextTick];
        } else if (method === "performance") {
          const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
            clock,
            `_${method}`
          );
          if (originalPerfDescriptor && originalPerfDescriptor.get && !originalPerfDescriptor.set) {
            Object.defineProperty(
              _global,
              method,
              originalPerfDescriptor
            );
          } else if (originalPerfDescriptor.configurable) {
            _global[method] = clock[`_${method}`];
          }
        } else {
          if (_global[method] && _global[method].hadOwnProperty) {
            _global[method] = clock[`_${method}`];
          } else {
            try {
              delete _global[method];
            } catch (ignore) {
            }
          }
        }
        if (clock.timersModuleMethods !== void 0) {
          for (let j = 0; j < clock.timersModuleMethods.length; j++) {
            const entry = clock.timersModuleMethods[j];
            timersModule[entry.methodName] = entry.original;
          }
        }
      }
      if (config2.shouldAdvanceTime === true) {
        _global.clearInterval(clock.attachedInterval);
      }
      clock.methods = [];
      if (!clock.timers) {
        return [];
      }
      return Object.keys(clock.timers).map(function mapper(key) {
        return clock.timers[key];
      });
    }
    function hijackMethod(target, method, clock) {
      clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(
        target,
        method
      );
      clock[`_${method}`] = target[method];
      if (method === "Date") {
        const date = mirrorDateProperties(clock[method], target[method]);
        target[method] = date;
      } else if (method === "performance") {
        const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
          target,
          method
        );
        if (originalPerfDescriptor && originalPerfDescriptor.get && !originalPerfDescriptor.set) {
          Object.defineProperty(
            clock,
            `_${method}`,
            originalPerfDescriptor
          );
          const perfDescriptor = Object.getOwnPropertyDescriptor(
            clock,
            method
          );
          Object.defineProperty(target, method, perfDescriptor);
        } else {
          target[method] = clock[method];
        }
      } else {
        target[method] = function() {
          return clock[method].apply(clock, arguments);
        };
        Object.defineProperties(
          target[method],
          Object.getOwnPropertyDescriptors(clock[method])
        );
      }
      target[method].clock = clock;
    }
    function doIntervalTick(clock, advanceTimeDelta) {
      clock.tick(advanceTimeDelta);
    }
    const timers = {
      setTimeout: _global.setTimeout,
      clearTimeout: _global.clearTimeout,
      setInterval: _global.setInterval,
      clearInterval: _global.clearInterval,
      Date: _global.Date
    };
    if (setImmediatePresent) {
      timers.setImmediate = _global.setImmediate;
      timers.clearImmediate = _global.clearImmediate;
    }
    if (hrtimePresent) {
      timers.hrtime = _global.process.hrtime;
    }
    if (nextTickPresent) {
      timers.nextTick = _global.process.nextTick;
    }
    if (performancePresent) {
      timers.performance = _global.performance;
    }
    if (requestAnimationFramePresent) {
      timers.requestAnimationFrame = _global.requestAnimationFrame;
    }
    if (queueMicrotaskPresent) {
      timers.queueMicrotask = true;
    }
    if (cancelAnimationFramePresent) {
      timers.cancelAnimationFrame = _global.cancelAnimationFrame;
    }
    if (requestIdleCallbackPresent) {
      timers.requestIdleCallback = _global.requestIdleCallback;
    }
    if (cancelIdleCallbackPresent) {
      timers.cancelIdleCallback = _global.cancelIdleCallback;
    }
    const originalSetTimeout = _global.setImmediate || _global.setTimeout;
    function createClock(start, loopLimit) {
      start = Math.floor(getEpoch(start));
      loopLimit = loopLimit || 1e3;
      let nanos = 0;
      const adjustedSystemTime = [0, 0];
      if (NativeDate === void 0) {
        throw new Error(
          "The global scope doesn't have a `Date` object (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)"
        );
      }
      const clock = {
        now: start,
        Date: createDate(),
        loopLimit
      };
      clock.Date.clock = clock;
      function getTimeToNextFrame() {
        return 16 - (clock.now - start) % 16;
      }
      function hrtime(prev) {
        const millisSinceStart = clock.now - adjustedSystemTime[0] - start;
        const secsSinceStart = Math.floor(millisSinceStart / 1e3);
        const remainderInNanos = (millisSinceStart - secsSinceStart * 1e3) * 1e6 + nanos - adjustedSystemTime[1];
        if (Array.isArray(prev)) {
          if (prev[1] > 1e9) {
            throw new TypeError(
              "Number of nanoseconds can't exceed a billion"
            );
          }
          const oldSecs = prev[0];
          let nanoDiff = remainderInNanos - prev[1];
          let secDiff = secsSinceStart - oldSecs;
          if (nanoDiff < 0) {
            nanoDiff += 1e9;
            secDiff -= 1;
          }
          return [secDiff, nanoDiff];
        }
        return [secsSinceStart, remainderInNanos];
      }
      function fakePerformanceNow() {
        const hrt = hrtime();
        const millis = hrt[0] * 1e3 + hrt[1] / 1e6;
        return millis;
      }
      if (hrtimeBigintPresent) {
        hrtime.bigint = function() {
          const parts = hrtime();
          return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]);
        };
      }
      clock.requestIdleCallback = function requestIdleCallback(func, timeout) {
        let timeToNextIdlePeriod = 0;
        if (clock.countTimers() > 0) {
          timeToNextIdlePeriod = 50;
        }
        const result = addTimer(clock, {
          func,
          args: Array.prototype.slice.call(arguments, 2),
          delay: typeof timeout === "undefined" ? timeToNextIdlePeriod : Math.min(timeout, timeToNextIdlePeriod),
          idleCallback: true
        });
        return Number(result);
      };
      clock.cancelIdleCallback = function cancelIdleCallback(timerId) {
        return clearTimer(clock, timerId, "IdleCallback");
      };
      clock.setTimeout = function setTimeout(func, timeout) {
        return addTimer(clock, {
          func,
          args: Array.prototype.slice.call(arguments, 2),
          delay: timeout
        });
      };
      if (typeof _global.Promise !== "undefined" && utilPromisify) {
        clock.setTimeout[utilPromisify.custom] = function promisifiedSetTimeout(timeout, arg) {
          return new _global.Promise(function setTimeoutExecutor(resolve2) {
            addTimer(clock, {
              func: resolve2,
              args: [arg],
              delay: timeout
            });
          });
        };
      }
      clock.clearTimeout = function clearTimeout(timerId) {
        return clearTimer(clock, timerId, "Timeout");
      };
      clock.nextTick = function nextTick(func) {
        return enqueueJob(clock, {
          func,
          args: Array.prototype.slice.call(arguments, 1),
          error: isNearInfiniteLimit ? new Error() : null
        });
      };
      clock.queueMicrotask = function queueMicrotask(func) {
        return clock.nextTick(func);
      };
      clock.setInterval = function setInterval(func, timeout) {
        timeout = parseInt(timeout, 10);
        return addTimer(clock, {
          func,
          args: Array.prototype.slice.call(arguments, 2),
          delay: timeout,
          interval: timeout
        });
      };
      clock.clearInterval = function clearInterval(timerId) {
        return clearTimer(clock, timerId, "Interval");
      };
      if (setImmediatePresent) {
        clock.setImmediate = function setImmediate(func) {
          return addTimer(clock, {
            func,
            args: Array.prototype.slice.call(arguments, 1),
            immediate: true
          });
        };
        if (typeof _global.Promise !== "undefined" && utilPromisify) {
          clock.setImmediate[utilPromisify.custom] = function promisifiedSetImmediate(arg) {
            return new _global.Promise(
              function setImmediateExecutor(resolve2) {
                addTimer(clock, {
                  func: resolve2,
                  args: [arg],
                  immediate: true
                });
              }
            );
          };
        }
        clock.clearImmediate = function clearImmediate(timerId) {
          return clearTimer(clock, timerId, "Immediate");
        };
      }
      clock.countTimers = function countTimers() {
        return Object.keys(clock.timers || {}).length + (clock.jobs || []).length;
      };
      clock.requestAnimationFrame = function requestAnimationFrame(func) {
        const result = addTimer(clock, {
          func,
          delay: getTimeToNextFrame(),
          get args() {
            return [fakePerformanceNow()];
          },
          animation: true
        });
        return Number(result);
      };
      clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
        return clearTimer(clock, timerId, "AnimationFrame");
      };
      clock.runMicrotasks = function runMicrotasks() {
        runJobs(clock);
      };
      function doTick(tickValue, isAsync, resolve2, reject) {
        const msFloat = typeof tickValue === "number" ? tickValue : parseTime(tickValue);
        const ms = Math.floor(msFloat);
        const remainder = nanoRemainder(msFloat);
        let nanosTotal = nanos + remainder;
        let tickTo = clock.now + ms;
        if (msFloat < 0) {
          throw new TypeError("Negative ticks are not supported");
        }
        if (nanosTotal >= 1e6) {
          tickTo += 1;
          nanosTotal -= 1e6;
        }
        nanos = nanosTotal;
        let tickFrom = clock.now;
        let previous = clock.now;
        let timer, firstException, oldNow, nextPromiseTick, compensationCheck, postTimerCall;
        clock.duringTick = true;
        oldNow = clock.now;
        runJobs(clock);
        if (oldNow !== clock.now) {
          tickFrom += clock.now - oldNow;
          tickTo += clock.now - oldNow;
        }
        function doTickInner() {
          timer = firstTimerInRange(clock, tickFrom, tickTo);
          while (timer && tickFrom <= tickTo) {
            if (clock.timers[timer.id]) {
              tickFrom = timer.callAt;
              clock.now = timer.callAt;
              oldNow = clock.now;
              try {
                runJobs(clock);
                callTimer(clock, timer);
              } catch (e) {
                firstException = firstException || e;
              }
              if (isAsync) {
                originalSetTimeout(nextPromiseTick);
                return;
              }
              compensationCheck();
            }
            postTimerCall();
          }
          oldNow = clock.now;
          runJobs(clock);
          if (oldNow !== clock.now) {
            tickFrom += clock.now - oldNow;
            tickTo += clock.now - oldNow;
          }
          clock.duringTick = false;
          timer = firstTimerInRange(clock, tickFrom, tickTo);
          if (timer) {
            try {
              clock.tick(tickTo - clock.now);
            } catch (e) {
              firstException = firstException || e;
            }
          } else {
            clock.now = tickTo;
            nanos = nanosTotal;
          }
          if (firstException) {
            throw firstException;
          }
          if (isAsync) {
            resolve2(clock.now);
          } else {
            return clock.now;
          }
        }
        nextPromiseTick = isAsync && function() {
          try {
            compensationCheck();
            postTimerCall();
            doTickInner();
          } catch (e) {
            reject(e);
          }
        };
        compensationCheck = function() {
          if (oldNow !== clock.now) {
            tickFrom += clock.now - oldNow;
            tickTo += clock.now - oldNow;
            previous += clock.now - oldNow;
          }
        };
        postTimerCall = function() {
          timer = firstTimerInRange(clock, previous, tickTo);
          previous = tickFrom;
        };
        return doTickInner();
      }
      clock.tick = function tick(tickValue) {
        return doTick(tickValue, false);
      };
      if (typeof _global.Promise !== "undefined") {
        clock.tickAsync = function tickAsync(tickValue) {
          return new _global.Promise(function(resolve2, reject) {
            originalSetTimeout(function() {
              try {
                doTick(tickValue, true, resolve2, reject);
              } catch (e) {
                reject(e);
              }
            });
          });
        };
      }
      clock.next = function next() {
        runJobs(clock);
        const timer = firstTimer(clock);
        if (!timer) {
          return clock.now;
        }
        clock.duringTick = true;
        try {
          clock.now = timer.callAt;
          callTimer(clock, timer);
          runJobs(clock);
          return clock.now;
        } finally {
          clock.duringTick = false;
        }
      };
      if (typeof _global.Promise !== "undefined") {
        clock.nextAsync = function nextAsync() {
          return new _global.Promise(function(resolve2, reject) {
            originalSetTimeout(function() {
              try {
                const timer = firstTimer(clock);
                if (!timer) {
                  resolve2(clock.now);
                  return;
                }
                let err;
                clock.duringTick = true;
                clock.now = timer.callAt;
                try {
                  callTimer(clock, timer);
                } catch (e) {
                  err = e;
                }
                clock.duringTick = false;
                originalSetTimeout(function() {
                  if (err) {
                    reject(err);
                  } else {
                    resolve2(clock.now);
                  }
                });
              } catch (e) {
                reject(e);
              }
            });
          });
        };
      }
      clock.runAll = function runAll() {
        let numTimers, i;
        runJobs(clock);
        for (i = 0; i < clock.loopLimit; i++) {
          if (!clock.timers) {
            resetIsNearInfiniteLimit();
            return clock.now;
          }
          numTimers = Object.keys(clock.timers).length;
          if (numTimers === 0) {
            resetIsNearInfiniteLimit();
            return clock.now;
          }
          clock.next();
          checkIsNearInfiniteLimit(clock, i);
        }
        const excessJob = firstTimer(clock);
        throw getInfiniteLoopError(clock, excessJob);
      };
      clock.runToFrame = function runToFrame() {
        return clock.tick(getTimeToNextFrame());
      };
      if (typeof _global.Promise !== "undefined") {
        clock.runAllAsync = function runAllAsync() {
          return new _global.Promise(function(resolve2, reject) {
            let i = 0;
            function doRun() {
              originalSetTimeout(function() {
                try {
                  let numTimers;
                  if (i < clock.loopLimit) {
                    if (!clock.timers) {
                      resetIsNearInfiniteLimit();
                      resolve2(clock.now);
                      return;
                    }
                    numTimers = Object.keys(
                      clock.timers
                    ).length;
                    if (numTimers === 0) {
                      resetIsNearInfiniteLimit();
                      resolve2(clock.now);
                      return;
                    }
                    clock.next();
                    i++;
                    doRun();
                    checkIsNearInfiniteLimit(clock, i);
                    return;
                  }
                  const excessJob = firstTimer(clock);
                  reject(getInfiniteLoopError(clock, excessJob));
                } catch (e) {
                  reject(e);
                }
              });
            }
            doRun();
          });
        };
      }
      clock.runToLast = function runToLast() {
        const timer = lastTimer(clock);
        if (!timer) {
          runJobs(clock);
          return clock.now;
        }
        return clock.tick(timer.callAt - clock.now);
      };
      if (typeof _global.Promise !== "undefined") {
        clock.runToLastAsync = function runToLastAsync() {
          return new _global.Promise(function(resolve2, reject) {
            originalSetTimeout(function() {
              try {
                const timer = lastTimer(clock);
                if (!timer) {
                  resolve2(clock.now);
                }
                resolve2(clock.tickAsync(timer.callAt - clock.now));
              } catch (e) {
                reject(e);
              }
            });
          });
        };
      }
      clock.reset = function reset() {
        nanos = 0;
        clock.timers = {};
        clock.jobs = [];
        clock.now = start;
      };
      clock.setSystemTime = function setSystemTime(systemTime) {
        const newNow = getEpoch(systemTime);
        const difference = newNow - clock.now;
        let id, timer;
        adjustedSystemTime[0] = adjustedSystemTime[0] + difference;
        adjustedSystemTime[1] = adjustedSystemTime[1] + nanos;
        clock.now = newNow;
        nanos = 0;
        for (id in clock.timers) {
          if (clock.timers.hasOwnProperty(id)) {
            timer = clock.timers[id];
            timer.createdAt += difference;
            timer.callAt += difference;
          }
        }
      };
      clock.jump = function jump(tickValue) {
        const msFloat = typeof tickValue === "number" ? tickValue : parseTime(tickValue);
        const ms = Math.floor(msFloat);
        for (const timer of Object.values(clock.timers)) {
          if (clock.now + ms > timer.callAt) {
            timer.callAt = clock.now + ms;
          }
        }
        clock.tick(ms);
      };
      if (performancePresent) {
        clock.performance = /* @__PURE__ */ Object.create(null);
        clock.performance.now = fakePerformanceNow;
      }
      if (hrtimePresent) {
        clock.hrtime = hrtime;
      }
      return clock;
    }
    function install(config2) {
      if (arguments.length > 1 || config2 instanceof Date || Array.isArray(config2) || typeof config2 === "number") {
        throw new TypeError(
          `FakeTimers.install called with ${String(
            config2
          )} install requires an object parameter`
        );
      }
      if (_global.Date.isFake === true) {
        throw new TypeError(
          "Can't install fake timers twice on the same global object."
        );
      }
      config2 = typeof config2 !== "undefined" ? config2 : {};
      config2.shouldAdvanceTime = config2.shouldAdvanceTime || false;
      config2.advanceTimeDelta = config2.advanceTimeDelta || 20;
      config2.shouldClearNativeTimers = config2.shouldClearNativeTimers || false;
      if (config2.target) {
        throw new TypeError(
          "config.target is no longer supported. Use `withGlobal(target)` instead."
        );
      }
      let i, l;
      const clock = createClock(config2.now, config2.loopLimit);
      clock.shouldClearNativeTimers = config2.shouldClearNativeTimers;
      clock.uninstall = function() {
        return uninstall(clock, config2);
      };
      clock.methods = config2.toFake || [];
      if (clock.methods.length === 0) {
        clock.methods = Object.keys(timers).filter(function(key) {
          return key !== "nextTick" && key !== "queueMicrotask";
        });
      }
      if (config2.shouldAdvanceTime === true) {
        const intervalTick = doIntervalTick.bind(
          null,
          clock,
          config2.advanceTimeDelta
        );
        const intervalId = _global.setInterval(
          intervalTick,
          config2.advanceTimeDelta
        );
        clock.attachedInterval = intervalId;
      }
      if (clock.methods.includes("performance")) {
        const proto = (() => {
          if (hasPerformancePrototype) {
            return _global.Performance.prototype;
          }
          if (hasPerformanceConstructorPrototype) {
            return _global.performance.constructor.prototype;
          }
        })();
        if (proto) {
          Object.getOwnPropertyNames(proto).forEach(function(name) {
            if (name !== "now") {
              clock.performance[name] = name.indexOf("getEntries") === 0 ? NOOP_ARRAY : NOOP;
            }
          });
        } else if ((config2.toFake || []).includes("performance")) {
          throw new ReferenceError(
            "non-existent performance object cannot be faked"
          );
        }
      }
      if (_global === globalObject2 && timersModule) {
        clock.timersModuleMethods = [];
      }
      for (i = 0, l = clock.methods.length; i < l; i++) {
        const nameOfMethodToReplace = clock.methods[i];
        if (nameOfMethodToReplace === "hrtime") {
          if (_global.process && typeof _global.process.hrtime === "function") {
            hijackMethod(_global.process, nameOfMethodToReplace, clock);
          }
        } else if (nameOfMethodToReplace === "nextTick") {
          if (_global.process && typeof _global.process.nextTick === "function") {
            hijackMethod(_global.process, nameOfMethodToReplace, clock);
          }
        } else {
          hijackMethod(_global, nameOfMethodToReplace, clock);
        }
        if (clock.timersModuleMethods !== void 0 && timersModule[nameOfMethodToReplace]) {
          const original = timersModule[nameOfMethodToReplace];
          clock.timersModuleMethods.push({
            methodName: nameOfMethodToReplace,
            original
          });
          timersModule[nameOfMethodToReplace] = _global[nameOfMethodToReplace];
        }
      }
      return clock;
    }
    return {
      timers,
      createClock,
      install,
      withGlobal
    };
  }
  const defaultImplementation = withGlobal(globalObject2);
  exports2.timers = defaultImplementation.timers;
  exports2.createClock = defaultImplementation.createClock;
  exports2.install = defaultImplementation.install;
  exports2.withGlobal = withGlobal;
})(fakeTimersSrc, fakeTimersSrc.exports);
var fakeTimersSrcExports = fakeTimersSrc.exports;
var FakeTimers = class {
  _clock;
  _fakingTime;
  _fakingDate;
  _fakeTimers;
  _userConfig;
  _now = RealDate.now;
  constructor({
    global: global3,
    config: config2
  }) {
    this._userConfig = config2;
    this._fakingDate = false;
    this._fakingTime = false;
    this._fakeTimers = fakeTimersSrcExports.withGlobal(global3);
  }
  clearAllTimers() {
    if (this._fakingTime)
      this._clock.reset();
  }
  dispose() {
    this.useRealTimers();
  }
  runAllTimers() {
    if (this._checkFakeTimers())
      this._clock.runAll();
  }
  async runAllTimersAsync() {
    if (this._checkFakeTimers())
      await this._clock.runAllAsync();
  }
  runOnlyPendingTimers() {
    if (this._checkFakeTimers())
      this._clock.runToLast();
  }
  async runOnlyPendingTimersAsync() {
    if (this._checkFakeTimers())
      await this._clock.runToLastAsync();
  }
  advanceTimersToNextTimer(steps = 1) {
    if (this._checkFakeTimers()) {
      for (let i = steps; i > 0; i--) {
        this._clock.next();
        this._clock.tick(0);
        if (this._clock.countTimers() === 0)
          break;
      }
    }
  }
  async advanceTimersToNextTimerAsync(steps = 1) {
    if (this._checkFakeTimers()) {
      for (let i = steps; i > 0; i--) {
        await this._clock.nextAsync();
        this._clock.tick(0);
        if (this._clock.countTimers() === 0)
          break;
      }
    }
  }
  advanceTimersByTime(msToRun) {
    if (this._checkFakeTimers())
      this._clock.tick(msToRun);
  }
  async advanceTimersByTimeAsync(msToRun) {
    if (this._checkFakeTimers())
      await this._clock.tickAsync(msToRun);
  }
  runAllTicks() {
    if (this._checkFakeTimers()) {
      this._clock.runMicrotasks();
    }
  }
  useRealTimers() {
    if (this._fakingDate) {
      resetDate();
      this._fakingDate = false;
    }
    if (this._fakingTime) {
      this._clock.uninstall();
      this._fakingTime = false;
    }
  }
  useFakeTimers() {
    if (this._fakingDate) {
      throw new Error(
        '"setSystemTime" was called already and date was mocked. Reset timers using `vi.useRealTimers()` if you want to use fake timers again.'
      );
    }
    if (!this._fakingTime) {
      const toFake = Object.keys(this._fakeTimers.timers);
      this._clock = this._fakeTimers.install({
        now: Date.now(),
        toFake,
        ...this._userConfig
      });
      this._fakingTime = true;
    }
  }
  reset() {
    if (this._checkFakeTimers()) {
      const { now: now3 } = this._clock;
      this._clock.reset();
      this._clock.setSystemTime(now3);
    }
  }
  setSystemTime(now3) {
    if (this._fakingTime) {
      this._clock.setSystemTime(now3);
    } else {
      mockDate(now3 ?? this.getRealSystemTime());
      this._fakingDate = true;
    }
  }
  getRealSystemTime() {
    return this._now();
  }
  getTimerCount() {
    if (this._checkFakeTimers())
      return this._clock.countTimers();
    return 0;
  }
  configure(config2) {
    this._userConfig = config2;
  }
  isFakeTimers() {
    return this._fakingTime;
  }
  _checkFakeTimers() {
    if (!this._fakingTime) {
      throw new Error(
        'Timers are not mocked. Try calling "vi.useFakeTimers()" first.'
      );
    }
    return this._fakingTime;
  }
};
function copyStackTrace(target, source) {
  if (source.stack !== void 0)
    target.stack = source.stack.replace(source.message, target.message);
  return target;
}
function waitFor(callback, options = {}) {
  const { setTimeout, setInterval, clearTimeout, clearInterval } = getSafeTimers();
  const { interval = 50, timeout = 1e3 } = typeof options === "number" ? { timeout: options } : options;
  const STACK_TRACE_ERROR = new Error("STACK_TRACE_ERROR");
  return new Promise((resolve2, reject) => {
    let lastError;
    let promiseStatus = "idle";
    let timeoutId;
    let intervalId;
    const onResolve = (result) => {
      if (timeoutId)
        clearTimeout(timeoutId);
      if (intervalId)
        clearInterval(intervalId);
      resolve2(result);
    };
    const handleTimeout = () => {
      let error = lastError;
      if (!error)
        error = copyStackTrace(new Error("Timed out in waitFor!"), STACK_TRACE_ERROR);
      reject(error);
    };
    const checkCallback = () => {
      if (vi.isFakeTimers())
        vi.advanceTimersByTime(interval);
      if (promiseStatus === "pending")
        return;
      try {
        const result = callback();
        if (result !== null && typeof result === "object" && typeof result.then === "function") {
          const thenable = result;
          promiseStatus = "pending";
          thenable.then(
            (resolvedValue) => {
              promiseStatus = "resolved";
              onResolve(resolvedValue);
            },
            (rejectedValue) => {
              promiseStatus = "rejected";
              lastError = rejectedValue;
            }
          );
        } else {
          onResolve(result);
          return true;
        }
      } catch (error) {
        lastError = error;
      }
    };
    if (checkCallback() === true)
      return;
    timeoutId = setTimeout(handleTimeout, timeout);
    intervalId = setInterval(checkCallback, interval);
  });
}
function waitUntil(callback, options = {}) {
  const { setTimeout, setInterval, clearTimeout, clearInterval } = getSafeTimers();
  const { interval = 50, timeout = 1e3 } = typeof options === "number" ? { timeout: options } : options;
  const STACK_TRACE_ERROR = new Error("STACK_TRACE_ERROR");
  return new Promise((resolve2, reject) => {
    let promiseStatus = "idle";
    let timeoutId;
    let intervalId;
    const onReject = (error) => {
      if (!error)
        error = copyStackTrace(new Error("Timed out in waitUntil!"), STACK_TRACE_ERROR);
      reject(error);
    };
    const onResolve = (result) => {
      if (!result)
        return;
      if (timeoutId)
        clearTimeout(timeoutId);
      if (intervalId)
        clearInterval(intervalId);
      resolve2(result);
      return true;
    };
    const checkCallback = () => {
      if (vi.isFakeTimers())
        vi.advanceTimersByTime(interval);
      if (promiseStatus === "pending")
        return;
      try {
        const result = callback();
        if (result !== null && typeof result === "object" && typeof result.then === "function") {
          const thenable = result;
          promiseStatus = "pending";
          thenable.then(
            (resolvedValue) => {
              promiseStatus = "resolved";
              onResolve(resolvedValue);
            },
            (rejectedValue) => {
              promiseStatus = "rejected";
              onReject(rejectedValue);
            }
          );
        } else {
          return onResolve(result);
        }
      } catch (error) {
        onReject(error);
      }
    };
    if (checkCallback() === true)
      return;
    timeoutId = setTimeout(onReject, timeout);
    intervalId = setInterval(checkCallback, interval);
  });
}
function createVitest() {
  const _mocker = typeof __vitest_mocker__ !== "undefined" ? __vitest_mocker__ : new Proxy({}, {
    get(_, name) {
      throw new Error(
        `Vitest mocker was not initialized in this environment. vi.${String(name)}() is forbidden.`
      );
    }
  });
  let _mockedDate = null;
  let _config = null;
  const workerState = getWorkerState();
  if (!workerState) {
    const errorMsg = 'Vitest failed to access its internal state.\n\nOne of the following is possible:\n- "vitest" is imported directly without running "vitest" command\n- "vitest" is imported inside "globalSetup" (to fix this, use "setupFiles" instead, because "globalSetup" runs in a different context)\n- Otherwise, it might be a Vitest bug. Please report it to https://github.com/vitest-dev/vitest/issues\n';
    throw new Error(errorMsg);
  }
  const _timers = new FakeTimers({
    global: globalThis,
    config: workerState.config.fakeTimers
  });
  const _stubsGlobal = /* @__PURE__ */ new Map();
  const _stubsEnv = /* @__PURE__ */ new Map();
  const getImporter = () => {
    const stackTrace = createSimpleStackTrace({ stackTraceLimit: 4 });
    const importerStack = stackTrace.split("\n")[4];
    const stack = parseSingleStack(importerStack);
    return (stack == null ? void 0 : stack.file) || "";
  };
  const utils = {
    useFakeTimers(config2) {
      if (config2) {
        _timers.configure(config2);
      } else {
        const workerState2 = getWorkerState();
        _timers.configure(workerState2.config.fakeTimers);
      }
      _timers.useFakeTimers();
      return utils;
    },
    isFakeTimers() {
      return _timers.isFakeTimers();
    },
    useRealTimers() {
      _timers.useRealTimers();
      _mockedDate = null;
      return utils;
    },
    runOnlyPendingTimers() {
      _timers.runOnlyPendingTimers();
      return utils;
    },
    async runOnlyPendingTimersAsync() {
      await _timers.runOnlyPendingTimersAsync();
      return utils;
    },
    runAllTimers() {
      _timers.runAllTimers();
      return utils;
    },
    async runAllTimersAsync() {
      await _timers.runAllTimersAsync();
      return utils;
    },
    runAllTicks() {
      _timers.runAllTicks();
      return utils;
    },
    advanceTimersByTime(ms) {
      _timers.advanceTimersByTime(ms);
      return utils;
    },
    async advanceTimersByTimeAsync(ms) {
      await _timers.advanceTimersByTimeAsync(ms);
      return utils;
    },
    advanceTimersToNextTimer() {
      _timers.advanceTimersToNextTimer();
      return utils;
    },
    async advanceTimersToNextTimerAsync() {
      await _timers.advanceTimersToNextTimerAsync();
      return utils;
    },
    getTimerCount() {
      return _timers.getTimerCount();
    },
    setSystemTime(time) {
      const date = time instanceof Date ? time : new Date(time);
      _mockedDate = date;
      _timers.setSystemTime(date);
      return utils;
    },
    getMockedSystemTime() {
      return _mockedDate;
    },
    getRealSystemTime() {
      return _timers.getRealSystemTime();
    },
    clearAllTimers() {
      _timers.clearAllTimers();
      return utils;
    },
    // mocks
    spyOn,
    fn,
    waitFor,
    waitUntil,
    hoisted(factory) {
      assertTypes(factory, '"vi.hoisted" factory', ["function"]);
      return factory();
    },
    mock(path2, factory) {
      const importer = getImporter();
      _mocker.queueMock(
        path2,
        importer,
        factory ? () => factory(() => _mocker.importActual(path2, importer)) : void 0
      );
    },
    unmock(path2) {
      _mocker.queueUnmock(path2, getImporter());
    },
    doMock(path2, factory) {
      _mocker.queueMock(path2, getImporter(), factory);
    },
    doUnmock(path2) {
      _mocker.queueUnmock(path2, getImporter());
    },
    async importActual(path2) {
      return _mocker.importActual(path2, getImporter());
    },
    async importMock(path2) {
      return _mocker.importMock(path2, getImporter());
    },
    mocked(item, _options = {}) {
      return item;
    },
    isMockFunction(fn2) {
      return isMockFunction(fn2);
    },
    clearAllMocks() {
      spies.forEach((spy) => spy.mockClear());
      return utils;
    },
    resetAllMocks() {
      spies.forEach((spy) => spy.mockReset());
      return utils;
    },
    restoreAllMocks() {
      spies.forEach((spy) => spy.mockRestore());
      return utils;
    },
    stubGlobal(name, value) {
      if (!_stubsGlobal.has(name))
        _stubsGlobal.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
      Object.defineProperty(globalThis, name, {
        value,
        writable: true,
        configurable: true,
        enumerable: true
      });
      return utils;
    },
    stubEnv(name, value) {
      if (!_stubsEnv.has(name))
        _stubsEnv.set(name, process.env[name]);
      process.env[name] = value;
      return utils;
    },
    unstubAllGlobals() {
      _stubsGlobal.forEach((original, name) => {
        if (!original)
          Reflect.deleteProperty(globalThis, name);
        else
          Object.defineProperty(globalThis, name, original);
      });
      _stubsGlobal.clear();
      return utils;
    },
    unstubAllEnvs() {
      _stubsEnv.forEach((original, name) => {
        if (original === void 0)
          delete process.env[name];
        else
          process.env[name] = original;
      });
      _stubsEnv.clear();
      return utils;
    },
    resetModules() {
      const state = getWorkerState();
      resetModules(state.moduleCache);
      return utils;
    },
    async dynamicImportSettled() {
      return waitForImportsToResolve();
    },
    setConfig(config2) {
      const state = getWorkerState();
      if (!_config)
        _config = { ...state.config };
      Object.assign(state.config, config2);
    },
    resetConfig() {
      if (_config) {
        const state = getWorkerState();
        Object.assign(state.config, _config);
      }
    }
  };
  return utils;
}
var vitest = createVitest();
var vi = vitest;

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-run-once.3e5ef7d7.js
var filesCount = /* @__PURE__ */ new Map();
var cache = /* @__PURE__ */ new Map();
function runOnce(fn2, key) {
  const filepath = getWorkerState().filepath || "__unknown_files__";
  if (!key) {
    filesCount.set(filepath, (filesCount.get(filepath) || 0) + 1);
    key = String(filesCount.get(filepath));
  }
  const id = `${filepath}:${key}`;
  if (!cache.has(id))
    cache.set(id, fn2());
  return cache.get(id);
}
function isFirstRun() {
  let firstRun = false;
  runOnce(() => {
    firstRun = true;
  }, "__vitest_first_run__");
  return firstRun;
}

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/vendor-index.7646b3af.js
function getRunningMode() {
  return process.env.VITEST_MODE === "WATCH" ? "watch" : "run";
}
function isWatchMode() {
  return getRunningMode() === "watch";
}
var dist = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.expectTypeOf = void 0;
  const fn2 = () => true;
  const expectTypeOf2 = (_actual) => {
    const nonFunctionProperties = [
      "parameters",
      "returns",
      "resolves",
      "not",
      "items",
      "constructorParameters",
      "thisParameter",
      "instance",
      "guards",
      "asserts",
      "branded"
    ];
    const obj = {
      /* eslint-disable mmkal/@typescript-eslint/no-unsafe-assignment */
      toBeAny: fn2,
      toBeUnknown: fn2,
      toBeNever: fn2,
      toBeFunction: fn2,
      toBeObject: fn2,
      toBeArray: fn2,
      toBeString: fn2,
      toBeNumber: fn2,
      toBeBoolean: fn2,
      toBeVoid: fn2,
      toBeSymbol: fn2,
      toBeNull: fn2,
      toBeUndefined: fn2,
      toBeNullable: fn2,
      toMatchTypeOf: fn2,
      toEqualTypeOf: fn2,
      toBeCallableWith: fn2,
      toBeConstructibleWith: fn2,
      /* eslint-enable mmkal/@typescript-eslint/no-unsafe-assignment */
      extract: exports2.expectTypeOf,
      exclude: exports2.expectTypeOf,
      toHaveProperty: exports2.expectTypeOf,
      parameter: exports2.expectTypeOf
    };
    const getterProperties = nonFunctionProperties;
    getterProperties.forEach((prop) => Object.defineProperty(obj, prop, { get: () => (0, exports2.expectTypeOf)({}) }));
    return obj;
  };
  exports2.expectTypeOf = expectTypeOf2;
})(dist);
function noop2() {
}
var assertType = noop2;
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  afterAll,
  afterEach,
  assert,
  assertType,
  beforeAll,
  beforeEach,
  bench,
  chai: chai_exports,
  createExpect,
  describe,
  expect: globalExpect,
  expectTypeOf: dist.expectTypeOf,
  getRunningMode,
  isFirstRun,
  isWatchMode,
  it,
  onTestFailed,
  runOnce,
  should,
  suite,
  test,
  vi,
  vitest
});

// ../../node_modules/.pnpm/vitest@0.34.6_@vitest+ui@1.2.2/node_modules/vitest/dist/index.js
var expectTypeOf = dist.expectTypeOf;

// src/document.ts
var import_forms = require("@atj/forms");

// src/pdf/extract.ts
var pdfLib = __toESM(require("pdf-lib"), 1);

// src/util.ts
var stringToBase64 = (input) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf-8").toString("base64");
  } else {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(input);
    let binaryString = encoded.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return window.btoa(binaryString);
  }
};

// src/pdf/extract.ts
var getDocumentFieldData = async (pdfBytes) => {
  const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  return Object.fromEntries(
    fields.map((field) => {
      return [stringToBase64(field.getName()), getFieldValue(field)];
    })
  );
};
var getFieldValue = (field) => {
  if (field instanceof pdfLib.PDFTextField) {
    return {
      type: "TextField",
      name: field.getName(),
      label: field.getName(),
      value: field.getText() || "",
      maxLength: field.getMaxLength(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFCheckBox) {
    return {
      type: "CheckBox",
      name: field.getName(),
      label: field.getName(),
      value: field.isChecked(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFDropdown) {
    return {
      type: "Dropdown",
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFOptionList) {
    return {
      type: "OptionList",
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFRadioGroup) {
    return {
      type: "RadioGroup",
      name: field.getName(),
      options: field.getOptions(),
      label: field.getName(),
      value: field.getSelected() || "",
      // pdfLib allows this to be undefined
      required: field.isRequired()
    };
  } else {
    return {
      type: "not-supported",
      name: field.getName(),
      error: `unsupported type: ${field.constructor.name}`
    };
  }
};

// src/pdf/generate.ts
var import_pdf_lib = require("pdf-lib");
var fillPDF = async (pdfBytes, fieldData) => {
  const pdfDoc = await import_pdf_lib.PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  try {
    Object.entries(fieldData).forEach(([name, value]) => {
      setFormFieldData(form, value.type, name, value.value);
    });
  } catch (error) {
    return {
      success: false,
      error: error?.message || "error setting PDF field"
    };
  }
  return {
    success: true,
    data: await pdfDoc.save()
  };
};
var setFormFieldData = (form, fieldType, fieldName, fieldValue) => {
  if (fieldType === "TextField") {
    const field = form.getTextField(fieldName);
    field.setText(fieldValue);
  } else if (fieldType === "CheckBox") {
    const field = form.getCheckBox(fieldName);
    if (fieldValue) {
      field.check();
    } else {
      field.uncheck();
    }
  } else if (fieldType === "Dropdown") {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else if (fieldType === "OptionList") {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else if (fieldType === "RadioGroup") {
    const field = form.getRadioGroup(fieldName);
    field.select(fieldValue);
  } else if (fieldType === "Paragraph") {
  } else {
    const exhaustiveCheck = fieldType;
  }
};

// src/pdf/generate-dummy.ts
var import_pdf_lib2 = require("pdf-lib");

// src/pdf/mock-api.ts
var z = __toESM(require("zod"), 1);
var TxInput = z.object({
  input_type: z.literal("Tx"),
  input_params: z.object({
    text: z.string(),
    text_style: z.string(),
    output_id: z.string(),
    placeholder: z.string(),
    instructions: z.string(),
    required: z.boolean(),
    options: z.array(z.string())
  })
});
var BtnInput = z.object({
  input_type: z.literal("Btn"),
  input_params: z.object({
    text: z.string(),
    text_style: z.string(),
    output_id: z.string(),
    placeholder: z.string(),
    instructions: z.string(),
    required: z.boolean(),
    options: z.array(z.string())
  })
});
var ExtractedInput = z.discriminatedUnion("input_type", [TxInput, BtnInput]);
var ExtractedElement = z.object({
  id: z.string(),
  group_id: z.number(),
  element_type: z.string(),
  element_params: z.object({
    text: z.string(),
    text_style: z.string(),
    options: z.nullable(z.array(z.string()))
  }),
  inputs: ExtractedInput.array(),
  parent: z.string().nullable()
});
var RawTxField = z.object({
  type: z.literal("/Tx"),
  var_name: z.string(),
  field_dict: z.object({
    font_info: z.string(),
    field_type: z.string(),
    coordinates: z.number().array().optional(),
    field_label: z.string(),
    field_instructions: z.string()
  })
});
var RawBtnField = z.object({
  type: z.literal("/Btn"),
  var_name: z.string(),
  field_dict: z.object({
    font_info: z.string(),
    flags: z.number(),
    field_type: z.string(),
    field_label: z.string(),
    child_fields: z.array(z.object({ coordinates: z.number().array() })),
    num_children: z.number()
  })
});
var ExtractedObject = z.object({
  raw_text: z.string(),
  title: z.string(),
  description: z.string(),
  elements: ExtractedElement.array(),
  raw_fields: z.discriminatedUnion("type", [RawTxField, RawBtnField]).array()
});

// src/__tests__/sample-data.ts
var import_path = __toESM(require("path"), 1);
var import_fs = require("fs");
var samplesDirectory = import_path.default.resolve(__dirname, "../../samples");
var loadSamplePDF = async (fileName) => {
  const samplePdfPath = import_path.default.join(samplesDirectory, fileName);
  return await import_fs.promises.readFile(samplePdfPath);
};

// src/__tests__/fill-pdf.test.ts
describe("PDF form filler", () => {
  let pdfBytes;
  beforeAll(async () => {
    pdfBytes = await loadSamplePDF("dod_character.pdf");
  });
  it("generates pdf from valid form data", async () => {
    const pdfBytes2 = await loadSamplePDF("dod_character.pdf");
    const result = await fillPDF(pdfBytes2, {
      "CharacterName 2": { type: "TextField", value: "nameField" },
      "Feat+Traits": { type: "TextField", value: "traitsField" },
      Age: { type: "TextField", value: "ageField" },
      Allies: { type: "TextField", value: "alliesField" },
      Backstory: { type: "TextField", value: "backStoryField" },
      Eyes: { type: "TextField", value: "eyesField" },
      FactionName: { type: "TextField", value: "factionField" },
      Hair: { type: "TextField", value: "hairField" },
      Height: { type: "TextField", value: "heightField" },
      Skin: { type: "TextField", value: "skinField" },
      Treasure: { type: "TextField", value: "treasureField" },
      Weight: { type: "TextField", value: "weightField" }
    });
    globalExpect(result.success).toEqual(true);
    const fields = await getDocumentFieldData(result.data);
    globalExpect(fields).toEqual({
      Q2hhcmFjdGVyTmFtZSAy: {
        type: "TextField",
        name: "CharacterName 2",
        label: "CharacterName 2",
        value: "nameField",
        required: false
      },
      QWdl: {
        type: "TextField",
        name: "Age",
        label: "Age",
        value: "ageField",
        required: false
      },
      SGVpZ2h0: {
        type: "TextField",
        name: "Height",
        label: "Height",
        value: "heightField",
        required: false
      },
      V2VpZ2h0: {
        type: "TextField",
        name: "Weight",
        label: "Weight",
        value: "weightField",
        required: false
      },
      "RXllcw==": {
        type: "TextField",
        name: "Eyes",
        label: "Eyes",
        value: "eyesField",
        required: false
      },
      "U2tpbg==": {
        type: "TextField",
        name: "Skin",
        label: "Skin",
        value: "skinField",
        required: false
      },
      "SGFpcg==": {
        type: "TextField",
        name: "Hair",
        label: "Hair",
        value: "hairField",
        required: false
      },
      QWxsaWVz: {
        type: "TextField",
        name: "Allies",
        label: "Allies",
        value: "alliesField",
        required: false
      },
      "RmFjdGlvbk5hbWU=": {
        type: "TextField",
        name: "FactionName",
        label: "FactionName",
        value: "factionField",
        required: false
      },
      QmFja3N0b3J5: {
        type: "TextField",
        name: "Backstory",
        label: "Backstory",
        value: "backStoryField",
        required: false
      },
      "RmVhdCtUcmFpdHM=": {
        type: "TextField",
        name: "Feat+Traits",
        label: "Feat+Traits",
        value: "traitsField",
        required: false
      },
      "VHJlYXN1cmU=": {
        type: "TextField",
        name: "Treasure",
        label: "Treasure",
        value: "treasureField",
        required: false
      },
      Q0hBUkFDVEVSIElNQUdF: {
        type: "not-supported",
        name: "CHARACTER IMAGE",
        error: "unsupported type: PDFButton"
      },
      "RmFjdGlvbiBTeW1ib2wgSW1hZ2U=": {
        type: "TextField",
        name: "Faction Symbol Image",
        label: "Faction Symbol Image",
        value: "",
        required: false
      }
    });
  });
  it("returns an error when provided a non-existent field", async () => {
    const pdfBytes2 = await loadSamplePDF("dod_character.pdf");
    const result = await fillPDF(pdfBytes2, {
      fakeField: {
        type: "TextField",
        value: "fake data"
      }
    });
    globalExpect(result.success).toEqual(false);
    globalExpect(result.error).toEqual(
      'PDFDocument has no form field with the name "fakeField"'
    );
  });
});
/*! Bundled license information:

react-is/cjs/react-is.production.min.js:
  (**
   * @license React
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

assertion-error/index.js:
  (*!
   * assertion-error
   * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
   * MIT Licensed
   *)
  (*!
   * Return a function that will copy properties from
   * one object to another excluding any originally
   * listed. Returned function will create a new `{}`.
   *
   * @param {String} excluded properties ...
   * @return {Function}
   *)
  (*!
   * Primary Exports
   *)
  (*!
   * Inherit from Error.prototype
   *)
  (*!
   * Statically set name
   *)
  (*!
   * Ensure correct constructor
   *)

chai/lib/chai/utils/flag.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/test.js:
  (*!
   * Chai - test utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/expectTypes.js:
  (*!
   * Chai - expectTypes utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getActual.js:
  (*!
   * Chai - getActual utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/objDisplay.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getMessage.js:
  (*!
   * Chai - message composition utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/transferFlags.js:
  (*!
   * Chai - transferFlags utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

deep-eql/index.js:
  (*!
   * deep-eql
   * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Check to see if the MemoizeMap has recorded a result of the two operands
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @returns {Boolean|null} result
  *)
  (*!
   * Set the result of the equality into the MemoizeMap
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @param {Boolean} result
  *)
  (*!
   * Primary Export
   *)
  (*!
   * The main logic of the `deepEqual` function.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (optional) Additional options
   * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
   * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
      complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
      references to blow the stack.
   * @return {Boolean} equal match
  *)
  (*!
   * Compare two Regular Expressions for equality.
   *
   * @param {RegExp} leftHandOperand
   * @param {RegExp} rightHandOperand
   * @return {Boolean} result
   *)
  (*!
   * Compare two Sets/Maps for equality. Faster than other equality functions.
   *
   * @param {Set} leftHandOperand
   * @param {Set} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for generator objects such as those returned by generator functions.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Determine if the given object has an @@iterator function.
   *
   * @param {Object} target
   * @return {Boolean} `true` if the object has an @@iterator function.
   *)
  (*!
   * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
   * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
   *
   * @param {Object} target
   * @returns {Array} an array of entries from the @@iterator function
   *)
  (*!
   * Gets all entries from a Generator. This will consume the generator - which could have side effects.
   *
   * @param {Generator} target
   * @returns {Array} an array of entries from the Generator.
   *)
  (*!
   * Gets all own and inherited enumerable keys from a target.
   *
   * @param {Object} target
   * @returns {Array} an array of own and inherited enumerable keys from the target.
   *)
  (*!
   * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
   * each key. If any value of the given key is not equal, the function will return false (early).
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
   * for each enumerable key in the object.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Returns true if the argument is a primitive.
   *
   * This intentionally returns true for all objects that can be compared by reference,
   * including functions and symbols.
   *
   * @param {Mixed} value
   * @return {Boolean} result
   *)

chai/lib/chai/utils/isProxyEnabled.js:
  (*!
   * Chai - isProxyEnabled helper
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addProperty.js:
  (*!
   * Chai - addProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addLengthGuard.js:
  (*!
   * Chai - addLengthGuard utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getProperties.js:
  (*!
   * Chai - getProperties utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/proxify.js:
  (*!
   * Chai - proxify utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addMethod.js:
  (*!
   * Chai - addMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteProperty.js:
  (*!
   * Chai - overwriteProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteMethod.js:
  (*!
   * Chai - overwriteMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addChainableMethod.js:
  (*!
   * Chai - addChainingMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)
  (*!
   * Module variables
   *)

chai/lib/chai/utils/overwriteChainableMethod.js:
  (*!
   * Chai - overwriteChainableMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/compareByInspect.js:
  (*!
   * Chai - compareByInspect utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js:
  (*!
   * Chai - getOwnEnumerablePropertySymbols utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getOwnEnumerableProperties.js:
  (*!
   * Chai - getOwnEnumerableProperties utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/isNaN.js:
  (*!
   * Chai - isNaN utility
   * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/index.js:
  (*!
   * chai
   * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Dependencies that are used for multiple exports are required here only once
   *)
  (*!
   * test utility
   *)
  (*!
   * type utility
   *)
  (*!
   * expectTypes utility
   *)
  (*!
   * message utility
   *)
  (*!
   * actual utility
   *)
  (*!
   * Inspect util
   *)
  (*!
   * Object Display util
   *)
  (*!
   * Flag utility
   *)
  (*!
   * Flag transferring utility
   *)
  (*!
   * Deep equal utility
   *)
  (*!
   * Deep path info
   *)
  (*!
   * Check if a property exists
   *)
  (*!
   * Function name
   *)
  (*!
   * add Property
   *)
  (*!
   * add Method
   *)
  (*!
   * overwrite Property
   *)
  (*!
   * overwrite Method
   *)
  (*!
   * Add a chainable method
   *)
  (*!
   * Overwrite chainable method
   *)
  (*!
   * Compare by inspect method
   *)
  (*!
   * Get own enumerable property symbols method
   *)
  (*!
   * Get own enumerable properties method
   *)
  (*!
   * Checks error against a given set of criteria
   *)
  (*!
   * Proxify util
   *)
  (*!
   * addLengthGuard util
   *)
  (*!
   * isProxyEnabled helper
   *)
  (*!
   * isNaN method
   *)
  (*!
   * getOperator method
   *)

chai/lib/chai/assertion.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   *)
  (*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   *)

chai/lib/chai/core/assertions.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/expect.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/should.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/assert.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   *)
  (*!
   * Aliases.
   *)

chai/lib/chai.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai version
   *)
  (*!
   * Assertion Error
   *)
  (*!
   * Utils for plugins (not exported)
   *)
  (*!
   * Utility Functions
   *)
  (*!
   * Configuration
   *)
  (*!
   * Primary `Assertion` prototype
   *)
  (*!
   * Core Assertions
   *)
  (*!
   * Expect interface
   *)
  (*!
   * Should interface
   *)
  (*!
   * Assert interface
   *)

@vitest/snapshot/dist/index.js:
  (*
   * @version    1.4.0
   * @date       2015-10-26
   * @stability  3 - Stable
   * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
   * @license    MIT License
   *)
*/
