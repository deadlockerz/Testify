import React, { useState } from 'react';
import axios from 'axios';

function CodeCompiler() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [languageId, setLanguageId] = useState(63); // Default to JavaScript (ID: 63)

  const languages = [
    { id: 63, name: 'JavaScript' },
    { id: 71, name: 'Python' },
    { id: 62, name: 'Java' },
    { id: 52, name: 'C++' },
    { id: 50, name: 'C' },
    // Add more languages as needed
  ];

  const runCode = async () => {
    setIsLoading(true);
    setOutput(''); // Clear previous output

    try {
      // Post code to Judge0 API
      const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
        source_code: code,
        language_id: languageId,
        stdin: '',
      }, {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': `${process.env.REACT_APP_COMPILE_RAPID_API}`, // Replace with your actual key
        },
      });

      // Extract token from response
      const token = response.data.token;

      // Poll for result using the token
      let result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
        headers: {
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': `${process.env.REACT_APP_COMPILE_RAPID_API}`, // Replace with your actual key
        },
      });

      // Poll until the result is ready
      while (result.data.status.id === 1 || result.data.status.id === 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          headers: {
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': `${process.env.REACT_APP_COMPILE_RAPID_API}`, // Replace with your actual key
          },
        });
      }

      // Set output based on result
      setOutput(result.data.stdout || result.data.stderr || 'No output');
    } catch (error) {
      setOutput('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Online Code Compiler</h1>
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
          <select
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={runCode}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Running...' : 'Run'}
          </button>
        </div>
        <div className="flex flex-col h-[60vh]">
          <textarea
            className="w-full h-full p-4 rounded-lg border border-gray-700 bg-gray-900 text-white resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <pre className="w-full bg-gray-900 text-white p-4 mt-4 rounded-lg shadow-lg overflow-auto">
            {output || 'Your output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default CodeCompiler;
