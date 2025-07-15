import{b as s}from"./vendor-BmysqiTO.js";import{r as a,a as p}from"./roqueform-logo-dark-KIvWff94.js";import{R as l}from"./Readme-Wh0g9PV8.js";import{l as n}from"./utils-D7qyeKq7.js";import"./index-u5DWfO9E.js";const e={version:"6.0.0",overviewContent:`<p>The form state management library that can handle hundreds of fields without breaking a sweat.</p><ul><li>Expressive and concise API with strict typings;</li><li>Controlled and <a href="#uncontrolled-plugin">uncontrolled inputs</a>;</li><li>Unparalleled extensibility with plugins;</li><li>Supports your favourite rendering and <a href="#validation-plugin">validation libraries</a>;</li><li><a href="https://bundlephobia.com/result?p=roqueform">Just 2 kB gzipped.</a></li></ul><pre><code class="language-sh">npm install --save-prod roqueform
</code></pre>`,tocContent:'<p>🔥 <a href="https://stackblitz.com/edit/roqueform-example"><strong>Live example</strong></a></p><p>🚀 <strong>Features</strong></p><ul><li><a href="#introduction">Introduction</a></li><li><a href="#events-and-subscriptions">Events and subscriptions</a></li><li><a href="#transient-updates">Transient updates</a></li><li><a href="#accessors">Accessors</a></li><li><a href="#plugins">Plugins</a></li></ul><p>🔌 <strong>Built-in plugins</strong></p><ul><li><a href="#annotations-plugin">Annotations plugin</a></li><li><a href="#constraint-validation-api-plugin">Constraint validation API plugin</a></li><li><a href="#errors-plugin">Errors plugin</a></li><li><a href="#dom-element-reference-plugin">DOM element reference plugin</a></li><li><a href="#reset-plugin">Reset plugin</a></li><li><a href="#scroll-to-an-error-plugin">Scroll to an error plugin</a></li><li><a href="#uncontrolled-plugin">Uncontrolled plugin</a></li><li><a href="#validation-plugin">Validation plugin</a></li></ul><p>⚛️ <a href="#react-integration"><strong>React integration</strong></a></p><ul><li><a href="#eager-and-lazy-re-renders">Eager and lazy re-renders</a></li><li><a href="#reacting-to-changes">Reacting to changes</a></li></ul><p>🎯 <a href="#motivation"><strong>Motivation</strong></a></p>',articleContent:`<h1 id="introduction"><a class="markdown-permalink" href="#introduction"><span class="icon icon-link"></span></a>Introduction</h1><p>The central piece of Roqueform is the concept of a field. A field holds a value and provides a means to update it.</p><p>Let's start by creating a field:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>();
<span class="pl-c">// ⮕ Field&#x3C;any></span>
</code></pre><p>A value can be set to and retrieved from the field:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">setValue</span>(<span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>);

<span class="pl-smi">field</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Pluto'</span>
</code></pre><p>Provide the initial value for a field:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">ageField</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ Field&#x3C;number></span>

<span class="pl-smi">ageField</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 42</span>
</code></pre><p>The field value type is inferred from the initial value, but you can explicitly specify the field value type:</p><pre><code class="language-ts"><span class="pl-k">interface</span> <span class="pl-en">Planet</span> {
  <span class="pl-v">name</span><span class="pl-k">:</span> <span class="pl-c1">string</span>;
}

<span class="pl-k">interface</span> <span class="pl-en">Universe</span> {
  <span class="pl-v">planets</span><span class="pl-k">:</span> <span class="pl-en">Planet</span>[];
}

<span class="pl-k">const</span> <span class="pl-c1">universeField</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>&#x3C;<span class="pl-en">Universe</span>>();
<span class="pl-c">// ⮕ Field&#x3C;Universe | undefined></span>

<span class="pl-smi">universeField</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ undefined</span>
</code></pre><p>Retrieve a child field by its key:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">planetsField</span> <span class="pl-k">=</span> <span class="pl-smi">universeField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>planets<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Field&#x3C;Planet[] | undefined></span>
</code></pre><p><code>planetsField</code> is a child field, and it is linked to its parent <code>universeField</code>.</p><pre><code class="language-ts"><span class="pl-smi">planetsField</span>.<span class="pl-smi">key</span> <span class="pl-c">// ⮕ 'planets'</span>

<span class="pl-smi">planetsField</span>.<span class="pl-c1">parent</span> <span class="pl-c">// ⮕ universeField</span>
</code></pre><p>Fields returned by the <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldCore.html#at"><code>Field.at</code></a> method have a stable identity. This means that you can invoke <code>at(key)</code> with the same key multiple times and the same field instance is returned:</p><pre><code class="language-ts"><span class="pl-smi">universeField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>planets<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ planetsField</span>
</code></pre><p>So most of the time you don't need to store a child field in a variable if you already have a reference to a parent field.</p><p>The child field has all the same functionality as its parent, so you can access its children as well:</p><pre><code class="language-ts"><span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Field&#x3C;string | undefined></span>
</code></pre><p>When a value is set to a child field, a parent field value is also updated. If parent field doesn't have a value yet, Roqueform would infer its type from a key of the child field.</p><pre><code class="language-ts"><span class="pl-smi">universeField</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ undefined</span>

<span class="pl-smi">universeField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>planets<span class="pl-pds">'</span></span>).<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>).<span class="pl-en">setValue</span>(<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>);

<span class="pl-smi">universeField</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ { planets: [{ name: 'Mars' }] }</span>
</code></pre><p>By default, for a key that is a numeric array index, a parent array is created, otherwise an object is created. You can change this behaviour with <a href="#accessors">custom accessors</a>.</p><p>When a value is set to a parent field, child fields are also updated:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">nameField</span> <span class="pl-k">=</span> <span class="pl-smi">universeField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>planets<span class="pl-pds">'</span></span>).<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>);

<span class="pl-smi">nameField</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Mars'</span>

<span class="pl-smi">universeField</span>.<span class="pl-en">setValue</span>({ planets: [{ name: <span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span> }] });

<span class="pl-smi">nameField</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Venus'</span>
</code></pre><h1 id="events-and-subscriptions"><a class="markdown-permalink" href="#events-and-subscriptions"><span class="icon icon-link"></span></a>Events and subscriptions</h1><p>You can subscribe to events published by a field:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">unsubscribe</span> <span class="pl-k">=</span> <span class="pl-smi">planetsField</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>valueChanged<span class="pl-pds">'</span></span>) {
    <span class="pl-c">// Handle the field value change</span>
  }
});
<span class="pl-c">// ⮕ () => void</span>
</code></pre><p>All events conform the <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldEvent.html"><code>FieldEvent</code></a> interface.</p><p>Without plugins, fields publish only <a href="https://smikhalevski.github.io/roqueform/types/roqueform.FieldEventType.html"><code>valueChanged</code></a> event when the field value is changed via <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldCore.html#setvalue"><code>Field.setValue</code></a>.</p><p>The root field and its descendants are updated before <code>valueChanged</code> event is published, so it's safe to read field values in a listener.</p><p>Fields use <a href="https://262.ecma-international.org/7.0/#sec-samevaluezero">SameValueZero</a> comparison to detect that the value has changed.</p><pre><code class="language-ts"><span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>).<span class="pl-en">subscibe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-c">// Handle the event here</span>
});

<span class="pl-c">// ✅ The value has changed, the listener is called</span>
<span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>).<span class="pl-en">setValue</span>(<span class="pl-s"><span class="pl-pds">'</span>Mercury<span class="pl-pds">'</span></span>);

<span class="pl-c">// 🚫 The value is unchanged, the listener isn't called</span>
<span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-en">setValue</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>Mercury<span class="pl-pds">'</span></span> });
</code></pre><p>Plugins may publish their own events. Here's an example of the <a href="https://smikhalevski.github.io/roqueform/types/roqueform.FieldEventType.html"><code>errorAdded</code></a> event published by the <a href="#errors-plugin"><code>errorsPlugin</code></a>.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">errorsPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/errors<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span> }, [<span class="pl-en">errorsPlugin</span>()]);

<span class="pl-smi">field</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>errorAdded<span class="pl-pds">'</span></span>) {
    <span class="pl-c">// Handle the error here</span>
    <span class="pl-c1">event</span>.<span class="pl-smi">payload</span> <span class="pl-c">// ⮕ 'Illegal user'</span>
  }
});

<span class="pl-smi">field</span>.<span class="pl-en">addError</span>(<span class="pl-s"><span class="pl-pds">'</span>Illegal user<span class="pl-pds">'</span></span>);
</code></pre><h1 id="transient-updates"><a class="markdown-permalink" href="#transient-updates"><span class="icon icon-link"></span></a>Transient updates</h1><p>When you call <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldCore.html#setvalue"><code>Field.setValue</code></a> on a field its value is updates along with values of its ancestors and descendants. To manually control the update propagation to fields ancestors, you can use transient updates.</p><p>When a value of a child field is set transiently, values of its ancestors <em>aren't</em> immediately updated.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>();
<span class="pl-c">// ⮕ Field&#x3C;any></span>

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">setTransientValue</span>(<span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span>);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'world'</span>

<span class="pl-c">// 🟡 Parent value wasn't updated</span>
<span class="pl-smi">field</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ undefined</span>
</code></pre><p>You can check that a field is in a transient state:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isTransient</span> <span class="pl-c">// ⮕ true</span>
</code></pre><p>To propagate the transient value contained by the child field to its parent, use the <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldCore.html#flushtransient"><code>Field.flushTransient</code></a> method:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">flushTransient</span>();

<span class="pl-c">// 🟡 The value of the parent field was updated</span>
<span class="pl-smi">field</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ { hello: 'world' }</span>
</code></pre><p><a href="https://smikhalevski.github.io/roqueforminterfaces/roqueform.FieldCore.html#settransientvalue"><code>Field.setTransientValue</code></a> can be called multiple times, but only the most recent update is propagated to the parent field after the <code>flushTransient</code> call.</p><p>When a child field is in a transient state, its value visible from the parent may differ from the actual value:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">planetsField</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Pluto<span class="pl-pds">'</span></span>]);

<span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">1</span>).<span class="pl-en">setTransientValue</span>(<span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>);

<span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">1</span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Venus'</span>

<span class="pl-c">// 🟡 Transient value isn't visible from the parent</span>
<span class="pl-smi">planetsField</span>.<span class="pl-c1">value</span>[<span class="pl-c1">1</span>] <span class="pl-c">// ⮕ 'Pluto'</span>
</code></pre><p>Values are synchronized after the update is propagated:</p><pre><code class="language-ts"><span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">1</span>).<span class="pl-en">flushTransient</span>();

<span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">1</span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Venus'</span>

<span class="pl-c">// 🟡 Parent and child values are now in sync</span>
<span class="pl-smi">planetsField</span>.<span class="pl-c1">value</span>[<span class="pl-c1">1</span>] <span class="pl-c">// ⮕ 'Venus'</span>
</code></pre><h1 id="accessors"><a class="markdown-permalink" href="#accessors"><span class="icon icon-link"></span></a>Accessors</h1><p><a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.ValueAccessor.html"><code>ValueAccessor</code></a> creates, reads and updates field values.</p><ul><li><p>When the child field is accessed via <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldCore.html#at"><code>Field.at</code></a> method for the first time, its value is read from the value of the parent field using the <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.ValueAccessor.html#get"><code>ValueAccessor.get</code></a> method.</p></li><li><p>When a field value is updated via <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldCore.html#setvalue"><code>Field.setValue</code></a>, then the parent field value is updated with the value returned from the <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.ValueAccessor.html#set"><code>ValueAccessor.set</code></a> method. If the updated field has child fields, their values are updated with values returned from the <a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.ValueAccessor.html#get"><code>ValueAccessor.get</code></a> method.</p></li></ul><p>By default, Roqueform uses <a href="https://smikhalevski.github.io/roqueform/variables/roqueform.naturalValueAccessor.html"><code>naturalValueAccessor</code></a> which supports:</p><ul><li>plain objects,</li><li>class instances,</li><li>arrays,</li><li><code>Map</code>-like instances,</li><li><code>Set</code>-like instances.</li></ul><p>If the field value object has <code>add()</code> and <code>[Symbol.iterator]()</code> methods, it is treated as a <code>Set</code> instance:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">usersField</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>(<span class="pl-k">new</span> <span class="pl-c1">Set</span>([<span class="pl-s"><span class="pl-pds">'</span>Bill<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Rich<span class="pl-pds">'</span></span>]));

<span class="pl-smi">usersField</span>.<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Bill'</span>

<span class="pl-smi">usersField</span>.<span class="pl-en">at</span>(<span class="pl-c1">1</span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Rich'</span>
</code></pre><p>If the field value object has <code>get()</code> and <code>set()</code> methods, it is treated as a <code>Map</code> instance:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">planetsField</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>(<span class="pl-k">new</span> <span class="pl-c1">Map</span>([
  [<span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>],
  [<span class="pl-s"><span class="pl-pds">'</span>green<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Earth<span class="pl-pds">'</span></span>]
]));

<span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>red<span class="pl-pds">'</span></span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Mars'</span>

<span class="pl-smi">planetsField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>green<span class="pl-pds">'</span></span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ 'Earth'</span>
</code></pre><p>When the field is updated, <code>naturalValueAccessor</code> infers a parent field value from the child field key: for a key that is a numeric array index, a parent array is created, otherwise an object is created.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">carsField</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>();

<span class="pl-smi">carsField</span>.<span class="pl-en">at</span>(<span class="pl-c1">0</span>).<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>brand<span class="pl-pds">'</span></span>).<span class="pl-en">setValue</span>(<span class="pl-s"><span class="pl-pds">'</span>Ford<span class="pl-pds">'</span></span>);

<span class="pl-smi">carsField</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ [{ brand: 'Ford' }]</span>
</code></pre><p>You can explicitly provide a custom accessor along with the initial value:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span>, <span class="pl-smi">naturalValueAccessor</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>([<span class="pl-s"><span class="pl-pds">'</span>Mars<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>Venus<span class="pl-pds">'</span></span>], <span class="pl-c1">undefined</span>, <span class="pl-smi">naturalValueAccessor</span>);
</code></pre><h1 id="plugins"><a class="markdown-permalink" href="#plugins"><span class="icon icon-link"></span></a>Plugins</h1><p><a href="https://smikhalevski.github.io/roqueform/types/roqueform.FieldPlugin.html"><code>FieldPlugin</code></a> callbacks that are invoked once for each newly created field. Plugins can constrain the type of the root field value and add mixins to the root field and its descendants.</p><p>Pass an array of plugins that must be applied to <a href="https://smikhalevski.github.io/roqueform/functions/roqueform.createField.html"><code>createField</code></a>:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>
<span class="pl-k">import</span> <span class="pl-smi">errorsPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/errors<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">errorsPlugin</span>()]);
</code></pre><p>A plugin receives a mutable field instance and should enrich it with the additional functionality. To illustrate how plugins work, let's create a simple plugin that enriches a field with a DOM element reference.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">FieldPlugin</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;

<span class="pl-k">interface</span> <span class="pl-en">MyValue</span> {
  <span class="pl-v">hello</span><span class="pl-k">:</span> <span class="pl-c1">string</span>;
}

<span class="pl-k">interface</span> <span class="pl-en">MyMixin</span> {
  <span class="pl-v">element</span><span class="pl-k">:</span> <span class="pl-en">Element</span> <span class="pl-k">|</span> <span class="pl-c1">null</span>;
}

<span class="pl-k">const</span> <span class="pl-en">myPlugin</span><span class="pl-k">:</span> <span class="pl-en">FieldPlugin</span>&#x3C;<span class="pl-en">MyValue</span>, <span class="pl-en">MyMixin</span>> <span class="pl-k">=</span> <span class="pl-v">field</span> <span class="pl-k">=></span> {
  <span class="pl-c">// 🟡 Initialize mixin properties</span>
  <span class="pl-smi">field</span>.<span class="pl-smi">element</span> <span class="pl-k">=</span> <span class="pl-c1">null</span>;
};
</code></pre><p>To apply the plugin to a field, pass it to the field factory:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-smi">myPlugin</span>]);
<span class="pl-c">// ⮕ Field&#x3C;MyValue, MyMixin></span>

<span class="pl-smi">field</span>.<span class="pl-smi">element</span> <span class="pl-c">// ⮕ null</span>
</code></pre><p>The plugin is applied to the <code>field</code> itself and its descendants when they are accessed for the first time:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">element</span> <span class="pl-c">// ⮕ null</span>
</code></pre><p>Plugins can publish custom <a href="#events-and-subscriptions">events</a>. Let's update the <code>myPlugin</code> implementation so it publishes an event when an element is changed:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">FieldPlugin</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;

<span class="pl-k">interface</span> <span class="pl-en">MyMixin</span> {
  <span class="pl-v">element</span><span class="pl-k">:</span> <span class="pl-en">Element</span> <span class="pl-k">|</span> <span class="pl-c1">null</span>;

  <span class="pl-en">setElement</span>(<span class="pl-v">element</span><span class="pl-k">:</span> <span class="pl-en">Element</span> <span class="pl-k">|</span> <span class="pl-c1">null</span>)<span class="pl-k">:</span> <span class="pl-c1">void</span>;
}

<span class="pl-k">const</span> <span class="pl-en">myPlugin</span><span class="pl-k">:</span> <span class="pl-en">FieldPlugin</span>&#x3C;<span class="pl-en">MyValue</span>, <span class="pl-en">MyMixin</span>> <span class="pl-k">=</span> <span class="pl-v">field</span> <span class="pl-k">=></span> {
  <span class="pl-smi">field</span>.<span class="pl-smi">element</span> <span class="pl-k">=</span> <span class="pl-c1">null</span>;

  <span class="pl-smi">field</span>.<span class="pl-en">setElement</span> <span class="pl-k">=</span> <span class="pl-v">element</span> <span class="pl-k">=></span> {
    <span class="pl-smi">field</span>.<span class="pl-smi">element</span> <span class="pl-k">=</span> <span class="pl-smi">element</span>;

    <span class="pl-c">// 🟡 Publish an event for field listeners </span>
    <span class="pl-smi">field</span>.<span class="pl-en">publish</span>({
      type: <span class="pl-s"><span class="pl-pds">'</span>elementChanged<span class="pl-pds">'</span></span>,
      target: <span class="pl-smi">field</span>,
      relatedTarget: <span class="pl-c1">null</span>,
      payload: <span class="pl-smi">element</span>
    });
  };
};
</code></pre><p><a href="https://smikhalevski.github.io/roqueform/interfaces/roqueform.FieldCore.html#publish"><code>Field.publish</code></a> invokes listeners subscribed to the field and its ancestors, so events bubble up to the root field which effectively enables event delegation:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-smi">myPlugin</span>]);

<span class="pl-c">// 1️⃣ Subscribe a listener to the root field</span>
<span class="pl-smi">field</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>elementChanged<span class="pl-pds">'</span></span>) {
    <span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-smi">element</span> <span class="pl-c">// ⮕ document.body</span>
  }
});

<span class="pl-c">// 2️⃣ Event is published by the child field</span>
<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">setElement</span>(<span class="pl-c1">document</span>.<span class="pl-c1">body</span>);
</code></pre><h1 id="annotations-plugin"><a class="markdown-permalink" href="#annotations-plugin"><span class="icon icon-link"></span></a>Annotations plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_annotations.html"><code>annotationsPlugin</code></a> associates arbitrary data with fields.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">annotationsPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/annotations<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [
  <span class="pl-en">annotationsPlugin</span>({ isDisabled: <span class="pl-c1">false</span> })
]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">annotations</span>.<span class="pl-smi">isDisabled</span> <span class="pl-c">// ⮕ false</span>
</code></pre><p>Update annotations for a single field:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">annotate</span>({ isDisabled: <span class="pl-c1">true</span> });

<span class="pl-smi">field</span>.<span class="pl-smi">annotations</span>.<span class="pl-smi">isDisabled</span> <span class="pl-c">// ⮕ true</span>

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">annotations</span>.<span class="pl-smi">isDisabled</span> <span class="pl-c">// ⮕ false</span>
</code></pre><p>Annotate field and all of its children recursively:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">annotate</span>({ isDisabled: <span class="pl-c1">true</span> }, { isRecursive: <span class="pl-c1">true</span> });

<span class="pl-smi">field</span>.<span class="pl-smi">annotations</span>.<span class="pl-smi">isDisabled</span> <span class="pl-c">// ⮕ true</span>

<span class="pl-c">// 🌕 The child field was annotated along with its parent</span>
<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">annotations</span>.<span class="pl-smi">isDisabled</span> <span class="pl-c">// ⮕ true</span>
</code></pre><p>Annotations can be updated using a callback. This is especially useful in conjunction with recursive flag:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">annotate</span>(
  <span class="pl-v">field</span> <span class="pl-k">=></span> {
    <span class="pl-c">// Toggle isDisabled for the field and its descendants</span>
    <span class="pl-k">return</span> { isDisabled: <span class="pl-k">!</span><span class="pl-smi">field</span>.<span class="pl-smi">annotations</span>.<span class="pl-smi">isDisabled</span> };
  },
  { isRecursive: <span class="pl-c1">true</span> }
);
</code></pre><p>Subscribe to annotation changes:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>annotationsChanged<span class="pl-pds">'</span></span>) {
    <span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-smi">annotations</span> <span class="pl-c">// ⮕ { isDisabled: boolean }</span>
  }
});
</code></pre><h1 id="constraint-validation-api-plugin"><a class="markdown-permalink" href="#constraint-validation-api-plugin"><span class="icon icon-link"></span></a>Constraint validation API plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_constraint-validation.html"><code>constraintValidationPlugin</code></a> integrates fields with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation">Constraint validation API</a>.</p><p>For example, let's use the plugin to validate text input:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">input</span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>text<span class="pl-pds">"</span></span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">""</span></span> <span class="pl-e">required</span>>
</code></pre><p>Create a new field:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">constraintValidationPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/constraint-validation<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">''</span></span> }, [<span class="pl-en">constraintValidationPlugin</span>()]);

<span class="pl-c">// Associate the DOM element with the field </span>
<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">ref</span>(<span class="pl-c1">document</span>.<span class="pl-c1">querySelector</span>(<span class="pl-s"><span class="pl-pds">'</span>input<span class="pl-pds">'</span></span>));
</code></pre><p>Check if field is invalid:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isInvalid</span> <span class="pl-c">// ⮕ true</span>

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">validity</span>.<span class="pl-smi">valueMissing</span> <span class="pl-c">// ⮕ true</span>
</code></pre><p>Show an error message balloon for the first invalid element that is associated with this field or any of its child fields:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-c1">reportValidity</span>();
</code></pre><p>Get the array of all invalid fields:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">getInvalidFields</span>();
<span class="pl-c">// ⮕ [field.at('hello')]</span>
</code></pre><p>Subscribe to the field validity changes:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>validityChanged<span class="pl-pds">'</span></span>) {
    <span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-smi">validity</span> <span class="pl-c">// ⮕ ValidityState</span>
  }
});
</code></pre><h1 id="errors-plugin"><a class="markdown-permalink" href="#errors-plugin"><span class="icon icon-link"></span></a>Errors plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_errors.html"><code>errorsPlugin</code></a> associates errors with fields:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">errorsPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/errors<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">errorsPlugin</span>()]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">addError</span>(<span class="pl-s"><span class="pl-pds">'</span>The world is not enough<span class="pl-pds">'</span></span>);
</code></pre><p>Read errors associated with the field:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">errors</span>;
<span class="pl-c">// ⮕ ['The world is not enough']</span>
</code></pre><p>Check that the field has associated errors:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isInvalid</span> <span class="pl-c">// ⮕ true</span>
</code></pre><p>Check that a field or any of its descendants have associated errors:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">getInvalidFields</span>();
<span class="pl-c">// ⮕ [field.at('hello')]</span>
</code></pre><p>Delete an error from the field:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">deleteError</span>(<span class="pl-s"><span class="pl-pds">'</span>The world is not enough<span class="pl-pds">'</span></span>);
</code></pre><p>Clear all errors from the field and its descendants:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">clearErrors</span>({ isRecursive: <span class="pl-c1">true</span> });
</code></pre><p>By default, the error type is <code>any</code>. To restrict type of errors that can be added to a field, provide it explicitly:</p><pre><code class="language-ts"><span class="pl-k">interface</span> <span class="pl-en">MyError</span> {
  <span class="pl-v">message</span><span class="pl-k">:</span> <span class="pl-c1">string</span>;
}

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [
  <span class="pl-en">errorsPlugin</span>&#x3C;<span class="pl-en">MyError</span>>()
]);

<span class="pl-smi">field</span>.<span class="pl-smi">errors</span> <span class="pl-c">// ⮕ MyError[]</span>
</code></pre><p>To have more control over how errors are added to a field, provide an error concatenator callback:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">errorsPlugin</span>, { <span class="pl-smi">ErrorsConcatenator</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/errors<span class="pl-pds">'</span></span>;

<span class="pl-k">interface</span> <span class="pl-en">MyError</span> {
  <span class="pl-v">message</span><span class="pl-k">:</span> <span class="pl-c1">string</span>;
}

<span class="pl-k">const</span> <span class="pl-en">concatMyErrors</span><span class="pl-k">:</span> <span class="pl-en">ErrorsConcatenator</span>&#x3C;<span class="pl-en">MyError</span>> <span class="pl-k">=</span> (<span class="pl-v">prevErrors</span>, <span class="pl-v">error</span>) <span class="pl-k">=></span> {
  <span class="pl-k">return</span> <span class="pl-smi">prevErrors</span>.<span class="pl-en">includes</span>(<span class="pl-smi">error</span>) <span class="pl-k">?</span> <span class="pl-smi">prevErrors</span> <span class="pl-k">:</span> [<span class="pl-k">...</span><span class="pl-smi">prevErrors</span>, <span class="pl-smi">error</span>];
};

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [
  <span class="pl-en">errorsPlugin</span>(<span class="pl-smi">concatMyErrors</span>)
]);
</code></pre><p>To add an error to field, you can publish an <a href="https://smikhalevski.github.io/roqueform/types/roqueform.FieldEventType.html"><code>errorCaught</code></a> event instead of calling the<a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_errors.ErrorsMixin.html#adderror"><code>addError</code></a> method:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">publish</span>({
  type: <span class="pl-s"><span class="pl-pds">'</span>errorCaught<span class="pl-pds">'</span></span>,
  target: <span class="pl-smi">field</span>,
  relatedTarget: <span class="pl-c1">null</span>,
  payload: <span class="pl-s"><span class="pl-pds">'</span>Ooops<span class="pl-pds">'</span></span>
});

<span class="pl-smi">field</span>.<span class="pl-smi">errors</span> <span class="pl-c">// ⮕ ['Oops']</span>
</code></pre><p>This is especially useful if you're developing a plugin that adds errors to fields but you don't want to couple with the errors plugin implementation.</p><p>Subscribe to error changes:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>errorAdded<span class="pl-pds">'</span></span>) {
    <span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-smi">errors</span> <span class="pl-c">// ⮕ MyError[]</span>
  }
});
</code></pre><h1 id="dom-element-reference-plugin"><a class="markdown-permalink" href="#dom-element-reference-plugin"><span class="icon icon-link"></span></a>DOM element reference plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_ref.html"><code>refPlugin</code></a> associates DOM elements with fields.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">refPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/ref<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">refPlugin</span>()]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">ref</span>(<span class="pl-c1">document</span>.<span class="pl-c1">querySelector</span>(<span class="pl-s"><span class="pl-pds">'</span>input<span class="pl-pds">'</span></span>));
</code></pre><p>Access an element associated with the field:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">element</span> <span class="pl-c">// ⮕ Element | null</span>
</code></pre><p>Focus and blur an element referenced by a field. If a field doesn't have an associated element this is a no-op.</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-c1">focus</span>();

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isFocused</span> <span class="pl-c">// ⮕ true</span>
</code></pre><p>Scroll to an element:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-c1">scrollIntoView</span>({ behavior: <span class="pl-s"><span class="pl-pds">'</span>smooth<span class="pl-pds">'</span></span> });
</code></pre><h1 id="reset-plugin"><a class="markdown-permalink" href="#reset-plugin"><span class="icon icon-link"></span></a>Reset plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_reset.html"><code>resetPlugin</code></a> enhances fields with methods that manage the initial value.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">resetPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/reset<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">resetPlugin</span>()]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">setValue</span>(<span class="pl-s"><span class="pl-pds">'</span>universe<span class="pl-pds">'</span></span>);

<span class="pl-smi">field</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ { hello: 'universe' }</span>

<span class="pl-smi">field</span>.<span class="pl-c1">reset</span>();

<span class="pl-c">// 🟡 The initial value was restored</span>
<span class="pl-smi">field</span>.<span class="pl-c1">value</span> <span class="pl-c">// ⮕ { hello: 'world' }</span>
</code></pre><p>Change the initial value of a field:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">setInitialValue</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>universe<span class="pl-pds">'</span></span> });

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">initialValue</span> <span class="pl-c">// ⮕ 'universe'</span>
</code></pre><p>The field is considered dirty when its value differs from the initial value. Values are compared using an equality checker function passed to the <a href="https://smikhalevski.github.io/roqueform/functions/plugin_reset.default.html"><code>resetPlugin</code></a>. By default, values are compared using <a href="https://github.com/epoberezkin/fast-deep-equal">fast-deep-equal</a>.</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">resetPlugin</span>()]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">setValue</span>(<span class="pl-s"><span class="pl-pds">'</span>universe<span class="pl-pds">'</span></span>);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isDirty</span> <span class="pl-c">// ⮕ true</span>

<span class="pl-smi">field</span>.<span class="pl-smi">isDirty</span> <span class="pl-c">// ⮕ true</span>
</code></pre><p>Get the array of all dirty fields:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">getDirtyFields</span>();
<span class="pl-c">// ⮕ [field, field.at('hello')]</span>
</code></pre><h1 id="scroll-to-an-error-plugin"><a class="markdown-permalink" href="#scroll-to-an-error-plugin"><span class="icon icon-link"></span></a>Scroll to an error plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_scroll-to-error.html"><code>scrollToErrorPlugin</code></a> enhances the field with methods to scroll to the closest invalid field.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">scrollToErrorPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/scroll-to-error<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">scrollToErrorPlugin</span>()]);

<span class="pl-c">// Associate a field with a DOM element</span>
<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">ref</span>(<span class="pl-c1">document</span>.<span class="pl-c1">querySelector</span>(<span class="pl-s"><span class="pl-pds">'</span>input<span class="pl-pds">'</span></span>));

<span class="pl-c">// Mark a field as invalid</span>
<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isInvalid</span> <span class="pl-k">=</span> <span class="pl-c1">true</span>;

<span class="pl-c">// Scroll to an invalid field</span>
<span class="pl-smi">field</span>.<span class="pl-en">scrollToError</span>();
<span class="pl-c">// ⮕ field.at('hello')</span>
</code></pre><p>This plugin works best in conjunction with the <a href="#errors-plugin"><code>errorsPlugin</code></a>. If the invalid field was associated with an element via <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_scroll-to-error.ScrollToErrorMixin.html#ref"><code>ref</code></a> than <code>scrollToError()</code> scrolls the viewport the reveal this element.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">errorsPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/errors<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">scrollToErrorPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/scroll-to-error<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [
  <span class="pl-en">errorsPlugin</span>(),
  <span class="pl-en">scrollToErrorPlugin</span>()
]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">ref</span>(<span class="pl-c1">document</span>.<span class="pl-c1">querySelector</span>(<span class="pl-s"><span class="pl-pds">'</span>input<span class="pl-pds">'</span></span>));

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">addError</span>(<span class="pl-s"><span class="pl-pds">'</span>Unknown world<span class="pl-pds">'</span></span>);

<span class="pl-smi">field</span>.<span class="pl-en">scrollToError</span>();
<span class="pl-c">// ⮕ field.at('hello')</span>
</code></pre><p>If there are multiple invalid fields, provide an index to scroll to a particular field:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ name: <span class="pl-s"><span class="pl-pds">'</span>X Æ A-12<span class="pl-pds">'</span></span>, age: <span class="pl-c1">5</span> }, [
  <span class="pl-en">errorsPlugin</span>(),
  <span class="pl-en">scrollToErrorPlugin</span>()
]);

<span class="pl-c">// Associate fields with DOM elements</span>
<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>).<span class="pl-en">ref</span>(<span class="pl-c1">document</span>.<span class="pl-c1">getElementById</span>(<span class="pl-s"><span class="pl-pds">'</span>#name<span class="pl-pds">'</span></span>));

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>age<span class="pl-pds">'</span></span>).<span class="pl-en">ref</span>(<span class="pl-c1">document</span>.<span class="pl-c1">getElementById</span>(<span class="pl-s"><span class="pl-pds">'</span>#age<span class="pl-pds">'</span></span>));

<span class="pl-c">// Add errors to fields</span>
<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>name<span class="pl-pds">'</span></span>).<span class="pl-en">addError</span>(<span class="pl-s"><span class="pl-pds">'</span>Too weird<span class="pl-pds">'</span></span>);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>age<span class="pl-pds">'</span></span>).<span class="pl-en">addError</span>(<span class="pl-s"><span class="pl-pds">'</span>Too young<span class="pl-pds">'</span></span>);

<span class="pl-c">// Scroll to the second field that contains an error</span>
<span class="pl-smi">field</span>.<span class="pl-en">scrollToError</span>(<span class="pl-c1">1</span>);
<span class="pl-c">// ⮕ field.at('age')</span>
</code></pre><h1 id="uncontrolled-plugin"><a class="markdown-permalink" href="#uncontrolled-plugin"><span class="icon icon-link"></span></a>Uncontrolled plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_uncontrolled.html"><code>uncontrolledPlugin</code></a> updates fields by listening to change events of associated DOM elements.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">uncontrolledPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/uncontrolled<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">uncontrolledPlugin</span>()]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">ref</span>(<span class="pl-c1">document</span>.<span class="pl-c1">querySelector</span>(<span class="pl-s"><span class="pl-pds">'</span>input<span class="pl-pds">'</span></span>));
</code></pre><p>The plugin would synchronize the field value with the value of an input element.</p><p>If you have a set of radio buttons, or checkboxes that update a single field, call <code>ref</code> multiple times providing each element. For example, let's use <code>uncontrolledPlugin</code> to manage an array of animal species:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">input</span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>checkbox<span class="pl-pds">"</span></span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">"</span>Elephant<span class="pl-pds">"</span></span>>
&#x3C;<span class="pl-ent">input</span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>checkbox<span class="pl-pds">"</span></span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">"</span>Monkey<span class="pl-pds">"</span></span>>
&#x3C;<span class="pl-ent">input</span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>checkbox<span class="pl-pds">"</span></span> <span class="pl-e">value</span>=<span class="pl-s"><span class="pl-pds">"</span>Zebra<span class="pl-pds">"</span></span>>
</code></pre><p>Create a field:</p><pre><code class="language-ts"><span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ animals: [<span class="pl-s"><span class="pl-pds">'</span>Zebra<span class="pl-pds">'</span></span>] }, [<span class="pl-en">uncontrolledPlugin</span>()]);
</code></pre><p>Associate all checkboxes with a field:</p><pre><code class="language-ts"><span class="pl-c1">document</span>
  .<span class="pl-c1">querySelectorAll</span>(<span class="pl-s"><span class="pl-pds">'</span>input[type="checkbox"]<span class="pl-pds">'</span></span>)
  .<span class="pl-c1">forEach</span>(<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>animals<span class="pl-pds">'</span></span>).<span class="pl-smi">ref</span>);
</code></pre><p>Right after checkboxes are associated, input with the value "Zebra" becomes checked. This happens because the <code>uncontrolledPlugin</code> updated the DOM to reflect the current state of the field.</p><p>If the user would check the "Elephant" value, then the field gets updated:</p><pre><code class="language-ts"><span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>animals<span class="pl-pds">'</span></span>).<span class="pl-c1">value</span> <span class="pl-c">// ⮕ ['Zebra', 'Elephant']</span>
</code></pre><h2 id="value-coercion"><a class="markdown-permalink" href="#value-coercion"><span class="icon icon-link"></span></a>Value coercion</h2><p>By default, <code>uncontrolledPlugin</code> uses the opinionated element value accessor that applies following coercion rules to values of form elements:</p><table><thead><tr><th>Elements</th><th>Value</th></tr></thead><tbody><tr><td>Single checkbox</td><td><code>boolean</code>, see <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_uncontrolled.ElementsValueAccessorOptions.html#checkboxformat"><code>checkboxFormat</code></a>.</td></tr><tr><td>Multiple checkboxes</td><td>An array of <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value"><code>value</code></a> attributes of checked checkboxes, see <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_uncontrolled.ElementsValueAccessorOptions.html#checkboxformat"><code>checkboxFormat</code></a>.</td></tr><tr><td>Radio buttons</td><td>The <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value"><code>value</code></a> attribute of a radio button that is checked or <code>null</code> if no radio buttons are checked.</td></tr><tr><td>Number input</td><td><code>number</code>, or <code>null</code> if empty.</td></tr><tr><td>Range input</td><td><code>number</code></td></tr><tr><td>Date input</td><td>The <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#value"><code>value</code></a> attribute, or <code>null</code> if empty, see <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_uncontrolled.ElementsValueAccessorOptions.html#dateformat"><code>dateFormat</code></a>.</td></tr><tr><td>Time input</td><td>A time string, or <code>null</code> if empty, see <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_uncontrolled.ElementsValueAccessorOptions.html#timeformat"><code>timeFormat</code></a>.</td></tr><tr><td>Image input</td><td>A string value of the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image#src"><code>value</code></a> attribute.</td></tr><tr><td>File input</td><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/File"><code>File</code></a> or <code>null</code> if no file selected, file inputs are read-only.</td></tr><tr><td>Multi-file input</td><td>An array of <a href="https://developer.mozilla.org/en-US/docs/Web/API/File"><code>File</code></a>.</td></tr><tr><td>Other</td><td>The <code>value</code> attribute, or <code>null</code> if element doesn't support it.</td></tr></tbody></table><p><code>null</code>, <code>undefined</code>, <code>NaN</code> and non-finite numbers are coerced to an empty string and written to <code>value</code> attribute.</p><p>To change how values are read from and written to DOM, provide a custom <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_uncontrolled.ElementsValueAccessor.html"><code>ElementsValueAccessor</code></a> implementation to a plugin, or use a <a href="https://smikhalevski.github.io/roqueform/functions/plugin_uncontrolled.createElementsValueAccessor.html"><code>createElementsValueAccessor</code></a> factory to customise the default behaviour:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">uncontrolledPlugin</span>, { <span class="pl-smi">createElementsValueAccessor</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/uncontrolled<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">myValueAccessor</span> <span class="pl-k">=</span> <span class="pl-en">createElementsValueAccessor</span>({
  dateFormat: <span class="pl-s"><span class="pl-pds">'</span>timestamp<span class="pl-pds">'</span></span>
});

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ date: <span class="pl-c1">Date</span>.<span class="pl-en">now</span>() }, [
  <span class="pl-en">uncontrolledPlugin</span>(<span class="pl-smi">myValueAccessor</span>)
]);
</code></pre><p>Read more about available options in <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_uncontrolled.ElementsValueAccessorOptions.html"><code>ElementsValueAccessorOptions</code></a>.</p><h1 id="validation-plugin"><a class="markdown-permalink" href="#validation-plugin"><span class="icon icon-link"></span></a>Validation plugin</h1><p><a href="https://smikhalevski.github.io/roqueform/modules/plugin_validation.html"><code>validationPlugin</code></a> enhances fields with validation methods.</p><div class="markdown-alert markdown-alert-tip"><p class="markdown-alert-title"><svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>Tip</p><p>This plugin provides a low-level functionality. Prefer <a href="#constraint-validation-api-plugin"><code>constraintValidationPlugin</code></a>, <a href="./packages/doubter-plugin"><code>doubterPlugin</code></a>, <a href="./packages/zod-plugin"><code>zodPlugin</code></a> or other high-level validation plugins.</p></div><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">validationPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/validation<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [
  <span class="pl-en">validationPlugin</span>({
    <span class="pl-en">validate</span>(<span class="pl-v">field</span>) {
      <span class="pl-k">if</span> (<span class="pl-smi">field</span>.<span class="pl-smi">key</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>) {
        <span class="pl-smi">field</span>.<span class="pl-smi">isInvalid</span> <span class="pl-k">=</span> <span class="pl-smi">field</span>.<span class="pl-c1">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span>;
      }
    }
  })
]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">validate</span>();

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isInvalid</span> <span class="pl-c">// ⮕ true</span>
</code></pre><p>The plugin takes a <a href="https://smikhalevski.github.io/roqueform/interfaces/plugin_validation.Validator.html"><code>Validator</code></a> that has <code>validate</code> and <code>validateAsync</code> methods. Both methods receive a field that must be validated and should update the <code>isInvalid</code> property of the field or any of its children when needed.</p><p>Validation plugin works best in conjunction with <a href="#errors-plugin">the errors plugin</a>. The latter would update <code>isInvalid</code> when an error is added or deleted:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">createField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">errorsPlugin</span>, { <span class="pl-smi">ErrorsMixin</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/errors<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">validationPlugin</span>, { <span class="pl-smi">Validator</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/validation<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">myValidator</span><span class="pl-k">:</span> <span class="pl-en">Validator</span>&#x3C;<span class="pl-c1">void</span>, <span class="pl-en">ErrorsMixin</span>> <span class="pl-k">=</span> {
  <span class="pl-en">validate</span>(<span class="pl-v">field</span>) {
    <span class="pl-k">if</span> (<span class="pl-smi">field</span>.<span class="pl-smi">key</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span> <span class="pl-k">&#x26;&#x26;</span> <span class="pl-smi">field</span>.<span class="pl-c1">value</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span>) {
      <span class="pl-smi">field</span>.<span class="pl-en">addError</span>(<span class="pl-s"><span class="pl-pds">'</span>The world is not enough<span class="pl-pds">'</span></span>);
    }
  }
};

<span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">createField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [
  <span class="pl-en">errorsPlugin</span>(),
  <span class="pl-en">validationPlugin</span>(<span class="pl-smi">myValidator</span>)
]);

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-en">validate</span>();

<span class="pl-smi">field</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>).<span class="pl-smi">isInvalid</span> <span class="pl-c">// ⮕ true</span>
</code></pre><h1 id="react-integration"><a class="markdown-permalink" href="#react-integration"><span class="icon icon-link"></span></a>React integration</h1><p>Roqueform has first-class React integration. To enable it, first install the integration package:</p><pre><code class="language-sh">npm install --save-prod @roqueform/react
</code></pre><p><a href="https://smikhalevski.github.io/roqueform/variables/_roqueform_react.useField.html"><code>useField</code></a> hook has the same set of signatures as <a href="https://smikhalevski.github.io/roqueform/functions/roqueform.createField.html"><code>createField</code></a>:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">FieldRenderer</span>, <span class="pl-smi">useField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@roqueform/react<span class="pl-pds">'</span></span>;

<span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">rootField</span> <span class="pl-k">=</span> <span class="pl-en">useField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> });

  <span class="pl-k">return</span> (
    &#x3C;<span class="pl-c1">FieldRenderer</span> <span class="pl-e">field</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">rootField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>)<span class="pl-pse">}</span>>
      <span class="pl-pse">{</span><span class="pl-v">helloField</span> <span class="pl-k">=></span> (
        &#x3C;<span class="pl-ent">input</span>
          <span class="pl-e">type</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">"</span>text<span class="pl-pds">"</span></span>
          <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">helloField</span>.<span class="pl-c1">value</span><span class="pl-pse">}</span>
          <span class="pl-e">onChange</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-v">event</span> <span class="pl-k">=></span> <span class="pl-smi">helloField</span>.<span class="pl-en">setValue</span>(<span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-c1">value</span>)<span class="pl-pse">}</span>
        />
      )<span class="pl-pse">}</span>
    &#x3C;/<span class="pl-c1">FieldRenderer</span>>
  );
}
</code></pre><p><code>useField</code> hook returns a <a href="https://smikhalevski.github.io/roqueform/types/roqueform.Field.html"><code>Field</code></a> instance that is preserved between re-renders. The <a href="https://smikhalevski.github.io/roqueform/functions/_roqueform_react.FieldRenderer.html"><code>&#x3C;FieldRenderer></code></a> component subscribes to the given field instance and re-renders children when an event is published by the field.</p><p>When a user updates the input value, the <code>rootField.at('hello')</code> value is set and <code>&#x3C;FieldRenderer></code> component is re-rendered.</p><p>If you pass a callback as an initial value, it would be invoked when the field is initialized.</p><pre><code class="language-ts"><span class="pl-en">useField</span>(() <span class="pl-k">=></span> <span class="pl-en">getInitialValue</span>());
</code></pre><p>Pass an array of plugins as the second argument of the <code>useField</code> hook:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">useField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@roqueform/react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> <span class="pl-smi">errorsPlugin</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>roqueform/plugin/errors<span class="pl-pds">'</span></span>;

<span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">field</span> <span class="pl-k">=</span> <span class="pl-en">useField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> }, [<span class="pl-en">errorsPlugin</span>()]);

  <span class="pl-en">useEffect</span>(() <span class="pl-k">=></span> {
    <span class="pl-smi">field</span>.<span class="pl-en">addError</span>(<span class="pl-s"><span class="pl-pds">'</span>The world is not enough<span class="pl-pds">'</span></span>);
  }, []);
}
</code></pre><h2 id="eager-and-lazy-re-renders"><a class="markdown-permalink" href="#eager-and-lazy-re-renders"><span class="icon icon-link"></span></a>Eager and lazy re-renders</h2><p>Let's consider the form with two <code>&#x3C;FieldRenderer></code> elements. One of them renders the value of the root field and the other one renders an input that updates the child field:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">FieldRenderer</span>, <span class="pl-smi">useField</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@roqueform/react<span class="pl-pds">'</span></span>;

<span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">App</span>() {
  <span class="pl-k">const</span> <span class="pl-c1">rootField</span> <span class="pl-k">=</span> <span class="pl-en">useField</span>({ hello: <span class="pl-s"><span class="pl-pds">'</span>world<span class="pl-pds">'</span></span> });

  <span class="pl-k">return</span> (
    &#x3C;>
      &#x3C;<span class="pl-c1">FieldRenderer</span> <span class="pl-e">field</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">rootField</span><span class="pl-pse">}</span>>
        <span class="pl-pse">{</span><span class="pl-v">field</span> <span class="pl-k">=></span> <span class="pl-c1">JSON</span>.<span class="pl-c1">stringify</span>(<span class="pl-smi">field</span>.<span class="pl-c1">value</span>)<span class="pl-pse">}</span>
      &#x3C;/<span class="pl-c1">FieldRenderer</span>>

      &#x3C;<span class="pl-c1">FieldRenderer</span> <span class="pl-e">field</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">rootField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>)<span class="pl-pse">}</span>>
        <span class="pl-pse">{</span><span class="pl-v">helloField</span> <span class="pl-k">=></span> (
          &#x3C;<span class="pl-ent">input</span>
            <span class="pl-e">type</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">"</span>text<span class="pl-pds">"</span></span>
            <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">helloField</span>.<span class="pl-c1">value</span><span class="pl-pse">}</span>
            <span class="pl-e">onChange</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-v">event</span> <span class="pl-k">=></span> <span class="pl-smi">helloField</span>.<span class="pl-en">setValue</span>(<span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-c1">value</span>)<span class="pl-pse">}</span>
          />
        )<span class="pl-pse">}</span>
      &#x3C;/<span class="pl-c1">FieldRenderer</span>>
    &#x3C;/>
  );
}
</code></pre><p>By default, <code>&#x3C;FieldRenderer></code> component re-renders only when the provided field was updated directly, so updates from ancestors or child fields would be ignored. So when user edits the input value, <code>JSON.stringify</code> won't be re-rendered.</p><p>Add the <a href="https://smikhalevski.github.io/roqueform/interfaces/_roqueform_react.FieldSubscriptionOptions.html#iseagerlyupdated"><code>isEagerlyUpdated</code></a> property to force <code>&#x3C;FieldRenderer></code> to re-render whenever its value was affected.</p><pre><code class="language-diff"><span class="pl-md">- &#x3C;FieldRenderer field={rootField}></span>
<span class="pl-mi1">+ &#x3C;FieldRenderer</span>
<span class="pl-mi1">+   field={rootField}</span>
<span class="pl-mi1">+   isEagerlyUpdated={true}</span>
<span class="pl-mi1">+ ></span>
    {field => JSON.stringify(field.value)}
  &#x3C;/FieldRenderer>
</code></pre><p>Now both fields are re-rendered when user edits the input text.</p><h2 id="reacting-to-changes"><a class="markdown-permalink" href="#reacting-to-changes"><span class="icon icon-link"></span></a>Reacting to changes</h2><p>Use the <a href="https://smikhalevski.github.io/roqueform/interfaces/_roqueform_react.FieldSubscriptionOptions.html#onchange"><code>onChange</code></a> handler that is triggered only when the field value was updated <a href="#transient-updates">non-transiently</a>.</p><pre><code class="language-tsx">&#x3C;<span class="pl-c1">FieldRenderer</span>
  <span class="pl-e">field</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">rootField</span>.<span class="pl-en">at</span>(<span class="pl-s"><span class="pl-pds">'</span>hello<span class="pl-pds">'</span></span>)<span class="pl-pse">}</span>
  <span class="pl-e">onChange</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-v">value</span> <span class="pl-k">=></span> {
    <span class="pl-c">// Handle the non-transient name changes</span>
  }<span class="pl-pse">}</span>
>
  <span class="pl-pse">{</span><span class="pl-v">helloField</span> <span class="pl-k">=></span> (
    &#x3C;<span class="pl-ent">input</span>
      <span class="pl-e">type</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">"</span>text<span class="pl-pds">"</span></span>
      <span class="pl-e">value</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">helloField</span>.<span class="pl-c1">value</span><span class="pl-pse">}</span>
      <span class="pl-e">onChange</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-v">event</span> <span class="pl-k">=></span> <span class="pl-smi">helloField</span>.<span class="pl-en">setTransientValue</span>(<span class="pl-c1">event</span>.<span class="pl-c1">target</span>.<span class="pl-c1">value</span>)<span class="pl-pse">}</span>
      <span class="pl-e">onBlur</span><span class="pl-k">=</span><span class="pl-pse">{</span><span class="pl-smi">field</span>.<span class="pl-smi">flushTransient</span><span class="pl-pse">}</span>
    />
  )<span class="pl-pse">}</span>
&#x3C;/<span class="pl-c1">FieldRenderer</span>>
</code></pre><h1 id="motivation"><a class="markdown-permalink" href="#motivation"><span class="icon icon-link"></span></a>Motivation</h1><p>Roqueform was built to satisfy the following requirements:</p><ul><li><p>Since the form lifecycle consists of separate phases (input, validate, display errors, and submit), the form state management library should allow to tap in (or at least not constrain the ability to do so) at any particular phase to tweak the data flow.</p></li><li><p>Form data should be statically and strictly typed up to the very field value setter. So there must be a compilation error if the string value from the silly input is assigned to the number-typed value in the form state object.</p></li><li><p><strong>Use the platform!</strong> The form state management library must not constrain the use of the <code>form</code> submit behavior, browser-based validation, and other related native features.</p></li><li><p>There should be no restrictions on how and when the form input is submitted because data submission is generally an application-specific process.</p></li><li><p>There are many approaches to validation, and a great number of awesome validation libraries. The form library must be agnostic to where (client-side, server-side, or both), how (on a field or on a form level), and when (sync, or async) the validation is handled.</p></li><li><p>Validation errors aren't standardized, so an arbitrary error object shape must be allowed and related typings must be seamlessly propagated to the error consumers/renderers.</p></li><li><p>The library API must be simple and easily extensible.</p></li></ul>`};function d(){return s.createElement(l,{logo:s.createElement("div",{style:{...n(p,a),aspectRatio:1500/270,backgroundRepeat:"no-repeat",backgroundSize:"contain",maxWidth:"100%",width:"20rem"},title:"Roqueform"}),readme:e})}export{d as default};
