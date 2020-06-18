import React, { useState } from 'react';
import '../assets/styles/components/Results.styl';
import { getData } from '../utils/fetchData';
import { apiUrl } from '../../config';
const Results = () => {

  const [domain, setDomain] = useState('');
  const [results, setResults] = useState('');

  const handleFieldChange = (e) => {
    const { value } = e.target;
    setDomain(value);
  };

  const clearState = () => {
    setDomain("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getData(`${apiUrl}domains/${domain}`)
      .then(results => {
        setResults(JSON.stringify(results.message, null, 2))
        clearState();
      });
  };

  const handleSearchAllSubmit = (e) => {
    e.preventDefault();
    getData(`${apiUrl}domains/`)
      .then(results => {
        setResults(JSON.stringify(results.message, null, 2))
        clearState();
      });
  };

  return (
    <section className="results__container">
      <h2>Domains Information</h2>
      <div className="results__searchBar">
        <form className='form' method='GET' onSubmit={handleFormSubmit}>
          <input type="text" value={domain} onChange={handleFieldChange} placeholder="Type a domain here..." />
          <button type='submit'>Search Domain</button>
          <button onClick={handleSearchAllSubmit}>Search All</button>
        </form>
      </div>
      <div className="results__table">
        <pre>{results}</pre>
      </div>
    </section>
  )

}

export default Results;