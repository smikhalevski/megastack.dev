import{b as s}from"./4TdYTt4D.js";import{e as a,f as p}from"./Dk7uXzeL.js";import{R as n,c as e}from"./WmKd-vJb.js";import{l}from"./C1j50iH-.js";import"./sYIKGKEd.js";const c={version:"5.2.0",tocContent:'<ul><li><a href="https://github.com/smikhalevski/doubter#readme">GitHub <sup>↗</sup></a></li><li><a href="https://smikhalevski.github.io/doubter/">API docs <sup>↗</sup></a></li><li><a href="https://codesandbox.io/s/y5kec4">Live example <sup>↗</sup></a></li></ul><p><span class="toc-icon">🔰 </span><strong>Features</strong></p><ul><li><a href="#introduction">Introduction</a></li><li><a href="#validation-errors">Validation errors</a></li><li><a href="#operations">Operations</a></li><li><a href="#conversions">Conversions</a></li><li><a href="#early-return">Early return</a></li><li><a href="#annotations-and-metadata">Annotations and metadata</a></li><li><a href="#parsing-context">Parsing context</a></li><li><a href="#shape-piping">Shape piping</a></li><li><a href="#replace-allow-and-deny-a-value">Replace, allow, and deny a value</a></li><li><a href="#optional-and-non-optional">Optional and non-optional</a></li><li><a href="#nullable-and-nullish">Nullable and nullish</a></li><li><a href="#exclude-a-shape">Exclude a shape</a></li><li><a href="#deep-partial">Deep partial</a></li><li><a href="#fallback-value">Fallback value</a></li><li><a href="#branded-types">Branded types</a></li><li><a href="#type-coercion">Type coercion</a></li><li><a href="#introspection">Introspection</a></li><li><a href="#localization">Localization</a></li><li><a href="#plugins">Plugins</a></li><li><a href="#advanced-shapes">Advanced shapes</a></li></ul><p><span class="toc-icon">⏱ </span><a href="#performance"><strong>Performance</strong></a></p><p><span class="toc-icon">🍿 </span><a href="#comparison-with-peers"><strong>Comparison with peers</strong></a></p><p><span class="toc-icon">🧩 </span><strong>Data types</strong></p><ul><li><p>Strings<br><a href="#string"><code>string</code></a></p></li><li><p>Numbers<br><a href="#number"><code>number</code></a> <a href="#bigint"><code>bigint</code></a> <a href="#nan"><code>nan</code></a></p></li><li><p>Booleans<br><a href="#boolean-bool"><code>boolean</code></a> <a href="#boolean-bool"><code>bool</code></a></p></li><li><p>Symbols<br><a href="#symbol"><code>symbol</code></a></p></li><li><p>Literals<br><a href="#enum"><code>enum</code></a> <a href="#const"><code>const</code></a> <a href="#null"><code>null</code></a> <a href="#undefined"><code>undefined</code></a> <a href="#void"><code>void</code></a></p></li><li><p>Objects<br><a href="#object"><code>object</code></a> <a href="#record"><code>record</code></a> <a href="#instanceof"><code>instanceOf</code></a></p></li><li><p>Collections<br><a href="#array"><code>array</code></a> <a href="#tuple"><code>tuple</code></a> <a href="#set"><code>set</code></a> <a href="#map"><code>map</code></a></p></li><li><p>Dates<br><a href="#date"><code>date</code></a></p></li><li><p>Promises<br><a href="#promise"><code>promise</code></a></p></li><li><p>Functions<br><a href="#function-fn"><code>function</code></a> <a href="#function-fn"><code>fn</code></a></p></li><li><p>Composition<br><a href="#union-or"><code>union</code></a> <a href="#union-or"><code>or</code></a> <a href="#intersection-and"><code>intersection</code></a> <a href="#intersection-and"><code>and</code></a> <a href="#not"><code>not</code></a></p></li><li><p>Unconstrained<br><a href="#any"><code>any</code></a> <a href="#unknown"><code>unknown</code></a></p></li><li><p>Other<br><a href="#convert-convertasync"><code>convert</code></a> <a href="#lazy"><code>lazy</code></a> <a href="#never"><code>never</code></a></p></li></ul><p><span class="toc-icon">🍪 </span><strong>Cookbook</strong></p><ul><li><a href="#type-safe-url-query-params">Type-safe URL query params</a></li><li><a href="#type-safe-environment-variables">Type-safe environment variables</a></li><li><a href="#type-safe-cli-arguments">Type-safe CLI arguments</a></li><li><a href="#type-safe-localstorage">Type-safe <code>localStorage</code></a></li><li><a href="#rename-object-keys">Rename object keys</a></li><li><a href="#conditionally-applied-shapes">Conditionally applied shapes</a></li></ul>',articleContent:`<!--OVERVIEW--><p>Runtime validation and transformation library.</p><ul><li>TypeScript first.</li><li>Sync and async validation and transformation flows.</li><li><a href="#circular-object-references">Circular object references support.</a></li><li>Collect all validation issues, or <a href="#early-return">exit early</a>.</li><li><a href="#introspection">Runtime type introspection.</a></li><li><a href="#type-coercion">Human-oriented type coercion.</a></li><li><a href="#performance">High performance and low memory consumption.</a></li><li>Zero dependencies.</li><li><a href="#plugins">Pluggable architecture.</a></li><li>Compatible with <a href="https://github.com/standard-schema/standard-schema#readme">Standard Schema <sup>↗</sup></a>.</li><li>Tree-shakable. <a href="https://bundlephobia.com/result?p=doubter">3 — 12 kB gzipped <sup>↗</sup></a> depending on <a href="#plugins">what features you use</a>.</li><li>Check out the <a href="#cookbook">Cookbook</a> for real-life examples!</li></ul><!--/OVERVIEW--><br><pre><code class="language-shell">npm install --save-prod doubter
</code></pre><br><h1 id="introduction"><a class="markdown-permalink" href="#introduction"><span class="icon icon-link"></span></a>Introduction</h1><p>Let's create a simple shape of a user:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">userShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string, age: number }></span>
</code></pre><p>This is the shape of an object with two required properties "name" and "age". Shapes are the core concept in Doubter, they are validation and transformation pipelines that have an input and an output.</p><p>Apply the shape to an input value with the <a href="#parsing-and-trying"><code>parse</code></a> method:</p><pre><code class="language-ts"><span class="pl-smi">userShape</span>.<span class="pl-c1">parse</span>({
  name: <span class="pl-s"><span class="pl-pds">'</span>John Belushi<span class="pl-pds">'</span></span>,
  age: <span class="pl-c1">30</span>,
});
<span class="pl-c">// ⮕ { name: 'John Belushi', age: 30 }</span>
</code></pre><p>If the provided value is valid, then it is returned as is. If an incorrect value is provided, then a validation error is thrown:</p><pre><code class="language-ts"><span class="pl-smi">userShape</span>.<span class="pl-c1">parse</span>({
  name: <span class="pl-s"><span class="pl-pds">'</span>Peter Parker<span class="pl-pds">'</span></span>,
  age: <span class="pl-s"><span class="pl-pds">'</span>seventeen<span class="pl-pds">'</span></span>,
});
<span class="pl-c">// ❌ ValidationError: type.number at /age: Must be a number</span>
</code></pre><p>Currently, the only constraint applied to the "age" property value is that it must be a number. Let's modify the shape to check that age is an integer and that user is an adult:</p><pre><code class="language-diff">  const userShape = d.object({
    name: d.string(),
<span class="pl-md">-   age: d.number()</span>
<span class="pl-mi1">+   age: d.number().int().between(18, 100)</span>
  });
</code></pre><p>Here we added two operations to the number shape. Operations can check, refine, and alter input values. There are lots of operations <a href="#built-in-plugins">available through plugins</a>, and you can easily add your own <a href="#operations">operation</a> when you need a custom logic.</p><p>Now shape would not only check that the "age" is a number, but also assert that it is an integer between 18 and 100:</p><pre><code class="language-ts"><span class="pl-smi">userShape</span>.<span class="pl-c1">parse</span>({
  name: <span class="pl-s"><span class="pl-pds">'</span>Peter Parker<span class="pl-pds">'</span></span>,
  age: <span class="pl-c1">16</span>,
});
<span class="pl-c">// ❌ ValidationError: number.gte at /age: Must be greater than or equal to 18</span>
</code></pre><p>If you are using TypeScript, you can infer the type of the value that the shape describes:</p><pre><code class="language-ts"><span class="pl-k">type</span> <span class="pl-en">User</span> <span class="pl-k">=</span> <span class="pl-en">d</span>.<span class="pl-en">Input</span>&#x3C;<span class="pl-k">typeof</span> <span class="pl-smi">userShape</span>>;

<span class="pl-k">const</span> <span class="pl-c1">user</span><span class="pl-k">:</span> <span class="pl-en">User</span> <span class="pl-k">=</span> {
  name: <span class="pl-s"><span class="pl-pds">'</span>Dan Aykroyd<span class="pl-pds">'</span></span>,
  age: <span class="pl-c1">27</span>,
};
</code></pre><p>Read more about <a href="#static-type-inference">static type inference</a> and <a href="#introduction">runtime type introspection</a>.</p><h2 id="async-shapes"><a class="markdown-permalink" href="#async-shapes"><span class="icon icon-link"></span></a>Async shapes</h2><p>Most of the shapes are synchronous, but they may become asynchronous when one of the below is used:</p><ul><li><a href="#async-operations">Async operations</a>;</li><li><a href="#async-conversions">Async conversions</a>;</li><li><a href="#promise"><code>d.promise</code></a> that constrains the fulfilled value;</li><li><a href="#advanced-shapes">Custom async shapes</a>.</li></ul><p>Let's have a look at a shape that synchronously checks that an input value is a string:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">shape1</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ false</span>
</code></pre><p>If we add an async operation to the string shape, it would become asynchronous:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">checkAsync</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-en">doAsyncCheck</span>(<span class="pl-smi">value</span>));
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">shape2</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ true</span>
</code></pre><p>The shape that checks that the input value is a <code>Promise</code> instance is synchronous, because it doesn't have to wait for the input promise to be fulfilled before ensuring that input has a proper type:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">promise</span>();
<span class="pl-c">// ⮕ Shape&#x3C;Promise&#x3C;any>></span>

<span class="pl-smi">shape3</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ false</span>
</code></pre><p>But if you want to check that a promise is fulfilled with a number, here when the shape becomes asynchronous:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape4</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">promise</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Promise&#x3C;number>></span>

<span class="pl-smi">shape4</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ true</span>
</code></pre><p>Asynchronous shapes don't support synchronous parsing, and would throw an error if it is used:</p><pre><code class="language-ts"><span class="pl-smi">shape4</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">Promise</span>.<span class="pl-c1">resolve</span>(<span class="pl-c1">42</span>));
<span class="pl-c">// ❌ Error: Shape is async</span>

<span class="pl-smi">shape4</span>.<span class="pl-en">parseAsync</span>(<span class="pl-c1">Promise</span>.<span class="pl-c1">resolve</span>(<span class="pl-c1">42</span>));
<span class="pl-c">// ⮕ Promise { 42 }</span>
</code></pre><p>On the other hand, synchronous shapes support asynchronous parsing:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">parseAsync</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Promise { 'Mars' }</span>
</code></pre><p>The shape that depends on an asynchronous shape, also becomes asynchronous:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  avatar: <span class="pl-smi">d</span>.<span class="pl-en">promise</span>(<span class="pl-smi">d</span>.<span class="pl-en">instanceOf</span>(<span class="pl-c1">Blob</span>)),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ avatar: Promise&#x3C;Blob> }></span>

<span class="pl-smi">userShape</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ true</span>
</code></pre><h2 id="parsing-and-trying"><a class="markdown-permalink" href="#parsing-and-trying"><span class="icon icon-link"></span></a>Parsing and trying</h2><p>All shapes can parse input values and there are several methods for that purpose. Consider a number shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>();
<span class="pl-c">// ⮕ Shape&#x3C;number></span>
</code></pre><p>The <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#parse"><code>parse</code> <sup>↗</sup></a> method takes an input value and returns an output value, or throws a <a href="#validation-errors">validation error</a> if parsing fails:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.number at /: Must be a number</span>
</code></pre><p>It isn't always convenient to write a try-catch blocks to handle validation errors. Use the <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#try"><code>try</code> <sup>↗</sup></a> method in such cases:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-en">try</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ { ok: true, value: 42 }</span>

<span class="pl-smi">shape</span>.<span class="pl-en">try</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ { ok: false, issues: [ … ] }</span>
</code></pre><p>Read more about issues in <a href="#validation-errors">Validation errors</a> section.</p><p>Sometimes you don't care about validation errors, and want a default value to be returned if things go south. Use the <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#parseordefault"><code>parseOrDefault</code> <sup>↗</sup></a> method for that:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-en">parseOrDefault</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape</span>.<span class="pl-en">parseOrDefault</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ undefined</span>

<span class="pl-smi">shape</span>.<span class="pl-en">parseOrDefault</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>, <span class="pl-c1">5.3361</span>);
<span class="pl-c">// ⮕ 5.3361</span>
</code></pre><p>If you need a fallback value for a nested shape consider using the <a href="#fallback-value"><code>catch</code></a> method.</p><p>For <a href="#async-shapes">asynchronous shapes</a> there's an alternative for each of those methods: <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#parseasync"><code>parseAsync</code> <sup>↗</sup></a>, <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#tryasync"><code>tryAsync</code> <sup>↗</sup></a>, and <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#parseordefaultasync"><code>parseOrDefaultAsync</code> <sup>↗</sup></a>.</p><p>Methods listed in this section can be safely detached from the shape instance:</p><pre><code class="language-ts"><span class="pl-k">const</span> { <span class="pl-c1">parseOrDefault</span> } <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>();

<span class="pl-en">parseOrDefault</span>(<span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Jill'</span>

<span class="pl-en">parseOrDefault</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ undefined</span>
</code></pre><p>All parsing methods accept options argument.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>42<span class="pl-pds">'</span></span>, { isEarlyReturn: <span class="pl-c1">true</span> });
<span class="pl-c">// ⮕ 42</span>
</code></pre><p>Following options are available:</p><dl><dt><code>isEarlyReturn</code></dt><dd><p>If <code>true</code> then parsing is aborted after the first issue is encountered. Refer to <a href="#early-return">Early return</a> section for more details.</p></dd><dt><code>context</code></dt><dd><p>The custom context that can be accessed from custom check callbacks, refinement predicates, alteration callbacks, converters, and fallback functions. Refer to <a href="#parsing-context">Parsing context</a> section for more details.</p></dd><dt><code>messages</code></dt><dd><p>An object that maps an issue code to a default message. Refer to <a href="#override-default-messages">Override default messages</a> section for more details.</p></dd></dl><h2 id="static-type-inference"><a class="markdown-permalink" href="#static-type-inference"><span class="icon icon-link"></span></a>Static type inference</h2><div class="markdown-alert markdown-alert-important"><p class="markdown-alert-title"><svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>Important</p><p>Static type inference feature requires TypeScript 4.1 + with enabled <a href="https://www.typescriptlang.org/tsconfig#strictNullChecks"><code>strictNullChecks</code> <sup>↗</sup></a>.</p></div><p>Since shapes can transform values, they can have different input and output types. For example, this string shape has the same input an output:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Pluto'</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ❌ ValidationError: type.string at /: Must be a string</span>
</code></pre><p>Let's derive a new shape that would <a href="#optional-and-non-optional">replace <code>undefined</code></a> input values with a default value "Mars":</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">shape1</span>.<span class="pl-en">optional</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;string | undefined, string></span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Pluto'</span>

<span class="pl-c">// 🟡 Replaces undefined with the default value</span>
<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ⮕ 'Mars'</span>
</code></pre><p>Infer the input and output types of <code>shape2</code>:</p><pre><code class="language-ts"><span class="pl-k">type</span> <span class="pl-en">Shape2Input</span> <span class="pl-k">=</span> <span class="pl-en">d</span>.<span class="pl-en">Input</span>&#x3C;<span class="pl-k">typeof</span> <span class="pl-smi">shape2</span>>;
<span class="pl-c">// ⮕ string | undefined</span>

<span class="pl-k">type</span> <span class="pl-en">Shape2Output</span> <span class="pl-k">=</span> <span class="pl-en">d</span>.<span class="pl-en">Output</span>&#x3C;<span class="pl-k">typeof</span> <span class="pl-smi">shape2</span>>;
<span class="pl-c">// ⮕ string</span>
</code></pre><p>Besides static type inference, you can check at runtime what input types and literal values does the shape accept using <a href="#introspection">shape introspection</a>:</p><pre><code class="language-ts"><span class="pl-smi">shape2</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ [Type.STRING, undefined]</span>

<span class="pl-smi">shape2</span>.<span class="pl-en">accepts</span>(<span class="pl-smi">d</span>.<span class="pl-smi">Type</span>.<span class="pl-c1">STRING</span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape2</span>.<span class="pl-en">accepts</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape2</span>.<span class="pl-en">accepts</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ false</span>
</code></pre><h1 id="validation-errors"><a class="markdown-permalink" href="#validation-errors"><span class="icon icon-link"></span></a>Validation errors</h1><p>Validation errors which are thrown by <a href="#parsing-and-trying">parsing methods</a>, and <a href="https://smikhalevski.github.io/doubter/interfaces/core.Err.html"><code>Err</code> <sup>↗</sup></a> objects returned by <code>try</code> and <code>tryAsync</code> methods have the <code>issues</code> property which holds an array of validation issues:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({ age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>() });
<span class="pl-c">// ⮕ Shape&#x3C;{ age: number }></span>

<span class="pl-k">const</span> <span class="pl-c1">result</span> <span class="pl-k">=</span> <span class="pl-smi">shape</span>.<span class="pl-en">try</span>({ age: <span class="pl-s"><span class="pl-pds">'</span>seventeen<span class="pl-pds">'</span></span> });
</code></pre><p>The <code>result</code> contains the <a href="https://smikhalevski.github.io/doubter/interfaces/core.Err.html"><code>Err</code> <sup>↗</sup></a> object with the array of issues:</p><pre><code class="language-json5">{
  ok<span class="pl-k">:</span> <span class="pl-c1">false</span>,
  issues<span class="pl-k">:</span> [
    {
      code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>type.number<span class="pl-pds">'</span></span>,
      path<span class="pl-k">:</span> [<span class="pl-s"><span class="pl-pds">'</span>age<span class="pl-pds">'</span></span>],
      input<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>seventeen<span class="pl-pds">'</span></span>,
      message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must be a number<span class="pl-pds">'</span></span>,
      param<span class="pl-k">:</span> <span class="pl-c1">undefined</span>,
      meta<span class="pl-k">:</span> <span class="pl-c1">undefined</span>,
    },
  ],
}
</code></pre><dl><dt><code>code</code></dt><dd><p>The code of the validation issue. In the example above, <code>"type"</code> code refers to a failed number type check. While shapes check input value type and raise type issues, there also <a href="#built-in-plugins">various operations</a> that also may raise issues with unique codes, see the table below.</p><p>You can add <a href="#operations">a custom operation</a> to any shape and return an issue with your custom code.</p></dd><dt><code>path</code></dt><dd><p>The object path as an array of keys, or <code>undefined</code> if there's no path. Keys can be strings, numbers (for example, array indices), symbols, and any other values since they can be <code>Map</code> keys, see <a href="#map"><code>d.map</code></a>.</p></dd><dt><code>input</code></dt><dd><p>The input value that caused a validation issue. Note that if the shape applies <a href="#type-coercion">type coercion</a>, <a href="#conversions">conversions</a>, or if there are operations that transform the value, then <code>input</code> may contain an already transformed value.</p></dd><dt><code>message</code></dt><dd><p>The human-readable issue message. Refer to <a href="#localization">Localization</a> section for more details.</p></dd><dt><code>param</code></dt><dd><p>The parameter value associated with the issue. For built-in checks, the parameter value depends on <code>code</code>, see the table below.</p></dd><dt><code>meta</code></dt><dd><p>The optional metadata associated with the issue. Refer to <a href="#annotations-and-metadata">Annotations and metadata</a> section for more details.</p></dd></dl><br><table><thead><tr><th align="left">Code</th><th align="left">Caused by</th><th align="left">Param</th></tr></thead><tbody><tr><td align="left"><code>any.deny</code></td><td align="left"><a href="#deny-a-value"><code>shape.deny(x)</code></a></td><td align="left">The denied value <code>x</code></td></tr><tr><td align="left"><code>any.exclude</code></td><td align="left"><a href="#exclude-a-shape"><code>shape.exclude(…)</code></a></td><td align="left">The excluded shape</td></tr><tr><td align="left"><code>any.refine</code></td><td align="left"><a href="#refinements"><code>shape.refine(…)</code></a></td><td align="left">The predicate callback</td></tr><tr><td align="left"><code>array.includes</code></td><td align="left"><a href="#array"><code>d.array().includes(x)</code></a></td><td align="left">The included value <code>x</code></td></tr><tr><td align="left"><code>array.min</code></td><td align="left"><a href="#array"><code>d.array().min(n)</code></a></td><td align="left">The minimum array length <code>n</code></td></tr><tr><td align="left"><code>array.max</code></td><td align="left"><a href="#array"><code>d.array().max(n)</code></a></td><td align="left">The maximum array length <code>n</code></td></tr><tr><td align="left"><code>bigint.min</code></td><td align="left"><a href="#bigint"><code>d.bigint().min(n)</code></a></td><td align="left">The minimum value <code>n</code></td></tr><tr><td align="left"><code>bigint.max</code></td><td align="left"><a href="#bigint"><code>d.bigint().max(n)</code></a></td><td align="left">The maximum value <code>n</code></td></tr><tr><td align="left"><code>date.min</code></td><td align="left"><a href="#date"><code>d.date().min(n)</code></a></td><td align="left">The minimum value <code>n</code></td></tr><tr><td align="left"><code>date.max</code></td><td align="left"><a href="#date"><code>d.date().max(n)</code></a></td><td align="left">The maximum value <code>n</code></td></tr><tr><td align="left"><code>number.finite</code></td><td align="left"><a href="#number"><code>d.number().finite()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>number.int</code></td><td align="left"><a href="#number"><code>d.number().int()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>number.gt</code></td><td align="left"><a href="#number"><code>d.number().gte(x)</code></a></td><td align="left">The minimum value <code>x</code></td></tr><tr><td align="left"><code>number.lt</code></td><td align="left"><a href="#number"><code>d.number().lte(x)</code></a></td><td align="left">The maximum value <code>x</code></td></tr><tr><td align="left"><code>number.gte</code></td><td align="left"><a href="#number"><code>d.number().gt(x)</code></a></td><td align="left">The exclusive minimum value <code>x</code></td></tr><tr><td align="left"><code>number.lte</code></td><td align="left"><a href="#number"><code>d.number().lt(x)</code></a></td><td align="left">The exclusive maximum value <code>x</code></td></tr><tr><td align="left"><code>number.multipleOf</code></td><td align="left"><a href="#number"><code>d.number().multipleOf(x)</code></a></td><td align="left">The divisor <code>x</code></td></tr><tr><td align="left"><code>object.allKeys</code></td><td align="left"><a href="#key-relationships"><code>d.object().allKeys(keys)</code></a></td><td align="left">The <code>keys</code> array</td></tr><tr><td align="left"><code>object.notAllKeys</code></td><td align="left"><a href="#key-relationships"><code>d.object().notAllKeys(keys)</code></a></td><td align="left">The <code>keys</code> array</td></tr><tr><td align="left"><code>object.orKeys</code></td><td align="left"><a href="#key-relationships"><code>d.object().orKeys(keys)</code></a></td><td align="left">The <code>keys</code> array</td></tr><tr><td align="left"><code>object.xorKeys</code></td><td align="left"><a href="#key-relationships"><code>d.object().xorKeys(keys)</code></a></td><td align="left">The <code>keys</code> array</td></tr><tr><td align="left"><code>object.oxorKeys</code></td><td align="left"><a href="#key-relationships"><code>d.object().oxorKeys(keys)</code></a></td><td align="left">The <code>keys</code> array</td></tr><tr><td align="left"><code>object.exact</code></td><td align="left"><a href="#unknown-keys"><code>d.object().exact()</code></a></td><td align="left">The array of unknown keys</td></tr><tr><td align="left"><code>object.plain</code></td><td align="left"><a href="#object"><code>d.object().plain()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>set.min</code></td><td align="left"><a href="#set"><code>d.set().min(n)</code></a></td><td align="left">The minimum <code>Set</code> size <code>n</code></td></tr><tr><td align="left"><code>set.max</code></td><td align="left"><a href="#set"><code>d.set().max(n)</code></a></td><td align="left">The maximum <code>Set</code> size <code>n</code></td></tr><tr><td align="left"><code>string.nonBlank</code></td><td align="left"><a href="#string"><code>d.string().nonBlank()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>string.min</code></td><td align="left"><a href="#string"><code>d.string().min(n)</code></a></td><td align="left">The minimum string length <code>n</code></td></tr><tr><td align="left"><code>string.max</code></td><td align="left"><a href="#string"><code>d.string().max(n)</code></a></td><td align="left">The maximum string length <code>n</code></td></tr><tr><td align="left"><code>string.regex</code></td><td align="left"><a href="#string"><code>d.string().regex(re)</code></a></td><td align="left">The regular expression <code>re</code></td></tr><tr><td align="left"><code>string.includes</code></td><td align="left"><a href="#string"><code>d.string().includes(x)</code></a></td><td align="left">The included string <code>x</code></td></tr><tr><td align="left"><code>string.startsWith</code></td><td align="left"><a href="#string"><code>d.string().startsWith(x)</code></a></td><td align="left">The substring <code>x</code></td></tr><tr><td align="left"><code>string.endsWith</code></td><td align="left"><a href="#string"><code>d.string().endsWith(x)</code></a></td><td align="left">The substring <code>x</code></td></tr><tr><td align="left"><code>type.array</code></td><td align="left"><a href="#array"><code>d.array()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.bigint</code></td><td align="left"><a href="#bigint"><code>d.bigint()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.boolean</code></td><td align="left"><a href="#boolean-bool"><code>d.boolean()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.const</code></td><td align="left"><a href="#const"><code>d.const(x)</code></a></td><td align="left">The expected constant value <code>x</code></td></tr><tr><td align="left"><code>type.date</code></td><td align="left"><a href="#date"><code>d.date()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.enum</code></td><td align="left"><a href="#enum"><code>d.enum(…)</code></a></td><td align="left">The array of unique value</td></tr><tr><td align="left"><code>type.function</code></td><td align="left"><a href="#function-fn"><code>d.function()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.instanceOf</code></td><td align="left"><a href="#instanceof"><code>d.instanceOf(Class)</code></a></td><td align="left">The class constructor <code>Class</code></td></tr><tr><td align="left"><code>type.intersection</code></td><td align="left"><a href="#intersection-and"><code>d.and(…)</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.map</code></td><td align="left"><a href="#map"><code>d.map()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.never</code></td><td align="left"><a href="#never"><code>d.never()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.number</code></td><td align="left"><a href="#number"><code>d.number()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.object</code></td><td align="left"><a href="#object"><code>d.object()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.promise</code></td><td align="left"><a href="#promise"><code>d.promise()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.tuple</code></td><td align="left"><a href="#tuple"><code>d.tuple(…)</code></a></td><td align="left">The expected tuple length</td></tr><tr><td align="left"><code>type.set</code></td><td align="left"><a href="#set"><code>d.set()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.string</code></td><td align="left"><a href="#string"><code>d.string()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.symbol</code></td><td align="left"><a href="#symbol"><code>d.symbol()</code></a></td><td align="left">—</td></tr><tr><td align="left"><code>type.union</code></td><td align="left"><a href="#union-or"><code>d.or(…)</code></a></td><td align="left"><a href="#issues-raised-by-a-union">Issues raised by a union</a></td></tr></tbody></table><h1 id="operations"><a class="markdown-permalink" href="#operations"><span class="icon icon-link"></span></a>Operations</h1><div class="markdown-alert markdown-alert-important"><p class="markdown-alert-title"><svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>Important</p><p>While operations are a powerful tool, most of the time you don't need to add operations directly. Instead, you can use the higher-level API: <a href="#checks">checks</a>, <a href="#refinements">refinements</a>, and <a href="#alterations">alterations</a>.</p></div><p>Operations can check and transform the shape output value. Let's create a shape with an operation that trims an input string:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">addOperation</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
  <span class="pl-k">return</span> { ok: <span class="pl-c1">true</span>, value: <span class="pl-smi">value</span>.<span class="pl-en">trim</span>() };
});
<span class="pl-c">// ⮕ StringShape</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>  Space  <span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Space'</span>
</code></pre><p>Operations added via <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#addoperation"><code>addOperation</code> <sup>↗</sup></a> must return a <a href="https://smikhalevski.github.io/doubter/types/core.Result.html"><code>Result</code> <sup>↗</sup></a>:</p><ul><li><code>null</code> if the value is valid and unchanged;</li><li>an <a href="https://smikhalevski.github.io/doubter/interfaces/core.Ok.html"><code>Ok</code> <sup>↗</sup></a> object (as in example above) if the value was transformed;</li><li>an array of <a href="https://smikhalevski.github.io/doubter/interfaces/core.Issue.html"><code>Issue</code> <sup>↗</sup></a> objects if the operation has failed.</li></ul><p>Multiple operations can be added to shape, and they are executed in the same order they were added. To access all operations that were added use the <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#operations"><code>operations</code> <sup>↗</sup></a> property.</p><p>In contrast to <a href="#conversions">conversions</a> and <a href="#shape-piping">pipes</a>, operations don't change the base shape. So you can mix them with other operations that belong to the prototype of the base shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">string</span>()
  .<span class="pl-en">addOperation</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
    <span class="pl-k">return</span> { ok: <span class="pl-c1">true</span>, value: <span class="pl-smi">value</span>.<span class="pl-en">trim</span>() };
  })
  <span class="pl-c">// 🟡 d.StringShape.prototype.min</span>
  .<span class="pl-en">min</span>(<span class="pl-c1">6</span>);

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>  Neptune  <span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Neptune'</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>  Moon  <span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: string.min at /: Must have the minimum length of 6</span>
</code></pre><p>Operations can be parameterized. This is particularly useful if you want to reuse the operation multiple times.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">checkRegex</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">OperationCallback</span> <span class="pl-k">=</span> (<span class="pl-v">value</span>, <span class="pl-v">param</span>) <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-smi">param</span>.<span class="pl-c1">test</span>(<span class="pl-smi">value</span>)) {
    <span class="pl-k">return</span> <span class="pl-c1">null</span>;
  }
  <span class="pl-k">return</span> [{ message: <span class="pl-s"><span class="pl-pds">'</span>Must match <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">param</span> }];
};

<span class="pl-c">// 🟡 Pass a param when operation is added</span>
<span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">addOperation</span>(<span class="pl-smi">checkRegex</span>, { param:<span class="pl-s"><span class="pl-sr"> <span class="pl-pds">/</span>a<span class="pl-pds">/</span></span></span> });
<span class="pl-c">// ⮕ StringShape</span>

<span class="pl-smi">shape3</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Mars'</span>

<span class="pl-smi">shape3</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: unknown at /: Must match /a/</span>
</code></pre><p>Operations have access to parsing options, so you can provide <a href="#parsing-context">a custom context</a> to change the operation behaviour:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape4</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">addOperation</span>((<span class="pl-v">value</span>, <span class="pl-v">param</span>, <span class="pl-v">options</span>) <span class="pl-k">=></span> {
  <span class="pl-k">return</span> {
    ok: <span class="pl-c1">true</span>,
    value: <span class="pl-smi">value</span>.<span class="pl-c1">substring</span>(<span class="pl-smi">options</span>.<span class="pl-smi">context</span>.<span class="pl-smi">substringStart</span>),
  };
});
<span class="pl-c">// ⮕ StringShape</span>

<span class="pl-smi">shape4</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Hello, Bill<span class="pl-pds">'</span></span>, {
  <span class="pl-c">// 🟡 Provide the context during parsing</span>
  context: { substringStart: <span class="pl-c1">7</span> },
});
<span class="pl-c">// ⮕ 'Bill'</span>
</code></pre><p>Operations can throw a <a href="https://smikhalevski.github.io/doubter/classes/core.ValidationError.html"><code>ValidationError</code> <sup>↗</sup></a> to notify Doubter that parsing issues occurred. While this has the same effect as returning an array of issues, it is recommended to throw a <code>ValidationError</code> as the last resort since catching errors has a high performance penalty.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape5</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">addOperation</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-smi">value</span> <span class="pl-k">&#x3C;</span> <span class="pl-c1">32</span>) {
    <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-en">ValidationError</span>([{ code: <span class="pl-s"><span class="pl-pds">'</span>too_small<span class="pl-pds">'</span></span> }]);
  }
  <span class="pl-k">return</span> <span class="pl-c1">null</span>;
});

<span class="pl-smi">shape5</span>.<span class="pl-en">try</span>(<span class="pl-c1">16</span>);
<span class="pl-c">// ⮕ { ok: false, issues: [{ code: 'too_small' }] }</span>
</code></pre><h2 id="tolerance-for-issues"><a class="markdown-permalink" href="#tolerance-for-issues"><span class="icon icon-link"></span></a>Tolerance for issues</h2><p>Operations are executed only if the base shape type requirements are satisfied:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">addOperation</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
  <span class="pl-k">return</span> { ok: <span class="pl-c1">true</span>, value: <span class="pl-smi">value</span>.<span class="pl-en">trim</span>() };
});

<span class="pl-c">// 🟡 Operation isn't executed because 42 isn't a string</span>
<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ❌ ValidationError: type.string at /: Must be a string</span>
</code></pre><p>For composite shapes, operations may become non-type-safe. Let's consider an object shape with an operation:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">checkUser</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">OpeationCallback</span> <span class="pl-k">=</span> <span class="pl-v">user</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-smi">user</span>.<span class="pl-smi">age</span> <span class="pl-k">&#x3C;</span> <span class="pl-smi">user</span>.<span class="pl-smi">yearsOfExperience</span>) {
    <span class="pl-k">return</span> [{ code: <span class="pl-s"><span class="pl-pds">'</span>invalid_age<span class="pl-pds">'</span></span> }];
  }
  <span class="pl-k">return</span> <span class="pl-c1">null</span>;
};

<span class="pl-k">const</span> <span class="pl-c1">userShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">object</span>({
    age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
    yearsOfExperience: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
  })
  .<span class="pl-en">addOperation</span>(<span class="pl-smi">checkUser</span>);
<span class="pl-c">// ⮕ Shape&#x3C;{ age: number, yearsOfExperience: number }></span>
</code></pre><p>The <code>checkUser</code> operation is guaranteed to receive an object, but its properties aren't guaranteed to have correct types.</p><p>Use <a href="https://smikhalevski.github.io/doubter/types/core.OperationOptions.html#tolerance"><code>tolerance</code> <sup>↗</sup></a> operation option to change how the operation behaves in case there are issues caused by the shape it is added to:</p><dl><dt>"skip"</dt><dd><p>If the shape or preceding operations have raised issues, then the operation is skipped but consequent operations are still applied.</p></dd><dt>"abort"</dt><dd><p>If the shape or preceding operations have raised issues, then the operation is skipped and consequent operations aren't applied. Also, if this operation itself raises issues then consequent operations aren't applied.</p></dd><dt>"auto"</dt><dd><p>The operation is applied regardless of previously raised issues. This is the default behavior.</p></dd></dl><p>So to make <code>checkUser</code> operation type-safe, we can use "skip" or "abort".</p><pre><code class="language-diff">  const userShape = d
    .object({
      age: d.number(),
      yearsOfExperience: d.number()
    })
<span class="pl-md">-   .addOperation(checkUser);</span>
<span class="pl-mi1">+   .addOperation(checkUser, { tolerance: 'abort' });</span>
</code></pre><p>Some shapes cannot guarantee that the input value is of the required type. For example, if any of the underlying shapes in an intersection shape have raised issues, an intersection shape itself cannot guarantee that its operations would receive the value of the expected type, so it doesn't apply any operations if there are issues.</p><p>These shapes never apply operations if an underlying shape has raised an issue:</p><ul><li><a href="#deny-a-value"><code>DenyShape</code></a></li><li><a href="#intersection-and"><code>IntersectionShape</code></a></li><li><a href="#lazy"><code>LazyShape</code></a></li><li><a href="#shape-piping"><code>PipeShape</code></a></li><li><a href="#replace-a-value"><code>ReplaceShape</code></a></li><li><a href="#conversions"><code>ConvertShape</code></a></li><li><a href="#union-or"><code>UnionShape</code></a></li></ul><h2 id="async-operations"><a class="markdown-permalink" href="#async-operations"><span class="icon icon-link"></span></a>Async operations</h2><p>Operations callbacks can be asynchronous. They have the same set of arguments as synchronous alternative, by must return a promise. Consequent operations after the asynchronous operation would wait for its result:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">addAsyncOperation</span>(<span class="pl-k">async</span> <span class="pl-v">value</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-k">await</span> <span class="pl-en">doAsyncCheck</span>(<span class="pl-smi">value</span>)) {
    <span class="pl-k">return</span> <span class="pl-c1">null</span>;
  }
  <span class="pl-k">return</span> [{ code: <span class="pl-s"><span class="pl-pds">'</span>kaputs<span class="pl-pds">'</span></span> }];
});

<span class="pl-smi">shape</span>.<span class="pl-smi">isAsync</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape</span>.<span class="pl-en">parseAsync</span>(<span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>);
</code></pre><p>Adding an async operation to the shape, makes shape itself async, so use <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#parseasync"><code>parseAsync</code> <sup>↗</sup></a>, <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#tryasync"><code>tryAsync</code> <sup>↗</sup></a>, or <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#parseordefaultasync"><code>parseOrDefaultAsync</code> <sup>↗</sup></a>.</p><h2 id="checks"><a class="markdown-permalink" href="#checks"><span class="icon icon-link"></span></a>Checks</h2><p>Checks are the most common <a href="#operations">operations</a> that allow constraining the input value beyond type assertions. For example, if you want to constrain a numeric input to be greater than or equal to 5:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">check</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-smi">value</span> <span class="pl-k">&#x3C;</span> <span class="pl-c1">5</span>) {
    <span class="pl-c">// 🟡 Return an issue, or an array of issues</span>
    <span class="pl-k">return</span> { code: <span class="pl-s"><span class="pl-pds">'</span>kaputs<span class="pl-pds">'</span></span> };
  }
});
<span class="pl-c">// ⮕ NumberShape</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">10</span>);
<span class="pl-c">// ⮕ 10</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">3</span>);
<span class="pl-c">// ❌ ValidationError: kaputs at /</span>
</code></pre><p>A check callback receives the shape output value and must return an issue or an array of issues if the value is invalid. If the value is valid, a check callback must return <code>null</code>, <code>undefined</code>, or an empty array.</p><p>Add asynchronous checks using <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#checkasync"><code>checkAsync</code> <sup>↗</sup></a>. This method has the same semantics as <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#check"><code>check</code> <sup>↗</sup></a> but returns a promise and <a href="#async-shapes">makes the shape asynchronous</a>.</p><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>You can <a href="#operations">parameterize</a> checks and <a href="#tolerance-for-issues">set tolerance for issues</a> the same way as any other operation.</p></div><p>Most shapes have <a href="#built-in-plugins">a set of built-in checks</a>. The check we've just implemented above is called <a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#gte"><code>gte</code> <sup>↗</sup></a> (greater than equals):</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">gte</span>(<span class="pl-c1">5</span>);
</code></pre><p>Add as many checks as you need to the shape. You can mix built-in checks with any other custom operations, they are executed in the same order they were added.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">max</span>(<span class="pl-c1">4</span>).<span class="pl-en">regex</span>(<span class="pl-s"><span class="pl-sr"><span class="pl-pds">/</span>a<span class="pl-pds">/</span></span></span>).<span class="pl-en">try</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
</code></pre><p>In the example above, an <a href="https://smikhalevski.github.io/doubter/interfaces/core.Err.html"><code>Err</code> <sup>↗</sup></a> object is returned:</p><pre><code class="language-json5">{
  ok<span class="pl-k">:</span> <span class="pl-c1">false</span>,
  issues<span class="pl-k">:</span> [
    {
      code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>string.max<span class="pl-pds">'</span></span>,
      path<span class="pl-k">:</span> [],
      input<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>,
      message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must have the maximum length of 4<span class="pl-pds">'</span></span>,
      param<span class="pl-k">:</span> <span class="pl-c1">4</span>,
      meta<span class="pl-k">:</span> <span class="pl-c1">undefined</span>
    },
    {
      code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>string.regex<span class="pl-pds">'</span></span>,
      path<span class="pl-k">:</span> [],
      input<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>,
      message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must match the pattern /a/<span class="pl-pds">'</span></span>,
      param<span class="pl-k">:</span> <span class="pl-k">/</span>a<span class="pl-k">/</span>,
      meta<span class="pl-k">:</span> <span class="pl-c1">undefined</span>
    }
  ]
}
</code></pre><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>You can find the list of issue codes and corresponding param values in <a href="#validation-errors">Validation errors</a> section.</p></div><h2 id="refinements"><a class="markdown-permalink" href="#refinements"><span class="icon icon-link"></span></a>Refinements</h2><p>Refinements are <a href="#operations">operations</a> that use a predicate callback to validate an input. For example, the shape below would raise an issue if the input string is less than six characters long.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">refine</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-smi">value</span>.<span class="pl-c1">length</span> <span class="pl-k">></span> <span class="pl-c1">5</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Uranus<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Uranus'</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: any.refine at /: Must conform the predicate</span>
</code></pre><p>Add asynchronous refinements using <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#refineasync"><code>refineAsync</code> <sup>↗</sup></a>. This method has the same semantics as <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#refine"><code>refine</code> <sup>↗</sup></a> but returns a promise and <a href="#async-shapes">makes the shape asynchronous</a>.</p><p>Use refinements to <a href="https://www.typescriptlang.org/docs/handbook/2/narrowing.html">narrow <sup>↗</sup></a> the output type of the shape:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">isMarsOrPluto</span>(<span class="pl-v">value</span><span class="pl-k">:</span> <span class="pl-c1">string</span>)<span class="pl-k">:</span> <span class="pl-v">value</span> <span class="pl-k">is</span> <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span> <span class="pl-k">|</span> <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span> {
  <span class="pl-k">return</span> <span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span> <span class="pl-k">||</span> <span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>;
}

<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">refine</span>(<span class="pl-smi">isMarsOrPluto</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string, 'Mars' | 'Pluto'></span>
</code></pre><p>By default, <code>refine</code> raises issues which have the <a href="#validation-errors"><code>"any.refine"</code></a> code. You can provide a custom code:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">refine</span>(<span class="pl-smi">isMarsOrPluto</span>, {
  code: <span class="pl-s"><span class="pl-pds">'</span>illegal_planet<span class="pl-pds">'</span></span>,
  message: <span class="pl-s"><span class="pl-pds">'</span>Must be Mars or Pluto<span class="pl-pds">'</span></span>,
});

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: illegal_planet at /: Must be Mars or Pluto</span>
</code></pre><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>You can <a href="#operations">parameterize</a> refinements and <a href="#tolerance-for-issues">set tolerance for issues</a> the same way as any other operation.</p></div><h2 id="alterations"><a class="markdown-permalink" href="#alterations"><span class="icon icon-link"></span></a>Alterations</h2><p>Alterations are <a href="#operations">operations</a> that synchronously transform the shape output value without changing its type. For example, let's consider a string shape that trims the value and then checks that it has at least 3 characters:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>()
  .<span class="pl-en">alter</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-smi">value</span>.<span class="pl-en">trim</span>())
  .<span class="pl-en">min</span>(<span class="pl-c1">3</span>);
<span class="pl-c">// ⮕ StringShape</span>
</code></pre><p>Add asynchronous alterations using <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#alterasync"><code>alterAsync</code> <sup>↗</sup></a>. This method has the same semantics as <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#alter"><code>alter</code> <sup>↗</sup></a> but returns a promise and <a href="#async-shapes">makes the shape asynchronous</a>.</p><p>Use any transformation library in conjunction with alternations:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">alter</span>(<span class="pl-c1">Math</span>.<span class="pl-c1">abs</span>).<span class="pl-en">alter</span>(<span class="pl-c1">Math</span>.<span class="pl-c1">pow</span>, { param: <span class="pl-c1">3</span> });
</code></pre><p>Alteration callbacks must return the value of the same type, so consequent operations are type-safe. If you want to convert the shape output value to another type, consider using <a href="#conversions">conversions</a>.</p><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>You can <a href="#operations">parameterize</a> alterations and <a href="#tolerance-for-issues">set tolerance for issues</a> the same way as any other operation.</p></div><h1 id="conversions"><a class="markdown-permalink" href="#conversions"><span class="icon icon-link"></span></a>Conversions</h1><p>Conversions are close relatives of <a href="#alterations">alterations</a> that also transform shape output value. The main difference from alterations is that conversions can change the shape output type. Let's consider a shape that takes a string as an input and converts it to a number:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-smi">parseFloat</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string, number></span>
</code></pre><p>This shape ensures that the input value is a string and passes it to a converter callback:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>42<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>seventeen<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ NaN</span>
</code></pre><p>Throw a <a href="https://smikhalevski.github.io/doubter/classes/core.ValidationError.html"><code>ValidationError</code> <sup>↗</sup></a> inside the callback to notify parser that the conversion cannot be successfully completed:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">toNumber</span>(<span class="pl-v">input</span><span class="pl-k">:</span> <span class="pl-c1">string</span>)<span class="pl-k">:</span> <span class="pl-c1">number</span> {
  <span class="pl-k">const</span> <span class="pl-c1">output</span> <span class="pl-k">=</span> <span class="pl-c1">parseFloat</span>(<span class="pl-smi">input</span>);

  <span class="pl-k">if</span> (<span class="pl-c1">isNaN</span>(<span class="pl-smi">output</span>)) {
    <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-smi">d</span>.<span class="pl-en">ValidationError</span>([{ code: <span class="pl-s"><span class="pl-pds">'</span>nan<span class="pl-pds">'</span></span> }]);
  }
  <span class="pl-k">return</span> <span class="pl-smi">output</span>;
}

<span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-smi">toNumber</span>);

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>42<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>seventeen<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: nan at /</span>
</code></pre><h2 id="async-conversions"><a class="markdown-permalink" href="#async-conversions"><span class="icon icon-link"></span></a>Async conversions</h2><p>Let's consider a <em>synchronous</em> conversion:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">syncShape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Hello, <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">value</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">syncShape1</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ false</span>

<span class="pl-smi">syncShape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Hello, Jill'</span>
</code></pre><p>The converter callback receives and returns a string and so does <code>syncShape1</code>.</p><p>Now lets return a promise from the converter callback:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">syncShape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-c1">Promise</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Hello, <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">value</span>));
<span class="pl-c">// ⮕ Shape&#x3C;string, Promise&#x3C;string>></span>

<span class="pl-smi">syncShape2</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ false</span>

<span class="pl-smi">syncShape2</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Promise&#x3C;string></span>
</code></pre><p>Notice that <code>syncShape2</code> is asymmetric: it expects a string input and converts it to a <code>Promise&#x3C;string></code>. <code>syncShape2</code> is still synchronous, since the converter callback <em>synchronously wraps</em> a value in a promise.</p><p>Now let's create an <em>asynchronous</em> shape using the async conversion:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">asyncShape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convertAsync</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-c1">Promise</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Hello, <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">value</span>));
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-c">// 🟡 Notice that the shape is async</span>
<span class="pl-smi">asyncShape1</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ true</span>

<span class="pl-k">await</span> <span class="pl-smi">asyncShape1</span>.<span class="pl-en">parseAsync</span>(<span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Promise { 'Hello, Jill' }</span>
</code></pre><p>Notice that <code>asyncShape1</code> converts the input string value to output string but the conversion itself is asynchronous.</p><p>A shape is asynchronous if it uses asynchronous conversions. Here's an asynchronous object shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">asyncShape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convertAsync</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-c1">Promise</span>.<span class="pl-c1">resolve</span>(<span class="pl-smi">value</span>)),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: string }></span>

<span class="pl-smi">asyncShape2</span>.<span class="pl-smi">isAsync</span>; <span class="pl-c">// ⮕ true</span>
</code></pre><p>Refer to <a href="#async-shapes">Async shapes</a> section for more details on when shapes can become asynchronous.</p><h1 id="early-return"><a class="markdown-permalink" href="#early-return"><span class="icon icon-link"></span></a>Early return</h1><p>By default, Doubter collects all issues during parsing. In some cases, you may want to halt parsing and raise a validation error as soon as the first issue was encountered. To do this, pass the <a href="https://smikhalevski.github.io/doubter/interfaces/core.ParseOptions.html#isearlyreturn"><code>isEarlyReturn</code> <sup>↗</sup></a> option to the <a href="#parsing-and-trying">parsing methods</a>.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>()
  .<span class="pl-en">max</span>(<span class="pl-c1">4</span>)
  .<span class="pl-en">regex</span>(<span class="pl-s"><span class="pl-sr"><span class="pl-pds">/</span>a<span class="pl-pds">/</span></span></span>)
  .<span class="pl-en">try</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>, { isEarlyReturn: <span class="pl-c1">true</span> });
</code></pre><p>This would return the <a href="https://smikhalevski.github.io/doubter/interfaces/core.Err.html"><code>Err</code> <sup>↗</sup></a> object with only one issue:</p><pre><code class="language-json5">{
  ok<span class="pl-k">:</span> <span class="pl-c1">false</span>,
  issues<span class="pl-k">:</span> [
    {
      code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>string.max<span class="pl-pds">'</span></span>,
      path<span class="pl-k">:</span> <span class="pl-c1">undefined</span>,
      input<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>,
      message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must have the maximum length of 4<span class="pl-pds">'</span></span>,
      param<span class="pl-k">:</span> <span class="pl-c1">4</span>,
      meta<span class="pl-k">:</span> <span class="pl-c1">undefined</span>,
    },
  ],
}
</code></pre><h1 id="annotations-and-metadata"><a class="markdown-permalink" href="#annotations-and-metadata"><span class="icon icon-link"></span></a>Annotations and metadata</h1><p>Shapes and issues can be enriched with additional metadata.</p><p>Add an annotation to a shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">annotate</span>({ description: <span class="pl-s"><span class="pl-pds">'</span>Username<span class="pl-pds">'</span></span> });

<span class="pl-smi">shape</span>.<span class="pl-smi">annotations</span>;
<span class="pl-c">// ⮕ { description: 'Username' }</span>
</code></pre><p><a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#annotate"><code>annotate</code> <sup>↗</sup></a> returns the clone of the shape with updated annotations. Annotations are merged when you add them:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-en">annotate</span>({ foo: <span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span> }).<span class="pl-smi">annotations</span>;
<span class="pl-c">// ⮕ { description: 'Username', foo: 'bar' }</span>
</code></pre><p><a href="#validation-errors">Validation issues</a> have a <a href="https://smikhalevski.github.io/doubter/interfaces/core.Issue.html#meta"><code>meta</code> <sup>↗</sup></a> property that you can use to store an arbitrary data.</p><p>You can pass the <a href="https://smikhalevski.github.io/doubter/interfaces/core.IssueOptions.html#meta"><code>meta</code> <sup>↗</sup></a> option to any <a href="#checks">built-in check</a> and its value is assigned to the <code>meta</code> property of the raised validation issue.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">gt</span>(<span class="pl-c1">5</span>, { meta: <span class="pl-s"><span class="pl-pds">'</span>Useful data<span class="pl-pds">'</span></span> });
<span class="pl-c">// ⮕ Shape&#x3C;number></span>

<span class="pl-k">const</span> <span class="pl-c1">result</span> <span class="pl-k">=</span> <span class="pl-smi">shape</span>.<span class="pl-en">try</span>(<span class="pl-c1">2</span>);
<span class="pl-c">// ⮕ { ok: false, issues: … }</span>

<span class="pl-k">if</span> (<span class="pl-k">!</span><span class="pl-smi">result</span>.<span class="pl-smi">ok</span>) {
  <span class="pl-smi">result</span>.<span class="pl-smi">issues</span>[<span class="pl-c1">0</span>].<span class="pl-smi">meta</span>; <span class="pl-c">// ⮕ 'Useful data'</span>
}
</code></pre><p>This comes handy if you want to enhance an issue with an additional data that can be used later during issues processing. For example, during <a href="#localization">localization</a>.</p><h1 id="parsing-context"><a class="markdown-permalink" href="#parsing-context"><span class="icon icon-link"></span></a>Parsing context</h1><p>Inside <a href="#operations">operation</a> callbacks, <a href="#checks">check</a> callbacks, <a href="#refinements">refinement predicates</a>, <a href="#alterations">alteration</a> callbacks, <a href="#conversions">converters</a>, <a href="#fallback-value">fallback</a> functions, and <a href="#localization">message</a> callbacks you can access options passed to the parser. The <a href="https://smikhalevski.github.io/doubter/interfaces/core.ParseOptions.html#context"><code>context</code> <sup>↗</sup></a> option may store an arbitrary data, which is <code>undefined</code> by default.</p><p>For example, here's how you can use context to convert numbers to formatted strings:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">convert</span>((<span class="pl-v">value</span>, <span class="pl-v">options</span>) <span class="pl-k">=></span> <span class="pl-k">new</span> <span class="pl-c1">Intl</span>.<span class="pl-en">NumberFormat</span>(<span class="pl-smi">options</span>.<span class="pl-smi">context</span>.<span class="pl-smi">locale</span>).<span class="pl-en">format</span>(<span class="pl-smi">value</span>));
<span class="pl-c">// ⮕ Shape&#x3C;number, string></span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">1000</span>, {
  <span class="pl-c">// 🟡 Pass a context</span>
  context: { locale: <span class="pl-s"><span class="pl-pds">'</span>en-US<span class="pl-pds">'</span></span> },
});
<span class="pl-c">// ⮕ '1,000'</span>
</code></pre><h1 id="shape-piping"><a class="markdown-permalink" href="#shape-piping"><span class="icon icon-link"></span></a>Shape piping</h1><p>With shape piping you to can pass the shape output to another shape.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>()
  .<span class="pl-en">convert</span>(<span class="pl-smi">parseFloat</span>)
  .<span class="pl-en">to</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">lt</span>(<span class="pl-c1">5</span>).<span class="pl-en">gt</span>(<span class="pl-c1">10</span>));
<span class="pl-c">// ⮕ Shape&#x3C;string, number></span>
</code></pre><p>For example, you can validate that an input value is an <a href="#instanceof">instance of a class</a> and then validate its properties using <a href="#object"><code>object</code></a>:</p><pre><code class="language-ts"><span class="pl-k">class</span> <span class="pl-en">Planet</span> {
  <span class="pl-k">constructor</span>(<span class="pl-k">readonly</span> <span class="pl-v">name</span><span class="pl-k">:</span> <span class="pl-c1">string</span>) {}
}

<span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">instanceOf</span>(<span class="pl-smi">Planet</span>).<span class="pl-en">to</span>(
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">min</span>(<span class="pl-c1">4</span>),
  })
);

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span> });
<span class="pl-c">// ❌ ValidationError: type.instanceOf at /: Must be a class instance</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-en">Planet</span>(<span class="pl-s"><span class="pl-pds">'</span>X<span class="pl-pds">'</span></span>));
<span class="pl-c">// ❌ ValidationError: string.min at /name: Must have the minimum length of 4</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-en">Planet</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>));
<span class="pl-c">// ⮕ Planet { name: 'Mars' }</span>
</code></pre><h1 id="replace-allow-and-deny-a-value"><a class="markdown-permalink" href="#replace-allow-and-deny-a-value"><span class="icon icon-link"></span></a>Replace, allow, and deny a value</h1><p>All shapes support <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#replace"><code>replace</code> <sup>↗</sup></a>, <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#allow"><code>allow</code> <sup>↗</sup></a>, and <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#deny"><code>deny</code> <sup>↗</sup></a> methods that change how separate literal values are processed.</p><h2 id="replace-a-value"><a class="markdown-permalink" href="#replace-a-value"><span class="icon icon-link"></span></a>Replace a value</h2><p>You can replace an input value with an output value:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>]).<span class="pl-c1">replace</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Jupiter<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars' | 'Pluto', 'Mars' | 'Jupiter'></span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Mars'</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Jupiter'</span>
</code></pre><p>With <code>replace</code> you can extend possible input values:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>).<span class="pl-c1">replace</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Uranus<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;'Venus' | 'Mars', 'Venus' | 'Uranus'></span>
</code></pre><p>This would also work with non-literal input types:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-c1">replace</span>(<span class="pl-c1">0</span>, <span class="pl-s"><span class="pl-pds">'</span>zero<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;number, number | 'zero'></span>
</code></pre><p><code>replace</code> narrows its arguments to literal type but in TypeScript type system not all values have a separate literal type. For example, there's no literal type for <code>NaN</code> and <code>Infinity</code> values. In such cases <code>replace</code> doesn't exclude the replaced value type from the output type:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-c1">33</span>, <span class="pl-c1">42</span>]).<span class="pl-c1">replace</span>(<span class="pl-c1">NaN</span>, <span class="pl-c1">0</span>);
<span class="pl-c">// ⮕ Shape&#x3C;number, 33 | 42 | 0></span>
</code></pre><p>Replaced values aren't processed by the underlying shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">gte</span>(<span class="pl-c1">3</span>).<span class="pl-c1">replace</span>(<span class="pl-c1">0</span>, <span class="pl-s"><span class="pl-pds">'</span>zero<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;number | 'zero'></span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">2</span>);
<span class="pl-c">// ❌ ValidationError: number.gte at /: Must be greater than 3</span>

<span class="pl-c">// 🟡 Notice that 0 doesn't satisfy the gte constraint</span>
<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">0</span>);
<span class="pl-c">// ⮕ 'zero'</span>
</code></pre><h2 id="allow-a-value"><a class="markdown-permalink" href="#allow-a-value"><span class="icon icon-link"></span></a>Allow a value</h2><p>You can allow a value as both input and output:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>).<span class="pl-en">allow</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars' | 'Pluto'></span>
</code></pre><p><code>allow</code> follows exactly the same semantics as <a href="#replace-a-value"><code>replace</code></a>.</p><p>You can allow a value for a non-literal input types:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">finite</span>().<span class="pl-en">allow</span>(<span class="pl-c1">NaN</span>);
<span class="pl-c">// ⮕ Shape&#x3C;number></span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">NaN</span>);
<span class="pl-c">// ⮕ NaN</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">Infinity</span>);
<span class="pl-c">// ❌ ValidationError: number.finite at /: Must be a finite number</span>
</code></pre><h2 id="deny-a-value"><a class="markdown-permalink" href="#deny-a-value"><span class="icon icon-link"></span></a>Deny a value</h2><p>Consider the enum shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Jupiter<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars' | 'Pluto' | 'Jupiter'></span>
</code></pre><p>To remove a value from this enum you can use the <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#deny"><code>deny</code> <sup>↗</sup></a> method:</p><pre><code class="language-ts"><span class="pl-smi">shape1</span>.<span class="pl-en">deny</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars' | 'Jupiter'></span>
</code></pre><p>Value denial works with any shape. For example, you can deny a specific number:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">deny</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ Shape&#x3C;number></span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">33</span>);
<span class="pl-c">// ⮕ 33</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ❌ ValidationError: any.deny at /: Must not be equal to 42</span>
</code></pre><p><code>deny</code> prohibits value for <em>both input and output</em>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">number</span>()
  .<span class="pl-en">convert</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-smi">value</span> <span class="pl-k">*</span> <span class="pl-c1">2</span>)
  .<span class="pl-en">deny</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ Shape&#x3C;number></span>

<span class="pl-smi">shape3</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">21</span>);
<span class="pl-c">// ❌ ValidationError: any.deny at /: Must not be equal to 42</span>
</code></pre><h1 id="optional-and-non-optional"><a class="markdown-permalink" href="#optional-and-non-optional"><span class="icon icon-link"></span></a>Optional and non-optional</h1><p>Marking a shape as optional <a href="#allow-a-value">allows <code>undefined</code></a> in both its input and output:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">optional</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string | undefined></span>
</code></pre><p>You can provide a default value of any type, so it would be used as an output if input value is <code>undefined</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">optional</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string | undefined, string | 42></span>
</code></pre><p>You can achieve the same behaviour using a union:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">or</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  <span class="pl-smi">d</span>.<span class="pl-en">undefined</span>(),
]);
<span class="pl-c">// ⮕ Shape&#x3C;string | undefined></span>
</code></pre><p>Or using <a href="#allow-a-value"><code>allow</code></a>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">allow</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string | undefined></span>
</code></pre><p>You can mark any shape as non-optional which effectively <a href="#deny-a-value">denies <code>undefined</code></a> values from both input and output. For example, lets consider a union of an optional string and a number:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">optional</span>(),
  <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
]);
<span class="pl-c">// ⮕ Shape&#x3C;string | undefined | number></span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ⮕ undefined</span>

<span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">shape1</span>.<span class="pl-en">nonOptional</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string | number></span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ❌ ValidationError: any.deny at /: Must not be equal to undefined</span>
</code></pre><h1 id="nullable-and-nullish"><a class="markdown-permalink" href="#nullable-and-nullish"><span class="icon icon-link"></span></a>Nullable and nullish</h1><p>Marking a shape as nullable <a href="#allow-a-value">allows <code>null</code></a> for both input and output:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">nullable</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string | null></span>
</code></pre><p>You can provide a default value, so it would be used as an output if input value is <code>null</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">nullable</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string | null, string | 42></span>
</code></pre><p>To allow both <code>null</code> and <code>undefined</code> values use <code>nullish</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">nullish</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string | null | undefined></span>
</code></pre><p><code>nullish</code> also supports the default value:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">nullish</span>(<span class="pl-c1">8080</span>);
<span class="pl-c">// ⮕ Shape&#x3C;string | null | undefined, string | 8080></span>
</code></pre><h1 id="exclude-a-shape"><a class="markdown-permalink" href="#exclude-a-shape"><span class="icon icon-link"></span></a>Exclude a shape</h1><p>Shape exclusions work the same way as <code>Exclude</code> helper type in TypeScript. When an exclusion is applied, the output value returned by the underlying shape <em>must not conform</em> the excluded shape.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>]).<span class="pl-en">exclude</span>(<span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>));
<span class="pl-c">// ⮕ Shape&#x3C;'Mars' | 'Venus' | 'Pluto', 'Mars' | 'Venus'></span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Mars'</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: any.exclude at /: Must not conform the excluded shape</span>
</code></pre><p>Exclusions work with any shape combinations:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">d</span>.<span class="pl-en">number</span>(), <span class="pl-smi">d</span>.<span class="pl-en">string</span>()]).<span class="pl-en">exclude</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>());
<span class="pl-c">// ⮕ Shape&#x3C;number | string, number></span>
</code></pre><p>Sometimes you need an exclusion at runtime, but don't need it on the type level. For example, let's define a shape that allows any number except the [3, 5] range:</p><pre><code class="language-ts"><span class="pl-c">// 🟡 Note that the shape output is inferred as never</span>
<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">exclude</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">min</span>(<span class="pl-c1">3</span>).<span class="pl-en">max</span>(<span class="pl-c1">5</span>));
<span class="pl-c">// ⮕ Shape&#x3C;number, never></span>
</code></pre><p>Since the excluded shape constrains the <code>number</code> type, the output type is inferred as <code>never</code>. While the excluded shape only restricts a limited range of numbers, there's no way to express this in TypeScript. So here's the workaround:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">not</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">min</span>(<span class="pl-c1">3</span>).<span class="pl-en">max</span>(<span class="pl-c1">5</span>));
<span class="pl-c">// ⮕ Shape&#x3C;number></span>
</code></pre><p><code>not</code> works exactly like <code>exclude</code> at runtime, but it doesn't perform the exclusion on the type level.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>]).<span class="pl-en">not</span>(<span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>));
<span class="pl-c">// ⮕ Shape&#x3C;'Bill', 'Jill'></span>
</code></pre><p>You can also use <a href="#not"><code>d.not</code></a> to negate an arbitrary shape.</p><h1 id="deep-partial"><a class="markdown-permalink" href="#deep-partial"><span class="icon icon-link"></span></a>Deep partial</h1><p>All object-like shapes (objects, arrays, maps, sets, promises, etc.) can be converted to a deep partial alternative using <code>deepPartial</code> method:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">array</span>(
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
    age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
  })
);
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string, age: number }[]></span>

<span class="pl-smi">shape1</span>.<span class="pl-en">deepPartial</span>();
<span class="pl-c">// ⮕ Shape&#x3C;Array&#x3C;{ name?: string, age?: number } | undefined>></span>
</code></pre><p>Unions, intersections and lazy shapes can also be converted to deep partial:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">or</span>([
    <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
    <span class="pl-smi">d</span>.<span class="pl-en">object</span>({ name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>() })
  ])
  .<span class="pl-en">deepPartial</span>();
<span class="pl-c">// ⮕ Shape&#x3C;number | { name?: string }></span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>({ name: <span class="pl-c1">undefined</span> });
<span class="pl-c">// ⮕ { name: undefined }</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>Frodo<span class="pl-pds">'</span></span> });
<span class="pl-c">// ⮕ { name: 'Frodo' }</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>({ name: <span class="pl-c1">8080</span> });
<span class="pl-c">// ❌ ValidationError: type.string at /name: Must be a string</span>
</code></pre><p>Deep partial isn't applied to <a href="#conversions">converted shapes</a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">object</span>({
    years: <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">convert</span>(<span class="pl-v">years</span> <span class="pl-k">=></span> <span class="pl-smi">years</span>.<span class="pl-en">map</span>(<span class="pl-smi">parseFloat</span>)),
  })
  .<span class="pl-en">deepPartial</span>();
<span class="pl-c">// ⮕ Shape&#x3C;{ years?: string[] }, { years?: number[] }></span>
</code></pre><p>In the example above, array elements don't allow <code>undefined</code> even after <code>deepPartial</code> was applied, this happened because array is converted during parsing.</p><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>You can also implement <a href="#implementing-deep-partial-support">deep partial protocol</a> in your custom shapes.</p></div><h1 id="fallback-value"><a class="markdown-permalink" href="#fallback-value"><span class="icon icon-link"></span></a>Fallback value</h1><p>If issues were detected during parsing a shape can return a fallback value.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-c1">catch</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Pluto'</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ 'Mars'</span>
</code></pre><p>Pass a callback as a fallback value, it would be executed every time the catch clause is reached:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-c1">catch</span>(<span class="pl-c1">Date</span>.<span class="pl-smi">now</span>);

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 1671565311528</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 1671565326707</span>
</code></pre><p>Fallback functions receive an input value, an array of issues and <a href="https://smikhalevski.github.io/doubter/interfaces/core.ParseOptions.html">parsing options <sup>↗</sup></a> (so you can access your <a href="#parsing-context">custom context</a> if needed).</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-c1">catch</span>((<span class="pl-v">input</span>, <span class="pl-v">issues</span>, <span class="pl-v">options</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// Return a fallback value</span>
});
</code></pre><p>A fallback function can throw a <a href="#validation-errors"><code>ValidationError</code></a> to indicate that a fallback value cannot be produced. Issues from this error would be incorporated in the parsing result.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-c1">catch</span>(() <span class="pl-k">=></span> {
    <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-smi">d</span>.<span class="pl-en">ValidationError</span>([{ code: <span class="pl-s"><span class="pl-pds">'</span>kaputs<span class="pl-pds">'</span></span> }]);
  }),
});

<span class="pl-smi">shape3</span>.<span class="pl-c1">parse</span>({ name: <span class="pl-c1">47</span> });
<span class="pl-c">// ❌ ValidationError: kaputs at /name</span>
</code></pre><h1 id="branded-types"><a class="markdown-permalink" href="#branded-types"><span class="icon icon-link"></span></a>Branded types</h1><p>In TypeScript, values are considered to be of equivalent type if they are structurally the same. For example, plain strings are assignable to one another:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">bookTicket</span>(<span class="pl-v">flightCode</span><span class="pl-k">:</span> <span class="pl-c1">string</span>)<span class="pl-k">:</span> <span class="pl-c1">void</span> {
  <span class="pl-c">// Booking logic</span>
}

<span class="pl-c">// 🟡 No type errors, but "Bill" isn't a flight code</span>
<span class="pl-en">bookTicket</span>(<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>);
</code></pre><p>In some cases, it can be desirable to simulate nominal typing inside TypeScript. For instance, you may wish to write a function that only accepts an input that has been validated by Doubter. This can be achieved with branded types:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">flightCodeShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">refine</span>(<span class="pl-smi">isFlightCode</span>).<span class="pl-en">brand</span>&#x3C;<span class="pl-s"><span class="pl-pds">'</span>flightCode<span class="pl-pds">'</span></span>>();
<span class="pl-c">// ⮕ Shape&#x3C;string, Branded&#x3C;string, 'flightCode'>></span>

<span class="pl-k">type</span> <span class="pl-en">FlightCode</span> <span class="pl-k">=</span> <span class="pl-en">d</span>.<span class="pl-en">Output</span>&#x3C;<span class="pl-k">typeof</span> <span class="pl-smi">flightCodeShape</span>>;

<span class="pl-c">// 🟡 Note that the argument type isn't a plain string</span>
<span class="pl-k">function</span> <span class="pl-en">bookTicket</span>(<span class="pl-v">flightCode</span><span class="pl-k">:</span> <span class="pl-en">FlightCode</span>)<span class="pl-k">:</span> <span class="pl-c1">void</span> {
  <span class="pl-c">// Booking logic</span>
}

<span class="pl-en">bookTicket</span>(<span class="pl-smi">flightCodeShape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>BA2490<span class="pl-pds">'</span></span>));
<span class="pl-c">// Ok, valid flight code</span>

<span class="pl-en">bookTicket</span>(<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ Error: Expected BRAND to be flightCode</span>
</code></pre><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>Branded types don't affect the runtime result of <code>parse</code>. It is a static-type-only construct.</p></div><h1 id="type-coercion"><a class="markdown-permalink" href="#type-coercion"><span class="icon icon-link"></span></a>Type coercion</h1><p>Type coercion is the process of converting value from one type to another (such as a string to a number, an array to a <code>Set</code>, and so on).</p><p>When coercion is enabled, input values are implicitly converted to the required input type whenever possible. For example, you can coerce input values to a number type:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">coerce</span>();
<span class="pl-c">// ⮕ NumberShape</span>

<span class="pl-smi">shape</span>.<span class="pl-smi">isCoercing</span>; <span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-k">new</span> <span class="pl-c1">String</span>(<span class="pl-s"><span class="pl-pds">'</span>8080<span class="pl-pds">'</span></span>)]);
<span class="pl-c">// ⮕ 8080</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">null</span>);
<span class="pl-c">// ⮕ 0</span>
</code></pre><p>Coercion rules differ from JavaScript so the behavior is more predictable and human-like. With Doubter, you can coerce input to the following types:</p><ul><li><a href="#coerce-to-a-string">string</a></li><li><a href="#coerce-to-a-number">number</a></li><li><a href="#coerce-to-a-boolean">boolean</a></li><li><a href="#coerce-to-a-bigint">bigint</a></li><li><a href="#coerce-to-a-const">const</a></li><li><a href="#coerce-to-an-enum">enum</a></li><li><a href="#coerce-to-an-array">array</a></li><li><a href="#coerce-to-a-date"><code>Date</code></a></li><li><a href="#coerce-to-a-promise"><code>Promise</code></a></li><li><a href="#coerce-to-a-map"><code>Map</code></a></li><li><a href="#coerce-to-a-set"><code>Set</code></a></li></ul><h2 id="custom-type-coercion"><a class="markdown-permalink" href="#custom-type-coercion"><span class="icon icon-link"></span></a>Custom type coercion</h2><p>If you want to implement a custom coercion, you can use <a href="#fallback-value"><code>catch</code></a> to handle invalid input values:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">yesNoShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>().<span class="pl-c1">catch</span>((<span class="pl-v">value</span>, <span class="pl-v">issues</span>) <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>yes<span class="pl-pds">'</span></span>) {
    <span class="pl-k">return</span> <span class="pl-c1">true</span>;
  }
  <span class="pl-k">if</span> (<span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>no<span class="pl-pds">'</span></span>) {
    <span class="pl-k">return</span> <span class="pl-c1">false</span>;
  }
  <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-en">ValidationError</span>(<span class="pl-smi">issues</span>);
});

<span class="pl-smi">yesNoShape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>yes<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">yesNoShape</span>).<span class="pl-c1">parse</span>([<span class="pl-c1">true</span>, <span class="pl-s"><span class="pl-pds">'</span>no<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ [true, false]</span>

<span class="pl-smi">yesNoShape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>true<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.boolean at /: Must be a boolean</span>
</code></pre><p>Or you can use <a href="#convert-convertasync"><code>d.convert</code></a> to preprocess all input values:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">yesNoShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">convert</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
    <span class="pl-k">if</span> (<span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>yes<span class="pl-pds">'</span></span>) {
      <span class="pl-k">return</span> <span class="pl-c1">true</span>;
    }
    <span class="pl-k">if</span> (<span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>no<span class="pl-pds">'</span></span>) {
      <span class="pl-k">return</span> <span class="pl-c1">false</span>;
    }
    <span class="pl-c">// Let the consequent shape handle this value</span>
    <span class="pl-k">return</span> <span class="pl-smi">value</span>;
  })
  .<span class="pl-en">to</span>(<span class="pl-smi">d</span>.<span class="pl-en">boolean</span>());

<span class="pl-smi">yesNoShape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>yes<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">yesNoShape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>true<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.boolean at /: Must be a boolean</span>
</code></pre><h1 id="introspection"><a class="markdown-permalink" href="#introspection"><span class="icon icon-link"></span></a>Introspection</h1><p>Doubter provides various ways to introspect your shapes at runtime. Let's start by accessing shape input types using the <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#inputs"><code>inputs</code> <sup>↗</sup></a> property:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;string | boolean></span>

<span class="pl-smi">shape1</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ [Type.STRING, Type.BOOLEAN]</span>
</code></pre><p><code>inputs</code> array may contain literal values:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>]).<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ ['Mars', 42]</span>
</code></pre><p>Literal values are absorbed by matching type when combined in unions.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Uranus<span class="pl-pds">'</span></span>, <span class="pl-c1">1984</span>]),
  <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
]);
<span class="pl-c">// ⮕ Shape&#x3C;'Uranus' | number></span>

<span class="pl-smi">shape2</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ ['Uranus', Type.NUMBER]</span>
</code></pre><p>If <code>inputs</code> is an empty array, it means that the shape doesn't accept any input values, and would <em>always</em> raise validation issues.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">and</span>([<span class="pl-smi">d</span>.<span class="pl-en">number</span>(), <span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>)]);
<span class="pl-c">// ⮕ Shape&#x3C;never></span>

<span class="pl-smi">shape3</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ []</span>
</code></pre><p>To detect the type of the value use <a href="https://smikhalevski.github.io/doubter/classes/core.Type.html#of"><code>Type.of</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-smi">Type</span>.<span class="pl-en">of</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Type.STRING</span>

<span class="pl-smi">Type</span>.<span class="pl-en">of</span>(<span class="pl-smi">Type</span>.<span class="pl-c1">NUMBER</span>);
<span class="pl-c">// ⮕ Type.NUMBER</span>
</code></pre><p>Types returned from <code>Type.of</code> are a superset of types returned from the <code>typeof</code> operator.</p><table><tbody><tr><th><code>Type.of</code></th><th><code>typeof</code></th></tr><tr><td><code>Type.OBJECT</code></td><td rowspan="7"><code>'object'</code></td></tr><tr><td><code>Type.ARRAY</code></td></tr><tr><td><code>Type.DATE</code></td></tr><tr><td><code>Type.PROMISE</code></td></tr><tr><td><code>Type.SET</code></td></tr><tr><td><code>Type.MAP</code></td></tr><tr><td><code>Type.NULL</code></td></tr><tr><td><code>Type.FUNCTION</code></td><td><code>'function'</code></td></tr><tr><td><code>Type.STRING</code></td><td><code>'string'</code></td></tr><tr><td><code>Type.SYMBOL</code></td><td><code>'symbol'</code></td></tr><tr><td><code>Type.NUMBER</code></td><td><code>'number'</code></td></tr><tr><td><code>Type.BIGINT</code></td><td><code>'bigint'</code></td></tr><tr><td><code>Type.BOOLEAN</code></td><td><code>'boolean'</code></td></tr><tr><td><code>Type.UNDEFINED</code></td><td><code>'undefined'</code></td></tr><tr><td><code>Type.UNKNOWN</code></td><td>—</td></tr></tbody></table><h2 id="unknown-value-type"><a class="markdown-permalink" href="#unknown-value-type"><span class="icon icon-link"></span></a>Unknown value type</h2><p><code>Type.UNKNOWN</code> type emerges when accepted inputs cannot be statically inferred. For example, if <a href="#any"><code>d.any</code></a>, <a href="#unknown"><code>d.unknown</code></a>, or <a href="#convert-convertasync"><code>d.convert</code></a> are used:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">convert</span>(<span class="pl-smi">parseFloat</span>);
<span class="pl-c">// ⮕ Shape&#x3C;any, number></span>

<span class="pl-smi">shape1</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ [Type.UNKNOWN]</span>
</code></pre><p><code>Type.UNKNOWN</code> behaves like TypeScript's <code>unknown</code>.</p><p>It absorbs other types in unions:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">unknown</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;unknown></span>

<span class="pl-smi">shape2</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ [Type.UNKNOWN]</span>
</code></pre><p>And it is erased in intersections:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">and</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">unknown</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">shape3</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ [Type.STRING]</span>

<span class="pl-k">const</span> <span class="pl-c1">shape4</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">and</span>([<span class="pl-smi">d</span>.<span class="pl-en">never</span>(), <span class="pl-smi">d</span>.<span class="pl-en">unknown</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;never></span>

<span class="pl-smi">shape4</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ []</span>
</code></pre><h2 id="check-that-an-input-is-accepted"><a class="markdown-permalink" href="#check-that-an-input-is-accepted"><span class="icon icon-link"></span></a>Check that an input is accepted</h2><p>To check that the shape accepts a particular input type or value use the <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#accepts"><code>accepts</code> <sup>↗</sup></a> method:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">shape1</span>.<span class="pl-en">accepts</span>(<span class="pl-smi">Type</span>.<span class="pl-c1">STRING</span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape1</span>.<span class="pl-en">accepts</span>(<span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>
</code></pre><p>Check that a value is accepted:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars' | 'Venus'></span>

<span class="pl-smi">shape2</span>.<span class="pl-en">accepts</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape2</span>.<span class="pl-en">accepts</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ false</span>

<span class="pl-c">// 🟡 Enum doesn't accept arbitrary strings</span>
<span class="pl-smi">shape2</span>.<span class="pl-en">accepts</span>(<span class="pl-smi">Type</span>.<span class="pl-c1">STRING</span>);
<span class="pl-c">// ⮕ false</span>
</code></pre><p>For example, you can check that the shape is <a href="#optional-and-non-optional">optional</a> by checking that it accepts <code>undefined</code> input value:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">optional</span>();
<span class="pl-c">// ⮕ Shape&#x3C;number | undefined></span>

<span class="pl-smi">shape3</span>.<span class="pl-en">accepts</span>(<span class="pl-c1">1984</span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape3</span>.<span class="pl-en">accepts</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-c">// 🟡 Note that null isn't accepted</span>
<span class="pl-smi">shape3</span>.<span class="pl-en">accepts</span>(<span class="pl-c1">null</span>);
<span class="pl-c">// ⮕ false</span>
</code></pre><p>The fact that a shape accepts a particular input type or value, does not guarantee that it wouldn't raise a validation issue. For example, consider the <a href="#shape-piping">pipe</a> from <a href="#any"><code>d.any</code></a> to <a href="#string"><code>d.string</code></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">fuzzyShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">any</span>().<span class="pl-en">to</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>());
<span class="pl-c">// ⮕ Shape&#x3C;any, string></span>
</code></pre><p><code>fuzzyShape</code> accepts <a href="#unknown-value-type"><code>Type.UNKNOWN</code></a> because it is based on <code>d.any</code>:</p><pre><code class="language-ts"><span class="pl-smi">fuzzyShape</span>.<span class="pl-smi">inputs</span>;
<span class="pl-c">// ⮕ [Type.UNKNOWN]</span>
</code></pre><p>Since <code>fuzzyShape</code> accepts any values, an <code>undefined</code> is also accepted:</p><pre><code class="language-ts"><span class="pl-smi">fuzzyShape</span>.<span class="pl-en">accepts</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ⮕ true</span>
</code></pre><p>But parsing <code>undefined</code> with <code>fuzzyShape</code> would produce an error, since <code>undefined</code> doesn't satisfy <code>d.string</code> on the right-hand side of the pipe:</p><pre><code class="language-ts"><span class="pl-smi">fuzzyShape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">undefined</span>);
<span class="pl-c">// ❌ ValidationError: type.string at /: Must be a string</span>
</code></pre><h2 id="nested-shapes"><a class="markdown-permalink" href="#nested-shapes"><span class="icon icon-link"></span></a>Nested shapes</h2><p>Object, array, union ond other composite shapes provide access to their nested shapes:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string, age: number }></span>

<span class="pl-smi">userShape</span>.<span class="pl-smi">propShapes</span>.<span class="pl-c1">name</span>;
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-k">const</span> <span class="pl-c1">userOrNameShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">userShape</span>, <span class="pl-smi">d</span>.<span class="pl-en">string</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string, age: number } | string></span>

<span class="pl-smi">userOrNameShape</span>.<span class="pl-smi">shapes</span>[<span class="pl-c1">0</span>];
<span class="pl-c">// ⮕ userShape</span>
</code></pre><p><a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#at"><code>Shape.at</code> <sup>↗</sup></a> method derives a sub-shape at the given key, and if there's no such key then <code>null</code> is returned:</p><pre><code class="language-ts"><span class="pl-smi">userShape</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>age<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;number></span>

<span class="pl-smi">userShape</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>emotionalDamage<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ null</span>
</code></pre><p>This is especially useful with unions and intersections:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  }),
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    foo: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
  }),
]);

<span class="pl-smi">shape</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;string | number></span>

<span class="pl-smi">shape</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ null</span>
</code></pre><h1 id="localization"><a class="markdown-permalink" href="#localization"><span class="icon icon-link"></span></a>Localization</h1><p>All shape factories and built-in checks support custom issue messages:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>(<span class="pl-s"><span class="pl-pds">'</span>Hey, string here<span class="pl-pds">'</span></span>).<span class="pl-en">min</span>(<span class="pl-c1">3</span>, <span class="pl-s"><span class="pl-pds">'</span>Too short<span class="pl-pds">'</span></span>);
</code></pre><p><a href="https://smikhalevski.github.io/doubter/types/core.MessageCallback.html">Pass a function as a message <sup>↗</sup></a>, and it would receive an <a href="#validation-errors">issue</a> that would be raised, and parsing options. You can assign <code>issue.message</code> or return a message. For example, when using with React you may return a JSX element:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-en">reactMessage</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Message</span> <span class="pl-k">=</span> (<span class="pl-v">issue</span>, <span class="pl-v">options</span>) <span class="pl-k">=></span> (
  &#x3C;<span class="pl-ent">span</span> <span class="pl-e">style</span><span class="pl-k">=</span><span class="pl-pse">{</span>{ color: <span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span> }<span class="pl-pse">}</span>>The minimum length is <span class="pl-pse">{</span><span class="pl-smi">issue</span>.<span class="pl-smi">param</span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">span</span>>
);

<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">min</span>(<span class="pl-c1">5</span>, <span class="pl-smi">reactMessage</span>);
</code></pre><p>Semantics described above are applied to the <a href="https://smikhalevski.github.io/doubter/interfaces/core.IssueOptions.html#message"><code>message</code> <sup>↗</sup></a> option as well:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">length</span>(<span class="pl-c1">3</span>, { message: <span class="pl-s"><span class="pl-pds">'</span>Invalid length<span class="pl-pds">'</span></span> });
</code></pre><h2 id="override-default-messages"><a class="markdown-permalink" href="#override-default-messages"><span class="icon icon-link"></span></a>Override default messages</h2><p>Default issue messages can be overridden by <a href="https://smikhalevski.github.io/doubter/interfaces/core.ParseOptions.html#messages"><code>messages</code> <sup>↗</sup></a> option:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;

<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>, {
  messages: {
    <span class="pl-s"><span class="pl-pds">'</span>type.string<span class="pl-pds">'</span></span>: <span class="pl-s"><span class="pl-pds">'</span>Yo, not a string!<span class="pl-pds">'</span></span>,
  },
});
<span class="pl-c">// ❌ ValidationError: type.string at /: Yo, not a string!</span>
</code></pre><p>The full list of issue codes can be found in <a href="#validation-errors">Validation errors</a> section.</p><h1 id="plugins"><a class="markdown-permalink" href="#plugins"><span class="icon icon-link"></span></a>Plugins</h1><p>By default, when you import Doubter, you also get all <a href="#built-in-plugins">built-in plugins</a> as well:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;

<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">min</span>(<span class="pl-c1">2</span>); <span class="pl-c">// ✅ min is defined</span>

<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">gte</span>(<span class="pl-c1">3</span>); <span class="pl-c">// ✅ gte is defined</span>
</code></pre><p>If you import <code>doubter/core</code>, you would get only core set of shapes without any plugins:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter/core<span class="pl-pds">'</span></span>;

<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">min</span>(<span class="pl-c1">2</span>); <span class="pl-c">// ❌ min is undefined</span>

<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">gte</span>(<span class="pl-c1">3</span>); <span class="pl-c">// ❌ gte is undefined</span>
</code></pre><p>You can cherry-pick plugins that you need:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter/core<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-s"><span class="pl-pds">'</span>doubter/plugin/string-essentials<span class="pl-pds">'</span></span>;

<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">min</span>(<span class="pl-c1">2</span>); <span class="pl-c">// ✅ min is defined</span>

<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">gte</span>(<span class="pl-c1">3</span>); <span class="pl-c">// ❌ gte is undefined</span>
</code></pre><h2 id="built-in-plugins"><a class="markdown-permalink" href="#built-in-plugins"><span class="icon icon-link"></span></a>Built-in plugins</h2><ul><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_array-essentials.html"><strong>plugin/array-essentials</strong> <sup>↗</sup></a></p><p><a href="https://smikhalevski.github.io/doubter/classes/core.ArrayShape.html#length"><code>length</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ArrayShape.html#min"><code>min</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ArrayShape.html#max"><code>max</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ArrayShape.html#nonempty"><code>nonEmpty</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ArrayShape.html#includes"><code>includes</code> <sup>↗</sup></a></p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_bigint-essentials.html"><strong>plugin/bigint-essentials</strong> <sup>↗</sup></a></p><p><a href="https://smikhalevski.github.io/doubter/classes/core.BigIntShape.html#positive"><code>positive</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.BigIntShape.html#negative"><code>negative</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.BigIntShape.html#nonpositive"><code>nonPositive</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.BigIntShape.html#nonnegative"><code>nonNegative</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.BigIntShape.html#min"><code>min</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.BigIntShape.html#max"><code>max</code> <sup>↗</sup></a></p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_date-essentials.html"><strong>plugin/date-essentials</strong> <sup>↗</sup></a></p><p><a href="https://smikhalevski.github.io/doubter/classes/core.DateShape.html#min"><code>min</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.DateShape.html#max"><code>max</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.DateShape.html#after"><code>after</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.DateShape.html#before"><code>before</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.DateShape.html#toisostring"><code>toISOString</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.DateShape.html#totimestamp"><code>toTimestamp</code> <sup>↗</sup></a></p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_number-essentials.html"><strong>plugin/number-essentials</strong> <sup>↗</sup></a></p><p><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#finite"><code>finite</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#int"><code>int</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#positive"><code>positive</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#negative"><code>negative</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#nonpositive"><code>nonPositive</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#nonnegative"><code>nonNegative</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#between"><code>between</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#gt"><code>gt</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#lt"><code>lt</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#gte"><code>gte</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#lte"><code>lte</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#min"><code>min</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#max"><code>max</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#multipleof"><code>multipleOf</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html#safe"><code>safe</code> <sup>↗</sup></a></p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_object-essentials.html"><strong>plugin/object-essentials</strong> <sup>↗</sup></a></p><p><a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#plain"><code>plain</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#allkeys"><code>allKeys</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#notallkeys"><code>notAllKeys</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#orkeys"><code>orKeys</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#xorkeys"><code>xorKeys</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#oxorkeys"><code>oxorKeys</code> <sup>↗</sup></a></p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_set-essentials.html"><strong>plugin/set-essentials</strong> <sup>↗</sup></a></p><p><a href="https://smikhalevski.github.io/doubter/classes/core.SetShape.html#size"><code>size</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.SetShape.html#min"><code>min</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.SetShape.html#max"><code>max</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.SetShape.html#nonempty"><code>nonEmpty</code> <sup>↗</sup></a></p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_string-essentials.html"><strong>plugin/string-essentials</strong> <sup>↗</sup></a></p><p><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#length"><code>length</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#min"><code>min</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#max"><code>max</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#regex"><code>regex</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#includes"><code>includes</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#startswith"><code>startsWith</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#endswith"><code>endsWith</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#nonblank"><code>nonBlank</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#nonempty"><code>nonEmpty</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#trim"><code>trim</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#tolowercase"><code>toLowerCase</code> <sup>↗</sup></a><br><a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html#touppercase"><code>toUpperCase</code> <sup>↗</sup></a></p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_standard-schema.html"><strong>plugin/standard-schema</strong> <sup>↗</sup></a></p><p>Enables <a href="https://github.com/standard-schema/standard-schema#readme">Standard Schema <sup>↗</sup></a> API for all shapes.</p></li><li><p><a href="https://smikhalevski.github.io/doubter/modules/plugin_object-eval.html"><strong>plugin/object-eval</strong> <sup>↗</sup></a></p><p>If <code>new Function</code> calls are allowed by the environment, this plugin compiles internal methods of the <code>ObjectShape</code> to boost performance.</p></li></ul><h2 id="recommended-plugins"><a class="markdown-permalink" href="#recommended-plugins"><span class="icon icon-link"></span></a>Recommended plugins</h2><ul><li><p><a href="https://github.com/smikhalevski/doubter-plugin-string-format#readme"><strong>@doubter/plugin-string-format</strong> <sup>↗</sup></a><br></p><p>Extends <code>StringShape</code> with email, FQDN, MIME, BIC, ISIN, Luhn, and many other format checks.</p></li></ul><h2 id="integrations"><a class="markdown-permalink" href="#integrations"><span class="icon icon-link"></span></a>Integrations</h2><p>You can combine Doubter with your favourite predicate library using <a href="#refinements">refinements</a>.</p><p>For example, create a shape that validates that input is an email using <a href="https://github.com/validatorjs/validator.js">Validator.js <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">isEmail</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>validator/lib/isEmail<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">emailShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">refine</span>(<span class="pl-smi">isEmail</span>, <span class="pl-s"><span class="pl-pds">'</span>Must be an email<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;string></span>

<span class="pl-smi">emailShape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Not an email<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: any.refine at /: Must be an email</span>

<span class="pl-smi">emailShape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>foo@bar.com<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'foo@bar.com'</span>
</code></pre><p>You can use Doubter <a href="#alterations">alterations</a> with various utility libraries, such as <a href="https://lodash.com/">Lodash <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">_</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>lodash<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>()).<span class="pl-en">alter</span>(<span class="pl-smi">_</span>.<span class="pl-smi">uniq</span>);

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">1</span>, <span class="pl-c1">2</span>, <span class="pl-c1">3</span>, <span class="pl-c1">3</span>, <span class="pl-c1">2</span>]);
<span class="pl-c">// ⮕ [1, 2, 3])</span>
</code></pre><p>Or use native JavaScript methods as alteration callbacks:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">alter</span>(<span class="pl-c1">Math</span>.<span class="pl-c1">abs</span>).<span class="pl-en">alter</span>(<span class="pl-c1">Math</span>.<span class="pl-c1">round</span>).<span class="pl-en">min</span>(<span class="pl-c1">3</span>);

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">-</span><span class="pl-c1">3.1415</span>);
<span class="pl-c">// ⮕ 3</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">2</span>);
<span class="pl-c">// ❌ ValidationError: number.gte at /: Must be greater than or equal to 3</span>
</code></pre><h2 id="authoring-a-plugin"><a class="markdown-permalink" href="#authoring-a-plugin"><span class="icon icon-link"></span></a>Authoring a plugin</h2><p>Plugins use <a href="https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation">TypeScript's module augmentation <sup>↗</sup></a> to extend functionality of shapes exported from the <a href="https://smikhalevski.github.io/doubter/classes/core.html">doubter/core <sup>↗</sup></a> module.</p><p>Below is an example, how you can implement a naive email check and extend the <a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html"><code>StringShape</code> <sup>↗</sup></a>.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">StringShape</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter/core<span class="pl-pds">'</span></span>;

<span class="pl-k">declare</span> <span class="pl-k">module</span> <span class="pl-s"><span class="pl-pds">'</span>doubter/core<span class="pl-pds">'</span></span> {
  <span class="pl-k">interface</span> <span class="pl-en">StringShape</span> {
    <span class="pl-en">email</span>()<span class="pl-k">:</span> <span class="pl-c1">this</span>;
  }
}

<span class="pl-c1">StringShape</span>.<span class="pl-c1">prototype</span>.<span class="pl-en">email</span> <span class="pl-k">=</span> <span class="pl-k">function</span> () {
  <span class="pl-k">return</span> <span class="pl-c1">this</span>.<span class="pl-en">addOperation</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
    <span class="pl-k">if</span> (<span class="pl-smi">value</span>.<span class="pl-en">includes</span>(<span class="pl-s"><span class="pl-pds">'</span>@<span class="pl-pds">'</span></span>)) {
      <span class="pl-k">return</span> <span class="pl-c1">null</span>;
    }
    <span class="pl-k">return</span> [{ code: <span class="pl-s"><span class="pl-pds">'</span>email<span class="pl-pds">'</span></span>, message: <span class="pl-s"><span class="pl-pds">'</span>Must be an email<span class="pl-pds">'</span></span> }];
  });
};
</code></pre><p>Now you can use this check when building a string shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">email</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>foo@bar.com<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'foo@bar.com'</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: email at /: Must be an email</span>
</code></pre><p>You can use generic <a href="#operations">operations</a>, <a href="#checks">checks</a>, <a href="#refinements">refinements</a>, <a href="#alterations">alterations</a>, <a href="#conversions">conversions</a>, and any other functionality of the shape that is being extended.</p><h1 id="advanced-shapes"><a class="markdown-permalink" href="#advanced-shapes"><span class="icon icon-link"></span></a>Advanced shapes</h1><p>You can create custom shapes by extending the <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html"><code>Shape</code> <sup>↗</sup></a> class.</p><p><code>Shape</code> has several protected methods that you can override to change different aspects of the shape logic.</p><ol><li><p><a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#_apply"><code>_apply(input, options, nonce)</code> <sup>↗</sup></a></p><p>Synchronous input parsing is delegated to this method. It receives an <code>input</code> that must be parsed and should return the <a href="https://smikhalevski.github.io/doubter/types/core.Result.html"><code>Result</code> <sup>↗</sup></a>:</p><ul><li><code>null</code> if the output value is the same as the input value;</li><li>an <a href="https://smikhalevski.github.io/doubter/interfaces/core.Ok.html"><code>Ok</code> <sup>↗</sup></a> object (as in example above) if the output contains a new value;</li><li>an array of <a href="https://smikhalevski.github.io/doubter/interfaces/core.Issue.html"><code>Issue</code> <sup>↗</sup></a> objects if parsing has failed.</li></ul></li><li><p><a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#_applyasync"><code>_applyAsync(input, options, nonce)</code> <sup>↗</sup></a></p><p>Asynchronous input parsing is delegated to this method. It has the same semantics as <code>_apply</code> but returns a <code>Promise</code>. You need to override this method only if you have a separate logic for async parsing.</p></li><li><p><a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#_isasync"><code>_isAsync()</code> <sup>↗</sup></a></p><p>The value returned from this method is toggles which method is used for parsing:</p><ul><li>if <code>true</code> then <code>_applyAsync</code> would be used for parsing, and <code>_apply</code> would always throw an error;</li><li>if <code>false</code> then <code>_apply</code> can be used for parsing along with <code>_applyAsync</code>.</li></ul></li><li><p><a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#_getinputs"><code>_getInputs()</code> <sup>↗</sup></a></p><p>Must return an array of types and values that can be processed by the shape. Elements of the returned array don't have to be unique. Refer to <a href="#introspection">Introspection</a> section for more details about types.</p></li></ol><p>Let's create a custom shape that parses an input string as a number:</p><pre><code class="language-ts"><span class="pl-k">class</span> <span class="pl-en">NumberLikeShape</span> <span class="pl-k">extends</span> <span class="pl-en">d</span>.<span class="pl-e">Shape</span>&#x3C;<span class="pl-c1">string</span>, <span class="pl-c1">number</span>> {
  <span class="pl-k">protected</span> <span class="pl-en">_apply</span>(<span class="pl-v">input</span><span class="pl-k">:</span> <span class="pl-c1">unknown</span>, <span class="pl-v">options</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">ParseOptions</span>, <span class="pl-v">nonce</span><span class="pl-k">:</span> <span class="pl-c1">number</span>)<span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Result</span>&#x3C;<span class="pl-c1">number</span>> {
    <span class="pl-c">// 1️⃣ Validate the input and return issues if it is invalid</span>
    <span class="pl-k">if</span> (<span class="pl-k">typeof</span> <span class="pl-smi">input</span> <span class="pl-k">!==</span> <span class="pl-s"><span class="pl-pds">'</span>string<span class="pl-pds">'</span></span> <span class="pl-k">||</span> <span class="pl-c1">isNaN</span>(<span class="pl-c1">parseFloat</span>(<span class="pl-smi">input</span>))) {
      <span class="pl-k">return</span> [
        {
          code: <span class="pl-s"><span class="pl-pds">'</span>kaputs<span class="pl-pds">'</span></span>,
          message: <span class="pl-s"><span class="pl-pds">'</span>Must be a number-like<span class="pl-pds">'</span></span>,
          <span class="pl-smi">input</span>,
        },
      ];
    }

    <span class="pl-c">// 2️⃣ Apply operations to the output value</span>
    <span class="pl-k">return</span> <span class="pl-c1">this</span>.<span class="pl-en">_applyOperations</span>(<span class="pl-smi">input</span>, <span class="pl-c1">parseFloat</span>(<span class="pl-smi">input</span>), <span class="pl-smi">options</span>, <span class="pl-c1">null</span>) <span class="pl-k">as</span> <span class="pl-en">d</span>.<span class="pl-en">Result</span>;
  }
}
</code></pre><p>Now let's use this shape alongside with other built-in shapes:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-k">new</span> <span class="pl-en">NumberLikeShape</span>());
<span class="pl-c">// ⮕ Shape&#x3C;string[], number[]></span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-s"><span class="pl-pds">'</span>42<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>33<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ [42, 33]</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-s"><span class="pl-pds">'</span>seventeen<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ❌ ValidationError: kaputs at /0: Must be a number-like</span>
</code></pre><h2 id="implementing-deep-partial-support"><a class="markdown-permalink" href="#implementing-deep-partial-support"><span class="icon icon-link"></span></a>Implementing deep partial support</h2><p>To enable <code>deepPartial</code> support, your shape must implement <a href="https://smikhalevski.github.io/doubter/interfaces/core.DeepPartialProtocol.html"><code>DeepPartialProtocol</code> <sup>↗</sup></a>.</p><pre><code class="language-ts"><span class="pl-k">class</span> <span class="pl-en">MyShape</span> <span class="pl-k">extends</span> <span class="pl-e">Shape</span> <span class="pl-k">implements</span> <span class="pl-e">DeepPartialProtocol</span>&#x3C;<span class="pl-en">MyDeepPartialShape</span>> {
  <span class="pl-en">deepPartial</span>()<span class="pl-k">:</span> <span class="pl-en">MyDeepPartialShape</span> {
    <span class="pl-c">// Create and return a deep partial version of MyShape</span>
  }
}
</code></pre><p>This is sufficient to enable type inference and runtime support for <code>deepPartial</code> method.</p><h1 id="performance"><a class="markdown-permalink" href="#performance"><span class="icon icon-link"></span></a>Performance</h1><p>The chart below showcases the performance comparison of Doubter and its peers, in terms of millions of operations per second (greater is better).</p><p align="center"><img class="dark" src="https://raw.githubusercontent.com/smikhalevski/doubter/refs/heads/master/assets/perf-dark.svg" width="auto"><img class="light" src="https://raw.githubusercontent.com/smikhalevski/doubter/refs/heads/master/assets/perf-light.svg" width="auto"></p><p>Tests were conducted using <a href="https://github.com/smikhalevski/toofast#readme">TooFast <sup>↗</sup></a> on Apple M1 with Node.js v23.11.1.</p><p>To reproduce <a href="./src/test/perf/overall.perf.js">the performance test suite</a> results, clone this repo and run:</p><pre><code class="language-shell">npm ci
npm run build
npm run perf -- <span class="pl-s"><span class="pl-pds">'</span>overall*<span class="pl-pds">'</span></span>
</code></pre><details><summary>Detailed results</summary><pre><table>
<tbody><tr><th colspan="3">Success path</th></tr><tr><td colspan="3">🔵 <i>Loose validation</i></td></tr>
<tr><td>doubter   </td><td align="right"> 8.4 MHz ± 0.58%</td><td align="right"> 64.2 B  ± 0.04%</td> 
</tr><tr><td>valita    </td><td align="right"> 4.4 MHz ± 0.14%</td><td align="right">176.0 B  ± 0.02%</td> 
</tr><tr><td>myzod     </td><td align="right"> 3.1 MHz ± 0.4% </td><td align="right">487.8 B  ± 0.03%</td> 
</tr><tr><td>zod       </td><td align="right"> 2.5 MHz ± 0.38%</td><td align="right">  1.4 kB ± 0.01%</td> 
</tr><tr><td>valibot   </td><td align="right"> 1.5 MHz ± 0.3% </td><td align="right">  1.1 kB ± 0.01%</td></tr><tr><td colspan="3">🔴 <i>Strict validation</i></td></tr>
<tr><td>doubter   </td><td align="right"> 4.4 MHz ± 0.38%</td><td align="right">173.9 B  ± 0.04%</td> 
</tr><tr><td>valita    </td><td align="right"> 4.2 MHz ± 0.1% </td><td align="right"> 79.3 B  ± 0.13%</td> 
</tr><tr><td>myzod     </td><td align="right"> 3.6 MHz ± 0.2% </td><td align="right">231.1 B  ± 0.02%</td> 
</tr><tr><td>zod       </td><td align="right"> 2.9 MHz ± 0.6% </td><td align="right">  1.2 kB ± 0.01%</td> 
</tr><tr><td>valibot   </td><td align="right"> 1.5 MHz ± 0.27%</td><td align="right">  1.3 kB ± 0.01%</td></tr><tr><th colspan="3"><br>Failure path</th></tr><tr><td colspan="3">🔵 <i>Loose validation</i></td></tr>
<tr><td>doubter  </td><td align="right">  4.3 MHz ± 0.52%</td><td align="right">  1.2 kB ± 0.01%</td> 
</tr><tr><td>valita   </td><td align="right">  2.1 MHz ± 0.28%</td><td align="right">  1.4 kB ± 0.01%</td> 
</tr><tr><td>myzod    </td><td align="right"> 72.4 kHz ± 0.1% </td><td align="right">  3.1 kB ± 0.02%</td> 
</tr><tr><td>zod      </td><td align="right"> 75.4 kHz ± 0.93%</td><td align="right"> 10.6 kB ± 0.19%</td> 
</tr><tr><td>valibot  </td><td align="right">952.0 kHz ± 0.25%</td><td align="right">  3.3 kB ± 0.01%</td></tr><tr><td colspan="3">🔴 <i>Strict validation</i></td></tr>
<tr><td>doubter  </td><td align="right">  3.0 MHz ± 0.42%</td><td align="right">  1.2 kB ± 0.01%</td> 
</tr><tr><td>valita   </td><td align="right">  2.0 MHz ± 0.54%</td><td align="right">  1.5 kB ± 0%</td>    
</tr><tr><td>myzod    </td><td align="right"> 65.8 kHz ± 0.1% </td><td align="right">  3.0 kB ± 0.01%</td> 
</tr><tr><td>zod      </td><td align="right"> 77.8 kHz ± 0.97%</td><td align="right"> 10.4 kB ± 0.2%</td>  
</tr><tr><td>valibot  </td><td align="right">902.3 kHz ± 0.25%</td><td align="right">  3.3 kB ± 0.01%</td></tr><tr><th colspan="3"><br>Average path (Success + Failure) / 2</th></tr><tr><td colspan="3">🔵 <i>Loose validation</i></td></tr>
<tr><td>doubter  </td><td align="right">  5.1 MHz ± 0.37%</td><td align="right">639.9 B  ± 0.05%</td> 
</tr><tr><td>valita   </td><td align="right">  2.9 MHz ± 0.16%</td><td align="right">684.7 B  ± 0.08%</td> 
</tr><tr><td>myzod    </td><td align="right">610.2 kHz ± 0.32%</td><td align="right">545.3 B  ± 0.12%</td> 
</tr><tr><td>zod      </td><td align="right">483.5 kHz ± 0.99%</td><td align="right">  2.6 kB ± 0.16%</td> 
</tr><tr><td>valibot  </td><td align="right">  1.1 MHz ± 0.18%</td><td align="right">  2.2 kB ± 0.04%</td></tr><tr><td colspan="3">🔴 <i>Strict validation</i></td></tr>
<tr><td>doubter   </td><td align="right">  3.2 MHz ± 0.39%</td><td align="right">727.1 B  ± 0.05%</td> 
</tr><tr><td>valita    </td><td align="right">  2.7 MHz ± 0.2% </td><td align="right">804.1 B  ± 0.06%</td> 
</tr><tr><td>myzod     </td><td align="right">455.3 kHz ± 0.32%</td><td align="right">498.8 B  ± 0.15%</td> 
</tr><tr><td>zod       </td><td align="right">502.8 kHz ± 1.06%</td><td align="right">  2.3 kB ± 0.18%</td> 
</tr><tr><td>valibot   </td><td align="right">  1.1 MHz ± 0.25%</td><td align="right">  2.2 kB ± 0.04%</td> 
</tr></tbody></table></pre></details><h1 id="comparison-with-peers"><a class="markdown-permalink" href="#comparison-with-peers"><span class="icon icon-link"></span></a>Comparison with peers</h1><p>The table below highlights features that are unique to Doubter and its peers.</p><table><thead><tr><th></th><th width="100">Doubter</th><th width="100">Zod</th><th width="100">Valita</th></tr></thead><tbody><!--                                                                                 Doubter    Zod        Valita    --><tr><td colspan="4"><br><b>Shapes and parsing</b></td></tr><tr><td><a href="#static-type-inference">Static type inference</a></td><th>🟢</th><th>🟢</th><th>🟢</th></tr><tr><td><a href="#early-return">Early return</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#validation-errors">Custom issue codes</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#replace-allow-and-deny-a-value">Replace/allow/deny</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#exclude-a-shape">Exclude/not</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#discriminated-unions">Discriminated unions</a></td><th>🟢</th><th> 🌕 <sup>1</sup></th><th>🟢</th></tr><tr><td><a href="#introspection">Introspection at runtime</a></td><th>🟢</th><th> 🌕 <sup>2</sup></th><th>🔴</th></tr><tr><td><a href="#annotations-and-metadata">Annotations/metadata</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#making-objects-partial-and-required">Partial objects</a></td><th>🟢</th><th>🟢</th><th>🟢</th></tr><tr><td><a href="#deep-partial">Deep partial</a></td><th>🟢</th><th> 🌕 <sup>3</sup></th><th>🔴</th></tr><tr><td><a href="#circular-object-references">Circular objects</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#nested-shapes">Derive sub-shapes</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#key-relationships">Object key relationships</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#parsing-context">Parsing context</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td colspan="4"><br><b>Async flow</b></td></tr><tr><td><a href="#async-shapes">Async shapes</a></td><th>🟢</th><th>🟢</th><th>🔴</th></tr><tr><td><a href="#refinements">Async refinements</a></td><th>🟢</th><th>🟢</th><th>🔴</th></tr><tr><td><a href="#async-conversions">Async conversions</a></td><th>🟢</th><th>🟢</th><th>🔴</th></tr><tr><td><a href="#checks">Async checks</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#alterations">Async alterations</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#async-shapes">Check that shape is async</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td colspan="4"><br><b>Type coercion</b></td></tr><tr><td><a href="#coerce-to-a-string">String</a></td><th>🟢</th><th> 🌕 <sup>4</sup></th><th>🔴</th></tr><tr><td><a href="#coerce-to-a-number">Number</a></td><th>🟢</th><th> 🌕 <sup>4</sup></th><th>🔴</th></tr><tr><td><a href="#coerce-to-a-boolean">Boolean</a></td><th>🟢</th><th> 🌕 <sup>4</sup></th><th>🔴</th></tr><tr><td><a href="#coerce-to-a-bigint">BigInt</a></td><th>🟢</th><th> 🌕 <sup>4</sup></th><th>🔴</th></tr><tr><td><a href="#coerce-to-a-date">Date</a></td><th>🟢</th><th> 🌕 <sup>4</sup></th><th>🔴</th></tr><tr><td><a href="#coerce-to-a-set">Set</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#coerce-to-a-map">Map</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#coerce-to-an-array">Array</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#coerce-to-an-enum">Enum</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td><a href="#coerce-to-a-const">Const</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td colspan="4"><br><b>Other</b></td></tr><tr><td><a href="#plugins">Plugin-centric</a></td><th>🟢</th><th>🔴</th><th>🔴</th></tr><tr><td>Tree-shakeable</td><th>🟢</th><th>🟢</th><th>🟢</th></tr></tbody></table><ol><li><p>Zod uses <a href="https://zod.dev/?id=unions"><code>z.union</code> <sup>↗</sup></a> for regular unions and <a href="https://zod.dev/?id=discriminated-unions"><code>z.discriminatedUnion</code> <sup>↗</sup></a> for discriminated unions, and discriminator key must be supplied manually as an argument. Doubter uses <code>d.union</code> to describe both regular unions and discriminated unions, and discriminator key is <a href="#discriminated-unions">detected automatically</a>.</p></li><li><p>Zod schemas are class instances so introspection is possible, but there's no way to get <a href="#introspection">a list of types accepted by a schema</a>.</p></li><li><p>Zod supports <a href="https://zod.dev/?id=deeppartial"><code>deepPartial</code> <sup>↗</sup></a> for objects only. Doubter allows any shape to implement <a href="#implementing-deep-partial-support"><code>DeepPartialProtocol</code></a> and all shapes (except for primitives) support it out-of-the-box.</p></li><li><p>Zod coerces input values using wrapper constructors. Doubter uses custom converters for type coercion. For example, with Zod <code>null</code> is coerced to <code>"null"</code>, while with Doubter <code>null</code> is coerced to an empty string.</p></li></ol><h1 id="any"><a class="markdown-permalink" href="#any"><span class="icon icon-link"></span></a><code>any</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.any.html"><code>d.any</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html"><code>Shape</code> <sup>↗</sup></a> instance.</p><p>An unconstrained value that is inferred as <code>any</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">any</span>();
<span class="pl-c">// ⮕ Shape&#x3C;any></span>
</code></pre><p>Use <code>any</code> to create shapes that are unconstrained at runtime but constrained at compile time:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">any</span>&#x3C;{ <span class="pl-v">foo</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>();
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: string }></span>
</code></pre><p>Create a shape that is constrained by a <a href="https://www.typescriptlang.org/docs/handbook/2/narrowing.html">narrowing predicate <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">any</span>((<span class="pl-v">value</span>)<span class="pl-k">:</span> <span class="pl-v">value</span> <span class="pl-k">is</span> <span class="pl-c1">string</span> <span class="pl-k">=></span> <span class="pl-k">typeof</span> <span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>string<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;any, string></span>
</code></pre><h1 id="array"><a class="markdown-permalink" href="#array"><span class="icon icon-link"></span></a><code>array</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.array.html"><code>d.array</code> <sup>↗</sup></a> returns an <a href="https://smikhalevski.github.io/doubter/classes/core.ArrayShape.html"><code>ArrayShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be an array:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">array</span>();
<span class="pl-c">// ⮕ Shape&#x3C;any[]></span>
</code></pre><p>Restrict array element types:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;number[]></span>
</code></pre><p>Constrain the length of an array:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">min</span>(<span class="pl-c1">1</span>).<span class="pl-en">max</span>(<span class="pl-c1">10</span>);
</code></pre><p>Limit both minimum and maximum array length at the same time:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">length</span>(<span class="pl-c1">5</span>);
</code></pre><p>Convert array values during parsing:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-smi">parseFloat</span>));
<span class="pl-c">// ⮕ Shape&#x3C;string[], number[]></span>
</code></pre><p>Make an array readonly:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">readonly</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string[], readonly string[]></span>
</code></pre><h2 id="coerce-to-an-array"><a class="markdown-permalink" href="#coerce-to-an-array"><span class="icon icon-link"></span></a>Coerce to an array</h2><p>Iterables and array-like objects are converted to array via <code>Array.from(value)</code>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-c1">Set</span>([<span class="pl-s"><span class="pl-pds">'</span>John<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Jack<span class="pl-pds">'</span></span>]));
<span class="pl-c">// ⮕ ['John', 'Jack']</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>({ <span class="pl-c1">0</span>: <span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>, <span class="pl-c1">1</span>: <span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>, length: <span class="pl-c1">2</span> });
<span class="pl-c">// ⮕ ['Bill', 'Jill']</span>
</code></pre><p>Scalars, non-iterable and non-array-like objects are wrapped into an array:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Rose<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ ['Rose']</span>
</code></pre><h1 id="bigint"><a class="markdown-permalink" href="#bigint"><span class="icon icon-link"></span></a><code>bigint</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.bigint.html"><code>d.bigint</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.BigIntShape.html"><code>BigIntShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be a bigint.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">bigint</span>();
<span class="pl-c">// ⮕ Shape&#x3C;bigint></span>
</code></pre><h2 id="coerce-to-a-bigint"><a class="markdown-permalink" href="#coerce-to-a-bigint"><span class="icon icon-link"></span></a>Coerce to a bigint</h2><p><code>null</code> and <code>undefined</code> are converted to 0:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">bigint</span>().<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">null</span>);
<span class="pl-c">// ⮕ BigInt(0)</span>
</code></pre><p>Number, string and boolean values are converted via <code>BigInt(value)</code>:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>18588<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ BigInt(18588)</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Unexpected<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.bigint at /: Must be a bigint</span>
</code></pre><p>Arrays with a single element are unwrapped and the value is coerced:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">0xdea</span>]);
<span class="pl-c">// ⮕ BigInt(3562)</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">BigInt</span>(<span class="pl-c1">1</span>), <span class="pl-c1">BigInt</span>(<span class="pl-c1">2</span>)]);
<span class="pl-c">// ❌ ValidationError: type.bigint at /: Must be a bigint</span>
</code></pre><h1 id="boolean-bool"><a class="markdown-permalink" href="#boolean-bool"><span class="icon icon-link"></span></a><code>boolean</code>, <code>bool</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.boolean.html"><code>d.boolean</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.BooleanShape.html"><code>BooleanShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be boolean.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">boolean</span>();
<span class="pl-c">// or</span>
<span class="pl-smi">d</span>.<span class="pl-en">bool</span>();
<span class="pl-c">// ⮕ Shape&#x3C;boolean></span>
</code></pre><h2 id="coerce-to-a-boolean"><a class="markdown-permalink" href="#coerce-to-a-boolean"><span class="icon icon-link"></span></a>Coerce to a boolean</h2><p><code>null</code>, <code>undefined</code>, <code>'false'</code> and 0 are converted to <code>false</code>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>().<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">null</span>);
<span class="pl-c">// ⮕ false</span>
</code></pre><p><code>'true'</code> and 1 are converted to <code>true</code>:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>true<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>yes<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.boolean at /: Must be a boolean</span>
</code></pre><p>Arrays with a single element are unwrapped and the value is coerced:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">undefined</span>]);
<span class="pl-c">// ⮕ false</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">0</span>, <span class="pl-c1">1</span>]);
<span class="pl-c">// ❌ ValidationError: type.boolean at /: Must be a boolean</span>
</code></pre><h1 id="const"><a class="markdown-permalink" href="#const"><span class="icon icon-link"></span></a><code>const</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.const.html"><code>d.const</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.ConstShape.html"><code>ConstShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be an exact value:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars'></span>
</code></pre><p>There are shortcuts for <a href="#null"><code>null</code></a>, <a href="#undefined"><code>undefined</code></a> and <a href="#nan"><code>nan</code></a> constants.</p><p>Consider using <a href="#enum"><code>enum</code></a> if you want to check that an input is one of multiple values.</p><h2 id="coerce-to-a-const"><a class="markdown-permalink" href="#coerce-to-a-const"><span class="icon icon-link"></span></a>Coerce to a const</h2><p><code>d.const</code> coerces an input depending on the type of the given constant value. <code>const</code> uses <a href="#coerce-to-a-bigint">bigint</a>, <a href="#coerce-to-a-number">number</a>, <a href="#coerce-to-a-string">string</a>, <a href="#coerce-to-a-boolean">boolean</a>, or <a href="#coerce-to-a-date"><code>Date</code></a> coercion rules if given constant matches one of these types. For example, if a given constant value is a string then <a href="#coerce-to-a-string">the string coercion rules</a> are applied:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-c1">BigInt</span>(<span class="pl-c1">42</span>)).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>([<span class="pl-k">new</span> <span class="pl-c1">String</span>(<span class="pl-s"><span class="pl-pds">'</span>42<span class="pl-pds">'</span></span>)]);
<span class="pl-c">// ⮕ BigInt(42)</span>
</code></pre><p>Constant values of other types aren't coerced, but <code>d.const</code> would try to unwrap arrays with a single element to check the element equals to the given constant:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">users</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-c1">Set</span>([<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>]);

<span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-smi">users</span>).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>([<span class="pl-smi">users</span>]);
<span class="pl-c">// ⮕ users</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-c1">Set</span>([<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>]));
<span class="pl-c">// ❌ ValidationError: type.set at /: Must be equal to [object Set]</span>
</code></pre><h1 id="convert-convertasync"><a class="markdown-permalink" href="#convert-convertasync"><span class="icon icon-link"></span></a><code>convert</code>, <code>convertAsync</code></h1><p>Both <a href="https://smikhalevski.github.io/doubter/functions/core.convert.html"><code>d.convert</code> <sup>↗</sup></a> and <a href="https://smikhalevski.github.io/doubter/functions/core.convertAsync.html"><code>d.convertAsync</code> <sup>↗</sup></a> return a <a href="https://smikhalevski.github.io/doubter/classes/core.ConvertShape.html"><code>ConvertShape</code> <sup>↗</sup></a> instance.</p><p>Converts the input value:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">convert</span>(<span class="pl-smi">parseFloat</span>);
<span class="pl-c">// ⮕ Shape&#x3C;any, number></span>
</code></pre><p>Use <code>convert</code> in conjunction with <a href="#shape-piping">shape piping</a>:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-en">to</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">min</span>(<span class="pl-c1">3</span>).<span class="pl-en">max</span>(<span class="pl-c1">5</span>));
</code></pre><p>Apply async conversions with <code>convertAsync</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">convertAsync</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-c1">Promise</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Hello, <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">value</span>));
<span class="pl-c">// ⮕ Shape&#x3C;any, string></span>
</code></pre><p>For more information, see <a href="#conversions">Conversions</a> section.</p><h1 id="date"><a class="markdown-permalink" href="#date"><span class="icon icon-link"></span></a><code>date</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.date.html"><code>d.date</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.DateShape.html"><code>DateShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be a valid date.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">date</span>();
<span class="pl-c">// ⮕ Shape&#x3C;Date></span>
</code></pre><p>Constrain the minimum and maximum dates:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">date</span>().<span class="pl-c1">after</span>(<span class="pl-s"><span class="pl-pds">'</span>2003-03-12<span class="pl-pds">'</span></span>).<span class="pl-c1">before</span>(<span class="pl-s"><span class="pl-pds">'</span>2030-01-01<span class="pl-pds">'</span></span>);
</code></pre><p>Convert date to ISO string or timestamp:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">date</span>().<span class="pl-en">toISOString</span>().<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-c1">Date</span>());
<span class="pl-c">// ⮕ '2023-07-10T19:31:52.395Z'</span>

<span class="pl-smi">d</span>.<span class="pl-en">date</span>().<span class="pl-en">toTimestamp</span>().<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-c1">Date</span>());
<span class="pl-c">// ⮕ 1689017512395</span>
</code></pre><h2 id="coerce-to-a-date"><a class="markdown-permalink" href="#coerce-to-a-date"><span class="icon icon-link"></span></a>Coerce to a <code>Date</code></h2><p>Strings and numbers are converted via <code>new Date(value)</code> and if an invalid date is produced then an issue is raised:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">date</span>().<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>2023-01-22<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Date</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Yesterday<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.date at /: Must be a Date</span>
</code></pre><p>Arrays with a single element are unwrapped and the value is coerced:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">1674352106419</span>]);
<span class="pl-c">// ⮕ Date</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-s"><span class="pl-pds">'</span>2021-12-03<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>2023-01-22<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ❌ ValidationError: type.date at /: Must be a Date</span>
</code></pre><h1 id="enum"><a class="markdown-permalink" href="#enum"><span class="icon icon-link"></span></a><code>enum</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.enum.html"><code>d.enum</code> <sup>↗</sup></a> returns an <a href="https://smikhalevski.github.io/doubter/classes/core.EnumShape.html"><code>EnumShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be equal to one of predefined values:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Jupiter<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars', 'Pluto', 'Jupiter'></span>
</code></pre><p>Or use a native TypeScript enum to limit possible values:</p><pre><code class="language-ts"><span class="pl-k">enum</span> <span class="pl-en">Planet</span> {
  <span class="pl-smi">MARS</span>,
  <span class="pl-smi">PLUTO</span>,
  <span class="pl-smi">JUPITER</span>,
}

<span class="pl-smi">d</span>.<span class="pl-en">enum</span>(<span class="pl-smi">Planet</span>);
<span class="pl-c">// ⮕ Shape&#x3C;Planet></span>
</code></pre><p>Or use <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions">an object with a <code>const</code> assertion <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">planets</span> <span class="pl-k">=</span> {
  MARS: <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>,
  PLUTO: <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>,
  JUPITER: <span class="pl-s"><span class="pl-pds">'</span>Jupiter<span class="pl-pds">'</span></span>,
} <span class="pl-k">as</span> <span class="pl-k">const</span>;

<span class="pl-smi">d</span>.<span class="pl-en">enum</span>(<span class="pl-smi">plants</span>);
<span class="pl-c">// ⮕ Shape&#x3C;'Mars', 'Pluto', 'Jupiter'></span>
</code></pre><h2 id="coerce-to-an-enum"><a class="markdown-permalink" href="#coerce-to-an-enum"><span class="icon icon-link"></span></a>Coerce to an enum</h2><p>If an enum is defined via a native TypeScript enum or via a const object, then enum element names are coerced to corresponding values:</p><pre><code class="language-ts"><span class="pl-k">enum</span> <span class="pl-en">Users</span> {
  <span class="pl-smi">JILL</span>,
  <span class="pl-smi">SARAH</span>,
  <span class="pl-smi">JAMES</span>,
}

<span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>(<span class="pl-smi">Users</span>).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>SARAH<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 1</span>
</code></pre><p>Arrays with a single element are unwrapped and the value is coerced:</p><pre><code class="language-ts"><span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>([<span class="pl-s"><span class="pl-pds">'</span>JAMES<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ 2</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">1</span>]);
<span class="pl-c">// ⮕ 1</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">1</span>, <span class="pl-c1">2</span>]);
<span class="pl-c">// ❌ ValidationError: type.enum at /: Must be equal to one of 0,1,2</span>
</code></pre><p>Other values follow <a href="#coerce-to-a-const"><code>const</code> coercion rules</a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-c1">1970</span>, <span class="pl-k">new</span> <span class="pl-c1">Date</span>(<span class="pl-c1">0</span>)]).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-c1">String</span>(<span class="pl-s"><span class="pl-pds">'</span>1970<span class="pl-pds">'</span></span>));
<span class="pl-c">// ⮕ 1970</span>

<span class="pl-smi">shape2</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">0</span>);
<span class="pl-c">// ⮕ Date { Jan 1, 1970 }</span>
</code></pre><h1 id="function-fn"><a class="markdown-permalink" href="#function-fn"><span class="icon icon-link"></span></a><code>function</code>, <code>fn</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.function.html"><code>d.function</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.FunctionShape.html"><code>FunctionShape</code> <sup>↗</sup></a> instance.</p><p>Constrain a value to be a function with the given signature.</p><p>A function that has no arguments and returns <code>any</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">function</span>();
<span class="pl-c">// ⮕ Shape&#x3C;() => any></span>

<span class="pl-c">// or use a shorter alias</span>
<span class="pl-smi">d</span>.<span class="pl-en">fn</span>();
</code></pre><p>Provide an array of argument shapes:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">fn</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;(arg1: string, arg2: number) => any></span>
</code></pre><p>Or provide a shape that constrains an array of arguments:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">fn</span>(<span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()));
<span class="pl-c">// ⮕ Shape&#x3C;(...args: string[]) => any></span>
</code></pre><p>Any shape that constrains an array type would do, you can even use a union:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">fn</span>(
  <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
    <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()),
    <span class="pl-smi">d</span>.<span class="pl-en">tuple</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]),
  ])
);
<span class="pl-c">// ⮕ Shape&#x3C;(...args: string[] | [string, number]) => any></span>
</code></pre><p>To constrain the return value of a function shape, use the <code>return</code> method.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">fn</span>().<span class="pl-en">return</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>());
<span class="pl-c">// ⮕ Shape&#x3C;() => string></span>
</code></pre><p>To constrain a value of <code>this</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">fn</span>().<span class="pl-en">this</span>(<span class="pl-smi">d</span>.<span class="pl-en">object</span>({ userId: <span class="pl-smi">d</span>.<span class="pl-smi">string</span> }));
<span class="pl-c">// ⮕ Shape&#x3C;(this: { userId: string }) => any></span>
</code></pre><h2 id="parsing-a-function"><a class="markdown-permalink" href="#parsing-a-function"><span class="icon icon-link"></span></a>Parsing a function</h2><p>Function shapes check that an input value is a function:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">fn</span>();

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(() <span class="pl-k">=></span> <span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ () => any</span>

<span class="pl-smi">shape1</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.function at /: Must be a function</span>
</code></pre><p>By default, the input function is returned as-is during parsing. If you want a parsed function to be type-safe at runtime use <code>strict</code> method to <a href="#ensuring-function-signature">ensure the parsed function signature</a>.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">callbackShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">fn</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>()]).<span class="pl-en">return</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>()).<span class="pl-en">strict</span>();

<span class="pl-k">const</span> <span class="pl-c1">callback</span> <span class="pl-k">=</span> <span class="pl-smi">callbackShape</span>.<span class="pl-c1">parse</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-c1">parseInt</span>(<span class="pl-smi">value</span>));
<span class="pl-c">// ⮕ (arg: string) => number</span>
</code></pre><p><code>callback</code> ensures that the argument is string and the returned value is a number, or throws a <code>ValidationError</code> if types are invalid at runtime.</p><h2 id="ensuring-function-signature"><a class="markdown-permalink" href="#ensuring-function-signature"><span class="icon icon-link"></span></a>Ensuring function signature</h2><p>You can ensure a function signature type-safety at runtime.</p><p>Let's declare a function shape that takes two number arguments and returns a number as well:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">sumShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">fn</span>([<span class="pl-smi">d</span>.<span class="pl-en">number</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]).<span class="pl-en">return</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;(arg1: number, arg2: number) => number></span>
</code></pre><p>Now let's ensure a signature of a particular function:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">sum</span> <span class="pl-k">=</span> <span class="pl-smi">sumShape</span>.<span class="pl-en">ensure</span>((<span class="pl-v">arg1</span>, <span class="pl-v">arg2</span>) <span class="pl-k">=></span> <span class="pl-smi">arg1</span> <span class="pl-k">+</span> <span class="pl-smi">arg2</span>);
<span class="pl-c">// ⮕ (arg1: number, arg2: number) => number</span>

<span class="pl-en">sum</span>(<span class="pl-c1">2</span>, <span class="pl-c1">3</span>);
<span class="pl-c">// ⮕ 5</span>
</code></pre><p><code>sum</code> would throw a <a href="#validation-errors"><code>ValidationError</code></a> if the required signature is violated at runtime:</p><pre><code class="language-ts"><span class="pl-en">sum</span>(<span class="pl-c1">2</span>, <span class="pl-s"><span class="pl-pds">'</span>3<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.number at /arguments/1: Must be a number</span>

<span class="pl-en">sum</span>(<span class="pl-c1">NaN</span>, <span class="pl-c1">2</span>);
<span class="pl-c">// ❌ ValidationError: type.number at /arguments/0: Must be an number</span>

<span class="pl-en">sum</span>(<span class="pl-c1">1</span>, <span class="pl-c1">2</span>, <span class="pl-c1">3</span>);
<span class="pl-c">// ❌ ValidationError: array.max at /arguments: Must have the maximum length of 2</span>
</code></pre><p>Using function shape you can parse <code>this</code> and return values as well.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">callbackShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">fn</span>([<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>()]).<span class="pl-en">this</span>(<span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>())).<span class="pl-en">return</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>());
<span class="pl-c">// ⮕ Shape&#x3C;(this: string[], arg: number) => string></span>

<span class="pl-k">const</span> <span class="pl-c1">callback</span> <span class="pl-k">=</span> <span class="pl-smi">callbackShape</span>.<span class="pl-en">ensure</span>(<span class="pl-k">function</span> (<span class="pl-v">index</span>) {
  <span class="pl-c">// 🟡 May be undefined if index is out of bounds</span>
  <span class="pl-k">return</span> <span class="pl-c1">this</span>[<span class="pl-smi">index</span>];
});
</code></pre><p>When called with a valid index, a string is returned:</p><pre><code class="language-ts"><span class="pl-smi">callback</span>.<span class="pl-c1">call</span>([<span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Sarah<span class="pl-pds">'</span></span>], <span class="pl-c1">1</span>);
<span class="pl-c">// ⮕ 'Sarah'</span>
</code></pre><p>But if an index is out of bounds, an error is thrown:</p><pre><code class="language-ts"><span class="pl-smi">callback</span>.<span class="pl-c1">call</span>([<span class="pl-s"><span class="pl-pds">'</span>James<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Bob<span class="pl-pds">'</span></span>], <span class="pl-c1">33</span>);
<span class="pl-c">// ❌ ValidationError: type.string at /return: Must be a string</span>
</code></pre><p>An error is thrown if an argument isn't an integer:</p><pre><code class="language-ts"><span class="pl-smi">callback</span>.<span class="pl-c1">call</span>([<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Tess<span class="pl-pds">'</span></span>], <span class="pl-c1">3.14</span>);
<span class="pl-c">// ❌ ValidationError: number.int at /arguments/0: Must be an integer</span>
</code></pre><h2 id="coercing-arguments"><a class="markdown-permalink" href="#coercing-arguments"><span class="icon icon-link"></span></a>Coercing arguments</h2><p>Function shapes go well with <a href="#type-coercion">type coercion</a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">plus2Shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">fn</span>([<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">coerce</span>()]).<span class="pl-en">return</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;(arg: number) => number></span>

<span class="pl-k">const</span> <span class="pl-c1">plus2</span> <span class="pl-k">=</span> <span class="pl-smi">plus2Shape</span>.<span class="pl-en">ensure</span>(<span class="pl-v">arg</span> <span class="pl-k">=></span> <span class="pl-smi">arg</span> <span class="pl-k">+</span> <span class="pl-c1">2</span>);
<span class="pl-c">// ⮕ (arg: number) => number</span>
</code></pre><p>While <code>plus2</code> requires a single integer parameter, we can call it at runtime with a number-like string and get an expected numeric result because an argument is coerced:</p><pre><code class="language-ts"><span class="pl-en">plus2</span>(<span class="pl-s"><span class="pl-pds">'</span>40<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 42</span>
</code></pre><h2 id="transforming-arguments-and-return-values"><a class="markdown-permalink" href="#transforming-arguments-and-return-values"><span class="icon icon-link"></span></a>Transforming arguments and return values</h2><p>Here's a function shape that converts a string argument to a number:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">fn</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-smi">parseFloat</span>)]);
<span class="pl-c">// ⮕ Shape&#x3C;(arg: number) => any, (arg: string) => any></span>
</code></pre><p>Note that the input and output functions described by this shape have different signatures. Let's implement of this function:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">inputFunction</span>(<span class="pl-v">arg</span><span class="pl-k">:</span> <span class="pl-c1">number</span>)<span class="pl-k">:</span> <span class="pl-c1">any</span> {
  <span class="pl-k">return</span> <span class="pl-smi">arg</span> <span class="pl-k">+</span> <span class="pl-c1">2</span>;
}

<span class="pl-k">const</span> <span class="pl-c1">outputFunction</span> <span class="pl-k">=</span> <span class="pl-smi">shape</span>.<span class="pl-en">ensure</span>(<span class="pl-smi">inputFunction</span>);
<span class="pl-c">// ⮕ (arg: string) => any</span>
</code></pre><p>The pseudocode below demonstrates the inner workings of the <code>outputFunction</code>:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">outputFunction</span>(<span class="pl-k">...</span><span class="pl-v">inputArgs</span>) {
  <span class="pl-k">const</span> <span class="pl-c1">outputThis</span> <span class="pl-k">=</span> <span class="pl-smi">shape</span>.<span class="pl-smi">thisShape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">this</span>);

  <span class="pl-k">const</span> <span class="pl-c1">outputArgs</span> <span class="pl-k">=</span> <span class="pl-smi">shape</span>.<span class="pl-smi">argsShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">inputArgs</span>);

  <span class="pl-k">const</span> <span class="pl-c1">inputResult</span> <span class="pl-k">=</span> <span class="pl-smi">inputFunction</span>.<span class="pl-c1">apply</span>(<span class="pl-smi">outputThis</span>, <span class="pl-smi">outputArgs</span>);

  <span class="pl-k">const</span> <span class="pl-c1">outputResult</span> <span class="pl-k">=</span> <span class="pl-smi">shape</span>.<span class="pl-smi">resultShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">inputResult</span>);

  <span class="pl-k">return</span> <span class="pl-smi">outputResult</span>;
}
</code></pre><h1 id="instanceof"><a class="markdown-permalink" href="#instanceof"><span class="icon icon-link"></span></a><code>instanceOf</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.instanceOf.html"><code>d.instanceOf</code> <sup>↗</sup></a> returns an <a href="https://smikhalevski.github.io/doubter/classes/core.InstanceShape.html"><code>InstanceShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be an object that is an instance of a class:</p><pre><code class="language-ts"><span class="pl-k">class</span> <span class="pl-en">User</span> {
  <span class="pl-v">name</span><span class="pl-k">?:</span> <span class="pl-c1">string</span>;
}

<span class="pl-smi">d</span>.<span class="pl-en">instanceOf</span>(<span class="pl-smi">User</span>);
<span class="pl-c">// ⮕ Shape&#x3C;User></span>
</code></pre><h1 id="intersection-and"><a class="markdown-permalink" href="#intersection-and"><span class="icon icon-link"></span></a><code>intersection</code>, <code>and</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.intersection.html"><code>d.intersection</code> <sup>↗</sup></a> returns an <a href="https://smikhalevski.github.io/doubter/classes/core.IntersectionShape.html"><code>IntersectionShape</code> <sup>↗</sup></a> instance.</p><p>Creates a shape that checks that the input value conforms to all shapes.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">intersection</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  }),
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
  }),
]);
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string } &#x26; { age: number }></span>
</code></pre><p>Or use a shorter alias <code>and</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">and</span>([<span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()), <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>Peter<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Paul<span class="pl-pds">'</span></span>]))]);
<span class="pl-c">// ⮕ Shape&#x3C;string[] &#x26; Array&#x3C;'Peter' | 'Paul'>></span>
</code></pre><h2 id="intersecting-objects"><a class="markdown-permalink" href="#intersecting-objects"><span class="icon icon-link"></span></a>Intersecting objects</h2><p>When working with objects, <a href="#extending-objects">extend objects</a> instead of intersecting them whenever possible, since object shapes are more performant than object intersection shapes.</p><p>There's a logical difference between extended and intersected objects. Let's consider two shapes that both contain the same key:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>(),
});

<span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  <span class="pl-c">// 🟡 Notice that the type of foo property in shape2 differs from shape1.</span>
  foo: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});
</code></pre><p>When you <a href="#extending-objects">extend an object</a> properties of the left object are overwritten with properties of the right object:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">shape1</span>.<span class="pl-en">extend</span>(<span class="pl-smi">shape2</span>);
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: number, bar: boolean }></span>
</code></pre><p>The intersection requires the input value to conform both shapes at the same time, it's not possible since there are no values that can satisfy the <code>string | number</code> type. So the type of property <code>foo</code> becomes <code>never</code> and no value would be able to satisfy the resulting intersection shape.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">and</span>([<span class="pl-smi">shape1</span>, <span class="pl-smi">shape2</span>]);
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: never, bar: boolean }></span>
</code></pre><h1 id="lazy"><a class="markdown-permalink" href="#lazy"><span class="icon icon-link"></span></a><code>lazy</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.lazy.html"><code>d.lazy</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.LazyShape.html"><code>LazyShape</code> <sup>↗</sup></a> instance.</p><p>With <code>lazy</code> you can declare recursive shapes. To showcase how to use it, let's create a shape that validates JSON data:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">type</span> <span class="pl-en">JSON</span> <span class="pl-k">=</span>
  <span class="pl-k">|</span> <span class="pl-c1">number</span>
  <span class="pl-k">|</span> <span class="pl-c1">string</span>
  <span class="pl-k">|</span> <span class="pl-c1">boolean</span>
  <span class="pl-k">|</span> <span class="pl-c1">null</span>
  <span class="pl-k">|</span> <span class="pl-en">JSON</span>[]
  <span class="pl-k">|</span> { [<span class="pl-v">key</span><span class="pl-k">:</span> <span class="pl-c1">string</span>]<span class="pl-k">:</span> <span class="pl-en">JSON</span> };

<span class="pl-k">const</span> <span class="pl-c1">jsonShape</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Shape</span>&#x3C;<span class="pl-en">JSON</span>> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">lazy</span>(() <span class="pl-k">=></span>
  <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
    <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
    <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
    <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>(),
    <span class="pl-smi">d</span>.<span class="pl-en">null</span>(),
    <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">jsonShape</span>),
    <span class="pl-smi">d</span>.<span class="pl-en">record</span>(<span class="pl-smi">jsonShape</span>),
  ])
);

<span class="pl-smi">jsonShape</span>.<span class="pl-c1">parse</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span> });
<span class="pl-c">// ⮕ { name: 'Jill' }</span>

<span class="pl-smi">jsonShape</span>.<span class="pl-c1">parse</span>({ tag: <span class="pl-c1">Symbol</span>() });
<span class="pl-c">// ❌ ValidationError: type.union at /tag: Must conform the union</span>
</code></pre><p>Note that the <code>JSON</code> type is defined explicitly, because it cannot be inferred from the shape which references itself directly in its own initializer.</p><p>You can also use <code>d.lazy</code> like this:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">jsonShape</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Shape</span>&#x3C;<span class="pl-en">JSON</span>> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
  <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>(),
  <span class="pl-smi">d</span>.<span class="pl-en">null</span>(),
  <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">d</span>.<span class="pl-en">lazy</span>(() <span class="pl-k">=></span> <span class="pl-smi">jsonShape</span>)),
  <span class="pl-smi">d</span>.<span class="pl-en">record</span>(<span class="pl-smi">d</span>.<span class="pl-en">lazy</span>(() <span class="pl-k">=></span> <span class="pl-smi">jsonShape</span>)),
]);
</code></pre><h2 id="circular-object-references"><a class="markdown-permalink" href="#circular-object-references"><span class="icon icon-link"></span></a>Circular object references</h2><p>Doubter supports circular object references out-of-the-box:</p><pre><code class="language-ts"><span class="pl-k">interface</span> <span class="pl-en">User</span> {
  <span class="pl-v">friends</span><span class="pl-k">:</span> <span class="pl-en">User</span>[];
}

<span class="pl-k">const</span> <span class="pl-c1">hank</span><span class="pl-k">:</span> <span class="pl-en">User</span> <span class="pl-k">=</span> {
  friends: [],
};

<span class="pl-c">// 🟡 The circular reference</span>
<span class="pl-smi">hank</span>.<span class="pl-smi">friends</span>.<span class="pl-c1">push</span>(<span class="pl-smi">hank</span>);

<span class="pl-k">const</span> <span class="pl-c1">userShape1</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Shape</span>&#x3C;<span class="pl-en">User</span>> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">lazy</span>(() <span class="pl-k">=></span>
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    friends: <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">userShape1</span>),
  })
);

<span class="pl-smi">userShape1</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">hank</span>);
<span class="pl-c">// ⮕ hank</span>

<span class="pl-smi">userShape1</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">hank</span>).<span class="pl-smi">friends</span>[<span class="pl-c1">0</span>];
<span class="pl-c">// ⮕ hank</span>
</code></pre><p>You can replace circular references with a replacement value:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userShape2</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Shape</span>&#x3C;<span class="pl-en">User</span>> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">lazy</span>(() <span class="pl-k">=></span>
    <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
      friends: <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">userShape2</span>),
    })
  )
  .<span class="pl-en">circular</span>(<span class="pl-s"><span class="pl-pds">'</span>Me and Myself<span class="pl-pds">'</span></span>);

<span class="pl-smi">userShape1</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">hank</span>);
<span class="pl-c">// ⮕ hank</span>

<span class="pl-smi">userShape2</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">hank</span>).<span class="pl-smi">friends</span>[<span class="pl-c1">0</span>];
<span class="pl-c">// ⮕ 'Me and Myself'</span>
</code></pre><p>You can <a href="https://smikhalevski.github.io/doubter/classes/core.LazyShape.html#circular">provide a callback <sup>↗</sup></a> that returns a value that is used as a replacement value for circular references. Or it can throw a <a href="#validation-errors"><code>ValidationError</code></a> from the callback to indicate that circular references aren't allowed:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userShape3</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Shape</span>&#x3C;<span class="pl-en">User</span>> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">lazy</span>(() <span class="pl-k">=></span>
    <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
      friends: <span class="pl-smi">d</span>.<span class="pl-en">array</span>(<span class="pl-smi">userShape3</span>),
    })
  )
  .<span class="pl-en">circular</span>((<span class="pl-v">input</span>, <span class="pl-v">options</span>) <span class="pl-k">=></span> {
    <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-smi">d</span>.<span class="pl-en">ValidationError</span>([{ code: <span class="pl-s"><span class="pl-pds">'</span>kaputs<span class="pl-pds">'</span></span> }]);
  });

<span class="pl-smi">userShape1</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">hank</span>);
<span class="pl-c">// ❌ ValidationError: kaputs at /friends/0</span>
</code></pre><p>By default, Doubter neither parses nor validates an object if it was already seen, and returns such object as is. This behaviour was chosen as the default for <code>d.lazy</code> because otherwise the result would be ambiguous when conversions are introduced.</p><pre><code class="language-ts"><span class="pl-k">interface</span> <span class="pl-en">Foo</span> {
  <span class="pl-v">bar</span><span class="pl-k">?:</span> <span class="pl-en">Foo</span>;
}

<span class="pl-k">const</span> <span class="pl-c1">foo</span><span class="pl-k">:</span> <span class="pl-en">Foo</span> <span class="pl-k">=</span> {};

<span class="pl-smi">foo</span>.<span class="pl-smi">bar</span> <span class="pl-k">=</span> <span class="pl-smi">foo</span>;

<span class="pl-k">const</span> <span class="pl-c1">fooShape</span><span class="pl-k">:</span> <span class="pl-en">d</span>.<span class="pl-en">Shape</span>&#x3C;<span class="pl-en">Foo</span>, <span class="pl-c1">string</span>> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">lazy</span>(() <span class="pl-k">=></span>
    <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
      bar: <span class="pl-smi">fooShape</span>.<span class="pl-en">optional</span>(),
    })
  )
  .<span class="pl-en">convert</span>(<span class="pl-v">output</span> <span class="pl-k">=></span> {
    <span class="pl-c">//     ⮕ {bar?: Foo} | {bar?: string}</span>

    <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>;
  });

<span class="pl-smi">fooShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">foo</span>);
<span class="pl-c">// ⮕ 'hello'</span>
</code></pre><h1 id="map"><a class="markdown-permalink" href="#map"><span class="icon icon-link"></span></a><code>map</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.map.html"><code>d.map</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.MapShape.html"><code>MapShape</code> <sup>↗</sup></a> instance.</p><p>Constrains an input to be a <code>Map</code> instance:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">map</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Map&#x3C;string, number>></span>
</code></pre><p>Mark a <code>Map</code> as readonly:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">map</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()).<span class="pl-en">readonly</span>();
<span class="pl-c">// ⮕ Shape&#x3C;Map&#x3C;string, number>, ReadonlyMap&#x3C;string, number>></span>
</code></pre><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>Marking a <code>Map</code> as readonly, only affects type checking. At runtime, you would still be able to set and delete items.</p></div><h2 id="coerce-to-a-map"><a class="markdown-permalink" href="#coerce-to-a-map"><span class="icon icon-link"></span></a>Coerce to a <code>Map</code></h2><p>Arrays, iterables and array-like objects that withhold entry-like elements (a tuple with two elements) are converted to <code>Map</code> entries via <code>Array.from(value)</code>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">map</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([
  [<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-c1">0.1199</span>],
  [<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>, <span class="pl-c1">5.3361</span>],
]);
<span class="pl-c">// ⮕ Map { 'Mars' → 0.1199, 'Pluto' → 5.3361 }</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-s"><span class="pl-pds">'</span>Jake<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ❌ ValidationError: type.map at /: Must be a Map</span>
</code></pre><p>Other objects are converted to an array of entries via <code>new Map(Object.entries(value))</code>:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>({
  Jake: <span class="pl-c1">31</span>,
  Jill: <span class="pl-c1">28</span>,
});
<span class="pl-c">// ⮕ Map { 'Jake' → 31, 'Jill' → 28 }</span>
</code></pre><h1 id="nan"><a class="markdown-permalink" href="#nan"><span class="icon icon-link"></span></a><code>nan</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.nan.html"><code>d.nan</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.ConstShape.html"><code>ConstShape</code> <sup>↗</sup></a> instance.</p><p>The shape that requires an input to be <code>NaN</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">nan</span>();
<span class="pl-c">// ⮕ Shape&#x3C;number></span>
</code></pre><p>If you want to constrain a number and allow <code>NaN</code> values, use <a href="#number"><code>number</code></a>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">nan</span>();
<span class="pl-c">// ⮕ Shape&#x3C;number></span>
</code></pre><h1 id="never"><a class="markdown-permalink" href="#never"><span class="icon icon-link"></span></a><code>never</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.never.html"><code>d.never</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.NeverShape.html"><code>NeverShape</code> <sup>↗</sup></a> instance.</p><p>The shape that always raises a validation issue regardless of an input value:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">never</span>();
<span class="pl-c">// ⮕ Shape&#x3C;never></span>
</code></pre><h1 id="not"><a class="markdown-permalink" href="#not"><span class="icon icon-link"></span></a><code>not</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.not.html"><code>d.not</code> <sup>↗</sup></a> returns an <a href="https://smikhalevski.github.io/doubter/classes/core.ExcludeShape.html"><code>ExcludeShape</code> <sup>↗</sup></a> instance.</p><p>The shape that allows any value that doesn't conform the negated shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">not</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>());
<span class="pl-c">// ⮕ Shape&#x3C;any></span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: any.exclude at /: Must not conform the excluded shape</span>
</code></pre><p>More about exclusions in the <a href="#exclude-a-shape">Exclude a shape</a> section.</p><h1 id="null"><a class="markdown-permalink" href="#null"><span class="icon icon-link"></span></a><code>null</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.null.html"><code>d.null</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.ConstShape.html"><code>ConstShape</code> <sup>↗</sup></a> instance.</p><p>The shape that requires an input to be <code>null</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">null</span>();
<span class="pl-c">// ⮕ Shape&#x3C;null></span>
</code></pre><h1 id="number"><a class="markdown-permalink" href="#number"><span class="icon icon-link"></span></a><code>number</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.number.html"><code>d.number</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.NumberShape.html"><code>NumberShape</code> <sup>↗</sup></a> instance.</p><p>The shape that requires an input to be a number.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>();
<span class="pl-c">// ⮕ Shape&#x3C;number></span>
</code></pre><p>Allow <code>NaN</code> input values:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">nan</span>();
<span class="pl-c">// ⮕ Shape&#x3C;number></span>
</code></pre><p>Replace <code>NaN</code> with a default value:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">nan</span>(<span class="pl-c1">0</span>).<span class="pl-c1">parse</span>(<span class="pl-c1">NaN</span>);
<span class="pl-c">// ⮕ 0</span>
</code></pre><p>Limit the allowed range:</p><pre><code class="language-ts"><span class="pl-c">// The number must be greater than 5 and less then or equal to 10</span>
<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">gt</span>(<span class="pl-c1">0.5</span>).<span class="pl-en">lte</span>(<span class="pl-c1">2.5</span>);
<span class="pl-c">// ⮕ Shape&#x3C;number></span>
</code></pre><p>Constrain a number to be a multiple of a divisor:</p><pre><code class="language-ts"><span class="pl-c">// Number must be divisible by 5 without a remainder</span>
<span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">multipleOf</span>(<span class="pl-c1">5</span>);
</code></pre><p>Constrain the number to be an integer:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>();
</code></pre><p>Constrain the input to be a finite number (not <code>NaN</code>, <code>Infinity</code> or <code>-Infinity</code>):</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">finite</span>();
</code></pre><h2 id="coerce-to-a-number"><a class="markdown-permalink" href="#coerce-to-a-number"><span class="icon icon-link"></span></a>Coerce to a number</h2><p><code>null</code> and <code>undefined</code> values are converted to 0:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">null</span>);
<span class="pl-c">// ⮕ 0</span>
</code></pre><p>Strings, boolean values and <code>Date</code> objects are converted using <code>+value</code>:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>42<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>seventeen<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: type.number at /: Must be a number</span>
</code></pre><p>Arrays with a single element are unwrapped and the value is coerced:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-k">new</span> <span class="pl-c1">Date</span>(<span class="pl-s"><span class="pl-pds">'</span>2023-01-22<span class="pl-pds">'</span></span>)]);
<span class="pl-c">// ⮕ 1674345600000</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">1997</span>, <span class="pl-c1">1998</span>]);
<span class="pl-c">// ❌ ValidationError: type.number at /: Must be a number</span>
</code></pre><h1 id="object"><a class="markdown-permalink" href="#object"><span class="icon icon-link"></span></a><code>object</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.object.html"><code>d.object</code> <sup>↗</sup></a> returns an <a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html"><code>ObjectShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be an object with a set of properties:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string, age: number }></span>
</code></pre><p>Make an object readonly:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
}).<span class="pl-en">readonly</span>();
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string }, { readonly name: string }></span>
</code></pre><h2 id="optional-properties"><a class="markdown-permalink" href="#optional-properties"><span class="icon icon-link"></span></a>Optional properties</h2><p>If the inferred type of the property shape is a union with <code>undefined</code> then the property becomes optional:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">optional</span>(),
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ name?: string | undefined, age: number }></span>
</code></pre><p>Or you can define optional properties as a union with <a href="#undefined"><code>d.undefined</code></a>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">undefined</span>()]),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ name?: string | undefined }></span>
</code></pre><p>If the conversion result extends <code>undefined</code> then the output property becomes optional:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> (<span class="pl-smi">value</span> <span class="pl-k">!==</span> <span class="pl-s"><span class="pl-pds">'</span>Google<span class="pl-pds">'</span></span> <span class="pl-k">?</span> <span class="pl-smi">value</span> <span class="pl-k">:</span> <span class="pl-c1">undefined</span>)),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string }, { name?: string | undefined }></span>
</code></pre><h2 id="index-signature"><a class="markdown-permalink" href="#index-signature"><span class="icon icon-link"></span></a>Index signature</h2><p>Add an index signature to the object type, so all properties that aren't listed explicitly are validated with the rest shape:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: string, bar: number }></span>

<span class="pl-k">const</span> <span class="pl-c1">restShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
]);
<span class="pl-c">// ⮕ Shape&#x3C;string | number></span>

<span class="pl-smi">shape</span>.<span class="pl-en">rest</span>(<span class="pl-smi">restShape</span>);
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: string, bar: number, [key: string]: string | number }></span>
</code></pre><p>Unlike an index signature in TypeScript, a rest shape is applied only to keys that aren't explicitly specified among object property shapes.</p><h2 id="unknown-keys"><a class="markdown-permalink" href="#unknown-keys"><span class="icon icon-link"></span></a>Unknown keys</h2><p>Keys that aren't defined explicitly can be handled in several ways:</p><ul><li>constrained by the <a href="#index-signature">rest shape</a>;</li><li>stripped;</li><li>preserved as is, this is the default behavior;</li><li>prohibited.</li></ul><p>Force an object to have only known keys. If an unknown key is met, a validation issue is raised.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
}).<span class="pl-en">exact</span>();
</code></pre><p>Strip unknown keys, so the object is cloned if an unknown key is met, and only known keys are preserved.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
}).<span class="pl-en">strip</span>();
</code></pre><p>Derive the new shape and override the strategy for unknown keys:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({ foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>() }).<span class="pl-en">exact</span>();

<span class="pl-c">// Unknonwn keys are now preserved</span>
<span class="pl-smi">shape</span>.<span class="pl-en">preserve</span>();
</code></pre><h2 id="picking-and-omitting-properties"><a class="markdown-permalink" href="#picking-and-omitting-properties"><span class="icon icon-link"></span></a>Picking and omitting properties</h2><p>Picking keys from an object creates the new shape that contains only listed keys:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});

<span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">shape1</span>.<span class="pl-en">pick</span>([<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: string }></span>
</code></pre><p>Omitting keys of an object creates the new shape that contains all keys except listed ones:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});

<span class="pl-smi">shape</span>.<span class="pl-en">omit</span>([<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;{ bar: number }></span>
</code></pre><h2 id="extending-objects"><a class="markdown-permalink" href="#extending-objects"><span class="icon icon-link"></span></a>Extending objects</h2><p>Add new properties to the object shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
});

<span class="pl-smi">shape</span>.<span class="pl-en">extend</span>({
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string, age: number }></span>
</code></pre><p>Merging object shapes preserves the index signature of the left-hand shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">fooShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">object</span>({
    foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  })
  .<span class="pl-en">rest</span>(<span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]));

<span class="pl-k">const</span> <span class="pl-c1">barShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});

<span class="pl-smi">fooShape</span>.<span class="pl-en">extend</span>(<span class="pl-smi">barShape</span>);
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: string, bar: number, [key: string]: string | number }></span>
</code></pre><h2 id="making-objects-partial-and-required"><a class="markdown-permalink" href="#making-objects-partial-and-required"><span class="icon icon-link"></span></a>Making objects partial and required</h2><p>Object properties are optional if their type extends <code>undefined</code>. Derive an object shape that would have its properties all marked as optional:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape1</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});

<span class="pl-smi">shape1</span>.<span class="pl-en">partial</span>();
<span class="pl-c">// ⮕ Shape&#x3C;{ foo?: string | undefined, bar?: number | undefined }></span>
</code></pre><p>Specify which fields should be marked as optional:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape2</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});

<span class="pl-smi">shape2</span>.<span class="pl-en">partial</span>([<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;{ foo?: string | undefined, bar: number }></span>
</code></pre><p>In the same way, properties that are optional can be made required:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape3</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">optional</span>(),
  bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});

<span class="pl-smi">shape3</span>.<span class="pl-en">required</span>([<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;{ foo: string, bar: number }></span>
</code></pre><p>Note that <code>required</code> would force the value of both input and output to be non-<code>undefined</code>.</p><h2 id="object-keys"><a class="markdown-permalink" href="#object-keys"><span class="icon icon-link"></span></a>Object keys</h2><p>Derive a shape that constrains keys of an object:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
});

<span class="pl-smi">shape</span>.<span class="pl-smi">keysShape</span>;
<span class="pl-c">// ⮕ Shape&#x3C;'name' | 'age'></span>
</code></pre><h2 id="key-relationships"><a class="markdown-permalink" href="#key-relationships"><span class="icon icon-link"></span></a>Key relationships</h2><p>Declare relationships between object keys using <a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#allkeys"><code>allKeys</code> <sup>↗</sup></a> <a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#notallkeys"><code>notAllKeys</code> <sup>↗</sup></a> <a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#orkeys"><code>orKeys</code> <sup>↗</sup></a> <a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#xorkeys"><code>xorKeys</code> <sup>↗</sup></a> <a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#oxorkeys"><code>oxorKeys</code> <sup>↗</sup></a></p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">object</span>({
    foo: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
    bar: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
    baz: <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>(),
  })
  .<span class="pl-en">partial</span>()
  .<span class="pl-en">xorKeys</span>([<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>]);

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>({ foo: <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, bar: <span class="pl-c1">42</span> });
<span class="pl-c">// ❌ ValidationError: object.xorKeys at /: Must contain exactly one key: foo,bar</span>
</code></pre><h1 id="promise"><a class="markdown-permalink" href="#promise"><span class="icon icon-link"></span></a><code>promise</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.promise.html"><code>d.promise</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.PromiseShape.html"><code>PromiseShape</code> <sup>↗</sup></a> instance.</p><p>The shape that checks that an input is an instance of <code>Promise</code>.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">promise</span>();
<span class="pl-c">// ⮕ Shape&#x3C;Promise&#x3C;any>></span>
</code></pre><p>Constrain a resolved value of a promise:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">promise</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Promise&#x3C;string>></span>
</code></pre><p>Convert a value inside a promise:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">promise</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">convert</span>(<span class="pl-smi">parseFloat</span>));
<span class="pl-c">// ⮕ Shape&#x3C;Promise&#x3C;string>, Promise&#x3C;number>></span>
</code></pre><h2 id="coerce-to-a-promise"><a class="markdown-permalink" href="#coerce-to-a-promise"><span class="icon icon-link"></span></a>Coerce to a <code>Promise</code></h2><p>All values are converted to a promise by wrapping it in <code>Promise.resolve()</code>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">promise</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>()).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-en">parseAsync</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ Promise&#x3C;number></span>
</code></pre><h1 id="record"><a class="markdown-permalink" href="#record"><span class="icon icon-link"></span></a><code>record</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.record.html"><code>d.record</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.RecordShape.html"><code>RecordShape</code> <sup>↗</sup></a> instance.</p><p>Constrain keys and values of a dictionary-like object:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">record</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Record&#x3C;string, number>></span>
</code></pre><p>Constrain both keys and values of a dictionary-like object:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">record</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Record&#x3C;string, number>></span>
</code></pre><p>Pass any shape that extends <code>Shape&#x3C;string></code> as a key constraint:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">keysShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Shape&#x3C;'foo' | 'bar'></span>

<span class="pl-smi">d</span>.<span class="pl-en">record</span>(<span class="pl-smi">keysShape</span>, <span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Record&#x3C;'foo' | 'bar', number>></span>
</code></pre><p>Make a record readonly:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">record</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>()).<span class="pl-en">readonly</span>();
<span class="pl-c">// ⮕ Shape&#x3C;Record&#x3C;string, number>, Readonly&#x3C;Record&#x3C;string, number>>></span>
</code></pre><h1 id="set"><a class="markdown-permalink" href="#set"><span class="icon icon-link"></span></a><code>set</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.set.html"><code>d.set</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.SetShape.html"><code>SetShape</code> <sup>↗</sup></a> instance.</p><p>Constrains an input to be a <code>Set</code> instance:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-c1">set</span>(<span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Set&#x3C;number>></span>
</code></pre><p>Constrain the size of a <code>Set</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-c1">set</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">min</span>(<span class="pl-c1">1</span>).<span class="pl-en">max</span>(<span class="pl-c1">10</span>);
</code></pre><p>Limit both minimum and maximum size at the same time:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-c1">set</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">size</span>(<span class="pl-c1">5</span>);
</code></pre><p>Mark a <code>Set</code> as readonly:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-c1">set</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">readonly</span>();
<span class="pl-c">// ⮕ Shape&#x3C;Set&#x3C;string>, ReadonlySet&#x3C;string>></span>
</code></pre><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>Marking a <code>Set</code> as readonly, only affects type checking. At runtime, you would still be able to add and delete items.</p></div><h2 id="coerce-to-a-set"><a class="markdown-permalink" href="#coerce-to-a-set"><span class="icon icon-link"></span></a>Coerce to a <code>Set</code></h2><p>Arrays, iterables and array-like objects converted to <code>Set</code> values via <code>Array.from(value)</code>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-c1">set</span>(<span class="pl-smi">d</span>.<span class="pl-en">string</span>()).<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-s"><span class="pl-pds">'</span>Boris<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>K<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ⮕ Set { 'Boris', 'K' }</span>
</code></pre><p>Scalars, non-iterable and non-array-like objects are wrapped into an array:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>J<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Set { 'J' }</span>
</code></pre><h1 id="string"><a class="markdown-permalink" href="#string"><span class="icon icon-link"></span></a><code>string</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.string.html"><code>d.string</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.StringShape.html"><code>StringShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be string.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>();
<span class="pl-c">// ⮕ Shape&#x3C;string></span>
</code></pre><p>Constrain the string length limits:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">min</span>(<span class="pl-c1">1</span>).<span class="pl-en">max</span>(<span class="pl-c1">10</span>);
</code></pre><p>Limit both minimum and maximum string length at the same time:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">length</span>(<span class="pl-c1">5</span>);
</code></pre><p>Constrain a string with a regular expression:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">regex</span>(<span class="pl-s"><span class="pl-sr"><span class="pl-pds">/</span>foo<span class="pl-k">|</span>bar<span class="pl-pds">/</span></span></span>);
</code></pre><h2 id="coerce-to-a-string"><a class="markdown-permalink" href="#coerce-to-a-string"><span class="icon icon-link"></span></a>Coerce to a string</h2><p><code>null</code> and <code>undefined</code> are converted to an empty string:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">coerce</span>();

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">null</span>);
<span class="pl-c">// ⮕ ''</span>
</code></pre><p>Finite numbers, boolean and bigint values are converted via <code>String(value)</code>:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">BigInt</span>(<span class="pl-c1">2398955</span>));
<span class="pl-c">// ⮕ '2398955'</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">8080</span>);
<span class="pl-c">// ⮕ '8080'</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">-</span><span class="pl-c1">Infinity</span>);
<span class="pl-c">// ❌ ValidationError: type.string at /: Must be a string</span>
</code></pre><p>Valid dates are converted to an ISO formatted string:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-c1">Date</span>(<span class="pl-c1">1674352106419</span>));
<span class="pl-c">// ⮕ '2023-01-22T01:48:26.419Z'</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">new</span> <span class="pl-c1">Date</span>(<span class="pl-c1">NaN</span>));
<span class="pl-c">// ❌ ValidationError: type.string at /: Must be a string</span>
</code></pre><p>Arrays with a single element are unwrapped and the value is coerced:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-c1">undefined</span>]);
<span class="pl-c">// ⮕ ''</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>([<span class="pl-s"><span class="pl-pds">'</span>Jill<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Sarah<span class="pl-pds">'</span></span>]);
<span class="pl-c">// ❌ ValidationError: type.string at /: Must be a string</span>
</code></pre><h1 id="symbol"><a class="markdown-permalink" href="#symbol"><span class="icon icon-link"></span></a><code>symbol</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.symbol.html"><code>d.symbol</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.SymbolShape.html"><code>SymbolShape</code> <sup>↗</sup></a> instance.</p><p>The shape that constrains a value to be an arbitrary symbol.</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">symbol</span>();
<span class="pl-c">// ⮕ Shape&#x3C;symbol></span>
</code></pre><p>To constrain an input to an exact symbol, use <a href="#const"><code>const</code></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">TAG</span> <span class="pl-k">=</span> <span class="pl-c1">Symbol</span>(<span class="pl-s"><span class="pl-pds">'</span>tag<span class="pl-pds">'</span></span>);

<span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-c1">TAG</span>);
<span class="pl-c">// ⮕ Shape&#x3C;typeof TAG></span>
</code></pre><p>Or use an <a href="#enum"><code>enum</code></a> to allow several exact symbols:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">FOO</span> <span class="pl-k">=</span> <span class="pl-c1">Symbol</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>);
<span class="pl-k">const</span> <span class="pl-c1">BAR</span> <span class="pl-k">=</span> <span class="pl-c1">Symbol</span>(<span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>);

<span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-c1">FOO</span>, <span class="pl-c1">BAR</span>]);
<span class="pl-c">// ⮕  Shape&#x3C;typeof FOO | typeof BAR></span>
</code></pre><h1 id="tuple"><a class="markdown-permalink" href="#tuple"><span class="icon icon-link"></span></a><code>tuple</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.tuple.html"><code>d.tuple</code> <sup>↗</sup></a> returns an <a href="https://smikhalevski.github.io/doubter/classes/core.ArrayShape.html"><code>ArrayShape</code> <sup>↗</sup></a> instance.</p><p>Constrains a value to be a tuple where elements at particular positions have concrete types:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">tuple</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;[string, number]></span>
</code></pre><p>Specify a rest tuple elements:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">tuple</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()], <span class="pl-smi">d</span>.<span class="pl-en">boolean</span>());
<span class="pl-c">// ⮕ Shape&#x3C;[string, number, ...boolean]></span>

<span class="pl-c">// Or</span>
<span class="pl-smi">d</span>.<span class="pl-en">tuple</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]).<span class="pl-en">rest</span>(<span class="pl-smi">d</span>.<span class="pl-en">boolean</span>());
<span class="pl-c">// ⮕ Shape&#x3C;[string, number, ...boolean]></span>
</code></pre><p>Make a tuple readonly:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">tuple</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>()]).<span class="pl-en">readonly</span>();
<span class="pl-c">// ⮕ Shape&#x3C;[string], readonly [string]></span>
</code></pre><p>Tuples follow <a href="#coerce-to-an-array">array type coercion rules</a>.</p><h1 id="undefined"><a class="markdown-permalink" href="#undefined"><span class="icon icon-link"></span></a><code>undefined</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.undefined.html"><code>d.undefined</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.ConstShape.html"><code>ConstShape</code> <sup>↗</sup></a> instance.</p><p>The shape that requires an input to be <code>undefined</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">undefined</span>();
<span class="pl-c">// ⮕ Shape&#x3C;undefined></span>
</code></pre><h1 id="union-or"><a class="markdown-permalink" href="#union-or"><span class="icon icon-link"></span></a><code>union</code>, <code>or</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.union.html"><code>d.union</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.UnionShape.html"><code>UnionShape</code> <sup>↗</sup></a> instance.</p><p>A constraint that allows a value to be one of the given types:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">union</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]);
<span class="pl-c">// ⮕ Shape&#x3C;string | number></span>
</code></pre><p>Use a shorter alias <code>or</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">d</span>.<span class="pl-en">string</span>(), <span class="pl-smi">d</span>.<span class="pl-en">number</span>()]);
</code></pre><h2 id="discriminated-unions"><a class="markdown-permalink" href="#discriminated-unions"><span class="icon icon-link"></span></a>Discriminated unions</h2><p>A discriminated union is a union of object shapes that all share a particular key.</p><p>Doubter automatically applies various performance optimizations to union shapes and <a href="https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions">discriminated union <sup>↗</sup></a> detection is one of them. As an example, let's create a discriminated union of objects representing various business types.</p><p>Sole entrepreneur goes first:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">entrepreneurShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  bisinessType: <span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>entrepreneur<span class="pl-pds">'</span></span>),
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>().<span class="pl-en">gte</span>(<span class="pl-c1">18</span>),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ type: 'entrepreneur', name: string, age: number }></span>
</code></pre><p>We're going to use <code>bisinessType</code> property as the discriminator in our union. Now let's define a shape for a company:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">companyShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  businessType: <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
    <span class="pl-smi">d</span>.<span class="pl-en">const</span>(<span class="pl-s"><span class="pl-pds">'</span>llc<span class="pl-pds">'</span></span>),
    <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>corporation<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>partnership<span class="pl-pds">'</span></span>])
  ]),
  headcount: <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>().<span class="pl-en">positive</span>(),
});
<span class="pl-c">// ⮕ Shape&#x3C;{ type: 'llc' | 'corporation' | 'partneership', headcount: number }></span>
</code></pre><p>Notice that we declared <code>businessType</code> as a composite shape. This would work just fine until shape restricts its input to a set of literal values.</p><p>The final step is to define a discriminated union shape:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">businessShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">union</span>([<span class="pl-smi">entrepreneurShape</span>, <span class="pl-smi">companyShape</span>]);
</code></pre><p><code>union</code> would detect that all object shapes in the union have the <code>businessType</code> property with distinct values and would enable a discriminated union optimization.</p><p>Discriminated unions raise fewer issues because only one shape from the union can be applied to an input:</p><pre><code class="language-ts"><span class="pl-smi">businessType</span>.<span class="pl-c1">parse</span>({
  businessType: <span class="pl-s"><span class="pl-pds">'</span>corporation<span class="pl-pds">'</span></span>,
  headcount: <span class="pl-c1">0</span>,
});
<span class="pl-c">// ❌ ValidationError: number.gte at /headcount: Must be greater than 0</span>
</code></pre><h2 id="issues-raised-by-a-union"><a class="markdown-permalink" href="#issues-raised-by-a-union"><span class="icon icon-link"></span></a>Issues raised by a union</h2><p>If there are multiple shapes in the union that have raised issues during parsing, then union returns a grouping issue.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">or</span>([
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  }),
  <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>(),
  }),
]);
<span class="pl-c">// ⮕ Shape&#x3C;{ name: string } | { age: number }></span>

<span class="pl-smi">shape</span>.<span class="pl-en">try</span>({ name: <span class="pl-c1">47</span>, age: <span class="pl-c1">null</span> });
</code></pre><p>The result of <code>try</code> would contain a grouping issue:</p><!-- prettier-ignore --><pre><code class="language-json5">{
  code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>type.union<span class="pl-pds">'</span></span>,
  path<span class="pl-k">:</span> [],
  input<span class="pl-k">:</span> {
    name<span class="pl-k">:</span> <span class="pl-c1">47</span>,
    age<span class="pl-k">:</span> <span class="pl-c1">null</span>
  },
  message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must conform the union<span class="pl-pds">'</span></span>,
  param<span class="pl-k">:</span> {
    inputs<span class="pl-k">:</span> [<span class="pl-smi">Type</span>.<span class="pl-c1">OBJECT</span>],
    issueGroups<span class="pl-k">:</span> [
      [
        {
          code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>type.string<span class="pl-pds">'</span></span>,
          path<span class="pl-k">:</span> [<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>],
          input<span class="pl-k">:</span> <span class="pl-c1">47</span>,
          message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must be a string<span class="pl-pds">'</span></span>
        }
      ],
      [
        {
          code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>type.number<span class="pl-pds">'</span></span>,
          path<span class="pl-k">:</span> [<span class="pl-s"><span class="pl-pds">'</span>age<span class="pl-pds">'</span></span>],
          input<span class="pl-k">:</span> <span class="pl-c1">null</span>,
          message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must be a number<span class="pl-pds">'</span></span>
        }
      ]
    ]
  }
}
</code></pre><dl><dt><code>inputs</code></dt><dd><p>An array of all input types and literal values that the union <a href="#check-that-an-input-is-accepted">accepts</a>.</p></dd><dt><code>issueGroups</code></dt><dd><p>An array of issue groups where each group contains issues raised by a separate shape in the union; or <code>null</code>.</p><p>Union checks the input only against shapes that <a href="#check-that-an-input-is-accepted">accept</a> the input value type. If there were no shapes in the union that accept the provided input value type, then <code>issueGroups</code> is <code>null</code>. For example, if you have a <code>number | string</code> union and parse a boolean value, there's no shape that accepts <code>boolean</code> input type. So the raised union issue would have <code>issueGroups</code> set to <code>null</code>.</p><p><code>path</code> of issues in <code>issueGroups</code> is relative to the grouping issue.</p></dd></dl><p>When union detects that only one of its shapes accepts the provided input value then issues produced by this shape are returned as is:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">or</span>([<span class="pl-smi">d</span>.<span class="pl-en">number</span>(), <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">min</span>(<span class="pl-c1">6</span>)]).<span class="pl-en">try</span>(<span class="pl-s"><span class="pl-pds">'</span>Okay<span class="pl-pds">'</span></span>);
</code></pre><p>In this example, only <code>d.string</code> can parse the <code>'Okay'</code> input value, so the result of <code>try</code> would contain a single string-related issue:</p><pre><code class="language-json5">{
  code<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>string.min<span class="pl-pds">'</span></span>,
  path<span class="pl-k">:</span> [],
  input<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Okay<span class="pl-pds">'</span></span>,
  message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Must have the minimum length of 6<span class="pl-pds">'</span></span>,
  param<span class="pl-k">:</span> <span class="pl-c1">6</span>,
}
</code></pre><p>This behaviour is applied to discriminated unions as well.</p><h1 id="unknown"><a class="markdown-permalink" href="#unknown"><span class="icon icon-link"></span></a><code>unknown</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.unknown.html"><code>d.unknown</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html"><code>Shape</code> <sup>↗</sup></a> instance.</p><p>An unconstrained value that is inferred as <code>unknown</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">unknown</span>();
<span class="pl-c">// ⮕ Shape&#x3C;unknown></span>
</code></pre><h1 id="void"><a class="markdown-permalink" href="#void"><span class="icon icon-link"></span></a><code>void</code></h1><p><a href="https://smikhalevski.github.io/doubter/functions/core.void.html"><code>d.void</code> <sup>↗</sup></a> returns a <a href="https://smikhalevski.github.io/doubter/classes/core.ConstShape.html"><code>ConstShape</code> <sup>↗</sup></a> instance.</p><p>The shape that requires an input to be <code>undefined</code> that is typed as <code>void</code>:</p><pre><code class="language-ts"><span class="pl-smi">d</span>.<span class="pl-en">void</span>();
<span class="pl-c">// ⮕ Shape&#x3C;void></span>
</code></pre><h1 id="cookbook"><a class="markdown-permalink" href="#cookbook"><span class="icon icon-link"></span></a>Cookbook</h1><h2 id="type-safe-url-query-params"><a class="markdown-permalink" href="#type-safe-url-query-params"><span class="icon icon-link"></span></a>Type-safe URL query params</h2><p>Let's define a shape that describes the query with <code>name</code> and <code>age</code> params:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">queryShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">object</span>({
    name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
    age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>().<span class="pl-en">nonNegative</span>().<span class="pl-en">coerce</span>().<span class="pl-c1">catch</span>(),
  })
  .<span class="pl-en">partial</span>();
<span class="pl-c">// ⮕ Shape&#x3C;{ name?: string | undefined, age?: number | undefined }></span>
</code></pre><p>🎯 <strong>Key takeaways</strong></p><ol><li><p>Query params are strings. Since <code>name</code> is constrained by <a href="#string"><code>d.string</code></a> it doesn't require additional attention. On the other hand, <code>age</code> is an integer, so <a href="#type-coercion">type coercion</a> must be enabled.</p></li><li><p>We also added <a href="#fallback-value"><code>catch</code></a>, so when <code>age</code> cannot be parsed as a positive integer, Doubter returns <code>undefined</code> instead of raising a validation issue.</p></li><li><p>The object shape is marked as <a href="#making-objects-partial-and-required">partial</a>, so absence of any query param won't raise a validation issue. You can mark individual params as optional and <a href="#optional-and-non-optional">provide a default value</a>.</p></li></ol><p>Now, let's parse the query string with <a href="https://www.npmjs.com/package/qs">qs <sup>↗</sup></a> and then apply our shape:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">qs</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>qs<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">query</span> <span class="pl-k">=</span> <span class="pl-smi">queryShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">qs</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>name=Frodo&#x26;age=50<span class="pl-pds">'</span></span>));
<span class="pl-c">// ⮕ { name: 'Frodo', age: 50 }</span>
</code></pre><p><code>age</code> is set to <code>undefined</code> if it is invalid:</p><pre><code class="language-ts"><span class="pl-smi">queryShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">qs</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>age=-33<span class="pl-pds">'</span></span>));
<span class="pl-c">// ⮕ { age: undefined }</span>
</code></pre><h2 id="type-safe-environment-variables"><a class="markdown-permalink" href="#type-safe-environment-variables"><span class="icon icon-link"></span></a>Type-safe environment variables</h2><p>If you're developing an app that consumes environment variables you most likely want to validate them.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">envShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">object</span>({
    NODE_ENV: <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>production<span class="pl-pds">'</span></span>]),
    HELLO_DATE: <span class="pl-smi">d</span>.<span class="pl-en">date</span>().<span class="pl-en">coerce</span>().<span class="pl-en">optional</span>(),
  })
  .<span class="pl-en">strip</span>();
</code></pre><p>🎯 <strong>Key takeaways</strong></p><ol><li><p>Since env variables are strings, we should enable <a href="#type-coercion">type coercion</a> to convert the value of <code>HELLO_DATE</code> to a <code>Date</code> instance.</p></li><li><p><code>NODE_ENV</code> is the required env variable, while <code>HELLO_DATE</code> is optional. If <code>HELLO_DATE</code> is provided and cannot be <a href="#coerce-to-a-date">coerced to a date</a>, a validation error would be raised.</p></li><li><p>Unknown env variables are <a href="#unknown-keys">stripped</a>, so they won't be visible inside the app. This prevents an accidental usage of an unvalidated env variable.</p></li></ol><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">env</span> <span class="pl-k">=</span> <span class="pl-smi">envShape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">process</span>.<span class="pl-c1">env</span>);
<span class="pl-c">// ⮕ { NODE_ENV: 'test' | 'production', HELLO_DATE?: Date }</span>
</code></pre><h2 id="type-safe-cli-arguments"><a class="markdown-permalink" href="#type-safe-cli-arguments"><span class="icon icon-link"></span></a>Type-safe CLI arguments</h2><p>If you're developing a console app you may want to validate arguments passed via CLI. For example, lets write an app that processes the following CLI parameters:</p><pre><code class="language-shell">node app.js --name Bill --age 42
</code></pre><p>First, install <a href="https://github.com/smikhalevski/argcat#readme">argcat <sup>↗</sup></a>, and use it to convert an array of CLI arguments to an object:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">parseArgs</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>argcat<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">args</span> <span class="pl-k">=</span> <span class="pl-en">parseArgs</span>(<span class="pl-c1">process</span>.<span class="pl-c1">argv</span>.<span class="pl-c1">slice</span>(<span class="pl-c1">2</span>));
<span class="pl-c">// ⮕ { '': [], name: ['Bill'], age: ['42'] }</span>
</code></pre><p>Now let's define the shape of the parsed object:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">optionsShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>
  .<span class="pl-en">object</span>({
    name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">coerce</span>(),
    age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>().<span class="pl-en">nonNegative</span>().<span class="pl-en">coerce</span>(),
  })
  .<span class="pl-en">strip</span>();
</code></pre><p><a href="https://smikhalevski.github.io/doubter/classes/core.ObjectShape.html#strip"><code>strip</code> <sup>↗</sup></a> removes all unknown keys from an object. It is used here to prevent unexpected arguments to be accessible inside the app. You may want to throw an error if unknown keys are detected or ignore them. Refer to <a href="#unknown-keys">Unknown keys</a> section to find out how this can be done.</p><p>Parse CLI arguments using <code>optionsShape</code> with enabled <a href="#type-coercion">type coercion</a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">options</span> <span class="pl-k">=</span> <span class="pl-smi">optionsShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">args</span>);
<span class="pl-c">// ⮕ { name: 'Bill', age: 42 }</span>
</code></pre><h2 id="type-safe-localstorage"><a class="markdown-permalink" href="#type-safe-localstorage"><span class="icon icon-link"></span></a>Type-safe <code>localStorage</code></h2><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"><code>localStorage</code> <sup>↗</sup></a> is a key-value storage which allows persistence of string keys and string values on the client. Let's write two functions that can read and write JSON objects from and to <code>localStorage</code> in a type-safe manner.</p><p>First lets define a shape of the data stored in the <code>localStorage</code>. In this example <code>localStorage</code> would allow only one key <code>'user'</code> that would correspond to an object with <code>name</code> and <code>age</code> properties:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">userShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  name: <span class="pl-smi">d</span>.<span class="pl-en">string</span>(),
  age: <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>().<span class="pl-en">positive</span>(),
});

<span class="pl-k">const</span> <span class="pl-c1">localStorageItemsShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
  user: <span class="pl-smi">userShape</span>,
});
</code></pre><p>Let's infer a type of the data in the <code>localStorage</code>:</p><pre><code class="language-ts"><span class="pl-k">type</span> <span class="pl-en">LocalStorageItems</span> <span class="pl-k">=</span> <span class="pl-en">d</span>.<span class="pl-en">Input</span>&#x3C;<span class="pl-k">typeof</span> <span class="pl-smi">localStorageItemsShape</span>>;
</code></pre><p>You can read more about <code>d.Input</code> and <code>d.Output</code> in <a href="#static-type-inference">Static type inference</a> section. In this example, we don't have any <a href="#alterations">alterations</a> or <a href="#conversions">conversions</a>, so the <code>localStorageItemsShape</code> has the same input and output.</p><p>Now it's time to create a function that reads items in a type-safe manner:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">getItem</span>&#x3C;<span class="pl-en">K</span> <span class="pl-k">extends</span> <span class="pl-k">keyof</span> <span class="pl-en">LocalStorageItems</span>>(<span class="pl-v">key</span><span class="pl-k">:</span> <span class="pl-en">K</span>)<span class="pl-k">:</span> <span class="pl-en">LocalStorageItems</span>[<span class="pl-en">K</span>] <span class="pl-k">|</span> <span class="pl-c1">null</span> {
  <span class="pl-k">const</span> <span class="pl-c1">valueShape</span> <span class="pl-k">=</span> <span class="pl-smi">localStorageItemsShape</span>.<span class="pl-en">at</span>(<span class="pl-smi">key</span>);
  <span class="pl-k">const</span> <span class="pl-c1">value</span> <span class="pl-k">=</span> <span class="pl-smi">localStorage</span>.<span class="pl-c1">getItem</span>(<span class="pl-smi">key</span>);

  <span class="pl-k">if</span> (<span class="pl-smi">valueShape</span> <span class="pl-k">===</span> <span class="pl-c1">null</span>) {
    <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-c1">Error</span>(<span class="pl-s"><span class="pl-pds">'</span>Unknown key: <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">key</span>);
  }
  <span class="pl-k">if</span> (<span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-c1">null</span>) {
    <span class="pl-k">return</span> <span class="pl-c1">null</span>;
  }
  <span class="pl-k">return</span> <span class="pl-smi">valueShape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">JSON</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">value</span>));
}
</code></pre><p>Read more about <a href="https://smikhalevski.github.io/doubter/classes/core.Shape.html#at"><code>Shape.at</code> <sup>↗</sup></a>method in the <a href="#nested-shapes">Nested shapes</a> section. The same approach can be taken to implement writes:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">setItem</span>&#x3C;<span class="pl-en">K</span> <span class="pl-k">extends</span> <span class="pl-k">keyof</span> <span class="pl-en">LocalStorageItems</span>>(<span class="pl-v">key</span><span class="pl-k">:</span> <span class="pl-en">K</span>, <span class="pl-v">value</span><span class="pl-k">:</span> <span class="pl-en">LocalStorageItems</span>[<span class="pl-en">K</span>])<span class="pl-k">:</span> <span class="pl-c1">void</span> {
  <span class="pl-k">const</span> <span class="pl-c1">valueShape</span> <span class="pl-k">=</span> <span class="pl-smi">localStorageItemsShape</span>.<span class="pl-en">at</span>(<span class="pl-smi">key</span>);

  <span class="pl-k">if</span> (<span class="pl-smi">valueShape</span> <span class="pl-k">===</span> <span class="pl-c1">null</span>) {
    <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-c1">Error</span>(<span class="pl-s"><span class="pl-pds">'</span>Unknown key: <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">key</span>);
  }
  <span class="pl-smi">localStorage</span>.<span class="pl-c1">setItem</span>(<span class="pl-smi">key</span>, <span class="pl-c1">JSON</span>.<span class="pl-c1">stringify</span>(<span class="pl-smi">valueShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">value</span>)));
}
</code></pre><p>Note that we prevent writes of the unknown keys as well as reads. Now, let's use those functions:</p><pre><code class="language-ts"><span class="pl-en">setItem</span>(<span class="pl-s"><span class="pl-pds">'</span>user<span class="pl-pds">'</span></span>, { name: <span class="pl-s"><span class="pl-pds">'</span>John<span class="pl-pds">'</span></span>, age: <span class="pl-c1">42</span> });

<span class="pl-en">getItem</span>(<span class="pl-s"><span class="pl-pds">'</span>user<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ { name: 'John', age: 42 }</span>

<span class="pl-en">setItem</span>(<span class="pl-s"><span class="pl-pds">'</span>user<span class="pl-pds">'</span></span>, { name: <span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>, age: <span class="pl-k">-</span><span class="pl-c1">100</span> });
<span class="pl-c">// ❌ ValidationError: number.gte at /: Must be greater than 0</span>

<span class="pl-en">getItem</span>(<span class="pl-s"><span class="pl-pds">'</span>account<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ Error: Unknown key: account</span>
</code></pre><h2 id="rename-object-keys"><a class="markdown-permalink" href="#rename-object-keys"><span class="icon icon-link"></span></a>Rename object keys</h2><p>First, create a shape that describes the key transformation. In this example we are going to <a href="#conversions">convert</a> the <a href="#enum">enumeration</a> of keys to an uppercase string:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">keysShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>]).<span class="pl-en">convert</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> <span class="pl-smi">value</span>.<span class="pl-c1">toUpperCase</span>() <span class="pl-k">as</span> <span class="pl-s"><span class="pl-pds">'</span>FOO<span class="pl-pds">'</span></span> <span class="pl-k">|</span> <span class="pl-s"><span class="pl-pds">'</span>BAR<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Shape&#x3C;'foo' | 'bar', 'FOO' | 'BAR'></span>
</code></pre><p>Then, create a <a href="#record"><code>d.record</code></a> shape that constrains keys and values or a dictionary-like object:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">record</span>(<span class="pl-smi">keysShape</span>, <span class="pl-smi">d</span>.<span class="pl-en">number</span>());
<span class="pl-c">// ⮕ Shape&#x3C;Record&#x3C;'foo' | 'bar', number>, Record&#x3C;'FOO' | 'BAR', number>></span>
</code></pre><p>Parse the input object, the output would be a new object with transformed keys:</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>({ foo: <span class="pl-c1">1</span>, bar: <span class="pl-c1">2</span> });
<span class="pl-c">// ⮕ { FOO: 1, BAR: 2 }</span>
</code></pre><h2 id="conditionally-applied-shapes"><a class="markdown-permalink" href="#conditionally-applied-shapes"><span class="icon icon-link"></span></a>Conditionally applied shapes</h2><p>If you need to apply a different shape depending on an input value, you can use <a href="#convert-convertasync"><code>convert</code></a>.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">stringShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">string</span>().<span class="pl-en">min</span>(<span class="pl-c1">5</span>);

<span class="pl-k">const</span> <span class="pl-c1">numberShape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">positive</span>();

<span class="pl-k">const</span> <span class="pl-c1">shape</span> <span class="pl-k">=</span> <span class="pl-smi">d</span>.<span class="pl-en">convert</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-k">typeof</span> <span class="pl-smi">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>string<span class="pl-pds">'</span></span>) {
    <span class="pl-k">return</span> <span class="pl-smi">stringShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">value</span>);
  } <span class="pl-k">else</span> {
    <span class="pl-k">return</span> <span class="pl-smi">numberShape</span>.<span class="pl-c1">parse</span>(<span class="pl-smi">value</span>);
  }
});
</code></pre><p><a href="#parsing-and-trying"><code>parse</code></a> would throw a <code>ValidationError</code> that is captured by the enclosing <code>convert</code>.</p><pre><code class="language-ts"><span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'Pluto'</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ ValidationError: string.min at /: Must have the minimum length of 5</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ 42</span>

<span class="pl-smi">shape</span>.<span class="pl-c1">parse</span>(<span class="pl-k">-</span><span class="pl-c1">273.15</span>);
<span class="pl-c">// ❌ ValidationError: number.gte at /: Must be greater than 0</span>
</code></pre>`};function h(){return s.createElement(n,{logo:s.createElement("div",{style:l(p,a),className:e.Logo,title:"Doubter"}),readme:c})}export{h as default};
