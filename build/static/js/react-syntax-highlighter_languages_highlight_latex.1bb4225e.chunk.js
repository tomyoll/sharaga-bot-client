(self.webpackChunkfront=self.webpackChunkfront||[]).push([[3896],{7228:function(e){e.exports=function(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a},e.exports.__esModule=!0,e.exports.default=e.exports},3646:function(e,n,t){var a=t(7228);e.exports=function(e){if(Array.isArray(e))return a(e)},e.exports.__esModule=!0,e.exports.default=e.exports},6860:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},319:function(e,n,t){var a=t(3646),r=t(6860),i=t(379),o=t(8206);e.exports=function(e){return a(e)||r(e)||i(e)||o()},e.exports.__esModule=!0,e.exports.default=e.exports},379:function(e,n,t){var a=t(7228);e.exports=function(e,n){if(e){if("string"===typeof e)return a(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(e,n):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},9941:function(e,n,t){var a=t(319).default;function r(e){return e?"string"===typeof e?e:e.source:null}function i(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var a="("+n.map((function(e){return r(e)})).join("|")+")";return a}e.exports=function(e){var n,t=[{begin:/\^{6}[0-9a-f]{6}/},{begin:/\^{5}[0-9a-f]{5}/},{begin:/\^{4}[0-9a-f]{4}/},{begin:/\^{3}[0-9a-f]{3}/},{begin:/\^{2}[0-9a-f]{2}/},{begin:/\^{2}[\u0000-\u007f]/}],r=[{className:"keyword",begin:/\\/,relevance:0,contains:[{endsParent:!0,begin:i.apply(void 0,a(["(?:NeedsTeXFormat|RequirePackage|GetIdInfo)","Provides(?:Expl)?(?:Package|Class|File)","(?:DeclareOption|ProcessOptions)","(?:documentclass|usepackage|input|include)","makeat(?:letter|other)","ExplSyntax(?:On|Off)","(?:new|renew|provide)?command","(?:re)newenvironment","(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand","(?:New|Renew|Provide|Declare)DocumentEnvironment","(?:(?:e|g|x)?def|let)","(?:begin|end)","(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)","caption","(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)","(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)","(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)","(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)","(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)","(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)"].map((function(e){return e+"(?![a-zA-Z@:_])"}))))},{endsParent:!0,begin:new RegExp(["(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*","[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}","[qs]__?[a-zA-Z](?:_?[a-zA-Z])+","use(?:_i)?:[a-zA-Z]*","(?:else|fi|or):","(?:if|cs|exp):w","(?:hbox|vbox):n","::[a-zA-Z]_unbraced","::[a-zA-Z:]"].map((function(e){return e+"(?![a-zA-Z:_])"})).join("|"))},{endsParent:!0,variants:t},{endsParent:!0,relevance:0,variants:[{begin:/[a-zA-Z@]+/},{begin:/[^a-zA-Z@]?/}]}]},{className:"params",relevance:0,begin:/#+\d?/},{variants:t},{className:"built_in",relevance:0,begin:/[$&^_]/},{className:"meta",begin:"% !TeX",end:"$",relevance:10},e.COMMENT("%","$",{relevance:0})],o={begin:/\{/,end:/\}/,relevance:0,contains:["self"].concat(r)},s=e.inherit(o,{relevance:0,endsParent:!0,contains:[o].concat(r)}),c={begin:/\[/,end:/\]/,endsParent:!0,relevance:0,contains:[o].concat(r)},l={begin:/\s+/,relevance:0},u=[s],p=[c],d=function(e,n){return{contains:[l],starts:{relevance:0,contains:e,starts:n}}},f=function(e,n){return{begin:"\\\\"+e+"(?![a-zA-Z@:_])",keywords:{$pattern:/\\[a-zA-Z]+/,keyword:"\\"+e},relevance:0,contains:[l],starts:n}},m=function(n,t){return e.inherit({begin:"\\\\begin(?=[ \t]*(\\r?\\n[ \t]*)?\\{"+n+"\\})",keywords:{$pattern:/\\[a-zA-Z]+/,keyword:"\\begin"},relevance:0},d(u,t))},g=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"string";return e.END_SAME_AS_BEGIN({className:n,begin:/(.|\r?\n)/,end:/(.|\r?\n)/,excludeBegin:!0,excludeEnd:!0,endsParent:!0})},b=function(e){return{className:"string",end:"(?=\\\\end\\{"+e+"\\})"}},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"string";return{relevance:0,begin:/\{/,starts:{endsParent:!0,contains:[{className:e,end:/(?=\})/,endsParent:!0,contains:[{begin:/\{/,end:/\}/,relevance:0,contains:["self"]}]}]}}},x=[].concat(a(["verb","lstinline"].map((function(e){return f(e,{contains:[g()]})}))),[f("mint",d(u,{contains:[g()]})),f("mintinline",d(u,{contains:[v(),g()]})),f("url",{contains:[v("link"),v("link")]}),f("hyperref",{contains:[v("link")]}),f("href",d(p,{contains:[v("link")]}))],a((n=[]).concat.apply(n,a(["","\\*"].map((function(e){return[m("verbatim"+e,b("verbatim"+e)),m("filecontents"+e,d(u,b("filecontents"+e)))].concat(a(["","B","L"].map((function(n){return m(n+"Verbatim"+e,d(p,b(n+"Verbatim"+e)))}))))}))))),[m("minted",d(p,d(u,b("minted"))))]);return{name:"LaTeX",aliases:["tex"],contains:[].concat(a(x),r)}}}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_latex.1bb4225e.chunk.js.map