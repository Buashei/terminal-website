/* eslint-disable */
import { Helmet, HelmetData } from 'react-helmet-async';

import type { TSEO } from './SEO.types';

const helmetData = new HelmetData({});

export const SEO: TSEO = ({ title, description, name, type }) => {
  return (
    <Helmet helmetData={helmetData}>
      {/* Standard metadata tags */}
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={import.meta.env.VITE_PAGE_URL} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};
