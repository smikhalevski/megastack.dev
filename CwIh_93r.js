import{b as s}from"./SnjZ_IlD.js";import{r as a,b as p}from"./CtQYgjR8.js";import{R as e}from"./CSeuen2n.js";import{l as n}from"./BbmkiE0D.js";import"./DBVUHq77.js";const l={version:"0.0.25",overviewContent:'<p>Asynchronous task execution and state management for React.</p><ul><li>TypeScript first.</li><li>Expressive and concise API with strict typings.</li><li>Works great with SSR and Suspense.</li><li><a href="#plugins">Extensible with plugins.</a></li><li><a href="#devtools">First class devtools.</a></li><li><a href="https://pkg-size.dev/react-executor">Just 5 kB gzipped. <sup>↗</sup></a></li><li>Check out the <a href="#cookbook">Cookbook</a> for real-life examples!</li></ul>',tocContent:'<ul><li><a href="https://github.com/smikhalevski/react-executor#readme">GitHub <sup>↗</sup></a></li><li><a href="https://smikhalevski.github.io/react-executor/">API docs <sup>↗</sup></a></li><li><a href="https://stackblitz.com/edit/react-executor-todo-app?file=README.md">TODO app example <sup>↗</sup></a></li><li><a href="https://codesandbox.io/p/devbox/react-executor-ssr-streaming-example-mwrmrs">Streaming SSR example <sup>↗</sup></a></li><li><a href="https://codesandbox.io/p/devbox/react-executor-next-example-whsj4v">Next.js integration example <sup>↗</sup></a></li></ul><p><span class="toc-icon">🔰 </span><a href="#introduction"><strong>Introduction</strong></a></p><ul><li><a href="#executor-keys">Executor keys</a></li><li><a href="#execute-a-task">Execute a task</a></li><li><a href="#abort-a-task">Abort a task</a></li><li><a href="#replace-a-task">Replace a task</a></li><li><a href="#wait-for-a-task-to-complete">Wait for a task to complete</a></li><li><a href="#retry-the-latest-task">Retry the latest task</a></li><li><a href="#settle-an-executor">Settle an executor</a></li><li><a href="#clear-an-executor">Clear an executor</a></li></ul><p><span class="toc-icon">📢 </span><a href="#events-and-lifecycle"><strong>Events and lifecycle</strong></a></p><ul><li><a href="#activate-an-executor">Activate an executor</a></li><li><a href="#invalidate-results">Invalidate results</a></li><li><a href="#detach-an-executor">Detach an executor</a></li></ul><p><span class="toc-icon">🔌 </span><a href="#plugins"><strong>Plugins</strong></a></p><ul><li><a href="#abortdeactivated"><code>abortDeactivated</code></a></li><li><a href="#abortpendingafter"><code>abortPendingAfter</code></a></li><li><a href="#abortwhen"><code>abortWhen</code></a></li><li><a href="#detachdeactivated"><code>detachDeactivated</code></a></li><li><a href="#detachinactive"><code>detachInactive</code></a></li><li><a href="#invalidateafter"><code>invalidateAfter</code></a></li><li><a href="#invalidatebypeers"><code>invalidateByPeers</code></a></li><li><a href="#invalidatepeers"><code>invalidatePeers</code></a></li><li><a href="#lazytask"><code>lazyTask</code></a></li><li><a href="#rejectpendingafter"><code>rejectPendingAfter</code></a></li><li><a href="#resolveby"><code>resolveBy</code></a></li><li><a href="#retryactivated"><code>retryActivated</code></a></li><li><a href="#retryfulfilled"><code>retryFulfilled</code></a></li><li><a href="#retryinvalidated"><code>retryInvalidated</code></a></li><li><a href="#retryrejected"><code>retryRejected</code></a></li><li><a href="#retrywhen"><code>retryWhen</code></a></li><li><a href="#syncstorage"><code>syncStorage</code></a></li></ul><p><span class="toc-icon">⚛️ </span><a href="#react-integration"><strong>React integration</strong></a></p><ul><li><a href="#suspense">Suspense</a></li><li><a href="#external-executors">External executors</a></li></ul><p><span class="toc-icon">🚀 </span><a href="#server-side-rendering"><strong>Server-side rendering</strong></a></p><ul><li><a href="#render-to-string">Render to string</a></li><li><a href="#streaming-ssr">Streaming SSR</a></li><li><a href="#state-serialization">State serialization</a></li><li><a href="#content-security-policy-support">Content-Security-Policy support</a></li><li><a href="#nextjs-integration">Next.js integration</a></li></ul><p><span class="toc-icon">⚙️ </span><a href="#devtools"><strong>Devtools</strong></a></p><p><span class="toc-icon">🍪 </span><strong>Cookbook</strong></p><ul><li><a href="#optimistic-updates">Optimistic updates</a></li><li><a href="#dependent-tasks">Dependent tasks</a></li><li><a href="#pagination">Pagination</a></li><li><a href="#infinite-scroll">Infinite scroll</a></li><li><a href="#invalidate-all-executors">Invalidate all executors</a></li><li><a href="#prefetching">Prefetching</a></li><li><a href="#storage-state-versioning">Storage state versioning</a></li><li><a href="#global-loading-indicator">Global loading indicator</a></li></ul>',articleContent:`<h1 id="introduction"><a class="markdown-permalink" href="#introduction"><span class="icon icon-link"></span></a>Introduction</h1><p>An executor executes a task, stores the execution result, and provides access to it. Tasks are callbacks that return a value or throw an error.</p><p>An <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html"><code>Executor</code> <sup>↗</sup></a> is created and managed by an <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html"><code>ExecutorManager</code> <sup>↗</sup></a> which controls the executor lifecycle:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">ExecutorManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-k">const</span> <span class="pl-c1">rookyExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>rooky<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Executor&#x3C;any></span>
</code></pre><p>Each executor has a unique key in the scope of the manager. Here we created the new executor with the key <code>'rooky'</code>. Managers create a new executor when you call <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html#getorcreate"><code>getOrCreate</code> <sup>↗</sup></a> with a new key. Each consequent call with that key returns the same executor.</p><p>If you want to retrieve an existing executor by its key and don't want to create a new executor if it doesn't exist, use <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html#get"><code>get</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-smi">manager</span>.<span class="pl-c1">get</span>(<span class="pl-s"><span class="pl-pds">'</span>bobby<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ undefined</span>

<span class="pl-smi">manager</span>.<span class="pl-c1">get</span>(<span class="pl-s"><span class="pl-pds">'</span>rooky<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Executor&#x3C;any></span>
</code></pre><p>The executor we created is unsettled, which means it neither stores a value, nor a task failure reason:</p><pre><code class="language-ts"><span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isSettled</span>;
<span class="pl-c">// ⮕ false</span>
</code></pre><p>An executor can be created with an initial value:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">bobbyExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>bobby<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>);

<span class="pl-smi">bobbyExecutor</span>.<span class="pl-smi">isSettled</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-c">// The result stored in the executor is a value</span>
<span class="pl-smi">bobbyExecutor</span>.<span class="pl-smi">isFulfilled</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">bobbyExecutor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 42</span>
</code></pre><p>An initial value can be a task which is executed, a promise which the executor awaits, or any other value that instantly fulfills the executor. Read more in the <a href="#execute-a-task">Execute a task</a> and in the <a href="#settle-an-executor">Settle an executor</a> sections.</p><p>When an executor is created, you can provide an array of plugins:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">retryRejected</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryRejected<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">rookyExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>rooky<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [<span class="pl-en">retryRejected</span>()]);
</code></pre><p>Plugins can subscribe to <a href="#events-and-lifecycle">executor events</a> or alter the executor instance. Read more about plugins in the <a href="#plugins">Plugins</a> section.</p><h2 id="executor-keys"><a class="markdown-permalink" href="#executor-keys"><span class="icon icon-link"></span></a>Executor keys</h2><p>Anything can be an executor key: a string, a number, an object, etc. By default, keys are considered identical if their <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"><code>JSON</code> <sup>↗</sup></a> -serialized form is identical:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-k">const</span> <span class="pl-c1">userExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>([<span class="pl-s"><span class="pl-pds">'</span>user<span class="pl-pds">'</span></span>, <span class="pl-c1">123</span>]);

<span class="pl-smi">manager</span>.<span class="pl-c1">get</span>([<span class="pl-s"><span class="pl-pds">'</span>user<span class="pl-pds">'</span></span>, <span class="pl-c1">123</span>]);
<span class="pl-c">// ⮕ userExecutor</span>
</code></pre><p>To override, how keys are serialized pass <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.ExecutorManagerOptions.html#keyserializer"><code>keySerializer</code> <sup>↗</sup></a> option to the <code>ExecutorManager</code> constructor. Key serializer is a function that receives the requested executor key and returns its serialized form. The returned serialized key form can be anything, a string, or an object.</p><p>If you're using objects as executor keys, then you may want to enable stable serialization (when keys are sorted alphabetically during serialization). In this case use any library that supports stable JSON serialization:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">stringify</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>({
  <span class="pl-en">keySerializer</span>: <span class="pl-v">key</span> <span class="pl-k">=></span> <span class="pl-en">stringify</span>(<span class="pl-smi">key</span>, { isStable: <span class="pl-c1">true</span> }),
});

<span class="pl-k">const</span> <span class="pl-c1">bobrExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>({ id: <span class="pl-c1">123</span>, name: <span class="pl-s"><span class="pl-pds">'</span>Woody<span class="pl-pds">'</span></span> });
<span class="pl-c">// ⮕ Executor&#x3C;any></span>

<span class="pl-c">// 🟡 Key properties are listed in a different order</span>
<span class="pl-smi">manager</span>.<span class="pl-c1">get</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>Woody<span class="pl-pds">'</span></span>, id: <span class="pl-c1">123</span> });
<span class="pl-c">// ⮕ bobrExecutor</span>
</code></pre><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>With additional configuration, <a href="https://github.com/smikhalevski/json-marshal#readme">json-marshal <sup>↗</sup></a> can stringify and parse any data structure.</p></div><p>If you want to use object references as executor keys, provide an identity function as a serializer:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>({
  <span class="pl-en">keySerializer</span>: <span class="pl-v">key</span> <span class="pl-k">=></span> <span class="pl-smi">key</span>,
});

<span class="pl-k">const</span> <span class="pl-c1">bobrKey</span> <span class="pl-k">=</span> { id: <span class="pl-c1">123</span> };

<span class="pl-k">const</span> <span class="pl-c1">bobrExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-smi">bobrKey</span>);

<span class="pl-c">// The same executor is returned for the same key</span>
<span class="pl-smi">manager</span>.<span class="pl-c1">get</span>(<span class="pl-smi">bobrKey</span>);
<span class="pl-c">// ⮕ bobrExecutor</span>

<span class="pl-k">const</span> <span class="pl-c1">anotherBobrExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>({ id: <span class="pl-c1">123</span> });

<span class="pl-c">// 🟡 Executors are different because different objects were used as keys</span>
<span class="pl-smi">bobrExecutor</span> <span class="pl-k">===</span> <span class="pl-smi">anotherBobrExecutor</span>;
<span class="pl-c">// ⮕ false</span>
</code></pre><h2 id="execute-a-task"><a class="markdown-permalink" href="#execute-a-task"><span class="icon icon-link"></span></a>Execute a task</h2><p>Let's execute a new task:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">ExecutorManager</span>, <span class="pl-smi">ExecutorTask</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-k">const</span> <span class="pl-c1">rookyExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>rooky<span class="pl-pds">'</span></span>);

<span class="pl-k">const</span> <span class="pl-en">helloTask</span><span class="pl-k">:</span> <span class="pl-en">ExecutorTask</span> <span class="pl-k">=</span> <span class="pl-k">async</span> (<span class="pl-v">signal</span>, <span class="pl-v">executor</span>) <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">helloPromise</span> <span class="pl-k">=</span> <span class="pl-smi">rookyExecutor</span>.<span class="pl-en">execute</span>(<span class="pl-smi">task</span>);
<span class="pl-c">// ⮕ AbortablePromise&#x3C;any></span>
</code></pre><p><code>helloTask</code> receives an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal"><code>AbortSignal</code> <sup>↗</sup></a> and <code>rookyExecutor</code> as arguments. The signal is aborted if the task is <a href="#abort-a-task">aborted</a> or <a href="#replace-a-task">replaced</a>.</p><p>While tasks can be synchronous or asynchronous, executors always handle them in an asynchronous fashion. The executor is marked as <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#ispending">pending <sup>↗</sup></a> immediately after <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#execute"><code>execute</code> <sup>↗</sup></a> is called:</p><pre><code class="language-ts"><span class="pl-c">// The executor is waiting for the task to complete</span>
<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isPending</span>;
<span class="pl-c">// ⮕ true</span>
</code></pre><p><code>helloPromise</code> is resolved when the task completes:</p><pre><code class="language-ts"><span class="pl-k">await</span> <span class="pl-smi">helloPromise</span>;

<span class="pl-c">// The executor doesn't have a pending task anymore</span>
<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isPending</span>;
<span class="pl-c">// ⮕ false</span>

<span class="pl-c">// The result stored in the executor is a value</span>
<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isFulfilled</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">rookyExecutor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 'Hello'</span>
</code></pre><p>The executor keeps track of the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#task">latest task <sup>↗</sup></a> it has executed:</p><pre><code class="language-ts"><span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">task</span>;
<span class="pl-c">// ⮕ helloTask</span>
</code></pre><p>If a task throws an error (or returns a promise that rejects with an error), then the promise returned from the <code>execute</code> is rejected:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">ooopsPromise</span> <span class="pl-k">=</span> <span class="pl-smi">rookyExecutor</span>.<span class="pl-en">execute</span>(() <span class="pl-k">=></span> {
  <span class="pl-k">throw</span> <span class="pl-k">new</span> <span class="pl-c1">Error</span>(<span class="pl-s"><span class="pl-pds">'</span>Ooops!<span class="pl-pds">'</span></span>);
});
<span class="pl-c">// ⮕ Promise{&#x3C;rejected>}</span>

<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isPending</span>;
<span class="pl-c">// ⮕ true</span>
</code></pre><p>The executor becomes rejected as well after <code>ooopsPromise</code> is settled:</p><pre><code class="language-ts"><span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isRejected</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-c">// The reason of the task failure</span>
<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">reason</span>;
<span class="pl-c">// ⮕ Error('Ooops!')</span>
</code></pre><p>Executors always preserve the latest value and the latest reason. So even when the executor <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#ispending"><code>isPending</code> <sup>↗</sup></a>, you can access the previous value or failure reason. Use <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#isfulfilled"><code>isFulfilled</code> <sup>↗</sup></a> and <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#isrejected"><code>isRejected</code> <sup>↗</sup></a> to detect with what result the executor has settled the last time. An executor cannot be both fulfilled and rejected at the same time.</p><pre><code class="language-ts"><span class="pl-c">// Execute a new task</span>
<span class="pl-k">const</span> <span class="pl-c1">byePromise</span> <span class="pl-k">=</span> <span class="pl-smi">rookyExecutor</span>.<span class="pl-en">execute</span>(() <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Bye<span class="pl-pds">'</span></span>);

<span class="pl-c">// 1️⃣ The executor is waiting for the task to complete</span>
<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isPending</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-c">// 2️⃣ The executor is still rejected after the previous task</span>
<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isRejected</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">reason</span>;
<span class="pl-c">// ⮕ Error('Ooops!')</span>

<span class="pl-c">// 3️⃣ The executor still holds the latest value, but it isn't fulfilled</span>
<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isFulfilled</span>;
<span class="pl-c">// ⮕ false</span>

<span class="pl-smi">rookyExecutor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 'Hello'</span>
</code></pre><p>The executor becomes fulfilled after <code>byePromise</code> settles:</p><pre><code class="language-ts"><span class="pl-k">await</span> <span class="pl-smi">byePromise</span>;

<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isFulfilled</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">rookyExecutor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 'Bye'</span>
</code></pre><h2 id="abort-a-task"><a class="markdown-permalink" href="#abort-a-task"><span class="icon icon-link"></span></a>Abort a task</h2><p>The promise returned by the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#execute"><code>execute</code> <sup>↗</sup></a> method is <a href="https://smikhalevski.github.io/parallel-universe/classes/AbortablePromise.html">abortable <sup>↗</sup></a> so the task can be prematurely aborted. Results of the aborted task are discarded:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">helloPromise</span> <span class="pl-k">=</span> <span class="pl-smi">rookyExecutor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> () <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>);

<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isPending</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">helloPromise</span>.<span class="pl-c1">abort</span>();

<span class="pl-smi">rookyExecutor</span>.<span class="pl-smi">isPending</span>;
<span class="pl-c">// ⮕ false</span>
</code></pre><p>It isn't always convenient to keep the reference to the task execution promise, and you can abort the pending task by aborting the whole executor:</p><pre><code class="language-ts"><span class="pl-smi">rookyExecutor</span>.<span class="pl-c1">abort</span>();
</code></pre><p>If there's no pending task, then aborting an executor is a no-op.</p><p>When a task is aborted, the signal it received as an argument is aborted as well. Check the <a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/aborted">signal status <sup>↗</sup></a> to ensure that computation should be concluded.</p><p>For example, if you're fetching data from the server inside a task, you can pass signal as a <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch#signal"><code>fetch</code> <sup>↗</sup></a> option:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">byeTask</span><span class="pl-k">:</span> <span class="pl-en">ExecutorTask</span> <span class="pl-k">=</span> <span class="pl-k">async</span> (<span class="pl-v">signal</span>, <span class="pl-v">executor</span>) <span class="pl-k">=></span> {
  <span class="pl-k">const</span> <span class="pl-c1">response</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">fetch</span>(<span class="pl-s"><span class="pl-pds">'</span>/bye<span class="pl-pds">'</span></span>, { <span class="pl-smi">signal</span> });

  <span class="pl-k">return</span> <span class="pl-smi">response</span>.<span class="pl-en">json</span>();
};
</code></pre><h2 id="replace-a-task"><a class="markdown-permalink" href="#replace-a-task"><span class="icon icon-link"></span></a>Replace a task</h2><p>If a new task is executed while the pending task isn't completed yet, then pending task is aborted and its results are discarded:</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);

<span class="pl-k">await</span> <span class="pl-smi">executor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);

<span class="pl-smi">executor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 'Mars'</span>
</code></pre><h2 id="wait-for-a-task-to-complete"><a class="markdown-permalink" href="#wait-for-a-task-to-complete"><span class="icon icon-link"></span></a>Wait for a task to complete</h2><p>In the <a href="#execute-a-task">Execute a task</a> section we used a promise that is returned from <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#execute"><code>Executor.execute</code> <sup>↗</sup></a> to wait for a task execution to complete. While this approach allows to wait for a given task execution to settle, it is usually required to wait for an executor itself become settled. The main point here is that the executor remains pending while multiple tasks <a href="#replace-a-task">replace one another</a>.</p><p>Let's consider the scenario where a task is replaced with another task:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">planetExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>planet<span class="pl-pds">'</span></span>);

<span class="pl-c">// The promise is resolved only when planetExecutor is settled</span>
<span class="pl-k">const</span> <span class="pl-c1">planetPromise</span> <span class="pl-k">=</span> <span class="pl-smi">planetExecutor</span>.<span class="pl-en">getOrAwait</span>();

<span class="pl-k">const</span> <span class="pl-c1">marsPromise</span> <span class="pl-k">=</span> <span class="pl-smi">planetExecutor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);

<span class="pl-c">// 🟡 marsPromise is aborted, because task was replaced</span>
<span class="pl-k">const</span> <span class="pl-c1">venusPromise</span> <span class="pl-k">=</span> <span class="pl-smi">planetExecutor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);

<span class="pl-k">await</span> <span class="pl-smi">planetPromise</span>;
<span class="pl-c">// ⮕ 'Venus'</span>
</code></pre><p>In this example, <code>marsPromise</code> is aborted, and <code>planetPromise</code> is resolved only after executor itself is settled and not pending anymore.</p><p>Here's another example, where the executor waits to be settled:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">printerExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>printer<span class="pl-pds">'</span></span>);

<span class="pl-smi">printerExecutor</span>.<span class="pl-en">getOrAwait</span>().<span class="pl-c1">then</span>(<span class="pl-v">value</span> <span class="pl-k">=></span> {
  <span class="pl-c1">console</span>.<span class="pl-c1">log</span>(<span class="pl-smi">value</span>);
});

<span class="pl-c">// Prints "Hello" to console</span>
<span class="pl-smi">printerExecutor</span>.<span class="pl-en">execute</span>(() <span class="pl-k">=></span> <span class="pl-s"><span class="pl-pds">'</span>Hello<span class="pl-pds">'</span></span>);
</code></pre><h2 id="retry-the-latest-task"><a class="markdown-permalink" href="#retry-the-latest-task"><span class="icon icon-link"></span></a>Retry the latest task</h2><p>To retry the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#task">latest task <sup>↗</sup></a>, use <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#retry"><code>retry</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">planets</span> <span class="pl-k">=</span> [<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>];

<span class="pl-k">await</span> <span class="pl-smi">executor</span>.<span class="pl-en">execute</span>(() <span class="pl-k">=></span> <span class="pl-smi">planets</span>.<span class="pl-c1">shift</span>());

<span class="pl-smi">executor</span>.<span class="pl-en">retry</span>();

<span class="pl-k">await</span> <span class="pl-smi">executor</span>.<span class="pl-en">getOrAwait</span>();

<span class="pl-smi">executor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 'Mars'</span>
</code></pre><p>If there's no latest task, or there's a pending task already, then calling <code>retry</code> is a no-op.</p><p>If you want to forcefully retry the latest task, then abort the executor first:</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-c1">abort</span>();
<span class="pl-smi">executor</span>.<span class="pl-en">retry</span>();
</code></pre><h2 id="settle-an-executor"><a class="markdown-permalink" href="#settle-an-executor"><span class="icon icon-link"></span></a>Settle an executor</h2><p>While tasks are always handled in an asynchronous fashion, there are cases when an executor should be settled synchronously.</p><p>Executor can be synchronously fulfilled via <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#resolve"><code>resolve</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);

<span class="pl-smi">executor</span>.<span class="pl-smi">isFulfilled</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">executor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 'Venus'</span>
</code></pre><p>Or rejected via <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#reject"><code>reject</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-c1">reject</span>(<span class="pl-k">new</span> <span class="pl-c1">Error</span>(<span class="pl-s"><span class="pl-pds">'</span>Ooops!<span class="pl-pds">'</span></span>));

<span class="pl-smi">executor</span>.<span class="pl-smi">isRejected</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">executor</span>.<span class="pl-smi">reason</span>;
<span class="pl-c">// ⮕ Error('Ooops!')</span>
</code></pre><p>If there is a pending task then invoking <code>resolve</code> or <code>reject</code> will <a href="#abort-a-task">abort it</a>.</p><p>If you pass a promise to <code>resolve</code>, then an executor would wait for it to settle and store the result:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">planetPromise</span> <span class="pl-k">=</span> <span class="pl-c1">Promise</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);

<span class="pl-smi">executor</span>.<span class="pl-c1">resolve</span>(<span class="pl-smi">planetPromise</span>);

<span class="pl-c">// The executor is waiting for the promise to settle</span>
<span class="pl-smi">executor</span>.<span class="pl-smi">isPending</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-k">await</span> <span class="pl-smi">executor</span>.<span class="pl-en">getOrAwait</span>();

<span class="pl-smi">executor</span>.<span class="pl-c1">value</span>;
<span class="pl-c">// ⮕ 'Mars'</span>
</code></pre><h2 id="clear-an-executor"><a class="markdown-permalink" href="#clear-an-executor"><span class="icon icon-link"></span></a>Clear an executor</h2><p>After the executor becomes <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#issettled">settled <sup>↗</sup></a>, it remains settled until it is cleared.</p><p>You can reset the executor back to its unsettled state using <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#clear"><code>clear</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-c1">clear</span>();
</code></pre><p>Clearing an executor removes the stored value and reason, but <em>doesn't</em> affect the pending task execution and preserves the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#task">latest task <sup>↗</sup></a> that was executed.</p><h1 id="events-and-lifecycle"><a class="markdown-permalink" href="#events-and-lifecycle"><span class="icon icon-link"></span></a>Events and lifecycle</h1><p>Executors publish various events when their state changes. To subscribe to executor events use the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#subscribe"><code>subscribe</code> <sup>↗</sup></a> method:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-k">const</span> <span class="pl-c1">rookyExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>rooky<span class="pl-pds">'</span></span>);

<span class="pl-k">const</span> <span class="pl-c1">unsubscribe</span> <span class="pl-k">=</span> <span class="pl-smi">rookyExecutor</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>fulfilled<span class="pl-pds">'</span></span>) {
    <span class="pl-c">// Handle the event here</span>
  }
});

<span class="pl-en">unsubscribe</span>();
</code></pre><p>You can subscribe to the executor manager to receive events from all executors. For example, you can automatically retry any invalidated executor:</p><pre><code class="language-ts"><span class="pl-smi">manager</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>invalidated<span class="pl-pds">'</span></span>) {
    <span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-en">retry</span>();
  }
});
</code></pre><p>Both executors and managers may have multiple subscribers and each subscriber receives <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.ExecutorEvent.html">events <sup>↗</sup></a> with following types:</p><dl><dt>attached</dt><dd><p>The executor was just created, plugins were applied to it, and it was attached to the manager. Read more about plugins in the <a href="#plugins">Plugins</a> section.</p></dd><dt>detached</dt><dd><p>The executor was just detached: it was removed from the manager and all of its subscribers were unsubscribed. Read more in the <a href="#detach-an-executor">Detach an executor</a> section.</p></dd><dt>activated</dt><dd><p>The executor was inactive and became active. This means that there are consumers that observe the state of the executor. Read more in the <a href="#activate-an-executor">Activate an executor</a> section.</p></dd><dt>deactivated</dt><dd><p>The executor was active and became inactive. This means that there are no consumers that observe the state of the executor. Read more in the <a href="#activate-an-executor">Activate an executor</a> section.</p></dd><dt>pending</dt><dd><p>The executor started <a href="#execute-a-task">a task execution</a>. You can find the latest task the executor handled in the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#task"><code>Executor.task</code> <sup>↗</sup></a> property.</p></dd><dt>fulfilled</dt><dd><p>The executor was fulfilled with a value.</p></dd><dt>rejected</dt><dd><p>The executor was rejected with a reason.</p></dd><dt>aborted</dt><dd><p>The <a href="#abort-a-task">task was aborted</a>.</p><p>If executor is still <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#ispending">pending <sup>↗</sup></a> when an <code>'aborted'</code> event is published then the currently pending task is being <a href="#replace-a-task">replaced</a> with a new task.</p><p>Calling <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#execute"><code>Executor.execute</code> <sup>↗</sup></a> when handling an abort event may lead to stack overflow. If you need to do this anyway, execute a new task from async context using <a href="https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask"><code>queueMicrotask</code> <sup>↗</sup></a> or a similar API.</p></dd><dt>cleared</dt><dd><p>The executor was cleared and now isn't settled.</p></dd><dt>invalidated</dt><dd><p>Results stored in an executor were <a href="#invalidate-results">invalidated</a>.</p></dd><dt>annotated</dt><dd><p><a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#annotations">Annotations <sup>↗</sup></a> associated with the executor were patched.</p></dd><dt>plugin_configured</dt><dd><p>The configuration of the plugin associated with the executor was updated.</p></dd></dl><h2 id="activate-an-executor"><a class="markdown-permalink" href="#activate-an-executor"><span class="icon icon-link"></span></a>Activate an executor</h2><p>Executors have an <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#isactive">active <sup>↗</sup></a> status that tells whether executor is actively used by a consumer.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">deactivate</span> <span class="pl-k">=</span> <span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();

<span class="pl-smi">executor</span>.<span class="pl-smi">isActive</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-en">deactivate</span>();

<span class="pl-smi">executor</span>.<span class="pl-smi">isActive</span>;
<span class="pl-c">// ⮕ false</span>
</code></pre><p>If there are multiple consumers and each of them invoke the <code>activate</code> method, then executor would remain active until all of them invoke their deactivate callbacks.</p><p>By default, marking an executor as active has no additional effect. Checking the executor active status in a plugin allows to skip or defer excessive updates and keep executor results up-to-date lazily. For example, consider a plugin that <a href="#retry-the-latest-task">retries the latest task</a> if an active executor becomes rejected:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">retryPlugin</span><span class="pl-k">:</span> <span class="pl-en">ExecutorPlugin</span> <span class="pl-k">=</span> <span class="pl-v">executor</span> <span class="pl-k">=></span> {
  <span class="pl-smi">executor</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
    <span class="pl-k">switch</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span>) {
      <span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">'</span>rejected<span class="pl-pds">'</span></span>:
      <span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">'</span>activated<span class="pl-pds">'</span></span>:
        <span class="pl-k">if</span> (<span class="pl-smi">executor</span>.<span class="pl-smi">isActive</span> <span class="pl-k">&#x26;&#x26;</span> <span class="pl-smi">executor</span>.<span class="pl-smi">isRejected</span>) {
          <span class="pl-smi">executor</span>.<span class="pl-en">retry</span>();
        }
        <span class="pl-k">break</span>;
    }
  });
};

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>rooky<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [<span class="pl-smi">retryPlugin</span>]);

<span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();
</code></pre><p>Now an executor would automatically retry the <code>heavyTask</code> if it fails. Read more about plugins in the <a href="#plugins">Plugins</a> section.</p><h2 id="invalidate-results"><a class="markdown-permalink" href="#invalidate-results"><span class="icon icon-link"></span></a>Invalidate results</h2><p>Invalidate results stored in the executor:</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-en">invalidate</span>();

<span class="pl-smi">executor</span>.<span class="pl-smi">isInvalidated</span>;
<span class="pl-c">// ⮕ true</span>
</code></pre><p>After the executor is fulfilled, rejected, or cleared, it becomes valid:</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Okay<span class="pl-pds">'</span></span>);

<span class="pl-smi">executor</span>.<span class="pl-smi">isInvalidated</span>;
<span class="pl-c">// ⮕ false</span>
</code></pre><p>By default, invalidating an executor has no effect except marking it as <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#isinvalidated">invalidated <sup>↗</sup></a>.</p><h2 id="detach-an-executor"><a class="markdown-permalink" href="#detach-an-executor"><span class="icon icon-link"></span></a>Detach an executor</h2><p>By default, executors that a manager has created are preserved indefinitely and are always available though <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html#get"><code>get</code> <sup>↗</sup></a>. This isn't always optimal, and you may want to detach an executor when it isn't needed anymore. Use <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html#detach"><code>detach</code> <sup>↗</sup></a> in such case:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>);

<span class="pl-smi">manager</span>.<span class="pl-c1">detach</span>(<span class="pl-smi">executor</span>.<span class="pl-smi">key</span>);
<span class="pl-c">// ⮕ true</span>
</code></pre><p>All executor subscribers are now unsubscribed, and executor is removed from the manager.</p><p>If an executor is still <a href="#activate-an-executor">active</a> then it won't be detached.</p><div class="markdown-alert markdown-alert-note"><p class="markdown-alert-title"><svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>Note</p><p>Pending task isn't aborted if the executor is detached. Use <a href="#abortdeactivated"><code>abortDeactivated</code></a> plugin to abort the task of the deactivated executor.</p></div><h1 id="plugins"><a class="markdown-permalink" href="#plugins"><span class="icon icon-link"></span></a>Plugins</h1><p>Plugins are callbacks that are invoked only once when the executor is created by the manager. For example, you can create a plugin that aborts the pending task and <a href="#detach-an-executor">detaches an executor</a> when it is <a href="#activate-an-executor">deactivated</a>:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">detachPlugin</span><span class="pl-k">:</span> <span class="pl-en">ExecutorPlugin</span> <span class="pl-k">=</span> <span class="pl-v">executor</span> <span class="pl-k">=></span> {
  <span class="pl-smi">executor</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
    <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>deactivted<span class="pl-pds">'</span></span>) {
      <span class="pl-smi">executor</span>.<span class="pl-c1">abort</span>();
      <span class="pl-smi">executor</span>.<span class="pl-smi">manager</span>.<span class="pl-c1">detach</span>(<span class="pl-smi">executor</span>.<span class="pl-smi">key</span>);
    }
  });
};
</code></pre><p>To apply a plugin, pass it to the <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html#getorcreate"><code>ExecutorManager.getOrCreate</code> <sup>↗</sup></a> or to the <a href="https://smikhalevski.github.io/react-executor/functions/react-executor.useExecutor.html"><code>useExecutor</code> <sup>↗</sup></a> hook:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">undefined</span>, [<span class="pl-smi">detachPlugin</span>]);

<span class="pl-k">const</span> <span class="pl-c1">deactivate</span> <span class="pl-k">=</span> <span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();

<span class="pl-c">// The executor is instantly detached by the plugin</span>
<span class="pl-en">deactivate</span>();

<span class="pl-smi">manager</span>.<span class="pl-c1">get</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ undefined</span>
</code></pre><p>Make the manager apply a plugin to all executors by default:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>({
  plugins: [<span class="pl-smi">detachPlugin</span>],
});
</code></pre><h2 id="abortdeactivated"><a class="markdown-permalink" href="#abortdeactivated"><span class="icon icon-link"></span></a><code>abortDeactivated</code></h2><p><a href="#abort-a-task">Aborts the pending task</a> after the delay if the executor is deactivated.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">abortDeactivated</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/abortDeactivated<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">abortDeactivated</span>({ delay: <span class="pl-c1">2_000</span> }),
]);

<span class="pl-k">const</span> <span class="pl-c1">deactivate</span> <span class="pl-k">=</span> <span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();

<span class="pl-c">// Aborts heavyTask in 2 seconds</span>
<span class="pl-en">deactivate</span>();
</code></pre><p>If an executor is re-activated during this delay, the task won't be aborted. The executor must be activated at least once for this plugin to have an effect.</p><h2 id="abortpendingafter"><a class="markdown-permalink" href="#abortpendingafter"><span class="icon icon-link"></span></a><code>abortPendingAfter</code></h2><p><a href="#abort-a-task">Aborts the pending task</a> with <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMException#timeouterror"><code>TimeoutError</code> <sup>↗</sup></a> if the task execution took longer then the given delay.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">abortPendingAfter</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/abortPendingAfter<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">abortPendingAfter</span>(<span class="pl-c1">10_000</span>),
]);
</code></pre><h2 id="abortwhen"><a class="markdown-permalink" href="#abortwhen"><span class="icon icon-link"></span></a><code>abortWhen</code></h2><p><a href="#abort-a-task">Aborts the pending task</a> if the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Observable.html">observable <sup>↗</sup></a> emits <code>true</code>.</p><p>For example, abort the current task if the device is disconnected from the network for more then 5 seconds:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">abortWhen</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/abortWhen<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">navigatorOffline</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/observable/navigatorOffline<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">abortWhen</span>(<span class="pl-smi">navigatorOffline</span>, { delay: <span class="pl-c1">5_000</span> }),
]);
</code></pre><p>If a new task is passed to the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#execute"><code>Executor.execute</code> <sup>↗</sup></a> method after the delay has run out then the task is instantly aborted.</p><p>Read more about observables in the <a href="#retrywhen"><code>retryWhen</code></a> section.</p><h2 id="detachdeactivated"><a class="markdown-permalink" href="#detachdeactivated"><span class="icon icon-link"></span></a><code>detachDeactivated</code></h2><p><a href="#detach-an-executor">Detaches the executor</a> after the timeout if the executor is deactivated.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">detachDeactivated</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/detachDeactivated<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">detachDeactivated</span>({ delay: <span class="pl-c1">2_000</span> }),
]);

<span class="pl-k">const</span> <span class="pl-c1">deactivate</span> <span class="pl-k">=</span> <span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();

<span class="pl-c">// Executor is detached in 2 seconds</span>
<span class="pl-en">deactivate</span>();
</code></pre><p>If an executor is re-activated during this delay, the executor won't be detached.</p><p>This plugin doesn't abort the pending task when an executor is detached. Use <a href="#abortdeactivated"><code>abortDeactivated</code></a> to do the job:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">abortDeactivated</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/abortDeactivated<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">detachDeactivated</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/detachDeactivated<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">abortDeactivated</span>({ delay: <span class="pl-c1">2_000</span> }),
  <span class="pl-en">detachDeactivated</span>({ delay: <span class="pl-c1">2_000</span> }),
]);

<span class="pl-k">const</span> <span class="pl-c1">deactivate</span> <span class="pl-k">=</span> <span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();

<span class="pl-c">// The heavyTask is aborted and the executor is detached in 2 seconds</span>
<span class="pl-en">deactivate</span>();
</code></pre><h2 id="detachinactive"><a class="markdown-permalink" href="#detachinactive"><span class="icon icon-link"></span></a><code>detachInactive</code></h2><p>Detach an executor if it wasn't activated during first 5 seconds after being created:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">detachInactive</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/detachInactive<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [
  <span class="pl-en">detachInactive</span>({ delayBeforeActivation: <span class="pl-c1">5_000</span> }),
]);
</code></pre><p>Detach an executor if it was inactive for 5 seconds:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [
  <span class="pl-en">detachInactive</span>({ delayAfterActivation: <span class="pl-c1">5_000</span> }),
]);

<span class="pl-k">const</span> <span class="pl-c1">deactivate</span> <span class="pl-k">=</span> <span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();

<span class="pl-c">// The executor is detached in 5 seconds</span>
<span class="pl-en">deactivate</span>();
</code></pre><h2 id="invalidateafter"><a class="markdown-permalink" href="#invalidateafter"><span class="icon icon-link"></span></a><code>invalidateAfter</code></h2><p>Invalidates the executor result after a delay.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">invalidateAfter</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/invalidateAfter<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [
  <span class="pl-en">invalidateAfter</span>(<span class="pl-c1">2_000</span>),
]);

<span class="pl-c">// The executor is invalidated in 2 seconds</span>
<span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();
</code></pre><p>If the executor is settled then the timeout is restarted.</p><h2 id="invalidatebypeers"><a class="markdown-permalink" href="#invalidatebypeers"><span class="icon icon-link"></span></a><code>invalidateByPeers</code></h2><p>Invalidates the executor result if another executor with a matching key is fulfilled or invalidated.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">invalidateByPeers</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/invalidateByPeers<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">cheeseExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>cheese<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Burrata<span class="pl-pds">'</span></span>, [
  <span class="pl-en">invalidateByPeers</span>(<span class="pl-v">executor</span> <span class="pl-k">=></span> <span class="pl-smi">executor</span>.<span class="pl-smi">key</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>),
]);

<span class="pl-k">const</span> <span class="pl-c1">breadExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>);

<span class="pl-c">// cheeseExecutor is invalidated</span>
<span class="pl-smi">breadExecutor</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Ciabatta<span class="pl-pds">'</span></span>);
</code></pre><p>Provide an array of executors as peers:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">breadExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>);

<span class="pl-k">const</span> <span class="pl-c1">cheeseExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>cheese<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Burrata<span class="pl-pds">'</span></span>, [
  <span class="pl-en">invalidateByPeers</span>([<span class="pl-smi">breadExecutor</span>]),
]);

<span class="pl-c">// cheeseExecutor is invalidated</span>
<span class="pl-smi">breadExecutor</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Ciabatta<span class="pl-pds">'</span></span>);
</code></pre><h2 id="invalidatepeers"><a class="markdown-permalink" href="#invalidatepeers"><span class="icon icon-link"></span></a><code>invalidatePeers</code></h2><p>Invalidates peer executors with matching keys if the executor is fulfilled or invalidated.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">invalidatePeers</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/invalidatePeers<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">cheeseExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>cheese<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Burrata<span class="pl-pds">'</span></span>, [
  <span class="pl-en">invalidatePeers</span>(<span class="pl-v">executor</span> <span class="pl-k">=></span> <span class="pl-smi">executor</span>.<span class="pl-smi">key</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>),
]);

<span class="pl-k">const</span> <span class="pl-c1">breadExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Focaccia<span class="pl-pds">'</span></span>);

<span class="pl-c">// breadExecutor is invalidated</span>
<span class="pl-smi">cheeseExecutor</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Mozzarella<span class="pl-pds">'</span></span>);
</code></pre><p>Provide an array of executors as peers:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">breadExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Focaccia<span class="pl-pds">'</span></span>);

<span class="pl-k">const</span> <span class="pl-c1">cheeseExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>cheese<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Burrata<span class="pl-pds">'</span></span>, [
  <span class="pl-en">invalidatePeers</span>([<span class="pl-smi">breadExecutor</span>]),
]);

<span class="pl-c">// breadExecutor is invalidated</span>
<span class="pl-smi">cheeseExecutor</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Mozzarella<span class="pl-pds">'</span></span>);
</code></pre><h2 id="lazytask"><a class="markdown-permalink" href="#lazytask"><span class="icon icon-link"></span></a><code>lazyTask</code></h2><p>Sets <a href="#execute-a-task">an executor task</a> but doesn't execute it.</p><p>This plugin is useful when you have an static initial value and a task that can update this value later:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">lazyTask</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/lazyTask<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">retryInvalidated</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryInvalidated<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>meaningOfLife<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [
  <span class="pl-en">lazyTask</span>(<span class="pl-k">async</span> () <span class="pl-k">=></span> <span class="pl-k">await</span> <span class="pl-en">getTheMeaningOfLife</span>()),
  <span class="pl-en">retryInvalidated</span>(),
]);
</code></pre><p><code>executor</code> is created with the <code>value</code> set to 42. <code>getTheMeaningOfLife</code> task isn't executed and would be called only if executor is invalidated (tanks to <a href="#retryinvalidated"><code>retryInvalidated</code></a> plugin):</p><pre><code class="language-ts"><span class="pl-smi">executor</span>.<span class="pl-en">invalidate</span>();
</code></pre><h2 id="rejectpendingafter"><a class="markdown-permalink" href="#rejectpendingafter"><span class="icon icon-link"></span></a><code>rejectPendingAfter</code></h2><p><a href="#abort-a-task">Aborts the pending task</a> and <a href="#settle-an-executor">rejects the executor</a> with <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMException#timeouterror"><code>TimeoutError</code> <sup>↗</sup></a> if the task execution took longer then the given timeout.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">rejectPendingAfter</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/rejectPendingAfter<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">rejectPendingAfter</span>(<span class="pl-c1">10_000</span>),
]);
</code></pre><h2 id="resolveby"><a class="markdown-permalink" href="#resolveby"><span class="icon icon-link"></span></a><code>resolveBy</code></h2><p><a href="#settle-an-executor">Resolves the executor</a> with values pushed by an <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Observable.html"><code>Observable</code> <sup>↗</sup></a>.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">Observable</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">resolveBy</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/resolveBy<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">observable</span><span class="pl-k">:</span> <span class="pl-en">Observable</span>&#x3C;<span class="pl-c1">string</span>> <span class="pl-k">=</span> {
  <span class="pl-en">subscribe</span>(<span class="pl-v">listener</span>) {
    <span class="pl-c">// Call the listener when value is changed</span>
    <span class="pl-k">const</span> <span class="pl-c1">timer</span> <span class="pl-k">=</span> <span class="pl-c1">setTimeout</span>(<span class="pl-smi">listener</span>, <span class="pl-c1">1_000</span>, <span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);

    <span class="pl-k">return</span> () <span class="pl-k">=></span> {
      <span class="pl-c">// Unsubscribe the listener</span>
      <span class="pl-c1">clearTimeout</span>(<span class="pl-smi">timer</span>);
    };
  },
};

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>planet<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, [
  <span class="pl-en">resolveBy</span>(<span class="pl-smi">observable</span>),
]);
</code></pre><p><a href="https://smikhalevski.github.io/parallel-universe/classes/PubSub.html"><code>PubSub</code> <sup>↗</sup></a> can be used do decouple the lazy data source from the executor:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">PubSub</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>parallel-universe<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">pubSub</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">PubSub</span>&#x3C;<span class="pl-c1">string</span>>();

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>planet<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, [
  <span class="pl-en">resolveBy</span>(<span class="pl-smi">pubSub</span>),
]);

<span class="pl-smi">pubSub</span>.<span class="pl-en">publish</span>(<span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);

<span class="pl-smi">executor</span>.<span class="pl-c1">value</span>; <span class="pl-c">// ⮕ 'Venus'</span>
</code></pre><h2 id="retryactivated"><a class="markdown-permalink" href="#retryactivated"><span class="icon icon-link"></span></a><code>retryActivated</code></h2><p><a href="#retry-the-latest-task">Retries the latest task</a> if the executor is activated.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">retryActivated</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryActivated<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">retryActivated</span>(),
]);

<span class="pl-c">// Retries the task</span>
<span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();
</code></pre><p>Set the minimum delay in milliseconds that should pass between the activation and the moment the executor was last settled:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">retryActivated</span>({ staleDelay: <span class="pl-c1">5_000</span> }),
]);

<span class="pl-c">// Doesn't retry the task if 5 seconds didn't pass</span>
<span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();
</code></pre><h2 id="retryfulfilled"><a class="markdown-permalink" href="#retryfulfilled"><span class="icon icon-link"></span></a><code>retryFulfilled</code></h2><p><a href="#retry-the-latest-task">Retries the latest task</a> after the execution was fulfilled.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">retryFulfilled</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryFulfilled<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">retryFulfilled</span>(),
]);

<span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();
</code></pre><p>If the task fails, is aborted, or if an executor is deactivated then the plugin stops the retry process.</p><p>With the default configuration, the plugin would infinitely retry the task of an active executor with a 5-second delay between retries. This is effectively a decent polling strategy that kicks in only if someone is actually using an executor.</p><p>Specify the number of times the task should be re-executed if it succeeds:</p><pre><code class="language-ts"><span class="pl-en">retryFulfilled</span>({ count: <span class="pl-c1">3</span> });
</code></pre><p>Specify the delay in milliseconds between retries:</p><pre><code class="language-ts"><span class="pl-en">retryFulfilled</span>({ count: <span class="pl-c1">3</span>, delay: <span class="pl-c1">5_000</span> });
</code></pre><p>Provide a function that returns the delay depending on the number of retries:</p><pre><code class="language-ts"><span class="pl-en">retryFulfilled</span>({
  count: <span class="pl-c1">5</span>,
  <span class="pl-en">delay</span>: (<span class="pl-v">index</span>, <span class="pl-v">executor</span>) <span class="pl-k">=></span> <span class="pl-c1">1000</span> <span class="pl-k">*</span> <span class="pl-smi">index</span>,
});
</code></pre><p>By default, <code>retryFulfilled</code> doesn't retry inactive executors. The executor is retried only after it becomes active.</p><p>To retry the latest task regardless of the executor activation status:</p><pre><code class="language-ts"><span class="pl-en">retryFulfilled</span>({ isEager: <span class="pl-c1">true</span> });
</code></pre><h2 id="retryinvalidated"><a class="markdown-permalink" href="#retryinvalidated"><span class="icon icon-link"></span></a><code>retryInvalidated</code></h2><p>Retries the latest task of the active executor if it was invalidated.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">retryInvalidated</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryInvalidated<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [
  <span class="pl-en">retryInvalidated</span>(),
]);

<span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();
</code></pre><p>Combine this plugin with <a href="#invalidatebypeers"><code>invalidateByPeers</code></a> to automatically retry this executor if another executor on which it depends becomes invalid:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">ExecutorTask</span>, <span class="pl-smi">useExecutor</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">invalidateByPeers</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/invalidateByPeers<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-en">fetchCheese</span><span class="pl-k">:</span> <span class="pl-en">ExecutorTask</span> <span class="pl-k">=</span> <span class="pl-k">async</span> (<span class="pl-v">signal</span>, <span class="pl-v">executor</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// Wait for the breadExecutor to be created</span>
  <span class="pl-k">const</span> <span class="pl-c1">breadExecutor</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">executor</span>.<span class="pl-smi">manager</span>.<span class="pl-en">getOrAwait</span>(<span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>);

  <span class="pl-c">// Wait for the breadExecutor to be settled</span>
  <span class="pl-k">const</span> <span class="pl-c1">bread</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">breadExecutor</span>.<span class="pl-en">getOrAwait</span>();

  <span class="pl-c">// Choose the best cheese for this bread</span>
  <span class="pl-k">return</span> <span class="pl-smi">bread</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>Ciabatta<span class="pl-pds">'</span></span> <span class="pl-k">?</span> <span class="pl-s"><span class="pl-pds">'</span>Mozzarella<span class="pl-pds">'</span></span> <span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Burrata<span class="pl-pds">'</span></span>;
};

<span class="pl-k">const</span> <span class="pl-c1">cheeseExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>cheese<span class="pl-pds">'</span></span>, <span class="pl-smi">fetchCheese</span>, [
  <span class="pl-en">invalidateByPeers</span>(<span class="pl-v">executor</span> <span class="pl-k">=></span> <span class="pl-smi">executor</span>.<span class="pl-smi">key</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>),
  <span class="pl-en">retryInvalidated</span>(),
]);

<span class="pl-k">const</span> <span class="pl-c1">breadExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>);

<span class="pl-c">// 🟡 cheeseExecutor is invalidated and re-fetches cheese</span>
<span class="pl-smi">breadExecutor</span>.<span class="pl-c1">resolve</span>(<span class="pl-s"><span class="pl-pds">'</span>Ciabatta<span class="pl-pds">'</span></span>);
</code></pre><p>Read more about <a href="#dependent-tasks">dependent tasks</a>.</p><p>By default, <code>retryInvalidated</code> doesn't retry inactive executors. The executor is retried only after it becomes active.</p><p>To retry the latest task regardless of the executor activation status:</p><pre><code class="language-ts"><span class="pl-en">retryInvalidated</span>({ isEager: <span class="pl-c1">true</span> });
</code></pre><h2 id="retryrejected"><a class="markdown-permalink" href="#retryrejected"><span class="icon icon-link"></span></a><code>retryRejected</code></h2><p>Retries the last task after the execution has failed.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">retryRejected</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryRejected<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">retryRejected</span>(),
]);

<span class="pl-smi">executor</span>.<span class="pl-en">activate</span>();
</code></pre><p>If the task succeeds, is aborted, or if an executor is deactivated then the plugin stops the retry process.</p><p>With the default configuration, the plugin would retry the task 3 times with an exponential delay between retries.</p><p>Specify the number of times the task should be re-executed if it fails:</p><pre><code class="language-ts"><span class="pl-en">retryRejected</span>({ count: <span class="pl-c1">3</span> });
</code></pre><p>Specify the delay in milliseconds between retries:</p><pre><code class="language-ts"><span class="pl-en">retryRejected</span>({ count: <span class="pl-c1">3</span>, delay: <span class="pl-c1">5_000</span> });
</code></pre><p>Provide a function that returns the delay depending on the number of retries:</p><pre><code class="language-ts"><span class="pl-en">retryRejected</span>({
  count: <span class="pl-c1">5</span>,
  <span class="pl-en">delay</span>: (<span class="pl-v">index</span>, <span class="pl-v">executor</span>) <span class="pl-k">=></span> <span class="pl-c1">1000</span> <span class="pl-k">*</span> <span class="pl-c1">1.8</span> <span class="pl-k">**</span> <span class="pl-smi">index</span>,
});
</code></pre><p>By default, <code>retryRejected</code> doesn't retry inactive executors. The executor is retried only after it becomes active.</p><p>To retry the latest task regardless of the executor activation status:</p><pre><code class="language-ts"><span class="pl-en">retryRejected</span>({ isEager: <span class="pl-c1">true</span> });
</code></pre><h2 id="retrywhen"><a class="markdown-permalink" href="#retrywhen"><span class="icon icon-link"></span></a><code>retryWhen</code></h2><p><a href="#abort-a-task">Retries the latest task</a> if the <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Observable.html">observable <sup>↗</sup></a> emits <code>true</code>.</p><p>For example, if the window was offline for more than 5 seconds, the executor would retry the <code>heavyTask</code> after the window is back online:</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">retryWhen</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryWhen<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">navigatorOnline</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/observable/navigatorOnline<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-en">retryWhen</span>(<span class="pl-smi">navigatorOnline</span>, { delay: <span class="pl-c1">5_000</span> }),
]);
</code></pre><p>Combining multiple plugins, you can set up a complex executor behaviour. For example, let's create an executor that follows these requirements:</p><ol><li>Executes the task every 5 seconds.</li><li>Aborts the pending task if the window loses focus for more than 10 seconds.</li><li>Aborts instantly if the window goes offline.</li><li>Resumes the periodic task execution if window gains focus or goes back online.</li></ol><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">useExecutor</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">abortWhen</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/abortWhen<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">retryWhen</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryWhen<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">retryFulfilled</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/retryFulfilled<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">windowFocused</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/observable/windowFocused<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">windowBlurred</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/observable/windowBlurred<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">navigatorOnline</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/observable/navigatorOnline<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">navigatorOffline</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/observable/navigatorOffline<span class="pl-pds">'</span></span>;

<span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-smi">heavyTask</span>, [
  <span class="pl-c">// Execute the task every 5 seconds</span>
  <span class="pl-en">retryFulfilled</span>({ delay: <span class="pl-c1">5_000</span> }),

  <span class="pl-c">// Abort the task and prevent future executions</span>
  <span class="pl-c">// if the window looses focus for at least 10 seconds</span>
  <span class="pl-en">abortWhen</span>(<span class="pl-smi">windowBlurred</span>, { delay: <span class="pl-c1">10_000</span> }),

  <span class="pl-c">// Retry the latest task when the window gains focus</span>
  <span class="pl-en">retryWhen</span>(<span class="pl-smi">windowFocused</span>),

  <span class="pl-c">// Instantly abort the pending task if the device is disconnected from the network</span>
  <span class="pl-en">abortWhen</span>(<span class="pl-smi">navigatorOffline</span>),

  <span class="pl-c">// Retry the latest task if the window goes online</span>
  <span class="pl-en">retryWhen</span>(<span class="pl-smi">navigatorOnline</span>),
]);
</code></pre><h2 id="syncstorage"><a class="markdown-permalink" href="#syncstorage"><span class="icon icon-link"></span></a><code>syncStorage</code></h2><p>Persists the executor value in the synchronous storage.</p><!-- prettier-ignore --><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">syncStorage</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/syncStorage<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [
  <span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>),
]);
</code></pre><p>With this plugin, you can synchronize the executor state <a href="https://stackblitz.com/edit/react-executor-todo-app?file=README.md">across multiple browser tabs <sup>↗</sup></a> in just one line.</p><div class="markdown-alert markdown-alert-important"><p class="markdown-alert-title"><svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>Important</p><p>If executor is <a href="#detach-an-executor">detached</a>, then the corresponding item is removed from the storage.</p></div><p>By default, an executor state is serialized using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"><code>JSON</code> <sup>↗</sup></a>. If your executor stores a value that may contain circular references, or non-serializable data like <code>BigInt</code>, use a custom serializer.</p><p>Here's how you can enable serialization of objects with circular references:</p><pre><code class="language-ts"><span class="pl-k">import</span> <span class="pl-smi">JSONMarshal</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [
  <span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>, {
    serializer: <span class="pl-smi">JSONMarshal</span>,
  }),
]);
</code></pre><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>With additional configuration, <a href="https://github.com/smikhalevski/json-marshal#readme">json-marshal <sup>↗</sup></a> can stringify and parse any data structure.</p></div><p>By default, <code>syncStorage</code> plugin uses a <a href="#executor-keys">serialized executor key</a> as a storage key. You can provide a custom key via <a href="https://smikhalevski.github.io/react-executor/interfaces/plugin_syncStorage.SyncStorageOptions.html#storagekey"><code>storageKey</code> <sup>↗</sup></a> option:</p><pre><code class="language-ts"><span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [<span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>, { storageKey: <span class="pl-s"><span class="pl-pds">'</span>helloBobr<span class="pl-pds">'</span></span> })]);
</code></pre><p>In the environment where storage is unavailable (for example, <a href="#server-side-rendering">during SSR</a>), you can conditionally disable the plugin:</p><pre><code class="language-ts"><span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>, <span class="pl-c1">42</span>, [<span class="pl-k">typeof</span> <span class="pl-smi">localStorage</span> <span class="pl-k">!==</span> <span class="pl-s"><span class="pl-pds">'</span>undefined<span class="pl-pds">'</span></span> <span class="pl-k">?</span> <span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>) <span class="pl-k">:</span> <span class="pl-c1">null</span>]);
</code></pre><h1 id="react-integration"><a class="markdown-permalink" href="#react-integration"><span class="icon icon-link"></span></a>React integration</h1><p>In the basic scenario, to use executors in your React app, you don't need any additional configuration, just use the <a href="https://smikhalevski.github.io/react-executor/functions/react-executor.useExecutor.html"><code>useExecutor</code> <sup>↗</sup></a> hook right away:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useExecutor</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">User</span>(<span class="pl-v">props</span><span class="pl-k">:</span> { <span class="pl-v">userId</span><span class="pl-k">:</span> <span class="pl-c1">string</span> }) {
  <span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>([<span class="pl-s"><span class="pl-pds">'</span>user<span class="pl-pds">'</span></span>, <span class="pl-smi">props</span>.<span class="pl-smi">userId</span>], <span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> {
    <span class="pl-c">// Fetch the user from the server</span>
  });

  <span class="pl-k">if</span> (<span class="pl-smi">executor</span>.<span class="pl-smi">isPending</span>) {
    <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Loading<span class="pl-pds">'</span></span>;
  }

  <span class="pl-c">// Render the user from the executor.value</span>
}
</code></pre><p>Every time the executor's state is changed, the component is re-rendered. The executor returned from the hook is <a href="#activate-an-executor">activated</a> after mount and deactivated on unmount.</p><p>The hook has the exact same signature as the <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html#getorcreate"><code>ExecutorManager.getOrCreate</code> <sup>↗</sup></a> method, described in the <a href="#introduction">Introduction</a> section.</p><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>Check out the live example of <a href="https://stackblitz.com/edit/react-executor-todo-app?file=README.md">the TODO app <sup>↗</sup></a> that employs React Executor.</p></div><p>You can use executors both inside and outside the rendering process. To do this, provide a custom <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html"><code>ExecutorManager</code> <sup>↗</sup></a> through the context:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">ExecutorManager</span>, <span class="pl-smi">ExecutorManagerProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-k">const</span> <span class="pl-en">App</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> (
  &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-c1">User</span> <span class="pl-e">userId</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>28<span class="pl-pds">'</span></span><span class="pl-pse">}</span> />
  &#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>
);
</code></pre><p>Now you can use <code>manager</code> to access all the same executors that are available through the <code>useExecutor</code> hook:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-c1">get</span>([<span class="pl-s"><span class="pl-pds">'</span>user<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>28<span class="pl-pds">'</span></span>]);
</code></pre><p>If you want to have access to an executor in a component, but don't want to re-render the component when the executor's state is changed, use <a href="https://smikhalevski.github.io/react-executor/functions/react-executor.useExecutorManager.html"><code>useExecutorManager</code> <sup>↗</sup></a> hook:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">accountExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutorManager</span>().<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>account<span class="pl-pds">'</span></span>);
</code></pre><p>You can execute a task in response to a user action, for example when user clicks a button:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>);

<span class="pl-k">const</span> <span class="pl-en">handleClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
  <span class="pl-smi">executor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> {
    <span class="pl-c">// Handle the task</span>
  });
};
</code></pre><p>If you want executor to run on the client only, then execute a task from the effect:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>test<span class="pl-pds">'</span></span>);

<span class="pl-en">useEffect</span>(() <span class="pl-k">=></span> {
  <span class="pl-smi">executor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> {
    <span class="pl-c">// Handle the task</span>
  });
}, []);
</code></pre><h2 id="suspense"><a class="markdown-permalink" href="#suspense"><span class="icon icon-link"></span></a>Suspense</h2><p>Executors support fetch-as-you-render approach and can be integrated with React Suspense. To facilitate the rendering suspension, use the <a href="https://smikhalevski.github.io/react-executor/functions/react-executor.useExecutorSuspense.html"><code>useExecutorSuspense</code> <sup>↗</sup></a> hook:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useExecutor</span>, <span class="pl-smi">useExecutorSuspense</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-en">Account</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
  <span class="pl-k">const</span> <span class="pl-c1">accountExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>account<span class="pl-pds">'</span></span>, <span class="pl-v">signal</span> <span class="pl-k">=></span> {
    <span class="pl-c">// Fetch an account from a server</span>
  });

  <span class="pl-c">// Suspend rendering if accountExecutor is pending and isn't fulfilled</span>
  <span class="pl-k">const</span> <span class="pl-c1">account</span> <span class="pl-k">=</span> <span class="pl-en">useExecutorSuspense</span>(<span class="pl-smi">accountExecutor</span>).<span class="pl-c1">get</span>();
};
</code></pre><p>Now when the <code>Account</code> component is rendered, it would be suspended until the <code>accountExecutor</code> is settled:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">Suspense</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-en">App</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> (
  &#x3C;<span class="pl-c1">Suspense</span> <span class="pl-e">fallback</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Loading<span class="pl-pds">'</span></span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-c1">Account</span> />
  &#x3C;/<span class="pl-c1">Suspense</span>>
);
</code></pre><p>Executors can run tasks in parallel and rendering is suspended until both of them are settled:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">cheeseExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>cheese<span class="pl-pds">'</span></span>, <span class="pl-smi">buyCheeseTask</span>);
<span class="pl-k">const</span> <span class="pl-c1">beadExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>bread<span class="pl-pds">'</span></span>, <span class="pl-smi">bakeBreadTask</span>);

<span class="pl-k">const</span> <span class="pl-c1">cheese</span> <span class="pl-k">=</span> <span class="pl-en">useExecutorSuspense</span>(<span class="pl-smi">cheeseExecutor</span>).<span class="pl-c1">get</span>();
<span class="pl-k">const</span> <span class="pl-c1">bread</span> <span class="pl-k">=</span> <span class="pl-en">useExecutorSuspense</span>(<span class="pl-smi">breadExecutor</span>).<span class="pl-c1">get</span>();
</code></pre><h2 id="external-executors"><a class="markdown-permalink" href="#external-executors"><span class="icon icon-link"></span></a>External executors</h2><p>You can use executors created outside the rendering process in your components, rerender and suspend your components when such executors get updated:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-c">// 1️⃣ Create an executor</span>
<span class="pl-k">const</span> <span class="pl-c1">accountExecutor</span> <span class="pl-k">=</span> <span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>account<span class="pl-pds">'</span></span>, <span class="pl-v">signal</span> <span class="pl-k">=></span> {
  <span class="pl-c">// Fetch an account from a server</span>
});

<span class="pl-k">function</span> <span class="pl-en">Account</span>() {
  <span class="pl-c">// 2️⃣ Re-render a component when accountExecutor is updated</span>
  <span class="pl-en">useExecutorSubscription</span>(<span class="pl-smi">accountExecutor</span>);

  <span class="pl-c">// 3️⃣ Suspend rendering if accountExecutor is pending and isn't fulfilled</span>
  <span class="pl-k">const</span> <span class="pl-c1">account</span> <span class="pl-k">=</span> <span class="pl-en">useExecutorSuspense</span>(<span class="pl-smi">accountExecutor</span>).<span class="pl-c1">get</span>();
}
</code></pre><h1 id="server-side-rendering"><a class="markdown-permalink" href="#server-side-rendering"><span class="icon icon-link"></span></a>Server-side rendering</h1><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>Check out the live example of <a href="https://codesandbox.io/p/devbox/react-executor-ssr-streaming-example-mwrmrs">streaming SSR <sup>↗</sup></a> with React Executor.</p></div><p>Executors can be hydrated on the client after being settled on the server.</p><p>To enable hydration on the client, create the executor manager and provide it through a context:</p><pre><code class="language-tsx"><span class="pl-k">import</span> <span class="pl-smi">React</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRoot</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/client<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">enableSSRHydration</span>, <span class="pl-smi">ExecutorManager</span>, <span class="pl-smi">ExecutorManagerProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-c">// 🟡 Hydrates executors on the client with the server data</span>
<span class="pl-en">enableSSRHydration</span>(<span class="pl-smi">manager</span>);

<span class="pl-en">hydrateRoot</span>(
  <span class="pl-c1">document</span>,
  &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-c1">App</span> />
  &#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>
);
</code></pre><p>Here, <code>App</code> is the component that renders your application. Inside the <code>App</code> you can use <code>useExecutor</code> and <a href="#suspense"><code>useExecutorSuspence</code></a> to load your data.</p><p><a href="https://smikhalevski.github.io/react-executor/functions/react-executor.enableSSRHydration.html"><code>enableSSRHydration</code> <sup>↗</sup></a> must be called only once, and only one manager on the client-side can receive the dehydrated state from the server.</p><p>On the server, you can either render your app contents <a href="#render-to-string">as a string</a> and send it to the client in one go, or <a href="#streaming-ssr">stream the contents</a>.</p><h2 id="render-to-string"><a class="markdown-permalink" href="#render-to-string"><span class="icon icon-link"></span></a>Render to string</h2><p>To render your app as an HTML string use <a href="https://smikhalevski.github.io/react-executor/classes/ssr.SSRExecutorManager.html"><code>SSRExecutorManager</code> <sup>↗</sup></a>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createServer</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>http<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">renderToString</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">ExecutorManagerProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">SSRExecutorManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/ssr<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">server</span> <span class="pl-k">=</span> <span class="pl-en">createServer</span>(<span class="pl-k">async</span> (<span class="pl-v">request</span>, <span class="pl-v">response</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// 1️⃣ Create a new manager for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRExecutorManager</span>();

  <span class="pl-k">let</span> <span class="pl-smi">html</span>;
  <span class="pl-k">do</span> {
    <span class="pl-smi">html</span> <span class="pl-k">=</span> <span class="pl-en">renderToString</span>(
      &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span><span class="pl-pse">}</span>>
        &#x3C;<span class="pl-c1">App</span> />
      &#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>
    );

    <span class="pl-c">// 2️⃣ Render until there are no more changes</span>
  } <span class="pl-k">while</span> (<span class="pl-k">await</span> <span class="pl-smi">manager</span>.<span class="pl-en">hasChanges</span>());

  <span class="pl-c">// 3️⃣ Attach dehydrated executor states</span>
  <span class="pl-smi">html</span> <span class="pl-k">+=</span> <span class="pl-smi">manager</span>.<span class="pl-en">nextHydrationChunk</span>();

  <span class="pl-c">// 4️⃣ Send the rendered HTML to the client</span>
  <span class="pl-smi">response</span>.<span class="pl-en">end</span>(<span class="pl-smi">html</span>);
});

<span class="pl-smi">server</span>.<span class="pl-en">listen</span>(<span class="pl-c1">8080</span>);
</code></pre><p>In this example, the <code>App</code> is expected to render the <code>&#x3C;script></code> tag that loads the client bundle. Otherwise, you can inject client chunk manually:</p><pre><code class="language-ts"><span class="pl-smi">html</span> <span class="pl-k">+=</span> <span class="pl-s"><span class="pl-pds">'</span>&#x3C;script src="/client.js" async>&#x3C;/script><span class="pl-pds">'</span></span>;
</code></pre><p>A new executor manager must be created for each request, so the results that are stored in executors are served in response to a particular request.</p><p><a href="https://smikhalevski.github.io/react-executor/classes/ssr.SSRExecutorManager.html#haschanges"><code>hasChanges</code> <sup>↗</sup></a> would resolve with <code>true</code> if state of some executors have changed during rendering.</p><p>The hydration chunk returned by <a href="https://smikhalevski.github.io/react-executor/classes/ssr.SSRExecutorManager.html#nexthydrationchunk"><code>nextHydrationChunk</code> <sup>↗</sup></a> contains the <code>&#x3C;script></code> tag that hydrates the manager for which <a href="https://smikhalevski.github.io/react-executor/functions/react-executor.enableSSRHydration.html"><code>enableSSRHydration</code> <sup>↗</sup></a> was invoked.</p><h2 id="streaming-ssr"><a class="markdown-permalink" href="#streaming-ssr"><span class="icon icon-link"></span></a>Streaming SSR</h2><p>Thanks to <a href="#suspense">Suspense</a>, React can stream parts of your app while it is being rendered. React Executor provides API to inject its hydration chunks into a streaming process. The API is different for NodeJS streams and <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">Readable Web Streams <sup>↗</sup></a>.</p><p>In NodeJS environment use <a href="https://smikhalevski.github.io/react-executor/classes/ssr_node.PipeableSSRExecutorManager.html"><code>PipeableSSRExecutorManager</code> <sup>↗</sup></a></p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">createServer</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>http<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">renderToPipeableStream</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">ExecutorManagerProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">PipeableSSRExecutorManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/ssr/node<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">server</span> <span class="pl-k">=</span> <span class="pl-en">createServer</span>((<span class="pl-v">request</span>, <span class="pl-v">response</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// 1️⃣ Create a new manager for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">PipeableSSRExecutorManager</span>(<span class="pl-smi">response</span>);

  <span class="pl-k">const</span> <span class="pl-c1">stream</span> <span class="pl-k">=</span> <span class="pl-en">renderToPipeableStream</span>(
    &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-c1">App</span> />
    &#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>,
    {
      bootstrapScripts: [<span class="pl-s"><span class="pl-pds">'</span>/client.js<span class="pl-pds">'</span></span>],

      <span class="pl-en">onShellReady</span>() {
        <span class="pl-c">// 2️⃣ Pipe the rendering output to the manager's stream</span>
        <span class="pl-smi">stream</span>.<span class="pl-en">pipe</span>(<span class="pl-smi">manager</span>.<span class="pl-smi">stream</span>);
      },
    }
  );
});

<span class="pl-smi">server</span>.<span class="pl-en">listen</span>(<span class="pl-c1">8080</span>);
</code></pre><p>State of executors is streamed to the client along with the chunks rendered by React.</p><p>In the <code>App</code> component, use the combination of <a href="https://react.dev/reference/react/Suspense"><code>&#x3C;Suspense></code> <sup>↗</sup></a>, <a href="https://smikhalevski.github.io/react-executor/functions/react-executor.useExecutor.html"><code>useExecutor</code> <sup>↗</sup></a> and <a href="https://smikhalevski.github.io/react-executor/functions/react-executor.useExecutorSuspense.html"><code>useExecutorSuspence</code> <sup>↗</sup></a> to suspend rendering while executors process their tasks:</p><pre><code class="language-tsx"><span class="pl-k">export</span> <span class="pl-k">const</span> <span class="pl-en">App</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> (
  &#x3C;<span class="pl-ent">html</span>>
    &#x3C;<span class="pl-ent">head</span> />
    &#x3C;<span class="pl-ent">body</span>>
      &#x3C;<span class="pl-c1">Suspense</span> <span class="pl-e">fallback</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-s"><span class="pl-pds">'</span>Loading<span class="pl-pds">'</span></span><span class="pl-pse">}</span>>
        &#x3C;<span class="pl-c1">Hello</span> />
      &#x3C;/<span class="pl-c1">Suspense</span>>
    &#x3C;/<span class="pl-ent">body</span>>
  &#x3C;/<span class="pl-ent">html</span>>
);

<span class="pl-k">export</span> <span class="pl-k">const</span> <span class="pl-en">Hello</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
  <span class="pl-k">const</span> <span class="pl-c1">helloExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>, <span class="pl-k">async</span> () <span class="pl-k">=></span> {
    <span class="pl-c">// Asynchronously return the result</span>
    <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">'</span>Hello, Paul!<span class="pl-pds">'</span></span>;
  });

  <span class="pl-c">// 🟡 Suspend rendering until helloExecutor is settled</span>
  <span class="pl-en">useExecutorSuspense</span>(<span class="pl-smi">helloExecutor</span>);

  <span class="pl-k">return</span> <span class="pl-smi">helloExecutor</span>.<span class="pl-c1">get</span>();
};
</code></pre><p>If the <code>App</code> is rendered in streaming mode, it would first show "Loading" and after the executor is settled, it would update to "Hello, Paul!". In the meantime <code>helloExecutor</code> on the client would be hydrated with the data from the server.</p><h3 id="readable-web-streams-support"><a class="markdown-permalink" href="#readable-web-streams-support"><span class="icon icon-link"></span></a>Readable web streams support</h3><p>To enable streaming in a modern environment, use <a href="https://smikhalevski.github.io/react-executor/classes/ssr.ReadableSSRExecutorManager.html"><code>ReadableSSRExecutorManager</code> <sup>↗</sup></a></p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">renderToReadableStream</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/server<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">ExecutorManagerProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">ReadableSSRExecutorManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/ssr<span class="pl-pds">'</span></span>;

<span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">handler</span>(<span class="pl-v">request</span>) {
  <span class="pl-c">// 1️⃣ Create a new manager for each request</span>
  <span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ReadableSSRExecutorManager</span>();

  <span class="pl-k">const</span> <span class="pl-c1">stream</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">renderToReadableStream</span>(
    &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span><span class="pl-pse">}</span>>
      &#x3C;<span class="pl-c1">App</span> />
    &#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>,
    {
      bootstrapScripts: [<span class="pl-s"><span class="pl-pds">'</span>/client.js<span class="pl-pds">'</span></span>],
    }
  );

  <span class="pl-c">// 2️⃣ Pipe the response through the manager</span>
  <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-en">Response</span>(<span class="pl-smi">stream</span>.<span class="pl-en">pipeThrough</span>(<span class="pl-smi">manager</span>), {
    headers: { <span class="pl-s"><span class="pl-pds">'</span>content-type<span class="pl-pds">'</span></span>: <span class="pl-s"><span class="pl-pds">'</span>text/html<span class="pl-pds">'</span></span> },
  });
}
</code></pre><p>State of executors is streamed to the client along with the chunks rendered by React.</p><h2 id="state-serialization"><a class="markdown-permalink" href="#state-serialization"><span class="icon icon-link"></span></a>State serialization</h2><p>By default, an executor state is serialized using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"><code>JSON.stringify</code> <sup>↗</sup></a> that has quite a few limitations. If your executor stores a value that may contain circular references, or non-serializable data like <code>BigInt</code>, use a custom state serialization.</p><p>On the client, pass a <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.SSRHydrationOptions.html#stateparser"><code>stateParser</code> <sup>↗</sup></a> option to <code>enableSSRHydration</code>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> <span class="pl-smi">React</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">hydrateRoot</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-dom/client<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">enableSSRHydration</span>, <span class="pl-smi">ExecutorManager</span>, <span class="pl-smi">ExecutorManagerProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">JSONMarshal</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-c">// 🟡 Pass a custom state parser</span>
<span class="pl-en">enableSSRHydration</span>(<span class="pl-smi">manager</span>, { stateParser: <span class="pl-smi">JSONMarshal</span>.<span class="pl-smi">parse</span> });

<span class="pl-en">hydrateRoot</span>(
  <span class="pl-c1">document</span>,
  &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span><span class="pl-pse">}</span>>
    &#x3C;<span class="pl-c1">App</span> />
  &#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>
);
</code></pre><p>On the server, pass a <a href="https://smikhalevski.github.io/react-executor/interfaces/ssr.SSRExecutorManagerOptions.html#statestringifier"><code>stateStringifier</code> <sup>↗</sup></a> option to <a href="#render-to-string"><code>SSRExecutorManager</code></a>, <a href="#streaming-ssr"><code>PipeableSSRExecutorManager</code></a>, or <a href="#readable-web-streams-support"><code>ReadableSSRExecutorManager</code></a>, depending on your setup:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">SSRExecutorManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/ssr<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">JSONMarshal</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>json-marshal<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">SSRExecutorManager</span>({ stateStringifier: <span class="pl-smi">JSONMarshal</span>.<span class="pl-smi">stringify</span> });
</code></pre><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>With additional configuration, <a href="https://github.com/smikhalevski/json-marshal#readme">json-marshal <sup>↗</sup></a> can stringify and parse any data structure.</p></div><h2 id="content-security-policy-support"><a class="markdown-permalink" href="#content-security-policy-support"><span class="icon icon-link"></span></a>Content-Security-Policy support</h2><p>By default, <a href="https://smikhalevski.github.io/react-executor/classes/ssr.SSRExecutorManager.html#nexthydrationchunk"><code>nextHydrationChunk</code> <sup>↗</sup></a> renders an inline <code>&#x3C;script></code> tag without any attributes. To enable the support of the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src"><code>script-src</code> <sup>↗</sup></a> directive of the <code>Content-Security-Policy</code> header, provide the <a href="https://smikhalevski.github.io/react-executor/interfaces/ssr.SSRExecutorManagerOptions.html#nonce"><code>nonce</code> <sup>↗</sup></a> option to <code>SSRExecutorManager</code> or any of its subclasses:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">PipeableSSRExecutorManager</span>(<span class="pl-smi">response</span>, { nonce: <span class="pl-s"><span class="pl-pds">'</span>2726c7f26c<span class="pl-pds">'</span></span> });
</code></pre><p>Send the header with this nonce in the server response:</p><pre><code>Content-Security-Policy: script-src 'nonce-2726c7f26c'
</code></pre><h2 id="nextjs-integration"><a class="markdown-permalink" href="#nextjs-integration"><span class="icon icon-link"></span></a>Next.js integration</h2><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>Check out the live example of <a href="https://codesandbox.io/p/devbox/react-executor-next-example-whsj4v">the Next.js app <sup>↗</sup></a> that showcases streaming SSR with React Executor.</p></div><p>To enable client hydration in Next.js, use <a href="https://github.com/smikhalevski/react-executor-next"><code>@react-executor/next</code> <sup>↗</sup></a> package.</p><p>First, provide an <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html"><code>ExecutorManager</code> <sup>↗</sup></a>:</p><pre><code class="language-tsx"><span class="pl-c">// providers.tsx</span>
<span class="pl-s"><span class="pl-pds">'</span>use client<span class="pl-pds">'</span></span>;

<span class="pl-k">import</span> { <span class="pl-smi">ReactNode</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">enableSSRHydration</span>, <span class="pl-smi">ExecutorManager</span>, <span class="pl-smi">ExecutorManagerProvider</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">SSRExecutorManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/ssr<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">ExecutorHydrator</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@react-executor/next<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">typeof</span> <span class="pl-c1">window</span> <span class="pl-k">!==</span> <span class="pl-s"><span class="pl-pds">'</span>undefined<span class="pl-pds">'</span></span> <span class="pl-k">?</span> <span class="pl-en">enableSSRHydration</span>(<span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>()) <span class="pl-k">:</span> <span class="pl-c1">undefined</span>;

<span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">Providers</span>(<span class="pl-v">props</span><span class="pl-k">:</span> { <span class="pl-v">children</span><span class="pl-k">:</span> <span class="pl-en">ReactNode</span> }) {
  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span> <span class="pl-k">||</span> <span class="pl-k">new</span> <span class="pl-en">SSRExecutorManager</span>()<span class="pl-pse">}</span>>
      &#x3C;<span class="pl-c1">ExecutorHydrator</span>><span class="pl-pse">{</span><span class="pl-smi">props</span>.<span class="pl-smi">children</span><span class="pl-pse">}</span>&#x3C;/<span class="pl-c1">ExecutorHydrator</span>>
    &#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>
  );
}
</code></pre><p><code>ExecutorHydrator</code> propagates server-rendered executor state to the client. You can configure how dehydrated state is <a href="#state-serialization">serialized on the server and deserialized on the client</a>, by default <code>JSON</code> is used.</p><p>Enable providers in the root layout:</p><pre><code class="language-tsx"><span class="pl-c">// layout.tsx</span>
<span class="pl-k">import</span> { <span class="pl-smi">ReactNode</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">Providers</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>./providers<span class="pl-pds">'</span></span>;

<span class="pl-k">export</span> <span class="pl-k">default</span> <span class="pl-k">function</span> (<span class="pl-v">props</span><span class="pl-k">:</span> { <span class="pl-v">children</span><span class="pl-k">:</span> <span class="pl-en">ReactNode</span> }) {
  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-ent">html</span> <span class="pl-e">lang</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">"</span>en<span class="pl-pds">"</span></span>>
      &#x3C;<span class="pl-ent">body</span>>
        &#x3C;<span class="pl-c1">Providers</span>><span class="pl-pse">{</span><span class="pl-smi">props</span>.<span class="pl-smi">children</span><span class="pl-pse">}</span>&#x3C;/<span class="pl-c1">Providers</span>>
      &#x3C;/<span class="pl-ent">body</span>>
    &#x3C;/<span class="pl-ent">html</span>>
  );
}
</code></pre><h1 id="devtools"><a class="markdown-permalink" href="#devtools"><span class="icon icon-link"></span></a>Devtools</h1><p>To inspect the current state of executors in your app, install the <a href="https://chromewebstore.google.com/detail/react-executor-devtools/achlflelpafnlpepfpfhildkahbfhgjc">React Executor Devtools <sup>↗</sup></a> browser extension and open its panel in the Chrome Developer Tools:</p><br><p align="center"><img alt="React Executor Devtools Screenshot" src="https://raw.githubusercontent.com/smikhalevski/react-executor-devtools/master/assets/screenshot.png" width="640"></p><br><p>Devtools extension doesn't require any additional configuration and provides introspection to all executors on the page, regardless if they were rendered through React or created outside of the rendering process.</p><p>To disable devtools, create a custom <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html"><code>ExecutorManager</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">ExecutorManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">opaqueExecutorManager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>({
  devtools: <span class="pl-c1">false</span>,
});
</code></pre><p>Executors created by the <code>opaqueExecutorManager</code> won't be visible in the React Executor Devtools extension. It is recommended to use this setting in production.</p><p>The extension source can be found in the <a href="https://github.com/smikhalevski/react-executor-devtools">react-executor-devtools <sup>↗</sup></a> repo.</p><h1 id="cookbook"><a class="markdown-permalink" href="#cookbook"><span class="icon icon-link"></span></a>Cookbook</h1><h2 id="optimistic-updates"><a class="markdown-permalink" href="#optimistic-updates"><span class="icon icon-link"></span></a>Optimistic updates</h2><p>To implement optimistic updates, <a href="#settle-an-executor">resolve the executor</a> with the expected value and then execute a server request.</p><p>For example, if you want to instantly show to a user that a flag was enabled:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>flag<span class="pl-pds">'</span></span>, <span class="pl-c1">false</span>);

<span class="pl-k">const</span> <span class="pl-en">handleEnableClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
  <span class="pl-c">// 1️⃣ Optimistically resolve an executor</span>
  <span class="pl-smi">executor</span>.<span class="pl-c1">resolve</span>(<span class="pl-c1">true</span>);

  <span class="pl-c">// 2️⃣ Synchronize state with the server</span>
  <span class="pl-smi">executor</span>.<span class="pl-en">execute</span>(<span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> {
    <span class="pl-k">const</span> <span class="pl-c1">response</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">fetch</span>(<span class="pl-s"><span class="pl-pds">'</span>/flag<span class="pl-pds">'</span></span>, { <span class="pl-smi">signal</span> });

    <span class="pl-k">const</span> <span class="pl-c1">data</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">response</span>.<span class="pl-en">json</span>();

    <span class="pl-k">return</span> <span class="pl-smi">data</span>.<span class="pl-smi">isEnabled</span>;
  });
};
</code></pre><h2 id="dependent-tasks"><a class="markdown-permalink" href="#dependent-tasks"><span class="icon icon-link"></span></a>Dependent tasks</h2><p>Pause a task until another executor is settled:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">accountExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>account<span class="pl-pds">'</span></span>, <span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> {
  <span class="pl-c">// Fetch account here</span>
});

<span class="pl-k">const</span> <span class="pl-c1">shoppingCartExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>shoppingCart<span class="pl-pds">'</span></span>, <span class="pl-k">async</span> <span class="pl-v">signal</span> <span class="pl-k">=></span> {
  <span class="pl-k">const</span> <span class="pl-c1">account</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">accountExecutor</span>.<span class="pl-en">getOrAwait</span>();

  <span class="pl-c">// Fetch shopping cart for an account</span>
});
</code></pre><p>In this example, the component is subscribed to both account and a shopping cart executors, and re-rendered if their state is changed. To avoid unnecessary re-renders, you can acquire an executor through the manager:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-c1">shoppingCartExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>shoppingCart<span class="pl-pds">'</span></span>, <span class="pl-k">async</span> (<span class="pl-v">signal</span>, <span class="pl-v">executor</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// 1️⃣ Wait for the account executor to be created</span>
  <span class="pl-k">const</span> <span class="pl-c1">accountExecutor</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">executor</span>.<span class="pl-smi">manager</span>.<span class="pl-en">getOrAwait</span>(<span class="pl-s"><span class="pl-pds">'</span>account<span class="pl-pds">'</span></span>);

  <span class="pl-c">// 2️⃣ Wait for the account executor to be settled</span>
  <span class="pl-k">const</span> <span class="pl-c1">account</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">accountExecutor</span>.<span class="pl-en">getOrAwait</span>();

  <span class="pl-c">// Fetch shopping cart for an account</span>
});
</code></pre><h2 id="pagination"><a class="markdown-permalink" href="#pagination"><span class="icon icon-link"></span></a>Pagination</h2><p>Create an executor that would store the current page contents:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">fetchPage</span> <span class="pl-k">=</span> <span class="pl-k">async</span> (<span class="pl-v">pageIndex</span><span class="pl-k">:</span> <span class="pl-c1">number</span>, <span class="pl-v">signal</span><span class="pl-k">:</span> <span class="pl-en">AbortSignal</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// Request the data from the server here</span>
};

<span class="pl-k">const</span> <span class="pl-c1">pageExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>page<span class="pl-pds">'</span></span>, <span class="pl-v">signal</span> <span class="pl-k">=></span> <span class="pl-en">fetchPage</span>(<span class="pl-c1">0</span>, <span class="pl-smi">signal</span>));

<span class="pl-k">const</span> <span class="pl-en">handleGoToPageClick</span> <span class="pl-k">=</span> (<span class="pl-v">pageIndex</span><span class="pl-k">:</span> <span class="pl-c1">number</span>) <span class="pl-k">=></span> {
  <span class="pl-smi">pageExecutor</span>.<span class="pl-en">execute</span>(<span class="pl-v">signal</span> <span class="pl-k">=></span> <span class="pl-en">fetchPage</span>(<span class="pl-smi">pageIndex</span>, <span class="pl-smi">signal</span>));
};
</code></pre><p>The executor preserves the latest value it was resolved with, so you can render page contents using <code>executor.value</code>, and render a spinner when <code>executor.isPending</code>.</p><h2 id="infinite-scroll"><a class="markdown-permalink" href="#infinite-scroll"><span class="icon icon-link"></span></a>Infinite scroll</h2><p>Create a task that uses the current executor value to combine it with the data loaded from the server:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">itemsExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>&#x3C;<span class="pl-en">Item</span>[]>(<span class="pl-s"><span class="pl-pds">'</span>items<span class="pl-pds">'</span></span>, <span class="pl-k">async</span> (<span class="pl-v">signal</span>, <span class="pl-v">executor</span>) <span class="pl-k">=></span> {
  <span class="pl-k">const</span> <span class="pl-c1">items</span> <span class="pl-k">=</span> <span class="pl-smi">executor</span>.<span class="pl-c1">value</span> <span class="pl-k">||</span> [];

  <span class="pl-k">return</span> <span class="pl-smi">items</span>.<span class="pl-c1">concat</span>(<span class="pl-k">await</span> <span class="pl-en">fetchItems</span>({ offset: <span class="pl-smi">items</span>.<span class="pl-c1">length</span>, <span class="pl-smi">signal</span> }));
});
</code></pre><p>Now if a user clicks on a button to load more items, <code>itemsExecutor</code> must retry the latest task:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">handleLoadMoreClick</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
  <span class="pl-smi">itemsExecutor</span>.<span class="pl-en">retry</span>();
};
</code></pre><h2 id="invalidate-all-executors"><a class="markdown-permalink" href="#invalidate-all-executors"><span class="icon icon-link"></span></a>Invalidate all executors</h2><p><a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html#_iterator_"><code>ExecutorManager</code> <sup>↗</sup></a> is iterable and provides access to all executors that it has created. You can perform bach operations with all executors in for-loop:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-en">useExecutorManager</span>();

<span class="pl-k">for</span> (<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">of</span> <span class="pl-smi">manager</span>) {
  <span class="pl-smi">executor</span>.<span class="pl-en">invalidate</span>();
}
</code></pre><p>By default, invalidating an executor has no additional effect. If you want to <a href="#retry-the-latest-task">retry the latest task</a> that each executor has executed, use <a href="https://smikhalevski.github.io/react-executor/interfaces/react-executor.Executor.html#retry"><code>retry</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">for</span> (<span class="pl-k">const</span> <span class="pl-c1">executor</span> <span class="pl-k">of</span> <span class="pl-smi">manager</span>) {
  <span class="pl-smi">executor</span>.<span class="pl-en">retry</span>();
}
</code></pre><p>It isn't optimal to retry all executors even if they aren't <a href="#activate-an-executor">actively used</a>. Use the <a href="https://smikhalevski.github.io/react-executor/modules/plugin_retryInvalidated.html"><code>retryInvalidated</code> <sup>↗</sup></a> to retry active executors when they are invalidated.</p><h2 id="prefetching"><a class="markdown-permalink" href="#prefetching"><span class="icon icon-link"></span></a>Prefetching</h2><p>In some cases, you can initialize an executor before its data is required for the first time:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-en">User</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> {
  <span class="pl-en">useExecutorManager</span>().<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>shoppingCart<span class="pl-pds">'</span></span>, <span class="pl-smi">fetchShoppingCart</span>);
};
</code></pre><p>In this example, the executor with the <code>'shoppingCart'</code> key is initialized once the component is rendered for the first time. The <code>User</code> component <em>won't be re-rendered</em> if the state of this executor is changed.</p><p>To do prefetching before the application is even rendered, create an executor manager beforehand:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">ExecutorManager</span>();

<span class="pl-c">// Prefetch the shopping cart</span>
<span class="pl-smi">manager</span>.<span class="pl-en">getOrCreate</span>(<span class="pl-s"><span class="pl-pds">'</span>shoppingCart<span class="pl-pds">'</span></span>, <span class="pl-smi">fetchShoppingCart</span>);

<span class="pl-k">const</span> <span class="pl-en">App</span> <span class="pl-k">=</span> () <span class="pl-k">=></span> &#x3C;<span class="pl-c1">ExecutorManagerProvider</span> <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">manager</span><span class="pl-pse">}</span>><span class="pl-pse">{</span><span class="pl-c">/* Render you app here */</span><span class="pl-pse">}</span>&#x3C;/<span class="pl-c1">ExecutorManagerProvider</span>>;
</code></pre><h2 id="storage-state-versioning"><a class="markdown-permalink" href="#storage-state-versioning"><span class="icon icon-link"></span></a>Storage state versioning</h2><p>You can store an executor state in a <code>localStorage</code> using the <a href="#syncstorage"><code>syncStorage</code></a> plugin:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">useExecutor</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">syncStorage</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor/plugin/syncStorage<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">playerExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>player<span class="pl-pds">'</span></span>, { health: <span class="pl-s"><span class="pl-pds">'</span>50%<span class="pl-pds">'</span></span> }, [<span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>)]);
<span class="pl-c">// ⮕ Executor&#x3C;{ health: string }></span>
</code></pre><p>But what if over time you'd like to change the structure of the value stored in the <code>playerExecutor</code>? For example, make <code>health</code> property a number:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">playerExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>player<span class="pl-pds">'</span></span>, { health: <span class="pl-c1">0.5</span> }, [<span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>)]);
</code></pre><p>After users have used the previous version of the app where <code>health</code> was a string, they would still receive a string value since the <code>playerExecutor</code> state is read from the <code>localStorage</code>:</p><pre><code class="language-ts"><span class="pl-smi">playerExecutor</span>.<span class="pl-c1">value</span>.<span class="pl-smi">health</span>;
<span class="pl-c">// ⮕ '50%'</span>
</code></pre><p>This may lead to an unexpected behavior of your app. To mitigate this issue, let's write a plugin that would annotate the executor with a version:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-k">type</span> <span class="pl-smi">ExecutorPlugin</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react-executor<span class="pl-pds">'</span></span>;

<span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">requireVersion</span>(<span class="pl-v">version</span><span class="pl-k">:</span> <span class="pl-c1">number</span>)<span class="pl-k">:</span> <span class="pl-en">ExecutorPlugin</span> {
  <span class="pl-k">return</span> <span class="pl-v">executor</span> <span class="pl-k">=></span> {
    <span class="pl-k">if</span> (<span class="pl-smi">executor</span>.<span class="pl-smi">annotations</span>.<span class="pl-c1">version</span> <span class="pl-k">===</span> <span class="pl-smi">version</span>) {
      <span class="pl-c">// ✅ Executor is annotated with a correct version</span>
      <span class="pl-k">return</span>;
    }

    <span class="pl-c">// ❌ Clear the executor state and annotate it with a proper version</span>
    <span class="pl-smi">executor</span>.<span class="pl-c1">clear</span>();
    <span class="pl-smi">executor</span>.<span class="pl-en">annotate</span>({ <span class="pl-smi">version</span> });
  };
}
</code></pre><p>Add the plugin to the executor:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">playerExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>player<span class="pl-pds">'</span></span>, { health: <span class="pl-c1">0.5</span> }, [<span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>), <span class="pl-en">requireVersion</span>(<span class="pl-c1">1</span>)]);
</code></pre><p>After the <code>syncStorage</code> plugin reads the data from the <code>localStorage</code>, the <code>requireVersion</code> plugin ensures that the <code>version</code> annotation read from the <code>localStorage</code> matches the required version. On mismatch the executor is cleared and the initial value <code>{ health: 0.5 }</code> is written to the storage.</p><pre><code class="language-ts"><span class="pl-smi">playerExecutor</span>.<span class="pl-c1">value</span>.<span class="pl-smi">health</span>;
<span class="pl-c">// ⮕ 0.5</span>
</code></pre><p>Bump the version provided to <code>requireVersion</code> plugin every time the structure of the executor value is changed.</p><p>We can enhance the <code>requireVersion</code> plugin by making it migrate the data instead of just clearing it:</p><pre><code class="language-ts"><span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">requireVersion</span>&#x3C;<span class="pl-en">T</span>>(<span class="pl-v">version</span><span class="pl-k">:</span> <span class="pl-c1">number</span>, <span class="pl-en">migrate</span><span class="pl-k">:</span> (<span class="pl-v">executor</span><span class="pl-k">:</span> <span class="pl-en">Executor</span>&#x3C;<span class="pl-en">T</span>>) <span class="pl-k">=></span> <span class="pl-en">T</span>)<span class="pl-k">:</span> <span class="pl-en">ExecutorPlugin</span>&#x3C;<span class="pl-en">T</span>> {
  <span class="pl-k">return</span> <span class="pl-v">executor</span> <span class="pl-k">=></span> {
    <span class="pl-k">if</span> (<span class="pl-smi">executor</span>.<span class="pl-smi">annotations</span>.<span class="pl-c1">version</span> <span class="pl-k">===</span> <span class="pl-smi">version</span>) {
      <span class="pl-k">return</span>;
    }

    <span class="pl-c">// 🟡 Migrate only if executor has a value</span>
    <span class="pl-k">if</span> (<span class="pl-smi">executor</span>.<span class="pl-smi">isSettled</span>) {
      <span class="pl-en">migrate</span>(<span class="pl-smi">executor</span>);
    }

    <span class="pl-smi">executor</span>.<span class="pl-en">annotate</span>({ <span class="pl-smi">version</span> });
  };
}
</code></pre><p>Now <code>requireVersion</code> would apply the migration on the state version mismatch:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">playerExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(<span class="pl-s"><span class="pl-pds">'</span>player<span class="pl-pds">'</span></span>, { health: <span class="pl-c1">0.5</span> }, [
  <span class="pl-en">syncStorage</span>(<span class="pl-smi">localStorage</span>),

  <span class="pl-en">requireVersion</span>(<span class="pl-c1">1</span>, <span class="pl-v">executor</span> <span class="pl-k">=></span> {
    <span class="pl-smi">executor</span>.<span class="pl-c1">resolve</span>({
      health: <span class="pl-c1">parseInt</span>(<span class="pl-smi">executor</span>.<span class="pl-c1">get</span>().<span class="pl-smi">health</span>) <span class="pl-k">/</span> <span class="pl-c1">100</span>,
    });
  }),
]);
</code></pre><h2 id="global-loading-indicator"><a class="markdown-permalink" href="#global-loading-indicator"><span class="icon icon-link"></span></a>Global loading indicator</h2><p>To detect a global pending state we can rely on events published by an <a href="https://smikhalevski.github.io/react-executor/classes/react-executor.ExecutorManager.html"><code>ExecutorManager</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">function</span> <span class="pl-en">useGlobalPending</span>(<span class="pl-en">predicate</span> <span class="pl-k">=</span> (<span class="pl-v">executor</span><span class="pl-k">:</span> <span class="pl-en">Executor</span>) <span class="pl-k">=></span> <span class="pl-c1">true</span>)<span class="pl-k">:</span> <span class="pl-c1">boolean</span> {
  <span class="pl-k">const</span> <span class="pl-c1">manager</span> <span class="pl-k">=</span> <span class="pl-en">useExecutorManager</span>();
  <span class="pl-k">const</span> [<span class="pl-c1">isPending</span>, <span class="pl-c1">setPending</span>] <span class="pl-k">=</span> <span class="pl-en">useState</span>(<span class="pl-c1">false</span>);

  <span class="pl-en">useEffect</span>(() <span class="pl-k">=></span> {
    <span class="pl-k">const</span> <span class="pl-en">listener</span> <span class="pl-k">=</span> (<span class="pl-v">event</span><span class="pl-k">:</span> <span class="pl-en">ExecutorEvent</span>) <span class="pl-k">=></span> {
      <span class="pl-en">setPending</span>(
        <span class="pl-c1">Array</span>.<span class="pl-en">from</span>(<span class="pl-smi">manager</span>)
          .<span class="pl-en">filter</span>(<span class="pl-smi">predicate</span>)
          .<span class="pl-en">some</span>(<span class="pl-v">executor</span> <span class="pl-k">=></span> <span class="pl-smi">executor</span>.<span class="pl-smi">isPending</span>)
      );
    };

    <span class="pl-c">// 1️⃣ Ensure isPending is up-to-date after mount</span>
    <span class="pl-en">listener</span>();

    <span class="pl-c">// 2️⃣ Sync isPending when any event is published</span>
    <span class="pl-k">return</span> <span class="pl-smi">manager</span>.<span class="pl-en">subscribe</span>(<span class="pl-smi">listener</span>);
  }, [<span class="pl-smi">manager</span>]);

  <span class="pl-k">return</span> <span class="pl-smi">isPending</span>;
}
</code></pre><p>Now a global pending indicator can be shown when <em>any</em> executor is pending:</p><pre><code class="language-tsx"><span class="pl-k">const</span> <span class="pl-c1">isPending</span> <span class="pl-k">=</span> <span class="pl-en">useGlobalPending</span>();

<span class="pl-smi">isPending</span> <span class="pl-k">&#x26;&#x26;</span> &#x3C;<span class="pl-c1">LoadingIndicator</span> />;
</code></pre><p>You can use a predicate to filter only executors that are actually fetching data. To do this, fetching executors should be marked as such, for example with an annotation:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">accountExecutor</span> <span class="pl-k">=</span> <span class="pl-en">useExecutor</span>(
  <span class="pl-s"><span class="pl-pds">'</span>account<span class="pl-pds">'</span></span>,

  <span class="pl-k">async</span> () <span class="pl-k">=></span> {
    <span class="pl-k">const</span> <span class="pl-c1">response</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">fetch</span>(<span class="pl-s"><span class="pl-pds">'</span>/account<span class="pl-pds">'</span></span>);
    <span class="pl-k">return</span> <span class="pl-smi">response</span>.<span class="pl-en">json</span>();
  },

  <span class="pl-c">// 1️⃣ Annotate an executor once via a plugin</span>
  [<span class="pl-v">executor</span> <span class="pl-k">=></span> <span class="pl-smi">executor</span>.<span class="pl-en">annotate</span>({ isFetching: <span class="pl-c1">true</span> })]
);

<span class="pl-c">// 2️⃣ Get global pending status for executors that are fetching data</span>
<span class="pl-k">const</span> <span class="pl-c1">isPending</span> <span class="pl-k">=</span> <span class="pl-en">useGlobalPending</span>(<span class="pl-v">executor</span> <span class="pl-k">=></span> <span class="pl-smi">executor</span>.<span class="pl-smi">annotations</span>.<span class="pl-smi">isFetching</span>);
</code></pre>`};function d(){return s.createElement(e,{logo:s.createElement("div",{style:{...n(p,a),aspectRatio:1324/480,backgroundRepeat:"no-repeat",backgroundSize:"contain",maxWidth:"100%",maxHeight:"100%",width:"20rem"},title:"React Executor"}),readme:l})}export{d as default};
