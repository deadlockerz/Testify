import React from 'react';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-center">Project Documentation</h1>
          <p className="text-lg text-center text-gray-600 mt-2">
            Welcome to the official documentation for our project.
          </p>
        </header>

        <main>
          <section id="introduction" className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
            <p className="text-lg leading-relaxed">
              This section introduces the project, its purpose, and key features. 
              Provide a high-level overview here to set the context.
            </p>
          </section>

          <section id="installation" className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Installation</h2>
            <p className="text-lg leading-relaxed">
              To get started, clone the repository and install the dependencies:
            </p>
            <div className="bg-gray-200 p-4 rounded mt-4">
              <pre className="text-sm font-mono">
                <code>
{`git clone https://github.com/your-repo/project-name.git
cd project-name
npm install
npm start`}
                </code>
              </pre>
            </div>
          </section>

          <section id="usage" className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Usage</h2>
            <p className="text-lg leading-relaxed">
              Here's how you can use the project after installation. 
              Include code snippets, screenshots, or any other relevant content.
            </p>
            <div className="bg-gray-200 p-4 rounded mt-4">
              <pre className="text-sm font-mono">
                <code>
{`import { Component } from 'your-library';

function App() {
  return (
    <div>
      <Component />
    </div>
  );
}`}
                </code>
              </pre>
            </div>
          </section>

          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">FAQ</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Question 1:</strong> Here is the answer to the first frequently asked question.
              </li>
              <li>
                <strong>Question 2:</strong> Here is the answer to the second frequently asked question.
              </li>
            </ul>
          </section>

          <section id="contributing" className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Contributing</h2>
            <p className="text-lg leading-relaxed">
              If you'd like to contribute, please follow our guidelines. 
              Include instructions for submitting pull requests, reporting issues, etc.
            </p>
          </section>

          <section id="license" className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">License</h2>
            <p className="text-lg leading-relaxed">
              This project is licensed under the MIT License. For more information, 
              refer to the LICENSE file in the repository.
            </p>
          </section>
        </main>

        <footer className="mt-12 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Your Project Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default DocumentationPage;
