import {
  chakra,
  compact,
  createContext,
  forwardRef,
  getToken,
  getValidChildren,
  require_jsx_runtime,
  useMultiStyleConfig,
  useStyleConfig,
  useTheme
} from "./chunk-R3KGRY4K.js";
import {
  cx,
  isObject,
  omitThemingProps
} from "./chunk-FFLO7VTN.js";
import {
  require_react
} from "./chunk-65KY755N.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/@chakra-ui/layout/dist/chunk-K7XRJ7NL.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var Link = forwardRef(function Link2(props, ref) {
  const styles = useStyleConfig("Link", props);
  const { className, isExternal, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime.jsx)(
    chakra.a,
    {
      target: isExternal ? "_blank" : void 0,
      rel: isExternal ? "noopener" : void 0,
      ref,
      className: cx("chakra-link", className),
      ...rest,
      __css: styles
    }
  );
});
Link.displayName = "Link";

// node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var fallbackIcon = {
  path: (0, import_jsx_runtime2.jsxs)("g", { stroke: "currentColor", strokeWidth: "1.5", children: [
    (0, import_jsx_runtime2.jsx)(
      "path",
      {
        strokeLinecap: "round",
        fill: "none",
        d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      }
    ),
    (0, import_jsx_runtime2.jsx)(
      "path",
      {
        fill: "currentColor",
        strokeLinecap: "round",
        d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      }
    ),
    (0, import_jsx_runtime2.jsx)("circle", { fill: "none", strokeMiterlimit: "10", cx: "12", cy: "12", r: "11.25" })
  ] }),
  viewBox: "0 0 24 24"
};
var Icon = forwardRef((props, ref) => {
  const {
    as: element,
    viewBox,
    color = "currentColor",
    focusable = false,
    children,
    className,
    __css,
    ...rest
  } = props;
  const _className = cx("chakra-icon", className);
  const customStyles = useStyleConfig("Icon", props);
  const styles = {
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color,
    ...__css,
    ...customStyles
  };
  const shared = {
    ref,
    focusable,
    className: _className,
    __css: styles
  };
  const _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  if (element && typeof element !== "string") {
    return (0, import_jsx_runtime2.jsx)(chakra.svg, { as: element, ...shared, ...rest });
  }
  const _path = children != null ? children : fallbackIcon.path;
  return (0, import_jsx_runtime2.jsx)(chakra.svg, { verticalAlign: "middle", viewBox: _viewBox, ...shared, ...rest, children: _path });
});
Icon.displayName = "Icon";

// node_modules/@chakra-ui/icon/dist/chunk-DEQZ7DVA.mjs
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function createIcon(options) {
  const {
    viewBox = "0 0 24 24",
    d: pathDefinition,
    displayName,
    defaultProps = {}
  } = options;
  const path = import_react.Children.toArray(options.path);
  const Comp = forwardRef((props, ref) => (0, import_jsx_runtime3.jsx)(Icon, { ref, viewBox, ...defaultProps, ...props, children: path.length ? path : (0, import_jsx_runtime3.jsx)("path", { fill: "currentColor", d: pathDefinition }) }));
  Comp.displayName = displayName;
  return Comp;
}

