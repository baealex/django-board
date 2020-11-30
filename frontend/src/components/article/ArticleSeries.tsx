import React from 'react';
import Link from 'next/link';

interface Props {
    url: string;
    title: string;
    author: string;
    authorImage: string;
    description?: string;
    posts: {
        url: string;
        title: string;
    }[];
    sereisLength: number;
    activeSeries: number;
};

export default function ArticleSereis(props: Props) {
    return (
        <div className="my-5 noto posts-sereis">
            <Link href="/[author]/series/[seriesurl]" as={`/@${props.author}/series/${props.url}`}>
                <a className="deep-dark">
                    <h4 className="serif font-weight-bold mb-3">
                        '{props.title}' 시리즈
                    </h4>
                </a>
            </Link>
            <div className="series-desc mb-3">
                <blockquote className="noto">
                    {props.description ? props.description : '이 시리즈에 대한 설명이 없습니다.'}
                </blockquote>
                <div className="author">
                    <Link href="/[author]" as={`/@${props.author}`}>
                        <a><img src={props.authorImage}/></a>
                    </Link>
                </div>
            </div>
            <ul>
                {props.posts.length > 1 ? props.posts.map((post, idx) => (
                    props.activeSeries >= idx - 2 && props.activeSeries <= idx + 2 ? (
                        <li key={idx}>
                            <Link href="/[author]/[posturl]" as={`/@${props.author}/${post.url}`}>
                                <a className={`${idx == props.activeSeries ? 'deep' : 'shallow'}-dark`}>{post.title}</a>
                            </Link>
                            <div className="series-count">{idx + 1}/{props.sereisLength}</div>
                        </li>
                    ) : ''
                )) : <></>}
            </ul>
        </div>
    )
}