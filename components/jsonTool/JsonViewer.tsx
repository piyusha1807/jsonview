import React, { useState } from 'react';
import { IconSquarePlus, IconSquareMinus } from '@tabler/icons-react';
import { ActionIcon, rem } from '@mantine/core';
import styles from '@/styles/JsonViewer.module.scss';
import { getColor } from '@/utils/utils';

const JsonViewer = ({ data }) => {
  const regex = new RegExp(`(true)`, 'gi');
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
          className={`${styles.jsonList}`}
          style={{
            marginLeft: level === 0 ? '0px' : '23px'
          }}
        >
          {Object.entries(data).map(([key, value], index, array) => {
            const currentPath = `${path}/${key}`;
            const isExpanded = expandedKeys[currentPath];
            const itemsCount =
              typeof value === 'object' && value !== null ? Object.keys(value).length : null;
            const isArray = Array.isArray(value);
            const typeSymbol = isArray
              ? '[]'
              : typeof value === 'object' && value !== null
                ? '{}'
                : null;
            const isLastElement = index === array.length - 1;

            return (
              <li
                key={key}
                style={{
                  position: 'relative',
                  borderLeft: itemsCount || isLastElement ? 'none' : '0.5px dotted grey', // Apply full border for non-last elements
                  marginLeft: itemsCount ? '' : '8px'
                }}
              >
                {Boolean(itemsCount) &&
                  !isLastElement && ( // full | for objects/array but not for last
                    <div className={styles.jsonItemLine}></div>
                  )}
                {Boolean(!itemsCount) &&
                  isLastElement && ( // half | for the last single element
                    <div className={styles.jsonItemLineHalf}></div>
                  )}

                <div className={`${styles.jsonValueContainer}`}>
                  {Boolean(itemsCount) && (
                    <ActionIcon
                      size="xs"
                      color="rgb(38, 139, 210)"
                      style={{ backgroundColor: '#f1f3f5' }}
                      onClick={() => toggleExpand(currentPath)}
                    >
                      {isExpanded ? <IconSquareMinus /> : <IconSquarePlus />}
                    </ActionIcon>
                  )}
                  <hr className={`${styles.jsonHR} ${itemsCount ? styles.jsonHRShort : ''}`} />
                  <div className={styles.jsonKeyValue}>
                    {typeSymbol ? (
                      typeSymbol
                    ) : (
                      <div
                        style={{
                          width: rem(10),
                          height: rem(10),
                          backgroundColor: getColor(value)
                        }}
                      ></div>
                    )}

                    <span
                      className={styles.jsonKey}
                      dangerouslySetInnerHTML={{
                        __html: `${key}:`.replace(regex, '<mark>$1</mark>')
                      }}
                    />
                    {itemsCount !== null ? (
                      <div className={`${styles.jsonItemCount}`}>
                        {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                      </div>
                    ) : (
                      <div
                        className={`${styles.jsonValue}`}
                        style={{
                          color: getColor(value)
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

  return <div className={styles.jsonViewer}>{renderJson({ JSON: data })}</div>;
};

export default JsonViewer;
