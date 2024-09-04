import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();

  if (!error) {
    return null; // Return nothing if no error
  }

  console.log(error);
  // ... existing error rendering logic

  return (
    <div>
      <h1>Error Page</h1>
      <h3>
        Error {error.status}: {error.statusText}
      </h3>
    </div>
  );
}

export default Error;
