'use client';
import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import CustomLink from '@/components/CustomLink';
import { PoliciesTypes } from '@/schemas';

const PolicyCreator = ({ data }: { data: PoliciesTypes[] }) => {
  return (
    data &&
    data[0] &&
    data[0].translations &&
    data[0].translations[0].policy_sections && (
      <div className="flex flex-col gap-10">
        {data[0].translations[0].intro && (
          <h2 className="h3 text-center">{data[0].translations[0].intro}</h2>
        )}
        {data[0].translations[0].title && (
          <h1 className="h1 text-center -mt-8">
            {data[0].translations[0].title}
          </h1>
        )}
        {data[0].translations[0].policy_sections.map((item, index) => (
          <div key={index}>
            {item.title && <h2 className="h2">{item.title}</h2>}
            <div className="p mt-2 cursor-none">
              <ReactMarkdown
                components={{ a: CustomLink }}
                remarkPlugins={[breaks]}
              >
                {item.description && item.description.replace(/\\n/g, '\n')}
              </ReactMarkdown>
            </div>
            {item.sub_titles && (
              <ul>
                {item.sub_titles.map((subItem, subIndex) => (
                  <li
                    className="ml-10 mt-3 list-disc text-white"
                    key={subIndex}
                  >
                    <h3 className="h3 underline underline-offset-2">
                      {subItem.title}
                    </h3>
                    <p className="p ml-2">{subItem.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )
  );
};
export default memo(PolicyCreator);
