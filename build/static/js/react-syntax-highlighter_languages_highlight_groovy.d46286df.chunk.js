(self.webpackChunkfront=self.webpackChunkfront||[]).push([[8560],{8018:function(e){function n(e){return e?"string"===typeof e?e:e.source:null}function a(e){return function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];return a.map((function(e){return n(e)})).join("")}("(?=",e,")")}function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n.variants=e,n}e.exports=function(e){var n="[A-Za-z0-9_$]+",r=t([e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]})]),i={className:"regexp",begin:/~?\/[^\/\n]+\//,contains:[e.BACKSLASH_ESCAPE]},s=t([e.BINARY_NUMBER_MODE,e.C_NUMBER_MODE]),l=t([{begin:/"""/,end:/"""/},{begin:/'''/,end:/'''/},{begin:"\\$/",end:"/\\$",relevance:10},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE],{className:"string"});return{name:"Groovy",keywords:{built_in:"this super",literal:"true false null",keyword:"byte short char int long boolean float double void def as in assert trait abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"},contains:[e.SHEBANG({binary:"groovy",relevance:10}),r,l,i,s,{className:"class",beginKeywords:"class interface trait enum",end:/\{/,illegal:":",contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{className:"meta",begin:"@[A-Za-z]+",relevance:0},{className:"attr",begin:n+"[ \t]*:",relevance:0},{begin:/\?/,end:/:/,relevance:0,contains:[r,l,i,s,"self"]},{className:"symbol",begin:"^[ \t]*"+a(n+":"),excludeBegin:!0,end:n+":",relevance:0}],illegal:/#|<\//}}}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_groovy.d46286df.chunk.js.map