// node_modules/@chakra-ui/layout/dist/chunk-46CXQZ4E.mjs
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var [ListStylesProvider, useListStyles] = createContext({
  name: `ListStylesContext`,
  errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `
});
var List = forwardRef(function List2(props, ref) {
  const styles = useMultiStyleConfig("List", props);
  const {
    children,
    styleType = "none",
    stylePosition,
    spacing,
    ...rest
  } = omitThemingProps(props);
  const validChildren = getValidChildren(children);
  const selector = "& > *:not(style) ~ *:not(style)";
  const spacingStyle = spacing ? { [selector]: { mt: spacing } } : {};
  return (0, import_jsx_runtime4.jsx)(ListStylesProvider, { value: styles, children: (0, import_jsx_runtime4.jsx)(
    chakra.ul,
    {
      ref,
      listStyleType: styleType,
      listStylePosition: stylePosition,
      role: "list",
      __css: { ...styles.container, ...spacingStyle },
      ...rest,
      children: validChildren
    }
  ) });
});
List.displayName = "List";
var OrderedList = forwardRef((props, ref) => {
  const { as, ...rest } = props;
  return (0, import_jsx_runtime4.jsx)(List, { ref, as: "ol", styleType: "decimal", marginStart: "1em", ...rest });
});
OrderedList.displayName = "OrderedList";
var UnorderedList = forwardRef(function UnorderedList2(props, ref) {
  const { as, ...rest } = props;
  return (0, import_jsx_runtime4.jsx)(List, { ref, as: "ul", styleType: "initial", marginStart: "1em", ...rest });
});
UnorderedList.displayName = "UnorderedList";
var ListItem = forwardRef(function ListItem2(props, ref) {
  const styles = useListStyles();
  return (0, import_jsx_runtime4.jsx)(chakra.li, { ref, ...props, __css: styles.item });
});
ListItem.displayName = "ListItem";
var ListIcon = forwardRef(function ListIcon2(props, ref) {
  const styles = useListStyles();
  return (0, import_jsx_runtime4.jsx)(Icon, { ref, role: "presentation", ...props, __css: styles.icon });
});
ListIcon.displayName = "ListIcon";

// node_modules/@chakra-ui/layout/dist/chunk-JARCRF6W.mjs
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var Grid = forwardRef(function Grid2(props, ref) {
  const {
    templateAreas,
    gap,
    rowGap,
    columnGap,
    column,
    row,
    autoFlow,
    autoRows,
    templateRows,
    autoColumns,
    templateColumns,
    ...rest
  } = props;
  const styles = {
    display: "grid",
    gridTemplateAreas: templateAreas,
    gridGap: gap,
    gridRowGap: rowGap,
    gridColumnGap: columnGap,
    gridAutoColumns: autoColumns,
    gridColumn: column,
    gridRow: row,
    gridAutoFlow: autoFlow,
    gridAutoRows: autoRows,
    gridTemplateRows: templateRows,
    gridTemplateColumns: templateColumns
  };
  return (0, import_jsx_runtime5.jsx)(chakra.div, { ref, __css: styles, ...rest });
});
Grid.displayName = "Grid";

// node_modules/@chakra-ui/breakpoint-utils/dist/chunk-G72KV6MB.mjs
var breakpoints = Object.freeze([
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl"
]);
function mapResponsive(prop, mapper) {
  if (Array.isArray(prop)) {
    return prop.map((item) => item === null ? null : mapper(item));
  }
  if (isObject(prop)) {
    return Object.keys(prop).reduce((result, key) => {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }
  if (prop != null) {
    return mapper(prop);
  }
  return null;
}
function arrayToObjectNotation(values, bps = breakpoints) {
  const result = {};
  values.forEach((value, index) => {
    const key = bps[index];
    if (value == null)
      return;
    result[key] = value;
  });
  return result;
}

// node_modules/@chakra-ui/layout/dist/chunk-NEK3OOAM.mjs
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var SimpleGrid = forwardRef(
  function SimpleGrid2(props, ref) {
    const { columns, spacingX, spacingY, spacing, minChildWidth, ...rest } = props;
    const theme = useTheme();
    const templateColumns = minChildWidth ? widthToColumns(minChildWidth, theme) : countToColumns(columns);
    return (0, import_jsx_runtime6.jsx)(
      Grid,
      {
        ref,
        gap: spacing,
        columnGap: spacingX,
        rowGap: spacingY,
        templateColumns,
        ...rest
      }
    );
  }
);
SimpleGrid.displayName = "SimpleGrid";
function toPx(n) {
  return typeof n === "number" ? `${n}px` : n;
}
function widthToColumns(width, theme) {
  return mapResponsive(width, (value) => {
    const _value = getToken("sizes", value, toPx(value))(theme);
    return value === null ? null : `repeat(auto-fit, minmax(${_value}, 1fr))`;
  });
}
function countToColumns(count) {
  return mapResponsive(
    count,
    (value) => value === null ? null : `repeat(${value}, minmax(0, 1fr))`
  );
}

// node_modules/@chakra-ui/layout/dist/chunk-BL2ZZSHG.mjs
var Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch"
  }
});
Spacer.displayName = "Spacer";

// node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var Text = forwardRef(function Text2(props, ref) {
  const styles = useStyleConfig("Text", props);
  const { className, align, decoration, casing, ...rest } = omitThemingProps(props);
  const aliasedProps = compact({
    textAlign: props.align,
    textDecoration: props.decoration,
    textTransform: props.casing
  });
  return (0, import_jsx_runtime7.jsx)(
    chakra.p,
    {
      ref,
      className: cx("chakra-text", props.className),
      ...aliasedProps,
      ...rest,
      __css: styles
    }
  );
});
Text.displayName = "Text";

// node_modules/@chakra-ui/layout/dist/chunk-7ELO524Q.mjs
var import_react2 = __toESM(require_react(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var Wrap = forwardRef(function Wrap2(props, ref) {
  const {
    spacing = "0.5rem",
    spacingX,
    spacingY,
    children,
    justify,
    direction,
    align,
    className,
    shouldWrapChildren,
    ...rest
  } = props;
  const _children = (0, import_react2.useMemo)(
    () => shouldWrapChildren ? import_react2.Children.map(children, (child, index) => (0, import_jsx_runtime8.jsx)(WrapItem, { children: child }, index)) : children,
    [children, shouldWrapChildren]
  );
  return (0, import_jsx_runtime8.jsx)(chakra.div, { ref, className: cx("chakra-wrap", className), ...rest, children: (0, import_jsx_runtime8.jsx)(
    chakra.ul,
    {
      className: "chakra-wrap__list",
      __css: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction,
        listStyleType: "none",
        gap: spacing,
        columnGap: spacingX,
        rowGap: spacingY,
        padding: "0"
      },
      children: _children
    }
  ) });
});
Wrap.displayName = "Wrap";
var WrapItem = forwardRef(function WrapItem2(props, ref) {
  const { className, ...rest } = props;
  return (0, import_jsx_runtime8.jsx)(
    chakra.li,
    {
      ref,
      __css: { display: "flex", alignItems: "flex-start" },
      className: cx("chakra-wrap__listitem", className),
      ...rest
    }
  );
});
WrapItem.displayName = "WrapItem";

// node_modules/@chakra-ui/layout/dist/chunk-KTD65HY5.mjs
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var StackDivider = (props) => (0, import_jsx_runtime9.jsx)(
  chakra.div,
  {
    className: "chakra-stack__divider",
    ...props,
    __css: {
      ...props["__css"],
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto"
    }
  }
);
StackDivider.displayName = "StackDivider";

// node_modules/@chakra-ui/layout/dist/chunk-ZFQCCYWD.mjs
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var StackItem = (props) => (0, import_jsx_runtime10.jsx)(
  chakra.div,
  {
    className: "chakra-stack__item",
    ...props,
    __css: {
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...props["__css"]
    }
  }
);
StackItem.displayName = "StackItem";

// node_modules/@chakra-ui/layout/dist/chunk-5VJV6UNA.mjs
function getDividerStyles(options) {
  const { spacing, direction } = options;
  const dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(
      direction,
      (value) => dividerStyles[value]
    )
  };
}

// node_modules/@chakra-ui/layout/dist/chunk-ZHMYA64R.mjs
var import_react3 = __toESM(require_react(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var Stack = forwardRef((props, ref) => {
  const {
    isInline,
    direction: directionProp,
    align,
    justify,
    spacing = "0.5rem",
    wrap,
    children,
    divider,
    className,
    shouldWrapChildren,
    ...rest
  } = props;
  const direction = isInline ? "row" : directionProp != null ? directionProp : "column";
  const dividerStyle = (0, import_react3.useMemo)(
    () => getDividerStyles({ spacing, direction }),
    [spacing, direction]
  );
  const hasDivider = !!divider;
  const shouldUseChildren = !shouldWrapChildren && !hasDivider;
  const clones = (0, import_react3.useMemo)(() => {
    const validChildren = getValidChildren(children);
    return shouldUseChildren ? validChildren : validChildren.map((child, index) => {
      const key = typeof child.key !== "undefined" ? child.key : index;
      const isLast = index + 1 === validChildren.length;
      const wrappedChild = (0, import_jsx_runtime11.jsx)(StackItem, { children: child }, key);
      const _child = shouldWrapChildren ? wrappedChild : child;
      if (!hasDivider)
        return _child;
      const clonedDivider = (0, import_react3.cloneElement)(
        divider,
        {
          __css: dividerStyle
        }
      );
      const _divider = isLast ? null : clonedDivider;
      return (0, import_jsx_runtime11.jsxs)(import_react3.Fragment, { children: [
        _child,
        _divider
      ] }, key);
    });
  }, [
    divider,
    dividerStyle,
    hasDivider,
    shouldUseChildren,
    shouldWrapChildren,
    children
  ]);
  const _className = cx("chakra-stack", className);
  return (0, import_jsx_runtime11.jsx)(
    chakra.div,
    {
      ref,
      display: "flex",
      alignItems: align,
      justifyContent: justify,
      flexDirection: direction,
      flexWrap: wrap,
      gap: hasDivider ? void 0 : spacing,
      className: _className,
      ...rest,
      children: clones
    }
  );
});
Stack.displayName = "Stack";

// node_modules/@chakra-ui/layout/dist/chunk-NTCQBYKE.mjs
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var VStack = forwardRef((props, ref) => (0, import_jsx_runtime12.jsx)(Stack, { align: "center", ...props, direction: "column", ref }));
VStack.displayName = "VStack";

// node_modules/@chakra-ui/layout/dist/chunk-3ASUQ6PA.mjs
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var HStack = forwardRef((props, ref) => (0, import_jsx_runtime13.jsx)(Stack, { align: "center", ...props, direction: "row", ref }));
HStack.displayName = "HStack";

// node_modules/@chakra-ui/layout/dist/chunk-ZPFGWTBB.mjs
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
function spanFn(span) {
  return mapResponsive(
    span,
    (value) => value === "auto" ? "auto" : `span ${value}/span ${value}`
  );
}
var GridItem = forwardRef(function GridItem2(props, ref) {
  const {
    area,
    colSpan,
    colStart,
    colEnd,
    rowEnd,
    rowSpan,
    rowStart,
    ...rest
  } = props;
  const styles = compact({
    gridArea: area,
    gridColumn: spanFn(colSpan),
    gridRow: spanFn(rowSpan),
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd
  });
  return (0, import_jsx_runtime14.jsx)(chakra.div, { ref, __css: styles, ...rest });
});
GridItem.displayName = "GridItem";

// node_modules/@chakra-ui/layout/dist/chunk-7OLJDQMT.mjs
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var Heading = forwardRef(function Heading2(props, ref) {
  const styles = useStyleConfig("Heading", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime15.jsx)(
    chakra.h2,
    {
      ref,
      className: cx("chakra-heading", props.className),
      ...rest,
      __css: styles
    }
  );
});
Heading.displayName = "Heading";

// node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var Box = chakra("div");
Box.displayName = "Box";
var Square = forwardRef(function Square2(props, ref) {
  const { size, centerContent = true, ...rest } = props;
  const styles = centerContent ? { display: "flex", alignItems: "center", justifyContent: "center" } : {};
  return (0, import_jsx_runtime16.jsx)(
    Box,
    {
      ref,
      boxSize: size,
      __css: {
        ...styles,
        flexShrink: 0,
        flexGrow: 0
      },
      ...rest
    }
  );
});
Square.displayName = "Square";
var Circle = forwardRef(function Circle2(props, ref) {
  const { size, ...rest } = props;
  return (0, import_jsx_runtime16.jsx)(Square, { size, ref, borderRadius: "9999px", ...rest });
});
Circle.displayName = "Circle";

// node_modules/@chakra-ui/layout/dist/chunk-6WNMSZKB.mjs
var import_react4 = __toESM(require_react(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var escapeRegexp = (term) => term.replace(/[|\\{}()[\]^$+*?.-]/g, (char) => `\\${char}`);
function buildRegex(query) {
  const _query = query.filter((text) => text.length !== 0).map((text) => escapeRegexp(text.trim()));
  if (!_query.length) {
    return null;
  }
  return new RegExp(`(${_query.join("|")})`, "ig");
}
function highlightWords({ text, query }) {
  const regex = buildRegex(Array.isArray(query) ? query : [query]);
  if (!regex) {
    return [{ text, match: false }];
  }
  const result = text.split(regex).filter(Boolean);
  return result.map((str) => ({ text: str, match: regex.test(str) }));
}
function useHighlight(props) {
  const { text, query } = props;
  return (0, import_react4.useMemo)(() => highlightWords({ text, query }), [text, query]);
}
var Mark = forwardRef(function Mark2(props, ref) {
  const styles = useStyleConfig("Mark", props);
  const ownProps = omitThemingProps(props);
  return (0, import_jsx_runtime17.jsx)(
    Box,
    {
      ref,
      ...ownProps,
      as: "mark",
      __css: { bg: "transparent", whiteSpace: "nowrap", ...styles }
    }
  );
});
function Highlight(props) {
  const { children, query, styles } = props;
  if (typeof children !== "string") {
    throw new Error("The children prop of Highlight must be a string");
  }
  const chunks = useHighlight({ query, text: children });
  return (0, import_jsx_runtime17.jsx)(import_jsx_runtime17.Fragment, { children: chunks.map((chunk, index) => {
    return chunk.match ? (0, import_jsx_runtime17.jsx)(Mark, { sx: styles, children: chunk.text }, index) : (0, import_jsx_runtime17.jsx)(import_react4.Fragment, { children: chunk.text }, index);
  }) });
}

// node_modules/@chakra-ui/layout/dist/chunk-FDDFQHXZ.mjs
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var Indicator = forwardRef(function Indicator2(props, ref) {
  const {
    offsetX,
    offsetY,
    offset = "0",
    placement = "top-end",
    ...rest
  } = props;
  const styles = (0, import_react5.useMemo)(
    () => ({
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      insetBlockStart: mapResponsive(placement, (v) => {
        const [side] = v.split("-");
        const map = {
          top: offsetY != null ? offsetY : offset,
          middle: "50%",
          bottom: "auto"
        };
        return map[side];
      }),
      insetBlockEnd: mapResponsive(placement, (v) => {
        const [side] = v.split("-");
        const map = {
          top: "auto",
          middle: "50%",
          bottom: offsetY != null ? offsetY : offset
        };
        return map[side];
      }),
      insetStart: mapResponsive(placement, (v) => {
        const [, align] = v.split("-");
        const map = {
          start: offsetX != null ? offsetX : offset,
          center: "50%",
          end: "auto"
        };
        return map[align];
      }),
      insetEnd: mapResponsive(placement, (v) => {
        const [, align] = v.split("-");
        const map = {
          start: "auto",
          center: "50%",
          end: offsetX != null ? offsetX : offset
        };
        return map[align];
      }),
      translate: mapResponsive(placement, (v) => {
        const [side, align] = v.split("-");
        const mapX = { start: "-50%", center: "-50%", end: "50%" };
        const mapY = { top: "-50%", middle: "-50%", bottom: "50%" };
        return `${mapX[align]} ${mapY[side]}`;
      })
    }),
    [offset, offsetX, offsetY, placement]
  );
  return (0, import_jsx_runtime18.jsx)(chakra.div, { ref, __css: styles, ...rest });
});

// node_modules/@chakra-ui/layout/dist/chunk-EBIU6VW7.mjs
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var Kbd = forwardRef(function Kbd2(props, ref) {
  const styles = useStyleConfig("Kbd", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime19.jsx)(
    chakra.kbd,
    {
      ref,
      className: cx("chakra-kbd", className),
      ...rest,
      __css: {
        fontFamily: "mono",
        ...styles
      }
    }
  );
});
Kbd.displayName = "Kbd";

// node_modules/@chakra-ui/layout/dist/chunk-NRJBSIIZ.mjs
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var LinkOverlay = forwardRef(
  function LinkOverlay2(props, ref) {
    const { isExternal, target, rel, className, ...rest } = props;
    return (0, import_jsx_runtime20.jsx)(
      chakra.a,
      {
        ...rest,
        ref,
        className: cx("chakra-linkbox__overlay", className),
        rel: isExternal ? "noopener noreferrer" : rel,
        target: isExternal ? "_blank" : target,
        __css: {
          position: "static",
          "&::before": {
            content: "''",
            cursor: "inherit",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%"
          }
        }
      }
    );
  }
);
var LinkBox = forwardRef(function LinkBox2(props, ref) {
  const { className, ...rest } = props;
  return (0, import_jsx_runtime20.jsx)(
    chakra.div,
    {
      ref,
      position: "relative",
      ...rest,
      className: cx("chakra-linkbox", className),
      __css: {
        /* Elevate the links and abbreviations up */
        "a[href]:not(.chakra-linkbox__overlay), abbr[title]": {
          position: "relative",
          zIndex: 1
        }
      }
    }
  );
});

// node_modules/@chakra-ui/layout/dist/chunk-ZVFRDZZY.mjs
var import_react6 = __toESM(require_react(), 1);
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
var AspectRatio = forwardRef(function(props, ref) {
  const { ratio = 4 / 3, children, className, ...rest } = props;
  const child = import_react6.Children.only(children);
  const _className = cx("chakra-aspect-ratio", className);
  return (0, import_jsx_runtime21.jsx)(
    chakra.div,
    {
      ref,
      position: "relative",
      className: _className,
      _before: {
        height: 0,
        content: `""`,
        display: "block",
        paddingBottom: mapResponsive(ratio, (r) => `${1 / r * 100}%`)
      },
      __css: {
        "& > *:not(style)": {
          overflow: "hidden",
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%"
        },
        "& > img, & > video": {
          objectFit: "cover"
        }
      },
      ...rest,
      children: child
    }
  );
});
AspectRatio.displayName = "AspectRatio";

// node_modules/@chakra-ui/layout/dist/chunk-Z6RXEUPO.mjs
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
var Badge = forwardRef(function Badge2(props, ref) {
  const styles = useStyleConfig("Badge", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime22.jsx)(
    chakra.span,
    {
      ref,
      className: cx("chakra-badge", props.className),
      ...rest,
      __css: {
        display: "inline-block",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...styles
      }
    }
  );
});
Badge.displayName = "Badge";

// node_modules/@chakra-ui/layout/dist/chunk-FAWTVNS3.mjs
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
var Center = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
Center.displayName = "Center";
var centerStyles = {
  horizontal: {
    insetStart: "50%",
    transform: "translateX(-50%)"
  },
  vertical: {
    top: "50%",
    transform: "translateY(-50%)"
  },
  both: {
    insetStart: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }
};
var AbsoluteCenter = forwardRef(
  function AbsoluteCenter2(props, ref) {
    const { axis = "both", ...rest } = props;
    return (0, import_jsx_runtime23.jsx)(
      chakra.div,
      {
        ref,
        __css: centerStyles[axis],
        ...rest,
        position: "absolute"
      }
    );
  }
);

// node_modules/@chakra-ui/layout/dist/chunk-LZZHVJFG.mjs
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
var Code = forwardRef(function Code2(props, ref) {
  const styles = useStyleConfig("Code", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime24.jsx)(
    chakra.code,
    {
      ref,
      className: cx("chakra-code", props.className),
      ...rest,
      __css: {
        display: "inline-block",
        ...styles
      }
    }
  );
});
Code.displayName = "Code";

// node_modules/@chakra-ui/layout/dist/chunk-5MKCW436.mjs
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
var Container = forwardRef(function Container2(props, ref) {
  const { className, centerContent, ...rest } = omitThemingProps(props);
  const styles = useStyleConfig("Container", props);
  return (0, import_jsx_runtime25.jsx)(
    chakra.div,
    {
      ref,
      className: cx("chakra-container", className),
      ...rest,
      __css: {
        ...styles,
        ...centerContent && {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }
      }
    }
  );
});
Container.displayName = "Container";

// node_modules/@chakra-ui/layout/dist/chunk-W7WUSNWJ.mjs
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var Divider = forwardRef(function Divider2(props, ref) {
  const {
    borderLeftWidth,
    borderBottomWidth,
    borderTopWidth,
    borderRightWidth,
    borderWidth,
    borderStyle,
    borderColor,
    ...styles
  } = useStyleConfig("Divider", props);
  const {
    className,
    orientation = "horizontal",
    __css,
    ...rest
  } = omitThemingProps(props);
  const dividerStyles = {
    vertical: {
      borderLeftWidth: borderLeftWidth || borderRightWidth || borderWidth || "1px",
      height: "100%"
    },
    horizontal: {
      borderBottomWidth: borderBottomWidth || borderTopWidth || borderWidth || "1px",
      width: "100%"
    }
  };
  return (0, import_jsx_runtime26.jsx)(
    chakra.hr,
    {
      ref,
      "aria-orientation": orientation,
      ...rest,
      __css: {
        ...styles,
        border: "0",
        borderColor,
        borderStyle,
        ...dividerStyles[orientation],
        ...__css
      },
      className: cx("chakra-divider", className)
    }
  );
});
Divider.displayName = "Divider";

// node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
var Flex = forwardRef(function Flex2(props, ref) {
  const { direction, align, justify, wrap, basis, grow, shrink, ...rest } = props;
  const styles = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink
  };
  return (0, import_jsx_runtime27.jsx)(chakra.div, { ref, __css: styles, ...rest });
});
Flex.displayName = "Flex";

export {
  Icon,
  createIcon,
  Link,
  useListStyles,
  List,
  OrderedList,
  UnorderedList,
  ListItem,
  ListIcon,
  Grid,
  breakpoints,
  arrayToObjectNotation,
  SimpleGrid,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  StackDivider,
  StackItem,
  Stack,
  VStack,
  HStack,
  GridItem,
  Heading,
  Box,
  Square,
  Circle,
  useHighlight,
  Mark,
  Highlight,
  Indicator,
  Kbd,
  LinkOverlay,
  LinkBox,
  AspectRatio,
  Badge,
  Center,
  AbsoluteCenter,
  Code,
  Container,
  Divider,
  Flex
};
//# sourceMappingURL=chunk-45YLI4I5.js.map
