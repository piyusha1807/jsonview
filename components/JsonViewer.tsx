import React, { useState } from 'react';
import { IconSquarePlus, IconSquareMinus } from '@tabler/icons-react';
import { ActionIcon, rem } from '@mantine/core';

const JsonViewer = ({ data }) => {
  const regex = new RegExp(`(comment_id: )`, 'gi');
  const [expandedKeys, setExpandedKeys] = useState({ '/JSON': true });

  const toggleExpand = (key) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderJson = (data, level = 0, path = '') => {
    if (typeof data === 'object' && data !== null) {
      return (
        <ul
          style={{
            listStyleType: 'none',
            padding: '0px',

            marginLeft: level === 0 ? '0px' : '23px'
          }}
        >
          {Object.entries(data).map(([key, value], index, array) => {
            const currentPath = `${path}/${key}`;
            const isExpanded = expandedKeys[currentPath];
            const isArray = Array.isArray(value);
            const itemsCount = isArray
              ? value.length
              : typeof value === 'object' && value !== null
                ? Object.keys(value).length
                : null;
            const typeSymbol = isArray
              ? '[]'
              : typeof value === 'object' && value !== null
                ? '{}'
                : null;
            const isLastElement = index === array.length - 1;
            const isNested = typeof value === 'object' && value !== null && itemsCount;

            return (
              <li
                key={key}
                style={{
                  position: 'relative',
                  borderLeft: isNested || isLastElement ? 'none' : '0.5px dotted grey', // Apply full border for non-last elements
                  // paddingLeft: isNested ? '23px' : ''
                  marginLeft: isNested ? '' : '8px'
                }}
              >
                {isNested && !isLastElement && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '8px',
                      top: 0,
                      height: '100%', // Shorter height for the border
                      borderLeft: '0.5px dotted grey'
                    }}
                  ></div>
                )}
                {!isNested && isLastElement && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '0px',
                      top: 0,
                      height: '50%', // Shorter height for the border
                      borderLeft: '0.5px dotted grey'
                    }}
                  ></div>
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* {!isNested && (
                    <hr
                      style={{
                        width: '18px',
                        borderWidth: '0.5px 0px 0px 0px',
                        borderStyle: 'dotted',
                        borderColor: 'grey',
                        margin: '0px'
                      }}
                    />
                  )} */}

                  {isNested && (
                    <ActionIcon
                      size="xs"
                      color="rgb(38, 139, 210)"
                      style={{ backgroundColor: '#f1f3f5' }}
                      onClick={() => toggleExpand(currentPath)}
                    >
                      {isExpanded ? <IconSquareMinus /> : <IconSquarePlus />}
                    </ActionIcon>
                  )}
                  <hr
                    style={{
                      width: isNested ? '5px' : '18px',
                      borderWidth: '0.5px 0px 0px 0px',
                      borderStyle: 'dotted',
                      borderColor: 'grey',
                      margin: '0px'
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '5px',
                      width: '100%'
                    }}
                  >
                    {typeSymbol ? (
                      typeSymbol
                    ) : (
                      <div
                        style={{
                          width: rem(10),
                          height: rem(10),
                          backgroundColor:
                            typeof value === 'string'
                              ? 'rgb(83, 83, 83)'
                              : typeof value === 'number'
                                ? 'rgb(253, 0, 121)'
                                : typeof value === 'boolean'
                                  ? 'rgb(116, 135, 0)'
                                  : value === null
                                    ? 'rgb(175, 175, 175)'
                                    : 'black'
                        }}
                      ></div>
                    )}

                    {/* <div style={{ color: 'rgb(118, 28, 234)' }} >{`${key}:`}</div> */}
                    <span
                      style={{ color: 'rgb(118, 28, 234)' }}
                      dangerouslySetInnerHTML={{
                        __html: `${key}:`.replace(regex, '<mark>$1</mark>')
                      }}
                    />
                    {itemsCount !== null ? (
                      <div style={{ color: 'rgb(133, 153, 0)' }}>
                        {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                      </div>
                    ) : (
                      <div
                        style={{
                          maxWidth: 'calc(100% - 12rem)', // Set max width for the string
                          overflow: 'hidden',
                          textOverflow: 'ellipsis', // Add ellipsis for long strings
                          whiteSpace: 'nowrap',
                          color:
                            typeof value === 'string'
                              ? 'rgb(83, 83, 83)'
                              : typeof value === 'number'
                                ? 'rgb(253, 0, 121)'
                                : typeof value === 'boolean'
                                  ? 'rgb(116, 135, 0)'
                                  : value === null
                                    ? 'rgb(175, 175, 175)'
                                    : 'black'
                        }}
                        title={typeof value === 'string' ? value : ''}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              `${typeof value === 'string' ? `"${value}"` : String(value)}`.replace(
                                regex,
                                '<mark>$1</mark>'
                              )
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {isExpanded && renderJson(value, level + 1, currentPath)}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Fira Code', fontSize: '15px', fontWeight: 450 }}>
      {renderJson({ JSON: data })}
    </div>
  );
};

export default JsonViewer;
