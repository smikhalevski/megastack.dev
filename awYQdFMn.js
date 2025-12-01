import{R as s}from"./Cf3WPjso.js";import{c as a,d as p}from"./m_baj4Wm.js";import{R as n,c as l}from"./BziDWEhi.js";import{l as e}from"./CmCawT3U.js";import"./CfOOfPff.js";const c={version:"0.0.11",tocContent:'<ul><li><a href="/react-corsair.md">View as Markdown</a></li><li><a href="https://github.com/smikhalevski/react-corsair#readme">GitHub<span class="external"></span></a></li><li><a href="https://smikhalevski.github.io/react-corsair/">API docs<span class="external"></span></a></li><li><a href="https://codesandbox.io/p/sandbox/react-corsair-example-mzjzcm">Live example<span class="external"></span></a></li></ul><p><span class="toc-icon">🧭 </span><a href="#routing"><strong>Routing</strong></a></p><ul><li><a href="#router-and-routes">Router and routes</a></li><li><a href="#route-params">Route params</a></li><li><a href="#pathname-templates">Pathname templates</a></li><li><a href="#outlets">Outlets</a></li><li><a href="#nested-routes">Nested routes</a></li><li><a href="#code-splitting">Code splitting</a></li><li><a href="#data-loading">Data loading</a></li><li><a href="#error-boundaries">Error boundaries</a></li><li><a href="#not-found">Not found</a></li><li><a href="#redirects">Redirects</a></li><li><a href="#prefetching">Prefetching</a></li><li><a href="#route-interception">Route interception</a></li><li><a href="#inline-routes">Inline routes</a></li></ul><p><span class="toc-icon">🔗 </span><a href="#history"><strong>History</strong></a></p><ul><li><a href="#route-urls">Route URLs</a></li><li><a href="#absolute-and-relative-urls">Absolute and relative URLs</a></li><li><a href="#search-strings">Search strings</a></li><li><a href="#links">Links</a></li><li><a href="#navigation-blocking">Navigation blocking</a></li></ul><p><span class="toc-icon">🚀 </span><a href="#server-side-rendering"><strong>Server-side rendering</strong></a></p><ul><li><a href="#rendering-disposition">Rendering disposition</a></li><li><a href="#render-to-string">Render to string</a></li><li><a href="#streaming-ssr">Streaming SSR</a></li><li><a href="#state-serialization">State serialization</a></li><li><a href="#content-security-policy-support">Content-Security-Policy support</a></li></ul><p><span class="toc-icon">🍪 </span><strong>Cookbook</strong></p><ul><li><a href="#route-masking">Route masking</a></li><li><a href="#forbidden-error">Forbidden error</a></li></ul>',articleContent:`<p>Type-safe router that abstracts URLs away.</p><ul><li>TypeScript first: type-safe path and query parameters.</li><li><a href="#code-splitting">Code splitting</a>, <a href="#data-loading">data loading</a> and <a href="#prefetching">prefetching</a> out-of-the box.</li><li><a href="#route-interception">Route interception</a> and <a href="#inline-routes">inline routes</a>.</li><li>Expressive and concise API with strict typings.</li><li>Supports SSR, partial pre-rendering and Suspense.</li><li>Optional history integration.</li><li><a href="https://pkg-size.dev/react-corsair">Just 9 kB gzipped.<span class="external"></span></a></li><li>Check out the <a href="#cookbook">Cookbook</a> for real-life examples!</li></ul><br><pre><code class="language-sh">npm install --save-prod react-corsair
</code></pre><br><h1 id="routing"><a class="markdown-permalink" href="#routing"><span class="icon icon-link"></span></a>Routing</h1><p><em>URLs don't matter</em>, they are almost never part of the application domain logic. React Corsair is a router that abstracts URLs away from your application domain.</p><p>Use <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.createRoute.html"><code>Route</code><span class="external"></span></a> objects instead of URLs to match locations, validate params, navigate between pages, prefetch data, infer types, etc.</p><p>React Corsair can be used in any environment and doesn't require any browser-specific API to be available. While history integration is optional, it is <a href="#history">available out-of-the-box</a> if you need it.</p><p>To showcase how the router works, lets start by creating a page component:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">HelloPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.createRoute.html">Create a route<span class="external"></span></a> that maps a URL pathname to a page component. Usually, a route declaration this is the only place where you would meet a pathname:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>, <span class="pl-smi">HelloPage</span>);
</code></pre><p>Now we need a <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Router.html"><code>Router</code><span class="external"></span></a> that would handle the navigation:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">Router</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });
</code></pre><p>To let the router know what route to render, call <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Router.html#navigate"><code>navigate</code><span class="external"></span></a>:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);
</code></pre><p>Use <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.RouterProvider.html"><code>&#x3C;RouterProvider></code><span class="external"></span></a> to render the router:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">MyApp</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />;
}
</code></pre><p>And that's how you render your first route with React Corsair!</p><h2 id="router-and-routes"><a class="markdown-permalink" href="#router-and-routes"><span class="icon icon-link"></span></a>Router and routes</h2><p>Routes are navigation entry points. Most routes associate a pathname with a rendered component:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">HelloPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>, <span class="pl-smi">HelloPage</span>);
</code></pre><p>In this example we used a shorthand signature of the <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.createRoute.html"><code>createRoute</code><span class="external"></span></a> function. You can also use a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html">route options object<span class="external"></span></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">HelloPage</span>,
});
</code></pre><p>Routes are location providers:</p><pre><code class="language-ts"><span class="pl-smi">helloRoute</span>.<span class="pl-en">getLocation</span>();
<span class="pl-c">// ⮕ { pathname: '/hello', searchParams: {}, hash: '', state: undefined }</span>
</code></pre><p>Routes are matched during router navigation:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">Router</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);
</code></pre><p>Use a location to navigate a router:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>({ pathname: <span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span> });
</code></pre><p>To trigger navigation from inside a component, use the <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.useRouter.html"><code>useRouter</code><span class="external"></span></a> hook:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">AnotherPage</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-en">useRouter</span>();

  <span class="pl-k">const</span> <span class="pl-en">handleClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
    <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);
  };

  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">handleClick</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to hello<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>;
}
</code></pre><p>If you want the browser history to drive your navigation, see the <a href="#history">History</a> section.</p><h2 id="route-params"><a class="markdown-permalink" href="#route-params"><span class="icon icon-link"></span></a>Route params</h2><p>Routes can be parameterized with pathname params and search params. Let's create a route that has a pathname param:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">number</span> }>(<span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>, <span class="pl-smi">ProductPage</span>);
</code></pre><p>Router cannot create a location for a parameterized route by itself, because it doesn't know the required param values. So here's where <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Route.html#getlocation"><code>getLocation</code><span class="external"></span></a> comes handy:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productLocation</span> <span class="pl-k">=</span> <span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> });
<span class="pl-c">// ⮕ { pathname: '/products/42', searchParams: {}, hash: '', state: undefined }</span>

<span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">productLocation</span>);
</code></pre><p>Read more about pathname params syntax in the <a href="#pathname-templates">Pathname templates</a> section.</p><p>By default, params that aren't a part of a pathname become search params:</p><pre><code class="language-diff"><span class="pl-md">- const productRoute = createRoute&#x3C;{ sku: number }>('/products/:sku', ProductPage);</span>
<span class="pl-mi1">+ const productRoute = createRoute&#x3C;{ sku: number }>('/products', ProductPage);</span>
</code></pre><p><code>sku</code> is now a search param:</p><pre><code class="language-ts"><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> });
<span class="pl-c">// ⮕ { pathname: '/products', searchParams: { sku: 42 }, hash: '', state: undefined }</span>
</code></pre><p>You can have both pathname and search params on the same route:</p><pre><code class="language-ts"><span class="pl-k">interface</span> <span class="pl-en">ProductParams</span> {
  <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">number</span>;
  <span class="pl-v">color</span><span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span> <span class="pl-k">|</span> <span class="pl-s"><span class="pl-pds">'</span>green<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;<span class="pl-en">ProductParams</span>>(<span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>, <span class="pl-smi">ProductPage</span>);

<span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span>, color: <span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span> });
<span class="pl-c">// ⮕ { pathname: '/products/42', searchParams: { color: 'red' }, hash: '', state: undefined }</span>
</code></pre><p>To access params from a component use the <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.useRoute.html"><code>useRoute</code><span class="external"></span></a> hook:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">const</span> { <span class="pl-c1">params</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productRoute</span>);
  <span class="pl-c">// ⮕ { sku: 42, color: 'red' }</span>
}
</code></pre><p>Provide params adapter to parse route params:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/users/:userId<span class="pl-pds">'</span></span>,

  <span class="pl-en">paramsAdapter</span>: <span class="pl-v">params</span> <span class="pl-k">=></span> {
    <span class="pl-k">return</span> { userId: <span class="pl-smi">params</span>.<span class="pl-smi">userId</span> };
  },
});
</code></pre><p>Note that we didn't specify parameter types explicitly this time: TypeScript can infer them from the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#paramsadapter"><code>paramsAdapter</code><span class="external"></span></a>.</p><p>Use your favourite validation library to parse and validate params:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,

  paramsAdapter: <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    sku: <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>().<span class="pl-en">nonNegative</span>().<span class="pl-en">coerce</span>(),
    color: <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>green<span class="pl-pds">'</span></span>]).<span class="pl-en">optional</span>(),
  }),
});

<span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span>, color: <span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span> });
</code></pre><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>Read more about <a href="/doubter">Doubter</a>, the runtime validation and transformation library.</p></div><h2 id="pathname-templates"><a class="markdown-permalink" href="#pathname-templates"><span class="icon icon-link"></span></a>Pathname templates</h2><p>A pathname provided for a route is parsed as a pattern. Pathname patterns may contain named params and matching flags. Pathname patterns are compiled into a <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.PathnameTemplate.html"><code>PathnameTemplate</code><span class="external"></span></a> when route is created. A template allows to both match a pathname, and build a pathname using a provided set of params.</p><p>After a route is created, you can access a pathname pattern like this:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productsRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/products<span class="pl-pds">'</span></span>);

<span class="pl-smi">productsRoute</span>.<span class="pl-smi">pathnameTemplate</span>.<span class="pl-smi">pattern</span>;
<span class="pl-c">// ⮕ '/products'</span>
</code></pre><p>By default, a pathname pattern is case-insensitive. So the route in example above would match both <code>/products</code> and <code>/PRODUCTS</code>.</p><p>If you need a case-sensitive pattern, provide <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#iscasesensitive"><code>isCaseSensitive</code><span class="external"></span></a> route option:</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products<span class="pl-pds">'</span></span>,
  isCaseSensitive: <span class="pl-c1">true</span>,
});
</code></pre><p>Pathname patterns can include params. Pathname param names should conform <code>:[A-Za-z$_][A-Za-z0-9$_]+</code>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/users/:userId<span class="pl-pds">'</span></span>);
</code></pre><p>You can retrieve param names at runtime:</p><pre><code class="language-ts"><span class="pl-smi">userRoute</span>.<span class="pl-smi">pathnameTemplate</span>.<span class="pl-smi">paramNames</span>;
<span class="pl-c">// ⮕ Set { 'userId' }</span>
</code></pre><p>Params match a whole segment and cannot be partial.</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/users__:userId<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ SyntaxError</span>

<span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/users/:userId<span class="pl-pds">'</span></span>);
<span class="pl-c">// ✅ Success</span>
</code></pre><p>By default, a param matches a non-empty pathname segment. To make a param optional (so it can match an absent segment) follow it by a <code>?</code> flag.</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/product/:sku?<span class="pl-pds">'</span></span>);
</code></pre><p>This route matches both <code>/product</code> and <code>/product/37</code>.</p><p>Static pathname segments can be optional as well:</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/shop?/product/:sku<span class="pl-pds">'</span></span>);
</code></pre><p>This route matches both <code>/shop/product/37</code> and <code>/product/37</code>.</p><p>By default, a param matches a single pathname segment. Follow a param with a <code>*</code> flag to make it match multiple segments.</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/:slug*<span class="pl-pds">'</span></span>);
</code></pre><p>This route matches both <code>/watch</code> and <code>/watch/a/movie</code>.</p><p>To make param both wildcard and optional, combine <code>*</code> and <code>?</code> flags:</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/:slug*?<span class="pl-pds">'</span></span>);
</code></pre><p>To use <code>:</code> as a character in a pathname pattern, replace it with an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent">encoded<span class="external"></span></a> representation <code>%3A</code>:</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/foo%3Abar<span class="pl-pds">'</span></span>);
</code></pre><h2 id="outlets"><a class="markdown-permalink" href="#outlets"><span class="icon icon-link"></span></a>Outlets</h2><p>Route components are rendered inside an <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.Outlet.html"><code>&#x3C;Outlet></code><span class="external"></span></a>. If you don't provide children to <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.RouterProvider.html"><code>&#x3C;RouterProvider></code><span class="external"></span></a> then it would implicitly render an <code>&#x3C;Outlet></code>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">Router</span>, <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">HelloPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>, <span class="pl-smi">HelloPage</span>);

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);

<span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />;
}
</code></pre><p>You can provide children to <code>&#x3C;RouterProvider></code>:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-ent">main</span>>
        &#x3C;<span class="pl-c1">Outlet</span> />
      &#x3C;/<span class="pl-ent">main</span>>
    &#x3C;/<span class="pl-c1">RouterProvider</span>>
  );
}
</code></pre><p>The rendered output would be:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">main</span>>Hello&#x3C;/<span class="pl-ent">main</span>>
</code></pre><h2 id="nested-routes"><a class="markdown-permalink" href="#nested-routes"><span class="icon icon-link"></span></a>Nested routes</h2><p>Routes can be nested:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">parentRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/parent<span class="pl-pds">'</span></span>, <span class="pl-smi">ParentPage</span>);

<span class="pl-k">const</span> <span class="pl-c1">childRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-smi">parentRoute</span>, <span class="pl-s"><span class="pl-pds">'</span>/child<span class="pl-pds">'</span></span>, <span class="pl-smi">ChildPage</span>);

<span class="pl-smi">childRoute</span>.<span class="pl-en">getLocation</span>();
<span class="pl-c">// ⮕ { pathname: '/parent/child', searchParams: {}, hash: '', state: undefined }</span>
</code></pre><p>Routes are <a href="#outlets">rendered inside outlets</a>, so <code>ParentPage</code> should render an <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.Outlet.html"><code>&#x3C;Outlet></code><span class="external"></span></a> to give place for a <code>ChildPage</code>:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ParentPage</span>() {
  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-ent">section</span>>
      &#x3C;<span class="pl-c1">Outlet</span> />
    &#x3C;/<span class="pl-ent">section</span>>
  );
}

<span class="pl-k">function</span> <span class="pl-en">ChildPage</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">em</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">em</span>>;
}
</code></pre><p>To allow router navigation to <code>childRoute</code> it should be listed among <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouterOptions.html#routes"><code>routes</code><span class="external"></span></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">childRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">childRoute</span>);
</code></pre><p>The rendered output would be:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">section</span>>&#x3C;<span class="pl-ent">em</span>>Hello&#x3C;/<span class="pl-ent">em</span>>&#x3C;/<span class="pl-ent">section</span>>
</code></pre><p>If you create a route without specifying a component, it would render an <code>&#x3C;Outlet></code> by default:</p><pre><code class="language-diff"><span class="pl-md">- const parentRoute = createRoute('/parent', ParentPage);</span>
<span class="pl-mi1">+ const parentRoute = createRoute('/parent');</span>
</code></pre><p>Now the rendering output would be:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">em</span>>Hello&#x3C;/<span class="pl-ent">em</span>>
</code></pre><h2 id="code-splitting"><a class="markdown-permalink" href="#code-splitting"><span class="icon icon-link"></span></a>Code splitting</h2><p>To enable code splitting in your app, use the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#lazycomponent"><code>lazyComponent</code><span class="external"></span></a> option, instead of the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#component"><code>component</code><span class="external"></span></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/user<span class="pl-pds">'</span></span>,
  <span class="pl-en">lazyComponent</span>: () <span class="pl-k">=></span> <span class="pl-k">import</span>(<span class="pl-s"><span class="pl-pds">'</span>./UserPage.js<span class="pl-pds">'</span></span>),
});
</code></pre><p>Default-export the component from the <em>./UserPage.js</em>:</p><pre><code class="language-ts"><span class="pl-k">export</span> <span class="pl-k">default</span> <span class="pl-k">function</span> <span class="pl-en">UserPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}
</code></pre><p>When router is navigated to the <code>userRoute</code>, a module that contains <code>&#x3C;UserPage></code> is loaded and rendered. The loaded component is cached, so next time the <code>userRoute</code> is matched, <code>&#x3C;UserPage></code> would be rendered instantly.</p><p>A promise is thrown if the <code>lazyComponent</code> isn't loaded yet. You can manually wrap <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.RouterProvider.html"><code>&#x3C;RouterProvider></code><span class="external"></span></a> in a custom <code>&#x3C;Suspense></code> boundary to catch it and render a fallback:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">LoadingIndicator</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Loading<span class="pl-pds">'</span></span>;
}

&#x3C;<span class="pl-c1">Suspense</span> <span class="pl-e">fallback</span><span class="pl-k">=</span><span class="pl-pse">{</span>&#x3C;<span class="pl-c1">LoadingIndicator</span> /><span class="pl-pse">}</span>>
  &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />
&#x3C;/<span class="pl-c1">Suspense</span>>;
</code></pre><p>Or you can to provide a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#loadingcomponent"><code>loadingComponent</code><span class="external"></span></a> option to your route, so an <code>&#x3C;Outlet></code> renders a <code>&#x3C;Suspense></code> for you, using <code>loadingComponent</code> as a fallback:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/user<span class="pl-pds">'</span></span>,
  <span class="pl-en">lazyComponent</span>: () <span class="pl-k">=></span> <span class="pl-k">import</span>(<span class="pl-s"><span class="pl-pds">'</span>./UserPage.js<span class="pl-pds">'</span></span>),
  loadingComponent: <span class="pl-smi">LoadingIndicator</span>,
});
</code></pre><p>Now, <code>loadingComponent</code> would be rendered if there's loading in progress.</p><p>Each route may have a custom loading component: here you can render a page skeleton or a spinner.</p><p>Router can render the previously matched route when a new route is being loaded, even if a new route has a <code>loadingComponent</code>. Customize this behavior by adding a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#loadingappearance"><code>loadingAppearance</code><span class="external"></span></a> option:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/user<span class="pl-pds">'</span></span>,
  <span class="pl-en">lazyComponent</span>: () <span class="pl-k">=></span> <span class="pl-k">import</span>(<span class="pl-s"><span class="pl-pds">'</span>./UserPage.js<span class="pl-pds">'</span></span>),
  loadingComponent: <span class="pl-smi">LoadingIndicator</span>,
  loadingAppearance: <span class="pl-s"><span class="pl-pds">'</span>always<span class="pl-pds">'</span></span>,
});
</code></pre><p>This tells a router to always render <code>userRoute.loadingComponent</code> when <code>userRoute</code> is matched and lazy component isn't loaded yet. <code>loadingAppearance</code> can be set to:</p><dl><dt>"always"</dt><dd><p>Always render <code>loadingComponent</code> if a route requires loading.</p></dd><dt>"reroute"</dt><dd><p>Render <code>loadingComponent</code> only if a route is changed during navigation. This is the default behavior.</p></dd><dt>"avoid"</dt><dd><p>If there's a route that is already rendered then keep it on the screen until the new route is loaded.</p></dd></dl><p>If an error is thrown during <code>lazyComponent</code> loading, an <a href="#error-boundaries">error boundary</a> is rendered and router would retry loading the component again during the next navigation.</p><h2 id="data-loading"><a class="markdown-permalink" href="#data-loading"><span class="icon icon-link"></span></a>Data loading</h2><p>Routes may require some data to render. Triggering data loading during rendering may lead to a <a href="https://blog.sentry.io/fetch-waterfall-in-react/">waterfall<span class="external"></span></a>. React Corsair provides an easy way to load route data ahead of rendering:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">LoadingIndicator</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Loading<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }, <span class="pl-en">User</span>>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductPage</span>,
  loadingComponent: <span class="pl-smi">LoadingIndicator</span>,

  <span class="pl-en">dataLoader</span>: <span class="pl-k">async</span> <span class="pl-v">options</span> <span class="pl-k">=></span> {
    <span class="pl-k">const</span> <span class="pl-c1">response</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">fetch</span>(<span class="pl-s"><span class="pl-pds">'</span>/api/products/<span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">options</span>.<span class="pl-smi">params</span>.<span class="pl-smi">sku</span>);

    <span class="pl-k">return</span> <span class="pl-smi">response</span>.<span class="pl-en">json</span>();
    <span class="pl-c">// ⮕ Promise&#x3C;Product></span>
  },
});
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Route.html#dataloader"><code>dataLoader</code><span class="external"></span></a> is called every time the router is navigated to <code>productRoute</code>. While data is being loaded, the <code>&#x3C;LoadingIndicator></code> is rendered instead of the <code>&#x3C;ProductPage></code>.</p><p>You can access the loaded data in your route component using the <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.useRoute.html"><code>useRoute</code><span class="external"></span></a> hook:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">const</span> { <span class="pl-c1">data</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productRoute</span>);
  <span class="pl-c">// ⮕ Product</span>
}
</code></pre><p>Data loader may require additional context:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }, <span class="pl-en">Product</span>, { <span class="pl-v">apiBase</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductPage</span>,
  loadingComponent: <span class="pl-smi">LoadingIndicator</span>,

  <span class="pl-en">dataLoader</span>: <span class="pl-k">async</span> <span class="pl-v">options</span> <span class="pl-k">=></span> {
    <span class="pl-c">// 🟡 Access the router context in a data loader</span>
    <span class="pl-k">const</span> { <span class="pl-c1">apiBase</span> } <span class="pl-k">=</span> <span class="pl-smi">options</span>.<span class="pl-smi">router</span>.<span class="pl-smi">context</span>;

    <span class="pl-k">const</span> <span class="pl-c1">response</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">fetch</span>(<span class="pl-smi">apiBase</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">'</span>/products/<span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">options</span>.<span class="pl-smi">params</span>.<span class="pl-smi">sku</span>);

    <span class="pl-k">return</span> <span class="pl-smi">response</span>.<span class="pl-en">json</span>();
  },
});
</code></pre><p>A context value should be provided through a router:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({
  routes: [<span class="pl-smi">productRoute</span>],
  context: {
    apiBase: <span class="pl-s"><span class="pl-pds">'</span>https://superpuper.com<span class="pl-pds">'</span></span>,
  },
});
</code></pre><h2 id="error-boundaries"><a class="markdown-permalink" href="#error-boundaries"><span class="icon icon-link"></span></a>Error boundaries</h2><p>Each route is rendered in its own <a href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary">error boundary<span class="external"></span></a>. If an error occurs during route component rendering or <a href="#data-loading">data loading</a>, then an <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#errorcomponent"><code>errorComponent</code><span class="external"></span></a> is rendered as a fallback:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">ProductsPage</span>() {
  <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-c1">Error</span>(<span class="pl-s"><span class="pl-pds">'</span>Ooops!<span class="pl-pds">'</span></span>);
}

<span class="pl-k">function</span> <span class="pl-en">ErrorDetails</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>An error occurred<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">productsRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductsPage</span>,
  errorComponent: <span class="pl-smi">ErrorDetails</span>,
});
</code></pre><p>You can access the error that triggered the error boundary within an error component:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">ErrorDetails</span>() {
  <span class="pl-k">const</span> { <span class="pl-c1">error</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productsRoute</span>);

  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>An error occurred: <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">error</span>.<span class="pl-smi">message</span>;
}
</code></pre><p>Some errors are recoverable and only require a route data or component to be <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.RouteController.html#reload">reloaded<span class="external"></span></a>:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ErrorDetails</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productsRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productsRoute</span>);

  <span class="pl-k">const</span> <span class="pl-en">handleClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
    <span class="pl-smi">productsRouteController</span>.<span class="pl-c1">reload</span>();
  };

  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">handleClick</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Reload<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>;
}
</code></pre><p>Clicking on a "Reload" button would reload the route data and component (if it wasn't successfully loaded before).</p><p>You can trigger a route error from an event handler:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ProductsPage</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productsRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productsRoute</span>);

  <span class="pl-k">const</span> <span class="pl-en">handleClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
    <span class="pl-smi">productsRouteController</span>.<span class="pl-en">setError</span>(<span class="pl-k">new</span> <span class="pl-c1">Error</span>(<span class="pl-s"><span class="pl-pds">'</span>Ooops!<span class="pl-pds">'</span></span>));
  };

  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">handleClick</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Show error<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>;
}
</code></pre><h2 id="not-found"><a class="markdown-permalink" href="#not-found"><span class="icon icon-link"></span></a>Not found</h2><p>During route component rendering, you may detect that there's not enough data to render a route. Call the <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.notFound.html"><code>notFound</code><span class="external"></span></a> during rendering in such case:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">notFound</span>, <span class="pl-smi">useRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">const</span> { <span class="pl-c1">params</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productRoute</span>);

  <span class="pl-k">const</span> <span class="pl-c1">product</span> <span class="pl-k">=</span> <span class="pl-en">getProductById</span>(<span class="pl-smi">params</span>.<span class="pl-smi">sku</span>);
  <span class="pl-c">// ⮕ Product | null</span>

  <span class="pl-k">if</span> (<span class="pl-smi">product</span> <span class="pl-k">===</span> <span class="pl-c1">null</span>) {
    <span class="pl-c">// 🟡 No product was found, abort further rendering</span>
    <span class="pl-en">notFound</span>();
  }

  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>The product title is <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">product</span>.<span class="pl-c1">title</span>;
}
</code></pre><p><code>notFound</code> throws the <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.NotFoundError.html"><code>NotFoundError</code><span class="external"></span></a> symbol and aborts further rendering of the route component. The <code>&#x3C;Outlet></code> catches <code>NotFoundError</code> and renders a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#notfoundcomponent"><code>notFoundComponent</code><span class="external"></span></a> as a fallback:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">ProductNotFound</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Product not found<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductPage</span>,
  notFoundComponent: <span class="pl-smi">ProductNotFound</span>,
});
</code></pre><p>You can call <code>notFound</code> from a <a href="#data-loading">data loader</a> as well:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductPage</span>,
  notFoundComponent: <span class="pl-smi">ProductNotFound</span>,

  <span class="pl-en">dataLoader</span>: () <span class="pl-k">=></span> {
    <span class="pl-c">// 🟡 Try to load product here or call notFound</span>
    <span class="pl-en">notFound</span>();
  },
});
</code></pre><p>Force router to render <code>notFoundComponent</code> from an event handler:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productRoute</span>);

  <span class="pl-k">const</span> <span class="pl-en">handleClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
    <span class="pl-c">// 🟡 Force Outlet to render the notFoundComponent</span>
    <span class="pl-smi">productRouteController</span>.<span class="pl-en">notFound</span>();
  };

  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">handleClick</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Render not found<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>;
}
</code></pre><h2 id="redirects"><a class="markdown-permalink" href="#redirects"><span class="icon icon-link"></span></a>Redirects</h2><p>Trigger redirect during <a href="#data-loading">data loading</a> or during rendering.</p><p>Call <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.redirect.html"><code>redirect</code><span class="external"></span></a> during rendering:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span>, <span class="pl-smi">redirect</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">AdminPage</span>() {
  <span class="pl-k">if</span> (<span class="pl-k">!</span><span class="pl-smi">isAdmin</span>) {
    <span class="pl-en">redirect</span>(<span class="pl-smi">loginRoute</span>);
  }
}

<span class="pl-k">const</span> <span class="pl-c1">adminRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/admin<span class="pl-pds">'</span></span>, <span class="pl-smi">AdminPage</span>);
</code></pre><p>Or call <code>redirect</code> from a data loader:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">AdminPage</span>() {
  <span class="pl-c">// isAdmin is true during rendering</span>
}

<span class="pl-k">const</span> <span class="pl-c1">adminRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/admin<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">AdminPage</span>,

  <span class="pl-c">// 🟡 A redirect is thrown before rendering begins</span>
  <span class="pl-en">dataLoader</span>: () <span class="pl-k">=></span> {
    <span class="pl-k">if</span> (<span class="pl-k">!</span><span class="pl-smi">isAdmin</span>) {
      <span class="pl-en">redirect</span>(<span class="pl-smi">loginRoute</span>);
    }
  },
});
</code></pre><p>Router would render a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#loadingcomponent"><code>loadingComponent</code><span class="external"></span></a> when <code>redirect</code> is called during a data loading or during rendering.</p><p><code>redirect</code> accepts routes, <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.Location.html">locations<span class="external"></span></a>, and URL strings as an argument.</p><p>Rect Corsair doesn't have a default behavior for redirects. Use a router event listener to handle redirects:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">adminRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">!==</span> <span class="pl-s"><span class="pl-pds">'</span>redirect<span class="pl-pds">'</span></span>) {
    <span class="pl-c">// We don't care about non-redirect events in this example</span>
    <span class="pl-k">return</span>;
  }

  <span class="pl-k">if</span> (<span class="pl-k">typeof</span> <span class="pl-c1">event</span>.<span class="pl-smi">to</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>string<span class="pl-pds">'</span></span>) {
    <span class="pl-c1">window</span>.<span class="pl-c1">location</span>.<span class="pl-c1">href</span> <span class="pl-k">=</span> <span class="pl-c1">event</span>.<span class="pl-smi">to</span>;
    <span class="pl-k">return</span>;
  }

  <span class="pl-c">// Navigate a router when redirected to a location</span>
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-c1">event</span>.<span class="pl-smi">to</span>);
});
</code></pre><p>If you want the browser history to drive your redirects, see the <a href="#history">History</a> section.</p><h2 id="prefetching"><a class="markdown-permalink" href="#prefetching"><span class="icon icon-link"></span></a>Prefetching</h2><p>Sometimes you know ahead of time that a user would visit a particular route, and you may want to prefetch the component and <a href="#data-loading">related data</a> so the navigation is instant.</p><p>To do this, call the <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Router.html#prefetch"><code>Router.prefetch</code><span class="external"></span></a> method and provide a route or a location to prefetch. Router would load required <a href="#code-splitting">components</a> and trigger <a href="#data-loading">data loaders</a>:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-en">prefetch</span>(<span class="pl-smi">productRoute</span>);
</code></pre><p>If a route requires params, use <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Route.html#getlocation"><code>getLocation</code><span class="external"></span></a> to create a prefetched location:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-en">prefetch</span>(<span class="pl-smi">user</span>.<span class="pl-en">getLocation</span>({ userId: <span class="pl-c1">42</span> }));
</code></pre><p>Use <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.Prefetch.html"><code>&#x3C;Prefetch></code><span class="external"></span></a> component for a more declarative route prefetching:</p><pre><code class="language-tsx">&#x3C;<span class="pl-c1">Prefetch</span> <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span><span class="pl-pse">}</span> />
</code></pre><p>Or <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.usePrefetch.html"><code>usePrefetch</code><span class="external"></span></a> hook:</p><pre><code class="language-tsx"><span class="pl-en">usePrefetch</span>(<span class="pl-smi">productRoute</span>);
</code></pre><p>React Corsair triggers required <a href="#data-loading">data loaders</a> on every navigation, so you may need to implement caching for data loaders.</p><p>By default, both <code>&#x3C;Prefetch></code> and <code>usePrefetch</code> start prefetching right after mount. Provide a prefetch trigger that would start prefetching when a condition is met:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useRef</span>, <span class="pl-smi">useMemo</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createHoveredPrefetchTrigger</span>, <span class="pl-smi">usePrefetch</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">ref</span> <span class="pl-k">=</span> <span class="pl-en">useRef</span>&#x3C;<span class="pl-en">Element</span> <span class="pl-k">|</span> <span class="pl-c1">null</span>>(<span class="pl-c1">null</span>);

<span class="pl-k">const</span> <span class="pl-c1">prefetchTrigger</span> <span class="pl-k">=</span> <span class="pl-en">useMemo</span>(() <span class="pl-k">=></span> <span class="pl-en">createHoveredPrefetchTrigger</span>(<span class="pl-smi">ref</span>), [<span class="pl-smi">ref</span>]);

<span class="pl-en">usePrefetch</span>(<span class="pl-smi">productRoute</span>, <span class="pl-smi">prefetchTrigger</span>);

&#x3C;<span class="pl-ent">button</span> <span class="pl-e">ref</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">ref</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to product<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>;
</code></pre><p>When button is hovered, <code>usePrefetch</code> would start prefetching <code>productRoute</code>.</p><p>React Corsair provides two prefetch triggers:</p><ul><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.createHoveredPrefetchTrigger.html"><code>createHoveredPrefetchTrigger</code><span class="external"></span></a> Creates a trigger that start prefetching when an element is hovered.</p></li><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.createVisiblePrefetchTrigger.html"><code>createVisiblePrefetchTrigger</code><span class="external"></span></a> Creates a trigger that start prefetching when an element is at least 50% visible on the screen.</p></li></ul><p>Create a custom prefetch trigger:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">usePrefetch</span>, <span class="pl-smi">PrefetchTrigger</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-c">// Starts prefetching after mount with a 5 second delay</span>
<span class="pl-k">const</span> <span class="pl-c1">prefetchTrigger</span><span class="pl-k">:</span> <span class="pl-en">PrefetchTrigger</span> <span class="pl-k">=</span> <span class="pl-en">useMemo</span>(
  () <span class="pl-k">=></span> <span class="pl-v">prefetch</span> <span class="pl-k">=></span> {
    <span class="pl-k">const</span> <span class="pl-c1">timer</span> <span class="pl-k">=</span> <span class="pl-c1">setTimeout</span>(<span class="pl-smi">prefetch</span>, <span class="pl-c1">5000</span>);

    <span class="pl-k">return</span> () <span class="pl-k">=></span> <span class="pl-c1">clearTimeout</span>(<span class="pl-smi">timer</span>);
  },
  []
);

<span class="pl-en">usePrefetch</span>(<span class="pl-smi">productRoute</span>, <span class="pl-smi">prefetchTrigger</span>);
</code></pre><h2 id="route-interception"><a class="markdown-permalink" href="#route-interception"><span class="icon icon-link"></span></a>Route interception</h2><p>When a router is navigated to a new location, a target route can be intercepted and rendered in the layout of the current route. This can be useful when you want to display the content of a route without the user switching to a different context.</p><p>To showcase how to use route interception, let's start with creating create a shop feed from which products can be opened in a separate page.</p><p>Here's the product route and its component:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span>, <span class="pl-smi">useRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">number</span> }>(<span class="pl-s"><span class="pl-pds">'</span>/product/:sku<span class="pl-pds">'</span></span>, <span class="pl-smi">ProductPage</span>);

<span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">const</span> { <span class="pl-c1">params</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productRoute</span>);

  <span class="pl-c">// Render a product here</span>
}
</code></pre><p>Shop feed is a list of product links:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">Link</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">shopRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/shop<span class="pl-pds">'</span></span>, <span class="pl-smi">ShopPage</span>);

<span class="pl-k">function</span> <span class="pl-en">ShopPage</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-c1">Link</span> <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> })<span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to product<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-c1">Link</span>>;
}
</code></pre><p>Setup the history and the router:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">Router</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createBrowserHistory</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">shopRoute</span>, <span class="pl-smi">productRoute</span>] });

<span class="pl-c">// 🟡 Trigger router navigation if history location changes</span>
<span class="pl-smi">history</span>.<span class="pl-en">subscribe</span>(() <span class="pl-k">=></span> {
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);
});
</code></pre><p>Render the router:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;

&#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
  &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />
&#x3C;/<span class="pl-c1">HistoryProvider</span>>;
</code></pre><p>Now when user opens <code>/shop</code> and clicks on <em>Go to product</em>, the browser location changes to <code>/product/42</code> and the <code>productRoute</code> is rendered.</p><p>With route interception we can render <code>productRoute</code> route inside the <code>&#x3C;ShopPage></code>, so the browser location would be <code>/product/42</code> and the user would see the shop feed with a product inlay.</p><p>To achieve this, add the <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.useInterceptedRoute.html"><code>useInterceptedRoute</code><span class="external"></span></a> hook to <code>&#x3C;ShopPage></code>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useInterceptedRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">ShopPage</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useInterceptedRoute</span>(<span class="pl-smi">productRoute</span>);
  <span class="pl-c">// ⮕ RouteController | null</span>

  <span class="pl-k">return</span> (
    &#x3C;>
      &#x3C;<span class="pl-c1">Link</span> <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> })<span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to product<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-c1">Link</span>>

      <span class="pl-pse">{</span><span class="pl-smi">productRouteController</span> <span class="pl-k">!==</span> <span class="pl-c1">null</span> <span class="pl-k">&#x26;&#x26;</span> &#x3C;<span class="pl-c1">RouteOutlet</span> <span class="pl-e">controller</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRouteController</span><span class="pl-pse">}</span> /><span class="pl-pse">}</span>
    &#x3C;/>
  );
}
</code></pre><p>Now when user clicks on <em>Go to product</em>, the browser location changes to <code>/product/42</code> and <code>&#x3C;ShopPage></code> is re-rendered. <code>productRouteController</code> would contain a <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.RouteController.html">route controller<span class="external"></span></a> for <code>productRoute</code>. This controller can be then rendered using the <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.RouteOutlet.html"><code>&#x3C;RouteOutlet></code><span class="external"></span></a>.</p><p>If a user clicks the <em>Reload</em> button in the browser, a <code>&#x3C;ProductPage></code> would be rendered because it matches <code>/product/42</code>.</p><p>You can render <code>&#x3C;RouteOutlet></code> in a popup to show the product preview, allowing user not to loose the context of the shop feed.</p><p>Use <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Router.html#cancelinterception"><code>cancelInterception</code><span class="external"></span></a> method to render the intercepted route in a router <code>&#x3C;Outlet></code>:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-en">cancelInterception</span>();
</code></pre><h2 id="inline-routes"><a class="markdown-permalink" href="#inline-routes"><span class="icon icon-link"></span></a>Inline routes</h2><p>Inline routes allow rendering a route that matches a location inside a component:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useInlineRoute</span>, <span class="pl-smi">RouteOutlet</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">Product</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useInlineRoute</span>(<span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> }));

  <span class="pl-k">return</span> <span class="pl-smi">productRouteController</span> <span class="pl-k">!==</span> <span class="pl-c1">null</span> <span class="pl-k">&#x26;&#x26;</span> &#x3C;<span class="pl-c1">RouteOutlet</span> <span class="pl-e">controller</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRouteController</span><span class="pl-pse">}</span> />;
}
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.useInlineRoute.html"><code>useInlineRoute</code><span class="external"></span></a> matches the provided location against routes of the current router and returns a corresponding route controller.</p><h1 id="history"><a class="markdown-permalink" href="#history"><span class="icon icon-link"></span></a>History</h1><p>React Corsair provides a seamless history integration:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">Router</span>, <span class="pl-smi">RouterProvider</span>, <span class="pl-smi">userRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createBrowserHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

<span class="pl-smi">history</span>.<span class="pl-en">start</span>();

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-c">// 1️⃣ Trigger router navigation if history location changes</span>
<span class="pl-smi">history</span>.<span class="pl-en">subscribe</span>(() <span class="pl-k">=></span> {
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);
});

<span class="pl-c">// 2️⃣ Trigger history location change if redirect is dispatched</span>
<span class="pl-smi">router</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>redirect<span class="pl-pds">'</span></span>) {
    <span class="pl-smi">history</span>.<span class="pl-c1">replace</span>(<span class="pl-c1">event</span>.<span class="pl-smi">to</span>);
  }
});

<span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">return</span> (
    <span class="pl-c">// 3️⃣ Provide history to components</span>
    &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />
    &#x3C;/<span class="pl-c1">HistoryProvider</span>>
  );
}
</code></pre><p>Inside components use <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.useHistory.html"><code>useHistory</code><span class="external"></span></a> hook to retrieve the provided <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html"><code>History</code><span class="external"></span></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">useHistory</span>();
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#push">Push<span class="external"></span></a> and <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#replace">replace<span class="external"></span></a> routes using history:</p><pre><code class="language-ts"><span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-smi">helloRoute</span>);

<span class="pl-smi">history</span>.<span class="pl-c1">replace</span>(<span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> }));
</code></pre><p>There are three types of history adapters that you can leverage:</p><ul><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/history.createBrowserHistory.html"><code>createBrowserHistory</code><span class="external"></span></a> is a DOM-specific history adapter that uses HTML5 history API.</p></li><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/history.createHashBrowserHistory.html"><code>createHashBrowserHistory</code><span class="external"></span></a> is a DOM-specific history adapter that uses HTML5 history API and stores location in a <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/hash">URL hash<span class="external"></span></a>. This is useful if your server doesn't support history fallback, or if you're shipping an HTML file.</p></li><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/history.createMemoryHistory.html"><code>createMemoryHistory</code><span class="external"></span></a> is an in-memory history adapter, useful in testing and non-DOM environments like SSR.</p></li></ul><h2 id="route-urls"><a class="markdown-permalink" href="#route-urls"><span class="icon icon-link"></span></a>Route URLs</h2><p>History converts locations to URLs and vice-versa:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">name</span><span class="pl-k">?:</span> <span class="pl-c1">string</span> }>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>);

<span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

<span class="pl-k">const</span> <span class="pl-c1">helloURL</span> <span class="pl-k">=</span> <span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>.<span class="pl-en">getLocation</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>Bob<span class="pl-pds">'</span></span> }));
<span class="pl-c">// ⮕ '/hello?name=Bob'</span>

<span class="pl-smi">history</span>.<span class="pl-en">parseURL</span>(<span class="pl-smi">helloURL</span>);
<span class="pl-c">// ⮕ { pathname: '/hello', searchParams: { name: 'Bob' }, hash: '', state: undefined }</span>
</code></pre><p>Use <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryOptions.html#basepathname"><code>basePathname</code><span class="external"></span></a> to set the base pathname for the entire history. URLs produced by history would share the base pathname:</p><pre><code class="language-ts"><span class="pl-en">createBrowserHistory</span>({ basePathname: <span class="pl-s"><span class="pl-pds">'</span>/suuuper<span class="pl-pds">'</span></span> }).<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '/suuuper/hello'</span>

<span class="pl-en">createHashBrowserHistory</span>({ basePathname: <span class="pl-s"><span class="pl-pds">'</span>/suuuper<span class="pl-pds">'</span></span> }).<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '/suuuper#/hello'</span>
</code></pre><p>An error is thrown if a parsed URL doesn't match the base pathname:</p><pre><code class="language-ts"><span class="pl-en">createBrowserHistory</span>({ basePathname: <span class="pl-s"><span class="pl-pds">'</span>/suuuper<span class="pl-pds">'</span></span> }).<span class="pl-en">parseURL</span>(<span class="pl-s"><span class="pl-pds">'</span>/ooops<span class="pl-pds">'</span></span>);
<span class="pl-c">// ❌ Error: Pathname doesn't match the required base: /suuuper</span>
</code></pre><p>URLs can be passed to <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#push"><code>push</code><span class="external"></span></a> and <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#replace"><code>replace</code><span class="external"></span></a> methods:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>({ basePathname: <span class="pl-s"><span class="pl-pds">'</span>/suuuper<span class="pl-pds">'</span></span> });

<span class="pl-smi">history</span>.<span class="pl-en">start</span>();

<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// same as</span>
<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>));
<span class="pl-c">// same as</span>
<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-s"><span class="pl-pds">'</span>/suuuper/hello<span class="pl-pds">'</span></span>);
</code></pre><h2 id="absolute-and-relative-urls"><a class="markdown-permalink" href="#absolute-and-relative-urls"><span class="icon icon-link"></span></a>Absolute and relative URLs</h2><p>There's no relative navigation in React Corsair. This is reflected in the history behavior: history treats all URLs as absolute:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

<span class="pl-smi">history</span>.<span class="pl-en">start</span>();

<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>);
<span class="pl-c">// same as</span>
<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>);
</code></pre><p>Even pushing a hash isn't relative:</p><pre><code class="language-ts"><span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-s"><span class="pl-pds">'</span>#ooops<span class="pl-pds">'</span></span>);
<span class="pl-c">// same as</span>
<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-s"><span class="pl-pds">'</span>/#ooops<span class="pl-pds">'</span></span>);
</code></pre><p>This approach makes navigation predictable: what URL you see in the code, is exactly the same URL you would see in the browser location bar.</p><p>Both location and URL navigation work the same way: always absolute. But you should prefer locations whenever possible:</p><pre><code class="language-ts"><span class="pl-c">// 🟢 Great</span>
<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-smi">helloRoute</span>);

<span class="pl-c">// 🟢 OK</span>
<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>));

<span class="pl-c">// 🟡 Better avoid</span>
<span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>);
</code></pre><h2 id="search-strings"><a class="markdown-permalink" href="#search-strings"><span class="icon icon-link"></span></a>Search strings</h2><p>When history serializes a URL, it uses an serializer to stringify search params:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">color</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>);

<span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>.<span class="pl-en">getLocation</span>({ color: <span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span> }));
<span class="pl-c">// ⮕ '/hello?color=red'</span>
</code></pre><p>By default, history serializes <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.Location.html#searchparams">search params<span class="external"></span></a> with <a href="https://smikhalevski.github.io/react-corsair/variables/history.jsonSearchParamsSerializer.html"><code>jsonSearchParamsSerializer</code><span class="external"></span></a> which serializes individual params with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"><code>JSON</code><span class="external"></span></a>:</p><pre><code class="language-ts"><span class="pl-k">interface</span> <span class="pl-en">ShopParams</span> {
  <span class="pl-v">pageIndex</span><span class="pl-k">:</span> <span class="pl-c1">number</span>;
  <span class="pl-v">categories</span><span class="pl-k">:</span> <span class="pl-c1">string</span>[];
  <span class="pl-v">sortBy</span><span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>price<span class="pl-pds">'</span></span> <span class="pl-k">|</span> <span class="pl-s"><span class="pl-pds">'</span>rating<span class="pl-pds">'</span></span>;
  <span class="pl-v">available</span><span class="pl-k">:</span> <span class="pl-c1">boolean</span>;
}

<span class="pl-k">const</span> <span class="pl-c1">shopRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;<span class="pl-en">ShopParams</span>>(<span class="pl-s"><span class="pl-pds">'</span>/shop<span class="pl-pds">'</span></span>);

<span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(
  <span class="pl-smi">helloRoute</span>.<span class="pl-en">getLocation</span>({
    pageIndex: <span class="pl-c1">3</span>,
    categories: [<span class="pl-s"><span class="pl-pds">'</span>electronics<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gifts<span class="pl-pds">'</span></span>],
    sortBy: <span class="pl-s"><span class="pl-pds">'</span>price<span class="pl-pds">'</span></span>,
    available: <span class="pl-c1">true</span>,
  })
);
<span class="pl-c">// ⮕ '/shop?pageIndex=3&#x26;categories=["electronics","gifts"]&#x26;sortBy=price&#x26;available=true'</span>
</code></pre><p><code>jsonSearchParamsSerializer</code> allows you to store complex data structures in a URL.</p><p>You can create <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryOptions.html#searchparamsserializer">a custom search params serializer<span class="external"></span></a> and provide it to a history. Here's how to create a basic serializer that uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams"><code>URLSearchParams</code><span class="external"></span></a>:</p><pre><code class="language-ts"><span class="pl-en">createBrowserHistory</span>({
  searchParamsSerializer: {
    <span class="pl-en">parse</span>: <span class="pl-v">search</span> <span class="pl-k">=></span> <span class="pl-c1">Object</span>.<span class="pl-en">fromEntries</span>(<span class="pl-k">new</span> <span class="pl-en">URLSearchParams</span>(<span class="pl-smi">search</span>)),

    <span class="pl-en">stringify</span>: <span class="pl-v">params</span> <span class="pl-k">=></span> <span class="pl-k">new</span> <span class="pl-en">URLSearchParams</span>(<span class="pl-smi">params</span>).<span class="pl-c1">toString</span>(),
  },
});
</code></pre><h2 id="links"><a class="markdown-permalink" href="#links"><span class="icon icon-link"></span></a>Links</h2><p>Inside components use <a href="https://smikhalevski.github.io/react-corsair/functions/history.Link.html"><code>&#x3C;Link></code><span class="external"></span></a> for navigation:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">Link</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-c1">Link</span> <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> })<span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to a product 42<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-c1">Link</span>>;
}
</code></pre><p>Links can automatically <a href="#prefetching">prefetch</a> a route component and <a href="#data-loading">related data</a> as soon as they are rendered:</p><pre><code class="language-tsx">&#x3C;<span class="pl-c1">Link</span>
  <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> })<span class="pl-pse">}</span>
  <span class="pl-e">isPrefetched</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-c1">true</span><span class="pl-pse">}</span>
>
  <span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to a product 42<span class="pl-pds">'</span></span><span class="pl-pse">}</span>
&#x3C;/<span class="pl-c1">Link</span>>
</code></pre><h2 id="navigation-blocking"><a class="markdown-permalink" href="#navigation-blocking"><span class="icon icon-link"></span></a>Navigation blocking</h2><p>Navigation blocking is a way to prevent navigation from happening. This is typical if a user attempts to navigate while there are unsaved changes. Usually, in such situation, a prompt or a custom UI should be shown to the user to confirm the navigation.</p><p>Use the <a href="https://smikhalevski.github.io/react-corsair/functions/history.useHistoryBlocker.html"><code>useHistoryBlocker</code><span class="external"></span></a> hook to intercept the navigation attempt and show a browser confirmation popup to the user:</p><pre><code class="language-tsx"><span class="pl-k">const</span> [<span class="pl-c1">hasUnsavedChanges</span>, <span class="pl-c1">setHasUnsavedChanges</span>] <span class="pl-k">=</span> <span class="pl-en">useState</span>(<span class="pl-c1">false</span>);

<span class="pl-en">useHistoryBlocker</span>(() <span class="pl-k">=></span> {
  <span class="pl-c">// 🟡 Return true to cancel navigation or false to proceed</span>
  <span class="pl-k">return</span> <span class="pl-smi">hasUnsavedChanges</span> <span class="pl-k">&#x26;&#x26;</span> <span class="pl-k">!</span><span class="pl-en">confirm</span>(<span class="pl-s"><span class="pl-pds">'</span>Discard unsaved changes?<span class="pl-pds">'</span></span>);
});
</code></pre><p>A blocker function provided to the <code>useHistoryBlocker</code> hook receives a navigation transaction. With <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryTransaction.html#proceed"><code>proceed</code><span class="external"></span></a> and <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryTransaction.html#cancel"><code>cancel</code><span class="external"></span></a> methods you can handle a navigation transaction in an asynchronous manner:</p><pre><code class="language-tsx"><span class="pl-en">useHistoryBlocker</span>(<span class="pl-v">transaction</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-k">!</span><span class="pl-smi">hasUnsavedChanges</span>) {
    <span class="pl-c">// No unsaved changes, proceed with the navigation</span>
    <span class="pl-smi">transaction</span>.<span class="pl-en">proceed</span>();
    <span class="pl-k">return</span>;
  }

  <span class="pl-k">if</span> (<span class="pl-k">!</span><span class="pl-en">confirm</span>(<span class="pl-s"><span class="pl-pds">'</span>Discard unsaved changes?<span class="pl-pds">'</span></span>)) {
    <span class="pl-c">// User decided to keep unsaved changes</span>
    <span class="pl-smi">transaction</span>.<span class="pl-en">cancel</span>();
  }
});
</code></pre><p>Ask user to confirm the navigation only if there are unsaved changes:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-c1">transaction</span> <span class="pl-k">=</span> <span class="pl-en">useHistoryBlocker</span>(() <span class="pl-k">=></span> <span class="pl-smi">hasUnsavedChanges</span>);
<span class="pl-c">// or</span>
<span class="pl-c">// const transaction = useHistoryBlocker(hasUnsavedChanges);</span>

<span class="pl-smi">transaction</span> <span class="pl-k">!==</span> <span class="pl-c1">null</span> <span class="pl-k">&#x26;&#x26;</span> (
  &#x3C;<span class="pl-ent">dialog</span> <span class="pl-e">open</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-c1">true</span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-ent">p</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Discard unsaved changes?<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">p</span>>

    &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">transaction</span>.<span class="pl-smi">proceed</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Discard<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>
    &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">transaction</span>.<span class="pl-smi">cancel</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Cancel<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>
  &#x3C;/<span class="pl-ent">dialog</span>>
);
</code></pre><p>Always ask user to confirm the navigation:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-c1">transaction</span> <span class="pl-k">=</span> <span class="pl-en">useHistoryBlocker</span>();
</code></pre><h1 id="server-side-rendering"><a class="markdown-permalink" href="#server-side-rendering"><span class="icon icon-link"></span></a>Server-side rendering</h1><p>Routes can be rendered on the server side and then hydrated on the client side.</p><p>To enable hydration on the client, create a <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Router.html"><code>Router</code><span class="external"></span></a> and call <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.hydrateRouter.html"><code>hydrateRouter</code><span class="external"></span></a> instead of <a href="https://smikhalevski.github.io/react-corsair/classes/react-corsair.Router.html#navigate"><code>Router.navigate</code><span class="external"></span></a>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> <span class="pl-smi">React</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRoot</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/client<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createBrowserHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-router/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRouter</span>, <span class="pl-smi">Router</span>, <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-router<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-c">// 🟡 Start router hydration instead on navigating</span>
<span class="pl-en">hydrateRouter</span>(<span class="pl-smi">router</span>, <span class="pl-smi">history</span>.<span class="pl-c1">location</span>);

<span class="pl-en">hydrateRoot</span>(
  <span class="pl-c1">document</span>,
  &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />
  &#x3C;/<span class="pl-c1">HistoryProvider</span>>
);
</code></pre><div class="markdown-alert markdown-alert-important"><p class="markdown-alert-title"><svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>Important</p><p>The location passed to <code>hydrateRouter</code> and set of routes passed to the <code>Router</code> on the client-side must be the same as ones used during the server-side rendering. Otherwise, hydration behavior is undefined.</p></div><p><a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.hydrateRouter.html"><code>hydrateRouter</code><span class="external"></span></a> must be called only once on the client-side with the router that would receive the dehydrated state from the server.</p><p>On the server-side, you can either render your app contents <a href="#render-to-string">as a string</a> and send it to the client in one go, or <a href="#streaming-ssr">stream the contents</a>.</p><h2 id="rendering-disposition"><a class="markdown-permalink" href="#rendering-disposition"><span class="icon icon-link"></span></a>Rendering disposition</h2><p>By default, when SSR is used, all routes are rendered both on the server side and on the client side. You can prevent server-side rendering for a route by specifying the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.RouteOptions.html#renderingdisposition"><code>renderingDisposition</code><span class="external"></span></a> option:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">HelloPage</span>,
  renderingDisposition: <span class="pl-s"><span class="pl-pds">'</span>client<span class="pl-pds">'</span></span>,
});
</code></pre><p>Now <code>helloRoute</code> is rendered on the client-side only.</p><p>Rendering disposition can be set to:</p><dl><dt>"server"</dt><dd>Route is rendered on the server during SSR and hydrated on the client.</dd><dt>"client"</dt><dd>Route is rendered on the client. Loading state is rendered on the server during SSR.</dd></dl><h2 id="render-to-string"><a class="markdown-permalink" href="#render-to-string"><span class="icon icon-link"></span></a>Render to string</h2><p>Use <a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html"><code>SSRRouter</code><span class="external"></span></a> to render your app as an HTML string:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createServer</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>node:http<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">renderToString</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createMemoryHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">SSRRouter</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/ssr<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">server</span> <span class="pl-k">=</span> <span class="pl-en">createServer</span>(<span class="pl-k">async</span> (<span class="pl-v">request</span>, <span class="pl-v">response</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// 1️⃣ Create a new history and a new router for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createMemoryHistory</span>({ initialEntries: [<span class="pl-smi">request</span>.<span class="pl-smi">url</span>] });
  <span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRRouter</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

  <span class="pl-c">// 2️⃣ Navigate router to a requested location</span>
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);

  <span class="pl-c">// 3️⃣ Re-render until there are no more changes</span>
  <span class="pl-k">let</span> <span class="pl-smi">html</span>;
  <span class="pl-k">do</span> {
    <span class="pl-smi">html</span> <span class="pl-k">=</span> <span class="pl-en">renderToString</span>(
      &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
        &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />
      &#x3C;/<span class="pl-c1">HistoryProvider</span>>
    );
  } <span class="pl-k">while</span> (<span class="pl-k">await</span> <span class="pl-smi">router</span>.<span class="pl-en">hasChanges</span>());

  <span class="pl-c">// 3️⃣ Inject the hydration script</span>
  <span class="pl-smi">html</span> <span class="pl-k">=</span> <span class="pl-smi">html</span>.<span class="pl-c1">replace</span>(<span class="pl-s"><span class="pl-pds">'</span>&#x3C;/body><span class="pl-pds">'</span></span>, <span class="pl-smi">router</span>.<span class="pl-en">nextHydrationChunk</span>() <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">'</span>&#x3C;/body><span class="pl-pds">'</span></span>);

  <span class="pl-smi">response</span>.<span class="pl-en">setHeader</span>(<span class="pl-s"><span class="pl-pds">'</span>Content-Type<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>text/html<span class="pl-pds">'</span></span>);
  <span class="pl-smi">response</span>.<span class="pl-en">end</span>(<span class="pl-smi">html</span>);
});

<span class="pl-smi">server</span>.<span class="pl-en">listen</span>(<span class="pl-c1">8080</span>);
</code></pre><p>A new router and a new history must be created for each request, so the results that are stored in router are served in response to a particular request.</p><p><a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html#haschanges"><code>hasChanges</code><span class="external"></span></a> would resolve with <code>true</code> if state of some routes have changed during rendering.</p><p>The hydration chunk returned by <a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html#nexthydrationchunk"><code>nextHydrationChunk</code><span class="external"></span></a> contains the <code>&#x3C;script></code> tag that hydrates the router for which <a href="https://smikhalevski.github.io/react-corsair/functions/react-corsair.hydrateRouter.html"><code>hydrateRouter</code><span class="external"></span></a> is invoked on the client side.</p><h2 id="streaming-ssr"><a class="markdown-permalink" href="#streaming-ssr"><span class="icon icon-link"></span></a>Streaming SSR</h2><p>React can stream parts of your app while it is being rendered. You can inject React Corsair hydration chunks into the React stream.</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createServer</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>node:http<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">Writable</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>node:stream<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">renderToReadableStream</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createMemoryHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">SSRRouter</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/ssr<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">server</span> <span class="pl-k">=</span> <span class="pl-en">createServer</span>(<span class="pl-k">async</span> (<span class="pl-v">request</span>, <span class="pl-v">response</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// 1️⃣ Create a new history and a new router for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createMemoryHistory</span>({ initialEntries: [<span class="pl-smi">request</span>.<span class="pl-smi">url</span>] });
  <span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRRouter</span>(<span class="pl-smi">response</span>, { routes: [<span class="pl-smi">helloRoute</span>] });

  <span class="pl-c">// 2️⃣ Navigate router to a requested location</span>
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);

  <span class="pl-k">const</span> <span class="pl-c1">stream</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">renderToReadableStream</span>(
    &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />
    &#x3C;/<span class="pl-c1">HistoryProvider</span>>
  );

  <span class="pl-k">const</span> <span class="pl-c1">hydrator</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">TransformStream</span>({
    <span class="pl-en">transform</span>(<span class="pl-v">chunk</span>, <span class="pl-v">controller</span>) {
      <span class="pl-smi">controller</span>.<span class="pl-en">enqueue</span>(<span class="pl-smi">chunk</span>);
      <span class="pl-smi">controller</span>.<span class="pl-en">enqueue</span>(<span class="pl-smi">router</span>.<span class="pl-en">nextHydrationChunk</span>());
    },
  });

  <span class="pl-smi">response</span>.<span class="pl-en">setHeader</span>(<span class="pl-s"><span class="pl-pds">'</span>Content-Type<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>text/html<span class="pl-pds">'</span></span>);

  <span class="pl-c">// 2️⃣ Inject the hydration chunks into the react stream</span>
  <span class="pl-k">await</span> <span class="pl-smi">stream</span>.<span class="pl-en">pipeThrough</span>(<span class="pl-smi">hydrator</span>).<span class="pl-en">pipeTo</span>(<span class="pl-smi">Writable</span>.<span class="pl-en">toWeb</span>(<span class="pl-smi">response</span>));

  <span class="pl-smi">response</span>.<span class="pl-en">end</span>();
});

<span class="pl-smi">server</span>.<span class="pl-en">listen</span>(<span class="pl-c1">8080</span>);
</code></pre><p><code>hydrator</code> injects React Executor hydration chunks into the React stream.</p><h2 id="state-serialization"><a class="markdown-permalink" href="#state-serialization"><span class="icon icon-link"></span></a>State serialization</h2><p>By default, route state is serialized using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"><code>JSON</code><span class="external"></span></a> which has quite a few limitations. If your route <a href="#data-loading">loads data</a> that may contain circular references, or non-serializable data like <code>BigInt</code>, use a custom state serialization.</p><p>On the server, pass a <a href="https://smikhalevski.github.io/react-corsair/interfaces/ssr.SSRRouterOptions.html#serializer"><code>serializer</code><span class="external"></span></a> option to <a href="#render-to-string"><code>SSRRouter</code></a>:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">SSRRouter</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/ssr<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">JSONMarshal</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRRouter</span>({
  routes: [<span class="pl-smi">helloRoute</span>],
  serializer: <span class="pl-smi">JSONMarshal</span>,
});
</code></pre><p>On the client, pass <em>the same</em> <a href="https://smikhalevski.github.io/react-corsair/interfaces/react-corsair.HydrateRouterOptions.html#serializer"><code>serializer</code><span class="external"></span></a> option to <code>hydrateRouter</code>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> <span class="pl-smi">React</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRoot</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/client<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createBrowserHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-router/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRouter</span>, <span class="pl-smi">Router</span>, <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-router<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">JSONMarshal</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-en">hydrateRouter</span>(<span class="pl-smi">router</span>, <span class="pl-smi">history</span>.<span class="pl-c1">location</span>, {
  <span class="pl-c">// 🟡 Pass a custom serializer</span>
  serializer: <span class="pl-smi">JSONMarshal</span>,
});

<span class="pl-en">hydrateRoot</span>(
  <span class="pl-c1">document</span>,
  &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span> />
  &#x3C;/<span class="pl-c1">HistoryProvider</span>>
);
</code></pre><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>Read more about <a href="https://github.com/smikhalevski/json-marshal#readme">JSON Marshal<span class="external"></span></a>, it can stringify and parse any data structure.</p></div><h2 id="content-security-policy-support"><a class="markdown-permalink" href="#content-security-policy-support"><span class="icon icon-link"></span></a>Content-Security-Policy support</h2><p>By default, <a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html#nexthydrationchunk"><code>nextHydrationChunk</code><span class="external"></span></a> renders an inline <code>&#x3C;script></code> tag without any attributes. To enable the support of the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src"><code>script-src</code><span class="external"></span></a> directive of the <code>Content-Security-Policy</code> header, provide the <a href="https://smikhalevski.github.io/react-corsair/interfaces/ssr.SSRRouterOptions.html#nonce"><code>nonce</code><span class="external"></span></a> option to <code>SSRRouter</code> or any of its subclasses:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRRouter</span>({
  routes: [<span class="pl-smi">helloRoute</span>],
  nonce: <span class="pl-s"><span class="pl-pds">'</span>2726c7f26c<span class="pl-pds">'</span></span>,
});
</code></pre><p>Send the header with this nonce in the server response:</p><pre><code>Content-Security-Policy: script-src 'nonce-2726c7f26c'
</code></pre><h1 id="cookbook"><a class="markdown-permalink" href="#cookbook"><span class="icon icon-link"></span></a>Cookbook</h1><h2 id="route-masking"><a class="markdown-permalink" href="#route-masking"><span class="icon icon-link"></span></a>Route masking</h2><p>Route masking allows you to render a different route than one that was matched by the history.</p><p>Router is navigated by history changes:</p><pre><code class="language-ts"><span class="pl-smi">history</span>.<span class="pl-en">subscribe</span>(() <span class="pl-k">=></span> {
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);
});
</code></pre><p>User navigates to a <code>/foo</code> location:</p><pre><code class="language-ts"><span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-s"><span class="pl-pds">'</span>/foo<span class="pl-pds">'</span></span>);
</code></pre><p>You can intercept the router navigation before it is rendered (and before data loaders are triggered) and supersede the navigation:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>navigate<span class="pl-pds">'</span></span> <span class="pl-k">&#x26;&#x26;</span> <span class="pl-c1">event</span>.<span class="pl-c1">location</span>.<span class="pl-c1">pathname</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>/foo<span class="pl-pds">'</span></span>) {
    <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">barRoute</span>);
  }
});
</code></pre><p>Now regardless of what route was matched by <code>/foo</code>, router would render <code>barRoute</code>.</p><p>This technique can be used to render a login page whenever the non-authenticated user tries to reach a page that requires login. Here's how to achieve this:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">adminRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/admin<span class="pl-pds">'</span></span>, <span class="pl-smi">AdminPage</span>);

<span class="pl-k">const</span> <span class="pl-c1">loginPage</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/login<span class="pl-pds">'</span></span>, <span class="pl-smi">LoginPage</span>);

<span class="pl-c">// A set of routes that require a user to be logged in</span>
<span class="pl-k">const</span> <span class="pl-c1">privateRoutes</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-c1">Set</span>([<span class="pl-smi">adminRoute</span>]);

<span class="pl-smi">router</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>navigate<span class="pl-pds">'</span></span> <span class="pl-k">&#x26;&#x26;</span> <span class="pl-k">!</span><span class="pl-en">isUserLoggedIn</span>() <span class="pl-k">&#x26;&#x26;</span> <span class="pl-smi">privateRoutes</span>.<span class="pl-c1">has</span>(<span class="pl-c1">event</span>.<span class="pl-smi">controller</span>.<span class="pl-smi">route</span>)) {
    <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">loginPage</span>);
  }
});
</code></pre><h2 id="forbidden-error"><a class="markdown-permalink" href="#forbidden-error"><span class="icon icon-link"></span></a>Forbidden error</h2><p>To render an error-specific UI for a HTTP 403 Forbidden status, create an special error class and a helper function:</p><pre><code class="language-ts"><span class="pl-k">class</span> <span class="pl-en">ForbiddenError</span> <span class="pl-k">extends</span> <span class="pl-c1">Error</span> {}

<span class="pl-k">function</span> <span class="pl-en">forbidden</span>()<span class="pl-k">:</span> <span class="pl-c1">never</span> {
  <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-en">ForbiddenError</span>();
}
</code></pre><p>Create a route that throws a <code>ForbiddenError</code>:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">AdminPanel</span>() {
  <span class="pl-en">isAdmin</span>() <span class="pl-k">||</span> <span class="pl-en">forbidden</span>();

  <span class="pl-c">// Render admin panel here</span>
}

<span class="pl-k">const</span> <span class="pl-c1">adminRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/admin<span class="pl-pds">'</span></span>, <span class="pl-smi">AdminPanel</span>);
</code></pre><p>Handle <code>ForbiddenError</code> in an <code>errorComponent</code> of either a route or a router:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({
  routes: [<span class="pl-smi">adminRoute</span>],

  <span class="pl-en">errorComponent</span>: () <span class="pl-k">=></span> {
    <span class="pl-k">const</span> { <span class="pl-c1">error</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>();

    <span class="pl-k">if</span> (<span class="pl-smi">error</span> <span class="pl-k">instanceof</span> <span class="pl-en">ForbiddenError</span>) {
      <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Forbidden<span class="pl-pds">'</span></span>;
    }

    <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>An error occurred<span class="pl-pds">'</span></span>;
  },
});
</code></pre><p>You can use <code>forbidden()</code> in a <a href="#data-loading">data loader</a> or during rendering of a route component.</p>`};function u(){return s.createElement(n,{logo:s.createElement("div",{style:e(p,a),className:l.Logo,title:"React Corsair"}),readme:c})}export{u as default};
