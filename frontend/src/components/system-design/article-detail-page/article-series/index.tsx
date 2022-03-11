import styles from './ArticleSeries.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

import React from 'react';
import Link from 'next/link';

import { SpeechBubble } from '@design-system';

import {
    getUserImage,
} from '@modules/utility/image';

export interface ArticleSeriesProps {
    url: string;
    name: string;
    owner: string;
    ownerImage: string;
    description?: string;
    posts: {
        url: string;
        title: string;
    }[];
    seriesLength: number;
    activeSeries: number;
};

export function ArticleSeries(props: ArticleSeriesProps) {
    return (
        <div className={cn('series', 'my-5')}>
            <Link href={`/@${props.owner}/series/${props.url}`}>
                <a className="deep-dark">
                    <h4 className="font-weight-bold mb-3">
                        '{props.name}' 시리즈
                    </h4>
                </a>
            </Link>
            <SpeechBubble
                username={props.owner}
                userImage={getUserImage(props.ownerImage)}
            >
                {props.description ? props.description : '이 시리즈에 대한 설명이 없습니다.'}
            </SpeechBubble>
            <ul>
                {props.posts.length > 1 && props.posts.map((post, idx) => (
                    props.activeSeries >= idx - 2 && props.activeSeries <= idx + 2 && (
                        <li key={idx}>
                            <Link href="/[author]/[posturl]" as={`/@${props.owner}/${post.url}`}>
                                <a className={cn(
                                    idx == props.activeSeries
                                        ? 'deep-dark'
                                        : 'shallow-dark',
                                )}>
                                    {post.title}
                                </a>
                            </Link>
                            <div className={cn('count')}>
                                {idx + 1}/{props.seriesLength}
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </div>
    )
}