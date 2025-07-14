import{b as s}from"./vendor-BmysqiTO.js";import{r as a,a as p}from"./react-corsair-logo-dark-DcrAjgQD.js";import{R as n}from"./Readme-ClvAnXPm.js";import{l}from"./utils-D7qyeKq7.js";import"./index-D71C-iI6.js";const e={version:"0.0.10",overviewContent:`<p>Type-safe router that abstracts URLs away.</p><ul><li>TypeScript first: type-safe path and query parameters;</li><li><a href="#code-splitting">Code splitting</a>, <a href="#data-loading">data loading</a> and <a href="#prefetching">prefetching</a> out-of-the box;</li><li><a href="#route-interception">Route interception</a> and <a href="#inline-routes">inline routes</a>;</li><li>Expressive and concise API with strict typings;</li><li>Supports SSR, partial pre-rendering and Suspense;</li><li>Optional history integration;</li><li><a href="https://pkg-size.dev/react-corsair">Just 9 kB gzipped</a>;</li><li>Check out the <a href="#cookbook">Cookbook</a> for real-life examples!</li></ul><pre><code class="language-sh">npm install --save-prod react-corsair
</code></pre>`,tocContent:'<p>🔥 <a href="https://codesandbox.io/p/sandbox/react-corsair-example-mzjzcm"><strong>Live example</strong></a></p><p>🧭 <a href="#routing"><strong>Routing</strong></a></p><ul><li><a href="#router-and-routes">Router and routes</a></li><li><a href="#route-params">Route params</a></li><li><a href="#pathname-templates">Pathname templates</a></li><li><a href="#outlets">Outlets</a></li><li><a href="#nested-routes">Nested routes</a></li><li><a href="#code-splitting">Code splitting</a></li><li><a href="#data-loading">Data loading</a></li><li><a href="#error-boundaries">Error boundaries</a></li><li><a href="#not-found">Not found</a></li><li><a href="#redirects">Redirects</a></li><li><a href="#prefetching">Prefetching</a></li><li><a href="#route-interception">Route interception</a></li><li><a href="#inline-routes">Inline routes</a></li></ul><p>🔗 <a href="#history"><strong>History</strong></a></p><ul><li><a href="#local-and-absolute-URLs">Local and absolute URLs</a></li><li><a href="#search-strings">Search strings</a></li><li><a href="#links">Links</a></li><li><a href="#navigation-blocking">Navigation blocking</a></li></ul><p>🚀 <a href="#server-side-rendering"><strong>Server-side rendering</strong></a></p><ul><li><a href="#rendering-disposition">Rendering disposition</a></li><li><a href="#render-to-string">Render to string</a></li><li><a href="#streaming-ssr">Streaming SSR</a></li><li><a href="#state-serialization">State serialization</a></li><li><a href="#content-security-policy-support">Content-Security-Policy support</a></li></ul><p>🍪 <strong>Cookbook</strong></p><ul><li><a href="#route-masking">Route masking</a></li></ul>',articleContent:`<h1 id="routing"><a class="markdown-permalink" href="#routing"><span class="icon icon-link"></span></a>Routing</h1><p><em>URLs don't matter</em>, they are almost never part of the application domain logic. React Corsair is a router that abstracts URLs away from your application domain.</p><p>Use <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.createRoute.html"><code>Route</code></a> objects instead of URLs to match locations, validate params, navigate between pages, prefetch data, infer types, etc.</p><p>React Corsair can be used in any environment and doesn't require any browser-specific API to be available. While history integration is optional, it is <a href="#history">available out-of-the-box</a> if you need it.</p><p>To showcase how the router works, lets start by creating a page component:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">HelloPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.createRoute.html">Create a route</a> that maps a URL pathname to a page component. Usually, a route declaration this is the only place where you would meet a pathname:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>, <span class="pl-smi">HelloPage</span>);
</code></pre><p>Now we need a <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Router.html"><code>Router</code></a> that would handle the navigation:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">Router</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });
</code></pre><p>To let the router know what route to render, call <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Router.html#navigate"><code>navigate</code></a>:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);
</code></pre><p>Use <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.RouterProvider.html"><code>&#x3C;RouterProvider></code></a> to render the router:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">MyApp</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>;
}
</code></pre><p>And that's how you render your first route with React Corsair!</p><h2 id="router-and-routes"><a class="markdown-permalink" href="#router-and-routes"><span class="icon icon-link"></span></a>Router and routes</h2><p>Routes are navigation entry points. Most routes associate a pathname with a rendered component:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">HelloPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>, <span class="pl-smi">HelloPage</span>);
</code></pre><p>In this example we used a shorthand signature of the <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.createRoute.html"><code>createRoute</code></a> function. You can also use a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html">route options object</a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">HelloPage</span>
});
</code></pre><p>Routes are location providers:</p><pre><code class="language-ts"><span class="pl-smi">helloRoute</span>.<span class="pl-en">getLocation</span>();
<span class="pl-c">// ⮕ { pathname: '/hello', searchParams: {}, hash: '', state: undefined }</span>
</code></pre><p>Routes are matched during router navigation:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">Router</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);
</code></pre><p>Use a location to navigate a router:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>({ pathname: <span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span> });
</code></pre><p>To trigger navigation from inside a component, use the <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.useRouter.html"><code>useRouter</code></a> hook:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">AnotherPage</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-en">useRouter</span>();
  
  <span class="pl-k">const</span> <span class="pl-en">handleClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
    <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);
  };
  
  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">handleClick</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to hello<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>>;
}
</code></pre><p>If you want the browser history to drive your navigation, see the <a href="#history">History</a> section.</p><h2 id="route-params"><a class="markdown-permalink" href="#route-params"><span class="icon icon-link"></span></a>Route params</h2><p>Routes can be parameterized with pathname params and search params. Let's create a route that has a pathname param:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">number</span> }>(<span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>, <span class="pl-smi">ProductPage</span>);
</code></pre><p>Router cannot create a location for a parameterized route by itself, because it doesn't know the required param values. So here's where <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Route.html#getLocation"><code>getLocation</code></a> comes handy:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productLocation</span> <span class="pl-k">=</span> <span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> });
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
</code></pre><p>To access params from a component use the <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.useRoute.html"><code>useRoute</code></a> hook:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">const</span> { <span class="pl-c1">params</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productRoute</span>);
  <span class="pl-c">// ⮕ { sku: 42, color: 'red' }</span>
}
</code></pre><p>Provide params adapter to parse route params:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/users/:userId<span class="pl-pds">'</span></span>,

  <span class="pl-en">paramsAdapter</span>: <span class="pl-v">params</span> <span class="pl-k">=></span> {
    <span class="pl-k">return</span> { userId: <span class="pl-smi">params</span>.<span class="pl-smi">userId</span> };
  }
});
</code></pre><p>Note that we didn't specify parameter types explicitly this time: TypeScript can infer them from the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#paramsAdapter"><code>paramsAdapter</code></a>.</p><p>Use your favourite validation library to parse and validate params:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">d</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>doubter<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,

  paramsAdapter: <span class="pl-smi">d</span>.<span class="pl-en">object</span>({
    sku: <span class="pl-smi">d</span>.<span class="pl-en">number</span>().<span class="pl-en">int</span>().<span class="pl-en">nonNegative</span>().<span class="pl-en">coerce</span>(),
    color: <span class="pl-smi">d</span>.<span class="pl-en">enum</span>([<span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>green<span class="pl-pds">'</span></span>]).<span class="pl-en">optional</span>()
  })
});

<span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span>, color: <span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span> });
</code></pre><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>Read more about <a href="https://github.com/smikhalevski/doubter#readme">Doubter</a>, the runtime validation and transformation library.</p></div><h2 id="pathname-templates"><a class="markdown-permalink" href="#pathname-templates"><span class="icon icon-link"></span></a>Pathname templates</h2><p>A pathname provided for a route is parsed as a pattern. Pathname patterns may contain named params and matching flags. Pathname patterns are compiled into a <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.PathnameTemplate.html"><code>PathnameTemplate</code></a> when route is created. A template allows to both match a pathname, and build a pathname using a provided set of params.</p><p>After a route is created, you can access a pathname pattern like this:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productsRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/products<span class="pl-pds">'</span></span>);

<span class="pl-smi">productsRoute</span>.<span class="pl-smi">pathnameTemplate</span>.<span class="pl-smi">pattern</span>;
<span class="pl-c">// ⮕ '/products'</span>
</code></pre><p>By default, a pathname pattern is case-insensitive. So the route in example above would match both <code>/products</code> and <code>/PRODUCTS</code>.</p><p>If you need a case-sensitive pattern, provide <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#isCaseSensitive"><code>isCaseSensitive</code></a> route option:</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products<span class="pl-pds">'</span></span>,
  isCaseSensitive: <span class="pl-c1">true</span>
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
</code></pre><p>To use <code>:</code> as a character in a pathname pattern, replace it with an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent">encoded</a> representation <code>%3A</code>:</p><pre><code class="language-ts"><span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/foo%3Abar<span class="pl-pds">'</span></span>);
</code></pre><h2 id="outlets"><a class="markdown-permalink" href="#outlets"><span class="icon icon-link"></span></a>Outlets</h2><p>Route components are rendered inside an <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.Outlet.html"><code>&#x3C;Outlet></code></a>. If you don't provide children to <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.RouterProvider.html"><code>&#x3C;RouterProvider></code></a> then it would implicitly render an <code>&#x3C;Outlet></code>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">Router</span>, <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">HelloPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>, <span class="pl-smi">HelloPage</span>);

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">helloRoute</span>);

<span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>;
}
</code></pre><p>You can provide children to <code>&#x3C;RouterProvider></code>:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-ent">main</span>>
        &#x3C;<span class="pl-c1">Outlet</span>/>
      &#x3C;/<span class="pl-ent">main</span>>
    &#x3C;/<span class="pl-c1">RouterProvider</span>>
  );
}
</code></pre><p>The rendered output would be:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">main</span>>Hello&#x3C;/<span class="pl-ent">main</span>>
</code></pre><h2 id="nested-routes"><a class="markdown-permalink" href="#nested-routes"><span class="icon icon-link"></span></a>Nested routes</h2><p>Routes can be nested:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">parentRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/parent<span class="pl-pds">'</span></span>, <span class="pl-smi">ParentPage</span>);

<span class="pl-k">const</span> <span class="pl-c1">childRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-smi">parentRoute</span>, <span class="pl-s"><span class="pl-pds">'</span>/child<span class="pl-pds">'</span></span>, <span class="pl-smi">ChildPage</span>);

<span class="pl-smi">childRoute</span>.<span class="pl-en">getLocation</span>();
<span class="pl-c">// ⮕ { pathname: '/parent/child', searchParams: {}, hash: '', state: undefined }</span>
</code></pre><p>Routes are <a href="#outlets">rendered inside outlets</a>, so <code>ParentPage</code> should render an <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.Outlet.html"><code>&#x3C;Outlet></code></a> to give place for a <code>ChildPage</code>:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ParentPage</span>() {
  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-ent">section</span>>
      &#x3C;<span class="pl-c1">Outlet</span>/>
    &#x3C;/<span class="pl-ent">section</span>>
  );
}

<span class="pl-k">function</span> <span class="pl-en">ChildPage</span>() {
  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">em</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">em</span>>;
}
</code></pre><p>To allow router navigation to <code>childRoute</code> it should be listed among <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouterOptions.html#routes"><code>routes</code></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">childRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">childRoute</span>);
</code></pre><p>The rendered output would be:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">section</span>>&#x3C;<span class="pl-ent">em</span>>Hello&#x3C;/<span class="pl-ent">em</span>>&#x3C;/<span class="pl-ent">section</span>>
</code></pre><p>If you create a route without specifying a component, it would render an <code>&#x3C;Outlet></code> by default:</p><pre><code class="language-diff"><span class="pl-md">- const parentRoute = createRoute('/parent', ParentPage);</span>
<span class="pl-mi1">+ const parentRoute = createRoute('/parent');</span>
</code></pre><p>Now the rendering output would be:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">em</span>>Hello&#x3C;/<span class="pl-ent">em</span>>
</code></pre><h2 id="code-splitting"><a class="markdown-permalink" href="#code-splitting"><span class="icon icon-link"></span></a>Code splitting</h2><p>To enable code splitting in your app, use the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#lazyComponent"><code>lazyComponent</code></a> option, instead of the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#component"><code>component</code></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/user<span class="pl-pds">'</span></span>,
  <span class="pl-en">lazyComponent</span>: () <span class="pl-k">=></span> <span class="pl-k">import</span>(<span class="pl-s"><span class="pl-pds">'</span>./UserPage.js<span class="pl-pds">'</span></span>)
});
</code></pre><p>Default-export the component from the <code>./UserPage.js</code>:</p><pre><code class="language-ts"><span class="pl-k">export</span> <span class="pl-k">default</span> <span class="pl-k">function</span> <span class="pl-en">UserPage</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;
}
</code></pre><p>When router is navigated to the <code>userRoute</code>, a module that contains <code>&#x3C;UserPage></code> is loaded and rendered. The loaded component is cached, so next time the <code>userRoute</code> is matched, <code>&#x3C;UserPage></code> would be rendered instantly.</p><p>A promise is thrown if the <code>lazyComponent</code> isn't loaded yet. You can manually wrap <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.RouterProvider.html"><code>&#x3C;RouterProvider></code></a> in a custom <code>&#x3C;Suspense></code> boundary to catch it and render a fallback:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">LoadingIndicator</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Loading<span class="pl-pds">'</span></span>;
}

&#x3C;<span class="pl-c1">Suspense</span> <span class="pl-e">fallback</span><span class="pl-k">=</span><span class="pl-pse">{</span>&#x3C;<span class="pl-c1">LoadingIndicator</span>/><span class="pl-pse">}</span>>
  &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
&#x3C;/<span class="pl-c1">Suspense</span>>
</code></pre><p>Or you can to provide a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#loadingComponent"><code>loadingComponent</code></a> option to your route, so an <code>&#x3C;Outlet></code> renders a <code>&#x3C;Suspense></code> for you, using <code>loadingComponent</code> as a fallback:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/user<span class="pl-pds">'</span></span>,
  <span class="pl-en">lazyComponent</span>: () <span class="pl-k">=></span> <span class="pl-k">import</span>(<span class="pl-s"><span class="pl-pds">'</span>./UserPage.js<span class="pl-pds">'</span></span>),
  loadingComponent: <span class="pl-smi">LoadingIndicator</span>
});
</code></pre><p>Now, <code>loadingComponent</code> would be rendered if there's loading in progress.</p><p>Each route may have a custom loading component: here you can render a page skeleton or a spinner.</p><p>Router can render the previously matched route when a new route is being loaded, even if a new route has a <code>loadingComponent</code>. Customize this behavior by adding a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#loadingAppearance"><code>loadingAppearance</code></a> option:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">userRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/user<span class="pl-pds">'</span></span>,
  <span class="pl-en">lazyComponent</span>: () <span class="pl-k">=></span> <span class="pl-k">import</span>(<span class="pl-s"><span class="pl-pds">'</span>./UserPage.js<span class="pl-pds">'</span></span>),
  loadingComponent: <span class="pl-smi">LoadingIndicator</span>,
  loadingAppearance: <span class="pl-s"><span class="pl-pds">'</span>always<span class="pl-pds">'</span></span>
});
</code></pre><p>This tells a router to always render <code>userRoute.loadingComponent</code> when <code>userRoute</code> is matched and lazy component isn't loaded yet. <code>loadingAppearance</code> can be set to:</p><dl><dt>"always"</dt><dd><p>Always render <code>loadingComponent</code> if a route requires loading.</p></dd><dt>"reroute"</dt><dd><p>Render <code>loadingComponent</code> only if a route is changed during navigation. This is the default behavior.</p></dd><dt>"avoid"</dt><dd><p>If there's a route that is already rendered then keep it on the screen until the new route is loaded.</p></dd></dl><p>If an error is thrown during <code>lazyComponent</code> loading, an <a href="#error-boundaries">error boundary</a> is rendered and router would retry loading the component again during the next navigation.</p><h2 id="data-loading"><a class="markdown-permalink" href="#data-loading"><span class="icon icon-link"></span></a>Data loading</h2><p>Routes may require some data to render. Triggering data loading during rendering may lead to a <a href="https://blog.sentry.io/fetch-waterfall-in-react/">waterfall</a>. React Corsair provides an easy way to load route data ahead of rendering:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">LoadingIndicator</span>() {
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
  }
});
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Route.html#dataLoader"><code>dataLoader</code></a> is called every time the router is navigated to <code>productRoute</code>. While data is being loaded, the <code>&#x3C;LoadingIndicator></code> is rendered instead of the <code>&#x3C;ProductPage></code>.</p><p>You can access the loaded data in your route component using the <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.useRoute.html"><code>useRoute</code></a> hook:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
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
  }
});
</code></pre><p>A context value should be provided through a router:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({
  routes: [<span class="pl-smi">productRoute</span>],
  context: {
    apiBase: <span class="pl-s"><span class="pl-pds">'</span>https://superpuper.com<span class="pl-pds">'</span></span>
  }
});
</code></pre><h2 id="error-boundaries"><a class="markdown-permalink" href="#error-boundaries"><span class="icon icon-link"></span></a>Error boundaries</h2><p>Each route is rendered in its own <a href="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary">error boundary</a>. If an error occurs during route component rendering or <a href="#data-loading">data loading</a>, then an <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#errorComponent"><code>errorComponent</code></a> is rendered as a fallback:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">ProductsPage</span>() {
  <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-c1">Error</span>(<span class="pl-s"><span class="pl-pds">'</span>Ooops!<span class="pl-pds">'</span></span>);
}

<span class="pl-k">function</span> <span class="pl-en">ErrorDetails</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>An error occurred<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">productsRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductsPage</span>,
  errorComponent: <span class="pl-smi">ErrorDetails</span>
});
</code></pre><p>You can access the error that triggered the error boundary within an error component:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">ErrorDetails</span>() {
  <span class="pl-k">const</span> { <span class="pl-c1">error</span> } <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productsRoute</span>);
  
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>An error occurred: <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">error</span>.<span class="pl-smi">message</span>;
}
</code></pre><p>Some errors are recoverable and only require a route data or component to be <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.RouteController.html#reload">reloaded</a>:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ErrorDetails</span>() {
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
</code></pre><h2 id="not-found"><a class="markdown-permalink" href="#not-found"><span class="icon icon-link"></span></a>Not found</h2><p>During route component rendering, you may detect that there's not enough data to render a route. Call the <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.notFound.html"><code>notFound</code></a> during rendering in such case:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">notFound</span>, <span class="pl-smi">useRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

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
</code></pre><p><code>notFound</code> throws the <a href="https://smikhalevski.github.io/react-corsair/variables/react_corsair.NOT_FOUND.html"><code>NOT_FOUND</code></a> symbol and aborts further rendering of the route component. The <code>&#x3C;Outlet></code> catches <code>NOT_FOUND</code> and renders a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#notFoundComponent"><code>notFoundComponent</code></a> as a fallback:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">ProductNotFound</span>() {
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Product not found<span class="pl-pds">'</span></span>;
}

<span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductPage</span>,
  notFoundComponent: <span class="pl-smi">ProductNotFound</span>
});
</code></pre><p>You can call <code>notFound</code> from a <a href="#data-loading">data loader</a> as well:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">productRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">sku</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/products/:sku<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">ProductPage</span>,
  notFoundComponent: <span class="pl-smi">ProductNotFound</span>,
  
  <span class="pl-en">dataLoader</span>: () <span class="pl-k">=></span> {
    <span class="pl-c">// 🟡 Try to load product here or call notFound</span>
    <span class="pl-en">notFound</span>();
  }
});
</code></pre><p>Force router to render <code>notFoundComponent</code> from an event handler:</p><pre><code class="language-tsx"><span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useRoute</span>(<span class="pl-smi">productRoute</span>);

  <span class="pl-k">const</span> <span class="pl-en">handleClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
    <span class="pl-c">// 🟡 Force Outlet to render the notFoundComponent</span>
    <span class="pl-smi">productRouteController</span>.<span class="pl-en">notFound</span>();
  };
  
  <span class="pl-k">return</span> &#x3C;<span class="pl-ent">button</span> <span class="pl-e">onClick</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">handleClick</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Render not found<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-ent">button</span>> 
}
</code></pre><h2 id="redirects"><a class="markdown-permalink" href="#redirects"><span class="icon icon-link"></span></a>Redirects</h2><p>Trigger redirect during <a href="#data-loading">data loading</a> or during rendering.</p><p>Call <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.redirect.html"><code>redirect</code></a> during rendering:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span>, <span class="pl-smi">redirect</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

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
  }
});
</code></pre><p>Router would render a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#loadingComponent"><code>loadingComponent</code></a> when <code>redirect</code> is called during a data loading or during rendering.</p><p><code>redirect</code> accepts routes, <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.Location.html">locations</a>, and URL strings as an argument.</p><p>Rect Corsair doesn't have a default behavior for redirects. Use a router event listener to handle redirects:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">adminRoute</span>] });

<span class="pl-smi">router</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">!==</span> <span class="pl-s"><span class="pl-pds">'</span>redirect<span class="pl-pds">'</span></span>) {
    <span class="pl-c">// We don't care about non-redirect events in this example</span>
    <span class="pl-k">return</span>;
  }

  <span class="pl-k">if</span> (<span class="pl-k">typeof</span> <span class="pl-c1">event</span>.<span class="pl-smi">to</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>string<span class="pl-pds">'</span></span>) {
    <span class="pl-c1">window</span>.<span class="pl-c1">location</span>.<span class="pl-c1">href</span> <span class="pl-k">=</span> <span class="pl-c1">event</span>.<span class="pl-smi">to</span>;
    <span class="pl-k">return</span>;
  }

  <span class="pl-c">// Navigate a router when redirected to a location </span>
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-c1">event</span>.<span class="pl-smi">to</span>);
});
</code></pre><p>If you want the browser history to drive your redirects, see the <a href="#history">History</a> section.</p><h2 id="prefetching"><a class="markdown-permalink" href="#prefetching"><span class="icon icon-link"></span></a>Prefetching</h2><p>Sometimes you know ahead of time that a user would visit a particular route, and you may want to prefetch the component and <a href="#data-loading">related data</a> so the navigation is instant.</p><p>To do this, call the <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Router.html#prefetch"><code>Router.prefetch</code></a> method and provide a route or a location to prefetch. Router would load required <a href="#code-splitting">components</a> and trigger <a href="#data-loading">data loaders</a>:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-en">prefetch</span>(<span class="pl-smi">productRoute</span>);
</code></pre><p>If a route requires params, use <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Route.html#getLocation"><code>getLocation</code></a> to create a prefetched location:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-en">prefetch</span>(<span class="pl-smi">user</span>.<span class="pl-en">getLocation</span>({ userId: <span class="pl-c1">42</span> }));
</code></pre><p>Use <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.Prefetch.html"><code>Prefetch</code></a> component for a more declarative route prefetching:</p><pre><code class="language-tsx">&#x3C;<span class="pl-c1">Prefetch</span> <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span><span class="pl-pse">}</span>/>
</code></pre><p>React Corsair triggers required <a href="#data-loading">data loaders</a> on every navigation, so you may need to implement caching for data loaders.</p><h2 id="route-interception"><a class="markdown-permalink" href="#route-interception"><span class="icon icon-link"></span></a>Route interception</h2><p>When a router is navigated to a new location, a target route can be intercepted and rendered in the layout of the current route. This can be useful when you want to display the content of a route without the user switching to a different context.</p><p>To showcase how to use route interception, let's start with creating create a shop feed from which products can be opened in a separate page.</p><p>Here's the product route and its component:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createRoute</span>, <span class="pl-smi">useRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

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
  &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
&#x3C;/<span class="pl-c1">HistoryProvider</span>>
</code></pre><p>Now when user opens <code>/shop</code> and clicks on <em>Go to product</em>, the browser location changes to <code>/product/42</code> and the <code>productRoute</code> is rendered.</p><p>With route interception we can render <code>productRoute</code> route inside the <code>&#x3C;ShopPage></code>, so the browser location would be <code>/product/42</code> and the user would see the shop feed with a product inlay.</p><p>To achieve this, add the <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.useInterceptedRoute.html"><code>useInterceptedRoute</code></a> hook to <code>&#x3C;ShopPage></code>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useInterceptedRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">ShopPage</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useInterceptedRoute</span>(<span class="pl-smi">productRoute</span>);
  <span class="pl-c">// ⮕ RouteController | null</span>
  
  <span class="pl-k">return</span> (
    &#x3C;>
      &#x3C;<span class="pl-c1">Link</span> <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> })<span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to product<span class="pl-pds">'</span></span><span class="pl-pse">}</span>&#x3C;/<span class="pl-c1">Link</span>>

      <span class="pl-pse">{</span><span class="pl-smi">productRouteController</span> <span class="pl-k">!==</span> <span class="pl-c1">null</span> <span class="pl-k">&#x26;&#x26;</span> &#x3C;<span class="pl-c1">RouteOutlet</span> <span class="pl-e">controller</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRouteController</span><span class="pl-pse">}</span>/><span class="pl-pse">}</span>
    &#x3C;/>
  );
}
</code></pre><p>Now when user clicks on <em>Go to product</em>, the browser location changes to <code>/product/42</code> and <code>&#x3C;ShopPage></code> is re-rendered. <code>productRouteController</code> would contain a <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.RouteController.html">route controller</a> for <code>productRoute</code>. This controller can be then rendered using the <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.RouteOutlet.html"><code>&#x3C;RouteOutlet></code></a>.</p><p>If a user clicks the <em>Reload</em> button in the browser, a <code>&#x3C;ProductPage></code> would be rendered because it matches <code>/product/42</code>.</p><p>You can render <code>&#x3C;RouteOutlet></code> in a popup to show the product preview, allowing user not to loose the context of the shop feed.</p><p>Use <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Router.html#cancelInterception"><code>cancelInterception</code></a> method to render the intercepted route in a router <code>&#x3C;Outlet></code>:</p><pre><code class="language-ts"><span class="pl-smi">router</span>.<span class="pl-en">cancelInterception</span>();
</code></pre><h2 id="inline-routes"><a class="markdown-permalink" href="#inline-routes"><span class="icon icon-link"></span></a>Inline routes</h2><p>Inline routes allow rendering a route that matches a location inside a component:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useInlineRoute</span>, <span class="pl-smi">RouteOutlet</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">Product</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">productRouteController</span> <span class="pl-k">=</span> <span class="pl-en">useInlineRoute</span>(<span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> }));
  
  <span class="pl-k">return</span> <span class="pl-smi">productRouteController</span> <span class="pl-k">!==</span> <span class="pl-c1">null</span> <span class="pl-k">&#x26;&#x26;</span> &#x3C;<span class="pl-c1">RouteOutlet</span> <span class="pl-e">controller</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRouteController</span><span class="pl-pse">}</span>/>;
}
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.useInlineRoute.html"><code>useInlineRoute</code></a> matches the provided location against routes of the current router and returns a corresponding route controller.</p><h1 id="history"><a class="markdown-permalink" href="#history"><span class="icon icon-link"></span></a>History</h1><p>React Corsair provides a seamless history integration:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">Router</span>, <span class="pl-smi">RouterProvider</span>, <span class="pl-smi">userRoute</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createBrowserHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

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
      &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
    &#x3C;/<span class="pl-c1">HistoryProvider</span>>
  );
}
</code></pre><p>Inside components use <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.useHistory.html"><code>useHistory</code></a> hook to retrieve the provided <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html"><code>History</code></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">useHistory</span>();
</code></pre><p><a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#push">Push</a> and <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#replace">replace</a> routes using history:</p><pre><code class="language-ts"><span class="pl-smi">history</span>.<span class="pl-c1">push</span>(<span class="pl-smi">helloRoute</span>);

<span class="pl-smi">history</span>.<span class="pl-c1">replace</span>(<span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> }));
</code></pre><p>There are three types of history adapters that you can leverage:</p><ul><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/history.createBrowserHistory.html"><code>createBrowserHistory</code></a> is a DOM-specific history adapter, useful in web browsers that support the HTML5 history API.</p></li><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/history.createHashHistory.html"><code>createHashHistory</code></a> is a DOM-specific history adapter that stores location in a <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/hash">URL hash</a>.</p></li><li><p><a href="https://smikhalevski.github.io/react-corsair/functions/history.createMemoryHistory.html"><code>createMemoryHistory</code></a> is an in-memory history adapter, useful in testing and non-DOM environments like SSR.</p></li></ul><h2 id="local-and-absolute-urls"><a class="markdown-permalink" href="#local-and-absolute-urls"><span class="icon icon-link"></span></a>Local and absolute URLs</h2><p>History provides two types of URL strings:</p><ul><li><p>Local URLs can be used as arguments for <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#push"><code>push</code></a> and <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.History.html#replace"><code>replace</code></a> methods.</p></li><li><p>Absolute URLs reflect <code>window.location.href</code>.</p></li></ul><p>All history adapters produce local URLs in the same way:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>);

<span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '/hello'</span>
</code></pre><p>But absolute URLs are produced differently:</p><pre><code class="language-ts"><span class="pl-en">createBrowserHistory</span>().<span class="pl-en">toAbsoluteURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '/hello'</span>

<span class="pl-en">createHashHistory</span>().<span class="pl-en">toAbsoluteURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '#/hello'</span>

<span class="pl-en">createMemoryHistory</span>([<span class="pl-s"><span class="pl-pds">'</span>/<span class="pl-pds">'</span></span>]).<span class="pl-en">toAbsoluteURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '/hello'</span>
</code></pre><p>A <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryOptions.html#basePathname"><code>basePathname</code></a> can be prepended to an absolute URL:</p><pre><code class="language-ts"><span class="pl-en">createBrowserHistory</span>({ basePathname: <span class="pl-s"><span class="pl-pds">'</span>/wow<span class="pl-pds">'</span></span> }).<span class="pl-en">toAbsoluteURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '/wow/hello'</span>

<span class="pl-en">createHashHistory</span>({ basePathname: <span class="pl-s"><span class="pl-pds">'</span>/wow<span class="pl-pds">'</span></span> }).<span class="pl-en">toAbsoluteURL</span>(<span class="pl-smi">helloRoute</span>);
<span class="pl-c">// ⮕ '/wow#/hello'</span>
</code></pre><h2 id="search-strings"><a class="markdown-permalink" href="#search-strings"><span class="icon icon-link"></span></a>Search strings</h2><p>When history serializes a URL, it uses an adapter to stringify search params:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;{ <span class="pl-v">color</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }>(<span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>);

<span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>.<span class="pl-en">getLocation</span>({ color: <span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span> }));
<span class="pl-c">// ⮕ '/hello?color=red'</span>
</code></pre><p>By default, history serializes <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.Location.html#searchParams">search params</a> with <a href="https://smikhalevski.github.io/react-corsair/variables/history.jsonSearchParamsSerializer.html"><code>jsonSearchParamsSerializer</code></a> which serializes individual params with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"><code>JSON</code></a>:</p><pre><code class="language-ts"><span class="pl-k">interface</span> <span class="pl-en">ShopParams</span> {
  <span class="pl-v">pageIndex</span><span class="pl-k">:</span> <span class="pl-c1">number</span>;
  <span class="pl-v">categories</span><span class="pl-k">:</span> <span class="pl-c1">string</span>[];
  <span class="pl-v">sortBy</span><span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>price<span class="pl-pds">'</span></span> <span class="pl-k">|</span> <span class="pl-s"><span class="pl-pds">'</span>rating<span class="pl-pds">'</span></span>;
  <span class="pl-v">available</span><span class="pl-k">:</span> <span class="pl-c1">boolean</span>;
}

<span class="pl-k">const</span> <span class="pl-c1">shopRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>&#x3C;<span class="pl-en">ShopParams</span>>(<span class="pl-s"><span class="pl-pds">'</span>/shop<span class="pl-pds">'</span></span>);

<span class="pl-smi">history</span>.<span class="pl-en">toURL</span>(<span class="pl-smi">helloRoute</span>.<span class="pl-en">getLocation</span>({
  pageIndex: <span class="pl-c1">3</span>,
  categories: [<span class="pl-s"><span class="pl-pds">'</span>electronics<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>gifts<span class="pl-pds">'</span></span>],
  sortBy: <span class="pl-s"><span class="pl-pds">'</span>price<span class="pl-pds">'</span></span>,
  available: <span class="pl-c1">true</span>
}));
<span class="pl-c">// ⮕ '/shop?pageIndex=3&#x26;categories=["electronics","gifts"]&#x26;sortBy=price&#x26;available=true'</span>
</code></pre><p><code>jsonSearchParamsSerializer</code> allows you to store complex data structures in a URL.</p><p>You can create <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryOptions.html#searchParamsSerializer">a custom search params adapter</a> and provide it to a history. Here's how to create a basic adapter that uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams"><code>URLSearchParams</code></a>:</p><pre><code class="language-ts"><span class="pl-en">createBrowserHistory</span>({
  searchParamsSerializer: {

    <span class="pl-en">parse</span>: <span class="pl-v">search</span> <span class="pl-k">=></span> <span class="pl-c1">Object</span>.<span class="pl-en">fromEntries</span>(<span class="pl-k">new</span> <span class="pl-en">URLSearchParams</span>(<span class="pl-smi">search</span>)),

    <span class="pl-en">stringify</span>: <span class="pl-v">params</span> <span class="pl-k">=></span> <span class="pl-k">new</span> <span class="pl-en">URLSearchParams</span>(<span class="pl-smi">params</span>).<span class="pl-c1">toString</span>(),
  }
});
</code></pre><h2 id="links"><a class="markdown-permalink" href="#links"><span class="icon icon-link"></span></a>Links</h2><p>Inside components use <a href="https://smikhalevski.github.io/react-corsair/functions/history.Link.html"><code>&#x3C;Link></code></a> for navigation:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">Link</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">ProductPage</span>() {
  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-c1">Link</span> <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> })<span class="pl-pse">}</span>>
      <span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to a product 42<span class="pl-pds">'</span></span><span class="pl-pse">}</span>
    &#x3C;/<span class="pl-c1">Link</span>>
  );
}
</code></pre><p>Links can automatically <a href="#prefetching">prefetch</a> a route component and <a href="#data-loading">related data</a> as soon as they are rendered:</p><pre><code class="language-tsx">&#x3C;<span class="pl-c1">Link</span>
  <span class="pl-e">to</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">productRoute</span>.<span class="pl-en">getLocation</span>({ sku: <span class="pl-c1">42</span> })<span class="pl-pse">}</span>
  <span class="pl-e">isPrefetched</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-c1">true</span><span class="pl-pse">}</span>
>
  <span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Go to a product 42<span class="pl-pds">'</span></span><span class="pl-pse">}</span>
&#x3C;/<span class="pl-c1">Link</span>>
</code></pre><h2 id="navigation-blocking"><a class="markdown-permalink" href="#navigation-blocking"><span class="icon icon-link"></span></a>Navigation blocking</h2><p>Navigation blocking is a way to prevent navigation from happening. This is typical if a user attempts to navigate while there are unsaved changes. Usually, in such situation, a prompt or a custom UI should be shown to the user to confirm the navigation.</p><p>Use the <a href="https://smikhalevski.github.io/react-corsair/functions/history.useHistoryBlocker.html"><code>useHistoryBlocker</code></a> hook to intercept the navigation attempt and show a browser confirmation popup to the user:</p><pre><code class="language-tsx"><span class="pl-k">const</span> [<span class="pl-c1">hasUnsavedChanges</span>, <span class="pl-c1">setHasUnsavedChanges</span>] <span class="pl-k">=</span> <span class="pl-en">useState</span>(<span class="pl-c1">false</span>);

<span class="pl-en">useHistoryBlocker</span>(() <span class="pl-k">=></span> {
  <span class="pl-c">// 🟡 Return true to cancel navigation or false to proceed</span>
  <span class="pl-k">return</span> <span class="pl-smi">hasUnsavedChanges</span> <span class="pl-k">&#x26;&#x26;</span> <span class="pl-k">!</span><span class="pl-en">confirm</span>(<span class="pl-s"><span class="pl-pds">'</span>Discard unsaved changes?<span class="pl-pds">'</span></span>)
});
</code></pre><p>A blocker function provided to the <code>useHistoryBlocker</code> hook receives a navigation transaction. With <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryTransaction.html#proceed"><code>proceed</code></a> and <a href="https://smikhalevski.github.io/react-corsair/interfaces/history.HistoryTransaction.html#cancel"><code>cancel</code></a> methods you can handle a navigation transaction in an asynchronous manner:</p><pre><code class="language-tsx"><span class="pl-en">useHistoryBlocker</span>(<span class="pl-v">transaction</span> <span class="pl-k">=></span> {
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
)
</code></pre><p>Always ask user to confirm the navigation:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-c1">transaction</span> <span class="pl-k">=</span> <span class="pl-en">useHistoryBlocker</span>();
</code></pre><h1 id="server-side-rendering"><a class="markdown-permalink" href="#server-side-rendering"><span class="icon icon-link"></span></a>Server-side rendering</h1><p>Routes can be rendered on the server side and then hydrated on the client side.</p><p>To enable hydration on the client, create a <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Router.html"><code>Router</code></a> and call <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.hydrateRouter.html"><code>hydrateRouter</code></a> instead of <a href="https://smikhalevski.github.io/react-corsair/classes/react_corsair.Router.html#navigate"><code>Router.navigate</code></a>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> <span class="pl-smi">React</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
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
    &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
  &#x3C;/<span class="pl-c1">HistoryProvider</span>>
);
</code></pre><div class="markdown-alert markdown-alert-important"><p class="markdown-alert-title"><svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>Important</p><p>The location passed to <code>hydrateRouter</code> and set of routes passed to the <code>Router</code> on the client-side must be the same as ones used during the server-side rendering. Otherwise, hydration behavior is undefined.</p></div><p><a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.hydrateRouter.html"><code>hydrateRouter</code></a> must be called only once, and only one router on the client side can receive the dehydrated state from the server.</p><p>On the server, you can either render your app contents <a href="#render-to-string">as a string</a> and send it to the client in one go, or <a href="#streaming-ssr">stream the contents</a>.</p><h2 id="rendering-disposition"><a class="markdown-permalink" href="#rendering-disposition"><span class="icon icon-link"></span></a>Rendering disposition</h2><p>By default, when SSR is used, all routes are rendered both on the server side and on the client side. You can prevent server-side rendering for a route by specifying the <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.RouteOptions.html#renderingDisposition"><code>renderingDisposition</code></a> option:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloRoute</span> <span class="pl-k">=</span> <span class="pl-en">createRoute</span>({
  pathname: <span class="pl-s"><span class="pl-pds">'</span>/hello<span class="pl-pds">'</span></span>,
  component: <span class="pl-smi">HelloPage</span>,
  renderingDisposition: <span class="pl-s"><span class="pl-pds">'</span>client<span class="pl-pds">'</span></span>
});
</code></pre><p>Now <code>helloRoute</code> is rendered on the client-side only.</p><p>Rendering disposition can be set to:</p><dl><dt>"server"</dt><dd>Route is rendered on the server during SSR and hydrated on the client.</dd><dt>"client"</dt><dd>Route is rendered on the client. Loading state is rendered on the server during SSR.</dd></dl><h2 id="render-to-string"><a class="markdown-permalink" href="#render-to-string"><span class="icon icon-link"></span></a>Render to string</h2><p>Use <a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html"><code>SSRRouter</code></a> to render your app as an HTML string:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createServer</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>http<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">renderToString</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createMemoryHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">SSRRouter</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/ssr<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">server</span> <span class="pl-k">=</span> <span class="pl-en">createServer</span>(<span class="pl-k">async</span> (<span class="pl-v">request</span>, <span class="pl-v">response</span>) <span class="pl-k">=></span> {
  
  <span class="pl-c">// 1️⃣ Create a new history and a new router for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createMemoryHistory</span>([<span class="pl-smi">request</span>.<span class="pl-smi">url</span>]);

  <span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRRouter</span>({ routes: [<span class="pl-smi">helloRoute</span>] });
  
  <span class="pl-c">// 2️⃣ Navigate router to a requested location</span>
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);

  <span class="pl-k">let</span> <span class="pl-smi">html</span>;

  <span class="pl-c">// 3️⃣ Re-render until there are no more changes</span>
  <span class="pl-k">while</span> (<span class="pl-k">await</span> <span class="pl-smi">router</span>.<span class="pl-en">hasChanges</span>()) {
    <span class="pl-smi">html</span> <span class="pl-k">=</span> <span class="pl-en">renderToString</span>(
      &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
        &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
      &#x3C;/<span class="pl-c1">HistoryProvider</span>>
    );
  }

  <span class="pl-c">// 4️⃣ Attach dehydrated route states</span>
  <span class="pl-smi">html</span> <span class="pl-k">+=</span> <span class="pl-smi">router</span>.<span class="pl-en">nextHydrationChunk</span>();

  <span class="pl-c">// 5️⃣ Send the rendered HTML to the client</span>
  <span class="pl-smi">response</span>.<span class="pl-en">end</span>(<span class="pl-smi">html</span>);
});

<span class="pl-smi">server</span>.<span class="pl-en">listen</span>(<span class="pl-c1">8080</span>);
</code></pre><p>You may also need to attach the chunk with your application code:</p><pre><code class="language-ts"><span class="pl-smi">html</span> <span class="pl-k">+=</span> <span class="pl-s"><span class="pl-pds">'</span>&#x3C;script src="/client.js" async>&#x3C;/script><span class="pl-pds">'</span></span>;
</code></pre><p>A new router and a new history must be created for each request, so the results that are stored in router are served in response to a particular request.</p><p><a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html#hasChanges"><code>hasChanges</code></a> would resolve with <code>true</code> if state of some routes have changed during rendering.</p><p>The hydration chunk returned by <a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html#nextHydrationChunk"><code>nextHydrationChunk</code></a> contains the <code>&#x3C;script></code> tag that hydrates the router for which <a href="https://smikhalevski.github.io/react-corsair/functions/react_corsair.hydrateRouter.html"><code>hydrateRouter</code></a> is invoked on the client side.</p><h2 id="streaming-ssr"><a class="markdown-permalink" href="#streaming-ssr"><span class="icon icon-link"></span></a>Streaming SSR</h2><p>React can stream parts of your app while it is being rendered. React Corsair provides API to inject its hydration chunks into a streaming process. The API is different for NodeJS streams and <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">Readable Web Streams</a>.</p><p>In NodeJS environment use <a href="https://smikhalevski.github.io/react-corsair/classes/ssr_node.PipeableSSRRouter.html"><code>PipeableSSRRouter</code></a></p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createServer</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>http<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">renderToPipeableStream</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createMemoryHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">PipeableSSRRouter</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/ssr/node<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">server</span> <span class="pl-k">=</span> <span class="pl-en">createServer</span>((<span class="pl-v">request</span>, <span class="pl-v">response</span>) <span class="pl-k">=></span> {

  <span class="pl-c">// 1️⃣ Create a new history and a new router for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createMemoryHistory</span>([<span class="pl-smi">request</span>.<span class="pl-smi">url</span>]);

  <span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">PipeableSSRRouter</span>(<span class="pl-smi">response</span>, { routes: [<span class="pl-smi">helloRoute</span>] });

  <span class="pl-c">// 2️⃣ Navigate router to a requested location</span>
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);

  <span class="pl-k">const</span> <span class="pl-c1">stream</span> <span class="pl-k">=</span> <span class="pl-en">renderToPipeableStream</span>(
    &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
    &#x3C;/<span class="pl-c1">HistoryProvider</span>>,
    {
      bootstrapScripts: [<span class="pl-s"><span class="pl-pds">'</span>/client.js<span class="pl-pds">'</span></span>],

      <span class="pl-en">onShellReady</span>() {
        <span class="pl-c">// 3️⃣ Pipe the rendering output to the router's stream</span>
        <span class="pl-smi">stream</span>.<span class="pl-en">pipe</span>(<span class="pl-smi">router</span>.<span class="pl-smi">stream</span>);
      },
    }
  );
});

<span class="pl-smi">server</span>.<span class="pl-en">listen</span>(<span class="pl-c1">8080</span>);
</code></pre><p>Router hydration chunks are streamed to the client along with chunks rendered by React.</p><h3 id="readable-web-streams-support"><a class="markdown-permalink" href="#readable-web-streams-support"><span class="icon icon-link"></span></a>Readable web streams support</h3><p>To enable streaming in a modern environment, use <a href="https://smikhalevski.github.io/react-corsair/classes/ssr.ReadableSSRRouter.html"><code>ReadableSSRRouter</code></a></p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createServer</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>http<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">renderToPipeableStream</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createMemoryHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">ReadableSSRRouter</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/ssr<span class="pl-pds">'</span></span>;

<span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">handler</span>(<span class="pl-v">request</span>) {

  <span class="pl-c">// 1️⃣ Create a new history and a new router for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createMemoryHistory</span>([<span class="pl-smi">request</span>.<span class="pl-smi">url</span>]);

  <span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ReadableSSRRouter</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

  <span class="pl-c">// 2️⃣ Navigate router to a requested location</span>
  <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">history</span>.<span class="pl-c1">location</span>);
  
  <span class="pl-k">const</span> <span class="pl-c1">stream</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">renderToReadableStream</span>(
    &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
    &#x3C;/<span class="pl-c1">HistoryProvider</span>>,
    {
      bootstrapScripts: [<span class="pl-s"><span class="pl-pds">'</span>/client.js<span class="pl-pds">'</span></span>],
    }
  );

  <span class="pl-c">// 3️⃣ Pipe the response through the router</span>
  <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-en">Response</span>(<span class="pl-smi">stream</span>.<span class="pl-en">pipeThrough</span>(<span class="pl-smi">router</span>), {
    headers: { <span class="pl-s"><span class="pl-pds">'</span>content-type<span class="pl-pds">'</span></span>: <span class="pl-s"><span class="pl-pds">'</span>text/html<span class="pl-pds">'</span></span> },
  });
}
</code></pre><p>Router hydration chunks are streamed to the client along with chunks rendered by React.</p><h2 id="state-serialization"><a class="markdown-permalink" href="#state-serialization"><span class="icon icon-link"></span></a>State serialization</h2><p>By default, route state is serialized using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"><code>JSON.stringify</code></a> which has quite a few limitations. If your route <a href="#data-loading">loads data</a> that may contain circular references, or non-serializable data like <code>BigInt</code>, use a custom state serialization.</p><p>On the client, pass a <a href="https://smikhalevski.github.io/react-corsair/interfaces/react_corsair.HydrateRouterOptions.html#stateParser"><code>stateParser</code></a> option to <code>hydrateRouter</code>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> <span class="pl-smi">React</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRoot</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/client<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">createBrowserHistory</span>, <span class="pl-smi">HistoryProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-router/history<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRouter</span>, <span class="pl-smi">Router</span>, <span class="pl-smi">RouterProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-router<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">JSONMarshal</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">history</span> <span class="pl-k">=</span> <span class="pl-en">createBrowserHistory</span>();

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Router</span>({ routes: [<span class="pl-smi">helloRoute</span>] });

<span class="pl-en">hydrateRouter</span>(<span class="pl-smi">router</span>, <span class="pl-smi">history</span>.<span class="pl-c1">location</span>, {
  <span class="pl-c">// 🟡 Pass a custom state parser</span>
  stateParser: <span class="pl-smi">JSONMarshal</span>.<span class="pl-smi">parse</span>
});

<span class="pl-en">hydrateRoot</span>(
  <span class="pl-c1">document</span>,
  &#x3C;<span class="pl-c1">HistoryProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">history</span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-c1">RouterProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">router</span><span class="pl-pse">}</span>/>
  &#x3C;/<span class="pl-c1">HistoryProvider</span>>
);
</code></pre><p>On the server, pass a <a href="https://smikhalevski.github.io/react-corsair/interfaces/ssr.SSRRouterOptions.html#stateStringifier"><code>stateStringifier</code></a> option to <a href="#render-to-string"><code>SSRRouter</code></a>, <a href="#streaming-ssr"><code>PipeableSSRRouter</code></a>, or <a href="#readable-web-streams-support"><code>ReadableSSRRouter</code></a>, depending on your setup:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">ReadableSSRRouter</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-corsair/ssr<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">JSONMarshal</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ReadableSSRRouter</span>({
  routes: [<span class="pl-smi">helloRoute</span>],
  stateStringifier: <span class="pl-smi">JSONMarshal</span>.<span class="pl-smi">stringify</span>
});
</code></pre><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>Read more about <a href="https://github.com/smikhalevski/json-marshal#readme">JSON Marshal</a>, it can stringify and parse any data structure.</p></div><h2 id="content-security-policy-support"><a class="markdown-permalink" href="#content-security-policy-support"><span class="icon icon-link"></span></a>Content-Security-Policy support</h2><p>By default, <a href="https://smikhalevski.github.io/react-corsair/classes/ssr.SSRRouter.html#nextHydrationChunk"><code>nextHydrationChunk</code></a> renders an inline <code>&#x3C;script></code> tag without any attributes. To enable the support of the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src"><code>script-src</code></a> directive of the <code>Content-Security-Policy</code> header, provide the <a href="https://smikhalevski.github.io/react-corsair/interfaces/ssr.SSRRouterOptions.html#nonce"><code>nonce</code></a> option to <code>SSRRouter</code> or any of its subclasses:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">router</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRRouter</span>({
  routes: [<span class="pl-smi">helloRoute</span>],
  nonce: <span class="pl-s"><span class="pl-pds">'</span>2726c7f26c<span class="pl-pds">'</span></span>
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

<span class="pl-c">// A set of routes that require user to be logged in</span>
<span class="pl-k">const</span> <span class="pl-c1">privateRoutes</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-c1">Set</span>([<span class="pl-smi">adminRoute</span>]);

<span class="pl-c">// User status provided by your application</span>
<span class="pl-k">const</span> <span class="pl-c1">isLoggedIn</span> <span class="pl-k">=</span> <span class="pl-c1">false</span>;

<span class="pl-smi">router</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (
    <span class="pl-k">!</span><span class="pl-smi">isLoggedIn</span> <span class="pl-k">&#x26;&#x26;</span>
    <span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>navigate<span class="pl-pds">'</span></span> <span class="pl-k">&#x26;&#x26;</span>
    <span class="pl-c1">event</span>.<span class="pl-smi">controller</span> <span class="pl-k">!==</span> <span class="pl-c1">null</span> <span class="pl-k">&#x26;&#x26;</span>
    <span class="pl-smi">privateRoutes</span>.<span class="pl-c1">has</span>(<span class="pl-c1">event</span>.<span class="pl-smi">controller</span>.<span class="pl-smi">route</span>)) {
    <span class="pl-smi">router</span>.<span class="pl-c1">navigate</span>(<span class="pl-smi">loginPage</span>);
  }
});
</code></pre>`};function d(){return s.createElement(n,{logo:s.createElement("div",{style:{...l(p,a),aspectRatio:830/470,backgroundRepeat:"no-repeat",backgroundSize:"contain",maxWidth:"100%",width:"20rem"},title:"React Corsair"}),readme:e})}export{d as default};
