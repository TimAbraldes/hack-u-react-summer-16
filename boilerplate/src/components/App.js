import React, { Component } from 'react';
import { default as BTCSorter } from './BTCSorter';

const URL_COUNT_PLACEHOLDER = `%NUM_TO_FETCH%`;
const URLS = new Map([
  ['individual', `http://54.213.83.132/hackoregon/http/oregon_individual_contributors/${URL_COUNT_PLACEHOLDER}/`],
  ['business', `http://54.213.83.132/hackoregon/http/oregon_business_contributors/${URL_COUNT_PLACEHOLDER}/`],
]);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: { },
      fetchFuncs: { },
    };

    URLS.forEach((url, name) => {
      this.state.fetchedData[name] = [];
      this.state.fetchFuncs[name] = this.getData.bind(this, name, url);
    });
  }

  async getData(name, url, count) {
    const fullUrl = url.replace(URL_COUNT_PLACEHOLDER, count);

    console.log(`getData ${fullUrl}`);
    let newFetchedData = this.state.fetchedData;

    if (count <= 0) {
      newFetchedData[name] = [];
      this.setState({
        fetchedData: newFetchedData,
      });
      return;
    }

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
      newFetchedData[name] = data;
      this.setState({
        fetchedData: newFetchedData,
      });
    } catch(err) {
      console.error(`failed to get data from ${fullUrl}. Exception: ${err}`);
    }
  }

  render() {
    const sorterComps = [];
    URLS.forEach((url, name) => {
      sorterComps.push((
        <BTCSorter
          key={name}
          items={this.state.fetchedData[name]}
          dataFn={this.state.fetchFuncs[name]}
        />
      ));
    });

    return (
      <div className='container'>
        { sorterComps }
      </div>
    );
  }
}
