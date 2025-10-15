import{b as s}from"./DIaAX4nc.js";import{k as a,l as p}from"./C6LcZyl8.js";import{R as n,c as e}from"./BTiumDKU.js";import{l}from"./CC7dmO7A.js";import"./CnNc2VmE.js";const c={version:"1.10.1",tocContent:'<ul><li><a href="/racehorse.md">View as Markdown</a></li><li><a href="https://github.com/smikhalevski/racehorse#readme">GitHub <sup>↗</sup></a></li><li><a href="https://smikhalevski.github.io/racehorse/">API docs <sup>↗</sup></a></li></ul><p><span class="toc-icon">🚀 </span><strong>Features</strong></p><ul><li><a href="#overview">Overview</a></li><li><a href="#example-app">Example app</a></li><li><a href="#request-response-event-chains">Request-response event chains</a></li><li><a href="#event-subscriptions">Event subscriptions</a></li><li><a href="#webview-events">WebView events</a></li><li><a href="#check-supported-events">Check supported events</a></li><li><a href="#proguard">Proguard</a></li></ul><p><span class="toc-icon">🔌 </span><strong>Plugins</strong></p><ul><li><a href="#activity-plugin">Activity</a></li><li><a href="#asset-loader-plugin">Asset loader</a></li><li><a href="#biometric-plugin">Biometric</a></li><li><a href="#biometric-encrypted-storage-plugin">Biometric encrypted storage</a></li><li><a href="#contacts-plugin">Contacts</a></li><li><a href="#deep-link-plugin">Deep link</a></li><li><a href="#device-plugin">Device</a></li><li><a href="#download-plugin">Downloads</a></li><li><a href="#encrypted-storage-plugin">Encrypted storage</a></li><li><a href="#evergreen-plugin">Evergreen</a></li><li><a href="#facebook-login-plugin">Facebook Login</a></li><li><a href="#facebook-share-plugin">Facebook Share</a></li><li><a href="#file-chooser-plugin">File chooser</a></li><li><a href="#file-system-plugin">File system</a></li><li><a href="#google-pay-plugin">Google Pay</a></li><li><a href="#google-play-referrer-plugin">Google Play referrer</a></li><li><a href="#google-sign-in-plugin">Google Sign-In</a></li><li><a href="#https-plugin">HTTPS</a></li><li><a href="#keyboard-plugin">Keyboard</a></li><li><a href="#network-plugin">Network</a></li><li><a href="#notifications-plugin">Notifications</a></li><li><a href="#permissions-plugin">Permissions</a></li></ul><p><span class="toc-icon">🍪 </span><strong>Cookbook</strong></p><ul><li><a href="#blur-preview-on-recent-apps-screen">Blur preview on recent apps screen</a></li></ul>',articleContent:`<p>The bootstrapper for WebView-based Android apps.</p><ul><li>Kotlin and TypeScript first.</li><li>Plugin-based architecture.</li><li>Can be integrated into any Android 28+ app.</li><li>Enables <a href="#evergreen-plugin">app auto updates</a> without Google Play releases.</li><li>First-class React support.</li><li>Check out the <a href="#example-app">example app</a> and the <a href="#cookbook">Cookbook</a>!</li></ul><br><pre><code class="language-sh">npm install --save-prod racehorse
</code></pre><br><h1 id="overview"><a class="markdown-permalink" href="#overview"><span class="icon icon-link"></span></a>Overview</h1><p>Racehorse is the pluggable bridge that marshals events between the web app and the native Android app. To showcase how Racehorse works, let's create a plugin that would display <a href="https://developer.android.com/guide/topics/ui/notifiers/toasts">an Android-native toast <sup>↗</sup></a> when the web app requests it.</p><p>Let's start by adding required Racehorse dependencies. In your <code>app/build.gradle.kts</code> add:</p><pre><code class="language-kotlin">plugins {
    id(<span class="pl-s"><span class="pl-pds">"</span>org.jetbrains.kotlin.plugin.serialization<span class="pl-pds">"</span></span>)
}

dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>org.racehorse:racehorse:1.10.1<span class="pl-pds">"</span></span>)
    implementation(<span class="pl-s"><span class="pl-pds">"</span>org.greenrobot:eventbus:3.3.1<span class="pl-pds">"</span></span>)
    implementation(<span class="pl-s"><span class="pl-pds">"</span>org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.3<span class="pl-pds">"</span></span>)
}
</code></pre><p>In root-level <code>build.gradle.kts</code> add:</p><pre><code class="language-kotlin">plugins {
    id(<span class="pl-s"><span class="pl-pds">"</span>org.jetbrains.kotlin.plugin.serialization<span class="pl-pds">"</span></span>)
}
</code></pre><p>Install web dependencies:</p><pre><code class="language-shell">npm install racehorce
</code></pre><p>If you're planning to use React, consider a Racehorse React integration package:</p><pre><code class="language-shell">npm install @racehorse/react
</code></pre><p>In Android app, create a WebView:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">android.webkit.WebView</span>

<span class="pl-k">val</span> webView <span class="pl-k">=</span> <span class="pl-en">WebView</span>(activity)
<span class="pl-c">// or</span>
<span class="pl-c">// val webView = activity.findViewById&#x3C;WebView>(R.id.web_view)</span>
</code></pre><p>Create an <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-event-bridge/index.html"><code>EventBridge</code> <sup>↗</sup></a> instance that would be responsible for event marshalling:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.EventBridge</span>

<span class="pl-k">val</span> eventBridge <span class="pl-k">=</span> <span class="pl-en">EventBridge</span>(webView).<span class="pl-c1">apply</span> { enable() }
</code></pre><p>Racehorse uses a <a href="https://greenrobot.org/eventbus">Greenrobot EventBus <sup>↗</sup></a> to deliver events to subscribers, so bridge must be registered in the event bus:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.greenrobot.eventbus.EventBus</span>

<span class="pl-en">EventBus</span>.getDefault().register(eventBridge)
</code></pre><p>Here's an event that is posted from the web to Android through the bridge:</p><pre><code class="language-kotlin"><span class="pl-k">package</span> <span class="pl-en">com.example</span>

<span class="pl-k">import</span> <span class="pl-smi">kotlinx.serialization.Serializable</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.WebEvent</span>

@Serializable
<span class="pl-k">class</span> <span class="pl-en">ShowToastEvent</span>(<span class="pl-k">val</span> <span class="pl-smi">message</span><span class="pl-k">:</span> <span class="pl-c1">String</span>) : WebEvent
</code></pre><p>Note that <code>ShowToastEvent</code> implements <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-web-event/index.html"><code>WebEvent</code> <sup>↗</sup></a> marker interface. This is the baseline requirement to which events must conform to support marshalling from the web app to Android.</p><p>Now let's add an event subscriber that would receive incoming <code>ShowToastEvent</code> and display a toast:</p><pre><code class="language-kotlin"><span class="pl-k">package</span> <span class="pl-en">com.example</span>

<span class="pl-k">import</span> <span class="pl-smi">android.content.Context</span>
<span class="pl-k">import</span> <span class="pl-smi">android.widget.Toast</span>
<span class="pl-k">import</span> <span class="pl-smi">org.greenrobot.eventbus.Subscribe</span>

<span class="pl-k">class</span> <span class="pl-en">ToastPlugin</span>(<span class="pl-k">val</span> <span class="pl-smi">context</span><span class="pl-k">:</span> <span class="pl-en">Context</span>) {

    @Subscribe
    <span class="pl-k">fun</span> <span class="pl-en">onShowToast</span>(<span class="pl-smi">event</span><span class="pl-k">:</span> <span class="pl-en">ShowToastEvent</span>) {
        <span class="pl-en">Toast</span>.makeText(context, event.message, <span class="pl-en">Toast</span>.<span class="pl-en">LENGTH_SHORT</span>).show()
    }
}
</code></pre><p>Register <code>ToastPlugin</code> in the event bus, so to enable event subscriptions:</p><pre><code class="language-kotlin"><span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">ToastPlugin</span>(activity))
</code></pre><p>Now the native part is set up, and we can send an event from the web app:</p><pre><code class="language-js"><span class="pl-k">import</span> { <span class="pl-smi">eventBridge</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">eventBridge</span>.<span class="pl-en">requestAsync</span>({
  <span class="pl-c">// 🟡 The event class name</span>
  type<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>com.example.ShowToastEvent<span class="pl-pds">'</span></span>,
  payload<span class="pl-k">:</span> {
    message<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>Hello, world!<span class="pl-pds">'</span></span>,
  },
});
</code></pre><p>The last step is to load the web app into the WebView. You can do this in any way that fits your needs, Racehorse doesn't restrict this process in any way. For example, if your web app is running on your local machine on the port 1234, then you can load the web app in the WebView using this snippet:</p><pre><code class="language-kotlin">webView.loadUrl(<span class="pl-s"><span class="pl-pds">"</span>https://10.0.2.2:1234<span class="pl-pds">"</span></span>)
</code></pre><h1 id="example-app"><a class="markdown-permalink" href="#example-app"><span class="icon icon-link"></span></a>Example app</h1><p>The example app consists of two parts: <a href="https://github.com/smikhalevski/racehorse/tree/master/web/example">the web app</a> and <a href="https://github.com/smikhalevski/racehorse/tree/master/android/example">the Android app</a>. To launch the app in the emulator follow the steps below.</p><p>Clone this repo:</p><pre><code class="language-shell">git clone git@github.com:smikhalevski/racehorse.git
<span class="pl-c1">cd</span> racehorse
</code></pre><p>Install packages and build Racehorse packages and the example app:</p><pre><code class="language-shell">npm ci
npm run build
</code></pre><p>Start the web server that would serve the app for the debug build:</p><pre><code class="language-shell"><span class="pl-c1">cd</span> web/example
npm start
</code></pre><p>Open <code>&#x3C;racehorse>/android</code> in Android Studio and run <code>example</code> app.</p><h1 id="request-response-event-chains"><a class="markdown-permalink" href="#request-response-event-chains"><span class="icon icon-link"></span></a>Request-response event chains</h1><p>In the <a href="#overview">Overview</a> section we used an event that extends a <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-web-event/index.html"><code>WebEvent</code> <sup>↗</sup></a> interface. Such events don't imply the response. To create a request-response chain at least two events are required:</p><pre><code class="language-kotlin"><span class="pl-k">package</span> <span class="pl-en">com.example</span>

<span class="pl-k">import</span> <span class="pl-smi">android.os.Build</span>
<span class="pl-k">import</span> <span class="pl-smi">org.greenrobot.eventbus.Subscribe</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.RequestEvent</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.ResponseEvent</span>

<span class="pl-k">class</span> <span class="pl-en">GetDeviceModelRequestEvent</span> : <span class="pl-en">RequestEvent</span>()

<span class="pl-k">class</span> <span class="pl-en">GetDeviceModelResponseEvent</span>(<span class="pl-k">val</span> <span class="pl-smi">deviceModel</span><span class="pl-k">:</span> <span class="pl-c1">String</span>) : ResponseEvent()

<span class="pl-k">class</span> <span class="pl-en">DeviceModelPlugin</span> {

    @Subscribe
    <span class="pl-k">fun</span> <span class="pl-en">onGetDeviceModel</span>(<span class="pl-smi">event</span><span class="pl-k">:</span> <span class="pl-en">GetDeviceModelRequestEvent</span>) {
        event.respond(<span class="pl-en">GetDeviceModelResponseEvent</span>(<span class="pl-en">Build</span>.<span class="pl-en">MODEL</span>))
    }
}
</code></pre><p>Request and response events are instances of <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-chainable-event/index.html"><code>ChainableEvent</code> <sup>↗</sup></a>. Events in the chain share the same <code>requestId</code>. When a <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-response-event/index.html"><code>ResponseEvent</code> <sup>↗</sup></a> is posted to the event bus it is marshalled to the web app and resolves a promise returned from the <a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.EventBridge.html#requestasync"><code>eventBridge.requestAsync</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">eventBridge</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">deviceModel</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">eventBridge</span>
  .<span class="pl-en">requestAsync</span>({ type: <span class="pl-s"><span class="pl-pds">'</span>com.example.GetDeviceModelRequestEvent<span class="pl-pds">'</span></span> })
  .<span class="pl-c1">then</span>(<span class="pl-v">event</span> <span class="pl-k">=></span> <span class="pl-c1">event</span>.<span class="pl-smi">payload</span>.<span class="pl-smi">deviceModel</span>);
</code></pre><p>If an exception is thrown in <code>DeviceModelPlugin.onGetDeviceModel</code>, then promise is <em>rejected</em> with an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error"><code>Error</code> <sup>↗</sup></a> instance.</p><h2 id="synchronous-requests"><a class="markdown-permalink" href="#synchronous-requests"><span class="icon icon-link"></span></a>Synchronous requests</h2><p>If all events in the event chain are handled on <a href="https://greenrobot.org/eventbus/documentation/delivery-threads-threadmode/">the posting thread <sup>↗</sup></a> on the Android side, then a request can be handled synchronously on the web side. In the <code>DeviceModelPlugin</code> example <code>onGetDeviceModel</code> is called on the posting thread, since we didn't specify a thread mode for <a href="https://github.com/greenrobot/EventBus#eventbus-in-3-steps"><code>@Subscribe</code> <sup>↗</sup></a> annotation. So this allows web to perform a synchronous request:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">eventBridge</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> { <span class="pl-c1">deviceModel</span> } <span class="pl-k">=</span> <span class="pl-smi">eventBridge</span>.<span class="pl-en">request</span>({ type: <span class="pl-s"><span class="pl-pds">'</span>com.example.GetDeviceModelRequestEvent<span class="pl-pds">'</span></span> }).<span class="pl-smi">payload</span>;
</code></pre><p>If your app initializes an event bridge after the WebView was created, you may need to establish the connection manually before using synchronous requests:</p><pre><code class="language-ts"><span class="pl-k">await</span> <span class="pl-smi">eventBridge</span>.<span class="pl-en">connect</span>();
</code></pre><h1 id="event-subscriptions"><a class="markdown-permalink" href="#event-subscriptions"><span class="icon icon-link"></span></a>Event subscriptions</h1><p>While the web app can post a request event to the Android, it is frequently required that the Android would post an event to the web app without an explicit request. This can be achieved using subscriptions.</p><p>Let's define an event that the Android can post to the web:</p><pre><code class="language-kotlin"><span class="pl-k">package</span> <span class="pl-en">com.example</span>

<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.NoticeEvent</span>

<span class="pl-k">class</span> <span class="pl-en">BatteryLowEvent</span> : <span class="pl-en">NoticeEvent</span>
</code></pre><p>To receive this event in the web app, add a listener:</p><pre><code class="language-js"><span class="pl-k">import</span> { <span class="pl-smi">eventBridge</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">eventBridge</span>.<span class="pl-en">subscribe</span>(<span class="pl-smi">event</span> <span class="pl-k">=></span> {
  <span class="pl-k">if</span> (<span class="pl-c1">event</span>.<span class="pl-c1">type</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>com.example.BatteryLowEvent<span class="pl-pds">'</span></span>) {
    <span class="pl-c">// Handle the event here</span>
  }
});
</code></pre><p>To subscribe to an event of the given type, you can use a shortcut:</p><pre><code class="language-js"><span class="pl-k">import</span> { <span class="pl-smi">eventBridge</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">eventBridge</span>.<span class="pl-en">subscribe</span>(<span class="pl-s"><span class="pl-pds">'</span>com.example.BatteryLowEvent<span class="pl-pds">'</span></span>, <span class="pl-smi">payload</span> <span class="pl-k">=></span> {
  <span class="pl-c">// Handle the event payload here</span>
});
</code></pre><p>If you have <a href="#overview">an <code>EventBridge</code> registered</a> in the event bus, then you can post <code>BatteryLowEvent</code> event from anywhere in your Android app, and it would be delivered to a subscriber in the web app:</p><pre><code class="language-kotlin"><span class="pl-en">EventBus</span>.getDefault().post(<span class="pl-en">BatteryLowEvent</span>())
</code></pre><h1 id="webview-events"><a class="markdown-permalink" href="#webview-events"><span class="icon icon-link"></span></a>WebView events</h1><p>Racehorse provides clients for the WebView which post WebView-related events to the event bus, so you can subscribe to them in your plugins. To init clients just set them to the WebView instance:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.webview.RacehorseWebChromeClient</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.webview.RacehorseWebViewClient</span>

webView.webChromeClient <span class="pl-k">=</span> <span class="pl-en">RacehorseWebChromeClient</span>()
webView.webViewClient <span class="pl-k">=</span> <span class="pl-en">RacehorseWebViewClient</span>()
</code></pre><p>Now you can subscribe to <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse.webview/index.html">all events that a WebView instance posts <sup>↗</sup></a>:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.greenrobot.eventbus.Subscribe</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.webview.ConsoleMessageEvent</span>

<span class="pl-k">class</span> <span class="pl-en">MyPlugin</span> {

    @Subscribe
    <span class="pl-k">fun</span> <span class="pl-en">onConsoleMessage</span>(<span class="pl-smi">event</span><span class="pl-k">:</span> <span class="pl-en">ConsoleMessageEvent</span>) {
        <span class="pl-c">// Handle the event here</span>
    }
}

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">MyPlugin</span>())
</code></pre><h1 id="check-supported-events"><a class="markdown-permalink" href="#check-supported-events"><span class="icon icon-link"></span></a>Check supported events</h1><p>The web app can check that the event in supported by the Android binary. For example, to check that the app supports GooglePay card tokenization, you can use:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">eventBridge</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">eventBridge</span>.<span class="pl-en">isSupported</span>(<span class="pl-s"><span class="pl-pds">'</span>org.racehorse.GooglePayTokenizeEvent<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>
</code></pre><h1 id="proguard"><a class="markdown-permalink" href="#proguard"><span class="icon icon-link"></span></a>Proguard</h1><p><code>org.racehorse:racehorse</code> is an Android library (AAR) that provides its own <a href="https://github.com/smikhalevski/racehorse/tree/master/android/racehorse/proguard-rules.pro">proguard rules</a>, so no additional action is needed. Proguard rules prevent obfuscation of events and related classes which are available in Racehorse.</p><p>For example, this class and its members won't be minified:</p><pre><code class="language-kotlin"><span class="pl-k">class</span> <span class="pl-en">ShowToastEvent</span>(<span class="pl-k">val</span> <span class="pl-smi">message</span><span class="pl-k">:</span> <span class="pl-c1">String</span>) : WebEvent
</code></pre><h1 id="activity-plugin"><a class="markdown-permalink" href="#activity-plugin"><span class="icon icon-link"></span></a>Activity plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.ActivityManager.html"><code>ActivityManager</code> <sup>↗</sup></a> starts activities and provides info about the activity that renders the WebView.</p><p>Add Lifecycle dependency to your Android app:</p><pre><code class="language-kotlin">dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>androidx.lifecycle:lifecycle-process:2.8.5<span class="pl-pds">"</span></span>)
}
</code></pre><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.ActivityPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">ActivityPlugin</span>().<span class="pl-c1">apply</span> { enable() })
</code></pre><p>Start a new activity. For example, here's how to open Settings app and navigate user to the notification settings:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">activityManager</span>, <span class="pl-smi">Intent</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">activityManager</span>.<span class="pl-en">startActivity</span>({
  action: <span class="pl-s"><span class="pl-pds">'</span>android.settings.APP_NOTIFICATION_SETTINGS<span class="pl-pds">'</span></span>,
  flags: <span class="pl-smi">Intent</span>.<span class="pl-c1">FLAG_ACTIVITY_NEW_TASK</span>,
  extras: {
    <span class="pl-s"><span class="pl-pds">'</span>android.provider.extra.APP_PACKAGE<span class="pl-pds">'</span></span>: <span class="pl-smi">activityManager</span>.<span class="pl-en">getActivityInfo</span>().<span class="pl-smi">packageName</span>,
  },
});
</code></pre><p>Synchronously read the status of the current activity or subscribe to its changes:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">activityManager</span>, <span class="pl-smi">ActivityState</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">activityManager</span>.<span class="pl-en">getActivityState</span>();
<span class="pl-c">// ⮕ ActivityState.BACKGROUND</span>

<span class="pl-smi">activityManager</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">state</span> <span class="pl-k">=></span> {
  <span class="pl-c">// React to activity state changes</span>
});

<span class="pl-smi">activityManager</span>.<span class="pl-en">subscribe</span>(<span class="pl-s"><span class="pl-pds">'</span>foreground<span class="pl-pds">'</span></span>, () <span class="pl-k">=></span> {
  <span class="pl-c">// React to activity entering foreground</span>
});
</code></pre><p>If you are using React, then refer to <a href="https://smikhalevski.github.io/racehorse/functions/_racehorse_react.useActivityState.html"><code>useActivityState</code> <sup>↗</sup></a> hook that re-renders a component when activity state changes.</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useActivityState</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@racehorse/react<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">state</span> <span class="pl-k">=</span> <span class="pl-en">useActivityState</span>();
<span class="pl-c">// ⮕ ActivityState.BACKGROUND</span>
</code></pre><h1 id="asset-loader-plugin"><a class="markdown-permalink" href="#asset-loader-plugin"><span class="icon icon-link"></span></a>Asset loader plugin</h1><p>Asset loader plugin requires <a href="#webview-events">WebView events</a> to be enabled.</p><p>Add the WebKit dependency:</p><pre><code class="language-kotlin">dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>androidx.webkit:webkit:1.11.0<span class="pl-pds">"</span></span>)
}
</code></pre><p>Load the static assets from a directory on the device when a particular URL is requested in the WebView:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">androidx.webkit.WebViewAssetLoader</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.AssetLoaderPlugin</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.StaticPathHandler</span>

<span class="pl-en">EventBus</span>.getDefault().register(
    <span class="pl-en">AssetLoaderPlugin</span>(activity).<span class="pl-c1">apply</span> {
        registerAssetLoader(
            <span class="pl-s"><span class="pl-pds">"</span>https://example.com<span class="pl-pds">"</span></span>,
            <span class="pl-en">StaticPathHandler</span>(<span class="pl-en">File</span>(activity.filesDir, <span class="pl-s"><span class="pl-pds">"</span>www<span class="pl-pds">"</span></span>))
        )
    }
)

webView.loadUrl(<span class="pl-s"><span class="pl-pds">"</span>https://example.com<span class="pl-pds">"</span></span>)
</code></pre><p>During development, if you're running a server on localhost, use <code>ProxyPathHandler</code> to serve contents to the webview:</p><pre><code class="language-kotlin"><span class="pl-en">AssetLoaderPlugin</span>(activity).<span class="pl-c1">apply</span> {
    registerAssetLoader(
        <span class="pl-s"><span class="pl-pds">"</span>https://example.com<span class="pl-pds">"</span></span>,
        <span class="pl-en">ProxyPathHandler</span>(<span class="pl-s"><span class="pl-pds">"</span>http://10.0.2.2:10001<span class="pl-pds">"</span></span>)
    )
}
</code></pre><p><code>AssetLoaderPlugin</code> would open URL in an external browser app it isn't handled by any of registered asset loaders. Since in the example above only <a href="https://example.com">https://example.com</a> is handled by the asset loader, all other URLs are opened externally:</p><pre><code class="language-js"><span class="pl-c">// This would open a browser app and load google.com</span>
<span class="pl-c1">window</span>.<span class="pl-c1">location</span>.<span class="pl-c1">href</span> <span class="pl-k">=</span> <span class="pl-s"><span class="pl-pds">'</span>https://google.com<span class="pl-pds">'</span></span>;
</code></pre><p>To disable this behaviour:</p><pre><code class="language-kotlin"><span class="pl-en">AssetLoaderPlugin</span>(activity).<span class="pl-c1">apply</span> {
    isUnhandledRequestOpenedInExternalBrowser <span class="pl-k">=</span> <span class="pl-c1">false</span>
}
</code></pre><h1 id="biometric-plugin"><a class="markdown-permalink" href="#biometric-plugin"><span class="icon icon-link"></span></a>Biometric plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.BiometricManager.html"><code>BiometricManager</code> <sup>↗</sup></a> provides the status of biometric support and allows to enroll for biometric auth.</p><p>Add <a href="https://developer.android.com/jetpack/androidx/releases/biometric#declaring_dependencies">Biometric <sup>↗</sup></a> dependency to your Android app:</p><pre><code class="language-kotlin">dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>androidx.biometric:biometric:1.2.0-alpha05<span class="pl-pds">"</span></span>)
}
</code></pre><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.BiometricPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">BiometricPlugin</span>(activity))
</code></pre><p>Read the biometric status or enroll biometric:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">biometricManager</span>, <span class="pl-smi">BiometricAuthenticator</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">biometricManager</span>.<span class="pl-en">getBiometricStatus</span>([<span class="pl-smi">BiometricAuthenticator</span>.<span class="pl-c1">BIOMETRIC_WEAK</span>]);
<span class="pl-c">// ⮕ BiometricStatus.NONE_ENROLLED</span>

<span class="pl-smi">biometricManager</span>.<span class="pl-en">enrollBiometric</span>();
<span class="pl-c">// ⮕ Promise&#x3C;boolean></span>
</code></pre><h1 id="biometric-encrypted-storage-plugin"><a class="markdown-permalink" href="#biometric-encrypted-storage-plugin"><span class="icon icon-link"></span></a>Biometric encrypted storage plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.BiometricEncryptedStorageManager.html"><code>BiometricEncryptedStorageManager</code> <sup>↗</sup></a> enables a file-based persistence of a biometric-protected data.</p><p>Add <a href="https://developer.android.com/jetpack/androidx/releases/biometric#declaring_dependencies">Biometric <sup>↗</sup></a> dependency to your Android app:</p><pre><code class="language-kotlin">dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>androidx.biometric:biometric:1.2.0-alpha05<span class="pl-pds">"</span></span>)
}
</code></pre><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.BiometricEncryptedStoragePlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(
    <span class="pl-en">BiometricEncryptedStoragePlugin</span>(
        activity,

        <span class="pl-c">// The directory where encrypted data is stored</span>
        <span class="pl-en">File</span>(activity.filesDir, <span class="pl-s"><span class="pl-pds">"</span>biometric_storage<span class="pl-pds">"</span></span>)
    )
)
</code></pre><p>Read and write encrypted key-value pairs to the storage:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">biometricEncryptedStorageManager</span>, <span class="pl-smi">BiometricAuthenticator</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-k">await</span> <span class="pl-smi">biometricEncryptedStorageManager</span>.<span class="pl-c1">set</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>, {
  title: <span class="pl-s"><span class="pl-pds">'</span>Authentication required<span class="pl-pds">'</span></span>,
  authenticators: [<span class="pl-smi">BiometricAuthenticator</span>.<span class="pl-c1">BIOMETRIC_STRONG</span>],
});
<span class="pl-c">// ⮕ true</span>

<span class="pl-k">await</span> <span class="pl-smi">biometricEncryptedStorageManager</span>.<span class="pl-c1">get</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ 'bar'</span>
</code></pre><p>To allow device credential authentication, provide <a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.BiometricConfig.html#authenticationvalidityduration"><code>authenticationValidityDuration</code> <sup>↗</sup></a> that is greater or equal to 0:</p><pre><code class="language-ts"><span class="pl-k">await</span> <span class="pl-smi">biometricEncryptedStorageManager</span>.<span class="pl-c1">set</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>, {
  authenticators: [<span class="pl-smi">BiometricAuthenticator</span>.<span class="pl-c1">DEVICE_CREDENTIAL</span>],
  authenticationValidityDuration: <span class="pl-c1">0</span>,
});
</code></pre><p>If user enrolls biometric auth (for example, updates fingerprints stored on the device), then all secret keys used by the biometric-encrypted storage are invalidated and values become inaccessible.</p><pre><code class="language-js"><span class="pl-k">if</span> (<span class="pl-smi">biometricEncryptedStorageManager</span>.<span class="pl-c1">has</span>(key)) {
  <span class="pl-c">// Storage contains the key</span>

  <span class="pl-smi">biometricEncryptedStorageManager</span>.<span class="pl-c1">get</span>(key).<span class="pl-c1">then</span>(
    <span class="pl-smi">value</span> <span class="pl-k">=></span> {
      <span class="pl-k">if</span> (value <span class="pl-k">!==</span> <span class="pl-c1">null</span>) {
        <span class="pl-c">// The value was successfully decrypted</span>
      } <span class="pl-k">else</span> {
        <span class="pl-c">// User authentication failed</span>
      }
    },
    <span class="pl-smi">error</span> <span class="pl-k">=></span> {
      <span class="pl-k">if</span> (<span class="pl-smi">error</span>.<span class="pl-c1">name</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>KeyPermanentlyInvalidatedException<span class="pl-pds">'</span></span>) {
        <span class="pl-c">// Key was invaildated and cannot be decrypted anymore</span>
        <span class="pl-smi">biometricEncryptedStorageManager</span>.<span class="pl-c1">delete</span>(key);
      }
    }
  );
}
</code></pre><h1 id="contacts-plugin"><a class="markdown-permalink" href="#contacts-plugin"><span class="icon icon-link"></span></a>Contacts plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.ContactsManager.html"><code>ContactsManager</code> <sup>↗</sup></a> provides access to contacts stored on the device.</p><p>Add contacts permission to the app manifest:</p><pre><code class="language-xml">
&#x3C;<span class="pl-ent">uses-permission</span> <span class="pl-e">android:name</span>=<span class="pl-s"><span class="pl-pds">"</span>android.permission.READ_CONTACTS<span class="pl-pds">"</span></span>/>
</code></pre><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.ContactsPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">ContactsPlugin</span>(activity))
</code></pre><p>Ask a user to pick a contact or get contact by its ID:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">contactsManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">contactsManager</span>.<span class="pl-en">pickContact</span>();
<span class="pl-c">// ⮕ Promise&#x3C;Contact | null></span>

<span class="pl-smi">contactsManager</span>.<span class="pl-en">getContact</span>(<span class="pl-c1">42</span>);
<span class="pl-c">// ⮕ Contact | null</span>
</code></pre><h1 id="deep-link-plugin"><a class="markdown-permalink" href="#deep-link-plugin"><span class="icon icon-link"></span></a>Deep link plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.DeepLinkManager.html"><code>DeepLinkManager</code> <sup>↗</sup></a> provides access to deep links inside yor web app.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.DeepLinkPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">DeepLinkPlugin</span>())
</code></pre><p>Override <a href="https://developer.android.com/reference/android/app/Activity#onNewIntent(android.content.Intent)"><code>onNewIntent</code> <sup>↗</sup></a> in the main activity of yor app and post the deep link event:</p><pre><code class="language-kotlin"><span class="pl-k">override</span> <span class="pl-k">fun</span> <span class="pl-en">onNewIntent</span>(<span class="pl-smi">intent</span><span class="pl-k">:</span> <span class="pl-en">Intent</span>) {
    <span class="pl-c1">super</span>.onNewIntent(intent)

    eventBus.post(<span class="pl-en">OpenDeepLinkEvent</span>(intent))
}
</code></pre><p>Subscribe to new intents in the web app:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">deepLinkManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">deepLinkManager</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">intent</span> <span class="pl-k">=></span> {
  <span class="pl-c">// Handle the deep link intent</span>
});
</code></pre><h1 id="device-plugin"><a class="markdown-permalink" href="#device-plugin"><span class="icon icon-link"></span></a>Device plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.DeviceManager.html"><code>DeviceManager</code> <sup>↗</sup></a> provides access to various device settings.</p><p>Add compat library dependency, it is used for window insets acquisition:</p><pre><code class="language-kotlin">dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>androidx.appcompat:appcompat:1.7.0<span class="pl-pds">"</span></span>)
}
</code></pre><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.DevicePlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">DevicePlugin</span>(activity))
</code></pre><p>Synchronously get device info, locale, or other data:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">deviceManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">deviceManager</span>.<span class="pl-en">getDeviceInfo</span>().<span class="pl-smi">apiLevel</span>;
<span class="pl-c">// ⮕ 33</span>

<span class="pl-smi">deviceManager</span>.<span class="pl-en">getPreferredLocales</span>();
<span class="pl-c">// ⮕ ['en-US']</span>
</code></pre><p>If you are using React, then refer to <a href="https://smikhalevski.github.io/racehorse/functions/_racehorse_react.useWindowInsets.html"><code>useWindowInsets</code> <sup>↗</sup></a> hook to synchronize document paddings and window insets:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">useLayoutEffect</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>react<span class="pl-pds">'</span></span>;
<span class="pl-k">import</span> { <span class="pl-smi">useWindowInsets</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@racehorse/react<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">windowInsets</span> <span class="pl-k">=</span> <span class="pl-en">useWindowInsets</span>();

<span class="pl-en">useLayoutEffect</span>(() <span class="pl-k">=></span> {
  <span class="pl-c1">document</span>.<span class="pl-c1">body</span>.<span class="pl-c1">style</span>.<span class="pl-smi">padding</span> <span class="pl-k">=</span>
    <span class="pl-smi">windowInsets</span>.<span class="pl-c1">top</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">'</span>px <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">windowInsets</span>.<span class="pl-c1">right</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">'</span>px <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">windowInsets</span>.<span class="pl-c1">bottom</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">'</span>px <span class="pl-pds">'</span></span> <span class="pl-k">+</span> <span class="pl-smi">windowInsets</span>.<span class="pl-c1">left</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">'</span>px<span class="pl-pds">'</span></span>;
}, [<span class="pl-smi">windowInsets</span>]);
</code></pre><h1 id="download-plugin"><a class="markdown-permalink" href="#download-plugin"><span class="icon icon-link"></span></a>Download plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.DownloadManager.html"><code>DownloadManager</code> <sup>↗</sup></a> allows staring and monitoring file downloads.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.DownloadPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">DownloadPlugin</span>(activity))
</code></pre><p>Read previously started downloads or start a new one:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">downloadManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">downloadManager</span>.<span class="pl-en">addDownload</span>(<span class="pl-s"><span class="pl-pds">'</span>http://example.com/my.zip<span class="pl-pds">'</span></span>).<span class="pl-c1">then</span>(<span class="pl-v">id</span> <span class="pl-k">=></span> {
  <span class="pl-smi">downloadManager</span>.<span class="pl-en">getDownload</span>(<span class="pl-smi">id</span>);
  <span class="pl-c">// ⮕ Dowload { id: 1, status: 4, uri: 'http://example.com/my.zip' }</span>
});

<span class="pl-smi">downloadManager</span>.<span class="pl-en">getAllDownloads</span>();
</code></pre><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.Download.html"><code>Download</code> <sup>↗</sup></a> instance carries the download status, progress, and file details.</p><p>A storage permission must be added to support Android devices with API level &#x3C;= 29:</p><pre><code class="language-xml">
&#x3C;<span class="pl-ent">uses-permission</span>
    <span class="pl-e">android:name</span>=<span class="pl-s"><span class="pl-pds">"</span>android.permission.WRITE_EXTERNAL_STORAGE<span class="pl-pds">"</span></span>
    <span class="pl-e">tools:ignore</span>=<span class="pl-s"><span class="pl-pds">"</span>ScopedStorage<span class="pl-pds">"</span></span>/>
</code></pre><h2 id="android-29-support"><a class="markdown-permalink" href="#android-29-support"><span class="icon icon-link"></span></a>Android 29 support</h2><p>On Android 29 a <code>SecurityException</code> is thrown when calling a deprecated method <a href="https://developer.android.com/reference/android/app/DownloadManager#addCompletedDownload(java.lang.String,%20java.lang.String,%20boolean,%20java.lang.String,%20java.lang.String,%20long,%20boolean)"><code>DownloadManager.addCompletedDownload</code> <sup>↗</sup></a> if permission <code>android.permission.WRITE_EXTERNAL_STORAGE</code> isn't granted. This method is used by Racehorse to populate the list of previous downloads when a data URI is downloaded. To fix this exception <a href="https://developer.android.com/training/data-storage/use-cases#opt-out-in-production-app">the legacy external storage model <sup>↗</sup></a> must be enabled in Android manifest for API level 29.</p><p>Create a resource file used for default config values <code>src/main/res/values/config.xml</code></p><pre><code class="language-xml">
&#x3C;<span class="pl-ent">resources</span>>
    &#x3C;<span class="pl-ent">bool</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">"</span>request_legacy_external_storage<span class="pl-pds">"</span></span>>false&#x3C;/<span class="pl-ent">bool</span>>
&#x3C;/<span class="pl-ent">resources</span>>
</code></pre><p>Create a resource file that is specific for API level 29 <code>src/main/res/values-v29/config.xml</code></p><pre><code class="language-xml">
&#x3C;<span class="pl-ent">resources</span>>
    &#x3C;<span class="pl-ent">bool</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">"</span>request_legacy_external_storage<span class="pl-pds">"</span></span>>true&#x3C;/<span class="pl-ent">bool</span>>
&#x3C;/<span class="pl-ent">resources</span>>
</code></pre><p>Configure the legacy external storage setting in Android manifest file:</p><pre><code class="language-xml">
&#x3C;<span class="pl-ent">application</span>
    <span class="pl-e">android:requestLegacyExternalStorage</span>=<span class="pl-s"><span class="pl-pds">"</span>@bool/request_legacy_external_storage<span class="pl-pds">"</span></span>
/>
</code></pre><h2 id="downloadable-links"><a class="markdown-permalink" href="#downloadable-links"><span class="icon icon-link"></span></a>Downloadable links</h2><p>Downloadable links have a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"><code>download</code> <sup>↗</sup></a> attribute:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">a</span>
  <span class="pl-e">href</span>=<span class="pl-s"><span class="pl-pds">"</span>data:image/gif;base64,R0lGODlhBwAGAJEAAAAAAP////RDNv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAABwAGAAACCpxkeMudOyKMkhYAOw==<span class="pl-pds">"</span></span>
  <span class="pl-e">download</span>
>
  Download image
&#x3C;/<span class="pl-ent">a</span>>
</code></pre><p>Initialize the <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-download-plugin/index.html"><code>DownloadPlugin</code> <sup>↗</sup></a> as described in the previous section, and add a Racehorse listener to enable automatic handling of downloadable links:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.webview.RacehorseDownloadListener</span>

webView.setDownloadListener(<span class="pl-en">RacehorseDownloadListener</span>())
</code></pre><h1 id="encrypted-storage-plugin"><a class="markdown-permalink" href="#encrypted-storage-plugin"><span class="icon icon-link"></span></a>Encrypted storage plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.EncryptedStorageManager.html"><code>EncryptedStorageManager</code> <sup>↗</sup></a> enables a file-based persistence of a password-protected data.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.EncryptedStoragePlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(
    <span class="pl-en">EncryptedStoragePlugin</span>(
        <span class="pl-c">// The directory where encrypted data is stored</span>
        <span class="pl-en">File</span>(activity.filesDir, <span class="pl-s"><span class="pl-pds">"</span>storage<span class="pl-pds">"</span></span>),

        <span class="pl-c">// The salt required to generate the encryption key</span>
        <span class="pl-en">BuildConfig</span>.<span class="pl-en">APPLICATION_ID</span>.toByteArray()
    )
)
</code></pre><p>Read and write encrypted key-value pairs to the storage:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">encryptedStorageManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">PASSWORD</span> <span class="pl-k">=</span> <span class="pl-s"><span class="pl-pds">'</span>12345<span class="pl-pds">'</span></span>;

<span class="pl-k">await</span> <span class="pl-smi">encryptedStorageManager</span>.<span class="pl-c1">set</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>bar<span class="pl-pds">'</span></span>, <span class="pl-c1">PASSWORD</span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-k">await</span> <span class="pl-smi">encryptedStorageManager</span>.<span class="pl-c1">get</span>(<span class="pl-s"><span class="pl-pds">'</span>foo<span class="pl-pds">'</span></span>, <span class="pl-c1">PASSWORD</span>);
<span class="pl-c">// ⮕ 'bar'</span>
</code></pre><h1 id="evergreen-plugin"><a class="markdown-permalink" href="#evergreen-plugin"><span class="icon icon-link"></span></a>Evergreen plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.EvergreenManager.html"><code>EvergreenManager</code> <sup>↗</sup></a> provides a way to update your app using an archive that is downloadable from your server.</p><p>You can find an extensive demo of evergreen plugin usage <a href="#example-app">in the example app.</a></p><p>Init the plugin and start the update download process:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">android.os.Bundle</span>
<span class="pl-k">import</span> <span class="pl-smi">androidx.appcompat.app.AppCompatActivity</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.evergreen.EvergreenPlugin</span>

<span class="pl-k">class</span> <span class="pl-en">MyActivity</span> : <span class="pl-en">AppCompatActivity</span>() {

    <span class="pl-k">override</span> <span class="pl-k">fun</span> <span class="pl-en">onCreate</span>(<span class="pl-smi">savedInstanceState</span><span class="pl-k">:</span> <span class="pl-en">Bundle</span><span class="pl-k">?</span>) {
        <span class="pl-c1">super</span>.onCreate(savedInstanceState)

        <span class="pl-k">val</span> evergreenPlugin <span class="pl-k">=</span> <span class="pl-en">EvergreenPlugin</span>(<span class="pl-en">File</span>(filesDir, <span class="pl-s"><span class="pl-pds">"</span>app<span class="pl-pds">"</span></span>))

        <span class="pl-en">EventBus</span>.getDefault().register(evergreenPlugin)

        <span class="pl-en">Thread</span> {
            <span class="pl-c">// 🟡 Start the update process</span>
            evergreenPlugin.start(version <span class="pl-k">=</span> <span class="pl-s"><span class="pl-pds">"</span>1.0.0<span class="pl-pds">"</span></span>, updateMode <span class="pl-k">=</span> <span class="pl-en">UpdateMode</span>.<span class="pl-en">MANDATORY</span>) {
                <span class="pl-en">URL</span>(<span class="pl-s"><span class="pl-pds">"</span>http://example.com/bundle.zip<span class="pl-pds">"</span></span>).openConnection()
            }
        }.start()
    }
}
</code></pre><p>The snipped above would download <code>bundle.zip</code>, unpack it and store the assets in <code>&#x3C;filesDir>/app</code> directory. These assets would be labeled as version 1.0.0. During future app launches, the plugin would notice that it has the assets for version 1.0.0 and would skip the download. If the version changes then the update bundle would be downloaded again.</p><p>After the update is downloaded a <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse.evergreen/-bundle-ready-event/index.html"><code>BundleReadyEvent</code> <sup>↗</sup></a> event is posted. You can use the <a href="#asset-loader-plugin"><code>AssetLoaderPlugin</code></a> to load resources provided by the evergreen plugin:</p><pre><code class="language-kotlin">@Subscribe(threadMode <span class="pl-k">=</span> <span class="pl-en">ThreadMode</span>.<span class="pl-en">MAIN</span>)
<span class="pl-k">fun</span> <span class="pl-en">onBundleReady</span>(<span class="pl-smi">event</span><span class="pl-k">:</span> <span class="pl-en">BundleReadyEvent</span>) {

    <span class="pl-en">EventBus</span>.getDefault().register(
        <span class="pl-c">// Loads static assets when a particular URL is requested</span>
        <span class="pl-en">AssetLoaderPlugin</span>(
            activity,
            <span class="pl-en">WebViewAssetLoader</span>.<span class="pl-en">Builder</span>()
                .setDomain(<span class="pl-s"><span class="pl-pds">"</span>example.com<span class="pl-pds">"</span></span>)
                .addPathHandler(
                    <span class="pl-s"><span class="pl-pds">"</span>/<span class="pl-pds">"</span></span>,
                    <span class="pl-c">// 🟡 Use assets provided by the evergreen plugin</span>
                    <span class="pl-en">StaticPathHandler</span>(event.appDir)
                )
                .build()
        )
    )

    webView.loadUrl(<span class="pl-s"><span class="pl-pds">"</span>https://example.com<span class="pl-pds">"</span></span>)
}
</code></pre><p>Evergreen plugin keeps track of downloaded bundles:</p><ul><li>The master bundle contains current assets of the web app;</li><li>The pending update bundle contains assets that were downloaded but not yet applied as master.</li></ul><p>You can monitor background updates and apply them as soon as they are ready:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">evergreenManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-c">// 1️⃣ Wait for the update bundle to be downloaded</span>
<span class="pl-smi">evergreenManager</span>.<span class="pl-en">subscribe</span>(<span class="pl-s"><span class="pl-pds">'</span>ready<span class="pl-pds">'</span></span>, () <span class="pl-k">=></span> {
  <span class="pl-c">// 2️⃣ Apply the update</span>
  <span class="pl-smi">evergreenManager</span>.<span class="pl-en">applyUpdate</span>().<span class="pl-c1">then</span>(() <span class="pl-k">=></span> {
    <span class="pl-c">// 3️⃣ Reload the web app to use the latest assets</span>
    <span class="pl-c1">window</span>.<span class="pl-c1">location</span>.<span class="pl-c1">reload</span>();
  });
});
</code></pre><h1 id="facebook-login-plugin"><a class="markdown-permalink" href="#facebook-login-plugin"><span class="icon icon-link"></span></a>Facebook Login plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.FacebookLoginManager.html"><code>FacebookLoginManager</code> <sup>↗</sup></a> enables Facebook Login support.</p><p>Go to <a href="https://developers.facebook.com/docs/facebook-login/android/">developers.facebook.com <sup>↗</sup></a>, register your app and add the required dependencies and configurations.</p><p>Initialize the Facebook SDK and register the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">com.facebook.FacebookSdk</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.FacebookLoginPlugin</span>

<span class="pl-en">FacebookSdk</span>.sdkInitialize(activity)

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">FacebookLoginPlugin</span>(activity))
</code></pre><p>Request sign in from the web app that is loaded into the WebView:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">facebookLoginManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">facebookLoginManager</span>.<span class="pl-en">logIn</span>().<span class="pl-c1">then</span>(<span class="pl-v">accessToken</span> <span class="pl-k">=></span> {
  <span class="pl-c">// The accessToken is not-null if log in succeeded</span>
});
</code></pre><h1 id="facebook-share-plugin"><a class="markdown-permalink" href="#facebook-share-plugin"><span class="icon icon-link"></span></a>Facebook Share plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.FacebookShareManager.html"><code>FacebookShareManager</code> <sup>↗</sup></a> enables Facebook social sharing.</p><p>Go to <a href="https://developers.facebook.com/docs/facebook-login/android/">developers.facebook.com <sup>↗</sup></a>, register your app and add the required dependencies and configurations.</p><p>Initialize the Facebook SDK and register the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">com.facebook.FacebookSdk</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.FacebookSharePlugin</span>

<span class="pl-en">FacebookSdk</span>.sdkInitialize(activity)

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">FacebookSharePlugin</span>(activity))
</code></pre><p>Trigger Facebook social sharing flow:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">facebookShareManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">facebookShareManager</span>.<span class="pl-en">shareLink</span>({
  contentUrl: <span class="pl-s"><span class="pl-pds">'</span>http://example.com<span class="pl-pds">'</span></span>,
});
</code></pre><h1 id="file-chooser-plugin"><a class="markdown-permalink" href="#file-chooser-plugin"><span class="icon icon-link"></span></a>File chooser plugin</h1><p>File chooser plugin requires <a href="#webview-events">WebView events</a> to be enabled. This plugin enables file inputs in the web app.</p><p>For example, if you have a file input:</p><pre><code class="language-html">&#x3C;<span class="pl-ent">input</span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>file<span class="pl-pds">"</span></span> />
</code></pre><p>You can register a plugin to make this input open a file chooser dialog:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.FileChooserPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">FileChooserPlugin</span>(activity))
</code></pre><p>If you don't need camera support for file inputs, then the plugin doesn't require any additional configuration.</p><h2 id="enabling-camera-capture"><a class="markdown-permalink" href="#enabling-camera-capture"><span class="icon icon-link"></span></a>Enabling camera capture</h2><p>Camera capture requires a temporary file storage to write captured file to.</p><p>Declare a provider in your app manifest:</p><pre><code class="language-xml">
&#x3C;<span class="pl-ent">manifest</span>>
    &#x3C;<span class="pl-ent">application</span>>
        &#x3C;<span class="pl-ent">provider</span>
            <span class="pl-e">android:name</span>=<span class="pl-s"><span class="pl-pds">"</span>androidx.core.content.FileProvider<span class="pl-pds">"</span></span>
            <span class="pl-e">android:authorities</span>=<span class="pl-s"><span class="pl-pds">"</span>\${applicationId}.provider<span class="pl-pds">"</span></span>
            <span class="pl-e">android:exported</span>=<span class="pl-s"><span class="pl-pds">"</span>false<span class="pl-pds">"</span></span>
            <span class="pl-e">android:grantUriPermissions</span>=<span class="pl-s"><span class="pl-pds">"</span>true<span class="pl-pds">"</span></span>>
            &#x3C;<span class="pl-ent">meta-data</span>
                <span class="pl-e">android:name</span>=<span class="pl-s"><span class="pl-pds">"</span>android.support.FILE_PROVIDER_PATHS<span class="pl-pds">"</span></span>
                <span class="pl-e">android:resource</span>=<span class="pl-s"><span class="pl-pds">"</span>@xml/file_paths<span class="pl-pds">"</span></span>/>
        &#x3C;/<span class="pl-ent">provider</span>>
    &#x3C;/<span class="pl-ent">application</span>>
&#x3C;/<span class="pl-ent">manifest</span>>
</code></pre><p>Add a provider paths descriptor to XML resources, for example to <code>src/main/res/xml/file_paths.xml</code>:</p><pre><code class="language-xml">&#x3C;?<span class="pl-ent">xml</span><span class="pl-e"> version</span>=<span class="pl-s"><span class="pl-pds">"</span>1.0<span class="pl-pds">"</span></span><span class="pl-e"> encoding</span>=<span class="pl-s"><span class="pl-pds">"</span>utf-8<span class="pl-pds">"</span></span>?>
&#x3C;<span class="pl-ent">paths</span>>
    &#x3C;<span class="pl-ent">cache-path</span> <span class="pl-e">name</span>=<span class="pl-s"><span class="pl-pds">"</span>cacheDir<span class="pl-pds">"</span></span> <span class="pl-e">path</span>=<span class="pl-s"><span class="pl-pds">"</span>/<span class="pl-pds">"</span></span>/>
&#x3C;/<span class="pl-ent">paths</span>>
</code></pre><p>Initialize the plugin in your Android app, and provide the authority of the provider you've just created and the path that you've defined in the descriptor:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.FileChooserPlugin</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.TempCameraFileFactory</span>

<span class="pl-en">EventBus</span>.getDefault().register(
    <span class="pl-en">FileChooserPlugin</span>(
        activity,

        <span class="pl-en">TempCameraFileFactory</span>(
            activity,
            activity.cacheDir,
            <span class="pl-en">BuildConfig</span>.<span class="pl-en">APPLICATION_ID</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">"</span>.provider<span class="pl-pds">"</span></span>
        )
    )
)
</code></pre><p>If you want to store images and videos in the gallery app after they were captured through file chooser, use <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-gallery-camera-file-factory/index.html"><code>GalleryCameraFileFactory</code> <sup>↗</sup></a>.</p><h1 id="file-system-plugin"><a class="markdown-permalink" href="#file-system-plugin"><span class="icon icon-link"></span></a>File system plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.FsManager.html"><code>FsManager</code> <sup>↗</sup></a> enables file system CRUD operations.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.FsPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">FsPlugin</span>(activity))
</code></pre><p>Access files stored on the device from a WebView:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">fsManager</span>, <span class="pl-smi">Directory</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">file</span> <span class="pl-k">=</span> <span class="pl-smi">fsManager</span>.<span class="pl-c1">open</span>(<span class="pl-smi">Directory</span>.<span class="pl-c1">CACHE</span>, <span class="pl-s"><span class="pl-pds">'</span>temp.txt<span class="pl-pds">'</span></span>);

<span class="pl-k">await</span> <span class="pl-smi">file</span>.<span class="pl-en">writeText</span>(<span class="pl-s"><span class="pl-pds">'</span>Hello world!<span class="pl-pds">'</span></span>);

<span class="pl-k">await</span> <span class="pl-smi">file</span>.<span class="pl-en">readDataUri</span>();
<span class="pl-c">// ⮕ 'data:text/plain;base64,SGVsbG8gd29ybGQh'</span>
</code></pre><h2 id="serving-local-files"><a class="markdown-permalink" href="#serving-local-files"><span class="icon icon-link"></span></a>Serving local files</h2><p>To load an arbitrary file from the web view, use <a href="https://smikhalevski.github.io/racehorse/classes/racehorse.File.html#localurl"><code>localUrl</code> <sup>↗</sup></a>:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">contactsManager</span>, <span class="pl-smi">fsManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">contact</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">contactsManager</span>.<span class="pl-en">pickContact</span>();

<span class="pl-k">const</span> <span class="pl-c1">photoUrl</span> <span class="pl-k">=</span> <span class="pl-smi">fsManager</span>.<span class="pl-c1">open</span>(<span class="pl-smi">contact</span>.<span class="pl-smi">photoUri</span>).<span class="pl-smi">localUrl</span>;
<span class="pl-c">// ⮕ 'https://racehorce.local/fs?uri=…'</span>
</code></pre><p>The local URL can be used as a source for an image or an iframe:</p><pre><code class="language-ts"><span class="pl-c1">document</span>.<span class="pl-c1">getElementsByTagName</span>(<span class="pl-s"><span class="pl-pds">'</span>img<span class="pl-pds">'</span></span>)[<span class="pl-c1">0</span>].<span class="pl-smi">src</span> <span class="pl-k">=</span> <span class="pl-smi">photoUrl</span>;
</code></pre><h1 id="google-pay-plugin"><a class="markdown-permalink" href="#google-pay-plugin"><span class="icon icon-link"></span></a>Google Pay plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.GooglePayManager.html"><code>GooglePayManager</code> <sup>↗</sup></a> enables <a href="https://developers.google.com/pay/issuers/apis/push-provisioning/android">Android Push Provisioning <sup>↗</sup></a> support.</p><p><a href="https://developers.google.com/pay/issuers/apis/push-provisioning/android/setup">Set up the development environment <sup>↗</sup></a>, so TapAndPay SDK is available in your app.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.GoogleSignInPlugin</span>

<span class="pl-k">class</span> <span class="pl-en">MainActivity</span> : <span class="pl-en">AppCompatActivity</span>() {

    <span class="pl-k">private</span> <span class="pl-k">lateinit</span> <span class="pl-k">var</span> googlePayPlugin<span class="pl-k">:</span> <span class="pl-en">GooglePayPlugin</span>

    <span class="pl-k">override</span> <span class="pl-k">fun</span> <span class="pl-en">onCreate</span>(<span class="pl-smi">savedInstanceState</span><span class="pl-k">:</span> <span class="pl-en">Bundle</span><span class="pl-k">?</span>) {
        <span class="pl-c1">super</span>.onCreate(savedInstanceState)

        googlePayPlugin <span class="pl-k">=</span> <span class="pl-en">GooglePayPlugin</span>(<span class="pl-c1">this</span>)

        <span class="pl-en">EventBus</span>.getDefault().register(googlePayPlugin)
    }

    <span class="pl-k">override</span> <span class="pl-k">fun</span> <span class="pl-en">onActivityResult</span>(<span class="pl-smi">requestCode</span><span class="pl-k">:</span> <span class="pl-c1">Int</span>, <span class="pl-smi">resultCode</span><span class="pl-k">:</span> <span class="pl-c1">Int</span>, <span class="pl-smi">data</span><span class="pl-k">:</span> <span class="pl-en">Intent</span><span class="pl-k">?</span>) {
        <span class="pl-c1">super</span>.onActivityResult(requestCode, resultCode, data)

        <span class="pl-c">// 🟡 Dispatch results back to the plugin</span>
        googlePayPlugin.dispatchResult(requestCode, resultCode, data)
    }
}
</code></pre><p>Check that Google Pay is supported and properly configured by retrieving the current environment:</p><pre><code class="language-ts"><span class="pl-k">await</span> <span class="pl-smi">googlePayManager</span>.<span class="pl-en">getEnvironment</span>();
<span class="pl-c">// ⮕ 'production'</span>
</code></pre><p>This call may throw an <code>ApiException</code> error that provides the insight on configuration and availability issues.</p><p>To get the token info from the wallet use:</p><pre><code class="language-ts"><span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">getTokenInfo</span>(<span class="pl-v">lastFour</span><span class="pl-k">:</span> <span class="pl-c1">string</span>)<span class="pl-k">:</span> <span class="pl-en">GooglePayTokenInfo</span> <span class="pl-k">|</span> <span class="pl-c1">undefined</span> {
  (<span class="pl-k">await</span> <span class="pl-smi">googlePayManager</span>.<span class="pl-en">listTokens</span>()).<span class="pl-c1">find</span>(
    <span class="pl-v">tokenInfo</span> <span class="pl-k">=></span>
      (<span class="pl-smi">tokenInfo</span>.<span class="pl-smi">dpanLastFour</span> <span class="pl-k">===</span> <span class="pl-smi">lastFour</span> <span class="pl-k">||</span> <span class="pl-smi">tokenInfo</span>.<span class="pl-smi">fpanLastFour</span> <span class="pl-k">===</span> <span class="pl-smi">lastFour</span>) <span class="pl-k">&#x26;&#x26;</span>
      <span class="pl-smi">tokenInfo</span>.<span class="pl-smi">tokenServiceProvider</span> <span class="pl-k">===</span> <span class="pl-smi">GooglePayTokenServiceProvider</span>.<span class="pl-c1">MASTERCARD</span>
  );
}
</code></pre><p>To tokenize a card or resume a previously aborted tokenization:</p><pre><code class="language-ts"><span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">tokenizeCard</span>(<span class="pl-v">lastFour</span><span class="pl-k">:</span> <span class="pl-c1">string</span>)<span class="pl-k">:</span> <span class="pl-en">GooglePayTokenInfo</span> {
  <span class="pl-k">const</span> <span class="pl-c1">tokenInfo</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">getTokenInfo</span>(<span class="pl-smi">lastFour</span>);

  <span class="pl-k">if</span> (<span class="pl-k">!</span><span class="pl-smi">tokenInfo</span> <span class="pl-k">||</span> <span class="pl-smi">tokenInfo</span>.<span class="pl-smi">tokenState</span> <span class="pl-k">===</span> <span class="pl-smi">GooglePayTokenState</span>.<span class="pl-c1">UNTOKENIZED</span>) {
    <span class="pl-c">// 1️⃣ The card isn't tokenized</span>
    <span class="pl-k">await</span> <span class="pl-smi">googlePayManager</span>.<span class="pl-en">pushTokenize</span>({
      lastFour: <span class="pl-smi">lastFour</span>,
      network: <span class="pl-smi">GooglePayCardNetwork</span>.<span class="pl-c1">MASTERCARD</span>,
      tokenServiceProvider: <span class="pl-smi">GooglePayTokenServiceProvider</span>.<span class="pl-c1">MASTERCARD</span>,
      <span class="pl-c">// opaquePaymentCard</span>
      <span class="pl-c">// userAddress</span>
      <span class="pl-c">// displayName</span>
    });
  } <span class="pl-k">else</span> <span class="pl-k">if</span> (<span class="pl-smi">tokenInfo</span>.<span class="pl-smi">tokenState</span> <span class="pl-k">===</span> <span class="pl-smi">GooglePayTokenState</span>.<span class="pl-c1">ACTIVE</span>) {
    <span class="pl-c">// 2️⃣ Card is already tokenized</span>
    <span class="pl-k">return</span> <span class="pl-smi">tokenInfo</span>;
  } <span class="pl-k">else</span> {
    <span class="pl-c">// 3️⃣ Resume card tokenization (yellow path)</span>
    <span class="pl-k">await</span> <span class="pl-smi">googlePayManager</span>.<span class="pl-en">tokenize</span>({
      tokenId: <span class="pl-smi">tokenInfo</span>.<span class="pl-smi">issuerTokenId</span>,
      network: <span class="pl-smi">GooglePayCardNetwork</span>.<span class="pl-c1">MASTERCARD</span>,
      tokenServiceProvider: <span class="pl-smi">GooglePayTokenServiceProvider</span>.<span class="pl-c1">MASTERCARD</span>,
      <span class="pl-c">// displayName</span>
    });
  }

  <span class="pl-k">return</span> <span class="pl-en">getTokenInfo</span>(<span class="pl-smi">lastFour</span>);
}
</code></pre><p>To open a wallet app and reveal the tokenized card use:</p><pre><code class="language-ts"><span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">revealCard</span>(<span class="pl-v">lastFour</span><span class="pl-k">:</span> <span class="pl-c1">string</span>)<span class="pl-k">:</span> <span class="pl-en">Promise</span>&#x3C;<span class="pl-c1">boolean</span>> {
  <span class="pl-k">const</span> <span class="pl-c1">tokenInfo</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">getTokenInfo</span>(<span class="pl-smi">lastFour</span>);

  <span class="pl-k">return</span> <span class="pl-smi">tokenInfo</span> <span class="pl-k">?</span> <span class="pl-smi">googlePayManager</span>.<span class="pl-en">viewToken</span>(<span class="pl-smi">tokenInfo</span>.<span class="pl-smi">issuerTokenId</span>, <span class="pl-smi">tokenInfo</span>.<span class="pl-smi">tokenServiceProvider</span>) <span class="pl-k">:</span> <span class="pl-c1">false</span>;
}
</code></pre><h1 id="google-play-referrer-plugin"><a class="markdown-permalink" href="#google-play-referrer-plugin"><span class="icon icon-link"></span></a>Google Play referrer plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.GooglePlayReferrerManager.html"><code>GooglePlayReferrerManager</code> <sup>↗</sup></a> fetches the <a href="https://developer.android.com/google/play/installreferrer/library">Google Play referrer <sup>↗</sup></a> information.</p><p>Add Google Play referrer SDK dependency to your Android app:</p><pre><code class="language-kotlin">dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>com.android.installreferrer:installreferrer:2.2<span class="pl-pds">"</span></span>)
}
</code></pre><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.GooglePlayReferrerPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">GooglePlayReferrerPlugin</span>(activity))
</code></pre><p>Read the Google Play referrer:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">googlePlayReferrerManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">googlePlayReferrerManager</span>.<span class="pl-en">getGooglePlayReferrer</span>();
<span class="pl-c">// ⮕ Promise&#x3C;string></span>
</code></pre><h1 id="google-sign-in-plugin"><a class="markdown-permalink" href="#google-sign-in-plugin"><span class="icon icon-link"></span></a>Google Sign-In plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.GoogleSignInManager.html"><code>GoogleSignInManager</code> <sup>↗</sup></a> enables Google Sign-In support.</p><p>Go to <a href="https://console.firebase.google.com">console.firebase.google.com <sup>↗</sup></a>, set up a new project, and configure an Android app following all instructions. Use the <code>applicationId</code> of your app and SHA-1 that is used for app signing. You can use gradle to retrieve SHA-1:</p><pre><code class="language-shell">./gradlew signingReport
</code></pre><p>Go to <a href="https://console.cloud.google.com/apis/credentials">Google Cloud Console <sup>↗</sup></a> for your project and add an OAuth client ID for Android.</p><p>Add Google Sign-In SDK dependencies to your Android app:</p><pre><code class="language-kotlin">dependencies {
    implementation(<span class="pl-s"><span class="pl-pds">"</span>com.google.android.gms:play-services-auth:21.2.0<span class="pl-pds">"</span></span>)
    implementation(platform(<span class="pl-s"><span class="pl-pds">"</span>com.google.firebase:firebase-bom:32.1.2<span class="pl-pds">"</span></span>))
}
</code></pre><p>Register the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.GoogleSignInPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">GoogleSignInPlugin</span>(activity))
</code></pre><p>Request sign in from the web app that is loaded into a WebView:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">googleSignInManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">googleSignInManager</span>.<span class="pl-en">signIn</span>().<span class="pl-c1">then</span>(<span class="pl-v">account</span> <span class="pl-k">=></span> {
  <span class="pl-c">// The account is not-null if sign in succeeded</span>
});
</code></pre><h1 id="https-plugin"><a class="markdown-permalink" href="#https-plugin"><span class="icon icon-link"></span></a>HTTPS plugin</h1><p>Asset loader plugin requires <a href="#webview-events">WebView events</a> to be enabled. HTTPS plugin forces the WebView to ignore certificate issues.</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.HttpsPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">HttpsPlugin</span>())
</code></pre><h1 id="keyboard-plugin"><a class="markdown-permalink" href="#keyboard-plugin"><span class="icon icon-link"></span></a>Keyboard plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.KeyboardManager.html"><code>KeyboardManager</code> <sup>↗</sup></a> toggles the software keyboard and notifies about keyboard animation.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.KeyboardPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">KeyboardPlugin</span>(activity).<span class="pl-c1">apply</span> { enable() })
</code></pre><p>Synchronously read the keyboard height, show or hide the keyboard:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">keyboardManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">keyboardManager</span>.<span class="pl-en">showKeyboard</span>();
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">keyboardManager</span>.<span class="pl-en">getKeyboardHeight</span>();
<span class="pl-c">// ⮕ 630</span>
</code></pre><p>Subscribe to the keyboard manager to receive notifications when the keyboard animation starts:</p><pre><code class="language-ts"><span class="pl-smi">keyboardManager</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">animation</span> <span class="pl-k">=></span> {
  <span class="pl-c">// Handle the started animation here.</span>
});
</code></pre><p>If you are using React, use <a href="https://smikhalevski.github.io/racehorse/functions/_racehorse_react.useKeyboardAnimation.html"><code>useKeyboardAnimation</code> <sup>↗</sup></a> hook to subscribe to the keyboard animation from a component:</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useKeyboardAnimation</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@racehorse/react<span class="pl-pds">'</span></span>;

<span class="pl-en">useKeyboardAnimation</span>((<span class="pl-v">animation</span>, <span class="pl-v">signal</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// Signal is aborted if animation is cancelled.</span>
});
</code></pre><p>Use <a href="https://smikhalevski.github.io/racehorse/functions/racehorse.runAnimation.html"><code>runAnimation</code> <sup>↗</sup></a> to run the animation. For example, if your <a href="https://developer.android.com/develop/ui/views/layout/edge-to-edge">app is rendered edge-to-edge <sup>↗</sup></a>, you can animate the bottom padding to compensate the height of the keyboard.</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">useKeyboardAnimation</span>, <span class="pl-smi">runAnimation</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@racehorse/react<span class="pl-pds">'</span></span>;

<span class="pl-en">useKeyboardAnimation</span>((<span class="pl-v">animation</span>, <span class="pl-v">signal</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// Run the animation in sync with the native keyboard animation.</span>
  <span class="pl-en">runAnimation</span>(
    <span class="pl-smi">animation</span>,
    {
      <span class="pl-en">onProgress</span>(<span class="pl-v">animation</span>, <span class="pl-v">fraction</span>, <span class="pl-v">percent</span>) {
        <span class="pl-k">const</span> <span class="pl-c1">keyboardHeight</span> <span class="pl-k">=</span> <span class="pl-smi">animation</span>.<span class="pl-smi">startValue</span> <span class="pl-k">+</span> (<span class="pl-smi">animation</span>.<span class="pl-smi">endValue</span> <span class="pl-k">-</span> <span class="pl-smi">animation</span>.<span class="pl-smi">startValue</span>) <span class="pl-k">*</span> <span class="pl-smi">fraction</span>;

        <span class="pl-c1">document</span>.<span class="pl-c1">body</span>.<span class="pl-c1">style</span>.<span class="pl-c1">paddingBottom</span> <span class="pl-k">=</span> <span class="pl-smi">keyboardHeight</span> <span class="pl-k">+</span> <span class="pl-s"><span class="pl-pds">'</span>px<span class="pl-pds">'</span></span>;
      },
    },
    <span class="pl-smi">signal</span>
  );
});
</code></pre><p>You may also want to scroll the window to prevent the focused element from bing obscured by the keyboard. Use <a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.scrollToElement.html"><code>scrollToElement</code> <sup>↗</sup></a> to animate scrolling in sync with keyboard animation:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">useKeyboardAnimation</span>, <span class="pl-smi">scrollToElement</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@racehorse/react<span class="pl-pds">'</span></span>;

<span class="pl-en">useKeyboardAnimation</span>((<span class="pl-v">animation</span>, <span class="pl-v">signal</span>) <span class="pl-k">=></span> {
  <span class="pl-c">// Ensure there's an active element to scroll to.</span>
  <span class="pl-k">if</span> (<span class="pl-c1">document</span>.<span class="pl-smi">activeElement</span> <span class="pl-k">===</span> <span class="pl-c1">null</span> <span class="pl-k">&#x26;&#x26;</span> <span class="pl-k">!</span><span class="pl-c1">document</span>.<span class="pl-c1">hasFocus</span>()) {
    <span class="pl-k">return</span>;
  }

  <span class="pl-en">scrollToElement</span>(<span class="pl-c1">document</span>.<span class="pl-smi">activeElement</span>, {
    <span class="pl-c">// Scroll animation would have the same duration and easing as the keyboard animation.</span>
    <span class="pl-smi">animation</span>,
    paddingBottom: <span class="pl-smi">animation</span>.<span class="pl-smi">endValue</span>,
    <span class="pl-smi">signal</span>,
  });
});
</code></pre><p>Check out <a href="https://github.com/smikhalevski/racehorse/tree/master/web/example/src/App.tsx#L45">the example app</a> that has the real-world keyboard animation handling.</p><br><p align="center"><img src="https://raw.githubusercontent.com/smikhalevski/racehorse/refs/heads/master/images/keyboard-animation.gif" alt="Keyboard animation" width="300"></p><h1 id="network-plugin"><a class="markdown-permalink" href="#network-plugin"><span class="icon icon-link"></span></a>Network plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.NetworkManager.html"><code>NetworkManager</code> <sup>↗</sup></a> enables network connection monitoring support.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.NetworkPlugin</span>

<span class="pl-k">val</span> networkPlugin <span class="pl-k">=</span> <span class="pl-en">NetworkPlugin</span>(activity)

<span class="pl-en">EventBus</span>.getDefault().register(networkPlugin)
</code></pre><p>Enable the plugin when the app resumes and disable it when the app pauses:</p><pre><code class="language-kotlin"><span class="pl-k">fun</span> <span class="pl-en">onResume</span>() {
    <span class="pl-c1">super</span>.onResume()
    networkPlugin.enable()
}

<span class="pl-k">fun</span> <span class="pl-en">onPause</span>() {
    <span class="pl-c1">super</span>.onPause()
    networkPlugin.disable()
}
</code></pre><p>Synchronously read the network connection status or subscribe to changes:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">networkManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">networkManager</span>.<span class="pl-en">getNetworkStatus</span>().<span class="pl-smi">isConnected</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">networkManager</span>.<span class="pl-en">subscribe</span>(<span class="pl-v">status</span> <span class="pl-k">=></span> {
  <span class="pl-c">// React to network status changes</span>
});
</code></pre><p>If you are using React, then refer to <a href="https://smikhalevski.github.io/racehorse/functions/_racehorse_react.useNetworkStatus.html"><code>useNetworkStatus</code> <sup>↗</sup></a> hook that re-renders a component when network status changes.</p><pre><code class="language-tsx"><span class="pl-k">import</span> { <span class="pl-smi">useNetworkStatus</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>@racehorse/react<span class="pl-pds">'</span></span>;

<span class="pl-k">const</span> <span class="pl-c1">status</span> <span class="pl-k">=</span> <span class="pl-en">useNetworkStatus</span>();

<span class="pl-smi">status</span>.<span class="pl-smi">isConnected</span>;
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">status</span>.<span class="pl-c1">type</span>;
<span class="pl-c">// ⮕ 'wifi'</span>
</code></pre><h1 id="notifications-plugin"><a class="markdown-permalink" href="#notifications-plugin"><span class="icon icon-link"></span></a>Notifications plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.NotificationsManager.html"><code>NotificationsManager</code> <sup>↗</sup></a> provides access to Android system notifications status.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.NotificationsPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">NotificationsPlugin</span>(activity))
</code></pre><p>Synchronously check that notifications are enabled:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">notificationsManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">notificationsManager</span>.<span class="pl-en">areNotificationsEnabled</span>();
<span class="pl-c">// ⮕ true</span>
</code></pre><h1 id="permissions-plugin"><a class="markdown-permalink" href="#permissions-plugin"><span class="icon icon-link"></span></a>Permissions plugin</h1><p><a href="https://smikhalevski.github.io/racehorse/interfaces/racehorse.PermissionsManager.html"><code>PermissionsManager</code> <sup>↗</sup></a> allows checking and requesting application permissions.</p><p>Initialize the plugin in your Android app:</p><pre><code class="language-kotlin"><span class="pl-k">import</span> <span class="pl-smi">org.racehorse.PermissionsPlugin</span>

<span class="pl-en">EventBus</span>.getDefault().register(<span class="pl-en">PermissionsPlugin</span>(activity))
</code></pre><p>Check that a permission is granted, or ask for permissions:</p><pre><code class="language-ts"><span class="pl-k">import</span> { <span class="pl-smi">permissionsManager</span> } <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>racehorse<span class="pl-pds">'</span></span>;

<span class="pl-smi">permissionsManager</span>.<span class="pl-en">isPermissionGranted</span>(<span class="pl-s"><span class="pl-pds">'</span>android.permission.ACCESS_WIFI_STATE<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ true</span>

<span class="pl-smi">permissionsManager</span>.<span class="pl-en">askForPermission</span>(<span class="pl-s"><span class="pl-pds">'</span>android.permission.CALL_PHONE<span class="pl-pds">'</span></span>);
<span class="pl-c">// ⮕ Promise&#x3C;boolean></span>
</code></pre><h1 id="cookbook"><a class="markdown-permalink" href="#cookbook"><span class="icon icon-link"></span></a>Cookbook</h1><h2 id="blur-preview-on-recent-apps-screen"><a class="markdown-permalink" href="#blur-preview-on-recent-apps-screen"><span class="icon icon-link"></span></a>Blur preview on recent apps screen</h2><p>Post a custom <a href="https://smikhalevski.github.io/racehorse/android/racehorse/org.racehorse/-notice-event/index.html"><code>NoticeEvent</code> <sup>↗</sup></a> event in <a href="https://developer.android.com/reference/android/app/Activity#onWindowFocusChanged(boolean)"><code>onWindowFocusChanged</code> <sup>↗</sup></a>:</p><pre><code class="language-kotlin"><span class="pl-k">package</span> <span class="pl-en">com.myapplication</span>

<span class="pl-k">import</span> <span class="pl-smi">org.greenrobot.eventbus.EventBus</span>
<span class="pl-k">import</span> <span class="pl-smi">org.racehorse.NoticeEvent</span>

<span class="pl-k">class</span> <span class="pl-en">WindowFocusChangedEvent</span>(<span class="pl-k">val</span> <span class="pl-smi">hasFocus</span><span class="pl-k">:</span> <span class="pl-c1">Boolean</span>) : NoticeEvent

<span class="pl-k">class</span> <span class="pl-en">MainActivity</span> {

    <span class="pl-c">// Don't forget to init Racehorse here</span>

    <span class="pl-k">override</span> <span class="pl-k">fun</span> <span class="pl-en">onWindowFocusChanged</span>(<span class="pl-smi">hasFocus</span><span class="pl-k">:</span> <span class="pl-c1">Boolean</span>) {
        <span class="pl-en">EventBus</span>.getDefault().post(<span class="pl-en">WindowFocusChangedEvent</span>(hasFocus))
    }
}
</code></pre><p>In the web app, subscribe to this event and apply the blur filter to the body:</p><pre><code class="language-ts"><span class="pl-smi">eventBridge</span>.<span class="pl-en">subscribe</span>(<span class="pl-s"><span class="pl-pds">'</span>com.myapplication.WindowFocusChangedEvent<span class="pl-pds">'</span></span>, <span class="pl-v">payload</span> <span class="pl-k">=></span> {
  <span class="pl-c1">document</span>.<span class="pl-c1">body</span>.<span class="pl-c1">style</span>.<span class="pl-smi">filter</span> <span class="pl-k">=</span> <span class="pl-smi">payload</span>.<span class="pl-c1">hasFocus</span> <span class="pl-k">?</span> <span class="pl-s"><span class="pl-pds">'</span>none<span class="pl-pds">'</span></span> <span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>blur(30px)<span class="pl-pds">'</span></span>;
});
</code></pre><p>Now your application would become blurred when it is going to background and become non-blurred when it comes to the foreground.</p>`};function g(){return s.createElement(n,{logo:s.createElement("div",{style:l(p,a),className:e.Logo,title:"Racehorse"}),readme:c})}export{g as default};
