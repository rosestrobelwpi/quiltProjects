import React from 'react';
import './getting-started.css';

const Document = () => {
  return (
    <div className="getting-started-container">
      <div className="navbar">
        <ul>
          <li><a href="/" id="logo">Quilt Designer</a></li>
        </ul>
        <div className="navbar-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/play">Play</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
      </div>
      <h1>Example Document</h1>
      <div className="text-container">
        <p>
          CodeMirror is distributed as a collection of modules. These aren't directly loadable by the browser—though modern browsers can load EcmaScript modules, at the time of writing their mechanism for resolving further dependencies is still too primitive to load collections of NPM-distributed modules.
        </p>
        <p>
          (That being said, there are solutions that work around that by rewriting dependencies on the server side, like Snowpack or esmoduleserve. I definitely recommend a solution like this during development, since it tends to introduce less indirection and delay when changing files, but for actual deployment, you'll want to do classical bundling for the time being.)
          Bundlers are tools that take a given main script (or in some cases multiple scripts), and produce a new, generally bigger, script that has all (or some) of the script's dependencies (and their dependencies, and so on) included. This makes it easier to run modern JavaScript systems, which tend to consist of a whole graph of dependencies, in the browser. (But also, for example, to combine a library package written as a group of files into a single file before uploading it to NPM.)
        </p>
        <p>
          As far as bundler software goes, I'm a big fan of Rollup. But there are also other systems, like Webpack and Parcel, that work well and have their own advantages.
          To use Rollup to create a bundle that loads CodeMirror, you must first write a main script (say, editor.mjs) that imports the library and creates the editor view.
        </p>

        <pre>
          <code>
            This is code<br />
            This is more code<br />
            <span className="keyword">let </span><span className="variable">editor</span> = <span className="keyword">new</span><span className="keyword"> editor</span>
          </code>
        </pre>

        <p>
          The -f iife file tells Rollup that the output file should be formatted as an "immediately-invoked function expression" (as opposed to other module styles, such as CommonJS or UMD). This means the code will be wrapped in an anonymous function that is then immediately called, using that function's scope as a local namespace so that its variables don't end up in the global scope.
        </p>
        <p>
          The -o option indicates which output file to write to, and the -p option loads the resolution plugin. You can also create a configuration file (called rollup.config.mjs) and just run rollup -c to take the configuration from that file.
        </p>
      </div>
    </div>
  );
};

export default Document;
