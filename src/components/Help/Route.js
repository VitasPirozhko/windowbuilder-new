import React from 'react';
import PropTypes from 'prop-types';
import MarkdownDocs from 'metadata-react/Markdown/MarkdownDocsLight';

export default function MarkdownRoute(props) {
  const [value, setValue] = React.useState('Получаем файл с сервера...');

  let fname = window.location.pathname.replace('/help', '');
  if(fname.startsWith('/')) {
    fname = fname.substr(1);
  }
  else if(!fname) {
    props.history.push(`${window.location.pathname}/`);
  }
  const $p = {}
  fetch(`${$p.job_prm.docs_root}${fname || 'index.md'}`)
    .then((res) => {
      return res.text();
    })
    .then((markdown) => {
      setValue(markdown);
    })
    .catch((err) => setValue(err.message || err));

  return <MarkdownDocs markdown={value}  />;
}

MarkdownRoute.propTypes = {
  history: PropTypes.object.isRequired,
};





